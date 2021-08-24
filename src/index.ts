import './style.scss';
import './shared/views/Dropdown/index';
import { Pagination } from 'shared/views/Pagination';
// import { Datepicker } from 'vanillajs-datepicker';
import { $ } from 'shared/utiles/dom';
import { Calendar } from 'shared/views/Calendar';

const c = new Calendar('.foo');
// import { Datepicker } from 'vanillajs-datepicker';

// const btns = [
//   { type: 'prev', template: `<button data-type="prev">...</button>` },
//   { type: 'next', template: `<button data-type="next">...</button>` },
// ];
// const $root = document.querySelector('.pagination-list') as HTMLElement;

// const getPagination = (current: number, total: number) => {
//   if (current >= 1 && current <= 2) {
//     return [1, 2, 3, 'next', total];
//   }

//   if (current >= total - 2 && current <= total) {
//     return [1, 'prev', total - 2, total - 1, total];
//   }
//   const prev = current - 1;
//   const next = current + 1;

//   // if (total - next === 1) {
//   //   return [1, '...', prev, current, next, next + 1, total];
//   // }
//   return [1, 'prev', prev, current, next, 'next', total];
// };

// const render = (current: number, total: number) => {
//   if ($root?.children.length !== 0) $root.innerHTML = '';
//   const pagination = getPagination(current, total);
//   const template = pagination
//     .map(i => {
//       const btn = btns.find(b => b.type === i);
//       if (btn) {
//         return `<li>${btn.template}</li>`;
//       }
//       return `<li data-count=${i}>${i}</li>`;
//     })
//     .join('');
//   $root?.insertAdjacentHTML('afterbegin', template);
// };

// const onPagination = (ev: Event) => {
//   const target = ev.target as HTMLElement;
//   if (target.dataset.type) {
//     const { type } = target.dataset;
//     if (type === 'next') {
//       const $prevEl = target.parentElement
//         ?.previousElementSibling as HTMLElement;
//       const { count } = $prevEl.dataset;
//       render(Number(count) + 1, 15);
//     } else {
//       const $prevEl = target.parentElement?.nextElementSibling as HTMLElement;
//       const { count } = $prevEl.dataset;
//       render(Number(count) - 1, 15);
//     }
//     console.log(target.dataset.type);
//   }
//   if (target.dataset.count) {
//     console.log(target.dataset.count);
//   }
// };

// render(1, 15);
// $root?.addEventListener('click', onPagination);
// const rangeSlider = new RangeSlider('.slider-wrapper', {
//   connect: true,
//   start: [5000, 10000],
//   range: {
//     min: 5000,
//     max: 10000,
//   },
// });

// const pagination = new Pagination('.pagination-wrapper', {
//   currentValue: 1,
//   total: 15,
// });
