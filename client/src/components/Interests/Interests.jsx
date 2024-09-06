import React from "react";
import { useQueries } from "@tanstack/react-query";
import { List, Box } from "@mui/material";
import TopicListItem from "./TopicListItem";
import { QUERY_KEY } from "../../lib/constants";
import fetchJson from "../../lib/fetch_json";

function useTopicAndUserQueries() {
  return useQueries({
    queries: [
      {
        queryKey: [QUERY_KEY.topic],
        queryFn: () => fetchJson("/api/topics", { credentials: "include" }),
      },
      {
        queryKey: [QUERY_KEY.user],
        queryFn: () => fetchJson("/api/me", { credentials: "include" }),
      },
    ],
    combine: (results) => {
      const [topicResult, userResult] = results;
      const topicData = topicResult.data?.data || [];
      const followedTopics = userResult.data?.data?.followedTopics || [];

      const mergedTopics = topicData.map((topic) => ({
        ...topic,
        isFollowed: followedTopics.includes(topic.id),
      }));

      return {
        data: mergedTopics,
        isPending: results.some((result) => result.isPending),
        error: results.find((result) => result.error)?.error,
      };
    },
  });
}


function Interests() {
  const { data: topics, error, isPending } = useTopicAndUserQueries();

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

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
export default Interests;