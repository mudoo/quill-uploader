import Loading from './formats/loading'
import CustomLink from './formats/custom-link'
import { dataURLtoFile, fileToBase64, getVideoInfo, randomString } from './util'

import _Quill, { Delta, Parchment, Range } from 'quill'
const Quill = (window as any).Quill || _Quill

type FileLike = File & { base64?: string; key?: string; thumb?: string }

interface UploaderOptions {
  handler?: (files: FileLike[]) => Promise<FileLike[]> | FileLike[]
  upload: (range: Range, files: FileLike[], progress: (error: any, result: any) => void) => Promise<any[]>
  accepts?: Record<string, string[]>
  imagePreload?: boolean
  focusOnDone?: boolean
}

type DomRange = Range & {
    blot?: Parchment.Blot
    delta?: Delta
}

class CustomUploader {
  static DefaultFilePlaceholder =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUAAAAC0AQMAAADfKmdSAAAAA1BMVEX19fWwaZ+KAAAAHklEQVRYw+3BMQEAAADCIPuntsYOYAAAAAAAAABhBxzUAAEYBjd2AAAAAElFTkSuQmCC'
  static DefaultAttachmentPlaceholder =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYAQMAAADaua+7AAAAA1BMVEUAAACnej3aAAAAAXRSTlMAQObYZgAAAAtJREFUCNdjoDEAAABgAAGVQESKAAAAAElFTkSuQmCC'
  static Accepts: Record<string, string[]> = {
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

  static findType(mime: string, accepts = CustomUploader.Accepts): string {
    const types = Object.keys(accepts)
    if (types.includes(mime)) return mime
    return types.find((k) => accepts[k].includes(mime)) || 'attachment'
  }

  static register() {
    Quill.register(Loading, true)
    Quill.register(CustomLink, true)
  }

  quill: _Quill
  options: UploaderOptions

  constructor(quill: _Quill, options: UploaderOptions) {
    this.quill = quill
    ;(this.quill as any).customUploader = this
    this.options = Object.assign(
      {
        handler: null,
        upload: null,
        accepts: (this.constructor as typeof CustomUploader).Accepts,
        imagePreload: true,
        focusOnDone: false
      },
      options
    )

    // 更新uploader的mime配置，使其可以拖拽上传
    const mimes = Object.keys(this.options.accepts || {}).reduce((m: string[], key) => m.concat(this.options.accepts![key]), [])
    // @ts-ignore
    if (this.quill.uploader && this.quill.uploader.options) {
      // @ts-ignore
      this.quill.uploader.options.mimetypes = mimes
    }

    if (typeof this.options.upload !== 'function') {
      // eslint-disable-next-line no-console
      console.error('[Missing config] upload function that returns a promise is required')
    }

    const toolbar: any = this.quill.getModule('toolbar')
    if (toolbar) {
      Object.keys(this.options.accepts || {}).forEach((key) => {
        toolbar.addHandler(key, () => this.pickFile(key))
      })
    }

    this.clipboardInit()
  }

  clipboardInit() {
    let pasteFiles: FileLike[] = []
    let pasteTimeout: number | undefined

    const uploadPasteFiles = () => {
      pasteFiles.forEach((file) => {
        const placeholderRange = this.getLoadingDomRange(file.name)
        this.uploadFiles(placeholderRange, [file as File])
      })
      pasteFiles = []
    }

    const pasteUploadHandler = (file: FileLike) => {
      pasteFiles.push(file)

      if (pasteTimeout) window.clearTimeout(pasteTimeout)
      pasteTimeout = window.setTimeout(uploadPasteFiles, 100)
    }

    // 粘贴base64图片
    this.quill.clipboard.addMatcher(Node.ELEMENT_NODE, (node: Node, delta: Delta) => {

      const tag = node.nodeName.toLowerCase()

      // 上传base64图片
      if (tag === 'img' && (node as HTMLImageElement).src.startsWith('data:')) {
        const imgFile = dataURLtoFile((node as HTMLImageElement).src, '') as FileLike
        imgFile.base64 = (node as HTMLImageElement).src

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

  pickFile(type: string) {
    let fileInput: HTMLInputElement | null = this.quill.container.querySelector('input.ql-uploader[type=file]')

    if (fileInput == null) {
      fileInput = document.createElement('input')
      fileInput.setAttribute('type', 'file')
      fileInput.classList.add('ql-uploader')
      fileInput.setAttribute('style', 'visibility:hidden')
      fileInput.addEventListener('change', () => {
        const range = this.quill.getSelection(true)
        const files = fileInput!.files
        if (files == null || files.length === 0) return
        this.uploadFiles(range, files)
        fileInput!.value = ''
      })
      this.quill.container.appendChild(fileInput)
    }

    const accept = (this.options.accepts && this.options.accepts[type])?.join(', ') || 'image/*'
    fileInput.setAttribute('accept', accept)
    fileInput.click()
  }

  insertPlaceholder(range: DomRange, url: any) {
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

  insertFilePlaceholder(range: DomRange, file: FileLike) {
    const type = (this.constructor as typeof CustomUploader).findType(file.type)
    if (!file.key) file.key = randomString()
    const key = file.key

    const placeholder = this.getLoadingDomRange(key)
    if (placeholder.delta) return Promise.resolve(placeholder.delta)

    return new Promise((resolve) => {
      if (type === 'attachment') {
        // 附件，直接插入文本
        resolve(this.insertPlaceholder(range, {
          label: file.name,
          url: (this.constructor as typeof CustomUploader).DefaultAttachmentPlaceholder,
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
        fileToBase64(file as File).then((base64) => {
          resolve(this.insertPlaceholder(range, {
            name: file.name,
            url: base64,
            key
          }))
        })
      } else if (this.options.accepts?.video?.includes(file.type)) {
        // 读取视频信息
        getVideoInfo(file as File).then((videoInfo) => {
          resolve(this.insertPlaceholder(range, {
            name: file.name,
            url: videoInfo.thumb,
            key
          }))
        })
      } else {
        // 其他文件，插入默认占位符
        resolve(this.insertPlaceholder(range, {
          url: (this.constructor as typeof CustomUploader).DefaultFilePlaceholder,
          key
        }))
      }
    })
  }

  // The length of the insert delta from insertBase64Image can vary depending on what part of the line the insert occurs
  calculatePlaceholderInsertLength(delta: any) {
    return delta.ops.reduce((accumulator: number, deltaOperation: any) => {
      if (Object.prototype.hasOwnProperty.call(deltaOperation, 'insert')) accumulator++

      return accumulator
    }, 0)
  }

  getLoadingDomRange(key: string): DomRange {
    const loadingEl = this.quill.container.querySelector(`.ql-uploading[data-key="${key}"]`)
    if (!loadingEl) return {
      index: 0,
      length: 0,
      ...this.quill.getSelection()
    }

    const blot = Quill.find(loadingEl)
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

  loadImage(res: any) {
    return new Promise((resolve) => {
      const info = this.getLoadingDomRange(res.key)
      const img = (info.blot?.domNode as HTMLElement).querySelector('img')
      if (!img) {
        resolve(info)
        return
      }

      img.addEventListener('load', () => resolve(info))
      img.src = res.url
    })
  }

  async insertToEditor(res: any) {
    const type = (this.constructor as typeof CustomUploader).findType(res.type)

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
      len = res.name.length + 1
      this.quill.insertText(info.index, res.name, {
        link: Object.assign({
          key: res.key,
          download: res.name,
          url: res.url,
          ext: res.name.slice(res.name.lastIndexOf('.') + 1)
        }, res.delta)
      }, 'user')
      this.quill.insertText(info.index + len - 1, ' ', { link: null }, 'user')
    } else {
      this.quill.insertEmbed(info.index, type, res.delta || res.url, 'user')
    }
    this.quill.setSelection(info.index + len, 'silent')

    return {
      ...info,
      length: len
    }
  }

  removePlaceholder(res: any) {
    this.quill.history.ignoreChange = true
    const info = this.getLoadingDomRange(res.key)
    this.quill.deleteText(info.index, info.length, 'api')
    this.quill.history.ignoreChange = false
  }

  async uploadFiles(range: DomRange, filesArg: FileList | File[]) {
    let files = Array.from(filesArg)
    if (this.options.handler) files = await this.options.handler(files)
    files = files.filter((f) => f && f.size > 0)
    if (!files.length) return

    this.quill.emitter.emit((this.constructor as typeof CustomUploader).Events.start, files)

    await Promise.all(files.map((file) => this.insertFilePlaceholder(range, file)))
    let lastRange: any

    const results = await this.options.upload(range, files, async (error: any, result: any) => {
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

    await Promise.allSettled(results.map(async (result: any) => {
      if (result.url) {
        lastRange = await this.insertToEditor(result)
      } else {
        this.removePlaceholder(result)
      }
    }))

    this.done(lastRange, results)
  }

  done(range: any, results: any) {
    if (range && this.options.focusOnDone) {
      this.quill.setSelection(range.index + range.length, 'user')
      setTimeout(() => this.quill.focus(), 16)
    }

    this.quill.emitter.emit((this.constructor as typeof CustomUploader).Events.done, results)
  }
}

export default CustomUploader

if ((window as any).Quill) {
  ;(window as any).Quill.register('modules/customUploader', CustomUploader)
}
