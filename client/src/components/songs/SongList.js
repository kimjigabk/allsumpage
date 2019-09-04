import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchSongs, showVideo, closeVideo } from "../../actions";

import keys from "../../config/keys";

import LoadingCard from "./LoadingCard";
import VideoSection from "../video/VideoSection";
import SongDelete from "./SongDelete";
import SearchBox from "../searchbox/SearchBox";

class SongList extends React.Component {
  state = {
    isModalActive: false,
    deletingSong: null,
    serachBoxInput: ""
  };
  showDeleteModal = song => {
    this.setState({ isModalActive: true, deletingSong: song });
  };

  hideDeleteModal = () => {
    this.setState({ isModalActive: false, deletingSong: null });
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.currentUserId !== this.props.currentUserId) {
      return true;
    }
    if (this.state !== nextState) {
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
    if (this.props.songs.length === 0) {
      return (
        <React.Fragment>
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
        </React.Fragment>
      );
    }
    return this.props.songs
      .filter(song =>
        song.title
          .concat(song.artist, song.description)
          .toLowerCase()
          .includes(this.state.serachBoxInput)
      )
      .map(song => {
        return (
          <div
            key={song.id}
            onClick={() => this.props.showVideo(song.id)}
            className="card"
            style={{ maxHeight: "465px" }}
          >
            <div className="image">
              <img alt="albumart" src={song.imageUrl}></img>
            </div>
            <div className="content">
              <div className="header">{song.title}</div>
              <div className="meta">{song.artist}</div>
              <div className="description">{song.description.slice(0, 40)}</div>
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
              onClick={e => {
                e.stopPropagation();
              }}
              to={`/songs/edit/${song.id}`}
              className="compact ui icon button"
            >
              <i className="edit icon"></i>
            </Link>

            <button
              onClick={e => {
                e.stopPropagation();
                this.showDeleteModal(song);
              }}
              className="compact ui icon button"
            >
              <i className="trash alternate outline icon"></i>
            </button>
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
  onInputChange = input => {
    this.setState({ serachBoxInput: input.toLowerCase() });
  };

  render() {
    let height = "75vh";
    if (this.props.video.isShow) {
      height = "42vh";
    } else {
      height = "75vh";
    }
    const { video, closeVideo, songs } = this.props;
    const vsong = songs.filter(song => song.id === this.props.video.songId)[0];

    return (
      <div>
        <VideoSection video={video} closeVideo={closeVideo} song={vsong} />
        <SearchBox onInputChange={this.onInputChange} songs={songs} />
        <div className="ui stackable">
          <div className="row">
            <div
              className="ui link five doubling centered cards"
              style={{
                overflowY: "auto",
                height: height
              }}
            >
              {this.renderList()}
            </div>
          </div>
          {this.state.isModalActive && (
            <SongDelete
              hideDeleteModal={this.hideDeleteModal}
              deletingSong={this.state.deletingSong}
            />
          )}
          <div
            className="row"
            style={{ marginTop: "25px", marginBottom: "10px" }}
          >
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
    // songs: Object.values({}),
    songs: Object.values(state.songs),
    video: state.video
  };
};
export default connect(
  mapStateToProps,
  { fetchSongs, showVideo, closeVideo }
)(SongList);
