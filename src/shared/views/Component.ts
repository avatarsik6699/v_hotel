import { $ } from 'shared/utiles/dom';
import { ComponentEvents, getMethodName } from 'shared/utiles/getMethodName';

const getEventName = (ev: string) => ev[2].toLocaleLowerCase() + ev.slice(3);

export namespace IComponent {
  export type Methods = 'onClick';
  export type EventType = Event & {
    type: keyof GlobalEventHandlersEventMap;
    target: HTMLElement;
  };
}

export class Component<M extends keyof Partial<ComponentEvents>> {
  $root;
  constructor(selector: string) {
    this.$root = $(selector);
  }

  // eslint-disable-next-line fsd/hof-name-prefix
  bindEvents(events: { method: M; $root?: HTMLElement }[]) {
    const unBindClbcks = events.map(({ method, $root }) => {
      const correctEvent = getEventName(method);
      if ($root) {
        $root.addEventListener(correctEvent, this);
        return () => $root.removeEventListener(correctEvent, this);
      }

      window.addEventListener(correctEvent, this);
      return () => window.removeEventListener(correctEvent, this);
    });

    return () => unBindClbcks?.forEach(clbck => clbck());
  }

  handleEvent(
    this: { [key in M]: (ev: IComponent.EventType) => void },
    ev: IComponent.EventType,
  ) {
    const method = getMethodName<M>(ev.type);
    if (this[method]) {
      this[method](ev);
    }
  }
}
