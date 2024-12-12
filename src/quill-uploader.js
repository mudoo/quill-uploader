import Loading from './formats/loading.js'
import CustomLink from './formats/custom-link.js'
import { fileToBase64, getVideoInfo, randomString } from './util.js'

import _Quill from 'quill'
const Quill = window.Quill || _Quill

class CustomUploader {
  static DefaultFilePlaceholder = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUAAAAC0AQMAAADfKmdSAAAAA1BMVEX19fWwaZ+KAAAAHklEQVRYw+3BMQEAAADCIPuntsYOYAAAAAAAAABhBxzUAAEYBjd2AAAAAElFTkSuQmCC'
  static DefaultAttachmentPlaceholder = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYAQMAAADaua+7AAAAA1BMVEUAAACnej3aAAAAAXRSTlMAQObYZgAAAAtJREFUCNdjoDEAAABgAAGVQESKAAAAAElFTkSuQmCC'
  static Accepts = {
    image: ['image/jpeg', 'image/png', 'image/gif'],
    video: ['video/mp4'],
    attachment: [
      'text/plain', 'application/pdf',
      'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'application/zip', 'application/vnd.rar', 'application/x-7z-compressed'
    ]
  }

  static findType (mime, accepts = this.Accepts) {
    const types = Object.keys(accepts)
    if (types.includes(mime)) return mime
    return types.find(k => accepts[k].includes(mime)) || types[0]
  }

  static register () {
    Quill.register(Loading)
    Quill.register(CustomLink, true)
  }

  constructor (quill, options) {
    this.quill = quill
    this.quill.customUploader = this
    this.options = Object.assign({
      handler: null,
      upload: null,
      accepts: this.constructor.Accepts
    }, options)

    // 更新uploader的mime配置，使其可以拖拽上传
    const mimes = Object.keys(this.options.accepts).reduce((mimes, key) => mimes.concat(this.options.accepts[key]), [])
    this.quill.uploader.options.mimetypes = mimes

    if (typeof this.options.upload !== 'function') {
      // eslint-disable-next-line no-console
      console.error('[Missing config] upload function that returns a promise is required')
    }

    const toolbar = this.quill.getModule('toolbar')
    if (toolbar) {
      Object.keys(this.options.accepts).forEach(key => {
        toolbar.addHandler(key, () => this.pickFile(key))
      })
    }
  }

  pickFile (type) {
    let fileInput = this.quill.container.querySelector('input.ql-uploader[type=file]')

    if (fileInput == null) {
      fileInput = document.createElement('input')
      fileInput.setAttribute('type', 'file')
      fileInput.classList.add('ql-uploader')
      fileInput.setAttribute('style', 'visibility:hidden')
      fileInput.addEventListener('change', () => {
        const range = this.quill.getSelection(true)
        this.uploadFiles(range, fileInput.files)
        fileInput.value = ''
      })
      this.quill.container.appendChild(fileInput)
    }

    const accept =
      (this.options.accepts[type] || this.options.accepts.image)?.join(', ') || 'image/*'
    fileInput.setAttribute('accept', accept)
    fileInput.click()
  }

  insertPlaceholder (range, url) {
    const i = range.index
    range.index++

    if (range.length) {
      this.quill.deleteText(i, range.length, 'api')
    }

    return this.quill.insertEmbed(i, Loading.blotName, url, 'api')
  }

  insertFilePlaceholder (range, file) {
    const type = this.constructor.findType(file.type)
    if (!file.key) file.key = randomString()
    const key = file.key

    return new Promise((resolve) => {
      if (type === 'attachment') {
        // 附件，直接插入文本
        resolve(this.insertPlaceholder(range, {
          label: file.name,
          url: this.constructor.DefaultAttachmentPlaceholder,
          key
        }))
      } else if (file.thumb || file.base64) {
        // 自定义处理的文件，thumb作为显示的缩略图
        resolve(this.insertPlaceholder(range, {
          name: file.name,
          url: file.thumb || file.base64,
          key
        }))
      } else if (this.options.accepts?.image?.includes(file.type)) {
        // 图片，读取自身base64显示
        fileToBase64(file)
          .then(base64 => {
            resolve(this.insertPlaceholder(range, {
              name: file.name,
              url: base64,
              key
            }))
          })
      } else if (this.options.accepts?.video?.includes(file.type)) {
        // 读取视频信息
        getVideoInfo(file)
          .then(videoInfo => {
            resolve(this.insertPlaceholder(range, {
              name: file.name,
              url: videoInfo.thumb,
              key
            }))
          })
      } else {
        // 其他文件，插入默认占位符
        resolve(this.insertPlaceholder(range, {
          url: this.constructor.DefaultFilePlaceholder,
          key
        }))
      }
    })
  }

  // The length of the insert delta from insertBase64Image can vary depending on what part of the line the insert occurs
  calculatePlaceholderInsertLength (delta) {
    return delta.ops.reduce((accumulator, deltaOperation) => {
      if (Object.prototype.hasOwnProperty.call(deltaOperation, 'insert')) accumulator++

      return accumulator
    }, 0)
  }

  getLoadingDomRange (key) {
    const blot = this.quill.constructor.find(this.quill.container.querySelector(`.ql-uploading[data-key="${key}"]`))
    const index = this.quill.getIndex(blot)
    const delta = this.quill.getContents(index, 1)
    const lengthToDelete = this.calculatePlaceholderInsertLength(delta)

    return {
      blot,
      delta,
      index,
      length: lengthToDelete
    }
  }

  loadImage (res) {
    return new Promise((resolve) => {
      const info = this.getLoadingDomRange(res.key)
      const img = info.blot.domNode.querySelector('img')
      if (!img) {
        resolve(info)
        return
      }

      img.addEventListener('load', () => resolve(info))
      img.src = res.url
    })
  }

  insertToEditor (res, info = this.getLoadingDomRange(res.key)) {
    const type = this.constructor.findType(res.type)
    let len = info.length

    // 删除占位符
    this.quill.deleteText(info.index, len, 'user')
    // 插入内容
    if (type === 'attachment') {
      len += res.name.length - 1
      this.quill.insertText(info.index, res.name, {
        // link: res.url,
        link: {
          key: res.key,
          download: res.name,
          url: res.url,
          ext: res.name.slice(res.name.lastIndexOf('.') + 1)
        }
      }, 'user')
    } else {
      this.quill.insertEmbed(info.index, type, res.delta || res.url, 'user')
    }

    this.quill.setSelection(info.index + len, 'user')
  }

  removePlaceholder (res) {
    const info = this.getLoadingDomRange(res.key)
    this.quill.deleteText(info.index, info.length, 'user')
  }

  async uploadFiles (range, [...files]) {
    if (this.options.handler) files = await this.options.handler(files)

    await Promise.all(files.map((file) => this.insertFilePlaceholder(range, file)))

    const results = await this.options.upload(range, files)

    results.forEach(async (result) => {
      if (result.url) {
        const type = this.constructor.findType(result.type)
        let loadingDomInfo
        // 图片等加载完之后再插入编辑器
        if (type === 'image') {
          loadingDomInfo = await this.loadImage(result)
        }

        this.insertToEditor(result, loadingDomInfo)
      } else {
        this.removePlaceholder(result)
      }
    })
  }
}

export default CustomUploader

if (window.Quill) {
  window.Quill.register('modules/customUploader', CustomUploader)
}