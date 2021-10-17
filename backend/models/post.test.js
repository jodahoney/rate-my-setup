const db = require("../db")
const { BadRequestError, UnauthorizedError } = require("../utils/errors")
const Post = require("./post")
const { commonBeforeAll, commonAfterAll, commonBeforeEach, commonAfterEach } = require("../tests/common")

// makes it so each of these tests happen individually
// and that whatever changes are made in the db are rolled back
beforeAll(commonBeforeAll)
afterAll(commonAfterAll)
beforeEach(commonBeforeEach)
afterEach(commonAfterEach)

// test post
const newPost = {
    caption: "test",
    imageUrl: "test",
}


describe("Post", () => {
    // describe create post
    // describe llistposts
    // describe fetchpostbyid

    describe("Test createNewPost", () => {
        test("User can succesfully create post with required fields", async () => {
            const user = { username: "person" }
            const post = await Post.createNewPost({ newPost, user})
            expect(post.caption).toEqual(newPost.caption)
        })
    })
})

