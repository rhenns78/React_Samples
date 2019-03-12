
import React from "react";
import { connect } from "react-redux";
import { Button, Popup, SelectBox } from "devextreme-react";
import { setMyData, callSucursales } from "./actions";
import { openCloseToast, setPreventNavigation } from "../../../../Global/actions";
import validaciones from "../../../../../helpers/validaciones";
const cancelButtonStyle = {
  paddingLeft: 30,
  paddingRight: 30,
};

const buttonStyle = {
  paddingLeft: 30,
  paddingRight: 30,
};

// const SucursalCmbx = [
//   { Sucursal: "Centro-Concepcion" },
//   { Sucursal: "Centro-Santiago" },
//   { Sucursal: "ñuble" },
//   { Sucursal: "Mall Plaza-Concepcion" },
//   { Sucursal: "Mirador BioBio" },
//   { Sucursal: "Centro-Arica" },

// ];

class Empresa extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      index: null,
      sucursalvalue: null,
      oldSucursal: null,
      rutEmpresa: null,
      nombre: null,
    };
  }


  renderBox(item, index, tipo) {
    return (


      <div
        className="col-5"
        id={tipo + index}
        key={tipo + index}
        style={{
          color: "rgb(33, 33, 33)",
          backgroundColor: "rgb(255, 255, 255)",
          transition: "all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms",
          boxSizing: "border-box",
          borderRadius: "10px",
          marginBottom: "0px",
          marginLeft: "20px",
          border: "1px solid rgb(224, 224, 224)",

        }}
      >
        <div className="row justify-content-left" style={{ margin: "0px 0px 0px", padding: "0px 1px 25px" }}>

          <div className="row" style={{ marginTop: 5, padding: 20 }}>
            <div className="col-3">
              <span className="text-left"> Empresa </span >
            </div>
            <div className="col-9">

              <p style={{ fontWeight: "bold" }}>
                {item.Nombre}
              </p>

            </div>
            <div className="col-3">
              <span className="text-left"> Rut </span >
            </div>
            <div className="col-9">

              <p style={{ fontWeight: "bold" }}>
                {
                  validaciones.formatRut(item.RutEmpresa, { showDots: true, showHyphen: true })
                }
              </p>

            </div>
            {
              tipo === "company" ?

                <React.Fragment >
                  <div className="col-3">
                    <span className="text-left"> Sucursal </span >
                  </div>
                  <div className="col-9">

                    <p
                      style={{
                        fontWeight: "bold",
                        wordWrap: "break-word",
                        whiteSpace: "normal",
                        overflow: "auto",
                      }}
                    >
                      {item.Sucursal}
                    </p>

                  </div>
                  <Button
                    style={{
                      position: "absolute",
                      left: 25,
                      bottom: 5,

                    }}
                    type="success"
                    text={item.Sucursal ? "Modificar Sucursal" : "Agregar Sucursal "}
                    onClick={() => this.openModal(item, index)}
                  />
                </React.Fragment>
                :
                null
            }

          </div>


        </div>
      </div>

    );
  }


  openModal = (item, index) => {
    this.props.dispatch(callSucursales(item.RutEmpresa));
    this.setState({
      openModal: true,
      index,
      sucursalvalue: item.Sucursal,
      oldSucursal: item.Sucursal,
      rutEmpresa: item.RutEmpresa,
      nombre: item.Nombre,
    });
  }

  onChangeSucursales(e, value, index) {
    switch (e.element.id) {
      case "sucursalCmbx": {
        this.setState({
          sucursalvalue: value,
        });

        break;
      }


      default:
        break;
    }
  }
  handleSave = () => {
    const company = this.props.profile.Company.length > 0 ? this.props.profile.Company : [];
    const profile = this.props.profile;
    if (company.length > 0) {
      company.forEach((item) => {
        if (item.RutEmpresa === this.state.rutEmpresa && item.Nombre === this.state.nombre && item.Sucursal === this.state.oldSucursal) {
          item.Sucursal = this.state.sucursalvalue;
        }
      });
    }

    this.setState({
      openModal: false,
    });

    profile.company = company;

    this.props.dispatch(setMyData(profile));
    const toast = {};
    toast.isToastOpen = true;
    toast.msgToast = "Ingreso de sucursal realizada";
    toast.typeStyle = "success";
    this.props.dispatch(openCloseToast(toast));
    if (this.props.preventNavigation === false) {
      this.props.dispatch(setPreventNavigation(true));
    }
  }
  handleCerrar = () => {
    this.setState({
      openModal: false,
    });
  }

  render() {
    const {
      source,
      tipo,

    } = this.props;


    return (
      <div>

        <div className="row " >


          { source ?


            source.map((item, index) => this.renderBox(item, index, tipo))

            : null

          }


        </div>
        <Popup
          visible={this.state.openModal}
          dragEnabled={false}
          maxHeight="200px"
          onHiding={this.handleCerrar}
          maxWidth="500px"
          title="Listado Sucursales"
          showTitle
          contentRender={() => (<div>
            <div className="col-12" style={{ justifyContent: "center" }}>
              {this.props.listadoSucursales && this.props.listadoSucursales.length === 0 &&
                <div style={{ width: "100%", textAlign: "center" }}>
                  <strong style={{ color: "red" }}> No se tiene información de sucursales </strong>
                </div>

              }

              <div style={{ width: "100%", textAlign: "center" }}>
                <h3><p className="text-left">Seleccione Sucursal</p></h3>
                <SelectBox
                  id="sucursalCmbx"
                  placeholder="Seleccione .."
                  dataSource={this.props.listadoSucursales}
                  onValueChanged={(data) => this.onChangeSucursales(data, data.value, this.state.index)}
                  displayExpr="Direccion"
                  valueExpr="Direccion"
                  defaultValue={this.state.sucursalvalue}
                  searchEnabled
                />
              </div>
            </div>
            <div
              style={{
                position: "fixed", bottom: 10, width: "87%", textAlign: "center",
              }}
            >
              <Button
                text="Cerrar"
                type="normal"
                onClick={this.handleCerrar}
                style={{ ...cancelButtonStyle, marginRight: 15 }}
              />
              <Button
                text="Guardar"
                type="success"
                style={buttonStyle}
                disabled={!!(this.props.listadoSucursales && this.props.listadoSucursales.length === 0)}
                onClick={this.handleSave}
              />

            </div>
                                </div>)}
        />

      </div>

    );
  }
}
const mapStateToProps = (state) => ({

  isLoading: state.misDatos.isLoading,
  UserInfo: state.global.userData,
  profile: state.misDatos.profile,
  preventNavigation: state.global.preventNavigation,
  listadoSucursales: state.global.listadoSucursales,

});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => { dispatch(action); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Empresa);
