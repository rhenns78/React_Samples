import React from "react";
import { DataGrid, Button } from "devextreme-react";
import { Column, HeaderFilter } from "devextreme-react/ui/data-grid";
import ReactDOM from "react-dom";
import NoDataComponent from "../../../../../Shared/noDataImage";
class Prestaciones extends React.PureComponent {
  constructor(props) {
    super(props);

    this.tableRef = React.createRef();
  }
  render() {
    return (
      <DataGrid
        showBorders={false}
        showColumnLines={false}
        showRowLines={false}
        rowAlternationEnabled
        // className="tabla-siniestros"
        className="custom-table height-min cursor-disabled"
        ref={(ref) => ref !== null ? this.tableRef = ref.instance : null}
        noDataText=""
        dataSource={this.props.data}
        onContentReady={(e) => {
          if (this.props.showNoData) {
            const config = {};
            config.addClass = "table-margin-detalle";
            const noDataSpan = e.component.element().querySelector(".dx-scrollable-wrapper");
            ReactDOM.render(<NoDataComponent config={config} message="Sin prestaciones económicas" />, noDataSpan);
          }
        }}
      >
        <HeaderFilter visible texts={{ cancel: "Cancelar", emptyValue: "Sin resultados", ok: "Aceptar" }} />
        <Column dataField="IdPrestacion" caption="ID prestación" allowFiltering={false} />
        <Column dataField="TipoPrestacion" caption="Tipo" />
        <Column
          dataField="EstadoDocumentacion"
          caption="Estado documentación"
          calculateDisplayValue={(data) => data.EstadoDocumentacion || "N/D"}
        />
        <Column dataField="EstadoPago" caption="Estado de pago" />
        <Column
          caption=""
          cellComponent={(props) => (
            <React.Fragment>
              {props.data.EstadoPago === "PENDIENTE" && <Button
                text="Enviar"
                type="default"
                className="slimButton"
              />}
              {props.data.EstadoPago === "Pagado" && <Button
                text="Ver"
                type="success"
                className="slimButton"
              />}
              {props.data.EstadoPago === "Pagado" && <Button
                // onClick={() => this.tableRef.isRowExpanded(row.dxkey) ? this.tableRef.collapseRow(row.dxkey) : this.tableRef.expandRow(row.dxkey)}
                stylingMode="text"
                className="subTablaIcon"
                type="normal"
                style={{ right: 0 }}
                icon={this.tableRef.isRowExpanded(props.dxkey) ? "chevronup" : "chevrondown"}
              />}
            </React.Fragment>
          )}
        />
      </DataGrid>
    );
  }
}

export default Prestaciones;
