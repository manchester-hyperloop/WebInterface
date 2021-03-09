<?php

// Start session, prevent direct access to page
session_start();

if (!isset($_SESSION['id']))
	header("Location: /manchester-hyperloop/index.php");
?>

<!DOCTYPE html>
<html>
<body>

<h1>Manchester Hyperloop</h1>
<h2>Welcome, <?= $_SESSION['username'] ?>!</h2>

<form action="/manchester-hyperloop/pages/rosbridge-subscriber.php">
  <input type="submit" value="Rosbridge Subscriber">
</form> 
<br>

<form action="/manchester-hyperloop/pages/rosbridge-turtlesim-control.php">
  <input type="submit" value="Rosbridge Turtlesim Controller">
</form> 

</body>
</html>
