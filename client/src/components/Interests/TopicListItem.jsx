import React, { useState } from "react";
import {
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
  Avatar,
  Box,
  CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

function TopicListItem({ topic, onAddClick }) {
  const [loading, setLoading] = useState(true);

  function handleImageLoad() {
    setLoading(false);
  }

  return (
    <ListItem key={topic.id} sx={{ display: "flex", alignItems: "center" }}>
      <ListItemButton sx={{ flexGrow: 1 }}>
        <Box sx={{ position: "relative", marginRight: 2 }}>
          {loading && (
            <CircularProgress
              size={40}
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: "-20px",
                marginLeft: "-20px",
              }}
            />
          )}
          <Avatar
            src={topic.imageUrl}
            alt={topic.name}
            sx={{ display: loading ? "none" : "block" }}
            variant="square"
            onLoad={handleImageLoad}
          />
        </Box>

        <ListItemText primary={topic.name} />
        <IconButton edge="end" onClick={() => onAddClick(topic.id)}>
          <AddIcon />
        </IconButton>
      </ListItemButton>
    </ListItem>
  );
}
export default TopicListItem;
