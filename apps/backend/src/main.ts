import * as Datastorage from '@virometer-gmbh/data-storage';
import * as DownloadAPI from '@virometer-gmbh/data-download';

//////////////////////////////Database BACKEND ////////////////////////////////////////////////////////////
setTimeout(run, 10000)//Start Programm

/**
 * Basicly the main Function
 */
async function run(){
  
  console.log("Running")
  init()//Call Init Method on Startup to write the Data once 
  
  setInterval(checkTime, 3600000);//Pereodicly execute CheckTime, 3600000 = every hour

  
  
}

/**
 * Function to Check the Time, if it is 3AM the execute saveAll
 */
function checkTime(){

  const date = new Date();//Tet Current time
  
  if(date.getHours() == 3){ //Check if its 3AM
    console.log("Renew Data: " + date)
    Datastorage.saveAll() //Execute saveAll
  }
  if(date.getHours() == 4){ //Check if its 4AM  //give the database one hour to update in case the RKI servers are under stress
    console.log("Create Download Data: " + date)
    DownloadAPI.writeFiles();
  }

} 

/**
 * Function to initialize Database Data
 */
async function init(){
  console.log("Initializing Database")
  Datastorage.saveAll()

  
  DownloadAPI.provideAPI();
}