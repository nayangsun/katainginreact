import React from "react";
import { useQueries } from "@tanstack/react-query";
import { List, Box } from "@mui/material";
import TopicListItem from "./TopicListItem";
import Error from "../Error/Error";
import Loading from "../Loading/Loading";
import { QUERY_KEY } from "../../lib/constants";
import fetchJson from "../../lib/fetch_json";
import { extractQueriedData } from "../../lib/utils";

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
      const topicData = extractQueriedData(topicResult.data) || [];
      const userData = extractQueriedData(userResult.data) || {};

      const followedTopics = userData.followedTopics || [];
      const mergedTopics = topicData.map((topic) => ({
        ...topic,
        isFollowed: followedTopics.includes(topic.id),
      }));

      return {
        data: mergedTopics,
        isPending: results.some((result) => result.isPending),
        error: results.find((result) => result.error)
          ? results.find((result) => result.error).error
          : null,
      };
    },
  });
}

function Interests() {
  const { data: topics, error, isPending } = useTopicAndUserQueries();

  if (isPending && !topics) return <Loading />;
  if (error) return <Error error={error} />;

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
