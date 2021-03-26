// Import the js file to test
const { fetchSingleTrip } = require('../__mocks__/app')

// The describe() function takes two arguments - a string description, and a test suite as a callback function.
// A test suite may contain one or more related tests
describe("Testing the submit functionality", () => {
    // The test() function has two arguments - a string description, and an actual test as a callback function.
    test("fetchData() function exists", () => {
        expect(fetchSingleTrip).toBeDefined();
    });

    test('input should be passed', async () => {
        await expect(fetchSingleTrip()).resolves.toStrictEqual(
            { 
                city: 'Vienna',
                country: 'AT',
                date: '03/28/2021'
            });
    });
});