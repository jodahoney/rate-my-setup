const db = require("../db")
const { BadRequestError, UnauthorizedError } = require("../utils/errors")
const User = require("./user")
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


describe("User", () => {
    describe("Test user registration", () => {
        test("User can succesfully register with proper credentials", async () => {
            const user = await User.register({ ...newUser, password: "pw" })
            expect(user).toEqual({
                id: expect.any(Number),
                username: newUser.username,
                email: newUser.email,
                isAdmin: newUser.isAdmin,
                createdAt: expect.any(Date)
            })
        })

        test("Registering with duplicate email throws error", async () => {
            expect.assertions(1)        // Requiring exactly one assertion call

            try {
                await User.register({ ...newUser, password: "pw" })
                await User.register({ ...newUser, username: "something_else", password: "pw" })
            } catch(err) {
                expect(err instanceof BadRequestError).toBeTruthy()
            }
        })

        test("Registering with duplicate username throws error", async () => {
            expect.assertions(1)        // Requiring exactly one assertion call

            try {
                await User.register({ ...newUser, password: "pw" })
                await User.register({ ...newUser, email: "something@else.io", password: "pw" })
            } catch(err) {
                expect(err instanceof BadRequestError).toBeTruthy()
            }
        })
    })
})

