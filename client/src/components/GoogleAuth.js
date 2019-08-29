import React from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";
import keys from "./keys";

class GoogleAuth extends React.Component {
  componentDidMount() {
    
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId: keys.clientId,
          scope: "email"
        })
        .then(() => {
          //link reference to the auth object to signIn and signOut
          this.auth = window.gapi.auth2.getAuthInstance();
          //바로밑에있는 function 불러서 call action
          this.onAuthChange(this.auth.isSignedIn.get());
          // call action based on onAuthChange 
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = isSignedIn => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  //calls gapi method
  onSignInClick = () => {
    this.auth.signIn();
  };
  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.props.isSigned === null) {
      return null;
    } else if (this.props.isSigned) {
      return (
        <button onClick={this.onSignOutClick} className="ui google button">
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={this.onSignInClick} className="ui google button">
          <i className="google icon" />
          Sign in with Google
        </button>
      );
    }
  }
  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}
const mapStateToProps = state => {
  // console.log(state);
  // return {};  
  return { isSigned: state.auth.isSignedIn };
};
//state = from reducer, state.auth = authreducer
//mapstateToProps :: isSignedIn을 props에 넣어좀
// , {signIn, signOut} ==> 두가지 action을 props에 넣어줌
export default connect(
  mapStateToProps,
  { signIn, signOut }
)(GoogleAuth);
