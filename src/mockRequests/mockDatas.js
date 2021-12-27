const itemsMenu = [
  {
    name: "Pagina inicial",
    subItemsDropdown: [],
    route: "/home",
  },
  {
    name: "Clientes",
    subItemsDropdown: [
      {name: "Novo cliente", route: "/newClient"}, 
      {name: "Clientes", route: "/listClients"}
    ],
  },
  {
    name: "Veiculos",
    subItemsDropdown: [
      {name:"Novo veiculo", route: "/newVehicle"},
      {name: "Listar Veiculos", route : "listClients"} 
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
    route: "estoque"
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
        page: "home",
        hasSubItem: false,
        reading: true,
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
          reading: true,
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
            reading: true,
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
            reading: true,
            write: true,
            editing: true,
            delete: true,
          },
          {
            page: "financeiro",
            reading: true,
            write: true,
            editing: true,
            delete: true,
          }
        ]
      },
      {
        page: "estoque",
        hasSubItem: false,
        reading: true,
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
