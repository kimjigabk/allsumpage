import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchSongs, showVideo, closeVideo } from "../../actions";
import { withRouter } from "react-router-dom";
import _ from "lodash";

import LoadingCardList from "./LoadingCardList";
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
    const isYourPage = this.props.match.path.includes("yourpage");
    let songs = this.props.songs;
    const isAdmin = this.props.isAdmin;
    if (isYourPage) {
      const { currentUserId } = this.props;
      if (!currentUserId) {
        return <LoadingCardList />;
      }
      // render based on id array
      let tempSongs = {};
      let originalSongs = _.mapKeys(songs, "id");
      if (currentUserId && songs) {
        const arr = this.props.favoritedSongsIds;
        arr.forEach(function(value) {
          tempSongs = { ...tempSongs, [value]: originalSongs[value] };
        });
        songs = Object.values(tempSongs);
      }
    }
    if (this.props.songs.length === 0) {
      return <LoadingCardList />;
    }
    return songs
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
            {isAdmin && this.renderAdminEditDelete(song)}
          </div>
        );
      });
  }
  renderAdminEditDelete(song) {
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
  renderAdminCreate() {
    return (
      <div className="row" style={{ marginTop: "25px", marginBottom: "10px" }}>
        <div style={{ textAlign: "right" }}>
          <Link to="/songs/new" className="ui button primary">
            Create Entry
          </Link>
        </div>
      </div>
    );
  }
  onInputChange = input => {
    this.setState({ serachBoxInput: input.toLowerCase() });
  };

  render() {
    let height = "80vh";
    if (this.props.video.isShow) {
      height = "42vh";
    } else {
      height = "80vh";
    }
    const { video, closeVideo, songs, isAdmin } = this.props;
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
                height
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
          {isAdmin && this.renderAdminCreate()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, songs, video }) => {
  const { userId, favoritedSongsIds, isAdmin } = auth;
  return {
    currentUserId: userId,
    favoritedSongsIds: favoritedSongsIds,
    isAdmin,
    // songs: Object.values({}),
    songs: Object.values(songs),
    // songs: state.songs,
    video
  };
};

const page = withRouter(SongList);
export default connect(
  mapStateToProps,
  { fetchSongs, showVideo, closeVideo }
)(page);
