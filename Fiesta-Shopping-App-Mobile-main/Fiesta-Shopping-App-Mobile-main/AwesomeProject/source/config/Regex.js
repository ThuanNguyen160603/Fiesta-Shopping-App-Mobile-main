const regex = {
    fullnameWithRegex: new RegExp("^[A-Z][a-z]*(?: [A-Z][a-z]*){1,}$"),
    specialCharacter: new RegExp("[^\\w\\s]"),
    emailRegex: new RegExp('^[\\w\\.-]+@[a-zA-Z\\d\\.-]+\\.[a-zA-Z]{2,6}$'),
    passwordRegex: new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{8,}$'),
    phoneNumber : new RegExp('^(\\+\\d{1,2}\\s?)?\\(?\\d{3}\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4}$')
  
  };
export default regex