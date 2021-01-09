/**
 * Summary: This is a UI-card that contains the numberbox from grafana.
 * 
 * Description: When the user selects a county-entry from the list (listItems.tsx), the correct
 * numberbox needs to be loaded. 
 * 
 * @author Magdalena Köhler
 * @see https://confluence-student.it.hs-heilbronn.de/display/LAPSW2020WiSeTeam3/Projektstruktur
 * @param props the parameters to change this component
 */

import { Box, makeStyles, AppBar, Tab, Tabs, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "reactn";
import PropTypes from "prop-types";

// Constants --------------------------------------------------------------------------------------
/**
 * The base of the url is universal for all IFrames.
 */

const URL_BASE = `http://${window.location.hostname}:3000`

/**
 * This middle part of the URL refers to the respective panel in grafana.
 */

const URL_MID_NUMBERBOX = "/d-solo/M0o1360Gk/numberbox-per-county?orgId=1&panelId="

/**
 * This middle part of the URL refers to the respective panel in grafana. It contains the id.
 */

const URL_MID_TOTAL_GERMANY = "/d-solo/aim5ADoGz/total-germany-counties-states?orgId=1&panelId=10"

// IFrame settings for the numberbox --------------------------------------------------------------

/**
* The width of the numberbox will adapt to the width of the parent element.
*/

const WIDTH_NUMBERBOX = "100%"

/**
 * The height of the numberbox.
 */

const HEIGHT_NUMBERBOX = 104

/**
 * IFrame frame border.
 */

const FRAME_BORDER = 0

// React functional UI-component _-----------------------------------------------------------------

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

interface NumberboxcardCtyProps {
  countyId: number
  panelTheme?: string | null
}

export const NumberboxcardCty = (props: NumberboxcardCtyProps) => {
  const { countyId, panelTheme } = props
  const title = `county-${countyId}`

  const [url, setUrl] = useState("")
  const [value, setValue] = useState(0);
  const classes = useStyles();

  //everytime the countyId or theme changes, the url should change too
  useEffect(() => {
    //if county Id is 0 or 1, then the view for all states/ all counties has been chosen by the
    //user. Since in grafana there do never exist panels with an id higher than 2, we map it to 
    //the correct one.
    if (countyId < 1) {
      setUrl(`${URL_BASE}${URL_MID_TOTAL_GERMANY}${panelTheme}`)
    } else {
      setUrl(`${URL_BASE}${URL_MID_NUMBERBOX}${countyId}${panelTheme}`)
    }
  }, [panelTheme, countyId])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
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
          <Tab label="Zahlenbox" {...a11yProps(0)} />
          <Tab label="Hilfe" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <div>
          <iframe
            title={title}
            src={url}
            width={WIDTH_NUMBERBOX}
            height={HEIGHT_NUMBERBOX}
            frameBorder={FRAME_BORDER}>
          </ iframe>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Typography color="textSecondary" component="p" variant="h5">
          - Infektionen: Gesamtzahl aller Infektionen<br />
        - Genesene: Gesamtzahl aller Genesenen<br />
        - Todesfälle: Gesamtzahl aller Todesfälle <br />
        - R-Wert: Der Reproduktionswert gibt an, wie viele weitere Personen durch eine infizierte Person infiziert werden<br />
        Die hier gezeigten Werte sind absolute Zahlen.<br />
        </Typography>
      </TabPanel>
    </div>
  );
};

export default NumberboxcardCty;