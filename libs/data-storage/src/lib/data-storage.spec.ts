import * as DataStorage from "./data-storage";
import * as DataAccessDB from "@virometer-gmbh/data-access-db";
import * as DataAccessAPI from "@virometer-gmbh/data-access-covid";


/**
 * tests if the function to save all the API Data to the Database works as expected
 */
describe("DataAccessCovid", () => {
    it("after saving the data, the same entries are in DB and API", async () => {
      
        jest.setTimeout(1000000);
        
        //save the API data to the Database
        console.log("save data to database");
        await DataStorage.saveAll();

        //read data from the database
        const casesDB = await DataAccessDB.readCases();
        const countiesDB = await DataAccessDB.readCounties();
        const statesDB = await DataAccessDB.readStates();

        //read data from the API
        const casesAPI = await DataAccessAPI.getDataCases();
        const countiesAPI = await DataAccessAPI.getDataCounties();
        const statesAPI = await DataAccessAPI.getDataStates();


        
        console.log("check if states were saved correctly");
        //check if there is the same number of states in DB and API
        expect(statesDB.length).toBe(statesAPI.length);
        //check if states in DB and API are the same
        for (let i = 0; i < statesDB.length; i++) {
            expect(statesDB[i].name).toBe(statesAPI[i].name); 
            expect(statesDB[i].lat).toBe(statesAPI[i].lat);
            expect(statesDB[i].long).toBe(statesAPI[i].long);
        }


        console.log("check if counties were saved correctly");
         //check if there is the same number of counties in DB and API
         expect(countiesDB.length).toBe(countiesAPI.length);
         //check if counties in DB and API are the same
         for (let i = 0; i < countiesDB.length; i++) {
             expect(countiesDB[i].name).toBe(countiesAPI[i].name); 
             expect(countiesDB[i].lat).toBe(countiesAPI[i].lat);
             expect(countiesDB[i].long).toBe(countiesAPI[i].long);
             expect(countiesDB[i].population).toBe(countiesAPI[i].population);
             expect(countiesDB[i].id).toBe(Number(countiesAPI[i].id));
             expect(countiesDB[i].state).toBe(countiesAPI[i].state);
         }

         console.log("check if cases were saved correctly");
         //check if there is the same number of cases in DB and API
         expect(casesDB.length).toBe(casesAPI.length);
         //check if cases in DB and API are the same
         for (let i = 0; i < casesDB.length; i++) {
             expect(casesDB[i].countyID).toBe(Number(casesAPI[i].countyID)); 
             expect(casesDB[i].recovered).toBe(casesAPI[i].recovered); 
             expect(casesDB[i].id).toBe(Number(casesAPI[i].id)); 
             expect(casesDB[i].date).toBe(casesAPI[i].date); 
             expect(casesDB[i].dead).toBe(casesAPI[i].dead); 
             expect(casesDB[i].cases).toBe(casesAPI[i].cases); 
             expect(casesDB[i].lastUpdate).toBe(casesAPI[i].lastUpdate); 
          
         }

  
    });
  });