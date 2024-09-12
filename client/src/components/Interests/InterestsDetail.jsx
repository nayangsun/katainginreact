import React, { useEffect } from "react";
import { Box, Chip, Typography, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link as RouterLink, useParams } from "react-router-dom";
import CheckIcon from "@mui/icons-material/Check";
import { useQueries } from "@tanstack/react-query";
import NewsResourceCard from "../NewsResourceCard/NewsResourceCard";
import useInterests2Pane from "../Interests2PaneProvider/useInterests2Pane";
import Loading from "../Loading/Loading";
import Error from "../Error/Error";
import { QUERY_KEY } from "../../lib/constants";
import fetchJson from "../../lib/fetch_json";
import { extractQueriedData } from "../../lib/utils";

function useCombinedQuery(topicId) {
  return useQueries({
    queries: [
      {
        queryKey: [QUERY_KEY.topic, topicId],
        queryFn: () => fetchJson(`/api/topics/${topicId}`),
      },
      {
        queryKey: [QUERY_KEY.newsResource, topicId],
        queryFn: () => fetchJson(`/api/news_resources/${topicId}`),
      },
    ],
    combine: (results) => {
      const [topicResult, newsResoureResult] = results;
      const topicData = extractQueriedData(topicResult.data) || [];
      const newsResourceData = extractQueriedData(newsResoureResult.data) || [];

      const errorResult = results.find((result) => result.error);
      const error = errorResult ? errorResult.error : null;

      return {
        data: { topic: topicData, newsResources: newsResourceData },
        isPending: results.some((result) => result.isPending),
        error: error,
      };
    },
  });
}

function InterestsDetail() {
  const { topicId } = useParams();
  const { setPaneRole } = useInterests2Pane();

  useEffect(() => {
    setPaneRole(`detail:${topicId}`);
  }, [topicId, setPaneRole]);

  const { data, isPending, error } = useCombinedQuery(topicId);

  if (isPending) return <Loading />;
  if (error) return <Error error={error} />;

  const { topic: topic, newsResources: newsResources } = data;

  if (!topic)
    return (
      <Box sx={{ padding: 2, textAlign: "center" }}>
        <Typography variant="h4">Topic Not Found</Typography>
        <Typography variant="body1">
          The topic you are looking for does not exist.
        </Typography>
      </Box>
    );

  return (
    <Box sx={{ padding: 2, display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <IconButton component={RouterLink} to="/interests">
          <ArrowBackIcon />
        </IconButton>
        <Chip
          label={topic.isFollowed ? "FOLLOWING" : "NOT FOLLOWING"}
          variant="outlined"
          sx={{
            marginLeft: 1,
            backgroundColor: topic.isFollowed ? "lightpink" : "default",
          }}
          icon={topic.isFollowed ? <CheckIcon /> : null}
        />
      </Box>

      <Box mb={4}>
        <Box sx={{ textAlign: "center" }}>
          <img src={topic.imageUrl} alt={topic.name} width={200} height={200} />
        </Box>
        <Typography variant="h4">{topic.name}</Typography>
        <Typography variant="body1">{topic.longDescription}</Typography>
      </Box>

      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        {newsResources.map((newsResource) => (
          <NewsResourceCard
            key={newsResource.id}
            newsResource={newsResource}
            isBookmarked={false}
            hasBeenViewed={false}
            onToggleBookmark={() => {}}
            onClick={() => {}}
            onTopicClick={() => {}}
          />
        ))}
      </Box>
    </Box>
  );
}

export default InterestsDetail;
