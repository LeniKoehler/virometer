import React, { useEffect, useGlobal } from 'reactn';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, makeStyles, ThemeProvider } from "@material-ui/core/styles";
import { initialState } from './state/state';
import { UpperBar, SideBar, MapSinglePage, TableSinglePage, LinediagramSinglePageCty, LinediagramSinglePageState, PiechartSinglePage } from "@virometer-gmbh/ui";
import { PaletteType } from '@material-ui/core';
import {
  Impressum, Downloadcard, Riskarea, StateStartpage, StateSubpage, CountyStartpage, CountySubpage
} from '@virometer-gmbh/ui';

const IS_DARK = initialState.theme === 'dark'

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  container: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  }
}));

const mainPrimaryColor = IS_DARK ? "#02E3FA" : "#03a9f4";
const mainSecondaryColor = IS_DARK ? "#141619" : "#141619";

export const App = () => {
  const classes = useStyles();
  const [theme, setTheme] = useGlobal('theme');


  useEffect(() => {
    fetch('/api')
      .then((r) => r.json());
  }, []);

  const currentTheme = createMuiTheme({
    palette: {
      type: theme as PaletteType,
      primary: {
        main: mainPrimaryColor
      },
      secondary: {
        main: mainSecondaryColor
      }
    }
  });

  return (
    <Router>
      <ThemeProvider theme={currentTheme}>
        <div className={classes.root}>
          <CssBaseline />
          <UpperBar />
          <SideBar />
          <Switch>
            <Route path="/landkreis/0" exact component={CountyStartpage} />
            <Route path="/landkreis/:countyId" exact component={CountySubpage} />
            <Route path="/bundesland/0" exact component={StateStartpage} />
            <Route path="/bundesland/:stateId" exact component={StateSubpage} />
            <Route path="/map" exact component={MapSinglePage} />
            <Route path="/table" exact component={TableSinglePage} />
            <Route path="/verlaufsdiagramm/landkreis/:countyId" exact component={LinediagramSinglePageCty} />
            <Route path="/verlaufsdiagramm/bundesland/:stateId" exact component={LinediagramSinglePageState} />
            <Route path="/kreisdiagramm" exact component={PiechartSinglePage} />
            <Route path="/impressum" exact component={Impressum} />
            <Route path="/download" exact component={Downloadcard} />
            <Route path="/risikogebiete" exact component={Riskarea} />
            <Route path="/" exact component={StateStartpage} />
            <Route path="*" component={() => <h1>Not found</h1>} />
          </Switch>
        </div>
      </ThemeProvider>
    </Router>
  )
};

export default App;
