// class WindowEventHandler {
//   init() {
//     window.addEventListener();
//   }

//   handleEvent(ev: Event) {

//   }
// }

// const weh = new WindowEventHandler();
type TCallBack = (ev: Event) => void;

const subscribers: { [key in keyof WindowEventMap]?: TCallBack[] } = {};

// eslint-disable-next-line fsd/hof-name-prefix
const subscribeWindoweEvent = (
  method: keyof WindowEventMap,
  clbck: TCallBack,
) => {
  const isSubscribe = subscribers[method]?.some(f => f === clbck);
  if (isSubscribe) return;

  const prevValue = subscribers[method] || [];
  subscribers[method] = [...prevValue, clbck];

  window.addEventListener(method, clbck);
  return () => window.removeEventListener(method, clbck);
};

export { subscribeWindoweEvent };
