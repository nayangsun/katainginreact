import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  IconButton,
  Chip,
} from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { styled } from "@mui/system";

const StyledCard = styled(Card)({
  borderRadius: 16, // theme.shape.borderRadius * 2
  padding: 16, // theme.spacing(2)
  boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)", // theme.shadows[3]
});

const NotificationDot = styled(Box)({
  width: 8,
  height: 8,
  borderRadius: "50%",
  backgroundColor: "#f50057", // theme.palette.secondary.main
  marginRight: 8, // theme.spacing(1)
});

function NewsResourceCard({
  newsResource,
  isBookmarked,
  hasBeenViewed,
  onToggleBookmark,
  onClick,
  onTopicClick,
}) {
  return (
    <StyledCard onClick={onClick}>
      {newsResource.headerImageUrl && (
        <CardMedia
          component="img"
          height="180"
          image={newsResource.headerImageUrl}
          alt="header image"
        />
      )}
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">{newsResource.title}</Typography>
          <IconButton onClick={onToggleBookmark}>
            {isBookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
          </IconButton>
        </Box>

        <Box display="flex" alignItems="center" mt={1}>
          {!hasBeenViewed && <NotificationDot />}
          <Typography variant="body2" color="textSecondary">
            {new Date(newsResource.publishDate).toLocaleDateString()} •{" "}
            {newsResource.type}
          </Typography>
        </Box>

        <Typography variant="body1" mt={2}>
          {newsResource.content}
        </Typography>

        <Box display="flex" gap={1} mt={2} overflow="auto">
          {newsResource.followedTopics.map((topic) => (
            <Chip
              key={topic.id}
              label={topic.name.toUpperCase()}
              clickable
              onClick={() => onTopicClick(topic.topic.id)}
              // color={topic.isFollowed ? 'primary' : 'default'}
            />
          ))}
        </Box>
      </CardContent>
    </StyledCard>
  );
}

export default NewsResourceCard;
