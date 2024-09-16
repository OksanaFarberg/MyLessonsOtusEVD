// контролеры, обертка над запросами апи

import supertest from 'supertest';

import config from '../config/config';
const { url } = config;
let token = '';
let userID = "b027321d-bbf9-4bec-8a88-27f57c165331";

// Контроллер user
const user = {
  token: (payload) => {
   return supertest(url)
     
      .post('/api/v1/login')
      .set('Accept', 'application/json')
      .send(payload)
  },

  // Каждый раз запрос к веб-серверу
  async getAuthToken() {
    const payload = config.credentials
    const res = await this.login(payload) // this = user. Аналогичен await user.login(payload)

    return res.body.token
  },

  // Здесь будет кэш
  async getAuthTokenWithCache() {
    if (token) {
      return token
    }

    token = await this.getAuthToken()

    return token
  },

  user: token => {
    return supertest(url)
      .get('/api/v1/user')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send()
  },
}

export default user

// JWT - JSON Web Token
// specs
// specs/user/login
// specs/user
