/**
 * 生成一个精炼的随机字符串
 * @param {number} length - 生成字符串的长度
 * @returns {string} - 随机字符串
 */
export function randomString(length = 8): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
}

/**
 * 文件转为base64
 *
 * @param {File} file 文件对象
 * @returns {Promise<string>} base64
 */
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    let reader: FileReader | null = new FileReader()
    reader.onload = function (e: ProgressEvent<FileReader>) {
      // result 在这里应为 dataURL 字符串
      const result = e.target?.result as string
      reader = null
      resolve(result)
    }
    reader.onerror = (err) => {
      reject(err)
      reader = null
    }
    reader.readAsDataURL(file)
  })
}

export interface VideoCaptureOptions {
  time?: number
  quality?: number
  type?: string
}

export interface VideoInfo {
  thumb: string
  duration: number
  width: number
  height: number
}

/**
 * 获取视频信息
 *
 * @param {string|File} url 文件对象或地址
 * @returns {Promise<object>} { thumb, duration, width, height }
 */
export function getVideoInfo(url: string | File, captureOpts?: VideoCaptureOptions): Promise<VideoInfo> {
  captureOpts = Object.assign({ time: 3 }, captureOpts)
  return new Promise((resolve, reject) => {
    let video: HTMLVideoElement | null = document.createElement('video')

    const videoOptions: Record<string, string | boolean> = {
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
      video.setAttribute(key, String(videoOptions[key]))
    }

    const isFile = url instanceof File
    let src: string | File = url
    if (isFile) src = URL.createObjectURL(url as File)

    video.addEventListener('loadedmetadata', function () {
      if (!captureOpts || !captureOpts.time) return
      let time = captureOpts.time as number

      if (time < 1) {
        time = (video as HTMLVideoElement).duration * time
      }

      ;(video as HTMLVideoElement).currentTime = time
    })
    video.addEventListener('loadeddata', function () {
      const cover = captureVideo(video as HTMLVideoElement, captureOpts)
      const info: VideoInfo = {
        thumb: cover,
        duration: Math.round((video as HTMLVideoElement).duration),
        width: (video as HTMLVideoElement).videoWidth,
        height: (video as HTMLVideoElement).videoHeight
      }

      if (isFile) URL.revokeObjectURL(src as string)
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

    ;(video as HTMLVideoElement).src = typeof src === 'string' ? src : (src as File) as unknown as string
  })
}

export function captureVideo(video: HTMLVideoElement, opts: { quality?: number; type?: string } = { quality: 0.8, type: 'image/jpeg' }): string {
  const options = Object.assign({ quality: 0.8, type: 'image/jpeg' }, opts)

  const cvs = document.createElement('canvas')
  cvs.width = video.videoWidth
  cvs.height = video.videoHeight
  const ctx = cvs.getContext('2d')
  if (ctx) ctx.drawImage(video, 0, 0, cvs.width, cvs.height)

  return cvs.toDataURL(options.type as string, options.quality as number)
}

/**
 * 将base64转换为file文件
 *
 * @export
 * @param {String} dataUrl base64图片
 * @param {String} filename 生成文件名，默认随机
 * @returns {File} 文件对象
 */
export function dataURLtoFile(dataUrl: string, filename?: string): File {
  const arr = dataUrl.split(',')
  const mimeMatch = arr[0].match(/:(.*?);/)
  const mime = mimeMatch ? mimeMatch[1] : 'image/png'
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)

  if (!filename) {
    const ext = mime.split('/')[1].replace('jpeg', 'jpg')
    filename = Math.random().toString().substr(3) + '.' + ext
  }

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }

  return new File([u8arr], filename, { type: mime })
}
