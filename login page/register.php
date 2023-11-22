<?php include('server.php') ?>
<!DOCTYPE html>
<html>
<head>
	<title>Registration</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
	<link rel="stylesheet" type="text/css"href="style.css">
</head>

<body>
	<div class="header"><img src="nero-logo-1.png" alt="Register" style="max-width:13.5%; float: right;"><h2>Register</h2></div>

  </div>
	
	<form method="post" action="register.php">

		<?php include('errors.php'); ?>

		<div class="input-group">
			<input type="text" name="username" placeholder="Enter Username"
				value="<?php echo $username; ?>">
		</div>
		<div class="input-group">
			
			<input type="email" name="email" placeholder="Email"
				value="<?php echo $email; ?>">
		</div>
		<div class="input-group">
			
			<input type="password" name="password_1" placeholder="Password"> 
		</div>
		<div class="input-group">
			
			<input type="password" name="password_2" placeholder="Confirm password">
		</div>
		<div class="input-group">
			<button type="submit" class="btn"name="reg_user">Register</button>
		</div>
		


<p>
			Already having an account?
			<a href="login.php">
				Login Here!
			</a>
</p>



	</form>
</body>
</html>
