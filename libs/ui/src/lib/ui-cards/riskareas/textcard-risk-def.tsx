/**
 * Summary: This is a UI-card that contains the definition of riskareas.
 * 
 * Description: The definition of riskareas is given according to the 
 * definition from the Robert Koch Institut. 
 * 
 * @author Magdalena Köhler (Code), Jan Seel (Text content)
 * @see https://confluence-student.it.hs-heilbronn.de/display/LAPSW2020WiSeTeam3/Projektstruktur
 * @param props the parameters to change this component
 */

import { Link, Typography } from "@material-ui/core";
import React from "reactn";
import Title from "../../Title"

interface TextcardRiskDefProps {
    panelTheme?: string | ""
}

export const TextcardRiskDef = (props: TextcardRiskDefProps) => {

    return (
        <React.Fragment>
            <Title>Klassifizierung zu einem Risikogebiet</Title>
            <Typography color="textSecondary">
                Die Einstufung als Risikogebiet erfolgt nach gemeinsamer Analyse<br />
            und Entscheidung durch das Bundesministerium für Gesundheit,<br />
            das Auswärtige Amt und das Bundesministerium des Innern, für Bau <br />
            und Heimat. Die Einstufung als Risikogebiet basiert auf einer <br />
            zweistufigen Bewertung. Zunächst wird festgestellt, in welchen <br />
            Staaten/Regionen es in den letzten sieben Tagen mehr als <br />
            50 Neuinfizierte pro 100.000 Einwohner gab. In einem zweiten Schritt <br />
            wird nach qualitativen und weiteren Kriterien festgestellt, ob z.B. <br />
            für Staaten/Regionen, die den genannten Grenzwert nominell <br />
            überschreiten.<br />
            </Typography>
            <div>
                <Link
                    color="primary"
                    href="https://www.rki.de/DE/Content/InfAZ/N/Neuartiges_Coronavirus/Risikogebiete_neu.html"
                    target="_blank"
                >
                    Quelle: Robert Koch Institut
                </Link>
            </div>

        </React.Fragment >
    );
};

export default TextcardRiskDef;