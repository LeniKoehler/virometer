/**
 * Summary: This file contains the Items shown as Buttons in the sidebar.
 * 
 * Description: The side bar has a number of list items which either link to a
 * different page or which open a menu in order to select other options.
 * 
 * @author Magdalena Köhler
 * @see https://confluence-student.it.hs-heilbronn.de/display/LAPSW2020WiSeTeam3/Projektstruktur
 * @param props the parameters to change this component
 */

import DashboardIcon from "@material-ui/icons/Dashboard";
import GetAppIcon from '@material-ui/icons/GetApp';
import InfoIcon from '@material-ui/icons/Info';
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PieChartIcon from '@material-ui/icons/PieChart';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import React, { useState } from "react";
import TimelineIcon from '@material-ui/icons/Timeline';
import ViewListIcon from '@material-ui/icons/ViewList';
import WarningIcon from '@material-ui/icons/Warning';
import { BrowserRouter as Router, Link } from "react-router-dom";
import { createStyles, makeStyles, Menu, MenuItem, TextField, Theme } from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';

import { states } from "./../constants/states/states";
import { counties } from "./../constants/counties/counties";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        margin: {
            margin: theme.spacing(1),
        },
        textField: {
            width: '25ch',
        },
    }),
);

//this enum is for the switch
enum SideBar {
    Dashboard = "Dashboard",
    Germany = "Ganz Deutschland",
    States = "Bundesländer",
    Counties = "Landkreise",
    Map = "Landkarte",
    Table = "Tabelle",
    Linediagram = "Verlaufsdiagramm",
    Piechart = "Kreisdiagramm",
    Risk = "Risikogebiete",
    Download = "Download der Daten",
    Impressum = "Impressum",
}

//these constants contain the text of the button as value and the url extension for the link
const SIDEBAR_MAP = { value: SideBar.Map, to: "/map" }
const SIDEBAR_TABLE = { value: SideBar.Table, to: "/table" }
const SIDEBAR_LINEDIAGRAM = { value: SideBar.Linediagram, to: "/verlaufsdiagramm" }
const SIDEBAR_PIECHART = { value: SideBar.Piechart, to: "/kreisdiagramm" }
const SIDEBAR_RISK = { value: SideBar.Risk, to: "/risikogebiete" }
const SIDEBAR_DOWNLOAD = { value: SideBar.Download, to: "/download" }
const SIDEBAR_IMPRESSUM = { value: SideBar.Impressum, to: "/impressum" }

//The main list items are the ones displayed at the top
export const MainListItems = () => {
    const [menuPosition, setMenuPosition] = useState<any>(null);
    const [menuPositionGer, setMenuPositionGer] = useState<any>(null);
    const [menuPositionBL, setMenuPositionBL] = useState<any>(null);
    const [menuPositionLK, setMenuPositionLK] = useState<any>(null);

    const handleBtnClick = (event) => {
        const top = event.pageY
        const left = event.pageX

        switch (event.currentTarget.innerText) {
            case SideBar.Dashboard:
                if (!menuPosition) {
                    setMenuPosition({ top, left });
                }
                break;
            case SideBar.Germany:
                if (!menuPositionGer) {
                    setMenuPositionGer({ top, left });
                }
                break;
            case SideBar.States:
                if (!menuPositionBL) {
                    setMenuPositionBL({ top, left });
                }
                break;
            case SideBar.Counties:
                if (!menuPositionLK) {
                    setMenuPositionLK({ top, left });
                }
                break;
            default:
                break;
        }
    }

    let inputRef;

    return (
        <Router>
            <div>
                <ListItem button onClick={handleBtnClick}>
                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary={SideBar.Dashboard} />
                    <ChevronRightIcon />
                    <Menu
                        variant={'menu'}
                        open={!!menuPosition}
                        onClose={() => setMenuPosition(null)}
                        anchorReference="anchorPosition"
                        anchorPosition={menuPosition}
                    >
                        <ListItem onClick={handleBtnClick}>
                            <ListItemText primary={SideBar.Germany} />
                            <ChevronRightIcon />
                        </ListItem>
                        <ListItem onClick={handleBtnClick}>
                            <ListItemText primary={SideBar.States} />
                            <ChevronRightIcon />
                        </ListItem>
                        <ListItem onClick={handleBtnClick}>
                            <ListItemText primary={SideBar.Counties} />
                            <ChevronRightIcon />
                        </ListItem>
                        <Menu
                            variant={'menu'}
                            open={!!menuPositionGer}
                            onClose={() => setMenuPositionGer(null)}
                            anchorReference="anchorPosition"
                            anchorPosition={menuPositionGer}
                        >
                            <MenuItem button component={Link} to={"/bundesland/0"}>
                                Daten pro Bundesland
                        </MenuItem>
                            <MenuItem button component={Link} to={"/landkreis/0"}>
                                Daten pro Landkreis
                        </MenuItem>
                        </Menu>
                        <Menu
                            variant={'menu'}
                            open={!!menuPositionBL}
                            onClose={() => setMenuPositionBL(null)}
                            anchorReference="anchorPosition"
                            anchorPosition={menuPositionBL}
                        >
                            <Autocomplete
                                getOptionSelected={() => {
                                    setMenuPosition(null)
                                    setMenuPositionBL(null)
                                    return true;
                                }}
                                options={[...states]}
                                getOptionLabel={({ name }) => name}
                                //openOnFocus
                                renderOption={(option) => (
                                    <ListItem button disableGutters={true} component={Link} to={option.link}>
                                        <ListItemText primary={option.name} />
                                    </ListItem>
                                )}
                                style={{ width: 300 }}
                                renderInput={(params) => (
                                    <TextField {...params}
                                        variant="outlined"
                                        label="Bundesländer"
                                        inputRef={input => {
                                            inputRef = input;
                                        }}
                                        placeholder="Suche ..." />
                                )}
                            />
                        </Menu>
                        <Menu
                            variant={'menu'}
                            open={!!menuPositionLK}
                            onClose={() => setMenuPositionLK(null)}
                            anchorReference="anchorPosition"
                            anchorPosition={menuPositionLK}
                        >
                            <Autocomplete
                                getOptionSelected={() => {
                                    setMenuPosition(null)
                                    setMenuPositionLK(null)
                                    return true;
                                }}
                                options={[...counties]}
                                getOptionLabel={({ name }) => name}
                                //openOnFocus
                                renderOption={(option) => (
                                    <ListItem button disableGutters={true} component={Link} to={option.link}>
                                        <ListItemText primary={option.name} />
                                    </ListItem>
                                )}
                                style={{ width: 300 }}
                                renderInput={(params) => (
                                    <TextField {...params}
                                        variant="outlined"
                                        label="Landkreise"
                                        inputRef={input => {
                                            inputRef = input;
                                        }}
                                        placeholder="Suche ..." />
                                )}
                            />
                        </Menu>
                    </Menu>
                </ListItem>
            </div >
        </Router>
    );
}

export default MainListItems;

//The SecondaryListItems are divided from the main ones by a subheader
export const SecondaryListItems = () => {
    const [menuPosition, setMenuPosition] = useState<any>(null);
    const [menuPositionBL, setMenuPositionBL] = useState<any>(null);
    const [menuPositionLK, setMenuPositionLK] = useState<any>(null);
    const [linkPrefix, setLinkPrefix] = useState<any>(null);

    const handleBtnClick = (event) => {
        const top = event.pageY
        const left = event.pageX

        switch (event.currentTarget.innerText) {
            case SideBar.Linediagram:
                if (!menuPosition) {
                    setMenuPosition({ top, left });
                    setLinkPrefix("/verlaufsdiagramm")
                }
                break;
            case SideBar.States:
                if (!menuPositionBL) {
                    setMenuPositionBL({ top, left });
                }
                break;
            case SideBar.Counties:
                if (!menuPositionLK) {
                    setMenuPositionLK({ top, left });
                }
                break;
            default:
                break;
        }
    }

    let inputRef;

    return (
        <Router>
            <div>
                <ListSubheader inset>Einzelansichten</ListSubheader>
                <ListItem button component={Link} to={SIDEBAR_MAP.to} >
                    <ListItemIcon>
                        <LocationOnIcon />
                    </ListItemIcon>
                    <ListItemText primary={SIDEBAR_MAP.value} />
                </ListItem>
                <ListItem button component={Link} to={SIDEBAR_TABLE.to}>
                    <ListItemIcon>
                        <ViewListIcon />
                    </ListItemIcon>
                    <ListItemText primary={SIDEBAR_TABLE.value} />
                </ListItem>
                <ListItem button component={Link} to={SIDEBAR_PIECHART.to}>
                    <ListItemIcon>
                        <PieChartIcon />
                    </ListItemIcon>
                    <ListItemText primary={SIDEBAR_PIECHART.value} />
                </ListItem>
                <ListItem button onClick={handleBtnClick}>
                    <ListItemIcon>
                        <TimelineIcon />
                    </ListItemIcon>
                    <ListItemText primary={SIDEBAR_LINEDIAGRAM.value} />
                    <ChevronRightIcon />
                    <Menu
                        variant={'menu'}
                        open={!!menuPosition}
                        onClose={() => setMenuPosition(null)}
                        anchorReference="anchorPosition"
                        anchorPosition={menuPosition}
                    >
                        <ListItem button component={Link} to={linkPrefix + "/bundesland/0"}>
                            <ListItemText primary={SideBar.Germany} />
                        </ListItem>
                        <ListItem onClick={handleBtnClick}>
                            <ListItemText primary={SideBar.States} />
                            <ChevronRightIcon />
                        </ListItem>
                        <ListItem onClick={handleBtnClick}>
                            <ListItemText primary={SideBar.Counties} />
                            <ChevronRightIcon />
                        </ListItem>
                        <Menu
                            variant={'menu'}
                            open={!!menuPositionBL}
                            onClose={() => setMenuPositionBL(null)}
                            anchorReference="anchorPosition"
                            anchorPosition={menuPositionBL}
                        >
                            <Autocomplete
                                getOptionSelected={() => {
                                    setMenuPosition(null)
                                    setMenuPositionBL(null)
                                    return true;
                                }}
                                options={[...states]}
                                getOptionLabel={({ name }) => name}
                                //openOnFocus
                                renderOption={(option) => (
                                    <ListItem button disableGutters={true} component={Link} to={linkPrefix + option.link}>
                                        <ListItemText primary={option.name} />
                                    </ListItem>
                                )}
                                style={{ width: 250 }}
                                renderInput={(params) => (
                                    <TextField {...params}
                                        variant="outlined"
                                        label="Bundesländer"
                                        inputRef={input => {
                                            inputRef = input;
                                        }}
                                        placeholder="Suche ..." />
                                )}
                            />
                        </Menu>
                        <Menu
                            variant={'menu'}
                            open={!!menuPositionLK}
                            onClose={() => setMenuPositionLK(null)}
                            anchorReference="anchorPosition"
                            anchorPosition={menuPositionLK}
                        >
                            <Autocomplete
                                getOptionSelected={() => {
                                    setMenuPosition(null)
                                    setMenuPositionLK(null)
                                    return true;
                                }}
                                options={[...counties]}
                                getOptionLabel={({ name }) => name}
                                //openOnFocus
                                renderOption={(option) => (
                                    <ListItem button disableGutters={true} component={Link} to={linkPrefix + option.link}>
                                        <ListItemText primary={option.name} />
                                    </ListItem>
                                )}
                                style={{ width: 300 }}
                                renderInput={(params) => (
                                    <TextField {...params}
                                        variant="outlined"
                                        label="Landkreise"
                                        inputRef={input => {
                                            inputRef = input;
                                        }}
                                        placeholder="Suche ..." />
                                )}
                            />
                        </Menu>
                    </Menu>
                </ListItem>
            </div>
        </Router>
    );
}

//the moreInfoListItems contain items that lead to additional information that
//is not essential to the function of the dashboard itself
export const moreInfoListItems = (
    <Router>
        <div>
            <ListSubheader inset>Weitere Informationen</ListSubheader>
            <ListItem button component={Link} to={SIDEBAR_RISK.to}>
                <ListItemIcon>
                    <WarningIcon />
                </ListItemIcon>
                <ListItemText primary={SIDEBAR_RISK.value} />
            </ListItem>
            <ListItem button component={Link} to={SIDEBAR_DOWNLOAD.to}>
                <ListItemIcon>
                    <GetAppIcon />
                </ListItemIcon>
                <ListItemText primary={SIDEBAR_DOWNLOAD.value} />
            </ListItem>
            <ListItem button component={Link} to={SIDEBAR_IMPRESSUM.to}>
                <ListItemIcon>
                    <InfoIcon />
                </ListItemIcon>
                <ListItemText primary={SIDEBAR_IMPRESSUM.value} />
            </ListItem>
        </div>
    </Router>
);
