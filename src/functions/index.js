const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const { getLiveChatId, fetchChatMessages } = require("./youtube");

// Run when client connects
io.on("connection", socket => {
  socket.on("subscribe", async ({ videoUrl, keywords }) => {
    // const user = userJoin(socket.id, username, room);
    const id = await getLiveChatId(videoUrl);
    if (id) {
      console.log("User subscribed to: ", id, keywords);
      await fetchChatMessages(null, id, items => socket.emit("comment", [...items]), keywords);
      socket.join(socket.id);
    }

    // Welcome current user
    // socket.emit("comment", "Welcome to Youtube Live Stream!");
  });

  // Runs when client disconnects
  socket.on("disconnect", () => {
    console.log("Exiting server");
  });
});

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
