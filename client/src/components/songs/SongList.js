import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchSongs } from "../../actions";
import keys from "../keys";

class SongList extends React.Component {
  componentDidMount() {
    this.props.fetchSongs();
  }
  renderList() {
    return this.props.songs.map(song => {
      return (
        <div className="item" key={song.id}>
          {this.renderAdmin(song)}
          <div className="content">
            {song.title}
            <div className="description">{song.description}</div>
            <div>{song.youtubeUrl}</div>
          </div>
        </div>
      );
    });
  }

  renderAdmin(song) {
    if (this.props.currentUserId === keys.adminId) {
      return (
        <div className="right floated content">
          <Link to={`/songs/edit/${song.id}`} className="ui button primary">
            EDIT
          </Link>
          <Link to={`/songs/delete/${song.id}`} className="ui button">
            DELETE
          </Link>
        </div>
      );
    }
  }
  // admin gets to add and edit items
  // other users can only view the item
  // they can save an item to favorites in songdetail component

  render() {
    console.log(
      this.props.songs[0] === undefined ? "hi" : this.props.songs[0].title
    );
    return (
      <div>
        <div className="ui celled list">{this.renderList()}</div>
        <div>
          <Link to="/songs/1" className="header">
            Song one
          </Link>
          <Link to="/songs/2" className="header">
            Song Two
          </Link>
        </div>
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
