import React from "react";
import { Button, Popover, List } from "devextreme-react";

class AppStack extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  handleShowHide = (open) => this.setState({ open });

  render() {
    return (
      <div>
        <Button
          id="btnAppStack"
          onClick={() => this.handleShowHide(!this.state.open)}
          stylingMode="text"
          className="buttonIconTopBar"
          type="normal"
        >
          <i className="achs-icon"> p </i>
        </Button>

        <Popover
          target="#btnAppStack"
          position="bottom"
          className="app-stack-popup"
          visible={this.state.open}
          onHiding={() => this.handleShowHide(false)}
        >
          <List
            className="app-stack-list"
            selectionMode="none"
            items={this.props.apps}
            itemComponent={(props) => (
              <div className="app-stack-item">
                <i className="achs-icon" style={{ marginTop: -7, fontSize: 36 }}> {props.icon}</i>
                <span>{props.name}</span>
              </div>
            )}
          />
        </Popover>
      </div>
    );
  }
}

export default AppStack;
