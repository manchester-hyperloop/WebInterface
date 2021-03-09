<?php

// ****************** Connect to the database ****************** //
include('config.inc.php');
$connection = new mysqli($servername, $username, $password, $database_name);

// Check connection
if ($connection->connect_error) {
	die("Connection to database failed: " . $connection->connect_error);
}

// Define the variables and set to empty values
$username = $password = "";
$error = "";

// Post action
if ($_SERVER["REQUEST_METHOD"] == "POST") {

	// ****************** The login section ****************** //

	// Save validity of login inputs
	$valid = true;

	// Check login username
	if (empty($_POST["username"]) || empty($_POST["password"])) {
		$valid = false;
		$error = "Username or password is missing!";
	  
	} else {
		$username = test_input($_POST["username"]);
		$password = test_input($_POST["password"]);

		// Username: Minimum 3 and maximum 16 characters, can use upper or lower case alphanumeric characters, underscore, dash
		// Password: Minimum 8 and maximum 16 characters, at least one uppercase letter, one lowercase letter, one number
		/*
		if (!preg_match('/^(?![_ -])(?:(?![_ -]{2})[\w -]){3,16}(?<![_ -])$/i', $username)
		  || !preg_match('/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,16}$/i', $password)) {
		$valid = false;
		$error = "Username or password is invalid!";
		}
		*/
	}

	// ****************** Log in if all inputs are valid ****************** //
	if ($valid) {

		// Escape username
		$username = $connection->real_escape_string($username);

		// Warning if username is incorrect
		$query = $connection->prepare("SELECT * FROM users WHERE username = ? LIMIT 1;");
		$query->bind_param("s", $username);
		$query->execute();
		$response = $query->get_result();
		$row = mysqli_fetch_array($response);

		if (mysqli_num_rows($response) == 0) {
			$error = "Username is incorrect!";
		}

		// If username is correct
		else {

			// Escape password
			$password = $connection->real_escape_string($password);

			// If password is correct
			if (password_verify($password, $row['password'])) {
			
				// Start a session, set session variables
				session_start();

				$_SESSION["id"] = $row['id'];                  // User ID
				$_SESSION["username"] = $row['username'];      // Username
				$_SESSION["password"] = $row['password'];      // Password
				
				// Redirect
				header("Location: pages/welcome.php");
			}

			// If password is incorrect
			else {
				$error = "Password is incorrect!";
			}

		}

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


