/**
 * Summary: This file contains the structure of the content of a page.
 * 
 * Description: The side bar and the upper bar are fixed. The remaining space
 * in the UI is filled by dynamic content which is distinguished in different
 * pages. This page contains the UI-Card for the linediagram with the data
 * per county.
 * 
 * @author Magdalena Köhler
 * @see https://confluence-student.it.hs-heilbronn.de/display/LAPSW2020WiSeTeam3/Projektstruktur
 * @param props the parameters to change this component
 */

import React, { useEffect, useGlobal, useState } from "reactn";
import {
    makeStyles, Container, Grid, Paper
} from "@material-ui/core";
import clsx from "clsx";
import Lastupdatecard from "../../ui-cards/lastupdatecard/lastupdatecard";
import LinediagramcardCty from "../../ui-cards/cty/linediagramcard-cty/linediagramcard-cty";
import { CircularProgress } from "@material-ui/core";
import { THEME_LIGHT } from "../../constants/themes/themes";

// Constants --------------------------------------------------------------------------------------

/**
 * In case the user selected a light theme, the panels will change accordingly.
 */

const PANEL_THEME_LIGHT = "&theme=light"

// React functional UI-component ------------------------------------------------------------------

export interface LinediagramSinglePageCtyProps {
    match: {
        params: {
            countyId: string
        }
    }
}

function CircularDeterminate(props) {
    const { progress } = props
    return (
        <div style={{ top: '20%', right: '50%', position: 'absolute' }}>
            <h2 style={{ color: 'white' }}>Die Daten für das Verlaufsdiagramm
            werden geladen, bitte Geduld...</h2>
            <CircularProgress variant="determinate" value={progress} />
        </div>
    );
}

//theme customization
const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        paddingTop: theme.spacing(8),
        flexGrow: 1,
        height: "100vh",
        overflow: "auto"
    },
    container: {
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3)
    },
    paper: {
        padding: theme.spacing(1),
        display: "flex",
        overflow: "auto",
        flexDirection: "column"
    },
    mapHeight: {
        height: "100%"
    },
    lastUpdateHeight: {
        height: "100%"
    }
}));

export const LinediagramSinglePageCty = (props: LinediagramSinglePageCtyProps) => {
    const { countyId } = props.match.params
    const [theme,] = useGlobal("theme")
    const [, setTitle] = useGlobal('title');
    const [, setCountyId] = useGlobal('countyId');
    const [, setState] = useGlobal('stateId');
    const [counties,] = useGlobal('counties');
    const [panelTheme, setPanelTheme] = useState("")
    const classes = useStyles();

    useEffect(() => {
        const parsedCountyId = Number.parseInt(countyId, 10)
        setCountyId(parsedCountyId)
        setState(null)
        const county = counties.find(c => c.panelId === parsedCountyId)
        if (county) {
            setTitle("Verlaufsdiagramm mit Daten von: " + county.name)
        } else {
            setTitle("Verlaufsdiagramm mit Daten von ganz Deutschland")
        }
    }, [countyId])

    useEffect(() => {
        if (theme === THEME_LIGHT && panelTheme !== THEME_LIGHT) {
            setPanelTheme(PANEL_THEME_LIGHT)
        } else {
            setPanelTheme("")
        }
    }, [theme])

    const mapHeightPaper = clsx(classes.paper, classes.mapHeight)
    const lastUpdateHeightPaper = clsx(classes.paper, classes.lastUpdateHeight)

    const [progress, setProgress] = React.useState(0);

    React.useEffect(() => {
        setProgress(0)
    }, [countyId])

    React.useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => prevProgress + 20);
        }, 200);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        < main className={classes.content} >
            {/* If the progress is below 100 then render a loading animation */}
            {progress < 100 && <CircularDeterminate progress={progress} />}

            {/* If the progress is higher than 100 make Grafana panels visible */}
            <div className={classes.appBarSpacer} style={{ display: `${progress > 100 ? 'block' : 'none'}` }}>
                <Container maxWidth="xl" className={classes.container}>
                    <Grid container spacing={3}>
                        {/* Left Column: MapCard */}
                        <Grid item xs={12} md={12} lg={12} xl={12}>
                            <Paper className={mapHeightPaper}>

                                <LinediagramcardCty
                                    countyId={0}
                                    panelTheme={panelTheme}
                                    panelHeight={"500"}
                                />

                            </Paper>
                        </Grid>
                        {/* Lastupdatecard */}
                        <Grid item xs={12} md={4} lg={3}>
                            <Paper className={lastUpdateHeightPaper}>

                                <Lastupdatecard panelTheme={panelTheme} />

                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </main >
    );
};

export default LinediagramSinglePageCty;

