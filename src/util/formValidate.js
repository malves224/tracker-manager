const checkEmail = (value) => {
  const regex = new RegExp(/^([\w-]+\.)*[\w\- ]+@([\w\- ]+\.)+([\w-]{2,3})$/); // fonte dessa expresão https://www.devmedia.com.br/iniciando-expressoes-regulares/6557
  return regex.test(value);
};

const checkPassword = (value, minDigit) => {
  const MIN_LENGTH = minDigit;
  return value.length >= MIN_LENGTH;
};

export {
  checkEmail,
  checkPassword
};