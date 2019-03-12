import React from "react";
import {
  Popup,
  Button,
  TreeList,
  TagBox,
} from "devextreme-react";
import { connect } from "react-redux";
import { Column, SearchPanel } from "devextreme-react/ui/tree-list";
import { setMantenedor } from "../../General/actions";
import { doUpdateFunctionalities, doDeleteRol } from "./actions";

// import { openCloseToast } from "../../../Global/actions";
import ModalDelete from "../modalDelete";
// import listaFuncionalidades from '../../../../helpers/rolAccess';

class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedRows: [], // array usado para obtener todas las Ids seleccionadas
      actualSelectedRowsForComponent: [], // array usado por el componente para controlar las Ids seleccionadas,
      // es diferente por que al seleccionar un parentId no marca como seleccionado a los hijos de este
      selectedParents: [], // array para mostrar los padres Seleccionados por nombre
      modalDelete: false, // llamo al modalDelete para eliminar el rol y perfiles asociados

    };

    this.tableRef = React.createRef();
  }

  getChildsIds = (id) => {
    const ids = [];
    this.props.listaFuncionalidades.filter((data) => data.parentId === id).forEach((child) => {
      ids.push(child.Id);
    });
    return ids;
  }

  getRow = (id) => this.props.listaFuncionalidades.filter((data) => data.Id === id)[0]

  componentDidUpdate = (prevProps, state) => {
    if ((prevProps.selectedFuncionalities == null && this.props.selectedFuncionalities) ||
      (!prevProps.open && this.props.open)) {
      this.setState({
        selectedRows: this.getDefaultSelected(false, true),
        selectedParents: this.getDefaultSelected(true, true),
      });
    }
  }

  getDefaultSelected = (getParentsNames, useProps = false) => {
    const defaultIds = [];
    const selected = useProps ? this.props.selectedFuncionalities : this.state.selectedRows;
    selected && selected.forEach((id) => {
      if (getParentsNames) {
        const row = this.getRow(id);
        if (!row.parentId) {
          defaultIds.push({ Id: row.Id, text: row.Description });
        }
      } else if (this.getRow(id).parentId) {
        defaultIds.push(id);
      }
    });
    return defaultIds;
  }

  handleSelect = (e) => {
    let ids = e.selectedRowKeys;
    const parentsNames = [];
    e.selectedRowsData.forEach((row) => {
      if (row.parentId != null) {
        // al seleccionar una funcionalidad hija, agrego el parentId
        if (ids.indexOf(row.parentId) === -1) {
          ids.push(row.parentId);
          const parentRow = this.getRow(row.parentId);
          parentsNames.push({ Id: parentRow.Id, text: parentRow.Description });
        }
      } else if (ids.indexOf(row.Id) !== -1) {
        // al seleccionar una funcionalidad padre directamente, agrego sus hijos
        parentsNames.push({ Id: row.Id, text: row.Description });
        const childIds = this.getChildsIds(row.Id);
        ids = [...ids, ...childIds];
      }
    });

    this.setState({
      selectedRows: ids,
      selectedParents: parentsNames,
      actualSelectedRowsForComponent: this.tableRef.getSelectedRowKeys(),
    });
  }

  handleCancel = () => {
    this.setState({ selectedRows: [], selectedParents: [] });
    this.tableRef.deselectAll();
    this.props.onClose();
  }

  handleCancelRemove = () => {
    this.setState({ modalDelete: false });
  }
  removeRol = () => {
    this.props.dispatch(doDeleteRol(this.props.eventDataRol.data.Id, this.props.eventDataRol));
    this.setState({ modalDelete: false });
    this.props.onClose();
  }

  handleSave = () => {
    if (this.state.selectedRows.length > 0) {
      this.props.dispatch(setMantenedor({
        selectedFuncionalities: this.state.selectedRows,
      }));

      // Se guardan las funcionalidades editadas desde aca por que si no se modifica nada del row
      // no toma al metodo que hace el update, por lo que se opto por guardar desde el modal al hacer edit
      if (!this.props.isNewRow) {
        this.props.dispatch(doUpdateFunctionalities(this.props.selectedRowId, this.state.selectedRows));
      }

      this.setState({
        selectedRows: [],
        selectedParents: [],
        actualSelectedRowsForComponent: [],
      });

      this.props.onClose();
    } else {
      // Llama al modal delete para eliminar el rol.
      this.setState({ modalDelete: true });
    }
  }

  handleSelectChange = (event) => {
    if (event.value.length < event.previousValue.length) {
      let newSelectedRows = [];
      let newActualSelected = [];
      event.value.forEach((row) => {
        const childIds = this.getChildsIds(row.Id);
        // filtro los ids que fueron eliminados
        newSelectedRows = newSelectedRows.concat(this.state.selectedRows.filter((id) => id === row.Id || childIds.indexOf(id) !== -1));
        newActualSelected = newActualSelected.concat(this.state.actualSelectedRowsForComponent.filter((id) => id === row.Id || childIds.indexOf(id) !== -1));
      });

      this.setState({
        selectedParents: event.value,
        selectedRows: newSelectedRows,
        actualSelectedRowsForComponent: newActualSelected,
      });
    }
  }

  render() {
    const {
      open,
    } = this.props;

    return (
      <React.Fragment >
        {this.props.eventDataRol ?
          <ModalDelete
            open={this.state.modalDelete}
            title="Eliminar rol"
            step1Main="¿Seguro desea continuar ?"
            step1Sub={<React.Fragment> Al quitar todas las funcionalidades, tambien eliminara el rol <span style={{ fontWeight: "bold" }}>  {this.props.eventDataRol.data.Description}</span> </React.Fragment>}
            step2Main="Esta acción es irreversible"
            step2Sub="¿Seguro quieres eliminar el rol?"
            step2ConfirmationText="Si, quiero eliminar el rol"
            deleteCallback={this.removeRol}
            cancelCallback={this.handleCancelRemove}
          />
          :
          null
        }

        <Popup
          visible={open}
          dragEnabled={false}
          maxHeight="600px"
          onHiding={this.handleCancel}
          maxWidth="600px"

          title="Funcionalidades"
          showTitle
          contentRender={() => (
            <div>
              {open && this.props.selectedFuncionalities &&
                <TreeList
                  showBorders={false}
                  // height='500'
                  keyExpr="Id"
                  parentIdExpr="parentId"
                  noDataText="Sin Funcionalidades"
                  autoExpandAll
                  dataStructure="plain"
                  ref={(ref) => ref !== null ? this.tableRef = ref.instance : null}
                  style={{
                    position: "absolute",
                    right: 20,
                    left: 20,
                    top: 60,
                    userSelect: "none",
                    bottom: 100,
                  }}
                  onSelectionChanged={this.handleSelect}
                  rowAlternationEnabled
                  defaultSelectedRowKeys={this.getDefaultSelected()}
                  selectedRowKeys={this.state.actualSelectedRowsForComponent.length > 0 ? this.state.actualSelectedRowsForComponent : this.getDefaultSelected()}
                  expandNodesOnFiltering
                  selection={{
                    mode: "multiple",
                    recursive: true,
                  }}
                  showRowLines={false}
                  showColumnLines={false}
                  columnAutoWidth
                  dataSource={this.props.listaFuncionalidades}
                >
                  <SearchPanel
                    width="558"
                    placeholder="Buscar"
                    visible
                  />

                  <Column
                    dataField="Description"
                    allowFiltering
                    allowSearch
                    caption="Funcionalidad"
                    cellComponent={(item) => <div style={{ textAlign: "left" }}>{item.value}</div>}
                  />
                </TreeList>
              }
              <div
                className="disabledTag"
                style={{
                  position: "absolute", bottom: 60, left: 20, right: 20,
                }}
              >
                <TagBox
                  onInitialized={(e) => {
                    e.component.option("openOnFieldClick", false);
                  }}
                  // disabled
                  displayExpr="text"
                  placeholder="Funcionalidades seleccionadas"
                  onValueChanged={this.handleSelectChange}
                  value={this.state.selectedParents}
                />
              </div>
              <div style={{ position: "absolute", bottom: 20, right: 20 }}>
                <Button text="Cancelar" style={{ marginRight: 5 }} onClick={this.handleCancel} />
                <Button text="Guardar" type="default" onClick={this.handleSave} />
              </div>
            </div>
          )}
        />
      </React.Fragment >
    );
  }
}

const mapStateToProps = (state) => ({
  selectedFuncionalities: state.mantenedores.selectedFuncionalities,
  eventDataRol: state.mantenedores.eventDataRol,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => { dispatch(action); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
