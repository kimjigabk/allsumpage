import React from "react";
import Modal from "../Modal";

import { connect } from "react-redux";
import { deleteSong, closeVideo } from "../../actions";

class SongDelete extends React.Component {
  deleteAction() {
    const id = this.props.deletingSong.id;
    return (
      //Fragment 이유: 이거 안하면 버튼이 밑에 달라붙음
      <React.Fragment> 
        <button
          onClick={() => {
            this.props.closeVideo(); //안닫으면 비디오에서 에러남
            this.props.deleteSong(id);
            this.props.hideDeleteModal();
          }}
          className="ui button negative"
        >
          Delete
        </button>
        <button onClick={this.props.hideDeleteModal} className="ui button">
          Cancel
        </button>
      </React.Fragment>
    );
  }
  renderContent() {
    if (!this.props.deletingSong) {
      return "Are you sure you want to delete Song :";
    } else {
      return `Are you sure you want to delete Song : ${this.props.deletingSong.title}`;
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
          onDismiss={this.props.hideDeleteModal}
        />
      </div>
    );
  }
}
export default connect(
  null,
  {
    deleteSong,
    closeVideo
  }
)(SongDelete);
