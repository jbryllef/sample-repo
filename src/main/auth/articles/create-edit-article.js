import React, { Fragment } from 'react';
import { Form, Button } from 'react-bootstrap'

const {
  Group: FormGroup,
  Label: FormLabel,
  Control: FormControl,
} = Form

const CreateEditArticle = ({
  activeArticle,
  toggleModal,
  handleInput,
  onSubmitForm,
}) => {
  const {
    title,
    body,
  } = activeArticle;

  return (
    <Fragment>
      <Form onSubmit={onSubmitForm}>
        <FormGroup controlId="formGroupTitle">
          <FormLabel>Title</FormLabel>
          <FormControl
            type="text"
            placeholder="Enter title"
            name="title"
            value={title}
            onChange={e => handleInput(e)}
          />
        </FormGroup>
        <FormGroup controlId="formGroupBody">
          <FormLabel>Body</FormLabel>
          <FormControl
            as="textarea"
            rows="5"
            placeholder="Some text"
            name="body"
            value={body}
            onChange={e => handleInput(e)}
          />
        </FormGroup>
        <Button variant="secondary" onClick={toggleModal}>
          Cancel
        </Button>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Fragment >
  );
};

export default CreateEditArticle;
