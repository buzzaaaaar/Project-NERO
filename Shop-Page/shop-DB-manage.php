<?php
include 'shop-DB-connect.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize and validate input
    $product_name = filter_input(INPUT_POST, "Product_Name", FILTER_SANITIZE_STRING);
    $product_price = filter_input(INPUT_POST, "product_Price", FILTER_VALIDATE_FLOAT);
    $discount = filter_input(INPUT_POST, "Discount", FILTER_VALIDATE_FLOAT);
    $free_shipping = ($_POST["free_shipping"] == 1) ? true : false;
    $selectedBrand = filter_input(INPUT_POST, "brand", FILTER_SANITIZE_STRING);

   

    // Calculate discount percentage and discounted price if discount is present
    $discount_percentage = ($discount !== false) ? ($discount / $product_price) * 100 : 0;
    // $discount_percentage = filter_input(INPUT_POST, "Discount_Percentage", FILTER_VALIDATE_FLOAT);


    // File upload handling
    $target_dir = "shop-DB-image-store/";
    $target_file = $target_dir . basename($_FILES["product_image"]["name"]);
    
    if (move_uploaded_file($_FILES["product_image"]["tmp_name"], $target_file)) {
        // Image uploaded successfully, now insert data into the database
        $sql = "INSERT INTO product_table (Product_Name, Product_Price, Discount, Discount_Percentage, Free_Shipping, Product_Brand, Product_Image) 
                VALUES (?, ?, ?, ?, ?, ?, ?)";
        
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sdddsss", $product_name, $product_price, $discount, $discount_percentage, $free_shipping, $selectedBrand, $target_file);

        if ($stmt->execute()) {
            echo json_encode(["message" => "Product added successfully"]);
        } else {
            echo json_encode(["error" => "Error adding product: " . $stmt->error]);
        }

        $stmt->close();
    } else {
        echo json_encode(["error" => "Error uploading image"]);
    }
} else {
    // If it's not a POST request, fetch data from the database and output as JSON
    $query = "SELECT * FROM product_table";
    $result = $conn->query($query);
    
    if (!$result) {
        die(json_encode(["error" => "Query failed: " . $conn->error]));
    }
    
    $data = array();
    
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
    
    echo json_encode($data);
}

$conn->close();
?>








