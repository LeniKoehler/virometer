/**
 * Summary: This is a UI-card that contains the table for riskareas from 
 * grafana.
 * 
 * Description: The table for riskareas displays the total number of 
 * infections, since the start of data collection. The start of data 
 * collection can be retrieved from the data base or directly from 
 * the data source UI card. 
 * 
 * @author Magdalena Köhler
 * @see https://confluence-student.it.hs-heilbronn.de/display/LAPSW2020WiSeTeam3/Projektstruktur
 * @param props the parameters to change this component
 */

import { AppBar, Box, makeStyles, Tab, Tabs, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "reactn";

// Constants --------------------------------------------------------------------------------------
/**
 * The base of the url is universal for all IFrames.
 */

const URL_BASE = `http://${window.location.hostname}:3000`

/**
 * This middle part of the URL refers to the respective panel in grafana. It contains the id.
 */

const URL_MID_TABLE = "/d-solo/G3LqjW1Mk/riskareas?orgId=1&panelId=2"

// IFrame settings for the tablecard --------------------------------------------------------

/**
* The width of the tablecard will adapt to the width of the parent element.
*/

const WIDTH_TABLE = "100%"

/**
 * The height of the last-update-box.
 */

let HEIGHT_TABLE = "300"

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

interface TablecardRiskProps {
    panelTheme?: string | "",
    panelHeight?: string
}

export const TablecardRisk = (props: TablecardRiskProps) => {
    const { panelTheme, panelHeight } = props
    const title = `tableRisk`

    const [url, setUrl] = useState("")
    const [value, setValue] = useState(0);
    const classes = useStyles();

    //everytime the theme changes, the url should change too
    useEffect(() => {
        setUrl(`${URL_BASE}${URL_MID_TABLE}${panelTheme}`)
    }, [panelTheme])

    //everytime the height value changes, the setting for the iframe height should change too
    useEffect(() => {
        HEIGHT_TABLE = panelHeight
    }, [panelHeight])

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
                    <Tab label="Tabelle" {...a11yProps(0)} />
                    <Tab label="Hilfe" {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <div>
                    <iframe
                        title={title}
                        src={url}
                        width={WIDTH_TABLE}
                        height={HEIGHT_TABLE}
                        frameBorder={FRAME_BORDER}>
                    </ iframe>
                </div>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Typography color="textSecondary" component="p" variant="h5">
                    - Infektionen: Gesamtzahl der Infektionen in einem Bundesland <br />
          - Genesene: Gesamtzahl der Genesenen in einem Bundesland<br />
          - Todesfälle: Gesamtzahl der Todesfälle in einem Bundesland<br />
          Die hier gezeigten Zahlen sind absolute Werte.<br />
                    <br />
          Durch Klicken mit der linken Maustaste auf die Spaltentitel lassen sich die Reihen nach dem jeweiligen Spaltentitel sortieren.<br />
          Durch Klicken des Filtersymbols lassen sich Einträge ein- und ausblenden.<br />
                </Typography>
            </TabPanel>
        </div>
    );
};

export default TablecardRisk;