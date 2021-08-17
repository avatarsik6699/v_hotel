import { FormattedMenuItem } from '../types';

type GetMenuTemplate = (props: { items: FormattedMenuItem[] }) => string;

const getItemTemplate = (item: FormattedMenuItem) => {
  const isDisabled = item.isDisabled && 'disabled';
  return `<li class="dropdown__menu-item">
    <span class="dropdown__menu-category">${item.category}</span>
    <div class="dropdown__menu-panel" data-item_id=${item.id}>
      <button class="btn dropdown__menu-sub" data-action="sub" ${isDisabled}>-</button>
      <span class="dropdown__menu-count" data-counter_id=${item.id}>${item.count}</span>
      <button class="btn dropdown__menu-add" data-action="add">+</button>
    </div>
  </li>`;
};

export const getMenuTemplate: GetMenuTemplate = ({ items }) => {
  const listTemplate = items.map(item => getItemTemplate(item)).join('');

  return `
  <section class="dropdown__menu">
    <ul class="dropdown__menu-list">
      ${listTemplate}
    </ul>
  </section>
`;
};
