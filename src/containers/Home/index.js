import React, { Component, useState, useReducer, useEffect } from "react";
import "./style.css";
import { connect } from "react-redux";
import { facebook_login } from "../../store/action/action";
import { reducer } from "../../store/reducer";

class Home extends Component {
  render() {
    return (
      <div className="chat-app">
        <div className="login">
          <h1>Messaging App</h1>
          <button
            onClick={() => {
              this.props.facebook_login(this.props.history);
            }}
          >
            Facebook login
          </button>
        </div>
      </div>
    );
  }
}

// const Home = (props) => {
//   console.log(props);
//   return (
//     <div>
//       <h1>Home</h1>
//       <button
//         onClick={() => {
//           props.facebook_login(props.history);
//         }}
//       >
//         Facebook login
//       </button>
//     </div>
//   );
// };
const mapStateToProps = (state) => ({
  current_user: state.current_user,
});

const mapDispatchToProp = (dispatch) => ({
  facebook_login: (history) => dispatch(facebook_login(history)),
});

export default connect(mapStateToProps, mapDispatchToProp)(Home);
