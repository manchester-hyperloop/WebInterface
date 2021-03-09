<?php include('php/login.php'); ?>

<!DOCTYPE html>
<html>
<body>

<h1>Manchester Hyperloop</h1>
<h2>Login</h2>

<form action="<?= $_SERVER['PHP_SELF']; ?>" method="post">

  <label for="username">Username:</label><br>
  <input type="text" id="username" name="username" value="<?= $username ?>"><br>
  
  <label for="password">Password:</label><br>
  <input type="password" id="password" name="password" value="<?= $password ?>"><br>
  
  <div class="error"><?= $error ?></div><br>
  
  <input id="login-button" type="submit" value="Login">
</form>
<br>

<form action="/manchester-hyperloop/pages/registration.php">
  <input type="submit" value="Register">
</form> 

</body>
</html>
