import { Delta, Parchment, Range } from 'quill'

/**
 * 文件对象扩展类型，包含额外的上传相关属性
 */
export type FileLike = File & {
  /** Base64 编码的文件内容 */
  base64?: string
  /** 文件唯一标识 */
  key?: string
  /** 缩略图 URL（用于视频等） */
  thumb?: string
}

/**
 * 上传器配置选项
 */
export interface UploaderOptions {
  /**
   * 文件处理器，在上传前对文件进行预处理
   * @param files - 待处理的文件列表
   * @returns 处理后的文件列表
   */
  handler?: (files: FileLike[]) => Promise<FileLike[]> | FileLike[]

  /**
   * 文件上传函数
   * @param range - 当前光标位置范围
   * @param files - 待上传的文件列表
   * @param progress - 进度回调函数
   * @returns 上传结果列表
   */
  upload: (
    range: Range,
    files: FileLike[],
    progress: (error: any, result: any) => void
  ) => Promise<any[]>

  /**
   * 接受的文件类型配置
   * @example
   * {
   *   image: ['image/jpeg', 'image/png'],
   *   video: ['video/mp4'],
   *   attachment: ['application/pdf']
   * }
   */
  accepts?: Record<string, string[]>

  /**
   * 是否预加载图片（在插入编辑器前等待图片加载完成）
   * @default true
   */
  imagePreload?: boolean

  /**
   * 上传完成后是否自动聚焦编辑器
   * @default false
   */
  focusOnDone?: boolean
}

/**
 * DOM 范围扩展类型，包含 Blot 和 Delta 信息
 */
export type DomRange = Range & {
  /** Quill Blot 对象 */
  blot?: Parchment.Blot
  /** Delta 操作对象 */
  delta?: Delta
}

/**
 * 视频截取选项
 */
export interface VideoCaptureOptions {
  /** 截取时间点（秒），或百分比（0-1） */
  time?: number
  /** 图片质量（0-1） */
  quality?: number
  /** 图片类型 */
  type?: string
}

/**
 * 视频信息
 */
export interface VideoInfo {
  /** 视频缩略图（Base64） */
  thumb: string
  /** 视频时长（秒） */
  duration: number
  /** 视频宽度 */
  width: number
  /** 视频高度 */
  height: number
}

/**
 * 上传结果
 */
export interface UploadResult {
  /** 文件唯一标识 */
  key: string
  /** 文件类型 */
  type: string
  /** 文件名 */
  name: string
  /** 文件 URL */
  url: string
  /** 额外的 Delta 属性 */
  delta?: any
  /** 错误信息（上传失败时） */
  error?: string
}

/**
 * 上传器事件类型
 */
export interface UploaderEvents {
  /** 上传开始事件 */
  start: string
  /** 上传完成事件 */
  done: string
}

/**
 * 默认接受的文件类型配置
 */
export interface AcceptsConfig {
  image: string[]
  video: string[]
  attachment: string[]
}
