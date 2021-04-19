import firebase from "../../config/config";
const ACTIONS = {
  SETUSERS: "SETUSERS",
  SETFIREBASEUSERS: "SETFIREBASEUSERS",
};

const facebook_login = (history) => {
  return (dispatch) => {
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;

        // The signed-in user info.
        var user = result.user;

        let user_data = {
          name: user.displayName,
          email: user.email,
          uid: user.uid,
          profile_pic: user.photoURL,
        };

        firebase
          .database()
          .ref("/")
          .child(`user/${user.uid}`)
          .set(user_data)

          .then(() => {
            alert("user logged in successfully");
            history.push("/chat");
            dispatch({ type: ACTIONS.SETUSERS, payload: user_data });
          });

        var accessToken = credential.accessToken;

        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        var email = error.email;

        var credential = error.credential;
      });
  };
};
const get_data = () => {
  return (dispatch) => {
    let users = [];
    firebase
      .database()
      .ref("/")
      .child("user")
      .on("child_added", (data) => {
        users.push(data.val());
        dispatch({ type: ACTIONS.SETFIREBASEUSERS, payload: data.val() });
      });
    // console.log("data.val", users);
    // dispatch({ type: ACTIONS.SETFIREBASEUSERS, payload: users });
  };
};
export { facebook_login, get_data, ACTIONS };
