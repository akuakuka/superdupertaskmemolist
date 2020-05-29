// const app = require('../index') // Link to your server file

import { server } from "../index"
import * as supertest from "supertest";
import { createConnection } from "typeorm";
import { TEST_PASSWORD, TEST_USERNAME } from "../config/config"

let request;
beforeAll(async done => {
  //  const connection = await createConnection();
  request = await supertest(server)
  done();
});
describe('get test route /test', () => {
  it('Wrong credentials fail', (done) => {
    // request.post("/auth/local/login")
    request.get("/test")
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});

describe('POST /auth/local/login', () => {
  it('Wrong credentials fail', (done) => {
    // request.post("/auth/local/login")
    request.post("/auth/local/login")
      .send({ username: 'john' }, { password: "!#%LK!5äp1io" })
      .set('Accept', 'application/json')
      .expect(401)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
  it('right credentials work and return jwt-token', (done) => {
    // request.post("/auth/local/login")
    request.post('/auth/local/login')
      .send({ username: TEST_PASSWORD }, { password: TEST_USERNAME })
      .set('Accept', 'application/json')
      .expect(200)

      .end((err, res) => {

        if (err) return done(err);
        expect(res.token);
        done();
      });
  });

});



afterAll(async () => {

  if (server) {
    await server.close();
  }
  await new Promise(resolve => setTimeout(() => resolve(), 500)); // avoid jest open handle error
})
