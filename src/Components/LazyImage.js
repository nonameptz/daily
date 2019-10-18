import React from "react";
import "./LazyImage.css";

export default class LazyImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      error: false
    };
  }

  componentDidMount() {
    const img = new Image();
    img.onload = () => {
      this.setState({
        loaded: true
      });
    };
    img.onerror = () => {
      this.setState({
        error: true
      });
    };
    img.src = this.props.src;
  }

  render() {
    if (this.state.error) {
      return (
        <img
          className={this.props.className}
          style={this.props.style}
          src={this.props.unloadedSrc}
          alt={this.props.alt}
        />
      );
    } else if (!this.state.loaded) {
      return (
        <div className="bouncing-loader">
          <div></div>
          <div></div>
          <div></div>
        </div>
      );
    }
    return (
      <img
        className={this.props.className}
        style={this.props.style}
        src={this.props.src}
        alt={this.props.alt}
      />
    );
  }
}
