<?php

$servername = "15.235.146.132";
$username = "nero";
$password = "bD4z92R9";
$dbname = "neroweb";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get data from the POST request
$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['description'])) {
    $description = $data['description'];

    // Get the total quantity from the temporary_cart table
    $totalQtyQuery = "SELECT total_qty FROM temporary_cart WHERE description = '$description'";
    $totalQtyResult = $conn->query($totalQtyQuery);

    if ($totalQtyResult) {
        $response = array('success' => true, 'totalQty' => $totalQtyResult->num_rows > 0 ? $totalQtyResult->fetch_assoc()['total_qty'] : 0);
    } else {
        $response = array('success' => false, 'message' => 'Error retrieving total quantity: ' . $conn->error);
    }
} else {
    $response = array('success' => false, 'message' => 'Invalid data received');
}

// Close the database connection
$conn->close();

// Send the JSON response
header('Content-Type: application/json');
echo json_encode($response);

?>
