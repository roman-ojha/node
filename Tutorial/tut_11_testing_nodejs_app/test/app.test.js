const request = require("supertest");
const app = require("../app");

describe("Todos API", () => {
  it("GET /todos --> array todos", () => {
    //   request '/todos' route and be able to get back array of todo's

    // here now we have to request to the express 'app' and should get the desirable output
    // now here we are requesting on route '/todos' and we would expect to get content-type as application/json and expect to get 200 status code
    return request(app)
      .get("/todos")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        // and now here after getting response what we would expect
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              name: expect.any(String),
              completed: expect.any(Boolean),
            }),
          ])
        );
      });
  });
  it("GET /todos/id --> specific todo by ID", () => {
    //
    return (
      request(app)
        .get("/todos/1")
        //   now here we would want to get the single todos rather then array of todo
        .expect("Content-Type", /json/)
        .expect(200)
        .then((response) => {
          // and now here after getting response what we would expect
          expect(response.body).toEqual(
            expect.arrayContaining([
              expect.objectContaining({
                name: expect.any(String),
                completed: expect.any(Boolean),
              }),
            ])
          );
        })
    );
  });
  it("GET /todos/id --> 404 if not found", () => {
    //
  });
  it("POST /todos --> created todo", () => {
    //
  });
  it("GET /todos --> validate request body", () => {});
});
