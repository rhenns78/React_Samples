import React from "react";
import { List, Button } from "devextreme-react";

class CardUser extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      hover: false,
    };
  }

  handleHover = (hover) => {
    this.setState({ hover });
  }
  list = (item) => (
    <div className="card-information">
      <div>
        {item.icono ?
          <i
            className="material-icons"
          >
            {item.icono}
          </i>
          :
          <span>
            {item.iconText}
          </span>
        }
      </div>
      <span>
        {item.text}
      </span>

    </div>
  )
  renderBox(Data, index, seccion) {
    const buttons = [];

    if (Data.Button.visible === true) {
      Data.Button.BtnList.forEach((element) => {
        buttons.push((
          <Button
            key={element.id + index}
            className={element.className}
            style={element.style}
            type={element.type}
            text={element.text}
            width={element.style.width}
            onClick={() => element.onClickMethod(Data, index)}
          >
            {element.icon.visible === true ?
              <i className="material-icons" style={{ fontSize: 16, color: element.icon.color }} > {element.icon.name} </i>
              : null
            }
          </Button>
        ));
      });
    }

    return (
      <div
        className={Data.className}
        id={seccion + index}
        key={seccion + index}
      >

        <div className="row userCard" style={Data.noTopSpace ? { marginTop: 0 } : {}}>
          {Data.TextCircle !== null && (
            <div className="col-12 userCircle" style={Data.background ? { background: Data.background } : { background: "inherit" }}>
              <div className="userTextCircle">
                {Data.TextCircle}
              </div>
            </div>
          )

          }

          {Data.multiple ? Data.Lists.map((item) => (
            <div className="col-12 cardInfo" key={item.title}>
              <h4>
                {item.title}
              </h4>

              <List
                selectionMode="none"
                className="company-select-list"
                dataSource={item.list}
                itemComponent={this.list}
              />
            </div>
          ))
            :
            (
              <div className="col-12 cardInfo">
                <h4>
                  {Data.Header}
                </h4>
                <List
                  selectionMode="none"
                  className={`company-select-list ${Data.borderBotton ? "showBorder" : "-"}`}
                  dataSource={Data.List}
                  itemComponent={this.list}
                />
                {buttons}
              </div>
            )
          }

        </div>
      </div>
    );
  }

  render() {
    const {
      userData,
    } = this.props;


    return (
      <div>
        {userData.sort((a, b) => a.Header - b.Header).map((item, index) => this.renderBox(item, index, "usuario"))}
      </div>
    );
  }
}

export default CardUser;
