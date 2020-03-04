export const setArticlesList = (data) => {
  return {
    type: 'SET_ARTICLES_LIST',
    data
  }
}

export const addArticle = (data) => {
  return {
    type: 'ADD_ARTICLE',
    data
  }
}

export const editArticle = (data) => {
  return {
    type: 'EDIT_ARTICLE',
    data
  }
}

export const setActiveArticle = (data) => {
  return {
    type: 'SET_ACTIVE_ARTICLE',
    data
  }
}

export const removeActiveArticle = () => {
  return {
    type: 'REMOVE_ACTIVE_ARTICLE',
  }
}
