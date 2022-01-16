const checkEmail = (value) => {
  const regex = new RegExp(/^([\w-]+\.)*[\w\- ]+@([\w\- ]+\.)+([\w-]{2,3})$/); // fonte dessa expresão https://www.devmedia.com.br/iniciando-expressoes-regulares/6557
  return regex.test(value);
};

const checkCelular = (value) => { // formato 11956410136
  const regex = new RegExp(/^[1-9]{2}(?:[2-8]|9[1-9])[0-9]{3}[0-9]{4}$/);
  return regex.test(value);
};

const checkPassword = (value) => {
  const MIN_LENGTH = 8;
  return value.length >= MIN_LENGTH;
};

const checkName = (nome) => {
  const regex = new RegExp(/[a-z][a-z]* [a-z][a-z]*/i);
  return regex.test(nome);
};

const checkBeEmpty = (value = "") => {
  if(!value.length) return false;
  return true; 
};


const validateData = {
  email: checkEmail,
  contato: checkCelular,
  senha: checkPassword,
  nome: checkName,
  perfilAcesso: checkBeEmpty,
  check: (type, value) => validateData[type](value),
  checkWithMessage: (type, value, message = `Insira um ${type} valido.`) => ({
    isValid: validateData[type](value),
    message: !validateData[type](value) ? message : ""
  }),
  checkAllInputs: (dataValidation) => {
    const keysData = Object.keys(dataValidation);
    return keysData.every((key) => dataValidation[key]);
  }
};

export {
  checkEmail,
  checkPassword,
  checkCelular,
  validateData
};