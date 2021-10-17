const request = require("supertest")
const app = require("../app")
const tokens = require("../utils/tokens")

const { 
    commonBeforeAll,
    commonAfterAll,
    commonBeforeEach,
    commonAfterEach,
} = require("../tests/common")


// makes it so each of these tests happen individually
// and that whatever changes are made in the db are rolled back
beforeAll(commonBeforeAll)
afterAll(commonAfterAll)
beforeEach(commonBeforeEach)
afterEach(commonAfterEach)

const themToken = tokens.createUserJwt({ username: "them", isAdmin: false })

describe("Auth Routes", () => {
    describe("GET /auth/me", () => {
        test ("Authenticated user receives their profile when hitting endpoint.", async () => {
            // setting jwt token in auth header so it should be an authenticated request
            const res = await request(app).get(`/auth/me`).set("Authorization", `Bearer ${themToken}`)  
            expect(res.statusCode).toEqual(200)

            expect(res.body.user).toEqual({
                id: expect.any(Number),
                username: "them",
                email: "them@them.us",
                createdAt: expect.any(String),
                isAdmin: false,
            })
        })

        test ("Unauthenticated request throws a 401 error.", async () => {
            const res = await request(app).get(`/auth/me`)

            expect(res.statusCode).toEqual(401)
        })
    })
})