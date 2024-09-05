import React from "react";
import { useQuery } from "@tanstack/react-query";
import { List, Box } from "@mui/material";
import TopicListItem from "./TopicListItem";
import { QUERY_KEY } from "../../lib/constants";
import fetchJson from "../../lib/fetch_json";

const useTopics = () => {
  return useQuery({
    queryKey: [QUERY_KEY.topic],
    queryFn: async () => fetchJson("/api/topics", { credentials: "include" }),
  });
};

function Interests() {
  const { data: topics, error, isLoading } = useTopics();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Errors...</div>;

  const topicList = topics?.data || [];

  return (
    <Box sx={{ padding: 2 }}>
      <List>
        {topicList.map((topic) => (
          <TopicListItem key={topic.id} topic={topic} />
        ))}
      </List>
    </Box>
  );
}

export default Interests;
