import { checkPermision, getItemsNavAllowed } from "../util/filter";
import { itemsMenu, mockPermisions, itemsMenuNoHasNewVehicle } from "../mockRequests/mockDatas";

describe('Testes para função checkPermision, Que verifica se o há permisões para x item do menu', () => {
  it('Verifica se ao passar um item sem permisão retorna "false"', () => {
    const itemNewClient = itemsMenu[1].subItemsDropdown[0];
    const permisionsNoHasNewClient = mockPermisions.filter((perm) => perm.page !== "NewClient");
    expect(checkPermision(itemNewClient, permisionsNoHasNewClient)).toBeFalsy();
  });

  it('Verifica se ao passar um item com permisão retorna "true"', () => {
    const itemNewClient = itemsMenu[1].subItemsDropdown[0];
    const permisionsNoHasNewClient = mockPermisions.filter((perm) => perm.page === "NewClient");
    expect(checkPermision(itemNewClient, permisionsNoHasNewClient)).toBeTruthy();
  });
});

describe('Testes para função getItemsNavAllowed, Que retorna apenas os items do menu permitido', () => {
  it('Quando o item de navegação não é permitido, retorna os items sem o mesmo.', () => {
    const permisionsNoHasEstoque = mockPermisions.filter((perm) => perm.page !== "Estoque");
    const outputExpected = itemsMenu.filter((item) => item.name !== "Estoque");
    expect(getItemsNavAllowed(permisionsNoHasEstoque, itemsMenu)).toStrictEqual(outputExpected);
  });

  it('Quando o subItem de um item de nav nao é permitido, retorna os items sem o subItem', () => {
    const outputExpected = itemsMenuNoHasNewVehicle;
    const permisionsNoHasNewVehicle = mockPermisions.filter((perm) => perm.page !== "NewVehicle");
    expect(getItemsNavAllowed(permisionsNoHasNewVehicle, itemsMenu)).toStrictEqual(outputExpected);
  });

  it('Quando todos subItems do item esta sem permissão, nao retorna o item.', () => {
    const outputExpected = itemsMenu.filter((item) => item.name !== "Clientes");
    const permisionsNoHasClient = mockPermisions
      .filter((perm) => perm.page !== "NewClient" && perm.page !== "ListClients");
    expect(getItemsNavAllowed(permisionsNoHasClient, itemsMenu)).toStrictEqual(outputExpected);
  });
});

