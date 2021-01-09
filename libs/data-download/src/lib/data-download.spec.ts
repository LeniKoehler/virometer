import * as dataDownload from "./data-download";
import * as dataAccessDb from "@virometer-gmbh/data-access-db";
import { County } from "libs/data-access-covid/src/lib/custom_classes";
import { State } from "libs/data-access-covid/src/lib/custom_classes";
import { Case } from "libs/data-access-covid/src/lib/custom_classes";

//path where the json file is saved
const filePathJSON = '../../../../data/downloadData.json'; 
/**
 * tests if counties are written and read correctly to and from the file 
 */
describe("dataAccessDb", () => {
  it("counties are written and read correctly to and from the file", async ()  => {


    //create some database entries to test the donload

    //initialize knex object
    const knex = await dataAccessDb.init();


     //create test case
    const caseToWrite = new Case(1,1,1,1,'01.01.2000',1,'01.01.2000');
    const cases=[caseToWrite];
    await dataAccessDb.saveCases(cases,knex);
    
    //write the data to files
    await dataDownload.writeFiles();

    //read data from file
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const data = require(filePathJSON);

    //check if case in file is the same as the one that was written
    expect(data[0].id).toBe(1);
    
});

});



