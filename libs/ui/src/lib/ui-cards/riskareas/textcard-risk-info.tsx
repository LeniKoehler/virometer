/**
 * This is a UI-card that contains information regarding riskareas.
 * 
 * @author Magdalena Köhler (Code), Jan Seel (Text content)
 * @see https://confluence-student.it.hs-heilbronn.de/display/LAPSW2020WiSeTeam3/Projektstruktur
 * @param props the parameters to change this component
 */

import { Typography } from "@material-ui/core";
import React from "react";
import Title from "../../Title"

interface TextcardRiskInfoProps {
    panelTheme?: string | ""
}

export const TextcardRiskInfo = (props: TextcardRiskInfoProps) => {

    return (
        <React.Fragment>
            <Title>Sicherheitsmaßnahmen in einem Risikogebiet</Title>
            <Typography color="textSecondary">
                Es wird dringend empfohlen in den Risikogebieten sich stehts an <br />
            die lokalen Gesundheitsmaßnahmen zu halten. Jeglicher Kontakt <br />
            mit anderen Personen muss zu einen Minimum beibehalten werden. <br />
            Zur jederzeit sollten Sie in den Risikogebieten stehts <br />
            Mund-und-Nasenschutz in der Öffentlichkeit tragen, und wenn <br />
            möglich regelmäßig Desinfizierungsmittel benutzen. Besonders <br />
            wichtig wird empfohlen Kontakt mit Risikogruppen komplett zu <br />
            vermeiden. Allgemein wird Selbstquarantäne empfohlen sollten <br />
            sie in den Risikogebieten wohnen.<br />
            </Typography>
        </React.Fragment >
    );
};

export default TextcardRiskInfo;