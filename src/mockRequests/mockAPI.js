import { itemsMenu, users, perfilPermissions } from "./mockDatas";

// motivo dessas função é simular requisições ao banco de dados enquanto o back end
// nao é desenvolvido.
/* istanbul ignore file */

const TIME_RESPONSE = 700;

const getItemsNav = () => {
  return new Promise ((resolve) => {
    setTimeout(() => {
      resolve(itemsMenu);
    }, TIME_RESPONSE);
  });
};

const getUsersList = () => {
  return new Promise ((resolve) => {
    setTimeout(() => {
      resolve(users);
    }, TIME_RESPONSE);
  });
};

const getUserById = (id) => {
  return new Promise ((resolve) => {
    setTimeout(() => {
      const user = users.filter((user) => user.id === id)[0];
      const userForReturn = { 
        nome: user.fullName,
        cargo: user.cargo,
        contato: user.contato,
        email: user.login,
        perfilAcesso: perfilPermissions
          .filter((perfil) => user.id === perfil.id)[0].name// simulaçao de innerJOin
      };
      resolve([userForReturn]);
    }, TIME_RESPONSE);
  });
};

const authenticationLogin = (login, password) => {
  return new Promise ((resolve, reject) => {
    setTimeout(() => {
      const user = users.filter((user) => user.login === login); // querry para acessar o user
      if (user.length && user[0].password === password) {
        const userToOut = {...user[0]};
        delete userToOut.password;
        const permissions = perfilPermissions
          .filter((perfil) => userToOut.idPerfil === perfil.id);
        resolve({
          ...userToOut,
          perfilData: {...permissions[0]},// possivel inner join no db
          token: "",// simulando token
        });
      } else {
        reject({error: "Usuario e senha invalido"});
      }
    }, TIME_RESPONSE);
  });  
};

export {
  getItemsNav,
  authenticationLogin,
  getUsersList,
  getUserById
};
