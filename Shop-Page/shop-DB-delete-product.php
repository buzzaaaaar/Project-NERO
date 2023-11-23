<?php
include 'shop-DB-connect.php';

// Retrieve the product ID from the POST request
$data = json_decode(file_get_contents("php://input"));
$productId = $data->productId;

// Use the product ID to find the corresponding record in the database
$sql = "SELECT * FROM product_table WHERE Product_ID = '$productId'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Delete the record
    $deleteSql = "DELETE FROM product_table WHERE Product_ID = '$productId'";
    if ($conn->query($deleteSql) === TRUE) {
        $response = array("success" => true, "message" => "Product deleted successfully");
        echo json_encode($response);
    } else {
        $response = array("success" => false, "message" => "Error deleting product: " . $conn->error);
        echo json_encode($response);
    }
} else {
    $response = array("success" => false, "message" => "Product not found");
    echo json_encode($response);
}

$conn->close();
?>
