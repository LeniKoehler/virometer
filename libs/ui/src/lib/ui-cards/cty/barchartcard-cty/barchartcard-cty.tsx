/**
 * Summary: This is a UI-card that contains the barchart panels from grafana for a county.
 * 
 * Description: When the user selects a county-entry from the list (listItems.tsx), the correct
 * barchart needs to be loaded. 
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
/**
 * The base of the url is universal for all IFrames.
 */

const URL_BASE = `http://${window.location.hostname}:3000`

/**
 * This middle part of the URL refers to the respective grafana dashboard.
 */

const URL_MID_BARCHART = "/d-solo/B-dXo0TGk/barchart-per-state?orgId=1&panelId="

// IFrame settings of the barchart ----------------------------------------------------------------

/**
 * The width of the barchart will adapt to the width of the parent element.
 */

const WIDTH_BARCHART = "100%"

/**
 * The height of the barchart.
 */

const HEIGHT_BARCHART = 200

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

interface BarchartcardCtyProps {
  countyId: number
  panelTheme: string | null
}

export function BarchartcardCty(props: BarchartcardCtyProps) {
  const { countyId, panelTheme } = props
  const title = `county-${countyId}`

  const [url, setUrl] = useState("")
  const [value, setValue] = useState(0);
  const [panelId, setPanelId] = useState(0)
  const classes = useStyles();

  //everytime the panelId or theme changes, the url should change too
  useEffect(() => {
    setUrl(`${URL_BASE}${URL_MID_BARCHART}${panelId}${panelTheme}`)
  }, [panelTheme, panelId])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  /**
   * As soon as you select a county, the bar chart of the county with the most infections in the
   * same state should be loaded in the dashboard. Since there are 412 counties to choose from but
   * only 16 bar charts, the Id of the county must first be checked to find the correct map. 
   */

  const initialPanelId = (panelId === 0)
  const correctPanelId = (panelId === countyId)

  if (initialPanelId || !correctPanelId) {
    if (panelId <= 16 && countyId <= 16) {
      setPanelId(17) //Schleswig-Holstein
    } else if (panelId !== 8 && countyId > 16 && countyId < 18) {
      setPanelId(8) //Hamburg Hamburg: due to rounding errors the condition is not "countyId===17"
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
      <Title>Balkendiagramm</Title>
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
            <Tab label="Balkendiagramm" {...a11yProps(0)} />
            <Tab label="Hilfe"  {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <div>
            <iframe
              title={title}
              src={url}
              width={WIDTH_BARCHART}
              height={HEIGHT_BARCHART}
              frameBorder={FRAME_BORDER}>
            </ iframe>
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Typography color="textSecondary" component="p" variant="h5">
            Das Balkendiagramm zeigt die Werte (Infektionen, Genesenen, Todesfälle) der meist betroffenen Region (gemessen an der Zahl der Infektionen in der Region) des Bundeslandes. <br />
          Die hier gezeigten Zahlen sind relativ zu 100.000 Einwohnern der Region.
      </Typography>
        </TabPanel>
      </div>
    </React.Fragment>
  )
}

export default BarchartcardCty;