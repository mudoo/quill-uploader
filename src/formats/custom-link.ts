import _Quill from 'quill'
const Quill = (window as any).Quill || _Quill

const Link = Quill.import('formats/link')

class CustomLink extends Link {
  static create (value: any) {
    if (typeof value === 'string') {
      value = {
        url: value
      }
    }

    const node = super.create(value.url) as HTMLElement
    if (value.download) {
      node.setAttribute('download', value.download)
      delete value.download
    }
    delete value.url
    Object.assign(node.dataset, value)

    return node
  }

  static formats (domNode: HTMLElement) {
    const res: any = { ...domNode.dataset }
    if (!res.url) {
      res.url = domNode.getAttribute('href')
    }
    return res
  }

  static register () {
    const Block = Quill.import('blots/block')
    Block.allowedChildren.push(CustomLink)
  }

  format (name: string, value: any) {
    if (value && typeof value === 'object') {
      super.format(name, value.url)
    } else {
      super.format(name, value)
    }
  }
}

export default CustomLink
