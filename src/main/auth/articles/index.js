import ArticlesListViewModel from './articles-list-vm';
import ArticlesContainer from './articles-list';
import CreateEditArticleViewModel from './create-edit-article-vm';
import CreateEditArticleContainer from './create-edit-article';

export const ArticlesList = ArticlesListViewModel(ArticlesContainer);
export const CreateEditArticle = CreateEditArticleViewModel(CreateEditArticleContainer);
