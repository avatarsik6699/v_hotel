/* eslint-disable indent */
import './style.scss';
import { Component, IComponent } from '../Component';
import { getIcon } from '../../utiles/svg';

export namespace IRating {
  export type Star = { id: number; isSelected: boolean };
  export type Config = { totalCount: number; selectedCount: number };
}

const gradient = `
<linearGradient id="gradient-star" x1="10" y1="-2" x2="10" y2="22" gradientUnits="userSpaceOnUse">
    <stop stop-color="#BC9CFF" />
    <stop offset="1" stop-color="#8BA4F9" />
</linearGradient>`;

const getTemplateRating = (stars: IRating.Star[]) => {
  const starsContent = stars
    .map(
      ({ isSelected, id }) => `
    <li class="rating__item" data-star_id=${id}>
      <span class="rating__star">${getIcon({
        id: 'star',
        style: {
          fill: isSelected ? 'url(#gradient-star)' : 'none',
          stroke: !isSelected ? 'url(#gradient-star)' : 'none',
        },
        gradient,
      })}</span>
    </li>
  `,
    )
    .reverse()
    .join('');
  return `
    <div class="rating">
      <ul class="rating__list">${starsContent}</ul>
    </div>
  `;
};

export class Rating extends Component<'onClick'> {
  stars: IRating.Star[] = [];
  selectedCount: number;
  totalCount: number;

  constructor(selector: string, config: IRating.Config) {
    super(selector);
    this.selectedCount = Math.abs(config.selectedCount);
    this.totalCount = Math.abs(config.totalCount);
    this.render();
    this.bindEvents([{ method: 'onClick', $root: this.$root.$el }]);
  }

  render() {
    const ratingList = this.$root.get('.rating__list');

    if (ratingList && !ratingList.isEmpty()) ratingList.clear();

    const stars = [...Array(this.totalCount)].map((_, index) => ({
      id: index + 1,
      isSelected: index + 1 <= this.selectedCount,
    }));

    const template = getTemplateRating(stars);
    this.$root.add('start', template);
  }

  onClick(ev: IComponent.EventType) {
    const star = ev.target.closest('[data-star_id]') as HTMLElement;
    if (!star) return;
    const starId = Number(star.dataset.star_id);

    this.selectedCount = starId;
    this.render();
  }
}
