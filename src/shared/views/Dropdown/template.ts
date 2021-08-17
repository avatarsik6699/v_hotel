import { getIcon } from '../../utiles/svg';
import { IDropdown } from './types';

export const getDropdownTemplate = ({
  label = '',
  value,
  icon = 'expand_more',
}: IDropdown.TemplateData) =>
  `
    <div class="dropdown">
      ${label && `<span class="dropdown__label">${label}</span>`}
      <div class="dropdown__field">
        <input class="dropdown__input" type="button" value='${value}' />
        <span class="dropdown__icon">
          ${getIcon({ id: icon })}
        </span>
      </div>
    </div>
  `;
