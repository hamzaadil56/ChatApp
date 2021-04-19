import React, { Component, useEffect, useState } from "react";
import { connect } from "react-redux";
import "./style.css";
import { get_data } from "../store/action/action";
import firebase from "../config/config";

class Chat extends Component {
  constructor() {
    super();
    this.state = {
      chatUser: {},
      users: [],
      chats: [],
      message: "",
    };
  }
  mergeUid = (uid1, uid2) => {
    if (uid1 < uid2) {
      return uid1 + uid2;
    } else {
      return uid2 + uid1;
    }
  };
  chatUser = (v) => {
    v.chat = true;
    let chatUsers = this.state.users;
    this.setState({
      ...this.state,
      chatUser: v,
      users: chatUsers,
    });
    let currentUser = this.props.current_user;
    let mergeUid = this.mergeUid(currentUser.uid, v.uid);
    console.log(mergeUid);
    this.getMessages(mergeUid);
    // this.setState({ ...this.state, chats: this.state.chats });
  };

  sendMessage = () => {
    let currentUser = this.props.current_user;
    let chattingUser = this.state.chatUser;
    let mergeUid = this.mergeUid(currentUser.uid, chattingUser.uid);
    firebase.database().ref("/").child(`/chats/${mergeUid}`).push({
      message: this.state.message,
      name: currentUser.name,
      uid: currentUser.uid,
    });

    this.setState({
      ...this.state,
      message: "",
    });
  };
  getMessages = (uid) => {
    firebase
      .database()
      .ref("/")
      .child(`/chats/${uid}`)
      .on("child_added", (messages) => {
        console.log(messages.val());
        this.state.chats.push(messages.val());
        this.setState({
          ...this.state,
          chats: this.state.chats,
        });
      });
  };
  componentDidMount() {
    this.props.get_data();
    this.setState({ ...this.state, users: this.props.users });
  }

  render() {
    console.log("firebase users", this.props.users);
    let user = this.props.current_user;
    return (
      <div className="chat-app">
        <div className="main">
          <div className="greeting">
            <h1>Welcome to Chat App {user.name}</h1>
            <img src={user.profile_pic} />
          </div>

          <div className="users">
            <h2>Chats</h2>
            {this.props.users.map((v, i) => {
              return (
                v.uid !== user.uid && (
                  <div key={v.uid} className="user">
                    <div className="user-name">
                      <h3>{v.name}</h3>
                      <img src={v.profile_pic} />
                      <button className="btn" onClick={() => this.chatUser(v)}>
                        Chat
                      </button>
                    </div>
                    {v.chat && (
                      <div className="message-box">
                        <h2>Chat with {v.name}</h2>
                        <input
                          value={this.state.message}
                          type="text"
                          onChange={(e) => {
                            this.setState({
                              ...this.state,
                              message: e.target.value,
                            });
                          }}
                          placeholder="Enter your message"
                        />
                        {this.state.chats.map((v, i) => {
                          return (
                            <li
                              style={{
                                color: v.uid === user.uid ? "green" : "red",
                              }}
                              key={i}
                            >
                              {v.message}
                            </li>
                          );
                        })}
                        <button
                          onClick={() => this.sendMessage()}
                          className="send-btn"
                        >
                          Send
                        </button>
                      </div>
                    )}
                  </div>
                )
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

// const Chat = (props) => {
//   const [chatUsers, setChatUsers] = useState([]);
//   const [chatbox, setChatBox] = useState(false);

//   useEffect(() => {
//     props.get_data();
//     setChatUsers(props.users);
//     console.log(props);
//   }, [chatUsers]);

//   console.log("firebase users", props.users);
//   console.log("render");
//   let user = props.current_user;
//   // console.log(users, "users");
//   return (
//     <div className="users">
//       <h1>Welcome to Chat App {user.name}</h1>
//       <img src={user.profile_pic} />
//       <h2>{user.email}</h2>
//       <h3>Chat users:</h3>
//       <div>
//         <ul>
//           {chatUsers.map((v, i) => {
//             return (
//               <li key={i}>
//                 <img src={v.profile_pic} />
//                 {v.name}
//                 <button
//                   onClick={(e) => {
//                     console.log(e);
//                     setChatBox(true);
//                   }}
//                 >
//                   Chat
//                 </button>
//               </li>
//               // )
//             );
//           })}
//         </ul>
//         {chatbox && (
//           <div className="chat-box">
//             <input type="text" placeholder="Enter your text" />
//             <button type="submit">Send</button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };
const mapStateToProps = (state) => ({
  users: state.users,
  current_user: state.current_user,
});
const mapDispatchToProp = (dispatch) => ({
  get_data: () => dispatch(get_data()),
});
export default connect(mapStateToProps, mapDispatchToProp)(Chat);
