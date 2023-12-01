<?php
$servername = "167.99.67.188"; 
$username = "nero"; 
$password = "bD4z92R9"; 
$database = "neroweb"; 

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    $connection_status = "Connection failed: " . $conn->connect_error;
    
} else {
    $connection_status = "Connected successfully/DB manager/";
    
}





// Close the connection when done
// $conn->close();

// http://167.99.67.188/phpmyadmin
// user - nero
// password - bD4z92R9

?>

