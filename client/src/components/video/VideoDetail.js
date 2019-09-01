import React from "react";

class VideoDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = { active: "" };
  }
  // 별 하트 색칠 되나 보기용
  onIconClick = () => {
    this.setState({ active: "active" });
  };

  render() {
    const { title, artist, description, closeVideo } = this.props;
    return (
      <div className="ui fluid card">
        <div className="content">
          <i
            className="close icon link"
            style={{ position: "absolute", right: "0.95rem" }}
            onClick={() => {
              closeVideo();
            }}
          ></i>
          <div className="header">{title}</div>
          <div className="meta">{artist}</div>
          <div className="description">
            <p>{description.slice(0, 150)}</p>
          </div>
        </div>
        <div className="extra content">
          <span className="left floated like">
            <i
              className={`like icon ${this.state.active}`}
              onClick={this.onIconClick}
            ></i>
            Like
          </span>
          <span className="right floated star">
            <i
              className={`star icon ${this.state.active}`}
              onClick={this.onIconClick}
            ></i>
            Favorite
          </span>
        </div>
      </div>
    );
  }
}

export default VideoDetail;
