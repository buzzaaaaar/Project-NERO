<?php include('server.php') ?>
<!DOCTYPE html>
<html>
<head>
	<title>Login and Registration</title>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="style.css">
 
</div>
</head>
<body>
	<div class="header"><img src="nero-logo-1.png" alt="Register" style="max-width:13.5%; float: right;"><h2>Login Here!</h2></div>
    
 
 <form method="post" action="login.php">
 

		<?php include('errors.php'); ?>

		<div class="input-group">
			<input type="text" name="username" placeholder="Username" >
		</div>
		<div class="input-group">
			<input type="password" name="password" placeholder="Password">
		</div>
		<div class="input-group">
			<button type="submit" class="btn"name="login_user">Login</button>
		</div>
		


<p>
			New Here? 
			<a href="register.php">
				Click here to register!
			</a>
		
</p>

	</form>
</body>

</html>
