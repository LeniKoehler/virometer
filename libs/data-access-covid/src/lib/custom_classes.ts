

/**
 * This is the custom type County 
 */
export class County {

  public name;        //name of the county
  public population;  //population of the county
  public state;       //state the county belongs to
  public id;          //id of the county
  public lat = 0;     //latitude of the county
  public long = 0;    //longitude of the county

    /**
     * 
     * @param name        name of the county
     * @param population  population of the county
     * @param state       state the county belongs to
     * @param id          id of the county
     */
  constructor(name,population,state,id) {
    this.name = name;
    this.population =population;
    this.state = state;
    this.id = id;
    
  }
}

/**
 * This is the custom type State
 */
export class State {

  public name;      //name of the state
  public lat = 0;   //latitude of the state
  public long= 0;   //longitude of the state

  /**
   * 
   * @param name name of the state
   * @param lat longitude of the state
   * @param long link that leads to the subpage of the state on our website
   */
  constructor(name,lat,long) {
    this.name = name;
    this.lat = lat;
    this.long = long;
   
  }
}



/**
 * This is the custom type Case
 * each instance of this class holds the cases of a specific group in a specific county at a specific date
 */
export class Case {

  public countyID;      //the id of the county where the cases were reported
  public recovered;     //the number of recovered
  public id;            //the id of the entry
  public date;          //the date at which the case was reported
  public dead;          //number of dead cases
  public cases;         //number of reported cases
  public lastUpdate;    //date of last update of the data

    /**
     * 
     * @param countyID    the id of the county where the cases were reported
     * @param recovered   the number of recovered
     * @param dead        number of dead cases
     * @param id          the id of the entry
     * @param date        the date at which the case was reported
     * @param cases       number of reported cases
     * @param lastUpdate  date of last update of the data
     */
  constructor(countyID,recovered,dead,id,date,cases,lastUpdate) {
    
    this.recovered = recovered;
    this.countyID=countyID;
    this.id=id;
    this.dead=dead;
    this.date=date;
    this.cases=cases;
    this.lastUpdate = lastUpdate;
    
  }
}