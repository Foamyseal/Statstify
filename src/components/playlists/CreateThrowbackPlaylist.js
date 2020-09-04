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
var playlistPrivacy = null;

const CreateThrowbackPlaylist = (props) => {

  const userID = props.userID;
  const token = props.token;
  const tbArtistTracks = props.tbArtistTracks.filter(filterDates); 
  const [show, setShow] = useState();
  const [value, setValue] = useState("public");

  console.log(tbArtistTracks);

  function inputHandler1() {
    playlistName = document.getElementById("name").value;
    console.log(playlistName);
  }

  function inputHandler2() {
    playlistDescription = document.getElementById("description").value;
    console.log(playlistDescription);
  }
  
  function privacyHandler(value) {
    console.log(value)
    if (value === "private") {
      playlistPrivacy = false;
    } else {
      playlistPrivacy = true; 
    }
  }
  

  
  function filterDates(date) {
    var d1 = Date.parse(date.album.release_date);
    var d2 = Date.parse("2017-09-01");
    return d2 >= d1;
  }


  function onClickHandler() {
    inputHandler1();
    inputHandler2();
    props.makeThrowbackPlaylist(
      playlistName,
      playlistDescription,
      playlistPrivacy,
      userID,
      token,
      tbArtistTracks
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

export default CreateThrowbackPlaylist;