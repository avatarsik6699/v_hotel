import icons from '@assets/images/sprite.svg';

type CSSProperties = { [key: string]: string | number };
type GetIconType = (props: {
  id: string;
  style?: CSSProperties;
  hasGradient?: boolean;
  className?: string;
}) => string;

const gradient = ` <linearGradient id="kek" x1="9" y1="-13" x2="9" y2="31" gradientUnits="userSpaceOnUse">
<stop stop-color="#BC9CFF" />
<stop offset="1" stop-color="#8BA4F9"/>
</linearGradient>`;

export const getIcon: GetIconType = ({
  id = 'expand_more',
  style,
  hasGradient,
  className = 'icon',
}) => {
  const validStyle = Object.entries({ ...style, width: '100%', height: '100%' })
    .reduce((s, [k, v]) => `${s}${k}:${v};`, '')
    .trim();
  return `
  <svg class='${className}' style=${validStyle}>
    <use xlink:href='${icons}#${id}'></use>
    ${hasGradient && gradient}
  </svg>
`;
};
