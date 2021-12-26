// const socket = socketInit();

// export function socketInit() {
//     if (typeof WebSocket === "undefined") {
//       console.log("您的浏览器不支持socket~");
//       return null;
//     } else {
//       // 开始连接websocket
//       data.Socket = new WebSocket(
//         import.meta.env.VITE_APP_WS + "?token=" + store.state.token
//       );
//       Socket.opopen = socketStart;
//       Socket.operror = socketOnError;
//       Socket.onmessage = socketOnMsg;
//       Socket.onclose = socketClose;
//       return Socket;
//     }
//   }

//  function socketStart() {
//     data.Socket.send("HeartBeat");
//     data.isMaskSocket = false;
//     console.log("Socket opopen");
//   }
//  function socketOnError() {
//     console.log("Socket error");
//   }
// function socketOnMsg(e) {
//     // let data = JSON.parse(e.data);
//     console.log("Socket data", e);
//   }
// function socketClose() {
//     // 意外关闭重新连接
//     if (data.socketInitNum < 3) {
//       setTimeout(() => {
//         socketInit();
//         data.socketInitNum++;
//       }, 1000);
//     } else {
//       data.isMaskSocket = true;
//     }
//   }