import React from "react";
import { connect } from "react-redux";
import styles from "../../../../styles/stylesgenerales";
import { Button, SelectBox } from "devextreme-react";
import { doValidateQuestions, setMessageAnswers,
  // getQuestion
} from "../actions";
import LoadingOverlay from "../../../Shared/LoadingOverlay";

class Registro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      aTextOneId: 0,
      aOne: 0,
      aTextTwoId: 0,
      aTwo: 0,
      aTextThreeId: 0,
      aThree: 0,
      aTextFourId: 0,
      aFour: 0,
      fromQuestionValid: false,
    };

    this.onStepFour = this.onStepFour.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.messageQuestions == null && this.props.messageQuestions != null) {
      this.setState({
        aTextOneId: 0,
        aOne: 0,
        aTextTwoId: 0,
        aTwo: 0,
        aTextThreeId: 0,
        aThree: 0,
        aTextFourId: 0,
        aFour: 0,
        fromQuestionValid: false,
      });
    }
    // se cargan al aceptar las condiciones
    // voy a consumir las preguntas
    // this.props.dispatch(getQuestion(this.props.UserInfo));
  }


  onStepFour() {
    const SetQuestions = this.props.QuestionsList;
    // one=1, tow=4 , three=4, four=5

    const answers = {
      QuestionsSetID: SetQuestions.QuestionsSetID,
      TransactionKey: SetQuestions.TransactionKey,
      Answers: [
        {
          AnswerId: this.state.aOne,
          QuestionId: this.state.aTextOneId,
        },
        {
          AnswerId: this.state.aTwo,
          QuestionId: this.state.aTextTwoId,
        },
        {
          AnswerId: this.state.aThree,
          QuestionId: this.state.aTextThreeId,
        },
        {
          AnswerId: this.state.aFour,
          QuestionId: this.state.aTextFourId,
        },
      ],
    };

    this.props.dispatch(doValidateQuestions(answers, this.props.UserInfo));
  }
  cuestionValidChange(e, value, txtId) {
    if (this.props.messageQuestions) {
      this.props.dispatch(setMessageAnswers(null));
    }

    switch (e.element.id) {
      case "AnswerOne": {
        this.setState({ aOne: value, aTextOneId: txtId });
        break;
      }
      case "AnswerTwo": {
        this.setState({ aTwo: value, aTextTwoId: txtId });
        break;
      }
      case "AnswerThree": {
        this.setState({ aThree: value, aTextThreeId: txtId });
        break;
      }
      case "AnswerFour": {
        this.setState({ aFour: value, aTextFourId: txtId });
        break;
      }
      default:
        break;
    }
    // eslint-disable-next-line
    const answerCorrects = parseInt(this.state.aOne) + parseInt(this.state.aTwo) + parseInt(this.state.aThree) + parseInt(this.state.aFour);
    this.setState({ fromQuestionValid: answerCorrects > 0 });
  }
  renderQuestions() {
    const typeBtn = (this.state.fromQuestionValid) ? "default" : "default";
    const SetQuestions = this.props.QuestionsList;

    return (
      <center>
        <div className="acceso row">
          { this.props.isLoading && <LoadingOverlay style={{ height: 800 }} /> }
          <div className="tituloLogin col-xs-12 col-sm-12 col-md-12 col-lg-12" >
            <h4>Confirmación de Identidad</h4>
          </div>
          {this.props.messageQuestions ?
            <div className="componentesLogin col-xs-12 col-sm-12 col-md-12 col-lg-12" >
              <p style={{ color: "#E62A3B" }} className="danger text-center"> {this.props.messageQuestions} </p>
            </div>
            :
            null}

          <div className="componentesLogin col-xs-12 col-sm-12 col-md-12 col-lg-12" >
            <h3><p className="text-left"> {SetQuestions.question1.Text}</p></h3>
            <SelectBox
              id="AnswerOne"
              placeholder="Seleccione .."
              dataSource={SetQuestions.question1.AnswerChoices}
              onValueChanged={(data) => this.cuestionValidChange(data, data.value, SetQuestions.question1.Id)}
              displayExpr="Text"
              valueExpr="Id"
              searchEnabled
              value={this.state.aOne}
            >

            </SelectBox>
          </div>
          <div className="componentesLogin col-xs-12 col-sm-12 col-md-12 col-lg-12" >
            <h3><p className="text-left"> {SetQuestions.question2.Text}</p></h3>
            <SelectBox
              id="AnswerTwo"
              placeholder="Seleccione .."
              dataSource={SetQuestions.question2.AnswerChoices}
              onValueChanged={(data) => this.cuestionValidChange(data, data.value, SetQuestions.question2.Id)}
              displayExpr="Text"
              valueExpr="Id"
              value={this.state.aTwo}
              searchEnabled
            />
          </div>
          <div className="componentesLogin col-xs-12 col-sm-12 col-md-12 col-lg-12" >
            <h3><p className="text-left"> {SetQuestions.question3.Text}</p></h3>
            <SelectBox
              id="AnswerThree"
              placeholder="Seleccione .."
              dataSource={SetQuestions.question3.AnswerChoices}
              onValueChanged={(data) => this.cuestionValidChange(data, data.value, SetQuestions.question3.Id)}
              displayExpr="Text"
              valueExpr="Id"
              searchEnabled
              value={this.state.aThree}
            />
          </div>
          <div className="componentesLogin col-xs-12 col-sm-12 col-md-12 col-lg-12" >
            <h3><p className="text-left"> {SetQuestions.question4.Text}</p></h3>
            <SelectBox
              id="AnswerFour"
              placeholder="Seleccione .."
              dataSource={SetQuestions.question4.AnswerChoices}
              onValueChanged={(data) => this.cuestionValidChange(data, data.value, SetQuestions.question4.Id)}
              displayExpr="Text"
              valueExpr="Id"
              searchEnabled
              value={this.state.aFour}
            />
          </div>

          <div className="componentesLogin col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <Button text="Siguiente" style={styles.fullWidth} type={typeBtn} disabled={!(this.state.fromQuestionValid)} onClick={this.onStepFour} />
          </div>
        </div>
      </center>
    );
  }


  render() {
    return (

      <div className="container-fluid" style={{ padding: 0, margin: 0 }}>

        { this.props.QuestionsList ? this.renderQuestions() : null}

      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  QuestionsList: state.userRegister.QuestionsList,
  messageQuestions: state.userRegister.messageQuestions,
  isLoading: state.global.isLoading,
  UserInfo: state.userRegister.UserInfo,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => { dispatch(action); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Registro);

