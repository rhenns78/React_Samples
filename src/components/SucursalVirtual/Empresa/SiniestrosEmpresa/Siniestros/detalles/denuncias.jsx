import React from "react";
import ReactDOM from "react-dom";
import { DataGrid, Button } from "devextreme-react";
import { Column, HeaderFilter } from "devextreme-react/ui/data-grid";

import HeaderTooltip from "../../../../../Shared/headerTooltip";
import NoDataComponent from "../../../../../Shared/noDataImage";
class Denuncias extends React.PureComponent {
  render() {
    return (
      <DataGrid
        showBorders={false}
        showColumnLines={false}
        showRowLines={false}
        rowAlternationEnabled
        // className="tabla-siniestros"
        className="custom-table height-min cursor-disabled"
        noDataText="Sin denuncias"
        dataSource={this.props.data}
        onContentReady={(e) => {
          if (e.component.totalCount() === 0) {
            const config = {};
            config.addClass = "table-margin-detalle";
            const noDataSpan = e.component.element().querySelector(".dx-scrollable-wrapper");
            ReactDOM.render(<NoDataComponent config={config} message="Sin denuncias" />, noDataSpan);
          }
        }}
      >
        <HeaderFilter visible texts={{ cancel: "Cancelar", emptyValue: "Sin resultados", ok: "Aceptar" }} />
        <Column
          dataField="Folio"
          caption="Folio"
          allowFiltering={false}
          calculateDisplayValue={(data) => data.Folio || "N/D"}
        />
        <Column
          dataField="IdSiniestro"
          caption="ID Siniestro"
          allowFiltering={false}
          calculateDisplayValue={(data) => data.IdSiniestro || "N/D"}
        />
        <Column
          dataField="Tipo"
          calculateDisplayValue={(data) => data.Tipo || "N/D"}
          headerCellTemplate={(element, row) => ReactDOM.render(<HeaderTooltip
            id="tooltipEvaluaciones"
            headerText="Tipo denuncia"
            widthprops={410}
            toolTipText="DIAT: Denuncia individual de accidente del trabajador.
                        DIEP: Denuncia indivitual de enfermedad profesional"
          />, element)}
        />
        <Column
          dataField="FechaDenuncia"
          caption="Fecha de la denuncia"
          calculateDisplayValue={(data) => data.FechaDenuncia || "N/D"}
        />
        <Column dataField="Estado" caption="Estado" calculateDisplayValue={(data) => data.Estado || "N/D"} />
        <Column
          caption=""
          allowFiltering={false}
          cellComponent={(props) => (
            <React.Fragment>
              {props.data.Estado === "Pendiente" && <Button
                text="Enviar"
                type="default"
                className="slimButton"
              />}
              {props.data.Estado === "Enviada" && <Button
                text="Reenviar"
                type="success"
                className="slimButton"
              />}
            </React.Fragment>
          )}
        />
        <Column
          caption=""
          allowFiltering={false}
          cellComponent={(props) => (
            <React.Fragment>
              {props.data.Estado !== "Pendiente" && <Button
                text="Ver"
                type="success"
                className="slimButton"
              />}
            </React.Fragment>
          )}
        />
      </DataGrid>
    );
  }
}

export default Denuncias;
