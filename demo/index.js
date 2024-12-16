import Quill from 'quill'
import 'quill/dist/quill.snow.css'

import CustomUploader from '../src/index'
import attachmentIcon from 'quill/assets/icons/attachment.svg?raw'

// replace iframe video to native video tag
import Video from 'quill-formats-video'
// import { randomString } from '../src/util.js'

Quill.register(Video, true)
Quill.register('modules/customUploader', CustomUploader)

const Icons = Quill.import('ui/icons')
Icons.attachment = attachmentIcon

// support blob protocol for demo
Video.PROTOCOL_WHITELIST.push('blob')
const Link = Quill.import('formats/link')
Link.PROTOCOL_WHITELIST.push('blob')
const Image = Quill.import('formats/image')
Image.sanitize = url => url

const demoEditor = new Quill('#editor', {
  theme: 'snow',
  modules: {
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike', { align: [] }, { color: [] }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image', 'video', 'attachment']
      ],
      handlers: {
        // 必须有值才能绑定事件
        attachment: true
      }
    },
    uploader: {
      // call customUploader
      handler (range, files) {
        return this.quill.customUploader?.uploadFiles(range, files)
      }
    },
    customUploader: {
      // handle files key, thumb
      /* handler: async (files) => {
        const fileList = []
        for (let i = 0; i < files.length; i++) {
          const f = files[i]
          // f.key = await calcHash(f)
          f.key = randomString()
          fileList.push(f)
        }
        return fileList
      }, */

      // Wait for all files to be uploaded
      // upload: uploadAllSettled,

      // Callback after each file upload
      upload: uploadCallback
    }
  }
})

// wait for all files
async function uploadAllSettled (_range, files) {
  const results = await Promise.allSettled(files.map((f, i) => waitUpload(f, i)))

  return results.map(item => {
    if (item.status === 'fulfilled') {
      return getFileResult(item.value)
    } else {
      return {
        key: item.file?.key,
        error: item.reason.message
      }
    }
  })
}

// each file callback
async function uploadCallback (_range, files, callback) {
  await Promise.allSettled(files.map(async (f, i) => {
    try {
      const res = await waitUpload(f, i)
      callback(null, getFileResult(res))
    } catch (e) {
      callback(e, f)
    }
  }))
}

function waitUpload (file, i) {
  return new Promise((resolve, reject) => {
    const t = (i + 1) * 1000

    /* const type = file.type.split('/')[0]
    // reject attachment
    if (!['image', 'video'].includes(type)) {
      setTimeout(() => {
        const error = new Error('test error')
        error.file = file
        reject(error)
      }, t)
      return
    } */

    // resolve
    // const t = (Math.random() * 5 + 2) * 1000
    file.url = URL.createObjectURL(file)
    setTimeout(() => resolve(file), t)
  })
}

// result to customUploader
function getFileResult (file) {
  return {
    type: file.type,
    name: file.name,
    key: file.key,
    url: file.url
  }
}

// demo
const $result = document.querySelector('#result')
$result.value = `Quill V${Quill.version}`
document.querySelector('.btn-html').addEventListener('click', function () {
  $result.value = demoEditor.root.innerHTML
})
document.querySelector('.btn-content').addEventListener('click', function () {
  const result = demoEditor.getContents()
  $result.value = JSON.stringify(result)
})
document.querySelector('.btn-text').addEventListener('click', function () {
  $result.value = demoEditor.getText()
})
document.querySelector('.btn-undo').addEventListener('click', function () {
  demoEditor.history.undo()
})
document.querySelector('.btn-redo').addEventListener('click', function () {
  demoEditor.history.redo()
})

window.editor = demoEditor
