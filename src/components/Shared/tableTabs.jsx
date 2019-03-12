import React from "react";
import ReactDOM from "react-dom";
import { Tabs } from "devextreme-react";
import TabItem from "./tabItem";

class TableTabs extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
    };
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.selectedSiniestro && this.props.selectedSiniestro.IdSiniestro
      && prevProps.selectedSiniestro.IdSiniestro == null) {
      this.setState({ index: 0 });
    }
  }

  handleTabChange = (event) => {
    if (event.addedItems.length) {
      this.props.changeTabCallback(event.addedItems[0].contentId);
      this.setState({ index: event.addedItems[0].index });
    }
  }

  render() {
    return (
      <div className="row zero tabWrapper">
        <Tabs
          className="tabsRoles"
          dataSource={this.props.tabs}
          height={44.5}
          scrollByContent
          keyExpr="index"
          selectedIndex={this.state.index}
          defaultSelectedItemKeys={[0]}
          showNavButtons
          onSelectionChanged={this.handleTabChange}
          itemTemplate={(itemData, index, element) => {
            ReactDOM.render(<TabItem
              data={itemData}
              index={index}
              isActive={itemData.index === this.props.index}
              isLast={index === this.props.tabs.length - 1}
            />, element);
          }}
        />
      </div>
    );
  }
}

export default TableTabs;
