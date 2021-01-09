/**
 * Summary: The theme switch is a toggle button for switching the theme.
 * 
 * Description: This theme switch can toggle between two themes, e.g. 'dark' 
 * and 'light' theme. It is not implemented yet but can be implemented very
 * easily and quickly since the rest of the logic is also already implemented.
 * 
 * @author Magdalena Köhler
 * @see https://confluence-student.it.hs-heilbronn.de/display/LAPSW2020WiSeTeam3/Projektstruktur
 * @param props the parameters to change this component
 */

import React from "react";
import Fab from "@material-ui/core/Fab";
import { Brightness5Rounded, Brightness4Rounded } from "@material-ui/icons";

export default function ThemeIndicator(isDark) {
    const displayAlt = isDark ? "Switch to Light Mode" : "Switch to Dark Mode";
    if (isDark) {
        return (
            <Fab size="small" aria-label={displayAlt}>
                here <Brightness4Rounded />
            </Fab>
        );
    } else {
        return (
            <Fab size="small" aria-label={displayAlt}>
                <Brightness5Rounded />
            </Fab>
        );
    }
}
