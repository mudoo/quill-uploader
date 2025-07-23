/**
 * 生成一个精炼的随机字符串
 * @param {number} length - 生成字符串的长度
 * @returns {string} - 随机字符串
 */
export function randomString (length = 8) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
}

/**
 * 文件转为base64
 *
 * @param {File} file 文件对象
 * @returns {Promise<string>} base64
 */
export function fileToBase64 (file) {
  return new Promise((resolve, reject) => {
    let reader = new FileReader()
    reader.onload = function (e) {
      reader = null
      resolve(e.target.result)
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

/**
 * 获取视频信息
 *
 * @param {File} file 文件对象
 * @returns {Promise<object>} { thumb, duration, width, height }
 */
export function getVideoInfo (url, captureOpts) {
  captureOpts = Object.assign({ time: 3 }, captureOpts)
  return new Promise((resolve, reject) => {
    let video = document.createElement('video')

    const videoOptions = {
      autoplay: true,
      loop: true,
      muted: true,
      playsinline: true,
      'webkit-playsinline': true,
      preload: 'auto',
      crossOrigin: 'anonymous'
    }

    for (const key in videoOptions) {
      if (!Object.prototype.hasOwnProperty.call(videoOptions, key)) continue
      video.setAttribute(key, videoOptions[key])
    }

    const isFile = url instanceof File
    if (isFile) url = URL.createObjectURL(url)
    video.addEventListener('loadedmetadata', function () {
      if (!captureOpts.time) return
      let time = captureOpts.time

      if (time < 1) {
        time = this.duration * time
      }

      this.currentTime = time
    })
    video.addEventListener('loadeddata', function () {
      const cover = captureVideo(video, captureOpts)
      const info = {
        thumb: cover,
        duration: Math.round(this.duration),
        width: this.videoWidth,
        height: this.videoHeight
      }

      if (isFile) URL.revokeObjectURL(url)
      resolve(info)
      video = null
    })
    video.addEventListener('play', function () {
      this.pause()
    })
    video.addEventListener('error', function (err) {
      reject(err)
      video = null
    })

    video.src = url
  })
}

export function captureVideo (video, opts) {
  opts = Object.assign(
    {
      quality: 0.8,
      type: 'image/jpeg'
    },
    opts
  )

  // 计算等比缩小后图片宽高
  const cvs = document.createElement('canvas')
  cvs.width = video.videoWidth
  cvs.height = video.videoHeight
  const ctx = cvs.getContext('2d')
  ctx.drawImage(video, 0, 0, cvs.width, cvs.height)

  return cvs.toDataURL(opts.type, opts.quality)
}

/**
 * 将base64转换为file文件
 *
 * @export
 * @param {String} dataUrl base64图片
 * @param {String} filename 生成文件名，默认随机
 * @returns {File} 文件对象
 */
export function dataURLtoFile (dataUrl, filename) {
  const arr = dataUrl.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)

  if (!filename) {
    const ext = mime.split('/')[1].replace('jpeg', 'jpg')
    filename =
      Math.random()
        .toString()
        .substr(3) +
      '.' +
      ext
  }

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }

  return new File([u8arr], filename, { type: mime })
}
