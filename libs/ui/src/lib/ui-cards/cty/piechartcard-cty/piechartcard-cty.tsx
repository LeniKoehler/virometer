/**
 * Summary: This is a UI-card that contains the piechart panels from grafana for a county.
 * 
 * Description: When the user selects a county-entry from the list (listItems.tsx), the correct
 * piecharts need to be loaded. 
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
import Title from "../../../Title";
import ReactPlayer from 'react-player';

// Constants --------------------------------------------------------------------------------------

/** The base of the url is universal for all IFrames. */

const URL_BASE = `http://${window.location.hostname}:3000`

/** This middle part of URL refers to the piechart dashboard in grafana for infections in one state. */

const URL_MID_INFECTIONS = "/d-solo/40TMdf0Mk/piechart-per-state-infections?orgId=1&panelId="

/** This middle part of URL refers to the piechart dashboard in grafana for recovered in one state. */

const URL_MID_RECOVERED = "/d-solo/EmeHVQ1Mk/piechart-per-state-recovered?orgId=1&panelId="

/** This middle part of URL refers to the piechart dashboard in grafana for deaths in one state. */

const URL_MID_DEATHS = "/d-solo/qMG3q8JMk/piechart-per-state-deaths?orgId=1&panelId="

/** This middle part of URL refers to the piechart dashboard in grafana for infections in Germany. */

const URL_MID_TOTAL_GERMANY_INFECTIONS = "/d-solo/aim5ADoGz/total-germany-counties-states?orgId=1&panelId=47"

/** This middle part of URL refers to the piechart dashboard in grafana for recovered in Germany. */

const URL_MID_TOTAL_GERMANY_RECOVERED = "/d-solo/aim5ADoGz/total-germany-counties-states?orgId=1&panelId=45"

/** TThis middle part of URL refers to the piechart dashboard in grafana for deaths in Germany. */

const URL_MID_TOTAL_GERMANY_DEATHS = "/d-solo/aim5ADoGz/total-germany-counties-states?orgId=1&panelId=43"


// IFrame settings for the piechart ------------------------------------------------------------

/**
 * The width of the piechart will adapt to the width of the parent element.
 */

const WIDTH_PIECHART = "100%"

/**
 * The height of the piechart.
 */

let HEIGHT_PIECHART = "230"

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

interface PiechartcardCtyProps {
    countyId: number
    panelTheme?: string | null
    panelHeight?: string
}

export function PiechartcardCty(props: PiechartcardCtyProps) {
    const { countyId, panelTheme, panelHeight } = props
    const title = `county-${countyId}`

    const [urlInfections, setUrlInfections] = useState("")
    const [urlRecovered, setUrlRecovered] = useState("")
    const [urlDeaths, setUrlDeaths] = useState("")
    const [value, setValue] = useState(0);
    const classes = useStyles();

    //everytime the countyId or theme changes, the url should change too
    useEffect(() => {
        //if county Id is 0, then the view for all states/ all counties has been chosen by the
        //user. Since in grafana there do never exist panels with an id higher than 2, we map it to 
        //the correct one.
        if (countyId < 1) {
            setUrlInfections(`${URL_BASE}${URL_MID_TOTAL_GERMANY_INFECTIONS}${panelTheme}`)
            setUrlRecovered(`${URL_BASE}${URL_MID_TOTAL_GERMANY_RECOVERED}${panelTheme}`)
            setUrlDeaths(`${URL_BASE}${URL_MID_TOTAL_GERMANY_DEATHS}${panelTheme}`)
        } else {
            setUrlInfections(`${URL_BASE}${URL_MID_INFECTIONS}${countyId}${panelTheme}`)
            setUrlRecovered(`${URL_BASE}${URL_MID_RECOVERED}${countyId}${panelTheme}`)
            setUrlDeaths(`${URL_BASE}${URL_MID_DEATHS}${countyId}${panelTheme}`)
        }
    }, [panelTheme, countyId])

    //everytime the height value changes, the setting for the iframe height should change too
    useEffect(() => {
        HEIGHT_PIECHART = panelHeight
    }, [panelHeight])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <React.Fragment>
            <Title>Kreisdiagramm</Title>
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
                            width={WIDTH_PIECHART}
                            height={HEIGHT_PIECHART}
                            frameBorder={FRAME_BORDER}>
                        </ iframe>
                    </div>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <div>
                        <iframe
                            title={title}
                            src={urlRecovered}
                            width={WIDTH_PIECHART}
                            height={HEIGHT_PIECHART}
                            frameBorder={FRAME_BORDER}>
                        </ iframe>
                    </div>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <div>
                        <iframe
                            title={title}
                            src={urlDeaths}
                            width={WIDTH_PIECHART}
                            height={HEIGHT_PIECHART}
                            frameBorder={FRAME_BORDER}>
                        </ iframe>
                    </div>
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <Typography color="textSecondary" component="p" variant="h5">
                        - Infektionen: Gesamtzahlen der Infektionen der 10 meist betroffenen Regionen (gemessen an den Infektionszahlen) im Verhältnis zueinander <br />
                        - Genesene: Gesamtzahlen der Genesenen der 10 meist betroffenen Regionen (gemessen an den Genesenenzahlen) im Verhältnis zueinander<br />
                        - Todesfälle: Gesamtzahlen der Todesfälle der 10 meist betroffenen Regionen (gemessen an der Zahl der Todesfälle) im Verhältnis zueinander<br />
                        Die hier gezeigten Zahlen sind relativ zu 100.000 Einwohnern der jeweiligen Region.<br />
                        <br />
                        Indem man mit der Maus über die einzelnen Abschnitte des Kreisdiagramms fährt, erhält man den Namen des Eintrags sowie den entsprechenden Wert.<br />
                        Durch Anklicken des Namen einer Region in der Legende rechts neben des Diagramms mit der linken Maustaste lässt sich der jeweilige Eintrag im Kreisdiagramm aus- und einblenden.<br />
                        <ReactPlayer url="/assets/Kreisdiagramm.mp4" playing loop></ReactPlayer>
                    </Typography>
                </TabPanel>
            </div>
        </React.Fragment>
    )
}

export default PiechartcardCty;