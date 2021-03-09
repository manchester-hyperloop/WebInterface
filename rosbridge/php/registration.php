<?php

// ****************** Connect to the database ****************** //
include('config.inc.php');
$connection = new mysqli($servername, $username, $password, $database_name);

// Check connection
if ($connection->connect_error) {
	die("Connection to database failed: " . $connection->connect_error);
}

// Define the variables and set to empty values
$username = $password = $confirm_password = "";
$username_error = $password_error = $confirm_password_error = "";

// Post action
if ($_SERVER["REQUEST_METHOD"] == "POST") {

	// ****************** The register section ****************** //

	// Save validity of login inputs
	$valid = true;

	// Check registering username
	if (empty($_POST["username"])) {
		$valid = false;
		$username_error = "Username is missing!";
	}
	
	else if (empty($_POST["password"])) {
		$valid = false;
		$password_error = "Password is missing!";
	}
	
	else if (empty($_POST["confirm-password"])) {
		$valid = false;
		$confirm_password_error = "Please confirm your password!";
	  
	} else {
		$username = test_input($_POST["username"]);
		$password = test_input($_POST["password"]);
		$confirm_password = test_input($_POST["confirm-password"]);

		// Username: Minimum 3 and maximum 16 characters, can use upper or lower case alphanumeric characters, underscore, dash
		// Password: Minimum 8 and maximum 16 characters, at least one uppercase letter, one lowercase letter, one number
		/*
		if (!preg_match('/^(?![_ -])(?:(?![_ -]{2})[\w -]){3,16}(?<![_ -])$/i', $username)
		  || !preg_match('/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,16}$/i', $password)) {
		$valid = false;
		$error = "Username or password is invalid!";
		}
		*/
		
		// Check if password and confirmation match
		if ($password != $confirm_password) {
			$valid = false;
			$confirm_password_error = "Passwords do not match";
		}

	}

	// ****************** Log in if all inputs are valid ****************** //
	if ($valid) {

		// Escape inputs and hash password
		$username = $connection->real_escape_string($username);
		$password = $connection->real_escape_string($password);
		$password = password_hash($password, PASSWORD_BCRYPT);

		// Prepare and execute insertion
		$query = $connection->prepare("INSERT INTO users (username, password)
				                       VALUES (?, ?);");
		$query->bind_param("ss", $username, $password);
		$query->execute();
		
		header("Location: /manchester-hyperloop/index.php");
	}
}

// Test input function
function test_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);

  return $data;
}

?>


