import React from "react";
import {
  Text,
  Avatar,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Box,
} from "grommet";

const RenderCards = (card, index) => {
  // render cards function to display songItems/tbArtistItems in card format

  // card null check
  if (card) {
    var cardComponent = [card.artists[0].name];
    var cardImage = [card.album.images[1]?.url];
  } else {
    var cardComponent = null;
    var cardImage = null;
  }

  return (
    <Box
      hoverIndicator="true"
      align="center"
      pad="medium"
      width="medium"
      height="medium"
    >
      <Card
        fill="true"
        id="overlay"
        key={index}
        background={{ image: "url(" + cardImage + ")", opacity: "medium" }}
        onClick={() => window.open(card.uri, "_self")}
      >
        <CardHeader pad="medium"> </CardHeader>
        <CardBody
          alignContent="end"
          height="medium"
          margin={{ bottom: "large" }}
          pad="medium"
        >
          <Text color="white">{[card.name]} </Text>
        </CardBody>
        <CardFooter pad="small" background="light-1">
          <Avatar size="small" image={cardImage} />
          <Text>{cardComponent}</Text>
        </CardFooter>
      </Card>
    </Box>
  );
};
export default RenderCards;
