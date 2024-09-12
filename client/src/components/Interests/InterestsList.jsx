import React, { useEffect } from "react";
import { List, Box } from "@mui/material";
import { useQueries } from "@tanstack/react-query";
import TopicListItem from "./TopicListItem";
import useInterests2Pane from "../Interests2PaneProvider/useInterests2Pane";
import Error from "../Error/Error";
import Loading from "../Loading/Loading";
import { mergeTopicsWithFollowStatus } from "../../lib/topic";
import { QUERY_KEY } from "../../lib/constants";
import fetchJson from "../../lib/fetch_json";
import { extractQueriedData } from "../../lib/utils";

function useCombinedQuery() {
  return useQueries({
    queries: [
      {
        queryKey: [QUERY_KEY.topics],
        queryFn: () => fetchJson("/api/topics"),
      },
      {
        queryKey: [QUERY_KEY.user],
        queryFn: () => fetchJson("/api/me"),
      },
    ],
    combine: (results) => {
      const [topicResult, userResult] = results;
      const topicData = extractQueriedData(topicResult.data) || [];
      const userData = extractQueriedData(userResult.data) || {
        followedTopics: [],
      };

      const mergedTopics = mergeTopicsWithFollowStatus(
        topicData,
        userData.followedTopics
      );

      const errorResult = results.find((result) => result.error);
      const error = errorResult ? errorResult.error : null;

      return {
        data: { topics: mergedTopics },
        isPending: results.some((result) => result.isPending),
        error: error,
      };
    },
  });
}

function InterestsList() {
  const { data, isPending, error } = useCombinedQuery();

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
