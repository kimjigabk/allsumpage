import React, { Component } from "react";
import { connect } from "react-redux";

import { createSong } from "../../actions";
import SongForm from "./SongForm";

class SongCreate extends Component {
  onSubmit = formValues => {
    this.props.createSong(formValues);
  };
  render() {
    return (
      <div style={{ margin: "0 5rem" }}>
        <h2>Create a Entry</h2>
        <SongForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default connect(
  null,
  { createSong }
)(SongCreate);
