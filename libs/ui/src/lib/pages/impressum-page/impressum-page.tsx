import React from "reactn";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";


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
    textAlign: 'left',
    fontSize: 16,
    padding: theme.spacing(1),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
}));

export const Impressum = () => {
  const classes = useStyles();

  return (
    < main className={classes.content} >
      <div className={classes.appBarSpacer} />
      <Container maxWidth="xl" className={classes.container}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Typography variant="h2" align="center">Impressum<br /></Typography><br />
            LABSW20T3<br />
            Max-Planck-Straße 39<br />
            74081 Heilbronn<br />
            Telefon: 07131 5040<br />
            Info@ViroMeter.com<br /><br />

              <Typography variant="h4">Unsere Anregung<br /></Typography><br />
            Die Zahlen der Corona-Pandemie verändern sich ständig. Heute ist ein Landkreis im grünen
            Bereich, morgen im roten. Für jede Person, die sich über die Zahl der bestätigten Infektionsfälle <br />
            informieren will, ist ViroMeter ein interaktives Datenvisualisierungstool, das jedem Mitglied der
            Gesellschaft die Möglichkeit gibt, wertvolle Informationen viel schneller zu verstehen und darauf zu <br />
            reagieren, indem es die Daten für jeden verständlich zugänglich macht. Unsere Vision ist es,
            allen Menschen die Möglichkeit zu geben, umfangreiche und komplexe Daten viel schneller zu verstehen<br />
            und sie auf diese Weise in ihren alltäglichen Entscheidungen zu unterstützen.
            Hierfür werden die gesammelten Daten aus den Corona-Apps ausgewertet und in einem Dashboard dargestellt.<br />
            Das Dashboard lässt sich auf die Region des Nutzers anpassen und zeigt
            dann nur noch die ortsbezogenen Daten.Das Projekt bietet einen Mehrwert für alle Bürger, da <br />
            seine verständliche Struktur eine einfache Bedienung für alle garantiert. Zudem können die Nutzer
            die Situation vor Ort besser einschätzen und dementsprechend Maßnahmen ergreifen, um zur <br />Verhinderung
            der Verbreitung von Covid-19 beizutragen.<br /><br />

              <Typography variant="h4">Über unsere Webseite<br /></Typography><br />
            Die Inhalte dieser Webseite wurden mit der besten Bemühungen unseres Entwicklerteams erstellt.
            LABSW20T3 übernimmt jedoch keine Gewähr für die Richtigkeit, Vollständigkeit und Aktualität <br />
            der bereitgestellten Inhalte. LABSW20T3 wird sich bemühen die eigene Webseite möglichst
            unterbrechungsfrei zum Abruf anzubieten. Trotz aller Bemühungen können jedoch Ausfallzeiten nicht <br />
            ausgeschlossen werden. Alle Inhalte dieser Website sind urheberrechtlich geschützt. Die
            Veröffentlichung im www bedeutet noch keine Einverständniserklärung für eine anderweitige Nutzung <br />
            durch Dritte. Jede vom deutschen Urheberrecht nicht zugelassene Verwertung bedarf der vorherigen
            schriftlichen Zustimmung. Die LABSW20T3 erlaubt und begrüßt jedoch ausdrücklich das Zitieren <br />
            ihrer Dokumente sowie das Setzen von Links auf ihre Website, solange kenntlich gemacht wird, dass es
            sich um Inhalte der Website der LABSW20T3 handeltund diese Inhalte nicht in Verbindung mit Inhalten <br />
            Dritter gebracht werden, die den Interessen der LABSW20T3 widersprechen. Sollten Sie Fragen haben oder
            eine Genehmigung wünschen, senden Sie bitte eine E-Mail. LABSW20T3 ist als Inhaltsanbieter nach <br />
            § 8 Abs.3 Telemediengesetz für die durchgeleiteten Inhalte, die sie zur Nutzung bereithält, nach den
            allgemeinen Gesetzen nicht verantwortlich.<br /><br />

              <Typography variant="h4">Über uns<br /></Typography><br />
            Das ViroMeter Dashboard ist ein von der Hochschule Heilbronn organisiertes Projekt, einberufen um
            angehende Software-Engineeure Erfahrung sammeln zu lassen in der Webentwicklung.<br />
            das ViroMeter Dashboard ist demnach geistiges Eigentum der Hochschule Heilbronn und der LABSW20T3 Gruppe.
            Alle gesammelten Daten für das Dashboard werden vom dem RKI-Dashboard derzeit bereitgestellt, das die <br />
            Richtigkeit deren Daten garantiert. das ViroMeter-Dashboard befasst sich Hauptsächlich um die Auswertung
            der Daten bezüglich der derzeitigen Pandemiekrise, dabei haben wir uns speziell vorgenommen das wir die <br />
            Anzahl der Infizierte, Genesen und Todesfälle in Relation zu 100.000 Einwohner anzuzeigen, um die Werte besser
            vergleichen zu können. An erster Stelle haben wir uns als Gruppe vorgenommen, allen Menschen die Möglichkeit zu <br />
            geben, umfangreiche und komplexe Daten viel schneller zu verstehen und sie auf diese Weise
            in ihren alltäglichen Entscheidungen zu unterstützen.
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </main >
  );
};

export default Impressum;