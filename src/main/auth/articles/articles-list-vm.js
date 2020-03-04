import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import autoBind from 'react-autobind';
import { includes } from 'lodash';

import client from '../../../services/client';
import {
  setArticlesList,
  setActiveArticle,
  removeActiveArticle,
} from '../../../store/actions/articles';

const ArticlesListVM = Element => class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCreateEditModalOpen: false,
      isEditMode: false,
      filterParams: {
        searchFilter: '',
        dropdownFilter: 'id',
      }
    };
    autoBind(this);
  }

  componentDidMount() {
    this.fetchArticlesList();
  }


  fetchArticlesList() {
    client
      .get("/posts")
      .then(res => {
        this.props.setArticlesList(res.data)
      })
      .catch(err => {
        console.log("err: ", err);
      });
  }

  fetchArticle(articleId) {
    client
      .get(`/posts/${articleId}`)
      .then(res => {
        console.log('res.data', res.data)
        this.props.setActiveArticle(res.data)
      })
      .catch(err => {
        console.log("err: ", err);
      });
  }

  handleClickCreate() {
    this.props.removeActiveArticle()
    this.setState({
      isEditMode: false,
    })
    this.toggleCreateEditModal()
  }

  handleClickEdit(articleId) {
    this.fetchArticle(articleId)
    // const clickedArticle = articlesList.filter(article => article.id === id)[0]
    this.setState({
      isEditMode: true,
    })
    this.toggleCreateEditModal()
  }

  handleInput(e) {
    const { filterParams } = this.state;
    filterParams[e.target.name] = e.target.value;
    this.setState({
      filterParams,
    });
  }

  toggleCreateEditModal() {
    this.setState({
      isCreateEditModalOpen: !this.state.isCreateEditModalOpen
    })
  }

  render() {
    const {
      isCreateEditModalOpen,
      isEditMode,
      filterParams,
    } = this.state
    const {
      userDetails,
      articlesList,
    } = this.props
    const {
      searchFilter,
      dropdownFilter,
    } = filterParams

    const searchedArticles = articlesList
      .filter((article) => {
        const {
          id,
          userId,
          title,
        } = article;
        if (dropdownFilter === 'id') {
          return (includes(id && id.toString().toLowerCase(), searchFilter.toLowerCase()))
        } else if (dropdownFilter === 'userId') {
          return (includes((userId && userId.toString().toLowerCase()), searchFilter.toLowerCase()))
        } else if (dropdownFilter === 'title') {
          return (includes((title && title.toLowerCase()), searchFilter.toLowerCase()))
        }
      });

    const props = {
      userDetails,
      articlesList: searchedArticles,
      isCreateEditModalOpen,
      isEditMode,
      filterParams,
      toggleCreateEditModal: this.toggleCreateEditModal,
      handleClickCreate: this.handleClickCreate,
      handleClickEdit: this.handleClickEdit,
      handleInput: this.handleInput,
    };

    return <Element {...props} />;
  }
};

export default compose(
  connect(
    state => ({
      userDetails: state.login.userDetails,
      articlesList: state.articles.articlesList,
    }),
    {
      setArticlesList,
      setActiveArticle,
      removeActiveArticle,
    }
  ),
  ArticlesListVM
);

