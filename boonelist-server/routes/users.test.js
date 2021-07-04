"use strict";

const request = require("supertest");

const db = require("../db.js");
const app = require("../app");
const User = require("../models/user");

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  u1Token,
  u2Token,
  adminToken,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);



describe("GET /users", function () {
  test("works gets all users", async function(){
    const resp = await request(app)
      .get("/users")
      .set("authorization", `Bearer ${adminToken}`);
    expect(resp.body).toEqual({
      users: [
        {
          username: "u1", 
          firstName: "U1F", 
          lastName: "U1L", 
          phone: "111-222-3333", 
          email: "testUser1@email.com", 
          isAdmin: false,
        },
        {
          username: "u2", 
          firstName: "U2F", 
          lastName: "U2L", 
          phone: "111-222-3333", 
          email: "testUser2@email.com", 
          isAdmin: false 
        },
        {
          username: "u3",
          firstName: "U3F",
          lastName: "U3L",
          phone: "111-222-3333", 
          email: "user3@user.com",
          isAdmin: false,
        },
      ]
    });
  });
});

describe("POST /users", function () {
  test("works for admins: create user", async function(){
    const resp = await request(app)
      .post("/users")
      .send({
        username: "u-new",
        firstName: "First-new",
        lastName: "Last-newL",
        phone: "222-333-4444",
        password: "password-new",
        email: "new@email.com",
        isAdmin: false,
      })
      .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toEqual(201)
    expect(resp.body).toEqual({
      user: {
      username: "u-new",
      firstName: "First-new",
      lastName: "Last-newL",
      phone: "222-333-4444",
      email: "new@email.com",
      isAdmin: false,
    }, token: expect.any(String),
    });
  });

  test("unauth for anon", async function () {
    const resp = await request(app)
        .post("/users")
        .send({
          username: "u-new",
          firstName: "First-new",
          lastName: "Last-newL",
          password: "password-new",
          phone: "222-333-4444",
          email: "new@email.com",
          isAdmin: true,
        });
    expect(resp.statusCode).toEqual(401);
  });

  test("bad request if missing data", async function () {
    const resp = await request(app)
        .post("/users")
        .send({
          username: "u-new",
        })
        .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toEqual(400);
  });
})