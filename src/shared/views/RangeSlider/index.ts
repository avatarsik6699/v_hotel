import './default.scss';
import './style.scss';
import { $ } from 'shared/utiles/dom';
// import noUiSlider, { Options } from 'nouislider';
import noUiSlider, { Options } from 'nouislider';
import wNumb from 'wnumb';

export namespace IRangeSlider {
  export type Config = Options;
}

const getTemplate = (values: string[]) => `
  <div class="slider-wrapper__header">
    <span class="slider-wrapper__label">Range Slider</span>
    <div class="slider-wrapper__values">
      <span class="slider-wrapper__start-value -value"></span>
      <span class="slider-wrapper__separator">-</span>
      <span class="slider-wrapper__end-value -value"></span>
    </div>
  </div>
`;

type Keys = '$start' | '$end';
type Inputs = { [key in Keys]: HTMLElement };

export class RangeSlider {
  selectors = [
    { s: '.slider-wrapper__start-value', key: '$start' },
    { s: '.slider-wrapper__end-value', key: '$end' },
  ];
  inputs: Inputs;
  $root: HTMLElement;
  values: string[] = [];
  constructor(root: string, private config: IRangeSlider.Config) {
    this.$root = $(root).$el;
    this.init();
  }

  init() {
    const onUpdate = (values: (string | number)[]) =>
      this.updateInputs(values as string[]);

    const slider = noUiSlider.create(this.$root, {
      ...this.config,
      format: wNumb({
        decimals: 0,
        thousand: ' ',
        suffix: '₽',
      }),
    });
    // this.values = slider.get() as string[];
    $(this.$root).add('start', getTemplate(this.values));
    this.inputs = this.getInputs();

    slider.on('update', onUpdate);
  }

  private getInputs() {
    return this.selectors.reduce(
      (acc, { s, key }) => ({ ...acc, [key]: $(s).$el }),
      {},
    ) as Inputs;
  }

  private updateInputs([startValue, endValue]: string[]) {
    const { $start, $end } = this.inputs;
    $start.textContent = startValue;
    $end.textContent = endValue;
  }

  // renderValues() {}
}
