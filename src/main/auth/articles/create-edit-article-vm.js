import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import autoBind from 'react-autobind';

import client from '../../../services/client';
import {
  addArticle,
  editArticle,
} from '../../../store/actions/articles';

const CreateEditArticleVM = Element => class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeArticle: {
        title: '',
        body: '',
      },
      titleError: null,
      bodyError: null,
    };
    autoBind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.activeArticle.length !== 0
      && nextProps.activeArticle !== prevState.activeArticle
    ) {
      return {
        activeArticle: nextProps.activeArticle,
      };
    }
    return null;
  }

  handleInput(e) {
    const { activeArticle } = this.state;
    activeArticle[e.target.name] = e.target.value;
    this.setState({
      activeArticle,
    });
  }

  createArticle(params) {
    const {
      addArticle,
      toggleModal,
    } = this.props

    client
      .post(`/posts`, params)
      .then(res => {
        const mappedArticleData = { ...res.data, userId: 1 }
        addArticle(mappedArticleData)
        toggleModal()
      })
      .catch(err => {
        console.log("createArticle err: ", err);
      });
  }

  updateArticle(articleId, params) {
    const {
      editArticle,
      toggleModal,
    } = this.props

    client
      .put(`/posts/${articleId}`, params)
      .then(res => {
        editArticle(res.data)
        toggleModal()
      })
      .catch(err => {
        console.log("updateArticle err: ", err);
      });
  }

  onSubmitForm(e) {
    const {
      activeArticle
    } = this.state
    const {
      isEditMode
    } = this.props
    e.preventDefault()

    if (isEditMode) {
      this.updateArticle(activeArticle.id, activeArticle)
    } else {
      this.createArticle(activeArticle)
    }
  }

  render() {
    const {
      toggleModal,
    } = this.props

    const props = {
      ...this.state,
      toggleModal,
      handleInput: this.handleInput,
      onSubmitForm: this.onSubmitForm,
    };

    return <Element {...props} />;
  }
};

export default compose(
  connect(
    state => ({
      articlesList: state.articles.articlesList,
      activeArticle: state.articles.activeArticle,
    }),
    {
      addArticle,
      editArticle,
    }
  ),
  CreateEditArticleVM
);

