import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchSongs } from "../../actions";
import keys from "../keys";
import SongVideo from "./SongVideo";

class SongList extends React.Component {
  state = {
    isShow: false,
    songUrl: ""
  };
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
            <div className="description">{song.description}</div>
            <br></br>
            <button
              onClick={() => this.renderVideo(song.youtubeUrl)}
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
  renderVideo(songUrl) {
    this.setState((state, props) => ({ isShow: true, songUrl }));
  }
  // admin gets to add and edit items
  // other users can only view the item
  // they can save an item to favorites in songdetail component
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
        {this.state.isShow && <SongVideo url={this.state.songUrl} />}
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
    songs: Object.values(state.songs)
  };
};
export default connect(
  mapStateToProps,
  { fetchSongs }
)(SongList);
