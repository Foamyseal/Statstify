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

const CreateTopSongPlaylist = (props) => {

  const userID = props.userID;
  const token = props.token;
  const songItems = props.songItems; 
  const [show, setShow] = useState();
  const [value, setValue] = useState("public");

  function inputHandler1() {
    playlistName = document.getElementById("name").value;
    console.log(playlistName);
  }

  function inputHandler2() {
    playlistDescription = document.getElementById("description").value;
    console.log(playlistDescription);
  }

  function privacyHandler(option) {
    setValue(option);
    if (option !== "public") {
      playlistPrivacy = false;
    }
  }

  function onClickHandler() {
    inputHandler1();
    inputHandler2();
    privacyHandler();
    props.makeTopSongsPlaylist(
      playlistName,
      playlistDescription,
      playlistPrivacy,
      userID,
      token,
      songItems
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
          <FormField label="Playlist Name">
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

export default CreateTopSongPlaylist;
