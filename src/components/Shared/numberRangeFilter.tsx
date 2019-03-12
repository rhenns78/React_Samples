import React from "react";
import { Button, Popover, SelectBox, TextBox, NumberBox } from "devextreme-react";
import { FilterItemsType, filterType } from "../../helpers/filterHelper";

interface Props {
  key: string;
  filterText: string;
  column: string;
  onFilter: (filtro: FilterItemsType) => void;
  selectedValues: FilterItemsType
}

interface State {
  open: boolean,
  desde: number | undefined,
  hasta: number | undefined,
}

class NumberRangeFilter extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      open: false,
      desde: undefined,
      hasta: undefined,
    };
  }

  componentDidUpdate = (prevProps: Props) => {
    if (prevProps.selectedValues.length !== this.props.selectedValues.length
      && prevProps.selectedValues.length > this.props.selectedValues.length) {
      this.setState({ desde: undefined, hasta: undefined });
    }
  }

  handleOpenClose = (open: boolean) => {
    this.setState({ open });
  }

  handleCancel = () => {
    this.setState({ open: false, hasta: undefined, desde: undefined });
    this.handleFilter();
  }

  handleFilter = () => {
    const {
      desde,
      hasta,
    } = this.state;

    let filterValue;
    if (desde != null && hasta != null) {
      filterValue = {
        text: `${this.props.filterText}: ${this.state.desde} - ${this.state.hasta}`,
        value: {
          from: desde,
          to: hasta,
        }
      };
    }

    this.setState({ open: false });
    this.props.onFilter([{
      column: this.props.column,
      type: filterType.number,
      value: filterValue,
    }]);
  }

  render() {
    return (
      <React.Fragment>
        <SelectBox
          onInitialized={e => {
            e!.component!.option("openOnFieldClick", false);
          }}
          displayExpr="Name"
          id={this.props.column}
          className="select-table-filter"
          fieldComponent={props => (
            <div
              className="select-table-filter-field"
              onClickCapture={() => this.handleOpenClose(!this.state.open)}
            >
              <span>{this.props.filterText}</span>
              <TextBox readOnly visible={false} />
              <i className="dx-icon dx-icon-filter" />
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
          <NumberBox
            value={this.state.desde}
            showSpinButtons
            showClearButton
            format="currency"
            placeholder="Mínimo"
            onValueChanged={(event) => this.setState({ desde: event.value })}
          />
          <NumberBox
            value={this.state.hasta}
            showSpinButtons
            showClearButton
            placeholder="Máximo"
            format="currency"
            style={{ marginTop: 10 }}
            onValueChanged={(event) => this.setState({ hasta: event.value })}

          />
          <div style={{ marginTop: 10 }}>
            <Button text="Cerrar" onClick={this.handleCancel} />
            <Button
              text="Filtrar"
              className="filter-accept-button"
              disabled={!(this.state.desde != null && this.state.hasta != null)}
              onClick={this.handleFilter}
            />
          </div>
        </Popover>
      </React.Fragment>
    );
  }
}

export default NumberRangeFilter;
