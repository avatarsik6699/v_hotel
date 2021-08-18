/* eslint-disable indent */
import icons from '@assets/images/sprite.svg';

type StopGradientColor = { color: string; offset?: 'string' };
type Gradient = {
  id: string;
  x1: string;
  y1: string;
  x2: string;
  y2: string;
  stops: StopGradientColor[];
};

type CSSProperties = { [key: string]: string | number };
type GetIconType = (props: {
  id: string;
  style?: CSSProperties;
  gradient?: string;
  className?: string;
}) => string;

const generateGradient = (gradient: Gradient[]) =>
  gradient
    .map(
      g => `
  <defs>
    <linearGradient id=${g.id} x1=${g.x1} y1=${g.y1} x2=${g.x1} y2=${
        g.y2
      } gradientUnits="userSpaceOnUse">
      ${g.stops
        .map(s => `<stop stop-color=${s.color} offset=${s?.offset || '0'}`)
        .join('')}
    </linearGradient>
  </defs>
  `,
    )
    .join('');

// const gradient = ` <linearGradient id="kek" x1="9" y1="-13" x2="9" y2="31" gradientUnits="userSpaceOnUse">
// <stop stop-color="#BC9CFF" />
// <stop offset="1" stop-color="#8BA4F9"/>
// </linearGradient>`;
//    ${gradient && generateGradient(gradient)}
export const getIcon: GetIconType = ({
  id = 'expand_more',
  style,
  gradient,
  className = 'icon',
}) => {
  const validStyle = Object.entries({ ...style, width: '100%', height: '100%' })
    .reduce((s, [k, v]) => `${s}${k}:${v};`, '')
    .trim();
  return `
  <svg class='${className}' style=${validStyle}>
    <use xlink:href='${icons}#${id}'>
    </use>
    ${gradient}
  </svg>
`;
};
