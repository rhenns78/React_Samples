import React from "react";
import ReactDOM from "react-dom";

import DataGrid, { Column, HeaderFilter, Paging, Pager, MasterDetail } from "devextreme-react/ui/data-grid";
import { Button } from "devextreme-react";
import HeaderTooltip from "../../../../../Shared/headerTooltip";
import NoDataComponent from "../../../../../Shared/noDataImage";


const ActionButton = (props) => (
  <Button
    type={props.type}
    disabled={props.disabled}
    text={props.text}
    onClick={props.onClick}
    style={props.style}
    render={(btn) => (
      <div
        style={{
          padding: "7px 0px 0px 0px",
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {btn.text}
      </div>
    )}
  />
);

const TableDetails = (props) => (
  <div style={{ textAlign: "left" }}>
    <span style={{ fontSize: 18 }}>
      Periodos de pago
    </span>
    <DataGrid
      className="simpleHeader height-min cursor-disabled"
      showBorders={false}
      showColumnLines={false}
      renderAsync
      showRowLines={false}
      noDataText=""
      dataSource={props.source.data.PeriodoPagos}
      onContentReady={(e) => {
        if (e.component.totalCount() === 0) {
          const config = {};
          config.addClass = "table-margin-detalle";
          const noDataSpan = e.component.element().querySelector(".dx-scrollable-wrapper");
          ReactDOM.render(<NoDataComponent config={config} message="Sin periodos de pago" />, noDataSpan);
        }
      }}
    >
      <Column dataField="FechaDesde" caption="Fecha desde" dataType="date" format="dd/MM/yyyy" />
      <Column dataField="FechaHasta" caption="Fecha hasta" dataType="date" format="dd/MM/yyyy" />
      <Column dataField="DiasPagados" caption="Dias pagados" />
      <Column dataField="FechaPago" caption="Fecha de pago" dataType="date" format="dd/MM/yyyy" />
      <Column
        dataField="Monto"
        caption="Monto"
        cellComponent={(row) => (
          <div>
            {`$ ${new Intl.NumberFormat("es-CL", { maximumSignificantDigits: 3 }).format(row.data.Monto)}`}
          </div>
        )}
      />
      <Column dataField="FormaPago" caption="Forma de pago" />
      <Paging pageSize={10} enabled />
      <Pager showNavigationButtons showInfo infoText={(page, total) => `Pagina ${page} de ${total}`} />
    </DataGrid>
  </div>
);

class TablaPrestaciones extends React.PureComponent {
  handleOpenFile = (row) => {
    window.open(row.data.ArchivoLiquidaciones, "_blank");
  }

  handleRowClick = (e) => {
    if (e.component.isRowExpanded(e.key)) {
      e.component.collapseRow(e.key);
    } else {
      e.component.collapseAll(-1);
      e.component.expandRow(e.key);
    }
  }

  render() {
    return (
      <DataGrid
        dataSource={this.props.data}
        // className="tabla-siniestros"
        className="custom-table"
        showBorders={false}
        showColumnLines={false}
        showRowLines={false}
        noDataText="Sin Prestaciones"
        rowAlternationEnabled
        hoverStateEnabled
        selection={{
          mode: "single",
        }}
        onRowClick={this.handleRowClick}
      >
        <MasterDetail
          enabled
          template={(container, options) => ReactDOM.render(<TableDetails source={options} />, container)}
        />
        <HeaderFilter
          visible
          texts={{
            cancel: "Cancelar",
            emptyValue: "Sin valor",
            ok: "Aceptar",
          }}
        />
        <Column
          dataField="TipoPrestacion"
          caption="Tipo"
          cellComponent={(row) => (
            <span className={row.data.TipoPrestacion === "Subsidio Directo" ? "table-label-light-blue" : "table-label-green"}>
              {row.data.TipoPrestacion}
            </span>
          )}
        />
        <Column dataField="IdPrestacion" caption="ID" allowFiltering={false} />
        <Column dataField="EstadoDocumentacion" caption="Estado documentación" />
        <Column dataField="EstadoPago" caption="Estado de pago" />
        <Column
          caption="Último Monto Pagado"
          dataField="UltimoMontoPagado"
          cellComponent={(row) => (
            <div> {
              `$ ${new Intl.NumberFormat("es-CL", { maximumSignificantDigits: 3 }).format(row.data.MontoUltimoPago)}`
            }
            </div>
          )}
          headerCellTemplate={(element, row) => ReactDOM.render(<HeaderTooltip
            id="tooltipMonto"
            textFirst
            widthprops={200}
            headerText="Ultimo monto pagado"
            toolTipText="Valor del último monto pagado de la prestación económica"
          />, element)}
        />
        <Column dataField="FechaPago" caption="Fecha último pago" dataType="date" format="dd/MM/yyyy" />
        <Column
          caption="Liquidaciones de pago"
          allowFiltering={false}
          cellComponent={(row) => (
            <div>
              <ActionButton
                text="Ver"
                onClick={() => this.handleOpenFile(row)}
                type="success"
              />
            </div>
          )}
        />
        <Paging pageSize={10} enabled />
        <Pager showNavigationButtons showInfo infoText={(page, total) => `Pagina ${page} de ${total}`} />
      </DataGrid>
    );
  }
}

export default TablaPrestaciones;
