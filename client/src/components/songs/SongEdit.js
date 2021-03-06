import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { fetchSong, editSong } from "../../actions";
import SongForm from "./SongForm";

class SongEdit extends React.Component {
  componentDidMount() {
    this.props.fetchSong(this.props.match.params.id);
  }
  onSubmit = formValues => {
    this.props.editSong(this.props.match.params.id, formValues);
  };
  render() {
    if (!this.props.isAdmin) {
      return <div>로그인하세요</div>;
    }
    if (!this.props.song) {
      return <div>불러오는 중</div>;
    }
    return (
      <div>
        <h2>Edit for: {this.props.song.title}</h2>
        <SongForm
          initialValues={_.pick(
            this.props.song,
            "title",
            "artist",
            "description",
            "youtubeUrl",
            "imageUrl"
          )}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    song: state.songs[ownProps.match.params.id],
    isAdmin: state.auth.isAdmin
  };
};

export default connect(
  mapStateToProps,
  {
    fetchSong,
    editSong
  }
)(SongEdit);
