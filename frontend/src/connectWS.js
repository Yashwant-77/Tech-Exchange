import { io } from "socket.io-client"

const connectWS = ()=>{
    return io("http://localhost:5000", { transports: ["websocket"] ,
    auth : {
      token : localStorage.getItem("auth-token")
    }
  });
}

export default connectWS