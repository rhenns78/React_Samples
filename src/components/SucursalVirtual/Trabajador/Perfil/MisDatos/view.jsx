import React from "react";
import { connect } from "react-redux";
import ReactDOM from "react-dom";
import { Form, Button, SelectBox } from "devextreme-react";
import { openCloseToast, setPreventNavigation } from "../../../../Global/actions";
import CardShared from "../../../../Shared/CardUser";

// import DataGrid, {
//   Scrolling,
//   Editing,
//   HeaderFilter,
//   Column,
// } from "devextreme-react/ui/data-grid";
// SelectBox, Button  setValidateMail  callListMyData
import { setMyData, updateMyData, setFamilyMember } from "./actions";
import LoadingOverlay from "../../../../Shared/LoadingOverlay";

import validaciones from "../../../../../helpers/validaciones";
import ModalMessege from "./modalMessges";
// import getForm from "./formFamilyGroup";

const IsapresCmbx = [
  { Id: "1", Description: "Banmédica" },
  { Id: "2", Description: "Colmena Golden Cross S.A" },
  { Id: "3", Description: "Consalud S.A." },
  { Id: "4", Description: "Cruz Blanca S.A" },
  { Id: "5", Description: "Nueva Masvida S.A." },
  { Id: "6", Description: "Vida Tres S.A." },

];


const TipoCuentaCmbx = [
  { Id: "1", Description: "Corriente" },
  { Id: "2", Description: "Vista" },
  { Id: "3", Description: "Ahorro" },

];
const ProfesionCmbx = [
  { Id: "1", Description: "Ing. Informatico" },
  { Id: "2", Description: "Ing. Quimico" },
  { Id: "3", Description: "Ing. Civil" },

];

class MisDatos extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {

      openModal: false,
      messegeModal: "",
      title: "",
      actionCallModal: null,
      deleteEvent: null,


    };

    this.tableRef = React.createRef();


    this.doUpdateMyData = this.doUpdateMyData.bind(this);
  }


  handleChange = (e, value) => {
    const profile = this.props.profile;

    switch (e.element.id) {
      case "MaritalCmbx": {
        // profile.MaritalStatus = estadoCivil.find((item) => item.Id === e.value);
        if (value) {
          const estadoCivilObject = this.props.listaEstadoCivil.find((item) => item.Cod === value);
          profile.MaritalStatus.Id = estadoCivilObject.Cod;
          profile.MaritalStatus.Description = estadoCivilObject.Text;
        }
        break;
      }
      case "comunaCmbx": {
        if (value) {
          const commune = this.props.listaComuna.filter((item) => item.Cod === e.value).map((r) => r.Text);
          profile.Address.Commune = commune[0];
        } else {
          profile.Address.Commune = null;
        }

        break;
      }
      case "regionCmbx": {
        if (value) {
          const region = this.props.listaRegion.filter((item) => item.Cod === e.value).map((r) => r.Text);
          profile.Address.Region = region[0];
        } else {
          profile.Address.Region = null;
          profile.Address.Commune = null;
        }

        break;
      }
      case "Isaprecmbx": {
        if (value) {
          profile.LegalDiscount.Isapre = IsapresCmbx.find((item) => item.Id === value);
        } else {
          profile.LegalDiscount.Isapre.Id = null;
          profile.LegalDiscount.Isapre.Description = null;
        }

        break;
      }
      case "AfpCmbx": {
        // profile.LegalDiscount.AFP = AfpCmbx.find((item) => item.Id === value);
        if (value) {
          const afpObject = this.props.listaAfp.find((item) => item.Cod === value);
          profile.LegalDiscount.AFP.Id = afpObject.Cod;
          profile.LegalDiscount.AFP.Description = afpObject.Text;
        } else {
          profile.LegalDiscount.AFP.Id = null;
          profile.LegalDiscount.AFP.Description = null;
        }
        break;
      }
      case "ProfesionCmbx": {
        if (value) {
          profile.LaborInformation.Ocupation = ProfesionCmbx.find((item) => item.Id === value);
        } else {
          profile.LaborInformation.Ocupation.Id = null;
          profile.LaborInformation.Ocupation.Description = null;
        }

        break;
      }
      case "SectorCmbx": {
        // profile.LaborInformation.Sector = SectorCmbx.find((item) => item.Id === value);
        if (value) {
          const rubroObject = this.props.listaRubro.find((item) => item.Codigo === value);
          profile.LaborInformation.Sector.Id = rubroObject.Codigo;
          profile.LaborInformation.Sector.Description = rubroObject.Rubro;
        } else {
          profile.LaborInformation.Sector.Id = null;
          profile.LaborInformation.Sector.Description = null;
        }

        break;
      }
      case "TipoJornadaCmbx": {
        if (value) {
          // profile.LaborInformation.DayType = TipoJornadaCmbx.find((item) => item.Id === value);
          const jornadaObject = this.props.listaTipoJornada.find((item) => item.Codigo === value);
          profile.LaborInformation.DayType.Id = jornadaObject.Codigo;
          profile.LaborInformation.DayType.Description = jornadaObject.Jornada;
        } else {
          profile.LaborInformation.DayType.Id = null;
          profile.LaborInformation.DayType.Description = null;
        }


        break;
      }
      case "BancosCmbx": {
        if (value) {
          const bancoObject = this.props.listaBancos.find((item) => item.Codigo === value);

          profile.Payment.Bank.Id = bancoObject.Codigo;
          profile.Payment.Bank.Description = bancoObject.Banco;
        } else {
          profile.Payment.Bank.Id = null;
          profile.Payment.Bank.Description = null;
        }


        // profile.Payment.Bank = BancosCmbx.find((item) => item.Id === value);
        break;
      }
      case "TipoCuentaCmbx": {
        if (value) {
          profile.Payment.AccountType = TipoCuentaCmbx.find((item) => item.Id === value);
        } else {
          profile.Payment.AccountType.Id = null;
          profile.Payment.AccountType.Description = null;
        }
        break;
      }
      default:
        break;
    }
    this.compareObject();
  }


  updateFamilyMember = (member) => {
    const familyMember = member.Id;
    this.props.dispatch(setFamilyMember(familyMember));
    this.setState({
      openModal: true,
      title: "Modificar Miembro Familiar",
      messegeModal: null,
      actionCallModal: "UdpateFamilyMember",


    });
  }

  handleBeforeRemove = (member) => {
    const familyMember = member.Id;
    this.props.dispatch(setFamilyMember(familyMember));
    this.setState({
      openModal: true,
      title: "Eliminacion",
      messegeModal: `¿ Seguro desea eliminar a ${familyMember.FullName} ?`,
      actionCallModal: "eliminarGrupoFamiliar",


    });
  }


  handleRemove = () => {
    const event = this.state.deleteEvent;
    const toast = {};
    const {
      profile,
    } = this.props;
    const FamilyGroup = this.props.profile.FamilyGroup ? this.props.profile.FamilyGroup.filter((obj) => obj.Rut !== event.key.Rut) : [];
    profile.FamilyGroup = FamilyGroup;
    this.props.dispatch(setMyData(profile));
    this.setState({
      openModal: false,
    });
    toast.isToastOpen = true;
    toast.msgToast = "Familiar eliminado, guarde los cambios";
    toast.typeStyle = "success";
    this.props.dispatch(openCloseToast(toast));
    this.compareObject();
  }
  closeModal = () => {
    this.setState({
      openModal: false,
      messegeModal: null,
      title: null,
      actionCallModal: null,
      deleteEvent: null,
    });
  }
  handleAdd = () => {
    this.setState({
      openModal: true,
      title: "Nuevo Familiar",
      messegeModal: null,
      actionCallModal: "addFamilyMember",

    });
  }


  doUpdateMyData() {
    const {
      profile,
    } = this.props;
    this.props.dispatch(updateMyData(profile, this.props.mailChanged, this.props.NewEmail));
  }


  changeForm = () => {
    this.compareObject();
  }
  compareObject() {
    if (this.props.preventNavigation === false) {
      this.props.dispatch(setPreventNavigation(true));
    }
  }
  callValidationRut = (e) => {
    if (validaciones.validateRut(e.value)) {
      return true;
    }
    return false;
  }

  renderForm(profile) {
    return (
      <React.Fragment >
        <Form
          formData={profile}
          labelLocation="top"
          showColonAfterLabel={false}
          items={[
            {
              itemType: "group",
              caption: "Datos generales",
              colCount: 1,
              items: [

                {
                  label: { text: "Teléfono" },
                  dataField: "CellPhoneNumber",
                  editorType: "dxTextBox",
                  editorOptions: {
                    mask: "+56\900000000",
                    useMaskedValue: true,
                  },

                },

                {
                  label: { text: "Estado Civil" },
                  dataField: "MaritalStatus",
                  template: (data, itemElement) => {
                    ReactDOM.render(<SelectBox
                      id="MaritalCmbx"
                      placeholder="Seleccione .."
                      dataSource={this.props.listaEstadoCivil}
                      onValueChanged={(item) => this.handleChange(item, item.value)}
                      displayExpr="Text"
                      valueExpr="Cod"
                      defaultValue={profile.MaritalStatus.Id !== null && profile.MaritalStatus.Id}
                    />, itemElement);
                  },


                },

                {
                  label: { text: "Región" },
                  dataField: "Address.Region",
                  template: (data, itemElement) => {
                    ReactDOM.render(<SelectBox
                      id="regionCmbx"
                      placeholder="Seleccione .."
                      dataSource={this.props.listaRegion}
                      onValueChanged={(item) => this.handleChange(item, item.value)}
                      displayExpr="Text"
                      valueExpr="Cod"
                      searchEnabled
                      defaultValue={profile.Address.Region && this.props.listaRegion.filter((item) => item.Text === profile.Address.Region).map((r) => r.Cod)[0]}
                    />, itemElement);
                  },
                },
                {

                  label: { text: "Comuna" },
                  dataField: "Address.Commune",
                  template: (data, itemElement) => {
                    ReactDOM.render(<SelectBox
                      id="comunaCmbx"
                      placeholder="Seleccione .."
                      dataSource={this.props.listaComuna}
                      onValueChanged={(item) => this.handleChange(item, item.value)}
                      displayExpr="Text"
                      valueExpr="Cod"
                      searchEnabled
                      defaultValue={profile.Address.Commune && this.props.listaComuna.filter((item) => item.Text === profile.Address.Commune).map((r) => r.Cod)[0]}
                    />, itemElement);
                  },


                },
                {
                  label: { text: "Calle" },
                  dataField: "Address.Street",
                },
                {
                  label: { text: "Número" },
                  dataField: "Address.Number",
                  editorType: "dxNumberBox",
                },

              ],

            },
            {
              itemType: "group",
              caption: "Datos previsonales",
              colCount: 1,
              items: [{
                label: { text: "Previsión de salud" },
                dataField: "LegalDiscount.Isapre.Description",
                template: (data, itemElement) => {
                  ReactDOM.render(<SelectBox
                    id="Isaprecmbx"
                    placeholder="Seleccione .."
                    dataSource={IsapresCmbx}
                    onValueChanged={(item) => this.handleChange(item, item.value)}
                    displayExpr="Description"
                    valueExpr="Id"
                    searchEnabled
                    defaultValue={profile.LegalDiscount.Isapre && profile.LegalDiscount.Isapre.Id}
                  />, itemElement);
                },

              },
              {
                label: { text: "AFP" },
                dataField: "LegalDiscount.AFP.Description",
                template: (data, itemElement) => {
                  ReactDOM.render(<SelectBox
                    id="AfpCmbx"
                    placeholder="Seleccione .."
                    dataSource={this.props.listaAfp}
                    onValueChanged={(item) => this.handleChange(item, item.value)}
                    displayExpr="Text"
                    valueExpr="Cod"
                    searchEnabled
                    defaultValue={profile.LegalDiscount.AFP.Id ? profile.LegalDiscount.AFP.Id : null}
                  />, itemElement);
                },

              }],
            },
            {
              itemType: "group",
              caption: "Datos laborales",
              colCount: 1,
              items: [{
                label: { text: "Ocupación" },
                dataField: "LaborInformation.Ocupation.Description",
                template: (data, itemElement) => {
                  ReactDOM.render(<SelectBox
                    id="ProfesionCmbx"
                    placeholder="Seleccione .."
                    dataSource={ProfesionCmbx}
                    onValueChanged={(item) => this.handleChange(item, item.value)}
                    displayExpr="Description"
                    valueExpr="Id"
                    searchEnabled
                    defaultValue={profile.LaborInformation.Ocupation && profile.LaborInformation.Ocupation.Id}
                  />, itemElement);
                },

              },
              {
                label: { text: "Rubro" },
                dataField: "LaborInformation.Sector.Description",
                template: (data, itemElement) => {
                  ReactDOM.render(<SelectBox
                    id="SectorCmbx"
                    placeholder="Seleccione .."
                    dataSource={this.props.listaRubro}
                    onValueChanged={(item) => this.handleChange(item, item.value)}
                    displayExpr="Rubro"
                    valueExpr="Codigo"
                    searchEnabled
                    defaultValue={profile.LaborInformation.Sector && profile.LaborInformation.Sector.Id}
                  />, itemElement);
                },


              },
              {
                label: { text: "Jornada de Trabajo" },
                dataField: "LaborInformation.DayType.Description",
                template: (data, itemElement) => {
                  ReactDOM.render(<SelectBox
                    id="TipoJornadaCmbx"
                    placeholder="Seleccione .."
                    dataSource={this.props.listaTipoJornada}
                    onValueChanged={(item) => this.handleChange(item, item.value)}
                    displayExpr="Jornada"
                    valueExpr="Codigo"
                    searchEnabled
                    defaultValue={profile.LaborInformation.DayType && profile.LaborInformation.DayType.Id}
                  />, itemElement);
                },


              },
              ],
            },
            {
              itemType: "group",
              caption: "Datos de pago",
              colCount: 1,
              items: [{
                label: { text: "Banco" },
                dataField: "Payment.Bank.Description",
                template: (data, itemElement) => {
                  ReactDOM.render(<SelectBox
                    id="BancosCmbx"
                    placeholder="Seleccione .."
                    dataSource={this.props.listaBancos}
                    onValueChanged={(item) => this.handleChange(item, item.value)}
                    displayExpr="Banco"
                    valueExpr="Codigo"
                    searchEnabled
                    defaultValue={profile.Payment.Bank && profile.Payment.Bank.Id}
                  />, itemElement);
                },

              },
              {
                label: { text: "Tipo de Cuenta" },
                dataField: "Payment.AccountType.Description",
                template: (data, itemElement) => {
                  ReactDOM.render(<SelectBox
                    id="TipoCuentaCmbx"
                    placeholder="Seleccione .."
                    dataSource={TipoCuentaCmbx}
                    onValueChanged={(item) => this.handleChange(item, item.value)}
                    displayExpr="Description"
                    valueExpr="Id"
                    searchEnabled
                    defaultValue={profile.Payment.AccountType && profile.Payment.AccountType.Id}
                  />, itemElement);
                },

              },
              {
                label: { text: "Número de Cuenta" },
                dataField: "Payment.AccountNumber",
                editorType: "dxNumberBox",
                editorOptions: {
                  inputAttr: {
                    maxLength: 15,
                  },
                },
              }],
            },

          ]}

          onFieldDataChanged={this.changeForm}
        >
        </Form>
      </React.Fragment >
    );
  }


  renderGrupoFamiliar() {
    const userData = [];

    this.props.profile.FamilyGroup.forEach((item) => {
      const Data = {};

      const Relationship = this.props.listaParentesco.filter((r) => r.Codigo === item.Relationship).map((y) => y.Parentesco)[0];
      Data.className = "col-12";
      Data.Header = item.FullName;
      Data.Id = { Rut: item.Rut, FullName: item.FullName, Relationship: item.Relationship };
      // console.log(`split:>${item.FullName.split()}`);

      Data.TextCircle = `${validaciones.getFirstLetter(item.FullName)}`;
      Data.List = [
        { icono: null, text: Relationship, disabled: true },
        { icono: null, text: validaciones.formatRut(item.Rut, { showDots: true, showHyphen: true }), disabled: true },

      ];
      Data.background = "#004A52";
      Data.Button = {
        visible: true,
        BtnList: [{
          id: "BtnEdit",
          className: "material-icons",
          type: "success",
          style: {
            position: "absolute",
            right: 0,
            top: 0,
            backgroundColor: "Transparent",
            border: "none",

          },
          icon: {
            visible: true,
            color: "#004A52",
            name: "edit",
          },
          onClickMethod: this.updateFamilyMember,

        },
        {
          id: "BtnDelete",
          className: "material-icons",
          type: "success",
          style: {
            position: "absolute",
            right: 20,
            top: 0,
            backgroundColor: "Transparent",
            border: "none",

          },
          icon: {
            visible: true,
            color: "#004A52",
            name: "delete",
          },
          onClickMethod: this.handleBeforeRemove,

        },
        ],


      };

      userData.push(Data);
    });


    return (
      <React.Fragment >

        <div className="dx-form-group-with-caption dx-form-group dx-group-colcount-2">
          <span className="dx-form-group-caption" style={{ color: "#004A52", marginTop: 40 }} >Datos familiares</span>
          <Button
            text="Agregar Familiar"
            type="default"
            icon="add"
            style={{
              position: "absolute",
              right: 0,
            }}
            onClick={this.handleAdd}
          />
        </div>
        <div style={{ marginLeft: 3, paddingTop: 10 }}>
          <CardShared userData={userData} />
        </div>
      </React.Fragment>
    );
  }

  render() {
    return (


      <div className="zero row">

        <ModalMessege
          open={this.state.openModal}
          title={this.state.title}
          message={this.state.messegeModal}
          idFamilyMember={this.state.idFamilyMember}
          closeModalCall={this.closeModal}
          actionCallModal={this.state.actionCallModal}
        />

        <div className="col-12 zero" style={{ minHeight: 400, maxWidth: 525 }} >
          {this.props.isLoading && <LoadingOverlay />}
          <div className="col-12 zero miCuenta" >
            <div style={{ marginTop: 10, marginBottom: 5 }}>
              <p>
                Tus datos personales serán utilizados exclusivamente para acelerar
                proceso de gestión en ACHS Virtual
              </p>
            </div>

            {this.props.profile.Rut != null && this.renderForm(this.props.profile)}
            {this.props.profile.Rut != null && this.renderGrupoFamiliar()}
          </div>


        </div>
        <div className="col-12" style={{ marginTop: 20, marginBottom: 5, marginLeft: -13 }}>
          <Button
            text="Guardar cambios"
            type="success"
            onClick={this.doUpdateMyData}
          />
        </div>


      </div>

    );
  }
}

const mapStateToProps = (state) => ({

  isLoading: state.misDatos.isLoading,

  UserInfo: state.global.userData,
  profile: state.misDatos.profile,
  preventNavigation: state.global.preventNavigation,
  mailChanged: state.misDatos.mailChanged,
  NewEmail: state.misDatos.NewEmail,

  // Listas

  // listaProfesiones: state.global.listaProfesiones,
  listaAfp: state.global.listaAfp,
  listaRegion: state.global.listaRegion,
  listaEstadoCivil: state.global.listaEstadoCivil,
  listaBancos: state.global.listaBancos,
  listaTipoJornada: state.global.listaTipoJornada,
  listaRubro: state.global.listaRubro,
  listaComuna: state.global.listaComuna,
  listaParentesco: state.global.listaParentesco,


});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => { dispatch(action); },
});

export default connect(mapStateToProps, mapDispatchToProps)(MisDatos);
