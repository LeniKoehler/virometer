import * as DataAcces from "@virometer-gmbh/data-access-covid";
import * as DataAccessDB from "@virometer-gmbh/data-access-db";



/**
 * write all tables (cases, counties, states) to the database
 */
export async function saveAll(){
 
  const knex = await DataAccessDB.init();

  await DataAccessDB.deleteAll(knex);

  console.log("save cases");
  await saveCases(knex);
  console.log("save counties");
  await saveCounties(knex);
  console.log("save states");
  await saveStates(knex);
}

/**
 * gets the cases from the API and saves them in the database
 */
async function saveCases(knex){
  
  //access API to read data
  const data = await DataAcces.getDataCases();

  //access DB to write data
  await DataAccessDB.saveCases(data, knex);
  
}

/**
 * gets the counties from the API and saves them in the database
 */
async function saveCounties(knex){
   
   //access API to read data
  const data = await DataAcces.getDataCounties();

  for (let i = 0; i < data.length; i++) {
   //access DB to write data
    await DataAccessDB.saveCounties(data[i], knex);
  }
}

/**
 * gets the states from the API and saves them in the database
 */
async function saveStates(knex){

  //access API to read data
  const data = await DataAcces.getDataStates();

  //access DB to write data
  for (let i = 0; i < data.length; i++) {
    await DataAccessDB.saveStates(data[i], knex);
  }
}
    

