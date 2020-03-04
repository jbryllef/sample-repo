import React from 'react';
import {
  Form,
  Card,
  Button,
  Row,
  Col
} from 'react-bootstrap'

const {
  Title: CardTitle,
  Body: CardBody,
} = Card

const {
  Group: FormGroup,
  Label: FormLabel,
  Control: FormControl,
} = Form

const Login = ({
  userCredentials,
  onSubmitLogin,
  handleInput,
}) => {
  const {
    emailAddress,
    username,
  } = userCredentials;

  return (
    <Card className="text-center">
      <CardBody>
        <CardTitle>Login Form</CardTitle>
        <Form onSubmit={onSubmitLogin}>
          <FormGroup as={Row} controlId="formEmailAddress">
            <FormLabel column sm="2">
              Email
            </FormLabel>
            <Col sm="10">
              <FormControl
                type="email"
                placeholder="Email Address"
                name="emailAddress"
                value={emailAddress}
                onChange={e => handleInput(e)}
              />
            </Col>
          </FormGroup>

          <FormGroup as={Row} controlId="formUsername">
            <FormLabel column sm="2">
              Username
            </FormLabel>
            <Col sm="10">
              <FormControl
                type="text"
                placeholder="Username"
                name="username"
                value={username}
                onChange={e => handleInput(e)}
              />
            </Col>
          </FormGroup>
          <Button
            variant="primary"
            type="submit"
          >
            Login
        </Button>
        </Form>
      </CardBody>
    </Card>
  );
};

export default Login;
