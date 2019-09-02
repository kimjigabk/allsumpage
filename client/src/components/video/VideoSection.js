import React from "react";
import { connect } from "react-redux";

import VideoPlayer from "./VideoPlayer";
import VideoDetail from "./VideoDetail";

import "./VideoSection.css";

class VideoSection extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    const isShow = this.props.video.isShow;
    if (isShow === nextProps.video.isShow) {
      if (this.props.video.songId !== nextProps.video.songId) {
        return true;
      }
      return false;
    }
    return true;
  }
  render() {
    const { video, closeVideo, song } = this.props;
    if (video.isShow) {
      return (
        <div
          className="ui stackable two column grid"
          style={{ margin: "auto 0" }}
        >
          <div className="ui row" style={{ paddingBottom: 0 }}>
            <div className="eleven wide column">
              <VideoPlayer url={this.props.song.youtubeUrl} />
            </div>
            <div className="five wide column" id="hajima">
              <VideoDetail
                title={song.title}
                artist={song.artist}
                description={song.description}
                closeVideo={closeVideo}
              />
            </div>
          </div>
        </div>
      );
    } else return "";
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    song: state.songs[ownProps.video.songId]
  };
};
export default connect(
  mapStateToProps,
  null
)(VideoSection);
