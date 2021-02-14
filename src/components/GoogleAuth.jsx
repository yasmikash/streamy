import React from "react";
import { connect } from "react-redux";

import { signIn, signOut } from "../state/actions";

class GoogleAuth extends React.Component {
  // state = { signedIn: null };

  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "3592604647-ml2lpq1lep2dvq69n3s0kc1jn08qm0pd.apps.googleusercontent.com",
          scope: "email",
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();

          // this.setState({
          //   signedIn: this.auth.isSignedIn.get(),
          // });
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
    this.setState({ signedIn: isSignedIn });
  };

  attemptSignIn = () => {
    this.auth.signIn();
  };

  attemptSignOut = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.props.auth.isSignedIn === null) {
      return null;
    } else if (this.props.auth.isSignedIn) {
      return (
        <button onClick={this.attemptSignOut} className="ui red google button">
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={this.attemptSignIn} className="ui red google button">
          <i className="google icon" />
          Sign In
        </button>
      );
    }
  }

  render() {
    return this.renderAuthButton();
  }
}

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps, {
  signIn,
  signOut,
})(GoogleAuth);
