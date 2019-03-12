import React from 'react';

class TabItem extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
    }
  }

  render () {
    const {
      isActive,
      index,
      data,
      isLast,
    } = this.props;

    let styleTab = {};
    if (index === 0) styleTab.borderTopLeftRadius = 10;
    if (isLast) styleTab.borderTopRightRadius = 10;

    return (
      <div 
        className="tabStyle"
        onMouseEnter={() => this.setState({hover: true})}
        onMouseLeave={() => this.setState({hover: false})}
        style={styleTab}
      >
        <span>{data.Name}</span>
        <div className={`iconStyle ${isActive ? 'activeIcon' : ''}`}
        >
          <span>{data.Number}</span>
        </div>
      </div> 
    );
  }
}

export default TabItem;
