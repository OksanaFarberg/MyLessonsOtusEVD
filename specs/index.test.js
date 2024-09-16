import supertest from "supertest";
const url = 'https://bookstore.demoqa.com'

/* Напишите API тесты на следующие апи ручки (api endpoints)

Авторизация
Удаление пользователя
Получение информации о пользователе
При написании АПИ-тестов обязательно использовать контроллеры, так же вынести в конфиг данные для авторизации, базовый УРЛ.
Будет плюсом, если так же вы отрефакторите тесты написанные в рамках ДЗ АПИ тесты 
*/
// мой код 
describe('Тест создания пользователя на букстор', () => {
  it('Создание пользователя успешно', async () => {
    const response = await fetch(`${url}/Account/v1/User`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName: 'bobywnaa',
        password: '123Abcdef!',
      }),
    })
    console.log('response.status', response.status)
    const data = await response.json()
    console.log(data.username)
    expect(response.status).toEqual(201)
    expect(data.username).toBe('bobywn')
  }) })
  const request = require("supertest");
  //const app = require("../app");
  describe("Тест создания пользователя на букстор", () => {
    it("Создание пользователя успешно", async () => {
      const res = await request.post(`${url}/Account/v1/User`).send({
        userName: 'bobywnq',
        password: '12345Abcdef!'
      });
      expect(res.status).toBe(201);
      expect(res.body.name).toBe("Product 2");
    });
  });
  


// /api/v1/login - авторизация пользователя. Входнные данные в формате JSON
// Два поля username и password. Тестовые данные username = demo, password = demo
// Если авторизация успешная, то возвращается 200 + token авторизация.

// DRY - Don't repeat yourself.
// KISS - Keep it simple, stupid
// Создали контроллер user и в нем создали несколько методов(свойств с функциями)


import user from '../framework/services/controller'

describe('user', () => {
  describe.only('POST /api/v1/login', () => {
    test('Авторизация должна проходить успешно с правильным логином и паролем', async () => {
      // Arrange
      const input = { username: 'demo', password: 'demo' }

      // Act
      const res = await user.login(input)

      // Result
      expect(res.status).toEqual(200);
      expect(typeof res.body.token).toEqual('string')
      // token - рандомная строка. Утиная проверка.
      // 1. Проверить что поле существует
      // 2. Проверить что поле строка
      // 3. Проверить что поле является валидным токеном. В данном случае это JWT-токен.
      // Можно спапшотить?
    })

    test('Авторизация должна возвращать статус с кодом 412 ошибки если логин неверный', async () => {
      const res = await user.login({ username: 'demo1', password: 'demo' })

      expect(res.status).toEqual(412);
      expect(res.body).toMatchSnapshot();
      //expect(res.body).toEqual({ code: 1011, message: 'Wrong username or password.' });
    })

    test('Авторизация должна возвращать статус с кодом 412 ошибки если пароль неверный', async () => {
      const res = await user.login({ username: 'demo', password: 'demo1' })

      expect(res.status).toEqual(412);
      expect(res.body).toEqual({ code: 1011, message: 'Wrong username or password.' })
    })

    test('Авторизация должна возвращать статус с кодом ошибки 400 если данных нет', async () => {
      const res = await user.login({})

      expect(res.status).toEqual(400);
      expect(res.body).toEqual({ code: 1004, message: 'Please specify a username and a password.' })
    })

    test('Авторизация должна возвращать статус с кодом ошибки 412 ошибки если пароль неверный', async () => {
      const res = await user.login({ username: 'demo', password: 'DEMO' })

      expect(res.status).toEqual(412);
      expect(res.body).toEqual({ code: 1011, message: 'Wrong username or password.' })
    })

    test('Авторизация должна возвращать статус с кодом ошибки 412 ошибки если пароль неверный', async () => {
      const res = await user.login({ username: 'demo', password: 1 })

      expect(res.status).toEqual(400);
      expect(res.body).toEqual({ code: 1004, message: 'Please specify a username and a password.' })
    })
  })

  describe('GET /api/v1/user', () => {
    test('Должен отдавать информацию о пользователе', async () => {
      const token = await user.getAuthToken()
      const res = await user.user(token)

      expect(res.status).toEqual(200);
    })
  })
})