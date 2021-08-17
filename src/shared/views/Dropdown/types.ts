// COMMON TYPES DROPDOWN AND SUBMODULES
type MenuItemCategories = 'Спальни' | 'Кровати' | 'Ванные комнаты';
type FormattedMenuItem = {
  id: number;
  category: MenuItemCategories;
  count: number;
  isDisabled: boolean;
};

type DefaultMenuItem = {
  id: number;
  text: MenuItemCategories;
  defaultValue: number;
};

export namespace IDropdown {
  export type Categories = MenuItemCategories;
  export type TemplateData = {
    label?: string;
    value?: string;
    icon?: string;
  };
  export type State = {
    items: FormattedMenuItem[];
    selectedItems: FormattedMenuItem[];
  };
  export type Actions = 'sub' | 'add';
  export type Constructor = {
    selector: string;
    config: {
      items: DefaultMenuItem[];
      templateData: IDropdown.TemplateData;
    };
  };
  export type Methods = 'onClick';
  export type Children = { [key: string]: HTMLElement };
  export type EventType = Event & {
    type: keyof GlobalEventHandlersEventMap;
    target: HTMLElement;
  };
}

export type { MenuItemCategories, DefaultMenuItem, FormattedMenuItem };
