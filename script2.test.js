const fetch = require("node-fetch");
const swapi = require("./script2");

it("calls swapi to get people", () => {
  expect.assertions(1); //good way to test if these things are actually running (especially with async code)
  return swapi.getPeople(fetch).then((data) => {
    expect(data.count).toEqual(87);
    // simpler way, just return the promise, jest is smart enough to say, because this is being returned, it's going to wait until this promise returns
    // if the promise is rejected, the test will automatically fail (v.helpful)
  });
});

// When running asynchronous tests always use
// ======
//expect.assertions(1);
// ======
// i.e. always test that your assertions are being tested

it("calls swapi to get people with a promise", () => {
  expect.assertions(2);
  return swapi.getPeoplePromise(fetch).then((data) => {
    expect(data.count).toEqual(87);
    expect(data.results.length).toBeGreaterThan(5);
  });
});

// expect.assertions(1); promises retuen a pending state so getPeople is going to get returned before actually receive the data
// ======
// How to tell the test to - don't just pass this test because nothing happened and just returned a promise with a pending state,
// wait until this is actually done and then keep going
// ======

// Afew ways to do it:
// 1. use a single argument called 'done'
// i.e.
// ======
// it("calls swapi to get people", (done) => {
//   swapi.getPeople(fetch).then((data) => {
//     expect(data.count).toEqual(87);
//     done();
//   });
// });
// this means, wait until the 'done' callback is called before can say this test is finished
// usually put it after the expect call
// ======
// A simpler way:
// Just return the promise
