import React from "react";

const downloadLinkJSON = 'http://virometer.it-stud.hs-heilbronn.de:1337/downloadJSON';
const downloadLinkCSV = 'http://virometer.it-stud.hs-heilbronn.de:1337/downloadCSV';

/* eslint-disable-next-line */
export interface DownloadProps { }

export const Download = (props: DownloadProps) => {
  return (
    <div>
      <h1>Download der Daten</h1>









      <table className="center">
        <tr>
          <td>
            <a href={downloadLinkJSON} download>
              <button>Download JSON</button>
            </a>
            <a href={downloadLinkCSV} download>
              <button>Download CSV</button>
            </a>
          </td>
        </tr>
        <tr>
          <td>
            <p className="description">
              Die Daten können im JSON oder CSV Format heruntergeladen werden. Jeder Eintrag entspricht den Erkrankten einer Bevölkerungsgruppe an einem Tag in einem Landkreis. Die Datei enthält folgende Schlüssel je Eintrag:

</p>
          </td>
        </tr>
        <tr>
          <td>


            <table className="description">
              <tr>
                <td>countyID</td>
                <td>die ID des Landkreises in dem die Fälle aufgetreten sind</td>
              </tr>
              <tr>
                <td>recovered</td>
                <td>die Anzahl der Genesenen dieser Gruppe</td>
              </tr>
              <tr>
                <td>id</td>
                <td>die ID des Eintrags</td>
              </tr>
              <tr>
                <td>date</td>
                <td>das Meldedatum der Erkrankungen dieses Eintrags</td>
              </tr>
              <tr>
                <td>dead</td>
                <td>die Anzahl der Toten dieser Gruppe</td>
              </tr>
              <tr>
                <td>cases</td>
                <td>die Anzahl der Erkrankten dieser Gruppe</td>
              </tr>
              <tr>
                <td>lastUpdate</td>
                <td>das Datum der letzten Aktualisierung des Eintrags</td>
              </tr>
            </table>


          </td>
        </tr>



        <tr>
          <td>
            <p className="description">
              Achtung: Die heruntergeladene Datei enthält mehr als 500 Tausend Zeilen und kann bei manchen Editoren zu Verlangsamungen führen
    </p>
          </td>
        </tr>
      </table>

    </div>



  );
};

export default Download;
