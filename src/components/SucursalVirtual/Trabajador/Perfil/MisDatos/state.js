const misDatosState = {
  isLoading: false,
  mailChanged: null,
  validateMail: false,
  NewEmail: null,
  familyMember:
    {
      FullName: null,
      Rut: null,
      Relationship: null,
    },

  profile: {
    Name: null,
    MiddleName: null,
    FatherLastName: null,
    MotherLastName: null,

    Rut: null,
    Email: null,
    AlternativeEmail: null,
    Address: {
      Street: null,
      Number: null,
      Commune: null,
      Region: null,
    },
    PhoneNumber: null,
    CellPhoneNumber: null,
    MaritalStatus: {
      Id: null,
      Description: null,
    },
    FamiliGroup: [
      {
        FullName: null,
        Rut: null,
        Relationship: null,
      },
    ],
    Payment: {
      Bank: {
        Id: null,
        Description: null,
      },
      AccountType: {
        Id: null,
        Description: null,
      },
      AccountNumber: null,
    },
    LegalDiscount: {
      AFP: {
        Id: null,
        Description: null,
      },
      Isapre: {
        Id: null,
        Description: null,
      },
    },
    LaborInformation: {
      Ocupation: {
        Id: null,
        Description: null,
      },
      DayType: {
        Id: null,
        Description: null,
      },
      Sector: {
        Id: null,
        Description: null,
      },
    },
    Company: [],
    Companies: [],
  },


};

export default misDatosState;
