import Loading from './formats/loading.js'
import CustomLink from './formats/custom-link.js'
import { dataURLtoFile, fileToBase64, getVideoInfo, randomString } from './util.js'

import _Quill, { Delta } from 'quill'
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
      'application/zip', 'application/x-zip-compressed', 'application/vnd.rar', 'application/x-7z-compressed'
    ]
  }

  static Events = {
    start: 'uploader-start',
    done: 'uploader-done'
  }

  static findType (mime, accepts = this.Accepts) {
    const types = Object.keys(accepts)
    if (types.includes(mime)) return mime
    return types.find(k => accepts[k].includes(mime)) || types[0]
  }

  static register () {
    Quill.register(Loading, true)
    Quill.register(CustomLink, true)
  }

  constructor (quill, options) {
    this.quill = quill
    this.quill.customUploader = this
    this.options = Object.assign({
      handler: null,
      upload: null,
      accepts: this.constructor.Accepts,
      imagePreload: true,
      focusOnDone: false
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

    this.clipboardInit()
  }

  clipboardInit () {
    let pasteFiles = []
    let pasteTimeout

    const uploadPasteFiles = () => {
      pasteFiles.forEach(file => {
        const placeholder = this.getLoadingDomRange(file.name)
        this.uploadFiles(placeholder, [file])
      })
      pasteFiles = []
    }

    const pasteUploadHandler = (file) => {
      pasteFiles.push(file)

      clearTimeout(pasteTimeout)
      pasteTimeout = setTimeout(uploadPasteFiles, 100)
    }

    // 粘贴base64图片
    this.quill.clipboard.addMatcher(Node.ELEMENT_NODE, (node, delta) => {
      const tag = node.tagName.toLowerCase()

      // 上传base64图片
      if (tag === 'img' && node.src.startsWith('data:')) {
        const imgFile = dataURLtoFile(node.src, '')
        imgFile.base64 = node.src

        const placeholder = new Delta().insert({
          [Loading.blotName]: {
            name: imgFile.name,
            url: imgFile.base64,
            key: imgFile.name
          }
        })
        pasteUploadHandler(imgFile)

        return placeholder
      }
      return delta
    })
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

    this.quill.history.ignoreChange = true
    if (range.length) {
      this.quill.deleteText(i, range.length, 'api')
    }

    const res = this.quill.insertEmbed(i, Loading.blotName, url, 'api')
    this.quill.history.ignoreChange = false
    return res
  }

  insertFilePlaceholder (range, file) {
    const type = this.constructor.findType(file.type)
    if (!file.key) file.key = randomString()
    const key = file.key

    const placeholder = this.getLoadingDomRange(key)
    if (placeholder.delta) return Promise.resolve(placeholder.delta)

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
    const loadingEl = this.quill.container.querySelector(`.ql-uploading[data-key="${key}"]`)
    if (!loadingEl) return { index: 0, length: 0 }

    const blot = this.quill.constructor.find(loadingEl)
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
      const img = info.blot?.domNode.querySelector('img')
      if (!img) {
        resolve(info)
        return
      }

      img.addEventListener('load', () => resolve(info))
      img.src = res.url
    })
  }

  async insertToEditor (res) {
    const type = this.constructor.findType(res.type)

    // 图片等加载完之后再插入编辑器
    if (type === 'image' && this.options.imagePreload) {
      await this.loadImage(res)
    }

    const info = this.getLoadingDomRange(res.key)
    let len = info.length

    // 删除占位符
    this.quill.history.ignoreChange = true
    this.quill.deleteText(info.index, len, 'api')
    this.quill.history.ignoreChange = false

    // 插入内容
    if (type === 'attachment') {
      len += res.name.length - 1
      this.quill.insertText(info.index, res.name, {
        // link: res.url,
        link: Object.assign({
          key: res.key,
          download: res.name,
          url: res.url,
          ext: res.name.slice(res.name.lastIndexOf('.') + 1)
        }, res.delta)
      }, 'user')
    } else {
      this.quill.insertEmbed(info.index, type, res.delta || res.url, 'user')
    }

    return {
      ...info,
      length: len
    }
  }

  removePlaceholder (res) {
    this.quill.history.ignoreChange = true
    const info = this.getLoadingDomRange(res.key)
    this.quill.deleteText(info.index, info.length, 'api')
    this.quill.history.ignoreChange = false
  }

  async uploadFiles (range, [...files]) {
    this.quill.emitter.emit(this.constructor.Events.start, files)
    if (this.options.handler) files = await this.options.handler(files)

    await Promise.all(files.map((file) => this.insertFilePlaceholder(range, file)))
    let lastRange

    const results = await this.options.upload(range, files, async (error, result) => {
      if (!error) {
        lastRange = await this.insertToEditor(result)
      } else {
        this.removePlaceholder(result)
      }
    })

    if (!results) {
      this.done(lastRange, results)
      return
    }

    await Promise.allSettled(results.map(async (result) => {
      if (result.url) {
        lastRange = await this.insertToEditor(result)
      } else {
        this.removePlaceholder(result)
      }
    }))

    this.done(lastRange, results)
  }

  done (range, results) {
    if (range && this.options.focusOnDone) {
      // this.quill.focus()
      this.quill.setSelection(range.index + range.length, 'user')
      setTimeout(() => this.quill.focus(), 16)
    }

    this.quill.emitter.emit(this.constructor.Events.done, results)
  }
}

export default CustomUploader

if (window.Quill) {
  window.Quill.register('modules/customUploader', CustomUploader)
}
