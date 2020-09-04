import React from "react";
import { Grommet, Heading, Button, Box, Text, Main } from "grommet";

export const authEndpoint = "https://accounts.spotify.com/authorize";
const clientId = "4218105ab20743ea80387bf1a7f82bf9";
const redirectUri = "http://localhost:3000/";
const scopes = [
  "user-top-read",
  "playlist-modify-private",
  "playlist-modify-public",
];

const theme = {
  global: {
    font: {
      family: "Roboto",
      size: "18px",
      height: "20px",
    },
  },
};

const LoginPage = (props) => {
  return (
    <Grommet theme={theme}>
      <Main
        justify="center"
        alignContent="center"
        align="center"
        animation="fadeIn"
        height="xxlarge"
      >
        <Box margin={{vertical: "300px"}} align="center" justify="center">
          <Heading size="large" align="center">Lullaby</Heading>
          <Text level="4" margin={{bottom: "30px"}}align="center"> A Spotify Statistics Site</Text>
          <Button
            primary
            align="center"
            label="Login to Spotify"
            href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
              "%20"
            )}&response_type=token&show_dialog=true`}
          />
        </Box>    
      </Main>
    </Grommet>
  );
};

export default LoginPage;
