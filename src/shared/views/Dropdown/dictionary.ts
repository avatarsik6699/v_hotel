import { MenuItemCategories } from './types';

type DictionaryKeys = MenuItemCategories;
type DictionaryValue = { word: string; before: string | number }[];

export const dictionary: { [key in DictionaryKeys]: DictionaryValue } = {
  Спальни: [
    { word: 'Спальня', before: 1 },
    { word: 'Спальни', before: 4 },
    { word: 'Спален', before: 'other' },
  ],
  Кровати: [
    { word: 'Кровать', before: 1 },
    { word: 'Кровати', before: 4 },
    { word: 'Кроватей', before: 'other' },
  ],
  'Ванные комнаты': [
    { word: 'Ванная комната', before: 1 },
    { word: 'Ванны комнаты', before: 4 },
    { word: 'Ванн комнат', before: 'other' },
  ],
};
