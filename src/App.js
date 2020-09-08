import React, { Component } from "react";
import * as $ from "jquery";
import "../src/App.css";
import MainPage from "./components/pages/MainPage";
import LoginPage from "./components/pages/LoginPage";
import ErrorPage from "./components/pages/ErrorPage";

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
      topArtistTracks: {},
      audioFeatures: [
        {
          danceability: "",
          energy: "",
          acousticness: "",
          tempo: "",
        },
      ],
      tbAudioFeatures: [
        {
          danceability: "",
          energy: "",
          acousticness: "",
          tempo: "",
        },
      ],
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

  async getTopSongs(token) {
    // API call to get Top Songs and Audio Features
    var songItems = await $.ajax({
      url: "https://api.spotify.com/v1/me/top/tracks?time_range=short_term",
      type: "GET",
      beforeSend: (xhr) => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: (data) => {
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

    let spotifyIds = songItems.items.map(({ id }) => id);

    $.ajax({
      url: "https://api.spotify.com/v1/audio-features/?ids=" + spotifyIds,
      type: "GET",
      beforeSend: (xhr) => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: (data) => {
        if (!data) {
          this.setState({
            no_data: true,
          });
          return;
        }
        this.setState({
          audioFeatures: data.audio_features,
          no_data: false,
        });
      },
    });
  }

  getTopArtists(token) {
    // API call to get current top artists
    $.ajax({
      url: "https://api.spotify.com/v1/me/top/artists?time_range=short_term",
      type: "GET",
      beforeSend: (xhr) => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: (data) => {
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
    // API call to get user profile picture and username.
    $.ajax({
      url: "https://api.spotify.com/v1/me/",
      type: "GET",
      beforeSend: (xhr) => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: (data) => {
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

  async getThrowback(token) {
    // API call to get all-time top songs
    var tbArtistTracks = await $.ajax({
      url:
        "https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=50",
      type: "GET",
      beforeSend: (xhr) => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: (data) => {
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

    let spotifyTbIds = tbArtistTracks.items.map(({ id }) => id);

    // API call to get audio features of all-time top songs
    $.ajax({
      url: "https://api.spotify.com/v1/audio-features/?ids=" + spotifyTbIds,
      type: "GET",
      beforeSend: (xhr) => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: (data) => {
        if (!data) {
          this.setState({
            no_data: true,
          });
          return;
        }
        this.setState({
          tbAudioFeatures: data.audio_features,
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
    // API call to make Top Artist Playlist

    // get #1 top artist top tracks
    var trackList1 = await $.ajax({
      url:
        "https://api.spotify.com/v1/artists/" +
        this.state.artistItems[0].id +
        "/top-tracks?country=CA",
      type: "GET",
      beforeSend: (xhr) => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: (data) => {
        if (!data) {
          this.setState({
            no_data: true,
          });
          return null;
        }
      },
    });

    // get #2 top artist top tracks
    var trackList2 = await $.ajax({
      url:
        "https://api.spotify.com/v1/artists/" +
        this.state.artistItems[1].id +
        "/top-tracks?country=CA",
      type: "GET",
      beforeSend: (xhr) => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: (data) => {
        if (!data) {
          this.setState({
            no_data: true,
          });
          return null;
        }
      },
    });

    // get #3 top artist top tracks
    var trackList3 = await $.ajax({
      url:
        "https://api.spotify.com/v1/artists/" +
        this.state.artistItems[2].id +
        "/top-tracks?country=CA",
      type: "GET",
      beforeSend: (xhr) => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: (data) => {
        if (!data) {
          this.setState({
            no_data: true,
          });
          return null;
        }
      },
    });

    // get Artist URI from each api call
    var tracklistID1 = trackList1.tracks.map((element) => element.uri);
    var tracklistID2 = trackList2.tracks.map((element) => element.uri);
    var tracklistID3 = trackList3.tracks.map((element) => element.uri);

    // compiled tracklist from all 3 top artists
    var tracklistData = tracklistID1.concat(tracklistID2, tracklistID3);

    // data to send as POST call
    var playlistData = {
      name: playlistName,
      description: playlistDescription,
      public: playlistPrivacy,
    };

    // create playlist for user
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
        this.setState({
          playlistItems: data.id,
          no_data: false,
        });
        return;
      },
      error: function (err) {
        console.log("didn;t worasdff");
        console.log(err);
        return;
      },
    });

    // add tracks to created playlist
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
        alert("playlist made! check spotify :)");
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
    // API call to make Top Songs Playlist

    //get URI
    var songTracklist = songItems.map((element) => element.uri);

    // data to send as POST call
    var playlistData = {
      name: playlistName,
      description: playlistDescription,
      public: playlistPrivacy,
    };

    // create playlist for user
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

    // add tracks to created playlist
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
        alert("playlist made! check spotify :)");
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
    // API call to make Throwback Songs Playlist

    //get URI
    var throwbackTracklist = tbArtistTracks.map((element) => element.uri);

    // data to send as POST call
    var playlistData = {
      name: playlistName,
      description: playlistDescription,
      public: playlistPrivacy,
    };

    // create playlist for user
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

    // add tracks to created playlist
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
        alert("playlist made! check spotify :)");
      },
      error: function (err) {
        console.log("didn't work");
        console.log(err);
        return;
      },
    });
  }

  render() {
    //null check
    if (
      this.state.songItems[0] &&
      this.state.artistItems[0] &&
      this.state.audioFeatures[0] &&
      this.state.tbAudioFeatures[0] &&
      this.state.tbArtistTracks[0]
    ) {
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
          audioFeatures={this.state.audioFeatures}
          tbAudioFeatures={this.state.tbAudioFeatures}
        />
      );
    } else {
      var mainPage = <ErrorPage />;
    }

    return (
      <div className="App">
        {!this.state.token && <LoginPage />}
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
