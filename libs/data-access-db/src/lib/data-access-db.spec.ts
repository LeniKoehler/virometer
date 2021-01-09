import * as dataAccessDb from "./data-access-db";
import { County } from "libs/data-access-covid/src/lib/custom_classes";
import { State } from "libs/data-access-covid/src/lib/custom_classes";
import { Case } from "libs/data-access-covid/src/lib/custom_classes";





/**
 * tests if counties are written and read correctly to and from the DB 
 */
describe("dataAccessDb", () => {
  it("counties are written and read correctly to and from the DB", async ()  => {

  //initialize knex object
  const knex = await dataAccessDb.init();

  //clear database
  await dataAccessDb.deleteAll(knex);

  //create testCounty
  const countyToWrite = new County("myCounty",27,"testState",1);
  countyToWrite.lat = 1;
  countyToWrite.long =1;
  await dataAccessDb.saveCounties(countyToWrite,knex);

  //read testCounty
  const readCounty = (await dataAccessDb.readCounties())[0];

  //check if read and written county are the same in all attributes
  expect(readCounty.id).toBe(countyToWrite.id);
  expect(readCounty.name).toBe(countyToWrite.name);
  expect(readCounty.lat).toBe(countyToWrite.lat);
  expect(readCounty.long).toBe(countyToWrite.long);
  expect(readCounty.state).toBe(countyToWrite.state);
  });
});

/**
 * tests if states are written and read correctly to and from the DB 
 */
describe("dataAccessDb", () => {
  it("states are written and read correctly to and from the DB", async ()  => {

  //initialize knex object
  const knex = await dataAccessDb.init();

  //create testState
  const stateToWrite = new State("myState",1,1);
  await dataAccessDb.saveStates(stateToWrite,knex);

  //read testState
  const readState = (await dataAccessDb.readStates())[0];

  //check if read and written state are the same in all attributes
  expect(readState.name).toBe(stateToWrite.name);
  expect(readState.lat).toBe(stateToWrite.lat);
  expect(readState.long).toBe(stateToWrite.long);
  });
});


/**
 * tests if cases are written and read correctly to and from the DB 
 */
describe("dataAccessDb", () => {
  it("cases are written and read correctly to and from the DB", async ()  => {

  //initialize knex object
  const knex = await dataAccessDb.init();

  //create test case
  const caseToWrite = new Case(1,1,1,1,'01.01.2000',1,'01.01.2000');
  const cases=[caseToWrite];
  await dataAccessDb.saveCases(cases,knex);
  

  //read test case
  const readCase = (await dataAccessDb.readCases())[0];

  //check if read and written case are the same in all attributes
  expect(readCase.cases).toBe(caseToWrite.cases);
  expect(readCase.countyID).toBe(caseToWrite.countyID);
  expect(readCase.date).toBe(caseToWrite.date);
  expect(readCase.dead).toBe(caseToWrite.dead);
  expect(readCase.id).toBe(caseToWrite.id);
  expect(readCase.lastUpdate).toBe(caseToWrite.lastUpdate);
  expect(readCase.recovered).toBe(caseToWrite.recovered);

  });
});

/**
 * tests if delete Db works as expected
 */
describe("dataAccessDb", () => {
  it("delete Db works as expected", async ()  => {

    const knex = await dataAccessDb.init();
    await dataAccessDb.deleteAll(knex);
    expect((await dataAccessDb.readCases()).length).toBe(0);

  });
});