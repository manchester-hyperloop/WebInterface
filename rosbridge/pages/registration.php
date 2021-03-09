<?php include('../php/registration.php'); ?>

<!DOCTYPE html>
<html>
<body>

<h1>Manchester Hyperloop</h1>
<h2>Register</h2>

<form action="<?= $_SERVER['PHP_SELF']; ?>" method="post">

  <label for="username">Username:</label><br>
  <input type="text" id="username" name="username" value="<?= $username ?>"><br>
  <div class="username-error"><?= $username_error ?></div><br>
  
  <label for="password">Password:</label><br>
  <input type="password" id="password" name="password" value="<?= $password ?>"><br>
  <div class="password-error"><?= $password_error ?></div><br>
  
  <label for="confirm-password">Confirm password:</label><br>
  <input type="password" id="confirm-password" name="confirm-password" value="<?= $confirm_password ?>"><br>
  <div class="confirm-password-error"><?= $confirm_password_error ?></div><br>
  
  <input id="register-button" type="submit" value="Register">
</form>
<br>

<form action="/manchester-hyperloop/index.php">
  <input type="submit" value="Login">
</form> 

</body>
</html>
