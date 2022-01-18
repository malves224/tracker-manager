import storage from "../util/storage/store";
import { users, perfilPermissions } from "./mockDatas";

const createLocalUsers = () => {
  !storage.get("users") && storage.set("users", users);
};

const createLocalPerfilPerm = () => {
  !storage.get("perfilPermissions") 
    && storage.set("perfilPermissions", perfilPermissions);
};

export {
  createLocalUsers,
  createLocalPerfilPerm,
};