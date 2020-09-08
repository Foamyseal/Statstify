import React, { useState } from "react";
import {
  Text,
  Layer,
  Button,
  Box,
  FormField,
  TextInput,
  Select,
} from "grommet";

var playlistName = "";
var playlistDescription = "";
var playlistPrivacy = Boolean;

const CreateArtistPlaylists = (props) => {
  const userID = props.userID;
  const token = props.token;
  const artistItems = props.artistItems;
  const [show, setShow] = useState();
  const [value, setValue] = useState("public");

  function inputHandler1() {
    playlistName = document.getElementById("name").value;
  }

  function inputHandler2() {
    playlistDescription = document.getElementById("description").value;
  }

  function privacyHandler(value) {
    console.log(value);
    if (value === "private") {
      playlistPrivacy = false;
    } else {
      playlistPrivacy = true;
    }
  }

  function onClickHandler() {
    inputHandler1();
    inputHandler2();

    props.makeTopArtistPlaylist(
      playlistName,
      playlistDescription,
      playlistPrivacy,
      userID,
      token,
      artistItems
    );
    setShow(false);
  }

  return (
    <Box>
      <Button label="+ create playlist" onClick={() => setShow(true)} />
      {show && (
        <Layer
          onEsc={() => setShow(false)}
          onClickOutside={() => setShow(false)}
        >
          <FormField label="Create playlist based on Current Top Artists">
            <Box pad="medium">
              <Text> Playlist Name </Text>
              <TextInput id="name" />
            </Box>
            <Box pad="medium">
              <Text> Playlist Description </Text>
              <TextInput id="description" />
            </Box>
            <Box pad="medium">
              <Text pad="small">Playlist Privacy </Text>
              <Select
                options={["public", "private"]}
                value={value}
                id="privacy"
                onChange={({ option }) => setValue(option)}
                onSelect={privacyHandler(value)}
              />
            </Box>
            <Box pad="small" width="medium">
              <Button
                label="Create playlist"
                type="submit"
                onClick={onClickHandler}
              />
            </Box>
            <Box align="center" justify="center" pad="small">
              <Button
                width="large"
                label="close"
                onClick={() => setShow(false)}
              />
            </Box>
          </FormField>
        </Layer>
      )}
    </Box>
  );
};

export default CreateArtistPlaylists;
