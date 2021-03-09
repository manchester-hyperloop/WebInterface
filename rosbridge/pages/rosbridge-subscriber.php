<?php

// Start session, prevent direct access to page
session_start();

if (!isset($_SESSION['id']))
	header("Location: /manchester-hyperloop/index.php");
?>

<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<script src="../js/eventemitter2.js"></script>
<script src="../js/roslib.min.js"></script>

<script>

  // Connecting to ROS
  // -----------------
  var ros = new ROSLIB.Ros();

  // If there is an error on the backend, an 'error' emit will be emitted.
  ros.on('error', function(error) {
    document.getElementById('connecting').style.display = 'none';
    document.getElementById('connected').style.display = 'none';
    document.getElementById('closed').style.display = 'none';
    document.getElementById('error').style.display = 'inline';
    console.log(error);
  });

  // Find out exactly when we made a connection.
  ros.on('connection', function() {
    console.log('Connection made!');
    document.getElementById('connecting').style.display = 'none';
    document.getElementById('error').style.display = 'none';
    document.getElementById('closed').style.display = 'none';
    document.getElementById('connected').style.display = 'inline';
  });

  ros.on('close', function() {
    console.log('Connection closed.');
    document.getElementById('connecting').style.display = 'none';
    document.getElementById('connected').style.display = 'none';
    document.getElementById('closed').style.display = 'inline';
  });

  // Create a connection to the rosbridge WebSocket server.
  ros.connect('ws://localhost:9090');

  //----------------------
  //Subscribing to a Topic
  //----------------------
  var listener = new ROSLIB.Topic({
    ros : ros,
    name : 'chatter',
    messageType : 'std_msgs/String'
  });

  // Then we add a callback to be called every time a message is published on this topic.
  listener.subscribe(function(message) {
    
	// Write feedback message to #feedback div
	var fbDiv = document.getElementById('feedback');
	fbDiv.innerHTML = "<p>Received message on " + listener.name
	                  + ": " + message.data + "</p>";

    // Unsubscribe is desired
    // listener.unsubscribe();
  });
  
</script>
</head>

<body>

  <h1>Manchester Hyperloop</h1>
  <h2>ROSBridge Subscriber</h2>
  
  <div id="statusIndicator">
    <p id="connecting">
      Connecting to rosbridge...
    </p>
    <p id="connected" style="color:#00D600; display:none">
      Connected
    </p>
    <p id="error" style="color:#FF0000; display:none">
      Error in the backend!
    </p>
    <p id="closed" style="display:none">
      Connection closed.
    </p>
  </div>

  <div id="feedback"></div>
</body>
</html>
