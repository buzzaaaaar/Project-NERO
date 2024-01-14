<?php
$servername = "167.99.67.188";
$username = "nero";
$password = "bD4z92R9";
$dbname = "neroweb";


$conn = new mysqli($servername, $username, $password, $dbname);


if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


$sql = "SELECT product_code, description, unit_price, selected_qty, total_price, image_path FROM temporary_cart ORDER BY total_price DESC";

$result = $conn->query($sql);

$cartData = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $cartData[] = $row;
    }
}

$conn->close();

echo json_encode($cartData);

?>
