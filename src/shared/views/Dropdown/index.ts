import { getMethodName } from 'shared/utiles/getMethodName';
import { getIcon } from '../../utiles/svg';
import { getMenuTemplate, MenuItem } from './Menu/index';

namespace IDropdown {
  export type Constructor = { selector: string; config?: { list: MenuItem[] } };
  export type Methods = 'onClick';
  export type Component = { selector: string; $el: HTMLElement };
  export type EventType = Event & {
    type: keyof GlobalEventHandlersEventMap;
    target: HTMLElement;
  };
}

class Dropdown {
  private selectors = ['.dropdown__icon', '.dropdown__menu-list'];
  $components: IDropdown.Component[] = [];
  $root: HTMLElement;
  template = `
    <div class="dropdown">
      <div class="dropdown__field">
        <span class="dropdown__label">dropdown</span>
        <input class="dropdown__input" type="button" value="Сколько гостей" />
        <span class="dropdown__icon">
          ${getIcon({ id: 'expand_more' })}
        </span>
      </div>
    </div>
  `;

  constructor(
    selector: IDropdown.Constructor['selector'],
    private config: IDropdown.Constructor['config'],
  ) {
    this.$root = this.getRoot(selector);
    this.init();
  }

  init() {
    this.bindEvents();
    const menuTemplate = getMenuTemplate({ list: this.config?.list ?? [] });

    this.$root.insertAdjacentHTML('afterbegin', this.template);
    this.$root
      .querySelector('.dropdown')
      ?.insertAdjacentHTML('beforeend', menuTemplate);

    this.$components = this.selectors.map(s => ({
      selector: s,
      $el: document.querySelector(s)!,
    }));
  }

  render() {
    // this.root.inser;
  }

  handleEvent(ev: IDropdown.EventType) {
    const method = getMethodName<IDropdown.Methods>(ev.type);
    this[method](ev);
  }

  private bindEvents() {
    window.addEventListener('click', this);
  }

  private onClick(ev: IDropdown.EventType) {
    const { target } = ev;
    const $icon = this.getComponent('.dropdown__icon');
    const $menu = this.getComponent('.dropdown__menu-list');

    const isClickOnMenu = this.closest('.dropdown__menu', target);
    const isClickOnHeader = this.closest('.dropdown__field', target);

    if (isClickOnMenu) return;
    if (isClickOnHeader) {
      $icon?.classList.toggle('_opened');
      $menu?.classList.toggle('_opened');
    } else {
      $icon?.classList.remove('_opened');
      $menu?.classList.remove('_opened');
    }
  }

  private getComponent(selector: string) {
    return this.$components.find(item => item.selector === selector)?.$el;
  }

  private closest(selector: string, target: HTMLElement) {
    return Boolean(target.closest(selector));
  }

  private getRoot(selector: string) {
    const $root = document.querySelector(selector) as HTMLElement;
    if (!$root) throw new Error("root container wasn't found");
    return $root;
  }
}

const dropdown = new Dropdown('.dropdown-wrapper', {
  list: [
    { text: 'Спальни', defaultValue: 0 },
    { text: 'кровати', defaultValue: 0 },
    { text: 'ванные комнаты', defaultValue: 0 },
  ],
});
