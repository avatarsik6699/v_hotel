import { getIcon } from '../../utiles/svg';
/* eslint-disable indent */
const gradient = `
  <linearGradient id="favorite-gradient" x1="4.93026" y1="-6" x2="4.93026" y2="14" gradientUnits="userSpaceOnUse">
        <stop stop-color="#BC9CFF" />
        <stop offset="1" stop-color="#8BA4F9" />
  </linearGradient>`;

const getLikeTemplate = ({ count = 0, isChecked = false }) => {
  const likeCls = isChecked ? 'like _checked' : 'like';
  const countCls = isChecked ? 'like__count _checked' : 'like__count';
  return `
    <div class=${likeCls}>
      <span class="like__icon">
        ${getIcon({
          id: 'favorite',
          gradient,
        })}
      </span>
      <span class=${countCls} data-count=${count}>${count}</span>
    </div>
  `;
};

export { getLikeTemplate };
