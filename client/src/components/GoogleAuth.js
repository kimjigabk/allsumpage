import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';
import keys from '../config/keys';
// import jwt_decode from 'jwt-decode';

// const baseUrl = `https://accounts.google.com/o/oauth2/v2/auth`;
// const options = {
//   redirect_uri: 'http://localhost:3000/api/oauth2callback',
//   client_id: keys.clientId,
//   access_type: 'offline',
//   response_type: 'code',
//   prompt: 'consent',
//   ux_mode: 'popup',
//   scope: [
//     'https://www.googleapis.com/auth/userinfo.profile',
//     'https://www.googleapis.com/auth/userinfo.email',
//   ].join(' '),
//   state: 'http://localhost:3000',
// };
// const qs = new URLSearchParams(options);
// const googleRequestUrl = `${baseUrl}?${qs.toString()}`;
// console.log(googleRequestUrl);
// const response = await axios.get(googleRequestUrl)

class GoogleAuth extends React.Component {
  componentDidMount() {
    // window.onload = () => {
    //   window.google.accounts.id.initialize({
    //     client_id: `${keys.clientId}`,
    //     callback: (data) => this.handleCredentialResponse(data),
    //     prompt: 'consent',
    //     scope: [
    //       'https://www.googleapis.com/auth/userinfo.profile',
    //       'https://www.googleapis.com/auth/userinfo.email',
    //     ],
    //   });
    //   // window.google.accounts.id.renderButton(
    //   //   document.getElementById('glogin'),
    //   //   { theme: 'outline', size: 'small' } // customization attributes
    //   // );
    // };

    // this.props.signOut();
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId: keys.clientId,
          scope: 'email',
        })
        .then(() => {
          //link reference to the auth object to signIn and signOut
          this.auth = window.gapi.auth2.getAuthInstance();
          //바로밑에있는 function 불러서 call action
          this.onAuthChange(this.auth.isSignedIn.get());
          // call action based on onAuthChange
          this.auth.isSignedIn.listen(this.onAuthChange);
          // console.log(this.auth);
        });
    });
  }
  // handleCredentialResponse = (data) => {
  //   const decoded = jwt_decode(data.credential);
  //   console.log(decoded);
  //   this.props.signIn('105584576938037506819', 'king');
  // };

  onAuthChange = (isSignedIn) => {
    const currentUser = this.auth.currentUser.get();
    if (isSignedIn) {
      let id = currentUser.getId();
      let name = currentUser.getBasicProfile().getName();
      this.props.signIn(id, name);
    } else {
      this.props.signOut();
    }
  };

  //calls gapi method
  onSignInClick = () => {
    this.auth.signIn();
    // const { google } = window;
    // google.accounts.id.prompt((notification) => {
    //   if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
    //     document.cookie = `g_state=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT`;
    //     google.accounts.id.prompt();
    //   }
    // });
  };
  onSignOutClick = () => {
    this.auth.signOut();
    // window.google.accounts.id.disableAutoSelect();
    // this.props.signOut();
  };

  renderAuthButton() {
    console.log(this.props.isSigned);
    if (this.props.isSigned === null) {
      return null;
    } else if (this.props.isSigned) {
      return (
        <div
          className="ui simple dropdown item"
          style={{ paddingBottom: '10px', borderRight: 0 }}
        >
          {this.props.displayName}
          <div className="menu transition">
            <div
              className="item"
              onClick={() => this.props.history.push('/songs')}
            >
              <i className="play icon" />
              Songs
            </div>
            <div
              className="item"
              onClick={() => this.props.history.push('/yourpage')}
            >
              <i className="music icon" />
              Yours
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
        <div>
          <span onClick={this.onSignInClick} className="ui link item">
            <i className="google icon" />
            Sign in with Google
          </span>
        </div>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    isSigned: state.auth.isSignedIn,
    displayName: state.auth.displayName,
  };
};

const menu = withRouter(GoogleAuth);
export default connect(mapStateToProps, { signIn, signOut })(menu);
