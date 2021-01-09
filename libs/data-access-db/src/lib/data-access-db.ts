import * as mapping from './ApiDatabaseMapping'
import * as Knex from 'knex';

/////////////////////////Helper Functions////////////////////////////////////
/////////////////////////Getter//////////////////////////////////////////////

/////////////////////////Setter//////////////////////////////////////////////
/**
  Helper Function to get around async function call and set new Data Entry to Bundesland Table
*/
export async function saveStates(json, knex) {

  const input = []
  input.push(json) //Object has to be in a Array in order to use it with knex

  try {
    await knex(mapping.MAPPING.STATE_TABLE_NAME).insert(input) //Executes Insert Statement with one row in Converted JSON
  } catch (error) {
    console.error(error)
  }
}

/**
  Helper Function to get around async function call and set new Data Entry to Landkreis Table
*/
export async function saveCounties(json, knex) {

  const input = []
  input.push(json)//Object has to be in a Array in order to use it with knex

  try {
    await knex.insert(input).from(mapping.MAPPING.COUNTY_TABLE_NAME)//Executes Insert Statement with one row in Converted JSON
  } catch (error) {
    console.error(error)
  }
}

/**
  Helper Function to get around async function call and set new Data Entry to Landkreis Table
*/
export async function saveCases(json, knex) {

  try {
    await knex.batchInsert(mapping.MAPPING.CASES_TABLE_NAME, json, 1000)//Executes Insert Statement with one row in Converted JSON
  } catch (error) {
    console.error(error)
  }
}

/**
 * Helper Function to initialize the Postgres Connection 
 */
export async function init() {
  const knex = Knex({
    client: 'pg',
    connection: 'postgres://virometer:virometerPasswort1@db:5432/virometer',
    version: '13'
  });

  return knex;
}

/**
 * Helper Function to Delete all Rows in the Tables, so it can be filled again with not duplicates 
 */
export async function deleteAll(knex) {
  try {
    await knex.whereNot('id', 0).from(mapping.MAPPING.CASES_TABLE_NAME).del()
    await knex.whereNot('id', 0).from(mapping.MAPPING.COUNTY_TABLE_NAME).del()
    await knex.whereNot('name', "").from(mapping.MAPPING.STATE_TABLE_NAME).del()
  } catch (error) {
    console.error(error)
  }
}



//read states from db and return as Array
export async function readStates() {
  try {
    const knex = await init();
    const array = await knex.select('*').from(mapping.MAPPING.STATE_TABLE_NAME) //Executes Select Statement 
    return array
  } catch (error) {
    return "failed"
  }
}

//read counties from db and return as Array
export async function readCounties() {
  const knex = await init();
  try {
    const array = await knex.select('*').from(mapping.MAPPING.COUNTY_TABLE_NAME) //Executes Select Statement 

    return array
  } catch (error) {
    return "failed"
  }
}

//read states from db and return as Array
export async function readCases() {
  const knex = await init();
  try {
    const array = await knex.select('*').from(mapping.MAPPING.CASES_TABLE_NAME) //Executes Select Statement 

    return array
  } catch (error) {
    return "failed"
  }
}