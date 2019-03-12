import React from "react";
import { connect } from "react-redux";

import DataGrid, {
  Column,
  Editing,
  Form,
  Pager,
  Paging,
  RemoteOperations,
} from "devextreme-react/ui/data-grid";
import { Button } from "devextreme-react";
import newDataSource from "devextreme/data/data_source";
import { openCloseToast } from "../../../../Global/actions";
import { setPerfilesAndFilterList } from "../../General/actions";
import getForm from "./form";
import { doCreatePerfil, doDeletePerfil, doUpdatePerfil } from "./actions";
import ModalDelete from "../modalDelete";
import TableFilter from "../../../../Shared/tableFilter.tsx";
import { getFiltros, filterData, filterType } from "../../../../../helpers/filterHelper.ts";
import { getAllProfiles } from "../../../../../services/perfilesApi";
import LoadingGif from "../../../../../images/animacion2[18].gif";

const columnToFilter = [

  { column: "Code", name: "Código" },
  { column: "Name", name: "Nombre" },
  { column: "Description", name: "Descripción" },

];

class TablePerfil extends React.PureComponent {
  constructor(props) {
    super(props);
    this.contador = 0;
    this.state = {
      modalDelete: false,
      eventDelete: null,
      filtersLoaded: false,
    };

    this.tableRef = React.createRef();
    this.dataSource = new newDataSource({
      load: async (options) => {
        try {
          this.contador = this.contador + 1;
          let data = this.props.perfiles || [];
          let totalCount = (this.props.perfiles != null && this.props.perfiles.length) || 0;

          if (!this.state.filtersLoaded) {
            const perfiles = await getAllProfiles();
            if (perfiles.status === 200) {
              const result = await perfiles.json();
              const filtros = getFiltros(columnToFilter, result.Data);

              this.props.dispatch(setPerfilesAndFilterList(result.Data, filtros));
              this.setState({ filtersLoaded: true });
              data = result.Data || [];
              totalCount = data.length;
            }
          }

          if (options.filter && options.filter.length > 0) {
            const newData = filterData(this.props.perfiles, options.filter);

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

  handleAdd = () => {
    this.tableRef.addRow();
  }
  handleOpenModalEdit = (r) => {
    this.tableRef.editRow(r.row.rowIndex);
  }

  handleOpenModalDelete = (r) => {
    this.tableRef.deleteRow(r.row.rowIndex);
  }

  handleSave = (event) => {
    this.props.dispatch(doCreatePerfil(event.data.Name, event.data.Description));
  }

  handleDeletePerfil = () => {
    this.props.dispatch(doDeletePerfil(this.state.eventDelete.data.Id));
    this.setState({ modalDelete: false, eventDelete: null });
  }

  handleUpdate = (event) => {
    const data = { ...event.oldData, ...event.newData };
    this.props.dispatch(doUpdatePerfil(data.Id, data.Name, data.Description, data.Active));
  }

  handleRemove = (event) => {
    if (this.state.eventDelete === null) {
      this.setState({ modalDelete: true, eventDelete: event });
      event.cancel = true;
    }
  }

  handleCancelRemove = () => {
    this.setState({ modalDelete: false, eventDelete: null });
  }
  handleFilterChange = (text, filters) => {
    const currentFilters = [...filters];
    if (text) {
      currentFilters.push(
        { column: "Code", value: { text, value: text }, type: filterType.search },
        { column: "Description", value: { text, value: text }, type: filterType.search },
        { column: "Name", value: { text, value: text }, type: filterType.search },
      );
    }
    this.tableRef.filter(currentFilters);
    this.tableRef.searchByText(text);
  }

  render() {
    const {
      eventDelete,
    } = this.state;
    const form = getForm();

    return (
      <React.Fragment>

        <ModalDelete
          open={this.state.modalDelete}
          title="Eliminar perfil"
          step1Main={<React.Fragment>¿Seguro quieres eliminar el perfil <span style={{ fontWeight: "bold" }}>
            {eventDelete && eventDelete.data.Description}
                                                                        </span> ?
                     </React.Fragment>}
          step1Sub="Al eliminar el perfil todos los usuarios que tengan este perfil asignado perderán sus privilegios."
          step2Main="Esta acción es irreversible"
          step2Sub="¿Seguro quieres eliminar el perfil?"
          step2ConfirmationText="Si, quiero eliminar el perfil"
          deleteCallback={this.handleDeletePerfil}
          cancelCallback={this.handleCancelRemove}
        />
        <TableFilter
          placeholder="Buscar"
          onChange={this.handleFilterChange}
          filters={this.props.filtrosTablaPerfiles}
          show={this.props.perfiles != null}
        />
        <Button
          text="Agregar perfil"
          type="default"
          onClick={this.handleAdd}
          style={{ position: "absolute", right: 0, zIndex: 5 }}
        />
        <DataGrid
          dataSource={this.dataSource}
          showBorders={false}
          noDataText="Sin Perfiles"
          showColumnLines={false}
          // columnAutoWidth
          ref={(ref) => ref !== null ? this.tableRef = ref.instance : null}
          showRowLines={false}
          rowAlternationEnabled
          onRowInserting={this.handleSave}
          onRowUpdating={this.handleUpdate}
          onRowRemoving={this.handleRemove}
          loadPanel={{
            enabled: true,
            showPane: true,
            showIndicator: true,
            indicatorSrc: LoadingGif,
            text: "Cargando...",
          }}

        >

          <Editing
            allowAdding
            // allowUpdating
            // allowDeleting
            // useIcons
            form={form}
            mode="popup"
            popup={{
              title: "Roles",
              showTitle: true,
              width: 700,
              height: 345,
              position: {
                my: "center",
                at: "center",
                of: window,
              },
            }}
            children={Form}
            texts={{
              addRow: "Agregar Perfil",
              saveRowChanges: "Guardar",
              cancelRowChanges: "Cancelar",
              confirmDeleteMessage: "",
              deleteRow: "Borrar",
            }}
          />

          <Column
            dataField="Code"
            allowEditing={false}
            allowAdding={false}
            caption="Código"
            allowFiltering
            allowSearch={false}
          />

          <Column
            dataField="Name"
            caption="Nombre"
            allowFiltering
            allowSearch={false}
            validationRules={[
              { type: "required", message: "Debe ingresar un nombre" },
              { type: "stringLength", max: 50 },
            ]}
          />
          <Column
            dataField="Description"
            caption="Descripción"
            allowFiltering
            allowSearch={false}
            validationRules={[
              { type: "required", message: "Debe ingresar un nombre" },
              { type: "stringLength", max: 300 },
            ]}
            headerCellComponent={(item) => <div style={{ textAlign: "left" }}>Descripción</div>}
            cellComponent={(item) => <div style={{ textAlign: "left" }}>{item.value}</div>}
          />
          <Column
            cellComponent={(props) => (
              <React.Fragment>
                <Button
                  text="Editar"
                  type="success"
                  className="slimButton"
                  onClick={() => this.handleOpenModalEdit(props)}
                />
              </React.Fragment>
            )}
          />
          <Column
            cellComponent={(props) => (
              <React.Fragment>
                <Button
                  text="Eliminar"
                  type="danger"
                  className="slimButton"
                  onClick={() => this.handleOpenModalDelete(props)}
                />
              </React.Fragment>
            )}
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
            paging={false}
            filtering
            summary={false}
            groupPaging={false}
            grouping={false}
            sorting={false}
          />
        </DataGrid>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  perfiles: state.mantenedores.perfiles,
  filtrosTablaPerfiles: state.mantenedores.filtrosTablaPerfiles,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => { dispatch(action); },
});

export default connect(mapStateToProps, mapDispatchToProps)(TablePerfil);
