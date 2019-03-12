import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { Button } from "devextreme-react";
import newDataSource from "devextreme/data/data_source";
import DataGrid, { Column, Paging, Pager, RemoteOperations, MasterDetail } from "devextreme-react/ui/data-grid";
import LoadingGif from "../../../../../images/animacion2[18].gif";

import { getPrestacionesApi } from "../../../../../services/PrestacionesEconomicasApi";
import { doGetDocumentBySiniestro } from "../../../Documentos/actions";
import HeaderTooltip from "../../../../Shared/headerTooltip";
import { openCloseToast } from "../../../../Global/actions";
import { setPrestaciones } from "./actions";
import TableFilter from "../../../../Shared/tableFilter.tsx";
import { getFiltros, filterData, filterType } from "../../../../../helpers/filterHelper.ts";
import NoDataComponent from "../../../../Shared/noDataImage";
import Documentos from "../../../Documentos/modalDocumentos";

const EmptyIcon = (props) =>
  (<div
    style={{
      height: props.size,
      width: props.size,
      borderRadius: props.border,
      border: "solid 1px rgba(255, 255, 255, .5)",
      backgroundColor: props.full ? "#9DC551" : "#888B8D",
    }}
  />);
const TableDetails = (props) => (
  <div style={{ textAlign: "left" }}>
    <span style={{ fontSize: 18 }}>
      Periodos de pago prestación N° {props.source.data.IdPrestacion}
    </span>
    <DataGrid
      className="simpleHeader cursor-disabled"
      showBorders={false}
      showColumnLines={false}
      renderAsync
      showRowLines={false}
      dataSource={props.source.data.PeriodoPagos}
      onContentReady={(e) => {
        if (e.component.totalCount() === 0) {
          const config = {};
          config.addClass = "table-margin";
          const noDataSpan = e.component.element().querySelector(".dx-scrollable-wrapper");
          ReactDOM.render(<NoDataComponent config={config} message="Sin Prestaciones económicas" />, noDataSpan);
        }
      }}
    >
      <Column
        dataField="FechaDesde"
        caption="Fecha desde"
        type="date"
        dataType="date"
        format="dd/MM/yyyy"
      />
      <Column
        dataField="FechaHasta"
        caption="Fecha hasta"
        dataType="date"
        format="dd/MM/yyyy"
      />
      <Column dataField="DiasPagados" caption="Dias pagados" />
      <Column
        dataField="FechaPago"
        caption="Fecha de pago"
        dataType="date"
        format="dd/MM/yyyy"
      />
      <Column
        dataField="Monto"
        caption="Monto"
        cellComponent={(row) => (
          <div>
            {`$ ${new Intl.NumberFormat(props.locale, { maximumSignificantDigits: 3 }).format(row.data.Monto)}`}
          </div>
        )}
      />
      <Column
        dataField="FormaPago"
        caption="Forma de pago"
        format="currency"
        alignment="right"
        dataType="number"
      />
      <Paging
        defaultPageSize={10}
      />
    </DataGrid>
  </div>
);
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
      >{btn.text}
      </div>
    )}
  />
);

const columnToFilter = [
  { column: "TipoPrestacion", name: "Tipo" },
  { column: "EstadoDocumentacion", name: "Estado documentación" },
  { column: "EstadoPago", name: "Estado de pago" },
  { column: "MontoUltimoPago", name: "Último monto pagado", type: "number" },
  { column: "FechaUltimoPago", name: "Fecha último pago", type: "date" },
];

class TablePrestacionesEconomicas extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      locale: navigator.language !== "es-CL" ? "es-CL" : navigator.language,
      filtersLoaded: false,
    };
    // this.contador = 0;
    this.tableRef = React.createRef();
    this.dataSource = new newDataSource({
      load: async (options) => {
        try {
          let data = this.props.listaPrestaciones || [];
          let totalCount = (this.props.listaPrestaciones != null && this.props.listaPrestaciones.length) || 0;
          if (!this.state.filtersLoaded) {
            const request = await getPrestacionesApi(this.props.userData.RUT, options.skip, options.skip + options.take, options.filter);
            if (request.status === 200) {
              const result = await request.json();
              const filters = getFiltros(columnToFilter, result.PrestacionesEconomicas);
              this.props.dispatch(setPrestaciones(result.PrestacionesEconomicas, filters));
              this.setState({ filtersLoaded: true });

              data = result.PrestacionesEconomicas || [];
              totalCount = data.length;
            }
          }

          if (options.filter && options.filter.length > 0) {
            const newData = filterData(this.props.listaPrestaciones, options.filter);
            return {
              data: newData,
              totalCount: newData.length,
            };
          }

          return {
            totalCount,
            data,
          };
        } catch (e) {
          this.props.dispatch(openCloseToast({
            isToastOpen: true,
            msgToast: "Error al obtener la lista de prestaciones",
            typeStyle: "error",
          }));

          return {
            totalCount: 0,
            data: [],
          };
        }
      },
    });
  }

  handleDctos = (row) => {
    // window.open(link, "_blank");
    const IdSiniestro = row.data.IdSiniestro;
    // const IdPrestacion = row.data.IdPrestacion;
    this.props.dispatch(doGetDocumentBySiniestro(IdSiniestro, null));
  }

  handleFilterChange = (text, filters) => {
    const currentFilters = [...filters];
    if (text) {
      currentFilters.push({ column: "IdSiniestro", value: { text, value: text }, type: filterType.search });
      currentFilters.push({ column: "IdPrestacion", value: { text, value: text }, type: filterType.search });
    }
    this.tableRef.filter(currentFilters);
    this.tableRef.searchByText(text);
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
      <React.Fragment>
        <TableFilter
          placeholder="Buscar prestaciones por ID siniestro, ID prestación"
          onChange={this.handleFilterChange}
          filters={this.props.filtros}
          show={this.props.listaPrestaciones != null}
        />

        <DataGrid
          dataSource={this.dataSource}
          showBorders={false}
          showColumnLines={false}
          showRowLines={false}
          ref={(ref) => { if (ref !== null) this.tableRef = ref.instance; }}
          className="custom-table"
          noDataText="Sin Prestaciones"
          rowAlternationEnabled
          hoverStateEnabled
          selection={{
            mode: "single",
          }}
          onRowClick={this.handleRowClick}
          loadPanel={{
            enabled: true,
            showPane: true,
            showIndicator: true,
            indicatorSrc: LoadingGif,
            text: "Cargando...",
          }}
        >
          <MasterDetail
            enabled
            template={(container, options) => ReactDOM.render(<TableDetails source={options} locale={this.state.locale} />, container)}
          />

          <Column
            dataField={["IdSiniestro"]}
            caption="Siniestro"
            allowFiltering
            allowSearch={false}
            cellComponent={(row) =>
              (

                <div className="group-Column">
                  <div className="dotIcon"><EmptyIcon size={15} border={12} full />
                    <div className="text space-text"> Trabajo </div>
                  </div>
                  <div className="text space-text"> {row.data.IdSiniestro} </div>

                </div>
              )

            }

          />

          <Column

            dataField={["IdPrestacion, TipoPrestacion"]}
            caption="Prestación"
            allowFiltering
            headerFilter={{
              dataSource: [
                { text: "Subsidio", value: "Subsidio" },
                { text: "Indemnización", value: "Indemnización" },
              ],
            }}
            cellComponent={(row) =>
              (
                <div className="group-Column">
                  <div className={row.data.TipoPrestacion === "Subsidio Directo" ? "table-label-light-blue" : "table-label-green"}>
                    {row.data.TipoPrestacion}
                  </div>
                  <div className="text spaceText" >{row.data.IdPrestacion}</div>
                </div>
              )

            }
          />

          <Column
            dataField="EstadoDocumentacion"
            caption="Estado documentación"
            calculateDisplayValue={(data) => data.EstadoDocumentacion || "N/D"}
            allowFiltering
            headerFilter={{
              dataSource: [
                { text: "Incompleto", value: "Incompleto" },
                { text: "Completo", value: "Completo" },
              ],
            }}

          />
          <Column
            dataField="EstadoPago"
            caption="Estado de pago"
            allowFiltering
            headerFilter={{
              dataSource: [
                { text: "Pendiente", value: "Pendiente" },
                { text: "Pagado", value: "Pagado" },
              ],
            }}
          />
          <Column
            dataField="MontoUltimoPago"
            caption="Último monto pagado"
            allowFiltering={false}
            alignment="right"
            dataType="number"
            cellComponent={(row) => (
              <div>
                {`$ ${new Intl.NumberFormat(this.state.locale, { maximumSignificantDigits: 3 }).format(row.data.MontoUltimoPago)}`}
              </div>
            )}
            headerCellTemplate={(element, row) => ReactDOM.render(<HeaderTooltip
              id="tooltipMontoPrestaciones"
              textFirst
              widthprops={250}
              headerText="Último monto pagado"
              toolTipText="Valor del último monto pagado de la prestación económica"
            />, element)}
          />

          <Column
            dataField="FechaUltimoPago"
            caption="Fecha último pago"
            calculateDisplayValue={(data) => data.FechaUltimoPago || "N/D"}
            dataType="date"
            format="dd/MM/yyyy"
          />
          <Column
            caption="Liquidación de pago"
            cellComponent={(row) => (
              <div>
                <ActionButton
                  text="Ver"
                  type="success"
                  onClick={() => this.handleDctos(row)}
                />
              </div>
            )}
          />

          <RemoteOperations
            filtering
            paging={false}
            summary={false}
            groupPaging={false}
            grouping={false}
            sorting={false}
          />

          <Paging
            defaultPageSize={12}
          />

          <Pager
            showNavigationButtons
            showInfo
            infoText={(page, total) => `Página ${page} de ${total}`}
          />
        </DataGrid>
        <Documentos />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  userData: state.global.userData,
  listaPrestaciones: state.prestaciones.listaPrestaciones,
  filtros: state.prestaciones.filtros,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => { dispatch(action); },
});

export default connect(mapStateToProps, mapDispatchToProps)(TablePrestacionesEconomicas);
