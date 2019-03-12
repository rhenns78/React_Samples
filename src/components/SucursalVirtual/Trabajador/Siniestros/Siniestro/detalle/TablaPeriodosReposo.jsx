import React from "react";
import ReactDOM from "react-dom";
import DataGrid, { Column, HeaderFilter, Paging, Pager } from "devextreme-react/ui/data-grid";
import NoDataComponent from "../../../../../Shared/noDataImage";

class TablaPeriodosReposo extends React.PureComponent {
  render() {
    return (
      <DataGrid
        // className="tabla-siniestros"
        className="custom-table height-min cursor-disabled"
        showBorders={false}
        showColumnLines={false}
        renderAsync
        showRowLines={false}
        noDataText=""
        rowAlternationEnabled
        dataSource={this.props.data}
        onContentReady={(e) => {
          if (e.component.totalCount() === 0) {
            const config = {};
            config.addClass = "table-margin-detalle";
            const noDataSpan = e.component.element().querySelector(".dx-scrollable-wrapper");
            ReactDOM.render(<NoDataComponent config={config} message="Sin Períodos de reposo" />, noDataSpan);
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
        <Column dataField="IdReposo" caption="Reposo" allowFiltering={false} />
        <Column dataField="FechaInicio" caption="Fecha inicio" dataType="date" format="dd/MM/yyyy" />
        <Column dataField="FechaFin" caption="Fecha fin" dataType="date" format="dd/MM/yyyy" />
        <Column dataField="DiasReposo" caption="Días de reposo" allowFiltering={false} />
        <Column dataField="TipoAlta" />
        <Paging pageSize={10} enabled />
        <Pager showNavigationButtons showInfo infoText={(page, total) => `Pagina ${page} de ${total}`} />
      </DataGrid>
    );
  }
}

export default TablaPeriodosReposo;
