<?php
  $server = "localhost";
  $user = "root";
  $pw = "";
  $db = "nsbm"; // Use the correct database details of our database 

  $conn = new mysqli($server, $user, $pw, $db);

  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }

  $productCode = $_POST['productCode'];

  //query for delete the complete "row" from temporary_cart table
  $sql = "DELETE FROM temporary_cart WHERE product_code = '$productCode'";

  if ($conn->query($sql) === TRUE) {
    echo "Item removed successfully";
  } else {
    echo "Error removing item: " . $conn->error;
  }

  $conn->close();
 ?> 

