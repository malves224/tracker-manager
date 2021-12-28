const itemsMenu = [
  {
    title: "Pagina inicial",
    subItemsDropdown: [],
    route: "/",
    namePage: "Home"
  },
  {
    name: "Clientes",
    subItemsDropdown: [
      {name: "Novo cliente", route: "/newClient", }, 
      {name: "Clientes", route: "/listClients"}
    ],
  },
  {
    name: "Veiculos",
    subItemsDropdown: [
      {name:"Novo veiculo", route: "/newVehicle"},
      {name: "Listar Veiculos", route : "/listVehicles"} 
    ],
  },
  {
    name: "Agendamentos",
    subItemsDropdown: [
      {name: "Novo Agendamento", route: "/agendamento"}, 
      {name: "Listar Agendamentos", route: "/listAgendamentos"}
    ],
  },
  {
    name: "Administração",
    subItemsDropdown: [
      {name: "Usuarios", route: "/users"},
      {name: "Financeiro", route: "/financeiro"}
    ],
  },
  {
    name: "Estoque",
    subItemsDropdown: [],
    route: "/estoque"
  },
  {
    name: "Sair",
    subItemsDropdown: [],
    route: null,
  }
]; 


const perfilPermissions = [
  {
    id: "1",
    name: "admin",
    permissions: [
      {
        page: "Pagina inicial",
        hasSubItem: false,
        write: true,
        editing: true,
        delete: true,
      },
      {
        page: "Clientes",
        hasSubItem: true,
        subItems: [{
          page: "newClient",
          write: true,
        }, 
        {
          page: "listClients",
          write: true,
          editing: true,
          delete: true,
        }
        ],
      },
      {
        page: "Veiculos",
        hasSubItem: true,
        subItems: [
          {
            page: "newVehicle",
            write: true,
          },
          {
            page: "listVehicles",
            reading: true,
            write: true,
            editing: true,
            delete: true,
          }
        ]
      },
      {
        page: "Agendamentos",
        hasSubItem: true,
        subItems: [
          {
            page: "agendamento",
            write: true,
          },
          {
            page: "listAgendamentos",
            write: true,
            editing: true,
            delete: true,
          }
        ]
      },
      {
        page: "Administração",
        hasSubItem: true,
        subItems: [
          {
            page: "users",
            write: true,
            editing: true,
            delete: true,
          },
          {
            page: "financeiro",
            write: true,
            editing: true,
            delete: true,
          }
        ]
      },
      {
        page: "Estoque",
        hasSubItem: false,
        write: true,
        editing: true,
        delete: true,
      },
    ]
  }
];

const users = [
  {
    id: "1",
    login: "malves224@gmail.com",
    password: "123456789",
    fullName: "matheus alves",
    contato: "1195666665",
    cargo: "administrador",
    perfil: "admin",
    idPerfil: "1"
  }
];

export {
  itemsMenu,
  perfilPermissions,
  users
};
