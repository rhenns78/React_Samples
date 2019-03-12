import React from "react";
import { connect } from "react-redux";
import DataGrid, { Column, Editing, Paging, Pager, RemoteOperations } from "devextreme-react/ui/data-grid";
import { Button } from "devextreme-react";
import newDataSource from "devextreme/data/data_source";
import { openCloseToast } from "../../../../Global/actions";


import getForm from "./form";

import { doDeleteRol, doCreateRol, doUpdateRol, getRolFuncionalities } from "./actions";
// setMantenedor,
import { setSelectedFuncionalities, setEventDataRol, setRolesAndFilterList, setPerfilesAndFilterList } from "../../General/actions";
import ModalDelete from "../modalDelete";
import { getAllRoles } from "../../../../../services/rolesApi";

import TableFilter from "../../../../Shared/tableFilter.tsx";
import { getFiltros, filterData, filterType } from "../../../../../helpers/filterHelper.ts";
import { getAllProfiles } from "../../../../../services/perfilesApi";
import LoadingGif from "../../../../../images/animacion2[18].gif";

const columnToFilter = [

  { column: "Code", name: "Código" },
  { column: "Name", name: "Nombre" },
  { column: "Description", name: "Descripción" },
  {
    column: "IdProfile",
    name: "Perfil",
    // customValues: [{ text: this.props.perfiles.name, value: this.props.perfiles.id }],
  },

];

class RolesTable extends React.PureComponent {
  constructor(props) {
    super(props);
    this.contador = 0;
    this.tableRef = React.createRef();
    this.state = {
      selectedPerfil: "",
      selectedRowId: null,
      modalDelete: false,
      deleteEvent: null,
      allowEditPerfil: false,
      filtersLoaded: false,
    };

    this.dataSource = new newDataSource({
      load: async (options) => {
        try {
          this.contador = this.contador + 1;
          let data = this.props.roles || [];
          let totalCount = (this.props.roles != null && this.props.roles.length) || 0;

          if (!this.state.filtersLoaded) {
            const request = await getAllRoles();
            const perfiles = await getAllProfiles();
            if (request.status === 200 && perfiles.status === 200) {
              const result = await request.json();
              const resultperfiles = await perfiles.json();
              const filtros = getFiltros(columnToFilter, result.Data);
              this.props.dispatch(setRolesAndFilterList(result.Data, filtros));
              this.props.dispatch(setPerfilesAndFilterList(resultperfiles.Data, null));


              this.setState({ filtersLoaded: true });
              data = result.Data || [];
              totalCount = data.length;
            }
          }

          if (options.filter && options.filter.length > 0) {
            const newData = filterData(this.props.roles, options.filter);

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

  handleEdit = (e) => {
    const event = {};
    event.cancel = e.cancel;
    event.data = e.data;
    this.props.dispatch(setSelectedFuncionalities(null));
    this.setState({ selectedPerfil: e.data.IdProfile, selectedRowId: e.data.Id, allowEditPerfil: false });
    this.props.dispatch(setEventDataRol(event));
    this.props.dispatch(getRolFuncionalities(e.data.Id));
  }

  handleAdd = () => {
    this.props.dispatch(setSelectedFuncionalities([]));
    this.setState({ selectedPerfil: "", allowEditPerfil: true });
    this.tableRef.addRow();
  }
  handleOpenModalEdit = (r) => {
    this.tableRef.editRow(r.row.rowIndex);
  }

  handleOpenModalDelete = (r) => {
    this.tableRef.deleteRow(r.row.rowIndex);
  }
  handleSave = (event) => {
    this.props.dispatch(doCreateRol(event));
  }

  handleUpdate = (event) => {
    const data = { ...event.oldData, ...event.newData };
    this.props.dispatch(doUpdateRol(data));
  }

  handleEditFunctionalities = () => {
    const isNewRow = this.state.selectedPerfil === "";
    this.props.openModal(isNewRow, this.state.selectedRowId);
  }

  handleRemove = (event) => {
    if (this.state.deleteEvent === null) {
      this.setState({ modalDelete: true, deleteEvent: event });
      event.cancel = true;
    }
  }

  handleCancelRemove = () => {
    this.setState({ modalDelete: false, deleteEvent: null });
  }

  removeRol = () => {
    this.props.dispatch(doDeleteRol(this.state.deleteEvent.data.Id, this.state.deleteEvent));
    this.setState({ modalDelete: false, deleteEvent: null });
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
      perfiles,
    } = this.props;

    const {
      deleteEvent,
    } = this.state;

    const form = getForm({
      perfiles,
      selectedPerfil: this.state.selectedPerfil,
      modalCallback: this.handleEditFunctionalities,
    });

    return (
      <React.Fragment >
        <TableFilter
          placeholder="Buscar"
          onChange={this.handleFilterChange}
          filters={this.props.filtrosTablaRoles}
          show={this.props.roles != null}

        />
        <Button
          text="Agregar rol"
          type="default"
          onClick={this.handleAdd}
          style={{ position: "absolute", right: 0, zIndex: 5 }}
        />
        <DataGrid
          dataSource={this.dataSource}
          showBorders={false}
          renderAsync
          style={{
            marginTop: 46,
          }}
          noDataText="Sin Roles"
          keyExpr="Id"
          showColumnLines={false}
          ref={(ref) => ref !== null ? this.tableRef = ref.instance : null}
          allowColumnResizing={false}

          showRowLines={false}
          onRowRemoving={this.handleRemove}
          rowAlternationEnabled
          onRowInserting={this.handleSave}
          onRowUpdating={this.handleUpdate}
          onEditingStart={this.handleEdit}
          columnAutoWidth={false}
          loadPanel={{
            enabled: true,
            showPane: true,
            showIndicator: true,
            indicatorSrc: LoadingGif,
            text: "Cargando...",
          }}

        >

          <Editing
            // allowUpdating
            // allowDeleting
            // useIcons={false}

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
            texts={{
              addRow: "Agregar rol",
              saveRowChanges: "Guardar",
              cancelRowChanges: "Cancelar",
              confirmDeleteMessage: "", // '' => no confirmation
              deleteRow: "Borrar",
            }}
            form={form}
          />

          <Column
            dataField="Code"
            allowEditing={false}
            allowAdding={false}
            showEditorAlways={false}
            allowFiltering
            allowSearch={false}
            caption="Código"
            cellComponent={(item) => (<div
              title={item.value}
              style={{
                textAlign: "left", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis",
              }}
            >{item.value}
                                      </div>)}
          />

          <Column
            dataField="Name"
            validationRules={[
              { type: "required", message: "Debe ingresar un nombre" },
            ]}
            caption="Nombre"
            allowFiltering
            allowSearch={false}
          />

          <Column
            dataField="IdProfile"
            caption="Perfil"
            allowEditing={this.state.allowEditPerfil}
            validationRules={[
              { type: "required", message: "Debe seleccionar un perfil" },
            ]}
            dataType="LookUp"
            lookup={{
              dataSource: perfiles,
              displayExpr: "Name",
              valueExpr: "Id",
            }}
          />

          <Column
            dataField="Description"
            caption="Descripción"
            allowFiltering
            allowSearch={false}
            validationRules={[
              { type: "required", message: "Debe seleccionar un perfil" },
            ]}
            width="40%"
            headerCellComponent={(item) => <div style={{ textAlign: "left" }}>Descripción</div>}
            cellComponent={(item) => <div title={item.value} style={{ textAlign: "left", whiteSpace: "normal" }}>{item.value}</div>}
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

          <Pager
            visible
            showInfo
            infoText={(page, total, items) => `Página ${page} de ${total} (${items} resultados)`}
          />

        </DataGrid>
        <ModalDelete
          open={this.state.modalDelete}
          title="Eliminar rol"
          step1Main={
            <React.Fragment>
              ¿Seguro quieres eliminar el rol <span style={{ fontWeight: "bold" }}>
                {deleteEvent && deleteEvent.data.Description}
                                              </span> ?
            </React.Fragment>
          }
          step1Sub="Al eliminar el rol todos los usuarios que tengan este rol asignado perderán sus privilegios."
          step2Main="Esta acción es irreversible"
          step2Sub="¿Seguro quieres eliminar el rol?"
          step2ConfirmationText="Si, quiero eliminar el rol"
          deleteCallback={this.removeRol}
          cancelCallback={this.handleCancelRemove}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  roles: state.mantenedores.roles,
  perfiles: state.mantenedores.perfiles,
  filtrosTablaRoles: state.mantenedores.filtrosTablaRoles,

});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => { dispatch(action); },
});

export default connect(mapStateToProps, mapDispatchToProps)(RolesTable);
