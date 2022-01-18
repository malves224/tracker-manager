import {
  itemsMenu,
  users,
  perfilPermissions
} from "./mockDatas";
import storage from "../util/storage/store";

// motivo dessas função é simular requisições ao banco de dados enquanto o back end
// nao é desenvolvido.
/* istanbul ignore file */

const TIME_RESPONSE = 700;

const getItemsNav = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(itemsMenu);
    }, TIME_RESPONSE);
  });
};

const getUsersList = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const usersLocalStorage = storage.get("users");
      resolve(usersLocalStorage);
    }, TIME_RESPONSE);
  });
};

const getPerfilList = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const perfilPermissionsLocalStorage = storage.get("perfilPermissions");
      const allUser = perfilPermissionsLocalStorage.map(({name, id}) => ({name, id}));
      resolve(allUser);
    }, TIME_RESPONSE);
  });
};

const checkPermission = (idPerfil, pageForCheck, tipoPerm) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const perfilData = perfilPermissions
        .filter((perfil) => perfil.id === idPerfil);

      const pageData = perfilData[0].permissions
        .filter((page) => page.page === pageForCheck);

      pageData[0][tipoPerm]
        ? resolve(true) 
        : reject(false);
    }, TIME_RESPONSE);
  });
};

const getUserById = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const usersLocalStorage = storage.get("users");
      const perfilPermissionsLocalStorage = storage.get("perfilPermissions");
      const user = usersLocalStorage.filter((user) => user.id === id)[0];
      const userForReturn = {
        nome: user.fullName,
        cargo: user.cargo,
        contato: user.contato,
        email: user.login,
        idPerfil: user.idPerfil,
        perfilAcesso: perfilPermissionsLocalStorage
          .filter((perfil) => user.idPerfil === perfil.id)[0].name // simulaçao de innerJOin
      };
      resolve(userForReturn);
    }, TIME_RESPONSE);
  });
};

const editUserById = (id, objUserUpdate) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!id || !objUserUpdate){
        reject(new Error ({message: "id ou dados vazio"}));
      } else {
        const usersLocalStorage = storage.get("users");
        const otherUsers = usersLocalStorage.filter((user) => user.id !== +id);
        const userById = usersLocalStorage.find((user) => user.id === +id);
        const userUpdate = {
          ...userById,
          fullName: objUserUpdate.nome,
          idPerfil: !objUserUpdate.idPerfil ? userById.idPerfil : objUserUpdate.idPerfil,
          cargo: objUserUpdate.cargo,
          contato: objUserUpdate.contato,
          login: objUserUpdate.email,
          password: !objUserUpdate.senha ? userById.password : objUserUpdate.senha,
        };
        const newListUser = [...otherUsers, userUpdate];
        storage.set("users", newListUser);
        resolve(objUserUpdate);
      }
    }, TIME_RESPONSE);
  });
};

const deleteUser = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const usersLocalStorage = storage.get("users");
      const otherUsers = usersLocalStorage.filter((user) => user.id !== +id);
      const userDeleted = usersLocalStorage.find((user) => user.id === +id);
      storage.set("users",otherUsers);
      resolve({message: `Usuario ${userDeleted.fullName} deletado com sucesso`});
    }, TIME_RESPONSE);
  });
};

const authenticationLogin = (login, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = users.filter((user) => user.login === login); // querry para acessar o user
      if (user.length && user[0].password === password) {
        const userToOut = {
          ...user[0]
        };
        delete userToOut.password;
        const permissions = perfilPermissions
          .filter((perfil) => userToOut.idPerfil === perfil.id);
        resolve({
          ...userToOut,
          perfilData: {
            ...permissions[0]
          }, // possivel inner join no db
          token: "", // simulando token
        });
      } else {
        reject({
          error: "Usuario e senha invalido"
        });
      }
    }, TIME_RESPONSE);
  });
};


export {
  getItemsNav,
  authenticationLogin,
  getUsersList,
  getUserById,
  getPerfilList,
  checkPermission,
  editUserById,
  deleteUser
};