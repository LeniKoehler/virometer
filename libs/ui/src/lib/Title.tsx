/**
 * Summary: This is the title for UI-Cards.
 * 
 * Description: This title component is a material-ui Typography component used
 * in the UI-cards. It should always be used as Title in UI-cards to guarantee
 * a unified UI.
 * 
 * @author Magdalena Köhler
 * @see https://confluence-student.it.hs-heilbronn.de/display/LAPSW2020WiSeTeam3/Projektstruktur
 * @param props the parameters to change this component
 */

import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";

export const Title = (props) => {
    return (
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
            {props.children}
        </Typography>
    );
}


Title.propTypes = {
    children: PropTypes.node
};

export default Title;
