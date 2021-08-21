export type ComponentEvents = {
  [K in keyof GlobalEventHandlersEventMap as `on${Capitalize<K>}`]: GlobalEventHandlersEventMap[K];
};

export const getMethodName = <T extends keyof ComponentEvents>(
  eventType: keyof GlobalEventHandlersEventMap,
) => `on${eventType[0].toUpperCase()}${eventType.slice(1)}` as T;
