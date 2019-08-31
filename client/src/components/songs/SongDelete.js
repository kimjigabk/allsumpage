import React from "react";
import Modal from "../Modal";
import history from "../../history";

import { connect } from "react-redux";
import { fetchSong, deleteSong } from "../../actions";

class SongDelete extends React.Component {
  componentDidMount() {
    this.props.fetchSong(this.props.match.params.id);
  }
  deleteAction() {
    const id = this.props.match.params.id;
    return (
      //Fragment 이유: 이거 안하면 버튼이 밑에 달라붙음
      <React.Fragment>
        <button
          onClick={() => this.props.deleteSong(id)}
          className="ui button negative"
        >
          Delete
        </button>
        <button onClick={() => history.goBack()} className="ui button">
          Cancel
        </button>
      </React.Fragment>
    );
  }
  renderContent() {
    if (!this.props.song) {
      return "Are you sure you want to delete Song :";
    } else {
      return `Are you sure you want to delete Song : ${this.props.song.title}`;
    }
  }
  render() {
    // console.log(this.props);
    return (
      <div>
        <Modal
          title="Delete Song"
          content={this.renderContent()}
          actions={this.deleteAction()}
          onDismiss={() => history.goBack()}
        />
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  //   console.log(state);
  return { song: state.songs[ownProps.match.params.id] };
};
export default connect(
  mapStateToProps,
  {
    fetchSong,
    deleteSong
  }
)(SongDelete);
