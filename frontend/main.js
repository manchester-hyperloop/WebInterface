// native websocket implementation
// https://socket.io/ might be worth looking at

// Create a websocket connection
const socket = new WebSocket("ws://localhost:9002");
var idEl = document.getElementById("state");

socket.addEventListener("message", function(event)
{
    console.log("message from server", event.data);
    idEl.innerHTML = event.data;   
});


function updateState()
{
    socket.send("get state !");

}
