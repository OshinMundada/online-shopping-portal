<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
   "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">

<head>
<meta http-equiv="content-type" 
		content="text/html;charset=utf-8" />
<title>Login - MakeUp Sales</title>
<script type="text/javascript" src="http://jadran.sdsu.edu/jquery/jquery.js"></script>
<link rel="stylesheet" type="text/css" href="/jadrn030/css/index.css">
</head>

<body>
	
	<div id="heading">
		BeautyBae
	</div>
	<form method="POST" action="/jadrn030/servlet/Login">
		<div class="login">
	 		<input id="uname" type="text" placeholder="username" name="uname" autofocus required><br>
	  		<input id="pwd" type="password" placeholder="password" name="pwd" required><br>
	  		<input id="subbut" type="submit" value="Login">
		</div> 
		<h3 id="loginmsg"> Successfully logged out.</h3>	
	</form>
	
</body>
</html>
