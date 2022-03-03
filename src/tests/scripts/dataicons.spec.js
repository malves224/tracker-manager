import { icons } from "../../util/dataIcons";

describe('testes para função getIcon, que retorna componente de icon do @MUI de acordo com as astribuições', () => {
  const addStyle = { size: "32px"};
  it('quando o icon requisitado é atribuido a "novo *" Retorna o icon Correto de @MUI', () => {
    const iconNovo = icons.getIcon("Novo", addStyle);
    const nameIConMui = iconNovo.type.type.render.displayName;
    const propsSxIcon = iconNovo.props.sx;
    expect(nameIConMui).toBe("AddCircleIcon");
    expect(propsSxIcon).toStrictEqual(addStyle);
  });
  it('quando o icon requisitado é "Pagina inicial" Retorna o icon Correto de @MUI', () => {
    const iconNovo = icons.getIcon("Pagina inicial", addStyle);
    const nameIConMui = iconNovo.type.type.render.displayName;
    const propsSxIcon = iconNovo.props.sx;
    expect(nameIConMui).toBe("HomeIcon");
    expect(propsSxIcon).toStrictEqual(addStyle);
  });
  it('quando o icon requisitado é "Clientes" Retorna o icon Correto de @MUI', () => {
    const iconNovo = icons.getIcon("Clientes", addStyle);
    const nameIConMui = iconNovo.type.type.render.displayName;
    const propsSxIcon = iconNovo.props.sx;
    expect(nameIConMui).toBe("PermContactCalendarIcon");
    expect(propsSxIcon).toStrictEqual(addStyle);
  });
  it('quando o icon requisitado é "Listar Veiculos" Retorna o icon Correto de @MUI', () => {
    const iconNovo = icons.getIcon("Listar Veiculos", addStyle);
    const nameIConMui = iconNovo.type.type.render.displayName;
    const propsSxIcon = iconNovo.props.sx;
    expect(nameIConMui).toBe("ViewListIcon");
    expect(propsSxIcon).toStrictEqual(addStyle);
  });
  it('quando o icon requisitado é "Veiculos" Retorna o icon Correto de @MUI', () => {
    const iconNovo = icons.getIcon("Veiculos", addStyle);
    const nameIConMui = iconNovo.type.type.render.displayName;
    const propsSxIcon = iconNovo.props.sx;
    expect(nameIConMui).toBe("DirectionsCarFilledIcon");
    expect(propsSxIcon).toStrictEqual(addStyle);
  });
  it('quando o icon requisitado é "Agendamentos" Retorna o icon Correto de @MUI', () => {
    const iconNovo = icons.getIcon("Agendamentos", addStyle);
    const nameIConMui = iconNovo.type.type.render.displayName;
    const propsSxIcon = iconNovo.props.sx;
    expect(nameIConMui).toBe("DateRangeIcon");
    expect(propsSxIcon).toStrictEqual(addStyle);
  });
  it('quando o icon requisitado é "Listar Agendamentos" Retorna o icon Correto de @MUI', () => {
    const iconNovo = icons.getIcon("Listar Agendamentos", addStyle);
    const nameIConMui = iconNovo.type.type.render.displayName;
    const propsSxIcon = iconNovo.props.sx;
    expect(nameIConMui).toBe("ViewAgendaIcon");
    expect(propsSxIcon).toStrictEqual(addStyle);
  });
  it('quando o icon requisitado é "Administração" Retorna o icon Correto de @MUI', () => {
    const iconNovo = icons.getIcon("Administração", addStyle);
    const nameIConMui = iconNovo.type.type.render.displayName;
    const propsSxIcon = iconNovo.props.sx;
    expect(nameIConMui).toBe("AdminPanelSettingsIcon");
    expect(propsSxIcon).toStrictEqual(addStyle);
  });
  it('quando o icon requisitado é "Usuarios" Retorna o icon Correto de @MUI', () => {
    const iconNovo = icons.getIcon("Usuarios", addStyle);
    const nameIConMui = iconNovo.type.type.render.displayName;
    const propsSxIcon = iconNovo.props.sx;
    expect(nameIConMui).toBe("SupervisorAccountIcon");
    expect(propsSxIcon).toStrictEqual(addStyle);
  });
  it('quando o icon requisitado é "Financeiro" Retorna o icon Correto de @MUI', () => {
    const iconNovo = icons.getIcon("Financeiro", addStyle);
    const nameIConMui = iconNovo.type.type.render.displayName;
    const propsSxIcon = iconNovo.props.sx;
    expect(nameIConMui).toBe("LocalAtmIcon");
    expect(propsSxIcon).toStrictEqual(addStyle);
  });
  it('quando o icon requisitado é "Estoque" Retorna o icon Correto de @MUI', () => {
    const iconNovo = icons.getIcon("Estoque", addStyle);
    const nameIConMui = iconNovo.type.type.render.displayName;
    const propsSxIcon = iconNovo.props.sx;
    expect(nameIConMui).toBe("InventoryIcon");
    expect(propsSxIcon).toStrictEqual(addStyle);
  });});
