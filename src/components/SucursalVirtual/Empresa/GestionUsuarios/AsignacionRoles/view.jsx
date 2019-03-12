import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import DataGrid, {
  SearchPanel,
  Paging,
  Pager,
  Scrolling,
  Sorting,
  HeaderFilter,
  Column,
  Selection,
} from "devextreme-react/ui/data-grid";
import { TagBox, SelectBox, Button } from "devextreme-react";
import LoadingOverlay from "../../../../Shared/LoadingOverlay";
import {
  // getRolesByProfileId,
  getUserByComanyId, addRolesToUser, addUsersToRol,
  //  deleteRolesToUser
} from "./actions";
// import constants from "../../../../../helpers/constants";

class AsignarRoles extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      workerSelected: null,
      // selectedRoleIdSelected: null,
      // roleActuales: [],
    };


    props.dispatch(getUserByComanyId(this.props.companyId));
    this.handleWorkerSelect = this.handleWorkerSelect.bind(this);
    this.handleTagDeleteWorker = this.handleTagDeleteWorker.bind(this);
    this.asignMassiveRoles = this.asignMassiveRoles.bind(this);
  }


  // handleEdit = (e) => {
  //   this.setState({ roleActuales: e.data.Roles.map((r) => r.Id) });
  // }
  handleForm = (e) => {
    if ((e.parentType === "dataRow" || e.parentType === "filterRow") && e.dataField === "Roles") {
      e.editorName = "dxTagBox";
      e.editorOptions.dataSource = this.props.roles;
      e.editorOptions.displayExpr = "Name";
      e.editorOptions.valueExpr = "Id";
      e.editorOptions.hideSelectedItems = true;
      e.editorOptions.itemTemplate = (props, item, itemElement) => {
        ReactDOM.render(<div style={{ display: "flex" }}>
          <span style={{ minWidth: 120, fontWeight: "bold" }}>{props.Name}</span>
          <div
            style={{
              marginLeft: 10,
              wordWrap: "break-word",
              whiteSpace: "normal",
              overflow: "auto",
            }}
          >{props.Description}
          </div>
          {/* eslint-disable-next-line react/jsx-closing-tag-location */}
        </div>, itemElement);
      };

      e.editorOptions.value = e.row.data.Roles.map((r) => r.Id) || [];// this.state.roleActuales;
      e.editorOptions.onValueChanged = (args) => {
        e.setValue(args.value);
      };
    }
  }

  updateRolesToUser = (e) => {
    const newData = e.newData.Roles;
    const data = {};
    data.CompanyRut = this.props.companyId; // "21404324-6"; // this.props.companyId;
    data.Rut = e.oldData.Rut;
    data.RelationTypeCode = e.oldData.RelationTypeCode;
    data.idRoles = [...newData];

    this.props.dispatch(addRolesToUser(data));
  }

  refresh = () => {
    this.props.dispatch(getUserByComanyId(this.props.companyId));
  }

  handleWorkerSelect(e) {
    this.setState({ workerSelected: e.selectedRowKeys });
  }

  selectRol(e, value) {
    switch (e.element.id) {
      case "rolCmbx": {
        this.setState({ selectedRoleId: value });
        break;
      }
      default:
        break;
    }
  }

  handleTagDeleteWorker(e) {
    this.setState({ workerSelected: e.value });
  }
  asignMassiveRoles() {
    const workers = [];
    // Busco aquellos workers que no tengan el rol elegido

    this.state.workerSelected.forEach((t) => {
      if (t.Roles.some((elem) => elem === this.state.selectedRoleId) === false) {
        workers.push({
          Rut: t.Rut,
          RelationTypeCode: t.RelationTypeCode,
        });
      }
    });
    if (workers.length > 0) {
      this.props.dispatch(addUsersToRol({
        IdRol: this.state.selectedRoleId,
        users: workers,
        CompanyRut: this.props.companyId,
      }));

      this.setState({ workerSelected: null });
    }
  }
  renderAsignacionRoles() {
    return (
      <div className="row" style={{ marginTop: 20 }}>

        <div className="col-8" >
          <TagBox
            onInitialized={(e) => {
              e.component._options.openOnFieldClick = false;
            }}
            dataSource={this.state.workerSelected}
            searchEnabled={false}
            displayExpr="EmployeeName"
            multiline
            // onItemClick={this.handleTagDeleteWorker}
            onValueChanged={this.handleTagDeleteWorker}
            value={this.state.workerSelected}
          >
          </TagBox>
        </div>
        <div className="col-2" >
          <SelectBox
            id="rolCmbx"
            placeholder="Seleccione .."
            dataSource={this.props.roles}
            onValueChanged={(data) => this.selectRol(data, data.value)}
            displayExpr="Name"
            valueExpr="Id"
            searchEnabled
          />
        </div>
        <div className="col-2" >
          <Button text="Asignar" type="success" onClick={this.asignMassiveRoles} />
        </div>
      </div>
    );
  }


  render() {
    return (
      <div>  {this.props.isLoading && <LoadingOverlay style={{ height: 600 }} />}
        {
          this.props.roles ?
            <div className="zero row">
              <div className="content zero col-md-12 col-lg-12 col-xl-12 ">
                <div
                  style={{
                    width: "100%", display: "flex", justifyContent: "left", marginTop: 30,
                  }}
                >
                  <div style={{ position: "absolute", zIndex: 1, marginBottom: 20 }}>
                    <h3 style={{ fontWeight: "bold" }}>Asignar roles</h3>
                  </div>
                  {/* <div style={{ display: "flex", marginBottom: 20 }}><h3 style={{ fontWeight: "bold" }}>Trabajadores</h3></div> */}

                  {this.props.companyId ?

                    <DataGrid
                      showBorders={false}
                      dataSource={this.props.employees}
                      showColumnLines={false}
                      showRowLines={false}
                      selectedRowKeys={this.state.workerSelected}
                      rowAlternationEnabled
                      noDataText="Sin Trabajadores"
                      onEditorPrepared={this.handleEditor}
                      loadPanel={{
                        enabled: false,
                      }}
                      editing={{
                        mode: "form",
                        useIcons: true,
                        allowUpdating: true,
                        form: {
                          colCount: 3,
                          items: [
                            {
                              dataField: "EmployeeName",
                              text: "Nombre trabajador",
                            },
                            {
                              dataField: "Rut",
                              text: "Rut",
                            },
                            {
                              dataField: "Relation",
                              text: "Relacion",
                            },
                            {
                              dataField: "Roles",
                              text: "Roles",
                              colSpan: 3,
                            },
                          ],
                        },
                        texts: {
                          saveRowChanges: "Guardar",
                          cancelRowChanges: "Cancelar",
                        },
                      }
                      }

                      onSelectionChanged={this.handleWorkerSelect}
                      // onEditingStart={this.handleEdit}
                      onEditorPreparing={this.handleForm}
                      onRowUpdating={this.updateRolesToUser}
                      // onRowUpdated={this.refresh}

                    >
                      <SearchPanel visible width={400} placeholder="Buscar trabajador por nombre o rut" />

                      <HeaderFilter visible />
                      <Sorting mode="multiple" />
                      <Scrolling columnRenderingMode="virtual" />

                      <Selection
                        showCheckBoxesMode="always"
                        mode="multiple"
                        allowSelectAll={false}
                      />

                      <Column
                        dataField="EmployeeName"
                        caption="Nombre trabajador"
                        allowFiltering={false}
                        allowEditing={false}
                        allowSearch
                      />

                      <Column
                        dataField="Rut"
                        caption="Rut"
                        allowFiltering={false}
                        allowSearch
                        allowEditing={false}
                      />

                      <Column
                        dataField="Relation"
                        caption="Relacion"
                        allowFiltering
                        allowSearch={false}
                        allowEditing={false}
                      />

                      <Column
                        dataField="Roles"
                        caption="Roles"
                        allowFiltering
                        allowSearch={false}
                        dataType="string"
                        calculateCellValue={(rowData) => rowData.Roles.map((e) => e.Name ? e.Name : e.Description).join(", ")}
                        filterOperations="contains"
                        headerFilter={{
                          dataSource: this.props.rolesFilter,
                        }}
                      // cellTemplate={(container, options) => container.append(options.data.Roles.map((e) => e.Description).join(", "))}
                      />

                      <Paging
                        pageSize={10}

                      />
                      <Pager
                        showInfo
                      />
                    </DataGrid>


                    : "DEBE ELEGIR UNA EMPRESA"}

                </div>
                {this.state.workerSelected && this.state.workerSelected.length > 0 ? this.renderAsignacionRoles() : null}
              </div>
            </div>
            :
            null
        }

      </div>


    );
  }
}

const mapStateToProps = (state) => ({
  companyId: state.global.companyId,
  roles: state.asignacionRoles.roles,
  employees: state.asignacionRoles.employees,
  isLoading: state.asignacionRoles.isLoading,
  rolesFilter: state.asignacionRoles.rolesFilter,

});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => { dispatch(action); },
});

export default connect(mapStateToProps, mapDispatchToProps)(AsignarRoles);
