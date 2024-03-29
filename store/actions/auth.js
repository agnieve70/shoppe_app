export const SIGNUP = 'SIGNUP';
export const LOGIN = "LOGIN";

export const signup = (email, password) => {
    return async dispatch => {

       const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDCrTdeiTg6hPYYbaI_rMRCr8XL56MF3wc",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email,
              password: password,
              returnSecureToken:true
            }),
          }
        );

        if(!response.ok){
            throw new Error('Something went wrong!');
        }

        const resData = await response.json();

        console.log(resData);

        dispatch({
            type: SIGNUP,
        });
    };
};

export const login = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDCrTdeiTg6hPYYbaI_rMRCr8XL56MF3wc",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const resData = await response.json();

    console.log(resData);

    dispatch({
      type: LOGIN,
    });
  };
};