import { UserValidator } from './user.validator';

describe('Validar Email', () => {
  test('Deve retornar error se o e-mail é invalido', () => {
    const email = 'mayararocha@gmail.com';
    expect(() => UserValidator.verifyEmail(email)).not.toThrow();
    // expect(() => UserValidator.verifyEmail(email)).toThrow('Invalid email');
  });
});

describe('Validar Senha', () => {
  test('Deve retornar erro quando a senha não possui no minimo 8 caracteres', () => {
    const password = 'Ab1@';
    expect(() => UserValidator.verifyPassword(password)).toThrow(
      'Invalid password',
    );
  });

  test('Deve retornar erro quando a senha não possui números', () => {
    const password = 'Teste@!@';
    expect(() => UserValidator.verifyPassword(password)).toThrow(
      'Invalid password',
    );
  });
  test('Deve retornar erro quando a senha não possui letras maiusculas', () => {
    const password = 'teste@!1';
    expect(() => UserValidator.verifyPassword(password)).toThrow(
      'Invalid password',
    );
  });
  test('Deve retornar erro quando a senha não possui letras minusculas', () => {
    const password = 'TESTE@!1';
    expect(() => UserValidator.verifyPassword(password)).toThrow(
      'Invalid password',
    );
  });
  test('Deve retornar erro quando a senha não caracteres especiais', () => {
    const password = 'TESTEest1';
    expect(() => UserValidator.verifyPassword(password)).toThrow(
      'Invalid password',
    );
  });
  test('Deve retornar true quando a senha é valida', () => {
    const password = 'TESTe@!t1';
    expect(UserValidator.verifyPassword(password)).toBe(true);
  });
});

describe('Valida se o email já está em uso', () => {
  test('Deve retornar um erro quando já existe um usuário com o email informado', () => {
    const email = 'mayaraaraujorocha54@gmail.com';
    const users = [
      { email, name: 'mayara', password: 'T3este@123!', cpf: '247.651.770-41' },
    ];
    expect(() => UserValidator.checkEmailAlreadyInUse(users, email)).toThrow(
      'Email already in use',
    );
  });
  test('Deve retornar true quando o email não está em uso (Lista de usuarios vazias)', () => {
    const email = 'mayaraaraujorocha54@gmail.com';
    const users = [
      {
        email: 'mayarinha@hotmail.com',
        name: 'mayara',
        password: 'T3este@123!',
        cpf: '247.651.770-41',
      },
      {
        email: 'luizpaulo@hotmail.com',
        name: 'luiz paulo',
        password: 'T3este@123!',
        cpf: '655.871.630-59',
      },
    ];
    expect(UserValidator.checkEmailAlreadyInUse(users, email)).toBe(true);
  });
});

describe('Valida CPF em uso', () => {
  test('Deve retornar error quando CPF jpa está em uso', () => {
    const cpf = '861.600.150-60';
    const users = [
      {
        cpf,
        email: 'luizpaulo@hotmail.com',
        name: 'luiz paulo',
        password: 'T3este@123!',
      },
    ];
    expect(() => UserValidator.checkCpfAlreadyInUse(users, cpf)).toThrow(
      'CPF already in use',
    );
  });

  test('Deve retornar true quando não está em uso (lista de usuarios vazia', () => {
    const cpf = '861.600.150-60';
    const users = [];
    expect(UserValidator.checkCpfAlreadyInUse(users, cpf)).toBe(true);
  });

  test('Deve retornar true quando não está em uso (lista de usuarios não vazia', () => {
    const cpf = '861.600.150-60';
    const users = [
      {
        cpf: '124.650.360-33',
        email: 'luizpaulo@hotmail.com',
        name: 'luiz paulo',
        password: 'T3este@123!',
      },
    ];
    expect(UserValidator.checkCpfAlreadyInUse(users, cpf)).toBe(true);
  });
});
describe('Valida CPF', () => {
  test('Deve retornar error quando o CPF não está no padrão esperado', () => {
    const cpf = '479.419.180-4';
    expect(() => UserValidator.veryfiCpf(cpf)).toThrow('Invalid CPF');
  });
  test('Deve retornar error quando o CPF é invalido(111.111.111-11)', () => {
    const cpf = '111.111.111-11';
    expect(() => UserValidator.veryfiCpf(cpf)).toThrow('Invalid CPF');
  });
  test('Deve retornar true quando o CPF  está no padrão esperado', () => {
    const cpf = '434.782.900-07';
    expect(UserValidator.veryfiCpf(cpf)).toBe(true);
  });
});
