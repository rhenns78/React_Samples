import React from "react";
import DataGrid, { Column, HeaderFilter } from "devextreme-react/ui/data-grid";
// import { Button } from "devextreme-react";

class TablaArchivos extends React.PureComponent {
  render() {
    const {
      documento,
      openFile,
    } = this.props;


    return (
      <div>

        <DataGrid
          showBorders={false}
          showColumnLines={false}
          showRowLines={false}
          noDataText="Sin documentos"
          rowAlternationEnabled
          dataSource={documento}
        >
          <HeaderFilter visible />
          <Column dataField="Code" caption="Codigo" allowFiltering />
          <Column
            dataField="Description"
            caption="Documento"
            allowFiltering={false}
            cellComponent={(row) => (<div style={{ display: "flex", alignItems: "center" }}>
              <i className="material-icons" style={{ marginRight: 5 }}>insert_drive_file</i>
              {row.data.Description}
            </div>)}
          />
          <Column
            caption="Abrir"
            dataField="DocumentId"
            cellComponent={(row) =>
              (
                <i
                  className="material-icons"
                  onClick={() => openFile(row.data.DocumentId)}
                  style={{ color: "green", cursor: "pointer" }}
                >open_in_new
                </i>
              )
            }
          />

        </DataGrid>

      </div>
    );
  }
}

export default TablaArchivos;
