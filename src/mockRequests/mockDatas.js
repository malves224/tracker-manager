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
      {name: "Veiculos", route : "listClients"} 
    ],
  },
  {
    name: "Agendamentos",
    subItemsDropdown: [
      {name: "Novo Agendamento", route: "/agendamento"}, 
      {name: "Agendamentos", route: "/ListAgendamentos"}
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
    route: null
  }
];

const returnItemsMenu = () => {
  return itemsMenu;
};

export default returnItemsMenu;
