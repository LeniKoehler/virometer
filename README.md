
<p align="center">
  <img src="./apps/frontend/src/assets/virometerLogo.png" width="200" height="200" >
</p>

## Vision

Die rasante Entwicklung der Corona Pandemie versetzt die Bevölkerung der Bundesrepublik Deutschland bis heute noch in Angst und Unsicherheit. Bezüglich der Maßnahmen gegen die Verbreitung von Corona herrscht Uneinigkeit in der Welt, wodurch viele Bürger verunsichert sind und sich ihr eigenes Bild machen möchten.

```
"Unsere Vision ist es, allen Menschen die Möglichkeit zu geben, umfangreiche und
komplexe Daten viel schneller zu verstehen und sie auf diese Weise
in ihren alltäglichen Entscheidungen zu unterstützen."
```
Unser Produkt ViroMeter unterstützt die freie Meinungsbildung aller Bürger durch die Umsetzung eines Dashboards, das die wichtigsten Daten bezüglich der Corona-Pandemie zeigt und auf diese Weise allen Menschen die Informationen zur Verfügung stellt, die sie benötigen, um auf die besonderen Umstände dieser Zeit selbstbestimmt und angemessen reagieren zu können.

## Installationsanleitung

[Vollständige Anleitung](https://confluence-student.it.hs-heilbronn.de/display/LAPSW2020WiSeTeam3/Installationsanleitung)

## Requirements
- [Node.js](https://nodejs.org/de/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Ausführung


1. Klonen oder entpacken Sie das Projekt in ein beliebiges Verzeichnis

2. Öffnen Sie die Konsole / Terminal und wechseln sie zum Projektverzeichnis

3. Führen Sie folgenden Befehl aus und warten bis dieser beendet wurde

```
(Windows)
npm install

(Linux)
sudo npm install    
```
4. Starten Sie nun das Skript mit folgendem befehl:

```
(Windows)
npm run virometer-win

(Linux)
sudo npm run viromer
```
Dies kann einige Minuten dauern, warten Sie einfach geduldig bis der Prozess vollständig abgeschlossen ist. Nun ist der der Server Vollständig gestartet. Unter virometer.it-stud.hs-heilbronn.de:4200 / localhost:4200 ist das Projekt nun erreichbar. Es kann einige Minuten dauern, bis Daten auftauchen, es müssen zunächst mehrere hunderttausend Datensätze verarbeitet werden.


## Tests

Um einzelne Komponten zu Testen können folgende befehle im Terminal oder der Konsole eingeben werden (Sie müssen sich hierzu im Projektverzeichnis befinden):

Um die Datenbank zu Testen:
```
npm run virometer-test-db
```
Um die Datenspeicherungs komponente zu Testen:
```
npm run virometer-test-datastorage
```
Um den Download der Rohdaten zu Testen:
```
npm run virometer-test-download
```

## Herunterfahren
Sie können das Projekt mit folgendem Befehl herunterfahren:
```
(Windows)
docker-compose down

(Linux)
sudo docker-compose down 
```

## Erreichbare Komponenten
- Adminer   -> http://serveradresse:8080
- Grafana   -> http://serveradresse:4000
- Dashboard -> http://serveradresse:4200
- Datenbank -> http://serveradresse:4321
- Datenbank(innerhalb des Containers) -> http://db:4321 


## Links
[Confluence](https://confluence-student.it.hs-heilbronn.de/display/LAPSW2020WiSeTeam3/LAPSW_2020_WiSe_Team3+Home)

[Jira](https://jira-student.it.hs-heilbronn.de/projects/LABSW20T3/summary)


This project will visualize data about Covid19. It was generated using [Nx](https://nx.dev).

[Alle weiteren Informationen zur Erstellung und Entwicklung mit NRWL NX](https://nx.dev/latest/react/getting-started/getting-started)


