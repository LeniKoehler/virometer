

import * as Calculator from "./calculate_Data";
import { County } from "./custom_classes";
import { State } from "./custom_classes";
import { Case } from "./custom_classes";
import * as fs from 'fs';

import fetch from "node-fetch";
const apiUrl = "https://services7.arcgis.com/mOBPykOjAyBO2ZKk/arcgis/rest/services/RKI_Landkreisdaten/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json";
const apiUrl2nd = "https://opendata.arcgis.com/datasets/dd4580c810204019a7b8eb3e0b329dd6_0.geojson";
const countyPosPath = './data/countyPos.json';
const statePosPath = './data/statePos.json';
const myCounties = [];
const myCases = [];

/**
 * returns an array with all the counties
 */
export async function getDataCounties() {
  let counties = await readDataCounties();
  counties = await readPositionCounties(counties);
  return counties;
}

/**
 * returns an array with all the states
 */
export async function getDataStates() {

  //read the state-data from file 
  const states = await readStates();

  //save states in the format given by the custom class state
  const myStates = [];
  for (let i = 0; i < states.length; i++) {
    let lat;
    let long;

    //check if latitude is a number
    if (Calculator.isNumber(states[i].latitude)) {
      lat = states[i].latitude;
    }

    //check if longitude is a number
    if (Calculator.isNumber(states[i].longitude)) {
      long = states[i].longitude;
    }
    
    //store the name of the state
    const name = Calculator.cleanString(states[i].name);
    
    myStates[i] = new State(name, lat, long);
  }

  //return array that holds the states with all their information
  return myStates;
}

/**
 * returns an array with all the cases
 */
export async function getDataCases() {

  //fetch API
  const response = await fetch(apiUrl2nd);
  const responseData = await response.json();

  let i;
  for (i = 0; i < responseData.features.length; i++) {
    
    let countyID;
    let recovered;
    let dead;
    let id;
    let cases;
    
    //store countyID if it is a number
    if (Calculator.isNumber(responseData.features[i].properties.IdLandkreis)) {
      countyID = responseData.features[i].properties.IdLandkreis;
    }

    //store recovered if it is a number
    if (Calculator.isNumber(responseData.features[i].properties.AnzahlGenesen)) {
      recovered = responseData.features[i].properties.AnzahlGenesen;
    }

    //store dead if it is a number
    if (Calculator.isNumber(responseData.features[i].properties.AnzahlTodesfall)) {
      dead = responseData.features[i].properties.AnzahlTodesfall;
    }

    //store id if it is a number
    if (Calculator.isNumber(responseData.features[i].properties.ObjectId)) {
      id = responseData.features[i].properties.ObjectId;
    }

    //store the date of the case
    const date = responseData.features[i].properties.Meldedatum;

    //store cases if it is a number
    if (Calculator.isNumber(responseData.features[i].properties.AnzahlFall)) {
      cases = responseData.features[i].properties.AnzahlFall;
    }

    //store the date of the APIs last update
    const lastUpdate = responseData.features[i].properties.Datenstand;

    //add case to list
    myCases[i] = (new Case(countyID, recovered, dead, id, date, cases, lastUpdate));
  }
  return await myCases;
}

/**
 * reads the position of the counties from a file and adds them to the according county
 * @param counties the list of counties to which the position is added
 */
export async function readPositionCounties(counties) {

  //read from file
  const data = fs.readFileSync(countyPosPath, 'utf8');

  // parse JSON string to JSON object
  const countyPos = JSON.parse(data);
  const myCounties = counties;

  for (let i = 0; i < myCounties.length; i++) {

    for (let j = 0; j < countyPos.length; j++) {

      //adds position to counties;
      if (myCounties[i].id == countyPos[j].id) {

        myCounties[i].lat = Number(countyPos[j].latitude);
        myCounties[i].long = Number(countyPos[j].longitude);
      }
    }
  }

  //returns counties with position added
  return myCounties;
}

/**
 * reads the states from file
 */
export async function readStates() {
 const data = fs.readFileSync(statePosPath, 'utf8');

// parse JSON string to JSON object
 const output = JSON.parse(data);
  return output;
}

/**
 * reads the counties from api. These aren't read from a file since the population might change
 */
export async function readDataCounties() {

  const response = await fetch(apiUrl);
  const responseData = await response.json();

  let i;
  for (i = 0; i < responseData.features.length; i++) {

    let name;
    let population;
    let id;
   
    //county name is a combination of the actuall name of the county and it's type, e.g. Landkreis Heilbronn or Stadtkreis Heilbronn
    name = responseData.features[i].attributes.BEZ.concat(" ", responseData.features[i].attributes.GEN);

    //read population and store it if its a number
    if (Calculator.isNumber(responseData.features[i].attributes.EWZ)) {
      population = responseData.features[i].attributes.EWZ;
    }

    //store state which the county belongs to
    const state = Calculator.cleanString(responseData.features[i].attributes.BL);

    //read id and store it if its a number
    if (Calculator.isNumber(responseData.features[i].attributes.RS)) {
      id = responseData.features[i].attributes.RS;
    }

    //clean String of whitespaces and umlaut
    name = Calculator.cleanString(name);

    //add county to list
    myCounties[i] = (new County(name, population, state, id));
  }
 return myCounties;
}