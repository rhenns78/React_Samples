import React from "react";
import { DataGrid } from "devextreme-react";
import { Column, HeaderFilter } from "devextreme-react/ui/data-grid";
import ReactDOM from "react-dom";
import NoDataComponent from "../../../../../Shared/noDataImage";
class PeriodosReposo extends React.PureComponent {
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
            ReactDOM.render(<NoDataComponent config={config} message="Sin períodos de reposo" />, noDataSpan);
          }
        }}
      >
        <HeaderFilter visible texts={{ cancel: "Cancelar", emptyValue: "Sin resultados", ok: "Aceptar" }} />
        <Column dataField="IdReposo" caption="Reposo" allowFiltering={false} />
        <Column dataField="FechaInicio" caption="Fecha inicio" />
        <Column dataField="FechaFin" caption="Fecha fin" calculateDisplayValue={(data) => data.FechaFin || "N/D"} />
        <Column dataField="DiasReposo" caption="Dias de reposo" allowFiltering={false} />
        <Column dataField="TipoAlta" caption="Tipo de alta" />
      </DataGrid>
    );
  }
}

export default PeriodosReposo;
