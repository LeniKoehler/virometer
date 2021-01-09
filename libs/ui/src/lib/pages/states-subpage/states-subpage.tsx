/**
 * Summary: This file contains the structure of the content of a page.
 * 
 * Description: The side bar and the upper bar are fixed. The remaining space
 * in the UI is filled by dynamic content which is distinguished in different
 * pages. This page contains the UI-Cards for a single state.
 * 
 * @author Magdalena Köhler
 * @see https://confluence-student.it.hs-heilbronn.de/display/LAPSW2020WiSeTeam3/Projektstruktur
 * @param props the parameters to change this component
 */

import React from "react";
import {
    makeStyles, CircularProgress, Container, Grid, Paper
} from "@material-ui/core";
import clsx from "clsx";
import { useEffect, useGlobal, useState } from "reactn";
import { THEME_LIGHT } from "../../constants/themes/themes";
import Lastupdatecard from "../../ui-cards/lastupdatecard/lastupdatecard";
import LinediagramcardState from "../../ui-cards/state/linediagramcard-state/linediagramcard-state";
import PiechartcardState from "../../ui-cards/state/piechartcard-state/piechartcard-state";
import MapcardState from "../../ui-cards/state/mapcard-state/mapcard-state";
import NumberboxcardState from "../../ui-cards/state/numberboxcard-state/numberboxcard-state";
import { BarchartcardState } from "../../ui-cards/state/barchartcard-state/barchartcard-state";

// Konstanten -----------------------------------------------------------------

/**
 * In case the user selected a light theme panels will change accordingly.
 */

const PANEL_THEME_LIGHT = "&theme=light"


// React UI-Komponente --------------------------------------------------------
export interface StateSubpageProps {
    match: {
        params: {
            stateId: string
        }
    }
}

export function CircularDeterminateStateSubpage(props) {
    const { progress } = props
    return (
        <div style={{ top: '20%', right: '50%', position: 'absolute' }}>
            <h2 style={{ color: 'white' }}>Die Daten für das Bundesland werden
            geladen, bitte Geduld...</h2>
            <CircularProgress variant="determinate" value={progress} />
        </div>
    );
}

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
    fixedHeight: {
        height: 200
    },
    mapHeight: {
        height: "100%"
    },
    rightColumnPaperHeight: {
        height: "100%"
    }
}));

export const StateSubpage = (props: StateSubpageProps) => {
    const { stateId } = props.match.params
    const [theme, setTheme] = useGlobal("theme")
    const [, setTitle] = useGlobal("title");
    const [, setState] = useGlobal('stateId');
    const [states,] = useGlobal('states');
    const [panelTheme, setPanelTheme] = useState("")
    const classes = useStyles();

    const [stateIdAsNum, setStateIdAsNum] = useState(0)
    useEffect(() => {
        setStateIdAsNum(Number.parseInt(stateId, 10))
    }, [stateId])

    useEffect(() => {
        const parsedStateId = Number.parseInt(stateId, 10)
        setState(parsedStateId)
        setState(null)
        const state = states.find(s => s.panelId === parsedStateId)
        if (state) {
            setTitle(state.name)
        } else {
            setTitle(null)
        }
    }, [stateId])

    useEffect(() => {
        if (theme === THEME_LIGHT && panelTheme !== THEME_LIGHT) {
            setPanelTheme(PANEL_THEME_LIGHT)
        } else {
            setPanelTheme(null)
        }
    }, [theme])

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const mapHeightPaper = clsx(classes.paper, classes.mapHeight)
    const rightColumnPaper = clsx(classes.paper, classes.rightColumnPaperHeight)

    const [progress, setProgress] = React.useState(0);

    React.useEffect(() => {
        setProgress(0)
    }, [stateId])

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
            {progress < 100 && <CircularDeterminateStateSubpage progress={progress} />}

            {/* If the progress is higher than 100 make Grafana panels visible */}
            <div className={classes.appBarSpacer} style={{ display: `${progress > 100 ? 'block' : 'none'}` }}>
                <Container maxWidth="xl" className={classes.container}>
                    <Grid container spacing={3}>
                        {/* Left Column: MapCard */}
                        <Grid item xs={12} md={5} lg={5} xl={5}>
                            <Paper className={mapHeightPaper}>
                                <MapcardState stateId={stateIdAsNum} panelTheme={panelTheme} />
                            </Paper>
                        </Grid>
                        {/* Right Column */}
                        <Grid item xs={12} md={7} lg={7} xl={7}>
                            <Grid container spacing={3} direction="column">
                                <Grid item xs={12} md={12} lg={12} xl={12}>
                                    {/* Numberboxcard */}
                                    <Grid item>
                                        <Paper className={rightColumnPaper}>
                                            <NumberboxcardState stateId={stateIdAsNum} panelTheme={panelTheme} />
                                        </Paper>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} md={12} lg={12} xl={12}>
                                    {/* Linediagramcard */}
                                    <Grid item>
                                        <Paper className={rightColumnPaper}>
                                            <LinediagramcardState
                                                stateId={stateIdAsNum}
                                                panelTheme={panelTheme}
                                                panelHeight={"250"}
                                            />
                                        </Paper>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} md={12} lg={12} xl={12}>
                                    {/* Barchartcard */}
                                    <Grid item>
                                        <Paper className={rightColumnPaper}>
                                            <BarchartcardState stateId={stateIdAsNum} panelTheme={panelTheme} />
                                        </Paper>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        {/* Piechartcard */}
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                <PiechartcardState
                                    stateId={stateIdAsNum}
                                    panelTheme={panelTheme}
                                    panelHeight={"400"}
                                />
                            </Paper>
                        </Grid>
                        {/* Lastupdatecard */}
                        <Grid item xs={12} md={4} lg={3}>
                            <Paper className={fixedHeightPaper}>
                                <Lastupdatecard panelTheme={panelTheme} />
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </main >
    );

};

export default StateSubpage;
