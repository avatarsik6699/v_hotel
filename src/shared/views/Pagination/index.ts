/* eslint-disable indent */
import { $ } from 'shared/utiles/dom';
import { Component, IComponent } from '../Component';
import { getIcon } from '../../utiles/svg';

const getPaginationTemplate = (
  itemList: { value: number | string; isCurrent: boolean }[],
) => {
  const btns = [
    {
      type: 'prevBtn',
      template: `<button class="pagination__more" data-type="prev">...</button>`,
    },
    {
      type: 'nextBtn',
      template: `<button class="pagination__more" data-type="next">...</button>`,
    },
  ];

  const content = itemList
    .map(({ value, isCurrent }) => {
      const btn = btns.find(({ type }) => type === value);
      const currentModifier = isCurrent ? '_current' : '';
      return btn
        ? `<li class="pagination__item ${currentModifier}" data-type="${btn.type}">...</li>`
        : `<li class="pagination__item ${currentModifier}" data-count=${value}>${value}</li>`;
    })
    .join('');
  return `
  <div class="pagination">
  <ul class="pagination__list">
    ${content}
    <button class="pagination__next" data-type="next">${getIcon({
      id: 'arrow',
      style: { fill: 'white' },
    })}</button>
  </ul>
    <div class="pagination__footer">
      <span>1 - 12 из 100+ вариантов аренды</span>
    </div>
  </div>
  `;
};

export namespace IPagination {}

export class Pagination extends Component<'onClick'> {
  currentValue = 1;
  total = 15;
  constructor(
    selector: string,
    config: { currentValue: number; total: number },
  ) {
    super(selector);
    this.bindEvents([{ method: 'onClick', $root: this.$root.$el }]);
    this.render(config.currentValue, config.total);
  }

  render(current: number, total: number) {
    this.currentValue = current;
    this.total = total;
    if (!this.$root.isEmpty()) this.$root.clear();

    const paginationList = this.getPaginationList(current, total);
    const template = getPaginationTemplate(paginationList);
    $(this.$root.$el).add('start', template);
  }

  private getPaginationList(currentValue: number, total: number) {
    const isCurrentInStartRange = currentValue >= 1 && currentValue <= 2;
    const isCurrentInFinishRange =
      currentValue >= total - 1 && currentValue <= total;

    if (isCurrentInStartRange) {
      return [
        { value: 1, isCurrent: currentValue === 1 },
        { value: 2, isCurrent: currentValue === 2 },
        { value: 3, isCurrent: currentValue === 3 },
        { value: 'nextBtn', isCurrent: false },
        { value: total, isCurrent: false },
      ];
    }

    if (isCurrentInFinishRange) {
      return [
        { value: 1, isCurrent: false },
        { value: 'prevBtn', isCurrent: false },
        { value: total - 2, isCurrent: currentValue === total - 2 },
        { value: total - 1, isCurrent: currentValue === total - 1 },
        { value: total, isCurrent: currentValue === total },
      ];
    }

    const prevValue = currentValue - 1;
    const nextValue = currentValue + 1;

    return [
      { value: 1, isCurrent: false },
      { value: 'prevBtn', isCurrent: false },
      { value: prevValue, isCurrent: false },
      { value: currentValue, isCurrent: true },
      { value: nextValue, isCurrent: false },
      { value: 'nextBtn', isCurrent: false },
      { value: total, isCurrent: false },
    ];
  }

  onClick(ev: IComponent.EventType) {
    const target = ev.target as HTMLElement;
    const { type, count } = target.dataset;
    if (type) {
      if (type === 'next') {
        const nextValue =
          Number(this.currentValue) + 1 > this.total
            ? this.total
            : Number(this.currentValue) + 1;
        this.render(nextValue, this.total);
        return;
      }

      const $prevEl = (
        type === 'nextBtn'
          ? target.previousElementSibling
          : target.nextElementSibling
      ) as HTMLElement;
      if (type === 'nextBtn') {
        console.log($prevEl.dataset.count);
        this.render(Number($prevEl.dataset.count) + 1, 15);
      } else {
        this.render(Number($prevEl.dataset.count) - 1, 15);
      }
    }

    if (count) {
      this.render(Number(count), 15);
    }
  }
}
