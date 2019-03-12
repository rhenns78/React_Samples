
const userRegister = {
  // --- step one
  steps: {
    stepOne: true, // user validation
    stepTwo: false, // condiciones
    stepThree: false, // preguntas
    stepFour: false, // validar datos personales
    stepFive: false, // create user pass AD = skip
    stepSuccess: false,
  },
  UserInfo: {
    UserType: null,
    FirstName: null,
    MiddleName: null,
    LastName: null,
    MothersName: null,
    Email: null,
    Rut: null,
    Phone: null,
    serieCI: null,
    Birthdate: null,
    TempBD: false,
    Password: false,
    rePassword: false,
    RelationType: null,
    CompanyRut: null,
    Rol: null,
    IsExACHS: false,
    acceptCondition: false,

  },
  emailValid: false,
  rutValid: false,
  QuestionsList: null,
  messageCreateUser: null,
  messageQuestions: null,
  validCINumber: true,
  skipValidation: false,
  fileUrl: null,

};

export default userRegister;

