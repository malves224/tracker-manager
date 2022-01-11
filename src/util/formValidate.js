const checkEmail = (value) => {
  const regex = new RegExp(/^([\w-]+\.)*[\w\- ]+@([\w\- ]+\.)+([\w-]{2,3})$/); // fonte dessa expresão https://www.devmedia.com.br/iniciando-expressoes-regulares/6557
  return regex.test(value);
};

const checkCelular = (value) => { // formato 11956410136
  const regex = new RegExp(/^[1-9]{2}(?:[2-8]|9[1-9])[0-9]{3}[0-9]{4}$/);
  return regex.test(value);
};

const checkPassword = (value, minDigit) => {
  const MIN_LENGTH = minDigit;
  return value.length >= MIN_LENGTH;
};

const validateData = {
  email: checkEmail,
  contato: checkCelular,
  senha: checkPassword,
  check: (type, value) => validateData[type](value)
};

export {
  checkEmail,
  checkPassword,
  checkCelular,
  validateData
};