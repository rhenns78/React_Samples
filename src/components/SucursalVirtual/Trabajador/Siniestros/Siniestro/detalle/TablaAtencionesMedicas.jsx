import React from "react";
import ReactDOM from "react-dom";
import DataGrid, { Column, HeaderFilter, Paging, Pager } from "devextreme-react/ui/data-grid";
import NoDataComponent from "../../../../../Shared/noDataImage";

class TablaAtencionesMedicas extends React.PureComponent {
  render() {
    return (
      <DataGrid
        // className="tabla-siniestros"
        className="custom-table height-min cursor-disabled"
        // ref={(ref) => { if (ref !== null) this.tableRef = ref.instance; }}
        showBorders={false}
        showColumnLines={false}
        showRowLines={false}
        renderAsync
        noDataText=""
        rowAlternationEnabled
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
        <HeaderFilter
          visible
          texts={{
            cancel: "Cancelar",
            emptyValue: "Sin valor",
            ok: "Aceptar",
          }}
        />
        <Column caption="Estado Atención" dataField="EstadoAtencion" />
        <Column
          caption="Tipo Atención Médica"
          dataField="TipoAtencionMedica"
          cellComponent={(row) =>
            (<div>
              {row.data.TipoAtencionMedica}
              {row.data.TipoAtencionMedica === "Control" &&
                <span className="table-label-light-blue">
                  {row.data.Transporte}
                </span>
              }
             </div>)
          }
        />
        <Column dataField="FechaAtencion" caption="Fecha Atención" dataType="date" format="dd/MM/yyyy" />
        <Column dataField="LugarAtencion" caption="Lugar Atención" allowFiltering={false} />
        <Column dataField="HoraAtencion" caption="Hora Atención" allowFiltering={false} />
        <Paging pageSize={10} enabled />
        <Pager showNavigationButtons showInfo infoText={(page, total) => `Página ${page} de ${total}`} />
      </DataGrid>
    );
  }
}

export default TablaAtencionesMedicas;
