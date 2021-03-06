const request = require('supertest');
const express = require('express');
const session = require('express-session');
const auth = require('../index');

let server;
let app;

async function getApp() {
  server = express();
  server.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'super secret',
  }));

  return auth(server);
}

describe('auth', () => {
  beforeAll(async () => {
    app = await getApp();
  });

  it('redirects to base page after logging out', async () => {
    const response = await request(app).get('/logout');
    expect(response.statusCode).toEqual(302);
    expect(response.header).toEqual(
      expect.objectContaining({
        location: '/',
      }),
    );
  });
});
