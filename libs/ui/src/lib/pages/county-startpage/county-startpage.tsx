/**
 * Summary: This file contains the structure of the content of a page.
 * 
 * Description: The side bar and the upper bar are fixed. The remaining space
 * in the UI is filled by dynamic content which is distinguished in different
 * pages. This page contains the UI-Cards for total Germany on a counties
 * level.
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
import { THEME_LIGHT } from "../../constants/themes/themes";
import MapcardCty from "../../ui-cards/cty/mapcard-cty/mapcard-cty";
import LinediagramcardCty from "../../ui-cards/cty/linediagramcard-cty/linediagramcard-cty";
import Lastupdatecard from "../../ui-cards/lastupdatecard/lastupdatecard";
import NumberboxcardCty from "../../ui-cards/cty/numberboxcard-cty/numberboxcard-cty";
import PiechartcardCty from "../../ui-cards/cty/piechartcard-cty/piechartcard-cty";
import TablecardCty from "../../ui-cards/cty/tablecard-cty/tablecard-cty";

// Constants --------------------------------------------------------------------------------------

/**
 * In case the user selected a light theme, the panels will change accordingly.
 */

const PANEL_THEME_LIGHT = "&theme=light"

// React functional UI-component ------------------------------------------------------------------

export interface CountyStartpageProps {
    match: {
        params: {
            countyId: string
        }
    }
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
    rightColumnPaperHeight: {
        height: "100%"
    },
    lastUpdateHeight: {
        height: "100%"
    }
}));

export const CountyStartpage = (props: CountyStartpageProps) => {
    const { countyId } = props.match.params
    const [theme,] = useGlobal("theme")
    const [, setTitle] = useGlobal('title');
    const [panelTheme, setPanelTheme] = useState("")
    const classes = useStyles();

    useEffect(() => {
        setTitle("Alle Regionen")
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
    const rightColumnPaper = clsx(classes.paper,
        classes.rightColumnPaperHeight)

    return (
        < main className={classes.content} >
            <div className={classes.appBarSpacer}>

                <Container maxWidth="xl" className={classes.container}>
                    <Grid container spacing={3}>
                        {/* Left Column: MapCard */}
                        <Grid item xs={12} md={5} lg={5} xl={5}>
                            <Paper className={mapHeightPaper}>

                                <MapcardCty
                                    countyId={Number.parseInt(countyId)}
                                    panelTheme={panelTheme}
                                />

                            </Paper>
                        </Grid>
                        {/* Right Column */}
                        <Grid item xs={12} md={7} lg={7} xl={7}>
                            <Grid container spacing={3} direction="column">
                                <Grid item xs={12} md={12} lg={12} xl={12}>
                                    {/* Numberboxcard */}
                                    <Grid item>
                                        <Paper className={rightColumnPaper}>

                                            <NumberboxcardCty
                                                countyId={0}
                                                panelTheme={panelTheme}
                                            />

                                        </Paper>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} md={12} lg={12} xl={12}>
                                    {/* Linediagramcard */}
                                    <Grid item>
                                        <Paper className={rightColumnPaper}>

                                            <LinediagramcardCty
                                                countyId={0}
                                                panelTheme={panelTheme}
                                                panelHeight={"230"}
                                            />

                                        </Paper>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} md={12} lg={12} xl={12}>
                                    {/* Piechartcard */}
                                    <Grid item>
                                        <Paper className={rightColumnPaper}>

                                            <PiechartcardCty
                                                countyId={0}
                                                panelTheme={panelTheme}
                                                panelHeight={"230"}
                                            />

                                        </Paper>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        {/* Tablecard */}
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>

                                <TablecardCty
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

export default CountyStartpage;

