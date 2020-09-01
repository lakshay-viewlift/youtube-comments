// const URL = require('url');
const axios = require("axios");
const express = require("express");
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);


app.get('/', async (req, res) => {
    const streamUrl = req.query.streamUrl;
    if (streamUrl){
        const id = await getLiveChatId(streamUrl);
        await fetchChatMessages(null, id);
    }
});

io.on('connection', (socket) => {
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
// app.listen(8000, () => {
//   main();
// });

// const main = () => {};

const API_KEY = "AIzaSyAj2f_o5CTbS6Ql8VwuxcUp4p-OToT8taA";
const liveChatId = `Cg0KC1hNcWVOdEY5c2pNKicKGFVDN1E3cGwwejBNcmRheXZtQW5jaGxKURILWE1xZU50Rjlzak0`;

const getLiveChatId = url => {
  const parsedUrl = new URL(url);
  const videoId = parsedUrl.searchParams.get("v");
  if (!videoId) return null;
  const LIVE_STREAM_URL = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${API_KEY}&part=liveStreamingDetails`;
  return axios
    .get(LIVE_STREAM_URL)
    .then(({ data }) => {
      const temp = data.items[0].liveStreamingDetails.activeLiveChatId;
      return temp;
    })
    .catch(error => {
        console.log("Lakshay: ", error);
    });
};

const fetchChatMessages = async (nextPageToken, liveChatId) => {
  const URL_Y = `https://www.googleapis.com/youtube/v3/liveChat/messages`;
  const params = {
    liveChatId: liveChatId,
    part: `snippet,authorDetails`,
    key: API_KEY,
    maxResults: 200,
    pageToken: nextPageToken,
  };

  return axios.get(URL_Y, { params }).then(async ({data}) => {
    const {nextPageToken = null, pollingIntervalMillis = null} = data;  
    // console.log(data);
    if (!pollingIntervalMillis) return;
    setTimeout(async () => await fetchChatMessages(nextPageToken, liveChatId), pollingIntervalMillis);
  }).catch(err => {
    console.log("Lakshay Dutt: ", err);
  });
};
