import React from "react";
import { connect } from "react-redux";
import flv from "flv.js";

import { fetchStream } from "../../state/actions";

class StreamShow extends React.Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
  }

  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  buildPlayer() {
    const { id } = this.props.match.params;

    this.player = flv.createPlayer({
      type: "flv",
      url: `http://localhost:8000/live/${id}.flv`,
    });

    this.player.attachMediaElement(this.videoRef.current);
    this.player.load();
  }

  componentDidUpdate() {
    if (this.player) {
      return;
    }

    this.buildPlayer();
  }

  componentWillUnmount() {
    this.player.destroy();
  }

  render() {
    if (!this.props.stream) {
      return <div>Loading...</div>;
    }

    const { title } = this.props.stream;
    const { description } = this.props.stream;

    return (
      <div>
        <video ref={this.videoRef} style={{ width: "100%" }} controls />
        <h1>{title}</h1>
        <h5>{description}</h5>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, {
  fetchStream,
})(StreamShow);
