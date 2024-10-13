import user from '../framework/services'
import config from '../framework/config'

describe('Авторизация', () => {
  test('Успешная авторизация', async () => {
    const res = await user.authorization(config.credential)
    expect(res.status).toBe(200)
  })

  test('Неуспешная авторизация, неверный пароль', async () => {
    const res = await user.authorization({
      userName: 'my_user',
      password: 'string',
    })
    expect(res.body.code).toBe('1207')
    expect(res.body.message).toBe('User not found!')
    expect(res.status).toBe(404)
  })
})

describe('Токен авторизации', () => {
  test('Получили токен - успешно', async () => {
    const res = await user.token(config.credential)
    expect(res.body.result).toBe('User authorized successfully.')
    expect(res.status).toBe(200)
    expect(res.body.token).toBeTruthy()
    console.log('data.token', res.body)
  })
})

describe('Получение информации о пользователе', () => {
  test('Успешное получение информации', async () => {
    const res = await user.info()
    // expect(res.body.username).toBe("my_user");
    expect(res.status).toBe(200)
  })
})

describe('Удаление пользователя', () => {
  test('Успешное удаление', async () => {
    const res = await user.delete(config.credential)
    expect(res.status).toBe(204)
  })
})
