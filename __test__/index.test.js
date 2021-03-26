// tutorial https://www.albertgao.xyz/2017/05/24/how-to-test-expressjs-with-jest-and-supertest/
const request = require("supertest");
const app = require("../src/server/index");

describe("Test the root path", () => {
  test("It should response the GET method", () => {
    return request(app)
      .get("/")
      .then(response => {
        expect(response.statusCode).toBe(200);
      });
  });
});