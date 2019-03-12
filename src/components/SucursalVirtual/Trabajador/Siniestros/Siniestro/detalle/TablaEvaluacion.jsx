import React from "react";
import ReactDOM from "react-dom";
import DataGrid, { Column, HeaderFilter, Paging, Pager } from "devextreme-react/ui/data-grid";
import NoDataComponent from "../../../../../Shared/noDataImage";
class TablaEvalacionInca extends React.PureComponent {
  render() {
    return (
      <DataGrid
        className="custom-table height-min cursor-disabled"
        showBorders={false}
        showColumnLines={false}
        showRowLines={false}
        noDataText=""
        rowAlternationEnabled
        dataSource={this.props.data}
        onContentReady={(e) => {
          if (e.component.totalCount() === 0) {
            const config = {};
            config.addClass = "table-margin-detalle";
            const noDataSpan = e.component.element().querySelector(".dx-scrollable-wrapper");
            ReactDOM.render(<NoDataComponent config={config} message="Sin Evaluaciones" />, noDataSpan);
          }
        }}
      >
        <HeaderFilter
          visible
          texts={{
            cancel: "Cancelar",
            emptyValue: "Sin valor",
            ok: "Aceptar",
          }}
        />
        <Column
          dataField="IdResolucion"
          caption="N° de resolución"
          allowFiltering={false}
          calculateDisplayValue={(rowData) => `#${rowData.IdResolucion}`}
        />
        <Column dataField="FechaIngreso" caption="Fecha ingreso" dataType="date" format="dd/MM/yyyy" />
        <Column dataField="DiagnosticosEvaluados" caption="Diagnósticos evaluados" allowFiltering={false} />
        <Column dataField="TipoResolucion" caption="Tipo resolución" />
        <Column dataField="FechaResolucion" caption="Fecha resolución" dataType="date" format="dd/MM/yyyy" />
        <Column
          dataField="GradoTotalIncapacidad"
          caption="Porcentaje de incapacidad"
          allowFiltering={false}
          cellComponent={(row) => `${row.data.GradoTotalIncapacidad}%`}
        />
        <Paging pageSize={10} enabled />
        <Pager showNavigationButtons showInfo infoText={(page, total) => `Pagina ${page} de ${total}`} />
      </DataGrid>
    );
  }
}

export default TablaEvalacionInca;
