import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { DataGrid, Button } from "devextreme-react";
import newDataSource from "devextreme/data/data_source";
import {
  Column,
  MasterDetail, Pager, Paging,
  RemoteOperations,
} from "devextreme-react/ui/data-grid";
import LoadingGif from "../../../../../images/animacion2[18].gif";

import { openCloseToast } from "../../../../Global/actions";
import { GetSiniestrosEmpresaApi } from "../../../../../services/SiniestrosEmpresa";
import { setSiniestrosEmpresa } from "./actions";
import { getFiltros, filterType } from "../../../../../helpers/filterHelper.ts";
import TableFilter from "../../../../Shared/tableFilter.tsx";
import { formatDateForFilter } from "../../../../../helpers/dateFormat";
import UserInfoColumn from "../../../../Shared/UserInfoColumn";
import NoDataComponent from "../../../../Shared/noDataImage";
import SiniestroInfoColumn from "../../../../Shared/SiniestroInfoColumn";
import validaciones from "../../../../../helpers/validaciones";


const Field = React.memo((props) => (
  <div className="row zero empresa-siniestro-detalle">
    <div className="col-5 empresa-siniestro-name" title={props.name ? props.name : "-"}>{props.name ? props.name : "-"}:</div>
    <div className="col-7 empresa-siniestro-valor" title={props.value ? props.value : "-"}>{props.value ? props.value : "-"}</div>
  </div>
));

const MasterDetailsComp = React.memo((props) => (
  <div className="row zero">
    <div className="col-12 siniestro-detail-table-button">
      <Button
        type="default"
        onClick={() => props.handleViewDocuments(props)}
        text="Documentos"
      />
      <Button
        type="success"
        text="Ver detalle"
        style={{ marginLeft: 10 }}
        onClick={() => props.handleViewDetails(props)}
      />
    </div>
    <div className="col-md-6 col-lg-6">
      <Field name="Sucursal" value={props.data.Sucursal.Direccion} />
      <Field name="Cobertura" value={props.data.Cobertura.DescripcionCobertura} />
      <Field name="Cantidad de reposos" value={props.data.CantidadReposo} />
      <Field name="Mecanismo del accidente" value={props.data.MecanismoAccidente} />
    </div>
    <div className="col-md-6 col-lg-6">
      <Field name="Días totales del siniestro" value={props.data.DiasTotalesReposo} />
      <Field name="Días totales imputables" value={props.data.DiasTotalesImputables} />
      <Field name="Rebajas" value={props.data.DiasTotalesRebaja} />
    </div>
  </div>
));

const columnToFilter = [
  {
    column: "Reposo",
    name: "Reposo",
    customValues: [{ text: "Activo", value: true }, { text: "No Activo", value: false }],
  },
  { column: "TipoSiniestro", name: "Tipo" },
  { column: "FechaPresentacion", name: "Fecha presentación", type: "date" },
  { column: "FechaSiniestro", name: "Fecha siniestro", type: "date" },
  {
    column: "PrestacionesEconomicas",
    name: "Prestaciones económicas",
    customValues: [{ text: "Si", value: true }, { text: "No", value: false }],
  },
];

class TablaSiniestros extends React.PureComponent {
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
                filtros[`${item.column}Inicio`] = formatDateForFilter(item.value.value.from);
                filtros[`${item.column}Fin`] = formatDateForFilter(item.value.value.to);
              } else {
                filtros[item.column] = item.value.value;
              }
            });
          }

          const request = await GetSiniestrosEmpresaApi(filtros);
          if (request.status === 200) {
            const result = await request.json();
            let dataFilters = this.props.filtrosSiniestros;
            if (this.props.siniestros && this.props.siniestros.length === 0) {
              dataFilters = getFiltros(columnToFilter, result.ListadoSiniestros);
            }
            props.dispatch(setSiniestrosEmpresa(result.ListadoSiniestros, dataFilters, result.TotalSiniestros));
            data = result.ListadoSiniestros || [];
            totalCount = result.TotalSiniestros || 0;
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
      this.tableRef.refresh();
    }
  }

  handleRowClick = (e) => {
    if (!e.component.isRowExpanded(e.key)) {
      //   e.component.collapseRow(e.key);
      // } else {
      e.component.collapseAll(-1);
      e.component.expandRow(e.key);
      this.props.setSiniestro(e.data);
    }
  }

  handleFilterChange = (text, filters) => {
    const currentFilters = [...filters];
    if (text) {
      currentFilters.push({ column: "RutTrabajador", value: { text, value: text }, type: filterType.search });
      currentFilters.push({ column: "NombreTrabajador", value: { text, value: text }, type: filterType.search });
    }
    this.tableRef.filter(currentFilters);
    this.tableRef.searchByText(text);
  }

  render() {
    return (
      <div className="table-wrapper">
        <TableFilter
          placeholder="Buscar trabajador por nombre o rut"
          onChange={this.handleFilterChange}
          filters={this.props.filtrosSiniestros}
          show={this.props.siniestros != null && this.props.siniestros.length}
        />
        <DataGrid
          dataSource={this.dataSource}
          showBorders={false}
          showColumnLines={false}
          showRowLines={false}
          ref={(ref) => { if (ref !== null) this.tableRef = ref.instance; }}
          className="custom-table empresas"
          noDataText=""
          rowAlternationEnabled
          hoverStateEnabled
          loadPanel={{
            enabled: true,
            showPane: true,
            showIndicator: true,
            indicatorSrc: LoadingGif,
            text: "Cargando...",
          }}

          onContentReady={(e) => {
            if (e.component.totalCount() === 0) {
              const config = {};
              config.addClass = "table-margin";
              const noDataSpan = e.component.element().querySelector(".dx-scrollable-wrapper");
              ReactDOM.render(<NoDataComponent config={config} message="Sin siniestros" />, noDataSpan);
            }
          }}


          onRowClick={this.handleRowClick}
          selection={{
            mode: "single",
          }}
        >

          <MasterDetail
            enabled
            component={(props) => (
              <MasterDetailsComp
                handleViewDocuments={this.props.handleViewDocuments}
                handleViewDetails={this.props.handleViewDetails}
                {...props}
              />
            )}
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
            allowFiltering={false}
            caption="Siniestro"
            cellComponent={React.memo((row) => (
              <SiniestroInfoColumn
                active={row.data.CantidadReposo}
                title={row.data.TipoSiniestro.DescripcionTipoSiniestro}
                subtitle={row.data.IdSiniestro}
              />
            ))}
          />

          <Column
            dataField="FechaPresentacion"
            format="dd-MM-yyyy"
            dataType="date"
            caption="Fecha presentación"
          />

          <Column
            dataField="FechaSiniestro"
            format="dd-MM-yyyy"
            dataType="date"
            caption="Fecha siniestro"
          />

          <Column
            dataField="PrestacionesEconomicas"
            caption="Prestaciones económicas"
            cellComponent={React.memo((row) => (
              <i className={`material-icons siniestros-empresa ${row.data.PrestacionEconomica ? "active" : ""}`}>
                {row.data.PrestacionEconomica ? "check_circle_outline" : "cancel"}
              </i>
            ))}
          />

          <Pager
            visible
            showInfo
            infoText={(page, total, items) => `Página ${page} de ${total} (${items} resultados)`}
          />

          <Paging
            pageSize={20}
          />

          <RemoteOperations
            paging
            filtering
            summary={false}
            groupPaging={false}
            grouping={false}
            sorting={false}
          />

        </DataGrid>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  siniestros: state.siniestroEmpresa.siniestros,
  filtrosSiniestros: state.siniestroEmpresa.filtrosSiniestros,
  companyId: state.global.companyId,
  totalSiniestros: state.siniestroEmpresa.totalSiniestros,
  sucursalId: state.global.sucursalId,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => { dispatch(action); },
});

export default connect(mapStateToProps, mapDispatchToProps)(TablaSiniestros);
