import { $ } from 'shared/utiles/dom';
import { getMethodName } from 'shared/utiles/getMethodName';
import { getLikeTemplate } from './template';
import { ILike } from './type';

export class Like {
  count: ILike.Config['count'];
  isChecked: ILike.Config['isChecked'];
  $root: HTMLElement;
  selectors = [
    { key: '$like', s: '.like' },
    { key: '$count', s: '.like__count' },
    { key: '$icon', s: '.like__icon' },
  ];
  children: ILike.Children = {};
  constructor(root: string, { count, isChecked }: ILike.Config) {
    this.$root = $(root).$el;
    this.count = count;
    this.isChecked = isChecked;
    this.bindEvents();
    this.render();
    this.initChildren();
  }

  render() {
    const { count, isChecked } = this;
    const template = getLikeTemplate({ count, isChecked });

    $(this.$root).add('start', template);
  }

  handleEvent(ev: ILike.EventType) {
    const method = getMethodName<ILike.Methods>(ev.type);
    this[method](ev);
  }

  onClick(ev: ILike.EventType) {
    const { $like } = this.children;
    this.isChecked = !this.isChecked;
    $like.classList.toggle('_checked');
    this.updateCount();
  }

  private bindEvents() {
    this.$root.addEventListener('click', this);
  }

  private updateCount() {
    const { $like, $count } = this.children;
    this.count = $like.classList.contains('_checked')
      ? this.count + 1
      : this.count - 1;

    const { count } = this;

    if (count > 99) {
      $count.textContent = '99+';
      $count.dataset.count = '99+';
    } else {
      $count.dataset.count = String(count);
      $count.textContent = String(count);
    }
  }

  private initChildren() {
    this.children = this.selectors.reduce(
      (acc: ILike.Children, { s, key }) => ({
        ...acc,
        [key]: $(s, this.$root).$el,
      }),
      {},
    );
  }
}

// const like = new Like('.like-wrapper', { count: 99, isChecked: false });
