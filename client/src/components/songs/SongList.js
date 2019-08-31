import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchSongs, showVideo, closeVideo } from "../../actions";
import keys from "../keys";
import SongVideo from "./SongVideo";

class SongList extends React.Component {
  componentDidMount() {
    this.props.fetchSongs();
  }
  renderList() {
    return this.props.songs.map(song => {
      return (
        <div className="card" key={song.id}>
          <div className="image">
            <img
              alt="abc"
              src="https://cdnimg.melon.co.kr/cm/album/images/026/81/021/2681021_1000.jpg/melon/quality/80/optimize"
            ></img>
          </div>
          <div className="content">
            <div className="header">{song.title}</div>
            <div className="meta">{song.artist}</div>
            <div className="description">{song.description.slice(0,15)}</div>
            <br></br>
            <button
              onClick={() => this.props.showVideo(song.youtubeUrl)}
              className="ui labeled icon button"
            >
              <i className="play circle outline icon"></i>
              Play
            </button>
          </div>
          {this.renderAdmin(song)}
        </div>
      );
    });
  }
  renderVideo() {
    if (this.props.video.isShow) {
      return (
        <div
          className="ui stackable"
          style={{ margin: "auto 0" }}
        >
          <div className="centered column">
            <div className="ui card">
              <SongVideo url={this.props.video.youtubeUrl} />
            </div>
          </div>
          <div className=" centered column">
            <div className="ui card">안녕하셈</div>
          </div>
        </div>
      );
    } else return;
  }

  renderAdmin(song) {
    if (this.props.currentUserId === keys.adminId) {
      return (
        <div className="extra content">
          <div className="">
            <Link
              to={`/songs/edit/${song.id}`}
              className="compact ui icon button"
            >
              <i className="edit icon"></i>
            </Link>
            <Link
              to={`/songs/delete/${song.id}`}
              className="compact ui icon button"
            >
              <i className="trash alternate outline icon"></i>
            </Link>
          </div>
        </div>
      );
    }
  }

  renderCreate() {
    if (this.props.currentUserId === keys.adminId) {
      return (
        <div style={{ textAlign: "right" }}>
          <Link to="/songs/new" className="ui button primary">
            Create Entry
          </Link>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="ui stackable">
        {this.renderVideo()}
        <div className="row">
          <div
            className="ui five doubling centered cards"
            style={{
              margin: "2rem auto",
              overflow: "scroll",
              overflowX: "hidden",
              height: "590px"
            }}
          >
            {this.renderList()}
          </div>
        </div>
        <div className="row">{this.renderCreate()}</div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    currentUserId: state.auth.userId,
    songs: Object.values(state.songs),
    video: state.video
  };
};
export default connect(
  mapStateToProps,
  { fetchSongs, showVideo, closeVideo }
)(SongList);
