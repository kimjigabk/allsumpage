import React from "react";
import { connect } from "react-redux";
import { addToFavorites } from "../../actions";

class VideoDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = { like: "", heart: "" };
  }
  // 별 하트 색칠 되나 보기용
  onLikeClick = () => {
    this.setState({ like: "active" });
  };

  onStarClick = () => {
    if (!this.props.user.isSignedIn) {
      alert("you need to log in to favorite");
    } else {
      this.props.addToFavorites(this.props.user.userId, this.props.songId);
    }
  };

  render() {
    const { songId, title, artist, description, closeVideo, user } = this.props;
    const arr = user.favoritedSongsIds || ""; //로그인 안했을때를 대비
    return (
      <div className="ui fluid card">
        <div className="content">
          <i
            className="close icon link"
            style={{ position: "absolute", right: "7px" }}
            onClick={() => {
              closeVideo();
            }}
          ></i>
          <div
            className="header"
            style={{ width: "80%", display: "inline-block" }}
          >
            {title}
          </div>
          <div className="meta">{artist}</div>
          <div className="description">
            <p>{description.slice(0, 150)}</p>
          </div>
        </div>
        <div className="extra content">
          <span className="left floated like" onClick={this.onLikeClick}>
            <i className={`like icon ${this.state.like}`}></i>
            Like
          </span>
          <span className="right floated star" onClick={this.onStarClick}>
            <i
              className={`star icon ${arr.includes(songId) ? "active" : ""}`}
            ></i>
            Favorite
          </span>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.auth
  };
};
export default connect(
  mapStateToProps,
  { addToFavorites }
)(VideoDetail);
