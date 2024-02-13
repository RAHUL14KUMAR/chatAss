require('dotenv').config();
const app = require("express")();
const server = require("http").createServer();

const port=process.env.PORT;
// in the env i set port===4000

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection",async(socket)=>{

    socket.on("userConnected",(payload)=>{
      socket.join("chat");
    })

    socket.on("messageSend",(payload)=>{
        console.log("payload",payload)
        const name=payload.name;
        const message=payload.inp;

        io.to("chat").emit("messageReceived",{name,message})
    })
})

server.listen(port, () => {
    console.log(`server active at http://localhost:${port}`);
});