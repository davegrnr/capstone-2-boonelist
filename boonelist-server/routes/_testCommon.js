"use strict"

const db = require("../db.js")
const User = require ("../models/user")
const Sale = require ("../models/sale")
const Service = require ("../models/service")
const { createToken } = require("../helpers/tokens")

const testCommentIds = []

async function commonBeforeAll() {
    await db.query("DELETE FROM users")
    await db.query("DELETE FROM sales")

    await Sale.create({
        itemName: "item1", 
        price: 1, 
        itemInfo: "info1", 
    });
    await Sale.create({
        itemName: "item2", 
        price: 2, 
        itemInfo: "info2", 
    });

    await User.register({ 
        username: "u1", 
        password: "password1", 
        firstName: "U1F", 
        lastName: "U1L", 
        phone: "111-222-3333", 
        email: "testUser1@email.com", 
        isAdmin: false, 
    });
    await User.register({ 
        username: "u2", 
        password: "password2", 
        firstName: "U2F", 
        lastName: "U2L", 
        phone: "111-222-3333", 
        email: "testUser2@email.com", 
        isAdmin: false, 
    });
    await User.register({ 
        username: "u3",
        firstName: "U3F",
        lastName: "U3L",
        phone: "111-222-3333", 
        email: "user3@user.com",
        password: "password3",
        isAdmin: false,
    });
}

async function commonBeforeEach() {
    await db.query("BEGIN");
}

async function commonAfterEach() {
await db.query("ROLLBACK");
}

async function commonAfterAll() {
await db.end();
}

const u1Token = createToken({ username: "u1", isAdmin: false });
const u2Token = createToken({ username: "u2", isAdmin: false });
const adminToken = createToken({ username: "admin", isAdmin: true });


module.exports = {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
    u1Token,
    u2Token,
    adminToken,
};