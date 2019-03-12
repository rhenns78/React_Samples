import React from "react";
import { Button, Popover, List } from "devextreme-react";

const SelectItem = (props) => (
  <div className="tipo-denuncias-select-item">
    <i className="material-icons">{props.icon}</i>
    <span>{props.name}</span>
  </div>
);

class SelectTipo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      selected: props.selected,
    };
  }

  handleOpenClose = (open) => this.setState({ open });

  handleSelect = (e) => {
    this.setState({ selected: e.itemData, open: false });
    this.props.onClick(e.itemData);
  }

  render() {
    return (
      <React.Fragment >
        <div className="tipo-denuncias-select">
          <i className="material-icons">{this.state.selected.icon}</i>
          <span>{this.state.selected.name}</span>
          <Button
            className="denuncias-select-button"
            id="buttonSelect"
            height={25}
            onClick={() => this.handleOpenClose(true)}
          >
            <i className="material-icons">keyboard_arrow_down</i>
          </Button>
        </div>
        <Popover
          onHiding={() => this.handleOpenClose(false)}
          closeOnOutsideClick
          position={{ offset: "20 16", my: "right top" }}
          target="#buttonSelect"
          className="app-stack-popup"
          width={270}
          visible={this.state.open}
        >
          <div>
            <List
              selectionMode="none"
              className="denuncias-select-list"
              onItemClick={this.handleSelect}
              items={this.props.items}
              itemComponent={(props) => <SelectItem {...props} />}
            />

          </div>
        </Popover>
      </React.Fragment>
    );
  }
}

export default SelectTipo;
