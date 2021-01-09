/**
 * Summary: This is a UI-card that contains the barchart panels from grafana for a county.
 * 
 * Description: When the user selects a county-entry from the list (listItems.tsx), the correct
 * barchart needs to be loaded. 
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

const HEIGHT_BARCHART = 180

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

interface BarchartcardStateProps {
    stateId: number
    panelTheme?: string | null
}

export function BarchartcardState(props: BarchartcardStateProps) {
    const { stateId, panelTheme } = props
    const title = `county-${stateId}`

    const [url, setUrl] = useState("")
    const [value, setValue] = useState(0);
    const classes = useStyles();

    //everytime the panelId or theme changes, the url should change too
    useEffect(() => {
        setUrl(`${URL_BASE}${URL_MID_BARCHART}${stateId}${panelTheme}`)
    }, [panelTheme, stateId])

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
                    Das Balkendiagramm zeigt die Werte (Infektionen, Genesenen, Todesfälle) der meist betroffene Region (gemessen an der Zahl der Infektionen in der Region) des Bundeslandes. <br />
                    Die hier gezeigten Zahlen sind absolute Werte.
                </Typography>
            </TabPanel>
        </div>
    )
}

export default BarchartcardState;