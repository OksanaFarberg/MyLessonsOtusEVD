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
    const username = 'oksana_user_delete0@test.net'
    const password = 'P@ssw0rd' 
    const responseCreate = await user.create({
      userName: username,
      password
    })
    const responseToken = await user.token({
      userName: username,
      password
    })
    const responseDelete = await user.delete({
      userId: responseCreate.body.userID,
      token: responseToken.body.token
    })
    expect(responseDelete.status).toBe(204)
    // можно как вариант ещё попробовать авторизоваться, чтобы убедиться, что пользователь точно удалён
  })
})
