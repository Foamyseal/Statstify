import React, { Component } from "react";
import * as $ from "jquery";
import "../src/App.css";
import MainPage from "./components/pages/MainPage";
import LoginPage from "./components/pages/LoginPage"


const hash = window.location.hash
  .substring(1)
  .split("&")
  .reduce(function (initial, item) {
    if (item) {
      var parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
    }
    return initial;
  }, {});
window.location.hash = "";

class App extends Component {
  constructor() {
    super();
    this.state = {
      token: null,
      songItems: [
        {
          album: {
            images: [{ url: "" }],
          },
          artists: [
            {
              name: "",
            },
          ],
        },
      ],
      artistItems: [
        {
          images: [{ url: "" }],
          name: "",
          uri: "",
        },
      ],
      username: "",
      userID: "",
      profile: [{ url: "" }],
      tbArtistTracks: [
        {
          album: {
            images: [{ url: "" }],
          },
          artists: [
            {
              name: "",
            },
          ],
        },
      ],
      no_data: false,
      playlistName: "",
      playlistDescription: "",
      playlistPrivacy: "",
      playlistItems: {
        id: "",
      },
      topArtistTracks: {

      },
     
    };
    this.getTopSongs = this.getTopSongs.bind(this);
    this.getTopArtists = this.getTopArtists.bind(this);
    this.getUserinfo = this.getUserInfo.bind(this);
    this.getThrowback = this.getThrowback.bind(this);
    this.makeTopArtistPlaylist = this.makeTopArtistPlaylist.bind(this);
  }

  componentDidMount() {
    let _token = hash.access_token;

    if (_token) {
      this.setState({
        token: _token,
      });
      this.getTopSongs(_token);
      this.getTopArtists(_token);
      this.getUserInfo(_token);
      this.getThrowback(_token);
      this.makeTopArtistPlaylist(_token);
    }
  }

  getTopSongs(token) {
    // API call using AJAX and JQUERY to get Top Songs
    $.ajax({
      url: "https://api.spotify.com/v1/me/top/tracks?time_range=short_term",
      type: "GET",
      beforeSend: (xhr) => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: (data) => {
        // console.log(data);
        // console.log(data.items[0].album.images[0].url);
        // console.log(data.items[1].album.images[0].url);
        // Checks if the data is not empty
        if (!data) {
          this.setState({
            no_data: true,
          });
          return;
        }
        this.setState({
          songItems: data.items,
          no_data: false,
        });
      },
    });
  }

   getTopArtists(token) {
    // API call using AJAX and JQUERY to get user TOP Artists
    $.ajax({
      url: "https://api.spotify.com/v1/me/top/artists?time_range=short_term",
      type: "GET",
      beforeSend: (xhr) => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: (data) => {
        // console.log(data);
        // console.log(data.items[0].images[0].url);
        // Checks if the data is not empty
        if (!data) {
          this.setState({
            no_data: true,
          });
          return;
        }
        this.setState({
          artistItems: data.items,
          no_data: false,
        });
      },
    });
  }

  getUserInfo(token) {
    // API call using AJAX and JQUERY to get Top Songs
    $.ajax({
      url: "https://api.spotify.com/v1/me/",
      type: "GET",
      beforeSend: (xhr) => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: (data) => {
        console.log(data);
        console.log(data.id);
        // Checks if the data is not empty
        if (!data) {
          this.setState({
            no_data: true,
          });
          return;
        }
        this.setState({
          username: data.display_name,
          profile: data.images,
          userID: data.id,
          no_data: false,
        });
      },
    });
  }

 getThrowback(token) {
   $.ajax({
      url:
        "https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=50",
      type: "GET",
      beforeSend: (xhr) => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: (data) => {
        console.log(data);
        if (!data) {
          this.setState({
            
            no_data: true,
          });
        }
        this.setState({
          tbArtistTracks: data.items,
          no_data: false,
        });
      },
    });
  }


  async makeTopArtistPlaylist(
    playlistName,
    playlistDescription,
    playlistPrivacy,
    userID,
    token,
    artistItems
  ) {

    // console.log(playlistName);
    console.log(artistItems);


    var trackList1 = await $.ajax({
      url: "https://api.spotify.com/v1/artists/" + this.state.artistItems[0].id + "/top-tracks?country=CA",
      type: "GET",
      beforeSend: (xhr) => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: (data) => {
        console.log(data);

        if (!data) {
          this.setState({
            no_data: true,
          });
          return null;
        }
      },
    });

   var trackList2 = await $.ajax({
      url: "https://api.spotify.com/v1/artists/" + this.state.artistItems[1].id + "/top-tracks?country=CA",
      type: "GET",
      beforeSend: (xhr) => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: (data) => {
        console.log(data);
        if (!data) {
          this.setState({
            no_data: true,
          });
          return null;
        }
      },
    });

    
    var trackList3 = await $.ajax({
      url: "https://api.spotify.com/v1/artists/" + this.state.artistItems[2].id + "/top-tracks?country=CA",
      type: "GET",
      beforeSend: (xhr) => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: (data) => {
        console.log(data);
        if (!data) {
          this.setState({
            no_data: true,
          });
          return null;
        }
      },
    });

     var tracklistID1 = trackList1.tracks.map(element => element.uri); 
     var tracklistID2 = trackList2.tracks.map(element => element.uri);
     var tracklistID3 = trackList3.tracks.map(element => element.uri)
  

    var tracklistData = tracklistID1.concat(tracklistID2, tracklistID3);
    
    console.log(tracklistData);


    var playlistData = {
      name: playlistName,
      description: playlistDescription,
      public: playlistPrivacy,
    };

    // console.log(trackList);

    console.log(playlistData);

     var playlistID = await $.ajax({
      url: "https://api.spotify.com/v1/users/" + userID + "/playlists",
      type: "POST",
      data: JSON.stringify(playlistData),
      dataType: "json",
      beforeSend: (xhr) => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
        xhr.setRequestHeader("content-Type", "application/json");
      },
      success: (data) => {
        console.log(data);
        this.setState({
          playlistItems: data.id,
          no_data: false,
        });
        console.log(data.id)
        return;
      },
      error: function (err) {
        console.log("didn;t worasdff");
        console.log(err);
        return;
      },
    });

    $.ajax({
      url: "https://api.spotify.com/v1/playlists/" + playlistID.id + "/tracks",
      type: "POST",
      data: JSON.stringify(tracklistData),
      dataType: "json",
      beforeSend: (xhr) => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
        xhr.setRequestHeader("content-Type", "application/json");
      },
      success: (data) => {
        console.log(data);
        alert("playlist made! check spotify :)")
       },
        error: function (err) {
          console.log("didn;t worf");
          console.log(err);
          return;
      },
    });
  }

  async makeTopSongsPlaylist(
    playlistName,
    playlistDescription,
    playlistPrivacy,
    userID,
    token,
    songItems
  ) {

    // console.log(playlistName);
    // console.log(token);
    console.log(songItems);
    
    console.log(playlistPrivacy);
  var songTracklist = songItems.map(element => element.uri)

    var playlistData = {
      name: playlistName,
      description: playlistDescription,
      public: playlistPrivacy,
    };

    console.log(playlistPrivacy)
    // console.log(trackList);

    console.log(playlistData);

     var playlistID = await $.ajax({
      url: "https://api.spotify.com/v1/users/" + userID + "/playlists",
      type: "POST",
      data: JSON.stringify(playlistData),
      dataType: "json",
      beforeSend: (xhr) => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
        xhr.setRequestHeader("content-Type", "application/json");
      },
      success: (data) => {
        return;
      },
      error: function (err) {
        console.log("didn't worasdff");
        console.log(err);
        return;
      },
    });

    $.ajax({
      url: "https://api.spotify.com/v1/playlists/" + playlistID.id + "/tracks",
      type: "POST",
      data: JSON.stringify(songTracklist),
      dataType: "json",
      beforeSend: (xhr) => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
        xhr.setRequestHeader("content-Type", "application/json");
      },
      success: (data) => {
        console.log(data);
        alert("playlist made! check spotify :)")
       },
        error: function (err) {
          console.log("didn't work");
          console.log(err);
          return;
      },
    });
  }

  async makeThrowbackPlaylist(
    playlistName,
    playlistDescription,
    playlistPrivacy,
    userID,
    token,
    tbArtistTracks
  ) {

    // console.log(playlistName);
    // console.log(token);
    console.log(tbArtistTracks);

   var throwbackTracklist = tbArtistTracks.map(element => element.uri)

    var playlistData = {
      name: playlistName,
      description: playlistDescription,
      public: playlistPrivacy,
    };

    // console.log(trackList);

    console.log(playlistData);

     var playlistID = await $.ajax({
      url: "https://api.spotify.com/v1/users/" + userID + "/playlists",
      type: "POST",
      data: JSON.stringify(playlistData),
      dataType: "json",
      beforeSend: (xhr) => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
        xhr.setRequestHeader("content-Type", "application/json");
      },
      success: (data) => {
        return;
      },
      error: function (err) {
        console.log("didn't worasdff");
        console.log(err);
        return;
      },
    });

    $.ajax({
      url: "https://api.spotify.com/v1/playlists/" + playlistID.id + "/tracks",
      type: "POST",
      data: JSON.stringify(throwbackTracklist),
      dataType: "json",
      beforeSend: (xhr) => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
        xhr.setRequestHeader("content-Type", "application/json");
      },
      success: (data) => {
        console.log(data);
        alert("playlist made! check spotify :)")
       },
        error: function (err) {
          console.log("didn't work");
          console.log(err);
          return;
      },
    });
  }

  render() {
    if (this.state.songItems !== "" && this.state.artistItems !== "") {
      var mainPage = (
        <MainPage
          songItems={this.state.songItems}
          artistItems={this.state.artistItems}
          username={this.state.username}
          profile={this.state.profile}
          tbArtistItems={this.state.tbArtistItems}
          tbArtistTracks={this.state.tbArtistTracks}
          makeTopArtistPlaylist={this.makeTopArtistPlaylist}
          userID={this.state.userID}
          token={this.state.token}
          makeTopSongsPlaylist={this.makeTopSongsPlaylist}
          makeThrowbackPlaylist={this.makeThrowbackPlaylist}
        />
      );
    } else {
      var mainPage = null;
    }

    return (
      <div className="App">
        {!this.state.token && (
         <LoginPage />
        )}
        {this.state.token && !this.state.no_data && mainPage}
        {this.state.no_data && (
          <p>
            You need to have listened to Spotify long enough for this feature!
          </p>
        )}
      </div>
    );
  }
}

export default App;
