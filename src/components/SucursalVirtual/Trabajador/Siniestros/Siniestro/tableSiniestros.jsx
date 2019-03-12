import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { Button } from "devextreme-react";
import newDataSource from "devextreme/data/data_source";
import DataGrid, { Column, Paging, Pager, RemoteOperations,
  //  HeaderFilter
} from "devextreme-react/ui/data-grid";
import LoadingGif from "../../../../../images/animacion2[18].gif";
import { getSiniestrosApi } from "../../../../../services/siniestrosApi";

import { setSiniestros } from "./actions";
import HeaderTooltip from "../../../../Shared/headerTooltip";
// import RangeFilter from "../../../../Shared/rangeFilter";
import { openCloseToast } from "../../../../Global/actions";
// import ModalDocumentos from "./documentos/modalDocumentos";
import ModalDocumentos from "../../../Documentos/modalDocumentos";
import NoDataComponent from "../../../../Shared/noDataImage";

import TableFilter from "../../../../Shared/tableFilter.tsx";
import { getFiltros, filterData, filterType } from "../../../../../helpers/filterHelper.ts";
import { doGetDocumentBySiniestro } from "../../../Documentos/actions";

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

const ActionButton = (props) => (
  <Button
    type={props.type}
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

        }}
      >{btn.text}
      </div>
    )}
  />
);

const columnToFilter = [
  {
    column: "Reposo",
    name: "Reposo",
    customValues: [{ text: "Activo", value: true }, { text: "No Activo", value: false }],
  },
  { column: "TipoSiniestro", name: "Tipo" },
  { column: "Calificacion", name: "Cobertura" },
  { column: "NombreEmpresa", name: "Empresa" },
  { column: "FechaPresentacion", name: "Fecha presentación", type: "date" },
  { column: "FechaSiniestro", name: "Fecha siniestro", type: "date" },
  { column: "PrestacionesEconomicas", name: "Prestaciones económicas" },
];

class TableSiniestros extends React.PureComponent {
  constructor(props) {
    super(props);

    this.tableRef = React.createRef();
    this.contador = 0;
    this.state = {
      filtersLoaded: false,
    };

    this.dataSource = new newDataSource({
      load: async (options) => {
        try {
          this.contador = this.contador + 1;
          let data = this.props.listaSiniestros || [];
          let totalCount = (this.props.listaSiniestros != null && this.props.listaSiniestros.length) || 0;

          if (!this.state.filtersLoaded) {
            const request = await getSiniestrosApi(this.props.userData.RUT, options.skip, options.skip + options.take, options.filter);
            if (request.status === 200) {
              const result = await request.json();
              const filtros = getFiltros(columnToFilter, result.Siniestros);
              this.props.dispatch(setSiniestros(result.Siniestros, filtros));
              this.setState({ filtersLoaded: true });
              data = result.Siniestros || [];
              totalCount = data.length;
            }
          }

          if (options.filter && options.filter.length > 0) {
            const newData = filterData(this.props.listaSiniestros, options.filter);

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
          console.error(e);
          this.props.dispatch(openCloseToast({
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

  handleViewDocuments = (rowData) => {
    const IdSiniestro = rowData.data.IdSiniestro;
    const data = rowData.data;
    this.props.dispatch(doGetDocumentBySiniestro(IdSiniestro, data));
  }

  handleFilterChange = (text, filters) => {
    const currentFilters = [...filters];
    if (text) currentFilters.push({ column: "IdSiniestro", value: { text, value: text }, type: filterType.search });
    this.tableRef.filter(currentFilters);
    this.tableRef.searchByText(text);
  }

  render() {
    return (
      <React.Fragment>
        <ModalDocumentos />

        <TableFilter
          placeholder="Buscar siniestros por ID"
          onChange={this.handleFilterChange}
          filters={this.props.filtrosTablaSiniestro}
          show={this.props.listaSiniestros != null}
        />

        <DataGrid
          dataSource={this.dataSource}
          ref={(ref) => { if (ref !== null) this.tableRef = ref.instance; }}
          showBorders={false}
          showColumnLines={false}
          showRowLines={false}
          className="custom-table"
          noDataText="Sin siniestros"
          rowAlternationEnabled
          hoverStateEnabled
          selection={{
            mode: "single",
          }}
          onRowClick={(row) => this.props.handleDetails(1, row.data)}
          onContentReady={(e) => {
            if (e.component.totalCount() === 0) {
              const config = {};
              config.addClass = "table-margin";
              const noDataSpan = e.component.element().querySelector(".dx-scrollable-wrapper");
              ReactDOM.render(<NoDataComponent config={config} message="Sin siniestros" />, noDataSpan);
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
            dataField={["Reposo", "IdSiniestro", "TipoSiniestro"]}
            caption="Siniestro"
            allowFiltering
            allowSearch={false}
            cellComponent={(row) =>
              (
                <div className="group-Column">
                  <div className="dotIcon" ><EmptyIcon size={15} border={12} full={row.data.Reposo} />
                    <div className="text space-text"> {row.data.TipoSiniestro} </div>
                  </div>
                  <div className="text space-text"> {row.data.IdSiniestro} </div>
                </div>
              )

            }
            headerFilter={{
              dataSource: [
                { text: "Activo", value: true },
                { text: "Inactivo", value: false },
              ],
            }}
          />


          <Column
            dataField="Calificacion"
            caption="Cobertura"
            allowFiltering
            allowSearch={false}
          />
          <Column
            dataField="NombreEmpresa"
            caption="Empresa"
            allowFiltering
            allowSearch={false}
          />
          <Column
            dataField="FechaPresentacion"
            caption="Fecha presentación"
            allowFiltering={false}
            allowSearch={false}
            alignment="right"
            dataType="date"
            format="dd/MM/yyyy"
          />


          <Column
            dataField="FechaSiniestro"
            caption="Fecha siniestro"
            allowFiltering={false}
            allowSearch={false}
            dataType="date"
            format="dd/MM/yyyy"
          />


          <Column
            dataField="PrestacionesEconomicas"
            headerCellTemplate={(element, row) => ReactDOM.render(<HeaderTooltip
              id="tooltipPrestaciones"
              widthprops={250}
              headerText="Prestaciones económicas"
              toolTipText="Las prestaciones económicas, subsidios, indemnizaciones
                    o pensiones que puede recibir el trabajador dependiendo
                    del diagnóstico médico."
            />, element)}
            caption="Prestaciones económicas"
            allowFiltering
            allowSearch={false}
            headerFilter={{
              dataSource: [
                { text: "Si", value: true },
                { text: "No", value: false },
              ],
            }}
            cellComponent={(row) => <div>{row.data.PrestacionesEconomicas ? "Si" : "No"}</div>}
          />
          <Column
            caption="Documentos"
            cellComponent={(data) => (
              <ActionButton
                width="40"
                height="25"
                text="Ver"
                type="success"
                onClick={() => this.handleViewDocuments(data)}
              />
            )}
          />

          <RemoteOperations
            paging={false}
            filtering
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
            infoText={(page, total) => `Pagina ${page} de ${total}`}
          />
        </DataGrid>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  listaSiniestros: state.siniestro.listaSiniestros,
  filtrosTablaSiniestro: state.siniestro.filtrosTablaSiniestro,
  viewDetails: state.siniestro.viewDetails,
  userData: state.global.userData,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => { dispatch(action); },
});

export default connect(mapStateToProps, mapDispatchToProps)(TableSiniestros);
