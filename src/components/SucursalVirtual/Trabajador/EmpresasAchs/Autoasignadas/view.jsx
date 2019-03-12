import React from "react";
import { connect } from "react-redux";
import { TextBox, Button, DataGrid } from "devextreme-react";
import DataSource from "devextreme/data/data_source";
import { Column, Paging, Pager, Selection, RemoteOperations } from "devextreme-react/ui/data-grid";
import UserInfoColumn from "../../../../Shared/UserInfoColumn";
import LoadingOverlay from "../../../../Shared/LoadingOverlay";
import { openCloseModalAgregar, openCloseModalEliminarEmpresa, setSelectedCompanies, updateAssignedCompanies } from "./actions";
import ModalAgregar from "./modalAgregar";
import ModalEliminar from "./modalEliminar";
import { getAssignedCompanies } from "../../../../../services/EmpresasAutoasignadasApi";

class Autoasignadas extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isSelected: false,
    };

    this.tableRef = React.createRef();
    this.timeout = 0;

    this.dataSource = new DataSource({
      load: async (options) => {
        try {
          let companies = [];
          let total = 0;

          const filter = {
            pageIndex: (options.skip / options.take),
            pageSize: this.props.assignedCompaniesPageSize,
          };

          if (options.filter) {
            filter.filter = options.filter.filterValue;
          }

          const request = await getAssignedCompanies(filter);
          if (request.status === 200) {
            const result = await request.json();
            if (result.Success) {
              companies = result.SelfAssignments;
              total = result.TotalRows;
            }
          }

          return {
            data: companies,
            totalCount: total,
          };
        } catch (e) {
          return {
            data: [],
            totalCount: 0,
          };
        }
      },
    });
  }

  componentDidUpdate = (prevProps) => {
    if (!prevProps.updateAssignedCompanies && this.props.updateAssignedCompanies) {
      this.tableRef.refresh();
      this.props.dispatch(updateAssignedCompanies(false));
    }
  }

  handleBuscarUsuario = (e) => {
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.tableRef.searchByText(e.value);
    }, 300);
  }

  handleAgregarEmpresa = () => {
    this.props.dispatch(openCloseModalAgregar(true));
  }

  handleDescargar = () => {

  }

  handleDelete = () => {
    this.props.dispatch(openCloseModalEliminarEmpresa(true));
  }

  handleSelect = (e) => {
    this.setState({ isSelected: !!e.selectedRowsData.length });
    this.props.dispatch(setSelectedCompanies(e.selectedRowsData));
  }

  render() {
    return (
      <div>

        {this.props.isLoading && <LoadingOverlay />}
        <ModalAgregar />
        <ModalEliminar />

        <div style={{ display: "flex", flexDirection: "row", marginBottom: 10 }}>
          <TextBox
            placeholder="Buscar empresa"
            onValueChanged={this.handleBuscarUsuario}
            mode="search"
            style={{ flexGrow: 1 }}
            valueChangeEvent="keyup"
          />
          <Button
            onClick={this.handleDescargar}
            icon="arrowdown"
            style={{ marginLeft: 10, marginRight: 10 }}
          />
          {this.state.isSelected ?
            <Button
              text="Eliminar empresa"
              type="danger"
              onClick={this.handleDelete}
            />
            :
            <Button
              text="Agregar empresa"
              type="success"
              onClick={this.handleAgregarEmpresa}
            />
          }
        </div>

        <DataGrid
          className="custom-table empresas"
          showColumnLines={false}
          showRowLines={false}
          showBorders={false}
          rowAlternationEnabled
          hoverStateEnabled
          ref={(ref) => { if (ref !== null) this.tableRef = ref.instance; }}
          noDataText="Sin resultados"
          onSelectionChanged={this.handleSelect}
          dataSource={this.dataSource}
        >

          <Selection
            showCheckBoxesMode="always"
            mode="multiple"
            allowSelectAll={false}
          />

          <Column
            allowSearch
            caption="Empresa"
            calculateCellValue={(rowData) => `${rowData.CompanyName} ${rowData.CompanyRut}`}
            cellComponent={(row) => (
              <UserInfoColumn
                nombre={row.data.CompanyName}
                rut={row.data.CompanyRut}
              />
            )}
          />

          <Column
            caption="Fecha de asignación"
            dataField="AssignmentDate"
            dataType="date"
          />

          <Paging
            defaultPageSize={this.props.assignedCompaniesPageSize}
          />

          <Pager
            visible
            showInfo
            infoText={(page, total, items) => `Página ${page} de ${total} (${items} resultados)`}
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
  UserInfo: state.global.userData,

  isLoading: state.empresasAutoasignadas.isLoading,
  companies: state.empresasAutoasignadas.assignedCompanies,
  assignedCompaniesPageSize: state.empresasAutoasignadas.assignedCompaniesPageSize,
  updateAssignedCompanies: state.empresasAutoasignadas.updateAssignedCompanies,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => { dispatch(action); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Autoasignadas);
