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

it("getPeople returns count and results", () => {
  //Mocking the fetch
  const mockFetch = jest.fn().mockReturnValue(
    Promise.resolve({
      json: () =>
        Promise.resolve({
          count: 87,
          results: [0, 1, 2, 3, 4, 5]
        })
    })
  );

  expect.assertions(4);
  return swapi.getPeoplePromise(mockFetch).then((data) => {
    expect(mockFetch.mock.calls.length).toBe(1);
    expect(mockFetch).toBeCalledWith("https://swapi.co/api/people");
    expect(data.count).toEqual(87);
    expect(data.results.length).toBeGreaterThan(5);
  });
});

// =======================================
// expect.assertions(1); promises return a pending state so getPeople is going to get returned before actually receive the data
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
// ======
// Mocks

// Can fake a function
// Just pretend to have it running

// so can SPY on the bahaviour of a function - that is called indirectly by some other code
//rather than just testing the output and waiting for the async code to complete

// Mock functions are also known as "spies", because
// they let you spy on the behavior of a function that is
// called indirectly by some other code, rather than just
// testing the output. You can create a mock function with
// jest.fn(). If no implementation is given, the mock
// function will return undefined when invoked.
