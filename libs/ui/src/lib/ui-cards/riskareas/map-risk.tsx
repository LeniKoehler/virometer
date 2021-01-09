/**
 * Summary: This is a UI-card that contains the map panels from grafana.
 * 
 * Description: When the user clicks on the riskarea-entry from listItems.tsx, 
 * the correct maps needs to be loaded. 
 * Each TabPanel of this component displays a panel with different data. The TabPanels are 
 * controlled by the Tabs. When the user clicks on a Tab in the AppBar, the respective content is
 * loaded. 
 * 
 * @author Magdalena Köhler
 * @see https://confluence-student.it.hs-heilbronn.de/display/LAPSW2020WiSeTeam3/Projektstruktur
 * @param props the parameters to change this component
 */

import { Box, makeStyles, Typography, AppBar, Tabs, Tab } from "@material-ui/core";
import React, { useEffect, useState } from "reactn";
import PropTypes from "prop-types";
import Title from "../../Title";

// Constants --------------------------------------------------------------------------------------

/** The base of the url is universal for all IFrames. */

const URL_BASE = `http://${window.location.hostname}:3000`

/** This middle part of URL refers to the map dashboard in grafana for the risk areas. */

const URL_MID_MAP_RISK = "/d-solo/G3LqjW1Mk/riskareas?orgId=1&panelId=4"

// IFrame settings for the map --------------------------------------------------------------------

/**
 * The width of the map will adapt to the width of the parent element.
 */

const WIDTH_MAP = "100%"

/**
 * The height of the map.
 */

const HEIGHT_MAP = 600

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

interface MapcardRiskProps {
    panelTheme?: string | null
}

export function MapcardRisk(props: MapcardRiskProps) {
    const { panelTheme } = props
    const title = `map-risk`

    const [url, setUrl] = useState("")
    const [value, setValue] = useState(0);
    const classes = useStyles();

    //everytime the panelId or theme changes, the url should change too
    useEffect(() => {
        setUrl(`${URL_BASE}${URL_MID_MAP_RISK}${panelTheme}`)
    }, [panelTheme])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

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
                        <Tab label="Risikogebiete" {...a11yProps(0)} />
                        <Tab label="Hilfe"  {...a11yProps(1)} />
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                    <div>
                        <iframe
                            title={title}
                            src={url}
                            width={WIDTH_MAP}
                            height={HEIGHT_MAP}
                            frameBorder={FRAME_BORDER}>
                        </ iframe>
                    </div>
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <Typography color="textSecondary" component="p" variant="h5">
                        - Infektionen: Gesamtzahl der Infektionen <br />
            - Genesene: Gesamtzahl der Genesenen<br />
            - Todesfälle: Gesamtzahl der Todesfälle<br />
            Die Zahlen sowie der Name des dazugehörigen Eintrags werden sichtbar, indem man mit der Maus über einen Kreis fährt.<br />
            Die hier gezeigten Zahlen sind relativ zu 100.000 Einwohnern. <br />
                        <br />
            Mit + und - (oben links auf der Karte) kann man auf der Karte rein- und rauszoomen.<br />
                    </Typography>
                </TabPanel>
            </div>
        </React.Fragment>
    )
}

export default MapcardRisk;