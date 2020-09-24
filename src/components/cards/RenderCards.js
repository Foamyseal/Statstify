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
    >
      <Card
        fill="horizontal"
        height="small"
        background={{image: "url(" + cardImage + ")", opacity: "medium"}}
        style={{backgroundColor: "black"}}
        key={index}
        onClick={() => window.open(card.uri, "_self")}
      >
        <CardHeader pad="small"> </CardHeader>
        <CardBody
          alignContent="end"
          margin={{ bottom: "large" }}
          pad="medium"
        >
          <Text color="white">{[card.name]} </Text>
        </CardBody>
        <CardFooter pad="xsmall" justify="center" align="center" background="#dedcd5">
          <Text textAlign="center" size="small">{cardComponent}</Text>
        </CardFooter>
      </Card>
    </Box>
  );
};
export default RenderCards;
