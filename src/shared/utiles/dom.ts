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
