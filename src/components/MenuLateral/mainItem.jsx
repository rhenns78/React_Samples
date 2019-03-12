import React from "react";

class MainItem extends React.PureComponent {
  handleClick = (e, isTap) => {
    if (isTap) {
      this.props.onTouch(e);
    } else if (!this.props.isTouch) {
      this.props.onClick(e);
    }
  }

  render() {
    const {
      text,
      icon,
      active,
    } = this.props;

    return (
      <div
        className={`main-menu-item ${active ? "active" : ""}`}
        onClick={(e) => this.handleClick(e, false)}
        onTouchStart={(e) => this.handleClick(e, true)}
        onMouseEnter={this.props.onMouseEnter}
      >
        <i className="achs-icon">{icon}</i>
        <span>{text}</span>
      </div>
    );
  }
}

export default MainItem;
