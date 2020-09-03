import React, { useState } from "react";
import {
  Grommet,
  Heading,
  Main,
  Paragraph,
  Text,
  Footer,
  Anchor,
  Header,
  Layer,
  Button,
  DropButton,
  Avatar,
  Menu,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Box,
  FormField,
  TextInput,
  Select,
  ResponsiveContext,
} from "grommet";
import { Down } from "grommet-icons";
import CreateArtistPlaylists from "../playlists/CreateArtistPlaylists";
import CreateTopSongPlaylist from "../playlists/CreateTopSongPlaylist";
import RenderCards from "../cards/RenderCards";
import CreateThrowbackPlaylist from "../playlists/CreateThrowbackPlaylist";
import AboutMe from "../AboutMe";

const theme = {
  global: {
    font: {
      family: "Roboto",
      size: "18px",
      height: "20px",
    },
  },
};

const MainPage = (props) => {
  // console.log(props);
  console.log(props.songItems);
  // console.log(props.artistItems[1]);
  // console.log(props.songItems[0]);
  // console.log(props.userID);
  // console.log(props.artistItems[0].uri);
  console.log(props.tbArtistTracks);

  function filterDates(date) {
    var d1 = Date.parse(date.album.release_date);
    var d2 = Date.parse("2018-09-01");
    return d2 >= d1;
  }

  console.log(props.artistItems)
  return (
    <Grommet theme={theme} full>
      <Header gap="medium" margin="small">
        Lullaby
        <Box
          direction="row-responsive"
          align="end"
          basis="1/4"
          justify="end"
          gap="small"
        >
          <Avatar size="medium" src={props.profile[0].url} />
          <AboutMe />
        </Box>
      </Header>
      <Box height="large" align="center" animation="fadeIn" justify="center">
        <Heading>Hello {props.username} </Heading>
        <Text>I know all about you ;)</Text>
        <Box margin={{ vertical: "150px" }}>
          <Down />
        </Box>
      </Box>
      <Box pad="large" background="accent-3">
        <Box direction="row-responsive" align="center">
          <Box basis="3/4" direction="column">
            <Heading alignSelf="left"> Your Current Top Artists </Heading>
            These peeps have you bopping all day everyday
          </Box>
          <Box basis="1/4" align="end">
            <CreateArtistPlaylists
              userID={props.userID}
              token={props.token}
              artistItems={props.artistItems}
              makeTopArtistPlaylist={props.makeTopArtistPlaylist}
            />
          </Box>
        </Box>
        <Box
          pad="large"
          direction="row-responsive"
          alignContent="center"
          animation="slideUp"
          align="center"
          justify="center"
          gap="300px"
        >
          <Box direction="column" align="center" gap="small">
            <Text size="xlarge" margin="medium" weight="bold">
              #1
            </Text>
            <Avatar
              size="375px"
              src={props.artistItems[0].images[0].url}
              onClick={() => window.open(props.artistItems[0].uri, "_self")}
            />
            <Text size="large" margin="medium" weight="bold">
              {props.artistItems[0].name}{" "}
            </Text>
          </Box>
          <Box direction="column" align="center" gap="small">
            <Text size="xlarge" margin="medium" weight="bold">
              #2
            </Text>
            <Avatar
              size="375px"
              src={props.artistItems[1]?.images[0].url}
              onClick={() => window.open(props.artistItems[1].uri, "_self")}
            />
            
            <Text size="large" margin="medium" weight="bold">
              {props.artistItems[1]?.name}
            </Text>
          </Box>
          <Box direction="column" align="center" gap="small">
            <Text size="xlarge" margin="medium" weight="bold">
              #3
            </Text>
            <Avatar
              size="375px"
              src={props.artistItems[2]?.images[0].url}
              onClick={() => window.open(props.artistItems[2].uri, "_self")}
            />
            <Text size="large" margin="medium" weight="bold">
              {props.artistItems[2]?.name}{" "}
            </Text>
          </Box>
          {console.log(props.tbArtistItems)}
        </Box>
      </Box>
      <Box pad="large" background="accent-1">
        <Box direction="row-responsive" align="center">
          <Box basis="3/4" direction="column">
            <Heading textAlign="left"> Your Current Top Songs </Heading>
            <Text>Your current bops </Text>
          </Box>
          <Box basis="1/4" align="end">
            <CreateTopSongPlaylist
              userID={props.userID}
              token={props.token}
              songItems={props.songItems}
              makeTopSongsPlaylist={props.makeTopSongsPlaylist}
            />
          </Box>
        </Box>
        <Box
          align="center"
          direction="row-responsive"
          pad="medium"
          gap="medium"
          responsive="true"
        >
          {props.songItems.slice(0, 5).map(RenderCards)}
        </Box>
        <Box
          align="center"
          direction="row-responsive"
          pad="medium"
          gap="medium"
          responsive="true"
        >
          {props.songItems.slice(6, 11).map(RenderCards)}
        </Box>
        <Box
          align="center"
          direction="row-responsive"
          pad="medium"
          gap="medium"
          responsive="true"
        >
          {props.songItems.slice(12, 17).map(RenderCards)}
        </Box>
      </Box>
      <Box pad="large" background="accent-2">
        <Box direction="row-responsive" align="center">
          <Box basis="3/4" direction="column">
            <Heading textAlign="right"> Throwback Suggestions </Heading>
            <Text>
              {" "}
              Remember these classics you used to listen to? (You must've been
              an active Spotify member since 2016 for this to work properly){" "}
            </Text>
          </Box>
          <Box basis="1/4" align="end">
            <CreateThrowbackPlaylist
              userID={props.userID}
              token={props.token}
              tbArtistTracks={props.tbArtistTracks}
              makeThrowbackPlaylist={props.makeThrowbackPlaylist}
            />
          </Box>
        </Box>
        <Box
          align="center"
          direction="row-responsive"
          pad="medium"
          gap="medium"
          responsive="true"
        >
          {props.tbArtistTracks
            .filter(filterDates)
            .splice(0, 5)
            .map(RenderCards)}
        </Box>
        <Box
          align="center"
          direction="row-responsive"
          pad="medium"
          gap="medium"
          responsive="true"
        >
          {props.tbArtistTracks
            .filter(filterDates)
            .slice(6, 11)
            .map(RenderCards)}
        </Box>
        <Box
          align="center"
          direction="row-responsive"
          pad="medium"
          gap="medium"
          responsive="true"
        >
          {props.tbArtistTracks
            .filter(filterDates)
            .slice(12, 17)
            .map(RenderCards)}
        </Box>
      </Box>
      <Footer align="center" pad="medium">
        <Text>Copyright Martin Au-yeung</Text>
        <Anchor label="About" />
      </Footer>
    </Grommet>
  );
};

export default MainPage;
