import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import autoBind from 'react-autobind';

import client from '../../../services/client';
import { setUserDetails } from '../../../store/actions/login';

const MOCK_USER_DETAILS = {
  id: 101,
  emailAddress: '',
  firstName: 'Jeffrey',
  middleName: 'Cordero',
  lastName: 'Fontanilla',
}

const LoginVM = Element => class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userCredentials: {
        emailAddress: '',
        username: '',
      },
      emailAddressError: null,
      usernameError: null
    };
    autoBind(this);
  }

  fetchUsers() {
    client
      .get(`/users`)
      .then(res => {
        console.log('res.data', res.data)
        // this.props.addActiveArticle(res.data)
      })
      .catch(err => {
        console.log("err: ", err);
      });
  }

  handleInput(e) {
    const { userCredentials } = this.state;
    userCredentials[e.target.name] = e.target.value;
    this.setState({
      userCredentials,
    });
  }

  onSubmitLogin(e) {
    const {
      history,
      setUserDetails,
    } = this.props
    const {
      userCredentials
    } = this.state
    e.preventDefault();

    if (userCredentials.emailAddress === '') {
      this.setState({
        emailAddressError: 'Email Address is required',
        usernameError: null
      });
    } else if (userCredentials.username === '') {
      this.setState({
        usernameError: 'Username is required',
        emailAddressError: null
      });
    } else {
      client
        .get(`/users`)
        .then(res => {
          console.log("res.data", res.data)
          const userDetails = res.data.find(({ email, username }) => email === userCredentials.emailAddress && username === userCredentials.username);
          if (userDetails) {
            setUserDetails(userDetails)
            history.push('/articles')
          }
          // setUserDetails({ ...MOCK_USER_DETAILS, emailAddress: userCredentials.emailAddress })
        })
        .catch(err => {
          console.log("err: ", err);
        });


    }

  }

  render() {

    const props = {
      ...this.state,
      handleInput: this.handleInput,
      onSubmitLogin: this.onSubmitLogin,
    };

    return <Element {...props} />;
  }
};

export default compose(
  connect(
    state => ({
      login: state.login,
    }),
    { setUserDetails }
  ),
  LoginVM
);
