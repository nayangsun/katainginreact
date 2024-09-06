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
import CheckIcon from "@mui/icons-material/Check";
import { useSnackbar } from "notistack";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "../../lib/constants";
import fetchJson from "../../lib/fetch_json";
import { formatSentence } from "../../lib/utils";

function TopicListItem({ topic }) {
  const [loading, setLoading] = useState(true);
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const mutation = useMutation({
    mutationFn: async (topicId) => {
      const url = topic.isFollowed
        ? "/api/users/topic/unfollow"
        : "/api/users/topic/follow";

      return fetchJson(url, {
        method: "POST",
        body: JSON.stringify({ topic_id: topicId }),
        headers: { "Content-Type": "application/json" },
      });
    },

    onSuccess: (userResult) => {
      queryClient.setQueryData([QUERY_KEY.user], () => userResult);
    },

    onError: (error) => {
      enqueueSnackbar(formatSentence(error.message), { variant: "error" });
    },
  });

  function handleImageLoad() {
    setLoading(false);
  }

  function handleFollowClick() {
    mutation.mutate(topic.id);
  }

  return (
    <ListItem
      key={topic.id}
      secondaryAction={
        <IconButton
          sx={{
            backgroundColor: topic.isFollowed ? "lightpink" : "inherit",
            "&:hover": {
              backgroundColor: topic.isFollowed ? "lightpink" : undefined,
              opacity: 0.8,
            },
          }}
          onClick={handleFollowClick}
          disabled={mutation.isLoading}
        >
          {topic.isFollowed ? <CheckIcon /> : <AddIcon />}
        </IconButton>
      }
      disablePadding
      sx={{ display: "flex", alignItems: "center" }}
    >
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
      </ListItemButton>
    </ListItem>
  );
}

export default TopicListItem;
