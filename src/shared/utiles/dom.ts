class Dom {
  constructor(public $el: HTMLElement) {}
  add(pos: 'start' | 'end', template: HTMLElement | string) {
    const correctPos = pos === 'start' ? 'afterbegin' : 'beforeend';
    if (typeof template === 'string') {
      this.$el.insertAdjacentHTML(correctPos, template);
    } else {
      this.$el.insertAdjacentElement(correctPos, template);
    }
  }

  clear() {
    this.$el.innerHTML = '';
  }

  isEmpty() {
    return this.$el.children.length === 0;
  }

  remove() {
    this.$el.remove();
  }

  hide() {
    this.$el.hidden = true;
  }

  get(selector: string) {
    const target = this.$el.querySelector(selector) as HTMLElement;
    if (!target) return null;
    return new Dom(target);
  }
}

export const $ = (
  selector: string | HTMLElement,
  root: HTMLElement | Document = document,
) => {
  if (typeof selector === 'string') {
    const $el = root.querySelector(selector) as HTMLElement;
    if (!$el) throw new Error("Selector wasn't found");
    return new Dom($el);
  }

  return new Dom(selector);
};
