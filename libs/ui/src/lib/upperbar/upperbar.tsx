/**
 * Summary: This file is for the upper bar.
 * 
 * Description: The upper bar contains the menu icon and the title of the page.
 * 
 * @author Magdalena Köhler
 * @see https://confluence-student.it.hs-heilbronn.de/display/LAPSW2020WiSeTeam3/Projektstruktur
 * @param props the parameters to change this component
 */

import clsx from "clsx";
import { ThemeProvider, AppBar, Toolbar, IconButton, Typography, makeStyles, createMuiTheme, PaletteType } from "@material-ui/core"
import React, { useGlobal } from 'reactn'; // <-- reactn
import { Menu } from "@material-ui/icons";

// Constants --------------------------------------------------------------------------------------

const DRAWER_WIDTH = 230;

// Declarations -----------------------------------------------------------------------------------

const useStyles = makeStyles(theme => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
    },
    appBarShift: {
        marginLeft: DRAWER_WIDTH,
        width: `calc(100% - ${DRAWER_WIDTH}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    menuButton: {
        marginRight: 36
    },
    menuButtonHidden: {
        display: "none"
    },
    title: {
        flexGrow: 1
    },
    toolbar: {
        paddingRight: 24 // keep right padding when drawer closed
    }
}));

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UpperBarProps { }

export const UpperBar = (props: UpperBarProps) => {
    const [theme, setTheme] = useGlobal('theme');
    const [isOpen, setIsOpen] = useGlobal('isOpen');
    const [title,] = useGlobal('title');

    const isDark = theme === 'dark'

    const virometerBlueTheme = createMuiTheme({
        palette: {
            type: theme as PaletteType,
            primary: {
                main: "#02E3FA"
            },
            secondary: {
                main: "#141619"
            }
        }
    });

    const classes = useStyles();

    const handleOpen = () => {
        setIsOpen(!isOpen)
    }

    const handleThemeChange = () => {
        if (isDark) {
            setTheme('light')
        } else {
            setTheme('dark')
        }
    }

    return (
        <ThemeProvider theme={virometerBlueTheme}>
            <AppBar
                position="absolute"
                className={clsx(classes.appBar, isOpen && classes.appBarShift)}
            >
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleOpen}
                        className={clsx(
                            classes.menuButton,
                            isOpen && classes.menuButtonHidden
                        )}
                    >
                        <Menu />
                    </IconButton>
                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        className={classes.title}
                    >
                        {`ViroMeter - Corona Dashboard | ${title ? `${title}` : ''}`}
                    </Typography>

                    {/* The theme switch is a beta feature, which is why it is disabled here */}
                    {/* <ThemeProvider theme={virometerBlueTheme}>
                        <Switch checked={isDark} onChange={handleThemeChange} />
                    </ThemeProvider> */}

                </Toolbar>
            </AppBar>
        </ThemeProvider>
    )
}