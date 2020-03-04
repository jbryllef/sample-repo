import axios from "axios";

var axiosInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com"
});


function setError(message, allSession) {
  if (typeof window.onstorage === "function") {
    window.onstorage({ key: "error", oldValue: "", newValue: message });
  }
  if (allSession) {
    localStorage.setItem("error", message);
  } else {
    sessionStorage.setItem("error", message);
  }
}

axiosInstance.interceptors.request.use(function (config) {
  // let token = sessionStorage.getItem('token');

  // if (token) {
  //     config.headers.Authorization = token.type + " " + token.token;
  // }

  // if (config['X-Grant-Token']) {
  //     config.headers['X-Grant-Token'] = config['X-Grant-Token']
  // }

  // if (config['X-Grant-Type']) {
  //     config.headers['X-Grant-Type'] = config['X-Grant-Type']
  // }

  // if (config['Transaction-Type']) {
  //     config.headers['Transaction-Type'] = config['Transaction-Type']
  // }

  return config;
});


axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response) {
      let { response } = error;

      if (response.config.noError) {
        // if (response) {
        //     if ( [401].includes(response.status) ){
        //         if (sessionStorage.getItem('token')){
        //             let errorMessage = 'Invalid access token (may have expired)';
        //             sessionStorage.removeItem('token')
        //             setError(errorMessage)
        //         }
        //     }
        // }
        return Promise.reject(error);
      }
      //
      // if(response.data instanceof Blob) {
      //     const reader = new FileReader();
      //
      //     reader.addEventListener('loadend', (e) => {
      //       const text = e.srcElement.result;
      //       response = JSON.parse(text)
      //       setError(response.message)
      //     })
      //
      //     reader.readAsText(response.data)
      //     return Promise.reject(error)
      // }
      //
      if (response) {
        if ([401].includes(response.status)) {
          const {
            location: { hostname }
          } = window;
          if (sessionStorage.getItem("token")) {
            let errorMessage = "Invalid access token (may have expired)";
            if (response && response.data) {
              if (
                (response.data.errors &&
                  response.data.errors[0].message === "Duplicate") ||
                response.data.error === "invalid_token"
              ) {
                sessionStorage.removeItem("token");
                hostname === "localhost"
                  ? window.location.replace(`http://${hostname}:3000`)
                  : window.location.replace(`https://${hostname}`);
              } else {
                errorMessage = response.data.message;
                setError(errorMessage);
              }
            } else {
              setError(errorMessage);
            }
          } else if (response.data.error_description) {
            setError(response.data.error_description);
          } else {
            setError(response.data.errors[0].message);
          }
        } else if ([400].includes(response.status)) {
          let { data } = response;
          setError(`${data.errors[0].message}`);
        } else if (response.data) {
          // console.log('response.data: ', response.data);
          if (response.data.errors) {
            setError(response.data.errors[0].message);
          } else {
            setError(
              `Sorry, something went wrong. We're working on it and we'll get it fixed as soon as we can.`
            );
          }
        }
      } else {
        // if (sessionStorage.getItem('token')) {
        setError(
          `Uh oh! Looks like you lost your internet connection. Please check your network settings and try again later`
        );
        // }
      }

      return Promise.reject(error);
    }
  }
);

export default axiosInstance;

