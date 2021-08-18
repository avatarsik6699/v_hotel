import './style.scss';
import './shared/views/Dropdown/index';
import { RangeSlider } from 'shared/views/RangeSlider';

const rangeSlider = new RangeSlider('.slider-wrapper', {
  connect: true,
  start: [5000, 10000],
  range: {
    min: 5000,
    max: 10000,
  },
});
