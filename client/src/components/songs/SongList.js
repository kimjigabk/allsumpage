import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchSongs, showVideo, closeVideo } from "../../actions";
import keys from "../../config/keys";
import VideoSection from "../video/VideoSection";

class SongList extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.currentUserId !== this.props.currentUserId) {
      return true;
    }
    if (this.props.songs.length === nextProps.songs.length) {
      if (this.props.video.songId !== nextProps.video.songId) {
        return true;
      }
      return false;
    }
    return true;
  }
  componentDidMount() {
    this.props.fetchSongs();
  }
  renderList() {
    if (!this.props.songs) {
      return "씨발 로딩중임";
    }
    return this.props.songs.map(song => {
      return (
        <div className="card" key={song.id}>
          <div className="image">
            <img alt="albumart" src={song.imageUrl}></img>
          </div>
          <div className="content">
            <div className="header">{song.title}</div>
            <div className="meta">{song.artist}</div>
            <div className="description">{song.description.slice(0, 30)}</div>
            <br></br>
            <button
              onClick={() => this.props.showVideo(song.id)}
              className="ui labeled icon button"
            >
              <i className="play circle outline icon"></i>
              Play
            </button>
          </div>
          {this.renderAdminEditDelete(song)}
        </div>
      );
    });
  }

  renderAdminEditDelete(song) {
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

  renderAdminCreate() {
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
      <div>
        <VideoSection
          video={this.props.video}
          closeVideo={this.props.closeVideo}
        />

        <div className="ui stackable">
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
          <div className="row" style={{ marginBottom: "10px" }}>
            {this.renderAdminCreate()}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  // 원래 data: array of objects, object =   {
  //   "title": "라앤타 기와라이브",
  //   "description": "여러가지음악이 나옴",
  //   "id": "ABASFSAFSQRWQEQWE",
  //   "youtubeUrl": "https://www.youtube.com/watch?v=uWF9B4yh3ZM",
  //   "authorId": "103336108693548827446",
  //   "artist": "ㅎㅇ"
  // },
  // console.log(state.songs); 이건 object. key = id from above,, value = the whole object above
  // state.songs[KEY] 를하면 하나의 whole object를 리턴받음 .{title: .. description: ..}
  // console.log(Object.values(state.songs)); 이건 array (map을 쓰기위해.)
  // Object.values(state.songs)[#] 여긴 #밖에 못들어간다  array라서

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
