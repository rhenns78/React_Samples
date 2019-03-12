import React from "react";
import { DataGrid, TextBox } from "devextreme-react";
import { Selection, Column } from "devextreme-react/ui/data-grid";
import UserInfoColumn from "../../../../../Shared/UserInfoColumn";

class ListaUsuarios extends React.PureComponent {
  constructor(props) {
    super(props);

    this.tableRef = React.createRef();
    this.timeout = 0;
  }
  handleSelection = (event) => {
    if (this.props.onSelect) this.props.onSelect(event);
  }

  handleSearch = (e) => {
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.tableRef.searchByText(e.value);
      // console.log(e.value);
    }, 300);
  }
  renderGridInterno() {
    return (
      <DataGrid
        dataSource={this.props.usuarios}
        showBorders={false}
        ref={(ref) => { if (ref !== null) this.tableRef = ref.instance; }}
        onSelectionChanged={this.handleSelection}
        showColumnLines={false}
        selectedRowKeys={this.props.selected}
        showRowLines={false}
        height={this.props.height || undefined}
        noDataText="Sin resultados"
        // className="tabla-siniestros-general usuarios"
        className="custom-table"
        rowAlternationEnabled
        hoverStateEnabled
      >

        <Selection
          showCheckBoxesMode="always"
          mode="multiple"
          allowSelectAll={false}
        />

        <Column
          allowSearch
          caption="Trabajador"
          dataField="name"
          calculateCellValue={(rowData) => `${rowData.EmployeeName} ${rowData.EmployeeRut}`}
          cellComponent={(row) => (
            <UserInfoColumn
              nombre={row.data.EmployeeName}
              rut={row.data.NotificationGroupCode ? row.data.EmployeeRut : row.data.Rut}
            />
          )}
        />
        <Column
          allowSearch={false}
          caption="Rol empresa"
          cssClass="columna-rol"
          dataField="Roles"
          calculateCellValue={(rowData) => {
            if (rowData.NotificationGroupCode) {
              return rowData.Roles ? rowData.Roles.join(", ") : "";
            }
            return rowData.Roles ? rowData.Roles.map((e) => e.Name ? e.Name : e.Description).join(", ") : "";
          }}
        />
        <Column
          visible={!this.props.hideDate}
          caption="Fecha de asignación"
          dataField="asignDate"
          dataType="date"
          calculateDisplayValue={(props) => props.date || "S/D"}
        />
      </DataGrid>
    );
  }
  renderGridExterno() {
    return (
      <DataGrid
        dataSource={this.props.usuarios}
        showBorders={false}
        ref={(ref) => { if (ref !== null) this.tableRef = ref.instance; }}
        onSelectionChanged={this.handleSelection}
        showColumnLines={false}
        selectedRowKeys={this.props.selected}
        showRowLines={false}
        height={this.props.height || undefined}
        noDataText="Sin resultados"
        className="custom-table"
        rowAlternationEnabled
        hoverStateEnabled
      >
        <Selection
          showCheckBoxesMode="always"
          mode={this.props.availableListUser !== true ? "multiple" : "single"}
          allowSelectAll={false}
        />
        <Column
          allowSearch
          caption="Trabajador"
          dataField="Name"
          calculateCellValue={(rowData) => `${rowData.Name} ${rowData.LastName}`}

        />
        <Column
          allowSearch
          caption="Email"
          dataField="Email"
        />
        <Column
          allowSearch
          caption="Telefono"
          dataField="Cellphone"
        />
      </DataGrid>
    );
  }
  render() {
    return (
      <React.Fragment>
        <div style={{ display: "flex", marginBottom: 10, marginTop: 10 }}>
          <TextBox
            placeholder="Buscar trabajador"
            mode="search"
            style={{ flexGrow: 1 }}
            onValueChanged={this.handleSearch}
            valueChangeEvent="keyup"
          />
          {this.props.actions}
        </div>


        {this.props.typeUserRelationFilter === "INT" && this.renderGridInterno() }
        {this.props.typeUserRelationFilter === "EXT" && this.renderGridExterno() }


      </React.Fragment>
    );
  }
}

export default ListaUsuarios;
