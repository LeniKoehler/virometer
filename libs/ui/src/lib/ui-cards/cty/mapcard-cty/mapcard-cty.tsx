/**
 * Summary: This is a UI-card that contains the map panels from grafana for a county.
 * 
 * Description: When the user clicks on an county-entry from listItems.tsx, the correct maps need 
 * to be loaded. 
 * Each TabPanel of this component displays a panel with different data. The TabPanels are 
 * controlled by the Tabs. When the user clicks on a Tab in the AppBar, the respective content is
 * loaded. 
 * 
 * @author Magdalena Köhler, Rania Adam
 * @see https://confluence-student.it.hs-heilbronn.de/display/LAPSW2020WiSeTeam3/Projektstruktur
 * @param props the parameters to change this component
 */

import { Box, makeStyles, Typography, AppBar, Tabs, Tab } from "@material-ui/core";
import React, { useEffect, useState } from "reactn";
import PropTypes from "prop-types";
import Title from "../../../Title";

// Constants --------------------------------------------------------------------------------------

/** The base of the url is universal for all IFrames. */

const URL_BASE = `http://${window.location.hostname}:3000`

/** This middle part of URL refers to the map dashboard in grafana for infections in one state. */

const URL_MID_INFECTIONS = "/d-solo/J5DdlBAGk/map-per-state-infections?orgId=1&panelId="

/** This middle part of URL refers to the map dashboard in grafana for recovered in one state. */

const URL_MID_RECOVERED = "/d-solo/dG2V_ZbGz/map-per-state-recovered?orgId=1&panelId="

/** This middle part of URL refers to the map dashboard in grafana for deaths in one state. */

const URL_MID_DEATHS = "/d-solo/_ZiEfRbGz/map-per-state-deaths?orgId=1&panelId="

/** This middle part of URL refers to the map dashboard in grafana for infections in Germany. */

const URL_MID_TOTAL_GERMANY_INFECTIONS = "/d-solo/aim5ADoGz/total-germany-counties-states?orgId=1&panelId=21"

/** This middle part of URL refers to the map dashboard in grafana for recovered in Germany. */

const URL_MID_TOTAL_GERMANY_RECOVERED = "/d-solo/aim5ADoGz/total-germany-counties-states?orgId=1&panelId=25"

/** TThis middle part of URL refers to the map dashboard in grafana for deaths in Germany. */

const URL_MID_TOTAL_GERMANY_DEATHS = "/d-solo/aim5ADoGz/total-germany-counties-states?orgId=1&panelId=23"

// IFrame settings for the map --------------------------------------------------------------------

/**
 * The width of the map will adapt to the width of the parent element.
 */

const WIDTH_MAP = "100%"

/**
 * The height of the map.
 */

const HEIGHT_MAP = 770

/**
 * IFrame frame border.
 */

const FRAME_BORDER = 0

// React Component --------------------------------------------------------------------------------

//material-ui function for customizing theme
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper
  }
}));

//this creates a tabpanel that will hold our content
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={0}>
          <Typography component={'span'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

interface MapCardCtyProps {
  countyId: number
  panelTheme: string | null
}

export function MapcardCty(props: MapCardCtyProps) {
  const { countyId, panelTheme } = props
  const title = `county-${countyId}`

  const [urlInfections, setUrlInfections] = useState("")
  const [urlRecovered, setUrlRecovered] = useState("")
  const [urlDeaths, setUrlDeaths] = useState("")

  const [value, setValue] = useState(0);
  const [panelId, setPanelId] = useState(0)
  const classes = useStyles();

  //everytime the panelId or theme changes, the url should change too
  useEffect(() => {
    //if county Id is 0, then the view for all states/ all counties has been chosen by the
    //user. Since in grafana there do never exist panels with an id higher than 2, we map it to 
    //the correct one.
    if (panelId < 1) {
      setUrlInfections(`${URL_BASE}${URL_MID_TOTAL_GERMANY_INFECTIONS}${panelTheme}`)
      setUrlRecovered(`${URL_BASE}${URL_MID_TOTAL_GERMANY_RECOVERED}${panelTheme}`)
      setUrlDeaths(`${URL_BASE}${URL_MID_TOTAL_GERMANY_DEATHS}${panelTheme}`)
    } else {
      setUrlInfections(`${URL_BASE}${URL_MID_INFECTIONS}${panelId}${panelTheme}`)
      setUrlRecovered(`${URL_BASE}${URL_MID_RECOVERED}${panelId}${panelTheme}`)
      setUrlDeaths(`${URL_BASE}${URL_MID_DEATHS}${panelId}${panelTheme}`)
    }
  }, [panelTheme, panelId])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  /**
   * As soon as you select a county, the url changes and the map of the correct state should be 
   * displayed. Since there are 412 counties to choose from but only 16 federal state maps, the 
   * Id of the county must first be checked to find the correct map. Afterwards the map is loaded.
   */

  const initialPanelId = (panelId === 0)
  const correctPanelId = (panelId === countyId)

  if (initialPanelId || !correctPanelId) {
    if (panelId <= 16 && countyId > 1 && countyId <= 16) {
      setPanelId(17) //Schleswig-Holstein
    } else if (panelId !== 8 && countyId > 16 && countyId < 18) {
      setPanelId(8) //Hamburg: due to rounding errors the condition is not "countyId===17"
    } else if (panelId !== 11 && countyId >= 18 && countyId <= 62) {
      setPanelId(11) //Niedersachsen
    } else if (panelId !== 7 && countyId >= 63 && countyId <= 64) {
      setPanelId(7) //Bremen
    } else if (panelId !== 12 && countyId >= 65 && countyId <= 117) {
      setPanelId(12) //Nordrhein-Westfalen
    } else if (panelId !== 9 && countyId >= 118 && countyId <= 143) {
      setPanelId(9) //Hessen
    } else if (panelId !== 13 && countyId >= 144 && countyId <= 179) {
      setPanelId(13) //Rheinland-Pfalz
    } else if (panelId !== 2 && countyId >= 180 && countyId <= 223) {
      setPanelId(2) //Baden-Württemberg
    } else if (panelId !== 4 && countyId >= 224 && countyId <= 319) {
      setPanelId(4) //Bayern
    } else if (panelId !== 14 && countyId >= 320 && countyId <= 325) {
      setPanelId(14) //Saarland
    } else if (panelId !== 6 && countyId >= 326 && countyId <= 343) {
      setPanelId(6) //Brandenburg
    } else if (panelId !== 10 && countyId >= 344 && countyId <= 351) {
      setPanelId(10) //Mecklenburg-Vorpommern
    } else if (panelId !== 15 && countyId >= 352 && countyId <= 364) {
      setPanelId(15) //Sachsen
    } else if (panelId !== 16 && countyId >= 365 && countyId <= 378) {
      setPanelId(16) //Sachsen-Anhalt
    } else if (panelId !== 3 && countyId >= 379 && countyId <= 401) {
      setPanelId(3) //Thüringen
    } else if (panelId !== 5 && countyId > 401) {
      setPanelId(5) //Berlin
    }
  }

  return (
    <React.Fragment>
      <Title>Landkarte</Title>
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="on"
            indicatorColor="primary"
            textColor="primary"
            aria-label="scrollable force tabs example"
          >
            <Tab label="Infektionen" {...a11yProps(0)} />
            <Tab label="Genesene"  {...a11yProps(1)} />
            <Tab label="Todesfälle" {...a11yProps(2)} />
            <Tab label="Hilfe" {...a11yProps(3)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <div>
            <iframe
              title={title}
              src={urlInfections}
              width={WIDTH_MAP}
              height={HEIGHT_MAP}
              frameBorder={FRAME_BORDER}>
            </ iframe>
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <div>
            <iframe
              title={title}
              src={urlRecovered}
              width={WIDTH_MAP}
              height={HEIGHT_MAP}
              frameBorder={FRAME_BORDER}>
            </ iframe>
          </div>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <div>
            <iframe
              title={title}
              src={urlDeaths}
              width={WIDTH_MAP}
              height={HEIGHT_MAP}
              frameBorder={FRAME_BORDER}>
            </ iframe>
          </div>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <Typography color="textSecondary" component="p" variant="h5">
            - Infektionen: Gesamtzahl der Infektionen<br />
          - Genesene: Gesamtzahl der Genesenen <br />
          - Todesfälle: Gesamtzahl der Todesfälle <br />
          Die Zahlen sowie der Name der dazugehörigen Region werden sichtbar, indem man mit der Maus über einen Kreis fährt.<br />
          Die hier gezeigten Zahlen sind relativ zu 100.000 Einwohnern. <br />
            <br />
          Mit + und - (oben links auf der Karte) kann man auf der Karte rein- und rauszoomen. <br />
          </Typography>
        </TabPanel>
      </div>
    </React.Fragment>
  )
}

export default MapcardCty;