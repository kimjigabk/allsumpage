import React, { Component } from "react";
import { connect } from "react-redux";

import { createSong } from "../../actions";
import SongForm from "./SongForm";

class SongCreate extends Component {
  onSubmit = formValues => {
    this.props.createSong(formValues);
  };
  render() {
    if (!this.props.isAdmin) {
      return <div>로그인하세요</div>;
    }
    return (
      <div style={{ margin: "0 5rem" }}>
        <h2>Create a Entry</h2>
        <SongForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}
const mapStateToProps = ({ auth }) => {
  return {
    currentUserId: auth.userId,
    isAdmin: auth.isAdmin
  };
};

export default connect(
  mapStateToProps,
  { createSong }
)(SongCreate);
