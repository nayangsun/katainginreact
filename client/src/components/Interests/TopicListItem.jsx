import React from "react";
import { ListItem, ListItemText, ListItemButton } from "@mui/material";

function TopicListItem({ topic }) {
  return (
    <ListItem key={topic.id}>
      <ListItemButton>
        <ListItemText primary={topic.name} />
      </ListItemButton>
    </ListItem>
  );
}

export default TopicListItem;
