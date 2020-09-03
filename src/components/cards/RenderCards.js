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
    if (card) {
      var cardComponent = [card.artists[0].name];
      var cardImage = [card.album.images[1]?.url];
       console.log(card);
      // console.log(cardImage);
    } else {
      var cardComponent = null;
      var cardImage = null;
    }
    // console.log(cardComponent);
    // card render function
    console.log(card.uri);
    return (
      <Box align="center" pad="medium" width="medium" height="medium">
        <Card
          fill="true"
          id="overlay"
          key={index}
          background={{ image: "url(" + cardImage + ")", opacity: "medium" }}
          onClick = {() => window.open(card.uri, "_self")}
        >
          <CardHeader pad="medium"> </CardHeader>
          <CardBody
            alignContent="end"
            height="medium"
            margin={{ bottom: "large" }}
            pad="medium"
          >
            {/* //   {console.log(cardComponent)}
          //   {console.log(cardImage)} */}
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