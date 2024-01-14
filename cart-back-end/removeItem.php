<?php
$servername = "15.235.146.132";
$username = "nero";
$password = "bD4z92R9";
$dbname = "neroweb";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['description'])) {
    $description = $data['description'];

    // Remove the item from the temporary_cart table
    $removeQuery = "DELETE FROM temporary_cart WHERE description = '$description'";
    
    if ($conn->query($removeQuery) === TRUE) {
        $response = array('success' => true);
    } else {
        $response = array('success' => false, 'message' => 'Error removing item: ' . $conn->error);
    }
} else {
    $response = array('success' => false, 'message' => 'Invalid data received');
}

$conn->close();

header('Content-Type: application/json');
echo json_encode($response);
?>
