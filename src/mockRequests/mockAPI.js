import returnItemsMenu from "./mockDatas";

// motivo dessas função é simular requisições ao banco de dados enquanto o back end
// nao é desenvolvido.

const TIME_RESPONSE = 625;

const getItemsNav = () => {
  return new Promise ((resolve) => {
    setTimeout(() => {
      resolve(returnItemsMenu());
    }, TIME_RESPONSE);
  });
};

export {
  getItemsNav,
};
