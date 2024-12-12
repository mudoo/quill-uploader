import _Quill from 'quill'
const Quill = window.Quill || _Quill

const Link = Quill.import('formats/link')

class CustomLink extends Link {
  // NOTE: 独立blot会导致链接编辑异常，tooltip保存之后，会在外部再包裹一层link
  // static blotName = 'attachment'
  // static className = 'ql-attachment'
  static create (value) {
    if (typeof value === 'string') {
      value = {
        url: value
      }
    }

    const node = super.create(value.url)
    if (value.download) {
      node.setAttribute('download', value.download)
      delete value.download
    }
    delete value.url
    Object.assign(node.dataset, value)

    return node
  }

  static formats (domNode) {
    const res = { ...domNode.dataset }
    if (res.url) {
      res.url = domNode.getAttribute('href')
    }
    return res
  }

  static value (domNode) {
    return domNode.dataset.url || domNode.getAttribute('href')
  }

  static register () {
    const Block = Quill.import('blots/block')
    Block.allowedChildren.push(CustomLink)
  }
}

export default CustomLink
