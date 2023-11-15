<?php
$servername = "localhost";
$username = "nero";
$password = "nero1234";
$dbname = "neroweb";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['subscriberEmail'])) {
    $email = filter_var($_POST['subscriberEmail'], FILTER_VALIDATE_EMAIL);

    if (!$email) {
        echo "Invalid email format";
    } else {
        $stmt = $conn->prepare("INSERT INTO subscribers (email) VALUES (?)");
        $stmt->bind_param("s", $email);

        $stmt->execute();

        if ($stmt->errno) {
            echo "Error: " . $stmt->error;
        } else {
            echo "Email submitted successfully!";
        }

        $stmt->close();
    }
}

$conn->close();
?>
