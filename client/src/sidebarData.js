import React from "react";
import DeleteIcon  from "@material-ui/icons/Delete";
import ArchiveIcon from '@material-ui/icons/Archive';
import EditIcon from "@material-ui/icons/Edit";

export const sidebarData = [
    {
        title: "Notes",
        path: "/view",
        icon: <EditIcon />,
        cName: "nav-text"
    },
    {
        title: "Archived",
        path: "/archived",
        icon: <ArchiveIcon />,
        cName: "nav-text"
    },
    {
        title: "Bin",
        path: "/deleted",
        icon: <DeleteIcon />,
        cName: "nav-text"
    },
]