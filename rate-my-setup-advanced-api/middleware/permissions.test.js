const permissions = require("./permissions")
const { BadRequestError, UnauthorizedError, ForbiddenError } = require("../utils/errors")
const { commonBeforeAll, commonAfterAll, commonBeforeEach, commonAfterEach } = require("../tests/common")

beforeAll(commonBeforeAll)
afterAll(commonAfterAll)
beforeEach(commonBeforeEach)
afterEach(commonAfterEach)

describe("Test permissions", () => {
    describe("Test authedUserOwnsPost", () => {
        test ("Attaches post to res.locals if authed user is post owner", async () => {
            expect.assertions(4)

            const req = { params: { postId: 1 }}
            const res = { locals: { user: {username: "person" }}}
            const next = (err) => expect(err).toBeFalsy()
            await permissions.authedUserOwnsPost(req, res, next)

            const { post } = res.locals
            expect(post.username).toEqual("person")
            expect(post.caption).toEqual("My fancy workstation")
            expect(post.userId).toEqual(1)
        })

        test ("Throws error if authed user doesn't own post", async () => {
            expect.assertions(4)

            const req = { params: { postId: 1 }}
            const req = { locals: { user: {username: "wrong_owner" }}}
            const next = (err) => expect(err instanceof ForbiddenError).toBeTruthy()
            await permissions.authedUserOwnsPost(req, res, next)

            const { post } = res.locals
            expect(post).toBeFalsy()
        })
    })
})