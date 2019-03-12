import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { Button } from "devextreme-react";
import newDataSource from "devextreme/data/data_source";

import DataGrid, { Column, Paging, Pager, RemoteOperations } from "devextreme-react/ui/data-grid";
import LoadingGif from "../../../../../images/animacion2[18].gif";
import HeaderTooltip from "../../../../Shared/headerTooltip";

import { setDenunciasEmpresa, setShowHideForm, doGetDraft, updateDataGridDenuncias, setStep } from "./actions";
import { openCloseToast } from "../../../../Global/actions";
import { formatDateForFilter } from "../../../../../helpers/dateFormat";
import { filterType, getFiltros } from "../../../../../helpers/filterHelper.ts";
import TableFilter from "../../../../Shared/tableFilter.tsx";
import { GetDenunciasApi } from "../../../../../services/denunciasApi";
import ModalDraft from "./modalDraft";
import UserInfoColumn from "../../../../Shared/UserInfoColumn";
import NoDataComponent from "../../../../Shared/noDataImage";
import SiniestroInfoColumn from "../../../../Shared/SiniestroInfoColumn";
import validaciones from "../../../../../helpers/validaciones";
import { doGetDocumentBySiniestro } from "../../../Documentos/actions";
import ModalDocumentos from "../../../Documentos/modalDocumentos";
const columnToFilter = [
  { column: "TipoDenuncia", name: "Tipo denuncia" },
  { column: "EstadoDenuncia", name: "Estado" },
  { column: "FechaDenuncia", name: "Fecha de la denuncia", type: "date" },
];

class TableDenuncias extends React.Component {
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
            RutUsuario: props.userData.RUT,
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
                filtros[`${item.column}Inicio`] = formatDateForFilter(item.value.value.from);
                filtros[`${item.column}Fin`] = formatDateForFilter(item.value.value.to);
              } else {
                filtros[item.column] = item.value.value;
              }
            });
          }

          const request = await GetDenunciasApi(filtros);
          if (request.status === 200) {
            const result = await request.json();
            let total = 0;
            let dataFilters = this.props.filtrosDenuncias;
            if (this.props.listaDenuncias && this.props.listaDenuncias.length === 0) {
              dataFilters = getFiltros(columnToFilter, result.ListaDenuncias);
            }
            total = result.ListaDenuncias ? result.ListaDenuncias.length : 0;
            props.dispatch(setDenunciasEmpresa(result.ListaDenuncias, dataFilters, total));
            data = result.ListaDenuncias || [];
            totalCount = total;
          }

          return {
            totalCount,
            data,
          };
        } catch (e) {
          console.error(e);
          props.dispatch(openCloseToast({
            isToastOpen: true,
            msgToast: "Error al obtener la lista de siniestros",
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

  componentDidUpdate = (prevProps) => {
    if (prevProps.sucursalId !== this.props.sucursalId) {
      this.updateData();
    }

    if (!prevProps.shouldUpdateDataGrid && this.props.shouldUpdateDataGrid) {
      this.updateData();
      this.props.dispatch(updateDataGridDenuncias(false));
    }
  }

  getButton = (row) => {
    if (row.data.EstadoDenuncia === "PENDIENTE") {
      if (row.data.TieneBorrador) {
        return <Button style={{ color: "white", backgroundColor: "#C5BE52" }} text="Borrador" type="normal" className="slimButton" onClick={() => this.getDraftComplain(row)} />;
      }
      return <Button text="Enviar" type="default" className="slimButton" />;
    }
    return <Button text="Reenviar" type="default" className="slimButton" />;
  }

  getDraftComplain = (row) => {
    this.props.dispatch(doGetDraft(this.props.companyId, row.data.RutTrabajador));
  }

  updateData = () => {
    this.tableRef.refresh();
  }

  handleNewDenuncia = () => {
    this.props.dispatch(setStep(1));
    this.props.dispatch(setShowHideForm(true));
  }

  handleFilterChange = (text, filters) => {
    const currentFilters = [...filters];
    if (text) {
      currentFilters.push({ column: "RutTrabajador", value: { text, value: text }, type: filterType.search });
      currentFilters.push({ column: "NombreTrabajador", value: { text, value: text }, type: filterType.search });
      currentFilters.push({ column: "Folio", value: { text, value: text }, type: filterType.search });
    }
    this.tableRef.filter(currentFilters);
    this.tableRef.searchByText(text);
  }

  handleDctos = (link) => {
    window.open(link, "_blank");
  }

  handleViewDocuments = (row) => {
    const IdSiniestro = row.data.IdSiniestro;
    const dataSiniestro = row.data;
    this.props.dispatch(doGetDocumentBySiniestro(IdSiniestro, dataSiniestro));
  }

  render() {
    return (
      <React.Fragment>
        <ModalDocumentos />
        <div className="table-wrapper">
          <ModalDraft />
          <TableFilter
            placeholder="Buscar siniestro por trabajador, ID o folio"
            onChange={this.handleFilterChange}
            filters={this.props.filtrosDenuncias}
            show={this.props.listaDenuncias != null}
            showButton
            buttonText="Nueva denuncia"
            buttonAction={this.handleNewDenuncia}
          />
          <DataGrid
            dataSource={this.dataSource}
            showBorders={false}
            ref={(ref) => { if (ref !== null) this.tableRef = ref.instance; }}
            showColumnLines={false}
            showRowLines={false}
            noDataText=""
            // className="tabla-siniestros-general denuncias"
            className="custom-table denuncias"
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
                ReactDOM.render(<NoDataComponent config={config} message="Sin Denuncias" />, noDataSpan);
              }
            }}
            loadPanel={{
              enabled: true,
              showPane: true,
              showIndicator: true,
              indicatorSrc: LoadingGif,
              text: "Cargando...",
            }}
          >

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
              dataField="FechaDenuncia"
              caption="Fecha Denuncia"
              dataType="date"
              format="dd/MM/yyyy"
            />

            <Column
              dataField="TipoDenuncia"
              caption="Denuncia"
              cellComponent={React.memo((props) => (
                <div className="group-Column">
                  <div className={props.data.TipoDenuncia === "DIAT" || "DIAT OA" || "DIAT OA" ? "table-label-light-blue" : "table-label-gray"}>
                    {props.data.TipoDenuncia}
                  </div>
                  <div className="text spaceText" >{props.data.Folio}</div>
                </div>
                // <div style={{ display: "grid", justifyContent: "center" }}>
                //   <span className={`tipo-${props.data.TipoDenuncia}`}>{props.data.TipoDenuncia}</span>
                //   <span>{props.data.Folio}</span>
                // </div>
              ))}
              headerCellComponent={(props) => (
                <HeaderTooltip
                  id="tooltipDenuncias"
                  headerText="Tipo Denuncia"
                  toolTipText="DIAT: Denuncia Individual de accidente del trabajador.
                    DIAT: Denuncia Individual de enfermedad profesional."
                  widthprops={410}
                />
              )}
            />

            <Column
              dataField="EstadoDenuncia"
              caption="Estado"
              cellComponent={(props) => (
                <span className={`estado-${props.data.EstadoDenuncia}`}>{props.data.EstadoDenuncia}</span>
              )}
            />

            <Column
              caption=""
              cellComponent={(row) => (
                <React.Fragment >
                  {this.getButton(row)}
                </React.Fragment>
              )}
            />
            <Column
              caption=""
              cellComponent={(props) => (
                <React.Fragment>
                  {props.data.EstadoDenuncia !== "PENDIENTE" && !props.data.TieneBorrador && <Button
                    text="Ver"
                    type="success"
                    className="slimButton"
                    onClick={() => this.handleViewDocuments(props)}
                  />}
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
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  listaDenuncias: state.denuncias.listaDenuncias,
  filtrosDenuncias: state.denuncias.filtrosDenuncias,
  // totalDenuncias: state.denuncias.totalDenuncias,
  shouldUpdateDataGrid: state.denuncias.shouldUpdateDataGrid,
  companyId: state.global.companyId,
  sucursalId: state.global.sucursalId,
  userData: state.global.userData,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => { dispatch(action); },
});

export default connect(mapStateToProps, mapDispatchToProps)(TableDenuncias);
