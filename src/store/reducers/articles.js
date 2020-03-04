const initialState = {
  articlesList: [],
  activeArticle: {},
}

export default (state = initialState, action) => {

  switch (action.type) {
    case 'SET_ARTICLES_LIST':
      return {
        ...state,
        articlesList: action.data
      }
    case 'ADD_ARTICLE':
      return {
        ...state,
        articlesList: state.articlesList.concat(action.data)
      }
    case 'EDIT_ARTICLE':
      return {
        ...state,
        articlesList: state.articlesList.map(article => article.id === action.data.id ? action.data : article)
        // articlesList: state.articlesList.find(article => article.id === action.data)
      }
    case 'SET_ACTIVE_ARTICLE':
      return {
        ...state,
        activeArticle: action.data
      }
    case 'REMOVE_ACTIVE_ARTICLE':
      return {
        ...state,
        activeArticle: {}
      }
    default:
      return state;
  }
}
