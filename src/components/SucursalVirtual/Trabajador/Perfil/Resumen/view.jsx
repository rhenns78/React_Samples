import React from "react";
import { connect } from "react-redux";
import { Button, Popup, SelectBox } from "devextreme-react";
import CardShared from "../../../../Shared/CardUser";
import { getMyData, callSucursales, updateMyData } from "../MisDatos/actions";
import helper from "../../../../../helpers/validaciones";
import LoadingOverlay from "../../../../Shared/LoadingOverlay";

class MisDatos extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      index: null,
      sucursalvalue: null,
      oldSucursal: null,
      rutEmpresa: null,
      nombre: null,
      seccionUpdate: null,

    };

    this.props.dispatch(getMyData(this.props.UserInfo.RUT));
  }

  renderUsuario(profile) {
    const Data = {};
    const userData = [];
    Data.className = "col-5";
    Data.Header = `${profile.Name} ${profile.MiddleName !== null ? profile.MiddleName : ""} ${profile.FatherLastName} ${profile.MotherLastName !== null ? profile.MotherLastName : ""}`;
    Data.TextCircle = `${helper.getFirstLetter(profile.Name)}${helper.getFirstLetter(profile.FatherLastName)}`;
    Data.List = [
      {
        id: "Rut", icono: "fingerprint", text: helper.formatRut(profile.Rut, { showDots: true, showHyphen: true }), disabled: true,
      },
      {
        id: "Birth", icono: "calendar_today", text: "S/D", disabled: true,
      },
      {
        id: "Email", icono: "email", text: profile.Email, disabled: true,
      },
      {
        id: "BackEmail", icono: "email", text: profile.AlternativeEmail ? profile.AlternativeEmail : "S/D", disabled: true,
      },
      {
        id: "Phone", icono: "phone", text: profile.CellPhoneNumber ? profile.CellPhoneNumber : "S/D", disabled: true,
      },
    ];
    Data.Button = {
      visible: false,
    };
    Data.background = "#004A52";
    userData.push(Data);

    return (
      <React.Fragment >

        <CardShared userData={userData} />

      </React.Fragment>
    );
  }
  renderComanyAdmin(profile) {
    const userData = [];

    profile.Companies.forEach((item) => {
      const Data = {};
      Data.className = "col-5";
      Data.Header = item.Nombre;
      Data.TextCircle = `${helper.getFirstLetter(item.Nombre)}`;
      Data.List = [
        { icono: "fingerprint", text: helper.formatRut(item.RutEmpresa, { showDots: true, showHyphen: true }), disabled: true },
        { icono: "location_city", text: item.Sucursal ? item.Sucursal : "S/D", disabled: true },
      ];
      Data.Id = { RutEmpresa: item.RutEmpresa, Sucursal: item.Sucursal, seccionUpdate: "companies" };

      Data.background = "#32945B";
      Data.Button = {
        visible: true,
        BtnList: [{
          id: "BtnEditar",
          className: "slimButton",
          type: "success",
          style: {
            position: "absolute",
            right: 15,
            bottom: 2,
            width: 130,
          },
          icon: {
            visible: false,
          },
          onClickMethod: this.callModalSucursal,
          text: item.Sucursal ? "Modificar Sucursal" : "Agregar Sucursal",

        }],


      };

      userData.push(Data);
    });

    return (
      <React.Fragment >
        <CardShared userData={userData} />
      </React.Fragment>
    );
  }
  callModalSucursal = (Data, index) => {
    this.props.dispatch(callSucursales(helper.formatRut(Data.Id.RutEmpresa, { showDots: false, showHyphen: true })));

    this.setState({
      openModal: true,
      index: Data.Id.Id,
      sucursalvalue: Data.Id.Sucursal,
      oldSucursal: Data.Id.Sucursal,
      rutEmpresa: helper.formatRut(Data.Id.RutEmpresa, { showDots: false, showHyphen: true }),
      nombre: Data.Header,
      seccionUpdate: Data.Id.seccionUpdate,
    });
  }
  onChangeSucursales(e, value) {
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
  handleCerrar = () => {
    this.setState({
      openModal: false,
      index: null,
      sucursalvalue: null,
      oldSucursal: null,
      rutEmpresa: null,
      nombre: null,
      seccionUpdate: null,
    });
  }
  handleSave = () => {
    const Company = this.props.profile.Company.length > 0 ? this.props.profile.Company : [];
    const Companies = this.props.profile.Companies.length > 0 ? this.props.profile.Companies : [];
    const {
      profile,
    } = this.props;

    if (this.state.seccionUpdate === "company") {
      if (Company.length > 0) {
        Company.forEach((item) => {
          if (item.RutEmpresa === this.state.rutEmpresa && item.Nombre === this.state.nombre && item.Sucursal === this.state.oldSucursal) {
            item.Sucursal = this.state.sucursalvalue;
          }
        });
      }
      profile.Company = Company;
    }
    if (this.state.seccionUpdate === "companies") {
      if (Companies.length > 0) {
        Companies.forEach((item) => {
          if (item.RutEmpresa === this.state.rutEmpresa && item.Nombre === this.state.nombre && item.Sucursal === this.state.oldSucursal) {
            item.Sucursal = this.state.sucursalvalue;
          }
        });
      }
      profile.Companies = Companies;
    }

    this.props.dispatch(updateMyData(profile));
    this.handleCerrar();
  }
  renderComany(profile) {
    const userData = [];

    profile.Company.forEach((item, index) => {
      const Data = {};
      Data.className = "col-5";
      Data.Header = item.Nombre;
      Data.TextCircle = `${helper.getFirstLetter(item.Nombre)}`;
      Data.List = [
        {
          id: "Rut", icono: "fingerprint", text: helper.formatRut(item.RutEmpresa, { showDots: true, showHyphen: true }), disabled: true,
        },
        {
          id: "Sucursal", icono: "location_city", text: item.Sucursal ? item.Sucursal : "S/D", disabled: true,
        },
      ];
      Data.Id = {
        Id: index, RutEmpresa: item.RutEmpresa, Sucursal: item.Sucursal, seccionUpdate: "company",
      };
      Data.background = "#C10068";
      Data.Button = {
        visible: true,
        BtnList: [{
          id: "BtnSucursal",
          className: "slimButton",
          type: "success",
          style: {
            position: "absolute",
            right: 15,
            bottom: 2,
            width: 130,
          },
          icon: {
            visible: false,

          },
          onClickMethod: this.callModalSucursal,
          text: item.Sucursal ? "Modificar Sucursal" : "Agregar Sucursal",

        }],


      };
      userData.push(Data);
    });


    return (
      <React.Fragment >
        <CardShared userData={userData} />
      </React.Fragment>
    );
  }
  render() {
    return (
      <div className="zero row user-card-info">
        <div className="col-12 zero-left card-empresas">
          {this.props.isLoading && <LoadingOverlay />}
          {this.props.profile.Rut != null ?
            <div className="card-empresas-section-first dx-form-group-with-caption dx-form-group dx-group-colcount-2">
              <span className="dx-form-group-caption">Usuario</span>
              {this.renderUsuario(this.props.profile)}
            </div>
            : null
          }
          {this.props.profile.Rut != null && this.props.profile.Company.length > 0 ?

            <div className="card-empresas-section-second dx-form-group-with-caption dx-form-group dx-group-colcount-2">
              <span className="dx-form-group-caption" >Empresa donde trabajo</span>
              {this.renderComany(this.props.profile)}
            </div>

            :
            null


          }
          {this.props.profile.Rut != null && this.props.profile.Companies.length > 0 ?

            <div className="card-empresas-section-second dx-form-group-with-caption dx-form-group dx-group-colcount-2">
              <span className="dx-form-group-caption">Empresas que administro</span>
              {this.renderComanyAdmin(this.props.profile)}

            </div>

            :
            null


          }


        </div>
        <Popup
          visible={this.state.openModal}
          dragEnabled={false}
          maxHeight="220px"
          onHiding={this.handleCerrar}
          maxWidth="500px"
          title="Sucursales"
          className="administrar-sucursal-select"
          showTitle
          contentRender={() => (
            <div className="modal-sucursal-select">
              <div className="col-12 center">
                {this.props.listadoSucursales && this.props.listadoSucursales.length === 0 &&
                  <div className="text">
                    <h5> Ha ocurrido un error y/o no se han encontrado sucursales </h5>
                  </div>
                }

                {
                  this.props.listadoSucursales && this.props.listadoSucursales.length > 0 &&
                  <div className="select">
                    <h5>Seleccione la sucursal donde trabaja</h5>
                    <SelectBox
                      id="sucursalCmbx"
                      placeholder="Seleccione .."
                      dataSource={this.props.listadoSucursales}
                      onValueChanged={(data) => this.onChangeSucursales(data, data.value, this.state.index)}
                      displayExpr="Direccion"
                      valueExpr="Direccion"
                      value={this.state.sucursalvalue}
                      searchEnabled
                    />
                  </div>
                }

              </div>
              <div className="buttons">
                <Button
                  text="Cerrar"
                  type="normal"
                  className="cancel"
                  onClick={this.handleCerrar}
                />
                <Button
                  text="Guardar"
                  type="success"
                  className="success"
                  disabled={!!(this.props.listadoSucursales && this.props.listadoSucursales.length === 0)}
                  onClick={this.handleSave}
                />

              </div>
            </div>
          )}
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

export default connect(mapStateToProps, mapDispatchToProps)(MisDatos);
