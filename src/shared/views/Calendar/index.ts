/* eslint-disable fsd/no-function-declaration-in-event-listener */
/* eslint-disable import/no-unresolved */
import { $ } from 'shared/utiles/dom';
import Litepicker from 'litepicker';
import { ILPConfiguration } from 'litepicker/dist/types/interfaces';
import { Component, IComponent } from '../Component';
import './style.scss';
import { getIcon } from '../../utiles/svg';

const getCalendarFooterTemplate = () => `
    <div class="footer">
      <button class="button _theme-none" data-action="clear">
        <span class="button__text">очистить</span>
      </button>
      <button class="button _theme-none" data-action="apply">
        <span class="button__text">применить</span>
      </button>
    </div>
  `;

export class Calendar extends Component<'onClick'> {
  calendar: Litepicker | null = null;
  btnClear: HTMLButtonElement | null = null;
  btnApply: HTMLButtonElement | null = null;
  defaultConfig = {
    lang: 'ru-RU',
    format: 'DD.MM.YYYY',
    singleMode: false,
    element: this.$root.$el,
    delimiter: ' - ',
    buttonText: {
      apply: 'apply',
      cancel: '',
      previousMonth: getIcon({ id: 'arrow' }),
      nextMonth: getIcon({ id: 'arrow' }),
      reset: 'reset',
    },
    showTooltip: false,
    autoApply: false,
    resetButton: true,
  };

  constructor(selector: string, private config?: ILPConfiguration) {
    super(selector);
    this.render();
  }

  render() {
    const calendar = new Litepicker({
      ...this.defaultConfig,
      ...this.config,
    });
    // calendar.show();
    this.calendar = calendar;

    calendar.on('render', ui => {
      this.btnClear = $('.reset-button', ui).$el as HTMLButtonElement;
      this.btnApply = $('.button-apply', ui).$el as HTMLButtonElement;
      $('.container__footer', ui).hide();
      $(this.btnClear).hide();

      $('.month-item', ui).add('end', getCalendarFooterTemplate());
    });
    calendar.on('before:render', ui => {
      $('.month-item', ui).add('end', getCalendarFooterTemplate());
      this.bindEvents([{ method: 'onClick', $root: ui }]);
    });
  }

  onClick(ev: IComponent.EventType) {
    const btn = ev.target.closest('.button') as HTMLElement | undefined;
    if (!btn) return;

    const { action } = btn.dataset;
    if (action) {
      if (action === 'apply') {
        this.btnApply?.click();
      }

      if (action === 'clear') {
        this.btnClear?.click();
      }
    }
  }
}
