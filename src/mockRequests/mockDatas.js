// não excluir, os dados estão sendo utilizados para testes.

const itemsMenu = [
  {
    name: "Pagina inicial",
    subItemsDropdown: [],
    route: "Home",
  },
  {
    name: "Clientes",
    subItemsDropdown: [
      {name: "Novo cliente", route: "NewClient", }, 
      {name: "Clientes", route: "ListClients"}
    ],
  },
  {
    name: "Veiculos",
    subItemsDropdown: [
      {name:"Novo veiculo", route: "NewVehicle"},
      {name: "Listar Veiculos", route : "ListVehicles"} 
    ],
  },
  {
    name: "Agendamentos",
    subItemsDropdown: [
      {name: "Novo Agendamento", route: "NewAgendamento"}, 
      {name: "Listar Agendamentos", route: "ListAgendamentos"}
    ],
  },
  {
    name: "Administração",
    subItemsDropdown: [
      {name: "Usuarios", route: "UsersControl"},
      {name: "Financeiro", route: "Financeiro"}
    ],
  },
  {
    name: "Estoque",
    subItemsDropdown: [],
    route: "Estoque"
  }
];

const itemsMenuNoHasNewVehicle = [
  {
    name: "Pagina inicial",
    subItemsDropdown: [],
    route: "Home",
  },
  {
    name: "Clientes",
    subItemsDropdown: [
      {name: "Novo cliente", route: "NewClient", }, 
      {name: "Clientes", route: "ListClients"}
    ],
  },
  {
    name: "Veiculos",
    subItemsDropdown: [
      {name: "Listar Veiculos", route : "ListVehicles"} 
    ],
  },
  {
    name: "Agendamentos",
    subItemsDropdown: [
      {name: "Novo Agendamento", route: "NewAgendamento"}, 
      {name: "Listar Agendamentos", route: "ListAgendamentos"}
    ],
  },
  {
    name: "Administração",
    subItemsDropdown: [
      {name: "Usuarios", route: "UsersControl"},
      {name: "Financeiro", route: "Financeiro"}
    ],
  },
  {
    name: "Estoque",
    subItemsDropdown: [],
    route: "Estoque"
  }
];


const perfilPermissions = [
  {
    id: "1",
    name: "admin",
    permissions: [
      {
        page: "Home",
        write: true,
        editing: true,
        delete: true,
      },
      {
        page: "NewClient",
        write: true,
      }, 
      {
        page: "ListClients",
        write: true,
        editing: true,
        delete: true,
      }
      ,
      {
        page: "ListVehicles",
        write: true,
        editing: true,
        delete: true,
      },
      {
        page: "NewVehicle",
        write: true,
        editing: true,
        delete: true,
      },
      {
        page: "NewAgendamento",
        write: true,
      },
      {
        page: "ListAgendamentos",
        write: true,
        editing: true,
        delete: true,
      },
      {
        page: "UsersControl",
        write: true,
        editing: true,
        delete: true,
      },
      {
        page: "Financeiro",
        write: true,
        editing: true,
        delete: true,
      },
      {
        page: "Estoque",
        hasSubItem: false,
        write: true,
        editing: true,
        delete: true,
      },
      {
        "page": "UserInfo",
        "write": true,
        "editing": true,
        "delete": true
      },
    ]
  }
];

const users = [
  {
    id: "1",
    status: "ativo",
    login: "malves224@gmail.com",
    password: "123456789",
    fullName: "matheus alves",
    contato: "1195666665",
    cargo: "administrador",
    perfil: "admin",
    idPerfil: "1",
    config : {
      mode: "dark"
    }
  }
];

const mockPermisions = [
  {
    "page": "Home",
    "write": true,
    "editing": true,
    "delete": true
  },
  {
    "page": "NewClient",
    "write": true
  },
  {
    "page": "ListClients",
    "write": true,
    "editing": true,
    "delete": true
  },
  {
    "page": "ListVehicles",
    "write": true,
    "editing": true,
    "delete": true
  },
  {
    "page": "NewVehicle",
    "write": true,
    "editing": true,
    "delete": true
  },
  {
    "page": "NewAgendamento",
    "write": true
  },
  {
    "page": "ListAgendamentos",
    "write": true,
    "editing": true,
    "delete": true
  },
  {
    "page": "UsersControl",
    "write": true,
    "editing": true,
    "delete": true
  },
  {
    "page": "Financeiro",
    "write": true,
    "editing": true,
    "delete": true
  },
  {
    "page": "Estoque",
    "write": true,
    "editing": true,
    "delete": true
  },
  {
    "page": "UsersList",
    "write": true,
    "editing": true,
    "delete": true
  },
];

export {
  itemsMenu,
  perfilPermissions,
  users,
  mockPermisions,
  itemsMenuNoHasNewVehicle
};
