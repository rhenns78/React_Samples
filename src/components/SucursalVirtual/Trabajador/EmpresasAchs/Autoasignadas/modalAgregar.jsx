import React from "react";
import { connect } from "react-redux";
import { Popup, DataGrid, Button, TextBox } from "devextreme-react";
import { Column, Selection, Paging, Pager, RemoteOperations } from "devextreme-react/ui/data-grid";
import DataSource from "devextreme/data/data_source";
import { openCloseModalAgregar, doAddCompanies, updateAllCompanies } from "./actions";
import LoadingOverlay from "../../../../Shared/LoadingOverlay";
import UserInfoColumn from "../../../../Shared/UserInfoColumn";
import { getAllCompanies } from "../../../../../services/EmpresasAutoasignadasApi";

class ModalAgregar extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      disabled: true,
      selectedKeys: [],
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
            pageSize: this.props.allCompaniesPageSize,
          };

          if (options.filter) {
            filter.filter = options.filter.filterValue;
          }

          const request = await getAllCompanies(filter);
          if (request.status === 200) {
            const result = await request.json();
            if (result.Success) {
              companies = result.Companies;
              total = result.TotalRows;
            }
          }

          return {
            data: companies,
            totalCount: total,
          };
        } catch (e) {
          console.error(e);
          return {
            data: [],
            totalCount: 0,
          };
        }
      },
    });
  }

  componentDidUpdate = (prevProps) => {
    if (!prevProps.updateAllCompanies && this.props.updateAllCompanies) {
      this.tableRef.refresh();
      this.props.dispatch(updateAllCompanies(false));
    }
  }


  handleClose = () => {
    this.props.dispatch(openCloseModalAgregar(false));
    this.setState({
      disabled: true,
      selectedKeys: [],
    });
  }

  handleAgregar = () => {
    this.props.dispatch(doAddCompanies(
      this.props.UserInfo.RUT,
      this.tableRef.getSelectedRowsData(),
      this.handleClose,
    ));
  }

  handleSelect = (e) => {
    this.setState({ disabled: !e.selectedRowsData.length, selectedKeys: e.selectedRowKeys });
  }

  handleSearch = (e) => {
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.tableRef.searchByText(e.value);
    }, 300);
  }

  render() {
    return (
      <Popup
        visible={this.props.isOpenModalAgregar}
        onHiding={this.handleClose}
        title="Agregar empresa"
        showTitle
        maxWidth={600}
        maxHeight={600}
        dragEnabled={false}
      >
        <div>
          {this.props.isLoading && <LoadingOverlay />}
          <div style={{ display: "flex", marginBottom: 10, marginTop: 10 }}>
            <TextBox
              placeholder="Buscar empresa"
              mode="search"
              style={{ flexGrow: 1 }}
              onValueChanged={this.handleSearch}
              valueChangeEvent="keyup"
            />
          </div>

          <DataGrid
            className="custom-table"
            height={390}
            showColumnLines={false}
            showRowLines={false}
            showBorders={false}
            rowAlternationEnabled
            hoverStateEnabled
            ref={(ref) => { if (ref !== null) this.tableRef = ref.instance; }}
            noDataText="Sin resultados"
            dataSource={this.dataSource}
            onSelectionChanged={this.handleSelect}
            selectedRowKeys={this.state.selectedKeys}
          >

            <Selection
              showCheckBoxesMode="always"
              mode="multiple"
              allowSelectAll={false}
            />

            <Column
              allowSearch
              caption="Empresa"
              calculateCellValue={(rowData) => `${rowData.Name} ${rowData.CompanyRut}`}
              cellComponent={(row) => (
                <UserInfoColumn
                  nombre={row.data.Name}
                  rut={row.data.CompanyRut}
                />
              )}
            />

            <Paging
              defaultPageSize={this.props.allCompaniesPageSize}
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

          <div className="button-row">
            <Button
              onClick={this.handleClose}
              style={{ marginRight: 20 }}
              text="Cancelar"
            />

            <Button
              onClick={this.handleAgregar}
              type="success"
              style={{ marginLeft: 20 }}
              disabled={this.state.disabled}
              text="Agregar empresa"
            />
          </div>
        </div>
      </Popup>
    );
  }
}

const mapStateToProps = (state) => ({
  UserInfo: state.global.userData,

  isOpenModalAgregar: state.empresasAutoasignadas.isOpenModalAgregar,
  isLoading: state.empresasAutoasignadas.isLoading,
  allCompanies: state.empresasAutoasignadas.allCompanies,
  allCompaniesPageSize: state.empresasAutoasignadas.allCompaniesPageSize,
  updateAllCompanies: state.empresasAutoasignadas.updateAllCompanies,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => { dispatch(action); },
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalAgregar);
