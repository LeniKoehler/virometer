/**
 * Summary: This file contains the structure of the content of a page.
 * 
 * Description: The side bar and the upper bar are fixed. The remaining space
 * in the UI is filled by dynamic content which is distinguished in different
 * pages. This page contains the UI-Card for the map with the data
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
import { THEME_LIGHT } from "../../constants/themes/themes";
import MapcardCty from "../../ui-cards/cty/mapcard-cty/mapcard-cty";
import Lastupdatecard from "../../ui-cards/lastupdatecard/lastupdatecard";

// Constants --------------------------------------------------------------------------------------

/**
 * In case the user selected a light theme, the panels will change accordingly.
 */

const PANEL_THEME_LIGHT = "&theme=light"

// React functional UI-component ------------------------------------------------------------------

export interface MapSinglePageProps {
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
    lastUpdateHeight: {
        height: "100%"
    }
}));

export const MapSinglePage = (props: MapSinglePageProps) => {
    const { countyId } = props.match.params
    const [theme,] = useGlobal("theme")
    const [, setTitle] = useGlobal('title');
    const [, setCountyId] = useGlobal('countyId');
    const [, setState] = useGlobal('stateId');
    const [counties,] = useGlobal('counties');
    const [panelTheme, setPanelTheme] = useState("")
    const classes = useStyles();

    useEffect(() => {

        setTitle("Landkarte mit Daten für alle Landkreise")

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

    return (
        < main className={classes.content} >
            <div className={classes.appBarSpacer}>

                <Container maxWidth="xl" className={classes.container}>
                    <Grid container spacing={3}>
                        {/* Left Column: MapCard */}
                        <Grid item xs={12} md={12} lg={12} xl={12}>
                            <Paper className={mapHeightPaper}>

                                <MapcardCty
                                    countyId={0}
                                    panelTheme={panelTheme}
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

export default MapSinglePage;

