import { extend } from 'flarum/extend';
import IndexPage from 'flarum/components/IndexPage';
import LinkButton from 'flarum/components/LinkButton';
import Model from 'flarum/Model';
import Tag from 'flarum/tags/models/Tag';
import CategoriesPage from './components/CategoriesPage';

app.initializers.add('askvortsov/flarum-categories', () => {
  app.routes.categories = { path: '/categories', component: CategoriesPage.component() };

  Tag.prototype.commentCount = Model.attribute('commentCount');

  extend(IndexPage.prototype, 'navItems', function (items) {
    if (items.has('tags') && !app.forum.attribute('categories.keepTagsNav')) {
      items.remove('tags');
    }
    items.add('categories', LinkButton.component({
      icon: 'fas fa-th-list',
      children: app.translator.trans('askvortsov-categories.forum.index.categories_link'),
      href: app.route('categories')
    }), -9);
  });
});
