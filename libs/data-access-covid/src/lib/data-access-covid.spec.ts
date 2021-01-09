import * as DataInput from "./data-access-covid";
import * as Calculator from "./calculate_Data";

//the number of counties expected to be received
const numberOfCounties = 412;
//the number of states 
const numberOfStates = 16;
//timeout for the tests. A relatively high value (20sek) has been chosen since the API of the RKI is sometimes quite slow
const timeout = 20000;


/**
 * tests if the function to check numbers works as expected 
 */
describe("DataAccessCovid", () => {
  it("numberCheck works as expected", async () => {
    jest.setTimeout(timeout);

    expect(Calculator.isNumber(1)).toBe(true);
    expect(Calculator.isNumber(2.6)).toBe(true);
    expect(Calculator.isNumber("1")).toBe(true);
    expect(Calculator.isNumber("test")).toBe(false);
    expect(Calculator.isNumber("1,test")).toBe(false);

  });
});

/**
 * tests if the function clear the strings works as expected 
 */
describe("DataAccessCovid", () => {
  it("getting rid of umlaute and whitespaces works as expected", async () => {
    jest.setTimeout(timeout);

    expect(Calculator.cleanString("test test")).toBe("test_test");
    expect(Calculator.cleanString("test")).toBe("test");
    expect(Calculator.cleanString("täst")).toBe("taest");
    expect(Calculator.cleanString("Baden Württemberg")).toBe("Baden_Wuerttemberg");

  });
});


/**
 * tests if all states are read and all the attributes have been assigned a value
 */
describe("DataAccessCovid", () => {
  it("all states are read completely", async () => {
    jest.setTimeout(timeout);

    const states = await DataInput.getDataStates();
    expect((states).length).toBe(numberOfStates);
    for (let i = 0; i < states.length; i++) {

      expect(states[i].name).toBeTruthy();
      expect(states[i].lat).toBeTruthy();
      expect(states[i].long).toBeTruthy();

    }
  });
});

/**
 * tests if all counties are read and all the attributes have been assigned a value
 */
describe("DataAccessCovid", () => {
  it("all counties are read completely", async () => {
    jest.setTimeout(timeout);

    const counties = await DataInput.getDataCounties();

    expect((counties).length).toBe(numberOfCounties);

    //check if each county has all attributes

    for (let i = 0; i < counties.length; i++) {

      expect(counties[i].name).toBeTruthy();
      expect(counties[i].lat).toBeTruthy();
      expect(counties[i].long).toBeTruthy();
      expect(counties[i].population).toBeTruthy();
      expect(counties[i].state).toBeTruthy();
      expect(counties[i].id).toBeTruthy();

    }
  });
});


/**
 * tests with a sample if the data is read as expected
 */
describe("DataAccessCovid", () => {
  it("take a sample county and check if the data is correct", async () => {
    
    jest.setTimeout(timeout);
    const counties = await DataInput.getDataCounties();

    //check the countydata for a random sample
    expect(counties[0].name).toBe('Kreisfreie_Stadt_Flensburg');
    expect(counties[0].lat).toBe(54.77925635868037);
    expect(counties[0].long).toBe(9.427959802014792);
    expect(counties[0].population).toBe(90164);
    expect(counties[0].state).toBe('Schleswig-Holstein');
    expect(counties[0].id).toBe('01001');

  });
});


/**
 * tests if all cases are read and all the attributes have been assigned a value
 * because of the size of the data and the low speed of the API the following test might take some time.
 */

describe("DataAccessCovid", () => {
  it("all cases are read completely", async () => {
    jest.setTimeout(timeout * 10);

    const cases = await DataInput.getDataCases();

    //we don't know exactly how many cases there are but it should never be less than 500000 since the count is rising(counts active and recovered cases)
    expect(cases.length).toBeGreaterThan(500000);

    //check if each case has all attributes

    for (let i = 0; i < cases.length; i++) {

      expect(cases[i].countyID).toBeTruthy();
      expect(cases[i].id).toBeTruthy();
      expect(cases[i].date).toBeTruthy();
      expect(cases[i].cases).toBeTruthy();
      expect(cases[i].lastUpdate).toBeTruthy();

      //check differently for dead and recovered since they are allowed to be 0
      expect(cases[i].recovered).toBeGreaterThanOrEqual(-100); //might actually be negative if a person gets sich a second time. This is very rare and the lowest value for now is -2 so a lower border of -100 should be sufficient
      expect(cases[i].dead).toBeGreaterThanOrEqual(-100);      //might be negative as well if a death-case got reported even though the person is still alive. happend 8 times at the cretion of this code. again a border of -100 should be sufficient
    }
  });
});



