import React, { useEffect } from "react";
import { List, Box } from "@mui/material";
import TopicListItem from "./TopicListItem";
import useUserFollowedTopics from "./useUserFollowedTopics";
import useInterests2Pane from "../Interests2PaneProvider/useInterests2Pane";
import Error from "../Error/Error";
import Loading from "../Loading/Loading";

function InterestsList() {
  const { data, error, isPending } = useUserFollowedTopics();

  const { setPaneRole } = useInterests2Pane();

  useEffect(() => {
    setPaneRole("list");
  }, [setPaneRole]);

  if (isPending && !data) return <Loading />;
  if (error) return <Error error={error} />;
  const { topics } = data;

  return (
    <Box sx={{ padding: 2 }}>
      <List>
        {topics.map((topic) => (
          <TopicListItem key={topic.id} topic={topic} />
        ))}
      </List>
    </Box>
  );
}

export default InterestsList;
