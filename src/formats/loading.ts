import _Quill from 'quill'
const Quill = (window as any).Quill || _Quill

const Image = Quill.import('formats/image')
const EmbedBlot = Quill.import('blots/embed')

class Loading extends EmbedBlot {
  static blotName = 'loadingBlot'
  static className = 'ql-uploading'
  static tagName = 'span'
  static allowedChildren = [Image]

  static create(value: any) {
    const node = super.create(value) as HTMLElement
    if (value === true) {
      return node
    } else if (typeof value === 'string') {
      value = {
        url: value
      }
    }

    if (value.url) {
      const image = document.createElement('img')
      image.setAttribute('src', value.url)
      image.setAttribute('alt', value.label || value.name || '')
      if (value.width) image.setAttribute('width', value.width)
      if (value.height) image.setAttribute('height', value.height)
      node.appendChild(image)
    }

    const dataset: any = { ...value }
    delete dataset.url
    Object.assign(node.dataset, dataset)

    node.setAttribute('contenteditable', 'false')
    return node
  }

  static formats(domNode: HTMLElement) {
    return { ...domNode.dataset }
  }

  static value() {
    return undefined
  }

  static register() {
    const Block = Quill.import('blots/block') as any
    Block.allowedChildren.push(Loading)
  }
}

export default Loading
