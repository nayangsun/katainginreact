import React, { useEffect } from "react";
import { Box, Chip, Typography, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link as RouterLink, useParams } from "react-router-dom";
import CheckIcon from "@mui/icons-material/Check";
import useUserFollowedTopics from "./useUserFollowedTopics";
import NewsResourceCard from "../NewsResourceCard/NewsResourceCard";
import useInterests2Pane from "../Interests2PaneProvider/useInterests2Pane";
import Loading from "../Loading/Loading";
import Error from "../Error/Error";

function InterestsDetail() {
  const { topicId } = useParams();
  const { setPaneRole } = useInterests2Pane();

  useEffect(() => {
    setPaneRole(`detail:${topicId}`);
  }, [topicId, setPaneRole]);

  const { data, error, isPending } = useUserFollowedTopics();

  if (isPending) return <Loading />;
  if (error) return <Error error={error} />;
  const { topics } = data;

  const topic = topics.find((topic) => topic.id === Number(topicId));

  if (!topic)
    return (
      <Box sx={{ padding: 2, textAlign: "center" }}>
        <Typography variant="h4">Topic Not Found</Typography>
        <Typography variant="body1">
          The topic you are looking for does not exist.
        </Typography>
      </Box>
    );

  // TODO: Fetch news resource by topicId
  const newsResource = {
    id: "2",
    title:
      "The new Google Pixel Watch is here  — start building for Wear OS! ⌚",
    content:
      "We launched the Google Pixel Watch, powered by Wear OS 3.5, at the Made by Google event — the perfect device to showcase apps built with Compose for Wear OS. With Compose for Wear OS, the Tiles Material library, and the tools in Android Studio Dolphin, it’s now simpler and more efficient than ever to make apps for WearOS.",
    url: "https://android-developers.googleblog.com/2022/10/the-new-google-pixel-watch-is-here.html",
    headerImageUrl:
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhH63icac2kmydOI8Fs2I09KiuRA3GUo2pfZ1Wpf0M5JIEoVQ8dj9LYSl8jpxSQlmlsUVXoeXbwN4UbHMCf5p0M7FHh_EXzMeFRAJ-6feI9-7eIyhBmtGZSD5o-MItwFLH_ESi15Cxd01AlznWaGy9WDqhK0NWtMQwiWELg3xE1I7hba-_7eVqs747V/w1200-h630-p-k-no-nu/WhasNewinPixelDevices_Social.png",
    publishDate: "2022-10-06T23:00:00.000Z",
    type: "Article 📚",
    followedTopics: [
      { id: "1", name: "Headlines" },
      { id: "3", name: "Compose" },
      { id: "19", name: "Wear OS" },
    ],
  };

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

      <NewsResourceCard
        newsResource={newsResource}
        isBookmarked={false}
        hasBeenViewed={false}
        onToggleBookmark={() => {}}
        onClick={() => {}}
        onTopicClick={() => {}}
      />
    </Box>
  );
}

export default InterestsDetail;
