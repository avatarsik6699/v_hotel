/* eslint-disable fsd/no-function-declaration-in-event-listener */
import { $ } from 'shared/utiles/dom';
import Litepicker from 'litepicker';
import { Component, IComponent } from '../Component';
import './style.scss';
import { getIcon } from '../../utiles/svg';

const getCalendarFooterTemplate = () => {
  return `
    <div class="footer">
      <button class="button _theme-none" data-action="clear">
        <span class="button__text">очистить</span>
      </button>
      <button class="button _theme-none" data-action="apply">
        <span class="button__text">применить</span>
      </button>
    </div>
  `;
};

export class Calendar extends Component<'onClick'> {
  calendar: Litepicker | null = null;
  constructor(selector: string, private config: IDatepicker.Config) {
    super(selector);
    this.render();
  }

  render() {
    // const datepicker = new DateRangePicker($('.foosolo').$el, this.config);
    const calendar = new Litepicker({
      // ...this.config,
      lang: 'ru-RU',
      format: 'DD.MM.YYYY',
      singleMode: false,
      element: this.$root.$el,
      delimiter: ' - ',
      buttonText: {
        apply: 'apply',
        cancel: 'clear',
        previousMonth: getIcon({ id: 'arrow' }),
        nextMonth: getIcon({ id: 'arrow' }),
        reset: '',
      },
      showTooltip: false,
      autoApply: false,
      // resetButton: () => {
      //   const btn = document.createElement('button');
      //   btn.innerText = 'Clear';
      //   btn.addEventListener('click', evt => {
      //     evt.preventDefault();

      //     // some custom action
      //   });

      //   return btn;
      // },
    });
    // d.show();
    this.calendar = calendar;
    calendar.on('render', ui => {
      // $('.container__footer', ui).remove();
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
        this.calendar?.hide();
      }

      if (action === 'clear') {
        this.calendar?.clearSelection();
      }
    }
  }
}
