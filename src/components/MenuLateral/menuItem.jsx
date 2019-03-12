import React from "react";

class MenuItem extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
    };
  }
  render() {
    const {
      name,
      selected,
      route,
      navigate,
      icon,
    } = this.props;

    return (
      <div
        className={`menu-item ${selected || this.state.hover ? "active" : ""}`}
        onClickCapture={() => !selected && navigate(route)}
        onMouseEnter={() => this.setState({ hover: true })}
        onMouseLeave={() => this.setState({ hover: false })}
      >
        {<i className={`achs-icon menu-icon ${selected ? "selected" : ""}`} style={{ marginTop: -4, paddingRight: 10, fontSize: 34 }} >{icon || "B"}</i>}
        <span className={`menu-item-text ${selected ? "selected" : ""}`}>{name}</span>
      </div>
    );
  }
} 

export default MenuItem;
