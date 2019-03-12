import React from "react";
import { connect } from "react-redux";
import ReactAI from "react-appinsights";
import { Gallery, Accordion } from "devextreme-react";


import { loadTabs } from "../../Header/actions";
import { sendEmailApp } from "../../Global/actions";
import banner1 from "../../../images/banner1.png";
import banner2 from "../../../images/banner2.png";
import ilustracion from "../../../images/ilustracion1.png";
import ilustracion1 from "../../../images/ilustracion2.png";
import ilustracion2 from "../../../images/ilustracion3.png";
import ilustracion3 from "../../../images/ilustracion4.png";

class DashBoard extends React.PureComponent {
  constructor(props) {
    super(props);

    props.dispatch(loadTabs("Bienvenido a ACHS Virtual"));
  }
  testMail = () => {
    // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlZHUiOiIxNTQ0NTU3MTc1Lk1URTFNVFkyTURRdE1nPT0iLCJpYXQiOjE1NDQ1NTcxNzV9.ovVnzocyL-CKw93VezMG3xiOhBSHTPBJDeRzonMq5u8";
    const parametersMail = {};
    // parametersMail.userInfo = {
    //   RutEmpresa: "70769124-3",
    //   Email: this.props.UserInfo.Email,
    // };
    // parametersMail.templateMail = "solicitudRechazada";


    const href = "http://localhost:3001/activarCuenta/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlZHUiOiIxNTQ4MTYzMzUwLmEybDJkWEpyYVdGdVFHZHRZV2xzTG1OdmJRPT0iLCJpYXQiOjE1NDgxNjMzNTB9.3L7C-mUGXUuFCu1Gx_MXf7D8UFPAx9kXOkHlHLlLppg";
    parametersMail.userInfo = {
      FirstName: "Javier",
      LastName: "Calderon",
      Email: "kivurkian@gmail.com",
      Rut: "13951310-K",
      href,
    };
    parametersMail.templateMail = "activaUsuario";


    this.props.dispatch(sendEmailApp(parametersMail));
  }
  handleChange = (e) => {
    const jsonData = { ...this.props.jsonData };
    jsonData.formInfoPrevisional[e.element.id] = e.value;
  }


  CustomItem = (data) => (
    <div>
      <div className="zero row">
        <div className="zero col-3">
          <b style={{ padding: 10 }}>{data.img}</b>
        </div>
        <div className="zero col-9" style={{ marginTop: 50 }}>
          <b><h4 style={{ color: "#787878" }}>{data.TituloRespuesta}</h4></b>
          <b><h5 style={{ color: "#787878", lineHeight: "1.6" }}>{data.Respuesta}</h5></b>
        </div>
      </div>
      <div className="zero row">
        <div className="zero col-3">
          <b>{data.img2}</b>
        </div>
        <div className="zero col-9" style={{ marginTop: 50 }}>
          <b><h4 style={{ color: "#787878" }}>{data.TituloRespuesta2}</h4></b>
          <b><h5 style={{ color: "#787878", lineHeight: "1.6" }}>{data.Respuesta2}</h5></b>
        </div>
      </div>
      <div className="zero row">
        <div className="zero col-3">
          <b>{data.img3}</b>
        </div>
        <div className="zero col-9" style={{ marginTop: 50 }}>
          <b><h4 style={{ color: "#787878" }}>{data.TituloRespuesta3}</h4></b>
          <b><h5 style={{ color: "#787878", lineHeight: "1.6" }}>{data.Respuesta3}</h5></b>
        </div>
      </div>
    </div>
  )

  CustomTitle = (data) => (
    <div>
      <b><h3 style={{ color: "#00B2A9" }}>{data.Seccion}</h3></b>
    </div>
  )

  render() {
    const temp = [{
      ID: 1,
      Seccion: "ACHS Virtual",
      img: <img src={ilustracion} alt="" width="100%" />,
      TituloRespuesta: "Nuevo producto ACHS",
      Respuesta: "Texto simulado para explicar una funcionalidad de ACHS Virtual la cual permite que el usuario pueda realizar ciertas gestiones que agilizan sus procesos y/o los de sus trabajadores.",
      img2: <img src={ilustracion1} alt="" width="100%" />,
      TituloRespuesta2: "Toda tu información centralizada",
      Respuesta2: "Texto simulado para explicar una funcionalidad de ACHS Virtual la cual permite que el usuario pueda realizar ciertas gestiones que agilizan sus procesos y/o los de sus trabajadores.",
    }, {
      ID: 2,
      Seccion: "Trabajador",
      img: <img src={ilustracion3} alt="" width="100%" />,
      TituloRespuesta: "Información de tus siniestros",
      Respuesta: "Texto simulado para explicar una funcionalidad de ACHS Virtual la cual permite que el usuario pueda realizar ciertas gestiones que agilizan sus procesos y/o los de sus trabajadores.",
      img2: <img src={ilustracion1} alt="" width="100%" />,
      TituloRespuesta2: "Todos tus documentos",
      Respuesta2: "Texto simulado para explicar una funcionalidad de ACHS Virtual la cual permite que el usuario pueda realizar ciertas gestiones que agilizan sus procesos y/o los de sus trabajadores.",
      img3: <img src={ilustracion2} alt="" width="100%" />,
      TituloRespuesta3: "Notificaciones",
      Respuesta3: "Texto simulado para explicar una funcionalidad de ACHS Virtual la cual permite que el usuario pueda realizar ciertas gestiones que agilizan sus procesos y/o los de sus trabajadores.",

    }, {
      ID: 3,
      Seccion: "Empresa",
      img: <img src={ilustracion1} alt="" width="100%" />,
      Respuesta: "Texto simulado para explicar una funcionalidad de ACHS Virtual la cual permite que el usuario pueda realizar ciertas gestiones que agilizan sus procesos y/o los de sus trabajadores.",
      TituloRespuesta: "Entrega roles a tus trabajadores",
      img2: <img src={ilustracion} alt="" width="100%" />,
      TituloRespuesta2: "Suscripción de notificaciones",
      Respuesta2: "Texto simulado para explicar una funcionalidad de ACHS Virtual la cual permite que el usuario pueda realizar ciertas gestiones que agilizan sus procesos y/o los de sus trabajadores.",
      img3: <img src={ilustracion3} alt="" width="100%" />,
      TituloRespuesta3: "Información de tus sucursales",
      Respuesta3: "Texto simulado para explicar una funcionalidad de ACHS Virtual la cual permite que el usuario pueda realizar ciertas gestiones que agilizan sus procesos y/o los de sus trabajadores.",

    }, {
      ID: 4,
      Seccion: "Siniestros",
      img: <img src={ilustracion2} alt="" width="100%" />,
      Respuesta: "Texto simulado para explicar una funcionalidad de ACHS Virtual la cual permite que el usuario pueda realizar ciertas gestiones que agilizan sus procesos y/o los de sus trabajadores.",
      TituloRespuesta: "Envía tus denuncias",
      img2: <img src={ilustracion3} alt="" width="100%" />,
      TituloRespuesta2: "Revisa tus estadísticas",
      Respuesta2: "Texto simulado para explicar una funcionalidad de ACHS Virtual la cual permite que el usuario pueda realizar ciertas gestiones que agilizan sus procesos y/o los de sus trabajadores.",
      img3: <img src={ilustracion1} alt="" width="100%" />,
      TituloRespuesta3: "Monitorea tus siniestros",
      Respuesta3: "Texto simulado para explicar una funcionalidad de ACHS Virtual la cual permite que el usuario pueda realizar ciertas gestiones que agilizan sus procesos y/o los de sus trabajadores.",
    },
    ];
    return (
      <React.Fragment>
        <div className="row zero-left">

          <div className="zero col-12" style={{ paddingBottom: 20 }} >

            <Gallery
              style={{ backgroundColor: "#0C652F" }}
              height="250"
              width="100%"
              loop
              slideshowDelay={2000}
              showNavButtons
              showIndicator
              dataSource={[banner1, banner2,
              ]}
              stretchImages
            >
            </Gallery>
          </div>
          <div className="zero col-xs-12 col-md-5 col-lg-5 col-xl-4" style={{ marginTop: 20, paddingRight: "20px" }}>
            <h3 ><strong>ACHS Virtual</strong></h3>
            <h5 style={{ lineHeight: "1.6" }}>Somos una organización privada sin fines de lucro, partícipe del sistema de seguridad social de Chile, al administrar recursos y prestaciones de la Ley 16.744, referente a la prevención de accidentes y enfermedades laborales. Para cumplir con nuestra razón de ser entregamos 3 tipos de prestaciones: preventivas, de salud y económicas. En la ACHS tenemos una profunda vocación por las personas, la vida y el cuidado de los trabajadores.
              <br /><br />
              Como mutualidad líder de Chile buscamos reforzar la gestión preventiva de excelencia y así poder garantizar la seguridad, salud y calidad de vida de las personas.Trabajamos día a día dando lo mejor de nosotros para hacer de Chile el país que mejor cuida a los trabajadores y sus familias.
            </h5>
          </div>
          <div className="zero col-xs-12 col-md-7 col-lg-7 col-xl-8" style={{ marginTop: 20 }}>
            <iframe title="myform" width="100%" height="400" src="https://www.youtube.com/embed/po9OByeFkKA?controls=0" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>
            </iframe>
          </div>
          <div className="zero col-12">
            <div className="row zero" style={{ marginTop: 40, marginBottom: 40 }}>
              <div className="zero d-none d-lg-block d-xl-block col-md-5 col-lg-5 col-xl-4" style={{ paddingLeft: "16vw" }}>
                <h4>
                  ACHS Virtual<br />
                </h4>
                <h4 style={{ color: "#00B2A9" }}>
                  <strong>Trabajador</strong><br />
                </h4>
                <h4 style={{ lineHeight: "1.9" }}>
                  Empresa<br />
                  Siniestros<br />
                </h4>
              </div>
              <div className="zero col-xs-12 col-md-12 col-lg-7 col-xl-8">
                <Accordion
                  dataSource={temp}
                  collapsible
                  itemTitleComponent={this.CustomTitle}
                  itemComponent={this.CustomItem}
                >
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard); ReactAI.withTracking(DashBoard);


// render() {
//   // const form = this.props.jsonData.formInfoPrevisional;

//   const temp = [{
//     'ID': 1,
//     'Pregunta': '¿Qué es ACHS Virtual?',
//     'Respuesta': 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing.',
//   }, {
//     'ID': 2,
//     'Pregunta': 'Super Mart of the West',
//     'Respuesta': 'Somos una organización privada sin fines de lucro, partícipe del sistema de seguridad social de Chile, al administrar recursos y prestaciones de la Ley 16.744, referente a la prevención de accidentes y enfermedades laborales. Para cumplir con nuestra razón de ser entregamos 3 tipos de prestaciones: preventivas, de salud y económicas. En la ACHS tenemos una profunda vocación por las personas, la vida y el cuidado de los trabajadores. Como mutualidad líder de Chile buscamos reforzar la gestión preventiva de excelencia.',
//   }, {
//     'ID': 3,
//     'Pregunta': 'Super Mart of the West',
//     'Respuesta': 'Somos una organización privada sin fines de lucro, partícipe del sistema de seguridad social de Chile, al administrar recursos y prestaciones de la Ley 16.744, referente a la prevención de accidentes y enfermedades laborales. Para cumplir con nuestra razón de ser entregamos 3 tipos de prestaciones: preventivas, de salud y económicas. En la ACHS tenemos una profunda vocación por las personas, la vida y el cuidado de los trabajadores. Como mutualidad líder de Chile buscamos reforzar la gestión preventiva de excelencia.',
//   },{
//     'ID': 4,
//     'Pregunta': 'Super Mart of the West',
//     'Respuesta': 'Somos una organización privada sin fines de lucro, partícipe del sistema de seguridad social de Chile, al administrar recursos y prestaciones de la Ley 16.744, referente a la prevención de accidentes y enfermedades laborales. Para cumplir con nuestra razón de ser entregamos 3 tipos de prestaciones: preventivas, de salud y económicas. En la ACHS tenemos una profunda vocación por las personas, la vida y el cuidado de los trabajadores. Como mutualidad líder de Chile buscamos reforzar la gestión preventiva de excelencia.',
//   },
// ]
