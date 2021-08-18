export namespace ILike {
  export type Children = { [key: string]: HTMLElement };
  export type Config = { count: number; isChecked: boolean };
  export type Methods = 'onClick';
  export type EventType = Event & {
    type: keyof GlobalEventHandlersEventMap;
    target: HTMLElement;
  };
}
