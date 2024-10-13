// контроллёр
import supertest from 'supertest'
import config from './config.js'

const { url } = config;
// let token ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6Im15X3VzZXIiLCJwYXNzd29yZCI6IjEyMzQ1NkFhQCIsImlhdCI6MTcyODgzNzY1MX0.XJ7uXtglS5EXmgyKjHHboCpXhRJWwQ5PAiitLrIHuAE'
const userID = '5a220e38-de85-4c40-ae4d-73c09f902c48';
let token;

const user = {
  token: payload => {
    return supertest(url)
      .post('/Account/v1/GenerateToken')
      .set('Accept', 'application/json')
      .send(payload)
  },

  authorization: payload => {
    return supertest(url)
      .post('/Account/v1/Authorized')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(payload)
  },

  info: payload => {
    return supertest(url)
      .get('/Account/v1/User/' + `${userID}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(payload)
  },

  delete: payload => {
    return supertest(url)
      .delete('/Account/v1/User/' + `${userID}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(payload)
  },
}

export default user
