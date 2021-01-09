/**
 * Summary: This file is for the sidebar.
 * 
 * Description: The side bar contains the list items from ListItems.tsx.
 * 
 * @author Magdalena Köhler
 * @see https://confluence-student.it.hs-heilbronn.de/display/LAPSW2020WiSeTeam3/Projektstruktur
 * @param props the parameters to change this component
 */

import React, { useGlobal } from 'reactn'; // <-- reactn
import clsx from "clsx";
import { Drawer, List, Divider, IconButton, makeStyles, SvgIcon } from "@material-ui/core"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { MainListItems, SecondaryListItems, moreInfoListItems } from "./ListItems";

// Constants --------------------------------------------------------------------------------------

const DRAWER_WIDTH = 230;

// Declarations -----------------------------------------------------------------------------------

const useStyles = makeStyles(theme => ({
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: DRAWER_WIDTH,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9)
    }
  }
}));

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SideBarProps { }

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

export const SideBar = (props: SideBarProps) => {
  const [isOpen, setIsOpen] = useGlobal("isOpen");

  const classes = useStyles();

  const handleOpen = () => {
    setIsOpen(!isOpen)
  }

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(classes.drawerPaper, !isOpen && classes.drawerPaperClose)
      }}
      open={isOpen}
    >
      <div className={classes.toolbarIcon}>
        <IconButton onClick={handleOpen}>
          <ChevronLeftIcon />
        </IconButton>
      </div>

      <Divider />

      <List>
        <MainListItems />
      </List>

      <Divider />

      <List>
        <SecondaryListItems />
      </List>
      <Divider />
      <List>{moreInfoListItems}</List>
    </Drawer>

  )
}