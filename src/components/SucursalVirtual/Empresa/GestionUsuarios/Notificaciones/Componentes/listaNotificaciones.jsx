import React from "react";
import { List } from "devextreme-react";
import NotificationItem from "./notificationItem";

class ListaNotificaciones extends React.PureComponent {
  handleviewDetails = (e) => {
    if (this.props.onDetails) this.props.onDetails(e);
  }

  handleSelectionChange = (e) => {
    if (this.props.onSelection) this.props.onSelection(e);
  }

  isItemSelected = (data) => {
    if (this.props.selected && this.props.selected.length) {
      if (this.props.selected.findIndex((item) => item.NotificationGroupCode === data.NotificationGroupCode) !== -1) {
        return true;
      }
    }

    return false;
  }

  render() {
    return (
      <React.Fragment>
        <List
          onItemClick={this.handleviewDetails}
          className="list-notificaciones-empresa"
          noDataText="Sin notificaciones"
          items={this.props.data}
          selectionMode={this.props.selectionMode}
          selectedItems={this.props.selected || []}
          onSelectionChanged={this.handleSelectionChange}
          itemComponent={(data) => (
            <NotificationItem
              {...data}
              hideDetails={this.props.hideDetails}
              hideNumbers={this.props.hideNumbers}
              showCheck={this.props.showCheck}
              selected={this.isItemSelected(data)}
            />
          )}
        />
      </React.Fragment>
    );
  }
}

export default ListaNotificaciones;
