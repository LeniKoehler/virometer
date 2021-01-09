/**
 * Summary: This is a UI-card that contains the last update box from grafana.
 * 
 * Description: The last update box is the same for the whole web-app, since it displays the date
 * when the data was last updated. This information is retrieved from the data base. 
 * 
 * @author Magdalena Köhler
 * @see https://confluence-student.it.hs-heilbronn.de/display/LAPSW2020WiSeTeam3/Projektstruktur
 * @param props the parameters to change this component
 */

import { Link } from "@material-ui/core";
import React, { useEffect, useState } from "reactn";

// Constants --------------------------------------------------------------------------------------
/**
 * The base of the url is universal for all IFrames.
 */

const URL_BASE = `http://${window.location.hostname}:3000`

/**
 * This middle part of the URL refers to the respective panel in grafana. It contains the id.
 */

const URL_MID_LASTUPDATE = "/d-solo/aim5ADoGz/total-germany-counties-states?orgId=1&panelId=35"

// IFrame settings for the last-update-box --------------------------------------------------------

/**
* The width of the last-update-box will adapt to the width of the parent element.
*/

const WIDTH_UPDATE_BOX = "100%"

/**
 * The height of the last-update-box.
 */

const HEIGHT_UPDATE_BOX = "150"

/**
 * IFrame frame border.
 */

const FRAME_BORDER = 0

// React functional UI-component _-----------------------------------------------------------------
interface LastupdatecardProps {
  panelTheme?: string | ""
}

export const Lastupdatecard = (props: LastupdatecardProps) => {
  const { panelTheme } = props
  const title = `lastupdatebox`
  const [url, setUrl] = useState("")

  //everytime the theme changes, the url should change too
  useEffect(() => {
    setUrl(`${URL_BASE}${URL_MID_LASTUPDATE}${panelTheme}`)
  }, [panelTheme])

  return (
    <React.Fragment>
      <iframe
        title={title}
        src={url}
        width={WIDTH_UPDATE_BOX}
        height={HEIGHT_UPDATE_BOX}
        frameBorder={FRAME_BORDER}>
      </ iframe>
      <div>
        <Link color="primary" href="https://npgeo-corona-npgeo-de.hub.arcgis.com/datasets/dd4580c810204019a7b8eb3e0b329dd6_0/data" target="_blank">
          Zu den Rohdaten vom RKI
        </Link>
      </div>
    </React.Fragment>
  );
};

export default Lastupdatecard;