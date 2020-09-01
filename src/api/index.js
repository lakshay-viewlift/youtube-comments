const axios = require('axios');
const API_KEY = "AIzaSyAj2f_o5CTbS6Ql8VwuxcUp4p-OToT8taA";

export const getLiveChatId = url => {
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

export const fetchChatMessages = async (nextPageToken, liveChatId, callback) => {
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
    data && data.items && callback(data.items); 

    // console.log(data);
    if (!pollingIntervalMillis) return [];
    setTimeout(async () => await fetchChatMessages(nextPageToken, liveChatId, callback), pollingIntervalMillis);
  }).catch(err => {
    console.log("Lakshay Dutt: ", err);
  });
};
