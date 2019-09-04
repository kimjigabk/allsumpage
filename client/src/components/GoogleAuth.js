import React from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";
import keys from "../config/keys";

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
    const currentUser = this.auth.currentUser.get();
    if (isSignedIn) {
      let id = currentUser.getId();
      let name = currentUser.w3.ig;
      this.props.signIn(id, name);
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
        <div
          className="ui simple dropdown item"
          style={{ paddingBottom: "10px", borderRight: 0 }}
        >
          {this.props.displayName}
          <div className="menu transition">
            <div className="item" onClick={this.onSignOutClick}>
              <i className="google icon" />
              Sign Out
            </div>
            <div className="item" onClick={this.onSignOutClick}>
              <i className="google icon" />
              Sign Out
            </div>
            <div className="item" onClick={this.onSignOutClick}>
              <i className="google icon" />
              Sign Out
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <span onClick={this.onSignInClick} className="ui item link">
          <i className="google icon" />
          Sign in with Google
        </span>
      );
    }
  }
  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}
const mapStateToProps = state => {
  return {
    isSigned: state.auth.isSignedIn,
    displayName: state.auth.displayName
  };
};
//state = from reducer, state.auth = authreducer
//mapstateToProps :: isSignedIn을 props에 넣어좀
// , {signIn, signOut} ==> 두가지 action을 props에 넣어줌
export default connect(
  mapStateToProps,
  { signIn, signOut }
)(GoogleAuth);
