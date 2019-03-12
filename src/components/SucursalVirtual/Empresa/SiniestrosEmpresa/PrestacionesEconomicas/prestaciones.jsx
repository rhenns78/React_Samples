import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { Button } from "devextreme-react";
import newDataSource from "devextreme/data/data_source";

import DataGrid, { Column, Paging, Pager, RemoteOperations, MasterDetail } from "devextreme-react/ui/data-grid";
import LoadingGif from "../../../../../images/animacion2[18].gif";
import { getLists } from "../../../../Global/actions";
import { setPrestacionesEmpresa, doGetDraft } from "./actions";
import { openCloseToast } from "../../../../Global/actions";
import { GetPrestacionesApi } from "../../../../../services/SiniestrosEmpresa";
import { formatDateForFilter } from "../../../../../helpers/dateFormat";
import { getFiltros, filterType } from "../../../../../helpers/filterHelper.ts";
import TableFilter from "../../../../Shared/tableFilter.tsx";
import validaciones from "../../../../../helpers/validaciones";
import UserInfoColumn from "../../../../Shared/UserInfoColumn";
import NoDataComponent from "../../../../Shared/noDataImage";
import SiniestroInfoColumn from "../../../../Shared/SiniestroInfoColumn";
import { doGetDocumentBySiniestro } from "../../../Documentos/actions";
import Documentos from "../../../Documentos/modalDocumentos";
import ModalDraft from "./modalDraft";

const TableDetails = (props) => (

  <div style={{ textAlign: "left" }}>
    <span style={{ fontSize: 18 }}>
      Periodos de pago
    </span>

    <DataGrid
      className="simpleHeader cursor-disabled"
      showBorders={false}
      showColumnLines={false}
      renderAsync
      showRowLines={false}
      dataSource={props.source}
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

const columnToFilter = [
  { column: "TipoPrestacion", name: "Tipo prestacion" },
  {
    column: "estadoDocumentacion",
    name: "Estado documentación",
    customValues: [{ text: "Completa", value: "Completa" }, { text: "Incompleta", value: "Incompleta" }],
  },
  { column: "EstadoPago", name: "Estado de pago" },
  { column: "Fecha", name: "Fecha prestacion", type: "date" },
  { column: "FechaPago", name: "Fecha de pago", type: "date" },
];

class TablePrestacionesEconomicas extends React.PureComponent {
  constructor(props) {
    super(props);

    this.tableRef = React.createRef();

    this.dataSource = new newDataSource({
      load: async (options) => {
        try {
          let data = [];
          let totalCount = 0;
          const page = (options.skip / options.take) + 1;

          const filtros = {
            RutEmpresa: props.companyId,
            Pagina: page,
            RegistrosPorPagina: 20,
          };

          if (validaciones.emptyText(this.props.sucursalId)) {
            filtros.idSucursal = this.props.sucursalId;
          }

          if (options.filter && options.filter.length) {
            let customFilters = options.filter;
            if (options.filter[1] === "and") {
              customFilters = [...options.filter[2]];
            }
            customFilters.forEach((item) => {
              if (item.type === filterType.date) {
                if (item.column === "Fecha") {
                  filtros[`${item.column}Desde`] = formatDateForFilter(item.value.value.from);
                  filtros[`${item.column}Hasta`] = formatDateForFilter(item.value.value.to);
                } else {
                  filtros[`${item.column}Inicio`] = formatDateForFilter(item.value.value.from);
                  filtros[`${item.column}Fin`] = formatDateForFilter(item.value.value.to);
                }
              } else {
                console.log(item);
                filtros[item.column] = item.value.value;
              }
            });
          }

          const request = await GetPrestacionesApi(filtros);
          if (request.status === 200) {
            const result = await request.json();
            let dataFilters = this.props.filtrosPrestaciones;
            if (this.props.listaPrestaciones && this.props.listaPrestaciones.length === 0) {
              dataFilters = getFiltros(columnToFilter, result.PrestacionesEconomicas);
            }
            props.dispatch(setPrestacionesEmpresa(result.PrestacionesEconomicas, dataFilters, result.TotalSiniestros));
            data = result.PrestacionesEconomicas || [];
            totalCount = result.TotalRegistros || 0;
          }

          return {
            totalCount,
            data,
          };
        } catch (e) {
          console.error(e);
          props.dispatch(openCloseToast({
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

    if (this.props.listaBancos.length === 0 || this.props.listaAfp.length === 0) {
      const lista = {
        listaAfp: this.props.listaBancos.length === 0,
        listaBancos: this.props.listaAfp.length === 0,


      };
      this.props.dispatch(getLists(lista));
    }
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.sucursalId !== this.props.sucursalId) {
      this.tableRef.refresh();
    }
  }

  handleDctos = (row) => {
    // window.open(link, "_blank");
    const IdSiniestro = row.data.IdSiniestro;
    // // const IdPrestacion = row.data.IdPrestacion;
    this.props.dispatch(doGetDocumentBySiniestro(IdSiniestro, null));
  }
  handleDocument = (row) => {
    const fechaSiniestro = row.data.FechaSiniestro === "undefined" ? row.data.FechaSiniestro : "Wed Dec 12 2018 16:59:01 GMT-0300";

    const data = {
      idFinancialBenefit: "00687544", // row.data.IdPrestacion,
      userRut: this.props.userData.RUT,
      companyRut: this.props.companyId,
      employeeRut: "11764068-K", // row.data.RutTrabajador,
      jsonData: this.props.jsonData,
      fechaSiniestro,
    };
    this.props.dispatch(doGetDraft(data));
  }

  handleToolbar = (e) => {
    const toolbarItems = e.toolbarOptions.items;
    const searchPanel = toolbarItems.find((item) => item.name === "searchPanel");
    searchPanel.location = "before";
  }

  handleRowClick = (e) => {
    if (!e.component.isRowExpanded(e.key)) {
      e.component.collapseAll(-1);
      e.component.expandRow(e.key);
    }
  }

  handleFilterChange = (text, filters) => {
    const currentFilters = [...filters];
    if (text) {
      currentFilters.push({ column: "rutTrabajador", value: { text, value: text }, type: filterType.search });
      currentFilters.push({ column: "NombreTrabajador", value: { text, value: text }, type: filterType.search });
    }
    this.tableRef.filter(currentFilters);
    this.tableRef.searchByText(text);
  }

  render() {
    return (
      <React.Fragment>
        <ModalDraft />
        <TableFilter
          placeholder="Buscar trabajador por nombre o rut"
          onChange={this.handleFilterChange}
          filters={this.props.filtrosPrestaciones}
          show={this.props.listaPrestaciones != null && this.props.listaPrestaciones.length}
        />
        <DataGrid
          dataSource={this.dataSource}
          showBorders={false}
          showColumnLines={false}
          showRowLines={false}
          noDataText=""
          // className="tabla-siniestros-general empresas"
          className="custom-table empresas"
          ref={(ref) => { if (ref !== null) this.tableRef = ref.instance; }}
          rowAlternationEnabled
          hoverStateEnabled
          selection={{
            mode: "single",
          }}
          onContentReady={(e) => {
            if (e.component.totalCount() === 0) {
              const config = {};
              config.addClass = "table-margin";
              const noDataSpan = e.component.element().querySelector(".dx-scrollable-wrapper");
              ReactDOM.render(<NoDataComponent config={config} message="Sin Prestaciones económicas" />, noDataSpan);
            }
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
            render={(props) =>
              <TableDetails source={props.data.PeriodoPagos} />
            }
          />

          <Column
            allowSearch
            caption="Trabajador"
            dataField={["NombreTrabajador", "RutTrabajador"]}
            cellComponent={(row) => (
              <UserInfoColumn
                nombre={row.data.NombreTrabajador}
                rut={row.data.RutTrabajador}
              />
            )}
          />

          <Column
            caption="Siniestro"
            cellComponent={(row) => (
              <SiniestroInfoColumn
                active={row.data.Reposo}
                title={row.data.TipoSiniestro}
                subtitle={row.data.IdSiniestro}
              />
            )}
          />

          <Column
            dataType="date"
            dataField="FechaSiniestro"
            calculateDisplayValue={(data) => data.FechaSiniestro || "S/D"}
          />

          <Column
            dataField="IdPrestacion"
            caption="Prestación"
            cellComponent={React.memo((props) => (

              <div className="group-Column">
                <div
                  className={props.data.TipoPrestacion === "Subsidio Directo" ? "table-label-light-blue" :
                    props.data.TipoPrestacion === "Indemnizacion" ? "table-label-green" :
                      props.data.TipoPrestacion === "Pension" ? "table-label-gray" : null
                  }
                >
                  {props.data.TipoPrestacion}
                </div>
                <div className="text spaceText" >{props.data.IdPrestacion}</div>
              </div>
            ))}
          />

          <Column
            dataField="EstadoDocumentacion"
            caption="Estado documentación"
            calculateDisplayValue={(data) => data.EstadoDocumentacion || "S/D"}
          />

          <Column
            cellComponent={(row) => (
              <React.Fragment >
                {row.data.EstadoPago === "PENDIENTE" ?
                  <Button
                    text="Enviar"
                    style={{ backgroundColor: "#ccccc" }}
                    className="slimButton"
                  />
                  :
                  <React.Fragment >
                    <Button
                      text="Ver"
                      type="success"
                      className="slimButton"
                      onClick={() => this.handleDctos(row)}
                    />
                  </React.Fragment>
                }

                <React.Fragment >
                  <Button
                    text="Documentos"
                    type="default"
                    className="slimButton"
                    onClick={() => this.handleDocument(row)}
                  />
                </React.Fragment>
              </React.Fragment>
            )}
          />

          <RemoteOperations
            paging
            filtering
            summary={false}
            groupPaging={false}
            grouping={false}
            sorting={false}
          />

          <Paging
            defaultPageSize={20}
          />

          <Pager
            visible
            showInfo
            infoText={(page, total, items) => `Página ${page} de ${total} (${items} resultados)`}
          />
        </DataGrid>

        <Documentos />
      </React.Fragment>

    );
  }
}

const mapStateToProps = (state) => ({
  sucursalId: state.global.sucursalId,
  companyId: state.global.companyId,
  listaPrestaciones: state.prestacionesEmpresa.listaPrestaciones,
  filtrosPrestaciones: state.prestacionesEmpresa.filtrosPrestaciones,
  totalPrestaciones: state.prestacionesEmpresa.totalPrestaciones,
  listaBancos: state.global.listaBancos,
  listaAfp: state.global.listaAfp,
  jsonData: state.prestacionesEmpresa.jsonData,
  userData: state.global.userData,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => { dispatch(action); },
});

export default connect(mapStateToProps, mapDispatchToProps)(TablePrestacionesEconomicas);
