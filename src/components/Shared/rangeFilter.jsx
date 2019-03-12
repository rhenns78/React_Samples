import React from "react";
import { Button, Popover, DateBox, SelectBox, TextBox } from "devextreme-react";
import { filterType } from "../../helpers/filterHelper.ts";

class RangeFilter extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      desde: null,
      hasta: null,
    };
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.selectedValues.length !== this.props.selectedValues.length
      && prevProps.selectedValues.length > this.props.selectedValues.length) {
      this.setState({ desde: null, hasta: null });
    }
  }

  handleOpenClose = (open) => {
    this.setState({ open });
  }

  handleAccept = () => {
    const {
      desde,
      hasta,
    } = this.state;

    let filterValue;

    if (desde != null && hasta != null) {
      filterValue = {
        text: `${this.props.filterText}: ${this.state.desde.toLocaleDateString()} - ${this.state.hasta.toLocaleDateString()}`,
        value: {
          from: this.state.desde,
          to: this.state.hasta,
        },
      };
    }

    this.setState({ open: false });
    this.props.onFilter([{
      column: this.props.column,
      type: filterType.date,
      value: filterValue,
    }]);
  }

  handleCancel = () => {
    this.setState({ open: false, hasta: null, desde: null });
    this.handleAccept();
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
            <div className="select-table-filter-field" onClickCapture={() => this.handleOpenClose(!this.state.open)}>
              <span>{this.props.filterText}</span>
              <TextBox readOnly visible={false} />
              <i className="dx-icon dx-icon-filter"></i>
            </div>
          )}
        />
        <Popover
          onHiding={() => this.setState({ open: false })}
          closeOnOutsideClick
          visible={this.state.open}
          width={250}
          target={`#${this.props.column}`}
          position={{ offset: "0 16", my: "top" }}
          animation={{
            show: {
              type: "pop",
              duration: 0,
            },
          }}
        >
          <DateBox
            type="date"
            width={230}
            placeholder="Desde"
            max={this.state.hasta}
            displayFormat="dd-MM-yyyy"
            onValueChanged={(event) => this.setState({ desde: event.value })}
            value={this.state.desde}
          />
          <DateBox
            type="date"
            width={230}
            placeholder="Hasta"
            displayFormat="dd-MM-yyyy"
            min={this.state.desde}
            onValueChanged={(event) => this.setState({ hasta: event.value })}
            value={this.state.hasta}
            style={{ marginTop: 10 }}
          />
          <div style={{ marginTop: 10 }}>
            <Button text="Cerrar" onClick={this.handleCancel} />
            <Button
              text="Filtrar"
              className="filter-accept-button"
              disabled={!(this.state.desde && this.state.hasta)}
              onClick={this.handleAccept}
            />
          </div>
        </Popover>
      </React.Fragment>
    );
  }
}

export default RangeFilter;
