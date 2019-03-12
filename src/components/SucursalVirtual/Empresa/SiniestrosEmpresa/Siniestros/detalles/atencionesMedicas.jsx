import React from "react";
import DataGrid, { HeaderFilter, Column } from "devextreme-react/ui/data-grid";
import ReactDOM from "react-dom";
import NoDataComponent from "../../../../../Shared/noDataImage";
class AtencionesMedicas extends React.PureComponent {
  render() {
    return (
      <DataGrid
        showBorders={false}
        showColumnLines={false}
        showRowLines={false}
        rowAlternationEnabled
        // className="tabla-siniestros"
        className="custom-table height-min cursor-disabled"
        noDataText=""
        dataSource={this.props.data}
        onContentReady={(e) => {
          if (this.props.showNoData) {
            const config = {};
            config.addClass = "table-margin-detalle";
            const noDataSpan = e.component.element().querySelector(".dx-scrollable-wrapper");
            ReactDOM.render(<NoDataComponent config={config} message="Sin atenciones médicas" />, noDataSpan);
          }
        }}
      >
        <HeaderFilter visible texts={{ cancel: "Cancelar", emptyValue: "Sin resultados", ok: "Aceptar" }} />
        <Column
          dataField="EstadoAtencion"
          cellComponent={(row) => (
            <React.Fragment >
              {row.data.EstadoAtencion == null ?
                "N/D"
                :
                row.data.EstadoAtencion
              }
            </React.Fragment>
          )}
        />
        <Column dataField="TipoAtencionMedica" />
        <Column dataField="FechaAtencion" />
        <Column
          dataField="LugarAtencion"
          cellRender={(props) => (
            <div className="div-transporte-atenciones" title={props.data.LugarAtencion}>
              <span>{props.data.LugarAtencion}</span>
              {props.data.Transporte && <i className="material-icons transporte">directions_car</i>}
            </div>
          )}
        />
        <Column
          dataField="HoraAtencion"
          caption="Hora"
          allowFiltering={false}
        />
      </DataGrid>
    );
  }
}

export default AtencionesMedicas;
