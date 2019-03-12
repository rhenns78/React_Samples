import React from "react";
import { TextBox, SelectBox, Popover, List, Button } from "devextreme-react";

class TableFilterSelect extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };

    this.listRef = React.createRef();
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.selectedValues.length !== this.props.selectedValues.length) {
      const values = this.props.selectedValues.map((item) => item.value);
      this.listRef.option("selectedItems", values);
    }
  }

  filterCallback = () => {
    const filter = [];
    const selectedItems = this.listRef.option("selectedItems");

    if (selectedItems) {
      selectedItems.forEach((f) => {
        filter.push({ column: this.props.column, value: f });
      });

      if (filter.length === 0) {
        filter.push({ column: this.props.column, value: null });
      }
      this.props.onFilter(filter);

      this.setState({ open: false });
    }
  }

  handleOpenClose = (isOpen) => {
    this.setState({ open: isOpen });
    if (!isOpen) {
      this.clearSelection();
    }
  }

  clearSelection = () => {
    if (this.props.selectedValues && this.props.selectedValues.length === 0) {
      this.listRef.option("selectedItems", []);
    }
  }

  handleCancel = () => {
    this.setState({ open: false });
    this.clearSelection();
  }

  render() {
    return (
      <React.Fragment>
        <SelectBox
          onInitialized={(e) => {
            e.component.option("openOnFieldClick", false);
          }}
          displayExpr="Name"
          id={this.props.column}
          className="select-table-filter"
          fieldComponent={(props) => (
            <React.Fragment>
              <TextBox readOnly visible={false} />
              <div className="select-table-filter-field" onClickCapture={() => this.handleOpenClose(!this.state.open)}>
                <span>{this.props.filterText}</span>
                <i className="dx-icon dx-icon-filter"></i>
              </div>
            </React.Fragment>
          )}
        />

        <Popover
          position={{ offset: "0 16", my: "top" }}
          target={`#${this.props.column}`}
          className="popover-menu"
          closeOnOutsideClick
          width="250"
          visible={this.state.open}
          animation={{
            show: {
              type: "pop",
              duration: 0,
            },
          }}
          onHiding={() => this.handleOpenClose(false)}
        >
          <div onMouseEnter={this.props.onMouseEnter}>
            <List
              selectionMode="all"
              ref={(ref) => { if (ref !== null) this.listRef = ref.instance; }}
              items={this.props.values}
              showSelectionControls
            />
          </div>
          <div style={{ marginTop: 10 }}>
            <Button text="Cerrar" onClick={this.handleCancel} />
            <Button
              text="Filtrar"
              className="filter-accept-button"
              onClick={this.filterCallback}
            />
          </div>
        </Popover>

      </React.Fragment>
    );
  }
}

export default TableFilterSelect;
