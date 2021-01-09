import * as express from 'express';
import * as DataAccessDB from "@virometer-gmbh/data-access-db";
import * as fs from 'fs';
import * as converter from 'json-2-csv';
const app = express();

//port at which the api is offered
const port = 1337;

//path where the json file is saved
const filePathJSON = 'data/downloadData.json'; 
//path where the csv file is saved
const filePathCSV = 'data/downloadData.csv'; 


export function dataDownload(): string {
  return "data-download";
}



/**
 * write JSON and CSV files and write save it at path specified in variable
 */

export async function writeFiles(){
  //read cases from database
  const responseJson = await DataAccessDB.readCases();
  //write cases to json-file
  await writeFileAsJSON(await responseJson);
  //write cases to csv-file
  await writeFileAsCsv(await responseJson);
}

/**
 * provide an API that can be accessed by the frontend. It returns an JSON file on port 1337/downloadJSON and an CSV file on port 1337/downloadCSV
 */
export async function provideAPI(){

  //offer json for download
  app.get('/downloadJSON', async function(req, res){
  const file = filePathJSON;
  res.download(file);
  });

  //offer csv for download
  app.get('/downloadCSV', async function(req, res){
const file = filePathCSV;
    res.download(file);
    });

  
   //listen at port 1337 for API-call
  app.listen(port, function () {
      const datetime = new Date();
      const message = "Download API is running at:- " + port + "Started at :- " + datetime;
      console.log(message);
  });
}



/**
 * converts the json-data received from the database to csv and writes it to a file
 * @param myJson the json data to convert
 */
 async function writeFileAsCsv(myJson) {

  //use json2csv library to convert csv to json
  converter.json2csv(myJson,(err,csv)=>{
    if (err) {
      throw err;
  }
  //write csv to file
  fs.writeFileSync(filePathCSV, csv);
  });

  
}

/**
 *  writes data to json file it to a file
 * @param myJson the json data to convert
 */
async function writeFileAsJSON(myJson) {

  await fs.writeFileSync(filePathJSON,JSON.stringify( myJson,null,4));
  
  
  
}

