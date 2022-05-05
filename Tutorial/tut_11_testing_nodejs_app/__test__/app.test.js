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
              id: expect.any(Number),
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
            expect.objectContaining({
              name: expect.any(String),
              completed: expect.any(Boolean),
            })
          );
        })
    );
  });
  it("GET /todos/id --> 404 if not found", () => {
    //
    return request(app).get("/todos/99999").expect(404);
    // here we would want expect 404 error if we would pass some none exist id
  });
  it("POST /todos --> created todo", () => {
    // now in this test we would like to create todo and request to the server and should get the response back
    return request(app)
      .post("/todos")
      .send({
        // send() is an request body
        name: "go for walk",
      })
      .expect("Content-Type", /json/)
      .expect(201)
      .then((response) => {
        expect(response.body).toEqual(
          // now we would expect to get back this object
          expect.objectContaining({
            name: "go for walk",
            completed: false,
          })
        );
      });
  });
  it("POST /todos --> validate request body", () => {
    // in this test we would like to test if user given a number then it should return 400||422 response
    return request(app).post("/todos").send({ name: 123 }).expect(422);
  });
});
