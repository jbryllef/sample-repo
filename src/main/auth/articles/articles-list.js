import React, { Fragment } from 'react';
import {
  Card,
  Button,
  Row,
  Col,
  Container,
  Form,
} from 'react-bootstrap'
import { CreateEditArticle } from './index';
import ArticleCard from '../../../components/article-card';
import GenericModal from '../../../components/generic-modal';
import './articles-list.css';

const {
  Header: CardHeader,
  Title: CardTitle,
  Body: CardBody,
  Footer: CardFooter,
} = Card

const {
  Group: FromGroup,
  Control: FormControl,
} = Form

function articlesMapper(articles, handleClickEdit) {
  const rowsNumber = [...Array(Math.ceil(articles.length / 2))];
  const chunkedArticleRows = rowsNumber.map((row, idx) => articles.slice(idx * 2, idx * 2 + 2));

  const content = chunkedArticleRows.map((row, idx) => (
    <Row key={idx}>
      {row.map(article => (
        <Col xs={6} key={article.id}>
          <ArticleCard
            article={article}
            handleClickEdit={handleClickEdit}
          />
        </Col>
      ))}
    </Row>)
  );

  return (
    <div>
      {content}
    </div>
  );
}

const SearchFilterField = ({
  filterParams,
  handleInput,
}) => {
  const {
    searchFilter,
    dropdownFilter,
  } = filterParams

  return (
    <Form>
      <Row>
        <Col xs={8}>
          <FromGroup controlId="exampleForm.search">
            <FormControl
              type="text"
              placeholder="Search..."
              name="searchFilter"
              value={searchFilter}
              onChange={e => handleInput(e)}
            />
          </FromGroup>
        </Col>
        <Col xs={4}>
          <FromGroup controlId="exampleForm.dropdown">
            <FormControl
              as="select"
              name="dropdownFilter"
              value={dropdownFilter}
              onChange={e => handleInput(e)}
            >
              <option value="id">ID</option>
              <option value="userId">UserID</option>
              <option value="title">Title</option>
            </FormControl>
          </FromGroup>
        </Col>
      </Row>
    </Form>
  )
}

const ArticlesList = ({
  userDetails,
  isCreateEditModalOpen,
  isEditMode,
  filterParams,
  articlesList,
  toggleCreateEditModal,
  handleClickCreate,
  handleClickEdit,
  handleInput,
}) => {
  const {
    username
  } = userDetails;

  const modalTitle = isEditMode ? 'Edit Form' : 'Create Form';
  const userGreetings = `Hello, ${username}`;

  return (
    <Fragment>
      <Card className="text-center">
        <CardHeader>
          <Button
            variant="primary"
            onClick={handleClickCreate}
          >
            Create Article
          </Button>
          {userGreetings}
        </CardHeader>
        <CardBody>
          <CardTitle>Articles</CardTitle>
          <Container>
            <SearchFilterField
              filterParams={filterParams}
              handleInput={handleInput}
            />
            {articlesMapper(articlesList, handleClickEdit)}
          </Container>
        </CardBody>
        <CardFooter className="text-muted">Sometime Ago</CardFooter>
      </Card >
      <GenericModal
        isOpen={isCreateEditModalOpen}
        toggleModal={toggleCreateEditModal}
        modalTitle={modalTitle}
      >
        <CreateEditArticle
          toggleModal={toggleCreateEditModal}
          isEditMode={isEditMode}
        />
      </GenericModal>
    </Fragment >
  );
};

export default ArticlesList;
