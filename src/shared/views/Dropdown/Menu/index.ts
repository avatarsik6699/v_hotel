type MenuItem = { text: string; defaultValue: number };
type GetMenuTemplate = (props: { list: MenuItem[] }) => string;

const getItemTemplate = (item: MenuItem) =>
  `<li class="dropdown__menu-item">
    <span class="dropdown__menu-category">${item.text}</span>
    <div class="dropdown__menu-panel">
      <button class="btn dropdown__menu-sub">-</button>
      <span class="dropdown__menu-count">${item.defaultValue}</span>
      <button class="btn dropdown__menu-add">+</button>
    </div>
  </li>`;

export const getMenuTemplate: GetMenuTemplate = ({ list }) => {
  const listTemplate = list.map(item => getItemTemplate(item)).join('');

  return `
  <section class="dropdown__menu">
    <ul class="dropdown__menu-list">
      ${listTemplate}
    </ul>
  </section>
`;
};

export type { MenuItem };
