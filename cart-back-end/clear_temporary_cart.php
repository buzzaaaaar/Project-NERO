<?php

$server = "localhost";
$user = "root";
$pw = "";
$db = "nsbm"; 

$conn = new mysqli($server, $user, $pw, $db);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}


$sqlClearCart = "TRUNCATE TABLE temporary_cart";
$conn->query($sqlClearCart);


$conn->close();

echo "Temporary cart cleared!";
