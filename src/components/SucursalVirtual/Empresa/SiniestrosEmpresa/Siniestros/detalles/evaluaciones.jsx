import React from "react";
import { DataGrid } from "devextreme-react";
import { Column, HeaderFilter } from "devextreme-react/ui/data-grid";
import ReactDOM from "react-dom";
import NoDataComponent from "../../../../../Shared/noDataImage";
class EvaluacionesIncapacidad extends React.PureComponent {
  render() {
    return (
      <DataGrid
        showBorders={false}
        showColumnLines={false}
        showRowLines={false}
        rowAlternationEnabled
        // className="tabla-siniestros"
        className="custom-table cursor-disabled"
        noDataText=""
        dataSource={this.props.data}
        onContentReady={(e) => {
          if (this.props.showNoData) {
            const config = {};
            config.addClass = "table-margin-detalle";
            const noDataSpan = e.component.element().querySelector(".dx-scrollable-wrapper");
            ReactDOM.render(<NoDataComponent config={config} message="Sin evaluaciones" />, noDataSpan);
          }
        }}
      >
        <HeaderFilter visible texts={{ cancel: "Cancelar", emptyValue: "Sin resultados", ok: "Aceptar" }} />
        <Column
          dataField="NumeroResolucion"
          caption="N° de resolución"
          allowFiltering={false}
          cellComponent={(row) => (
            <React.Fragment >
              {row.data.NumeroResolucion == null ?
                "N/D"
                :
                row.data.NumeroResolucion
              }
            </React.Fragment>
          )}
        />
        <Column dataField="FechaIngreso" caption="Fecha ingreso" />
        <Column dataField="DiagnosticosEvaluados" caption="Diagnósticos evaluados" allowFiltering={false} />
        <Column
          dataField="TipoResolucion"
          caption="Tipo resolución"
          cellComponent={(row) => (
            <React.Fragment >
              {row.data.TipoResolucion == null ?
                "N/D"
                :
                row.data.TipoResolucion
              }
            </React.Fragment>
          )}
        />
        <Column dataField="FechaResolucion" caption="Fecha resolución" />
        <Column
          dataField="GradoTotalIncapacidad"
          caption="Porcentaje de incapacidad"
          allowFiltering={false}
          calculateCellValue={(data) => `${data.GradoTotalIncapacidad}%`}
        />
      </DataGrid>
    );
  }
}

export default EvaluacionesIncapacidad;
