import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  IconButton,
  Chip,
  CardActionArea,
  CardActions,
} from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { styled } from "@mui/system";

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
    <Card
      sx={{
        borderRadius: 4,
        width: "100%",
      }}
    >
      <CardActionArea onClick={onClick}>
        {newsResource.headerImageUrl && (
          <CardMedia
            component="img"
            height="180"
            image={newsResource.headerImageUrl}
            alt="header image"
          />
        )}
        <CardContent>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">{newsResource.title}</Typography>
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
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
        >
          <Box display="flex" gap={1} overflow="auto">
            {newsResource.topics.map((topic) => (
              <Chip
                key={topic.id}
                label={topic.name.toUpperCase()}
                clickable
                onClick={() => onTopicClick(topic.id)}
              />
            ))}
          </Box>
          <IconButton onClick={onToggleBookmark}>
            {isBookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
          </IconButton>
        </Box>
      </CardActions>
    </Card>
  );
}

export default NewsResourceCard;
