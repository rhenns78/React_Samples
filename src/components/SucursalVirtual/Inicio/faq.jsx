import React from "react";
import { connect } from "react-redux";
import { loadTabs } from "../../Header/actions";
import AccordionSections from "../../Shared/AccordionSections";
import ilustracion from "../../../images/ilustracion1.png";

const defaulttext = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
It has survived not only five centuries, but also the leap into electronic typesetting, 
remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing.`;

const items = [
  {
    section: "ACHS Virtual",
    faq: [
      {
        title: "¿Qué es ACHS Virtual?",
        body: defaulttext,
      },
      {
        title: "¿Quiénes pueden acceder a ACHS Virtual?",
        body: defaulttext,
      },
    ],
  },
  {
    section: "Trabajador",
    faq: [
      {
        title: "¿Qué hacen con mi información personal?",
        body: defaulttext,
      },
      {
        title: "Notificaciones",
        body: defaulttext,
      },
      {
        title: "Documentos",
        body: defaulttext,
      },
      {
        title: "Solicitudes",
        body: defaulttext,
      },
    ],
  },
  {
    section: "Empresa",
    faq: [
      {
        title: "¿Qué tipo de roles puedo asignar a mis trabajadores?",
        body: defaulttext,
      },
      {
        title: "Documentos",
        body: defaulttext,
      },
      {
        title: "Login único",
        body: defaulttext,
      },
      {
        title: "Solicitudes recibidas",
        body: defaulttext,
      },
      {
        title: "Notificaciones",
        body: defaulttext,
      },
      {
        title: "Denuncias",
        body: defaulttext,
      },
    ],
  },
  {
    section: "Siniestros",
    faq: [
      {
        title: "Notificaciones",
        body: defaulttext,
      },
    ],
  },
  {
    section: "Denuncias",
    faq: [
      {
        title: "Notificaciones",
        body: defaulttext,
      },
    ],
  },
  {
    section: "Prestaciones económicas",
    faq: [
      {
        title: "Notificaciones",
        body: defaulttext,
      },
    ],
  },
];

class Faq extends React.PureComponent {
  constructor(props) {
    super(props);

    props.dispatch(loadTabs("Preguntas frecuentes"));
  }

  render() {
    return (
      <div>
        <div className="row zero">
          <div className="col-4"><img src={ilustracion} alt="" width="100%" /></div>
          <div className="col-8 faq-section ">
            <h2 className="faq-title">Preguntas frecuentes</h2>

            <div className="text-body">
              Somos una organización privada sin fines de lucro, partícipe del sistema de seguridad social de Chile,
              al administrar recursos y prestaciones de la Ley 16.744, referente a la prevención de accidentes y enfermedades laborales.
              Para cumplir con nuestra razón de ser entregamos 3 tipos de prestaciones: preventivas, de salud y económicas.
              <br />
              <br />
              En la ACHS tenemos una profunda vocación por las personas, la vida y el cuidado de los trabajadores.
              Como mutualidad líder de Chile buscamos reforzar la gestión preventiva de excelencia y así poder garantizar la seguridad,
              salud y calidad de vida de las personas.Trabajamos día a día dando lo mejor de nosotros para hacer de Chile el país que mejor
              cuida a los trabajadores y sus familias.
            </div>
          </div>
        </div>

        <AccordionSections
          items={items}
          defaultItem={items[0]}
        />


      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  companyId: state.global.companyId,
  UserInfo: state.global.userData,
  jsonData: state.prestacionesEmpresa.jsonData,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => { dispatch(action); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Faq);
