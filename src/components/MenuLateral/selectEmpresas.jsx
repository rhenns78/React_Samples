import React from "react";
import { SelectBox, TextBox, Popover, List } from "devextreme-react";
import DevExpressDropdownButton from "../Shared/DevExpressDropdownButton";

const SelectItem = (props) => (
  <div className="company-name-select">
    <span className="nombre" title={props && props.Nombre}>{props && props.Nombre}</span>
    <span className="rut" title={props && props.RutEmpresa}>{props && props.RutEmpresa}</span>
    {props.selected && (
      <span className="check-empresa">
        <i className="material-icons">check_circle_outline</i>
      </span>
    )}
  </div>
);

class SelectEmpresas extends React.PureComponent {
  componentDidUpdate = (prevProps) => {
    if ((!this.props.isHovering && prevProps.isHovering) ||
      (!this.props.show && prevProps.show)) {
      this.props.open && this.props.handleOpenClose(false);
    }
  }

  render() {
    const {
      handleChange,
      dataSource,
      value,
      handleOpenClose,
      show,
    } = this.props;

    return (
      <div>
        <SelectBox
          visible={show}
          id="selectMenu"
          displayExpr="Nombre"
          onInitialized={(e) => {
            e.component._options.openOnFieldClick = false;
          }}
          valueExpr="RutEmpresa"
          placeholder="Empresas"
          dataSource={dataSource}
          value={value}
          fieldComponent={(props) => (
            <div className="select-empresas" onClick={() => handleOpenClose(true)}>
              <TextBox readOnly visible={false} defaultValue={props.Nombre} />
              <SelectItem className="select-item" {...props} />
              <DevExpressDropdownButton />
            </div>
          )}
        />
        <Popover
          position={{ offset: "0 -22", my: "bottom" }}
          target="#selectMenu"
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
            <List
              className="company-select-list"
              dataSource={dataSource}
              searchEnabled
              noDataText="Sin empresas"
              searchExpr={["RutEmpresa", "Nombre"]}
              searchEditorOptions={{
                placeholder: "Buscar empresa",
              }}
              onItemClick={(event) => {
                handleOpenClose(false);
                handleChange(event, event.itemData);
              }}
              itemRender={(props) =>
                <SelectItem {...props} selected={props && props.RutEmpresa === this.props.value} />
              }
            />
          </div>
        </Popover>
      </div>
    );
  }
}

export default SelectEmpresas;
