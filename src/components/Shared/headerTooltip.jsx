import React from "react";
import { Popover } from "devextreme-react";

class HeaderTooltip extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      hover: false,
    };
  }

  handleHover = (hover) => {
    this.setState({ hover });
  }

  render() {
    const {
      headerText,
      toolTipText,
      textFirst,
      id,
      widthprops,
    } = this.props;
    let body;
    const help = (
      <span
        id={id}
        className="headerTooltipHelp"
        onMouseEnter={() => this.handleHover(true)}
        onMouseLeave={() => this.handleHover(false)}
        style={textFirst ? { marginLeft: 5 } : { marginRight: 5 }}
      > ?
      </span>
    );

    const header = (
      <span className="headerTooltipText" title={headerText}>
        {headerText}
      </span>
    );

    if (textFirst) {
      body = (
        <React.Fragment>
          {header}
          {help}
        </React.Fragment>
      );
    } else {
      body = (
        <React.Fragment>
          {help}
          {header}
        </React.Fragment>
      );
    }

    return (
      <div style={{ display: "inline-flex", width: "100%" }}>
        {body}
        <Popover
          target={`#${id}`}
          position="top"
          width={widthprops !== null ? widthprops : 300}
          visible={this.state.hover}
        >
          {toolTipText}
        </Popover>

      </div>
    );
  }
}

export default HeaderTooltip;
