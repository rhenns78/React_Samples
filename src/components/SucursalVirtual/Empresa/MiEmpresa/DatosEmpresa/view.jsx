import React from "react";
import { connect } from "react-redux";
import CardUser from "../../../../Shared/CardUser";
import helper from "../../../../../helpers/validaciones";
import { dataSucursalMock } from "./mocks";

const sucursalMensaje = [
  {
    className: "col-5",
    Header: null,
    noTopSpace: false,
    borderBotton: false,
    TextCircle: null,
    List: [
      {
        id: "warning", icono: "warning", text: "Selecciona una sucursal para ver su información", disabled: true,
      },

    ],
    Button: {
      visible: false,
    },
  },
];

class DatosEmpresa extends React.PureComponent {
  getCompanyData = () => {
    const Data = {};
    Data.className = "col-5";
    Data.Header = this.props.companyName;
    Data.TextCircle = `${helper.getFirstLetter(this.props.companyName)}`;
    Data.List = [
      {
        id: "Rut", icono: "fingerprint", text: helper.formatRut(this.props.companyId, { showDots: true, showHyphen: true }), disabled: true,
      },
      {
        id: "Birth", icono: "calendar_today", text: "Ahumada 25, Santiago", disabled: true,
      },
      {
        id: "Email", icono: "email", text: "email@gmail.com", disabled: true,
      },
      {
        id: "Phone", icono: "phone", text: "+569 98665623", disabled: true,
      },
    ];
    Data.Button = {
      visible: false,
    };
    Data.background = "#004A52";

    return [
      Data,
    ];
  }

  getRepresentanteData = () => {
    const Data = {};
    Data.className = "col-5";
    Data.Header = "José Falabella";
    Data.TextCircle = `${helper.getFirstLetter("José")}${helper.getFirstLetter("Falabella")}`;
    Data.List = [
      {
        id: "Rut", icono: "fingerprint", text: helper.formatRut("70.360.100-6", { showDots: true, showHyphen: true }), disabled: true,
      },
      {
        id: "Birth", icono: "calendar_today", text: "Ramón Carnicer", disabled: true,
      },
    ];
    Data.Button = {
      visible: false,
    };
    Data.background = "#32945B";

    return [
      Data,
    ];
  }

  getSucursalData = () => {
    const data = dataSucursalMock(this.props.sucursalName);
    return data;
  }

  render() {
    return (
      <div className="row zero user-card-info">
        <div className="col-12 zero-left card-empresas">

          <div className="card-empresas-section-first dx-form-group-with-caption dx-form-group dx-group-colcount-2">
            <span className="dx-form-group-caption">Empresa</span>
            <CardUser userData={this.getCompanyData()} />
          </div>

          <div className="card-empresas-section-second dx-form-group-with-caption dx-form-group dx-group-colcount-2">
            <span className="dx-form-group-caption">Representante legal</span>
            <CardUser userData={this.getRepresentanteData()} />
          </div>

          {this.props.sucursalId !== "" && (
            <div className="card-empresas-section-second dx-form-group-with-caption dx-form-group dx-group-colcount-2">
              <span className="dx-form-group-caption">Sucursal</span>
              <CardUser userData={this.getSucursalData()} />
            </div>
          )}
          {this.props.sucursalId === "" && (
            <div className="card-empresas-section-second dx-form-group-with-caption dx-form-group dx-group-colcount-2">
              <span className="dx-form-group-caption">Sucursal</span>
              <CardUser userData={sucursalMensaje} />
            </div>
          )}

        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.misDatos.isLoading,
  UserInfo: state.global.userData,
  companyId: state.global.companyId,
  companyName: state.global.companyName,
  sucursalId: state.global.sucursalId,
  sucursalName: state.global.sucursalName,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => { dispatch(action); },
});

export default connect(mapStateToProps, mapDispatchToProps)(DatosEmpresa);
