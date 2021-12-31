import { checkEmail, checkPassword } from "../util/formValidate";

describe("Testes para função checkEmail", () => { 
  it("Verifica se a função checkEmail retorna 'false' ao digitar um email invalido.", () => {
    expect(checkEmail("fulano")).toBeFalsy();
    expect(checkEmail("fulano@")).toBeFalsy();
    expect(checkEmail("fulano@.com")).toBeFalsy();
  });
  it("Verifica se a função checkEmail returna 'true' ao digitar um email valido, espera-se fulano@host.com", () => {
    expect(checkEmail("fulano@hotmail.com")).toBeTruthy();
    expect(checkEmail("fulano@hotmail.com.br")).toBeTruthy();
  });
});

describe('Testes para função checkPassword', () => {
  const MIN_LENGTH = 8;
  it('Verifica se ao inserir password menor que o minimo requerido returna "false" ', () => {
    expect(checkPassword('1234567', MIN_LENGTH)).toBeFalsy();
  });
  it('Verifica se ao inserir password maior ou igual que o minimo requerido returna "true" ', () => {
    expect(checkPassword('12345678', MIN_LENGTH)).toBeTruthy();
    expect(checkPassword('123456789', MIN_LENGTH)).toBeTruthy();
  });
});
