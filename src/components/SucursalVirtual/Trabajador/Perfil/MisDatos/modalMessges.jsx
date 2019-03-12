import React from "react";
import { connect } from "react-redux";
import { Button, Popup, TextBox, SelectBox } from "devextreme-react";
import validacion from "../../../../../helpers/validaciones";
import { setFamilyMember } from "./actions";
// import { setPreventNavigation } from "../../../../Global/actions";
import { openCloseToast, setPreventNavigation } from "../../../../Global/actions";
const cancelButtonStyle = {
  paddingLeft: 30,
  paddingRight: 30,
};

const buttonStyle = {
  paddingLeft: 30,
  paddingRight: 30,
};

class ModalMesseges extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.handleChange = this.handleChange.bind(this);
  }


  get initialState() {
    return {
      fromIsValid: false,
      isEmailFormHide: false,
      isValidRut: false,

    };
  }
  resetBuilder() {
    this.setState(this.initialState);
  }
  handleChange(e) {
    const ident = (typeof e === "object") ? e.element.id : "";
    let errorTxt = "";
    const familyMember = this.props.familyMember;
    let isValidRut = this.state.isValidRut;
    switch (ident) {
      case "rut": {
        if (e.value !== "") {
          if (validacion.validateRut(e.value) === false) {
            errorTxt = "Formato de rut inválido";
            isValidRut = false;
            familyMember.Rut = null;
          } else {
            isValidRut = true;
          }
        } else {
          errorTxt = "Rut no puede quedar vacío";
          isValidRut = false;
          familyMember.Rut = null;
        }
        if (isValidRut) {
          familyMember.Rut = e.value;
        } else {
          familyMember.Rut = null;
        }

        e.component.option({
          validationError: { message: errorTxt },
          isValid: isValidRut,
        });


        break;
      }
      case "fullname": {
        if (e.value === "" || e.value.trim() === "") {
          errorTxt = "Nombre no puede quedar vacio";
          familyMember.FullName = null;
        } else {
          familyMember.FullName = e.value;
        }

        e.component.option({
          validationError: { message: errorTxt },
          isValid: !!familyMember.FullName,
        });
        break;
      }
      case "relationship": {
        if (e.value !== "") {
          const Relationship = this.props.listaParentesco.filter((item) => item.Codigo === e.value).map((r) => r.Codigo);
          familyMember.Relationship = Relationship[0];
        } else {
          errorTxt = "Debe seleccionar un parentesco";
          familyMember.Relationship = null;
        }

        e.component.option({
          validationError: { message: errorTxt },
          isValid: !!familyMember.Relationship,
        });
        break;
      }

      default:
        break;
    }
    this.props.dispatch(setFamilyMember(familyMember));
    this.setState({
      isValidRut,
      fromIsValid: !!((isValidRut && familyMember.Relationship && familyMember.FullName)),
    });
  }

  handleCerrar = () => {
    const familyMember =
    {
      FullName: null,
      Rut: null,
      Relationship: null,
    };
    this.props.dispatch(setFamilyMember(familyMember));
    this.resetBuilder();
    this.props.closeModalCall();
  }
  handlePaste = (e) => {
    e.event.preventDefault();
  }
  compareObject() {
    if (this.props.preventNavigation === false) {
      this.props.dispatch(setPreventNavigation(true));
    }
  }
  addFamilyMember = () => {
    const profile = this.props.profile;
    const toast = {};

    if (this.props.familyMember.Rut) {
      const Rut = validacion.formatRut(this.props.familyMember.Rut, { showDots: false, showHyphen: true });

      const FamilyGroupContain = profile.FamilyGroup ? profile.FamilyGroup.filter((obj) => obj.Rut === Rut) : [];
      if (FamilyGroupContain.length > 0) {
        toast.isToastOpen = true;
        toast.msgToast = "Rut ya existe";
        toast.typeStyle = "warning";
        this.props.dispatch(openCloseToast(toast));
      } else {
        const FamilyGroup = this.props.profile.FamilyGroup ? this.props.profile.FamilyGroup.filter((obj) => obj.Rut !== Rut) : [];
        FamilyGroup.push({ Rut, FullName: this.props.familyMember.FullName, Relationship: this.props.familyMember.Relationship });
        profile.FamilyGroup = FamilyGroup;

        toast.isToastOpen = true;
        toast.msgToast = "Ingreso de familiar realizado, guarde los cambios";
        toast.typeStyle = "success";
        this.props.dispatch(openCloseToast(toast));
        this.compareObject();
        this.handleCerrar();
      }
    }
  }

  doUpdateFamilyMember = () => {
    const profile = this.props.profile;

    const FamilyGroup = this.props.profile.FamilyGroup ? this.props.profile.FamilyGroup.filter((obj) => obj.Rut !== this.props.familyMember.Rut) : [];
    FamilyGroup.push(this.props.familyMember);

    profile.FamilyGroup = FamilyGroup;

    const toast = {};
    toast.isToastOpen = true;
    toast.msgToast = "Modificacón de familiar realizado";
    toast.typeStyle = "success";
    this.props.dispatch(openCloseToast(toast));
    this.compareObject();
    this.handleCerrar();
  }
  doRemoveMember = () => {
    const profile = this.props.profile;

    const FamilyGroup = this.props.profile.FamilyGroup ? this.props.profile.FamilyGroup.filter((obj) => obj.Rut !== this.props.familyMember.Rut) : [];

    profile.FamilyGroup = FamilyGroup;

    const toast = {};
    toast.isToastOpen = true;
    toast.msgToast = "Familiar eliminado, guarde los cambios";
    toast.typeStyle = "success";
    this.props.dispatch(openCloseToast(toast));
    this.compareObject();
    this.handleCerrar();
  }
  renderGroupForm = (actionCallModal) =>
    (
      <React.Fragment >
        <div className="acceso row">

          <div className="componentesLogin col-xs-12 col-sm-12 col-md-12 col-lg-12" >
            <h3><p className="text-left">Rut</p></h3>
            <TextBox
              className="uppercaseText"
              id="rut"
              placeholder="Rut"
              value={this.props.familyMember.Rut && validacion.formatRut(this.props.familyMember.Rut, { showDots: true, showHyphen: true })}
              onValueChanged={this.handleChange}
              valueChangeEvent="focusout"
              disabled={actionCallModal === "UdpateFamilyMember"}
            />

          </div>
          <div className="componentesLogin col-xs-12 col-sm-12 col-md-12 col-lg-12" >
            <h3><p className="text-left">Nombre</p></h3>
            <TextBox
              id="fullname"
              placeholder="Nombre"
              onValueChanged={this.handleChange}
              value={this.props.familyMember.FullName}
              valueChangeEvent="input"
            >

            </TextBox>

          </div>
          <div className="componentesLogin col-xs-12 col-sm-12 col-md-12 col-lg-12" >
            <h3><p className="text-left">Parentesco</p></h3>
            <SelectBox
              id="relationship"
              placeholder="Seleccione .."
              dataSource={this.props.listaParentesco}
              onValueChanged={(item) => this.handleChange(item, item.value)}
              displayExpr="Parentesco"
              valueExpr="Codigo"
              searchEnabled
              value={this.props.listaParentesco.filter((item) => item.Codigo === this.props.familyMember.Relationship).map((r) => r.Codigo)[0]}
            />
          </div>
        </div>

      </React.Fragment>
    )


  render() {
    const {
      open,
      title,
      message,
      actionCallModal,


    } = this.props;


    return (
      <Popup
        visible={open}
        dragEnabled={false}
        maxHeight={actionCallModal !== "eliminarGrupoFamiliar" ? "400px" : "200px"}
        onHiding={this.handleCerrar}
        maxWidth="500px"
        title={title}
        showTitle
        contentRender={() => (<div>
          <div className="col-12" style={{ justifyContent: "center" }}>
            <div style={{ width: "100%", textAlign: "center" }}>
              <strong> {message} </strong>

            </div>
          </div>
          {actionCallModal !== "eliminarGrupoFamiliar" && this.renderGroupForm(actionCallModal)}
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
            {
              actionCallModal === "addFamilyMember" ?
                <Button
                  text="Guardar"
                  type="default"
                  style={buttonStyle}
                  disabled={!(this.state.fromIsValid)}
                  onClick={this.addFamilyMember}
                /> : null
            }
            {
              actionCallModal === "UdpateFamilyMember" ?
                <Button
                  text="Guardar"
                  type="default"
                  style={buttonStyle}

                  onClick={this.doUpdateFamilyMember}
                /> : null
            }
            {
              actionCallModal === "eliminarGrupoFamiliar" ?
                <Button
                  text="Aceptar"
                  type="default"
                  style={buttonStyle}

                  onClick={this.doRemoveMember}
                /> : null
            }
          </div>
                              </div>)}
      />
    );
  }
}


const mapStateToProps = (state) => ({
  UserInfo: state.global.userData,
  profile: state.misDatos.profile,
  familyMember: state.misDatos.familyMember,
  preventNavigation: state.global.preventNavigation,
  listaParentesco: state.global.listaParentesco,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => { dispatch(action); },
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalMesseges);
