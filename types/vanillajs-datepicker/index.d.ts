/* eslint-disable max-classes-per-file */
declare namespace IDatepicker {
  export type Config = { format: string };
}

declare module 'vanillajs-datepicker' {
  export class Datepicker {
    constructor($elem: HTMLElement, config?: IDatepicker.Config);
  }
  export class DateRangePicker {
    constructor($elem: HTMLElement, config?: IDatepicker.Config);
  }
}
