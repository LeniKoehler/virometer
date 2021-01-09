/**
 * Summary: This file contains the structure of the content of a page.
 * 
 * Description: The side bar and the upper bar are fixed. The remaining space
 * in the UI is filled by dynamic content which is distinguished in different
 * pages. This page contains the UI-Cards for a single county.
 * 
 * @author Magdalena Köhler
 * @see https://confluence-student.it.hs-heilbronn.de/display/LAPSW2020WiSeTeam3/Projektstruktur
 * @param props the parameters to change this component
 */

import React, { useEffect, useGlobal, useState } from "reactn";
import {
  makeStyles, Container, Grid, Paper, CircularProgress
} from "@material-ui/core";
import clsx from "clsx";
import { THEME_LIGHT } from "../../constants/themes/themes";
import MapcardCty from "../../ui-cards/cty/mapcard-cty/mapcard-cty";
import LinediagramcardCty from "../../ui-cards/cty/linediagramcard-cty/linediagramcard-cty";
import BarchartcardCty from "../../ui-cards/cty/barchartcard-cty/barchartcard-cty";
import Lastupdatecard from "../../ui-cards/lastupdatecard/lastupdatecard";
import NumberboxcardCty from "../../ui-cards/cty/numberboxcard-cty/numberboxcard-cty";

// Constants --------------------------------------------------------------------------------------

/**
 * In case the user selected a light theme, the panels will change accordingly.
 */

const PANEL_THEME_LIGHT = "&theme=light"

// React functional UI-component ------------------------------------------------------------------

export interface CountySubpageProps {
  match: {
    params: {
      countyId: string
    }
  }
}

export function CircularDeterminateCtySubpage(props) {
  const { progress } = props
  return (
    <div style={{ top: '20%', right: '50%', position: 'absolute' }}>
      <h2 style={{ color: 'white' }}>Die Daten für die Region werden
          geladen, bitte Geduld...</h2>
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
  rightColumnPaperHeight: {
    height: "100%"
  },
  lastUpdateHeight: {
    height: "100%"
  }
}));

export const CountySubpage = (props: CountySubpageProps) => {
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
      setTitle("Daten für: " + county.name)
    } else {
      setTitle(null)
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
  const rightColumnPaper = clsx(classes.paper,
    classes.rightColumnPaperHeight)

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
      {progress < 100 && <CircularDeterminateCtySubpage progress={progress} />}

      {/* If the progress is higher than 100 make Grafana panels visible */}
      <div className={classes.appBarSpacer} style={{ display: `${progress > 100 ? 'block' : 'none'}` }}>
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
                        countyId={Number.parseInt(countyId)}
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
                        countyId={Number.parseInt(countyId)}
                        panelTheme={panelTheme}
                        panelHeight={"250"}
                      />

                    </Paper>
                  </Grid>
                </Grid>
                <Grid item xs={12} md={12} lg={12} xl={12}>
                  {/* Piechartcard */}
                  <Grid item>
                    <Paper className={rightColumnPaper}>

                      <BarchartcardCty
                        countyId={Number.parseInt(countyId)}
                        panelTheme={panelTheme}
                      />

                    </Paper>
                  </Grid>
                </Grid>
              </Grid>
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

export default CountySubpage;

