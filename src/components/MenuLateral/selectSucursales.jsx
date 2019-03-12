import React from "react";
import { SelectBox, TextBox, Popover, List, Switch } from "devextreme-react";
import DevExpressDropdownButton from "../Shared/DevExpressDropdownButton";

const SelectItem = React.memo((props) => (
  <div className="company-name-select">
    <span className="sucursal" title={props && props.Direccion}>{props && props.Direccion}</span>
    <span className="rut" title={props && props.Ciudad} > {props.Ciudad}</span>
    {props.selected &&
      <span className="check-sucursal">
        <i className="material-icons" style={{ fontSize: 25, color: "green" }}>check_circle_outline</i>
      </span>
    }
  </div>
));

class SelectSucursales extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      onlyValid: false,
    };
  }

  componentDidUpdate = (prevProps) => {
    if ((!this.props.isHovering && prevProps.isHovering) ||
      (!this.props.show && prevProps.show)) {
      this.props.open && this.props.handleOpenClose(false);
    }
  }

  handleFilter = (e) => {
    this.setState({ onlyValid: e.value });
  }

  render() {
    const {
      handleChange,
      dataSource,
      value,
      handleOpenClose,
      show,
    } = this.props;

    let mockSource = dataSource;
    if (this.state.onlyValid) {
      mockSource = mockSource.filter((s) => s.Active);
    }

    return (
      <div>
        <SelectBox
          visible={show}
          id="sucursalesMenu"
          style={{ marginTop: 16 }}
          displayExpr="Direccion"
          valueExpr="IdSucursal"
          onInitialized={(e) => {
            e.component.option("openOnFieldClick", false);
          }}
          placeholder="Sucursales"
          dataSource={dataSource}
          value={value}
          fieldComponent={(props) => (
            <div className="select-sucursal" onClickCapture={() => handleOpenClose(true)}>
              <TextBox readOnly visible={false} defaultValue={props.Direccion} />
              <SelectItem {...props} />
              <DevExpressDropdownButton />
            </div>
          )}
        />
        <Popover
          position={{ offset: "0 -24", my: "bottom" }}
          target="#sucursalesMenu"
          className="popover-menu"
          width="200"
          animation={{
            show: {
              type: "pop",
              duration: 0,
            },
          }}
          visible={this.props.open}
          onHiding={() => handleOpenClose(false)}
        >
          <div onMouseEnter={this.props.onMouseEnter}>
            <div className="sucursales-vigentes">
              <span className="texto">Mostrar no vigentes</span>
              <Switch
                switchedOffText="No"
                switchedOnText="Si"
                value={this.state.onlyValid}
                onValueChanged={this.handleFilter}
              />
            </div>
            <List
              className="company-select-list sucursales-list"
              dataSource={mockSource}
              searchEnabled
              noDataText="Sin resultados"
              pageLoadMode="scrollBottom"
              searchExpr={["Direccion", "Active"]}
              searchEditorOptions={{
                placeholder: "Buscar sucursal",
              }}
              onItemClick={(event) => {
                handleOpenClose(false);
                handleChange(event, event.itemData);
              }}
              itemRender={(props) =>
                <SelectItem {...props} selected={props && props.IdSucursal === this.props.value} />
              }
            />
          </div>
        </Popover>
      </div>
    );
  }
}

export default SelectSucursales;
