import React from "reactn";
import Title from '../Title'
import Link from "@material-ui/core/Link";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

const downloadLinkJSON = 'http://virometer.it-stud.hs-heilbronn.de:1337/downloadJSON';
const downloadLinkCSV = 'http://virometer.it-stud.hs-heilbronn.de:1337/downloadCSV';
/* eslint-disable-next-line */
export interface DownloadcardProps { }


const useStyles = makeStyles(theme => ({
  appBarSpacer: theme.mixins.toolbar,
  content: {
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
  },
  cMargin: {
    marginBottom: theme.spacing(5)
  }
}));

export function Downloadcard(props: DownloadcardProps) {
  const classes = useStyles();

  const mapHeightPaper = clsx(classes.paper, classes.mapHeight)
  const rightColumnPaper = clsx(classes.paper, classes.rightColumnPaperHeight)



  function preventDefault(event) {
    event.preventDefault();
  }

  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="xl" className={classes.container}>
        <Grid container spacing={3} xs={12}>
          <Grid item xs={12} md={6} lg={6} xl={6}>
            <Paper className={mapHeightPaper}>
              <React.Fragment>
                <Title>Download</Title>
                <div>
                  <Link color="primary" onClick={preventDefault} href={downloadLinkJSON} download>
                    <Button>Download JSON</Button>
                  </Link>
                  <Link color="primary" onClick={preventDefault} href={downloadLinkCSV} download>
                    <Button>Download CSV</Button>
                  </Link>
                </div>
                <div className={classes.cMargin}>
                  <p className="description">
                    Die Daten können im JSON oder CSV Format heruntergeladen werden. Jeder Eintrag entspricht den Erkrankten einer Bevölkerungsgruppe an einem Tag in einem Landkreis. Die Datei enthält folgende Schlüssel je Eintrag:

              </p>
                </div>
                <div>
                  <p className="description">
                    Achtung: Die heruntergeladene Datei enthält mehr als 500 Tausend Zeilen und kann bei manchen Editoren zu Verlangsamungen führen
            </p>
                </div>

              </React.Fragment>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} lg={6} xl={6}>
            <Paper className={rightColumnPaper}>
              <React.Fragment>
                <Title>Download</Title>
                <div>
                  <table className="description">
                    <tr>
                      <td><p className="description">countyID</p></td>
                      <td className="description"><p className="description">die ID des Landkreises in dem die Fälle aufgetreten sind</p></td>
                    </tr>
                    <tr>
                      <td><p className="description">recovered</p></td>
                      <td><p className="description">die Anzahl der Genesenen dieser Gruppe</p></td>
                    </tr>
                    <tr>
                      <td><p className="description">id</p></td>
                      <td><p className="description">die ID des Eintrags</p></td>
                    </tr>
                    <tr>
                      <td><p className="description">date</p></td>
                      <td><p className="description">das Meldedatum der Erkrankungen dieses Eintrags</p></td>
                    </tr>
                    <tr>
                      <td><p className="description">dead</p></td>
                      <td><p className="description">die Anzahl der Toten dieser Gruppe</p></td>
                    </tr>
                    <tr>
                      <td><p className="description">cases</p></td>
                      <td><p className="description">die Anzahl der Erkrankten dieser Gruppe</p></td>
                    </tr>
                    <tr>
                      <td><p className="description">lastUpdate</p></td>
                      <td><p className="description">das Datum der letzten Aktualisierung des Eintrags</p></td>
                    </tr>
                  </table>
                </div>
              </React.Fragment>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </main>
  );
}

export default Downloadcard;
