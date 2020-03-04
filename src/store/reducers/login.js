const initialState = {
  userDetails: {
    id: '',
    emailAddress: '',
    firstName: '',
    middleName: '',
    lastName: '',

    id: 1,
    name: '',
    username: '',
    email: '',
    address: {
      street: '',
      suite: '',
      city: '',
      zipcode: '',
      geo: {
        lat: '',
        lng: '',
      },
    },
    phone: '',
    website: '',
    company: {
      name: '',
      catchPhrase: '',
      bs: '',
    }
  },
}

export default (state = initialState, action) => {

  switch (action.type) {
    case 'SET_USER_DETAILS':
      return {
        ...state,
        userDetails: {
          ...state.userDetails,
          ...action.data
        }
      }
    case 'CLEAR_USER_DETAILS':
      return {
        ...state,
        userDetails: {
          status: ''
        }
      }
    default:
      return state;
  }
}
