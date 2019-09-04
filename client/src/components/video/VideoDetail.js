import React from "react";
import { connect } from "react-redux";
import axios from "axios";

const tempArr = [1567367270067, 1567367115439, 1567367270067];
//지금 state.auth에서 userId를 받아오고있음 
// 여기엔 favoirtesongs arrayh도있기때문에 상관없을ㄷ스
// 문제: 이걸 connect가 이미 section에 돼있는데 이걸 어떻게하느냐~ 

class VideoDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = { like: "", star: "" };
  }
  // 별 하트 색칠 되나 보기용
  onLikeClick = () => {
    this.setState({ like: "active" });
  };
  onStarClick = () => {
    axios
      .patch("/api/user", {
        userId: this.props.user.userId,
        songId: this.props.songId
      })
      .then(function(response) {
        console.log(response);
      });
  };

  render() {
    const { title, artist, description, closeVideo } = this.props;
    if (tempArr.includes(this.props.songId)) {
      console.log("있네");
    }
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
              className={`star icon ${
                tempArr.includes(this.props.songId) ? "active" : ""
              }`}
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
export default connect(mapStateToProps)(VideoDetail);
