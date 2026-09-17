<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$conn = new mysqli("hayabusa.proxy.rlwy.net", "root", "ydxqzsUvGTMEbFhBqmSJrcuPAXcKsJqS", "railway", 39501);

if ($conn->connect_error) {
    http_response_code(500);
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

$data = json_decode(file_get_contents("php://input"));

if(isset($data->name) && isset($data->email) && isset($data->message)) {
    $stmt = $conn->prepare("INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $data->name, $data->email, $data->message);
    
    if($stmt->execute()) {
        http_response_code(200);
        echo json_encode(["message" => "Message sent successfully."]);
    } else {
        http_response_code(500);
        echo json_encode(["message" => "Unable to send message."]);
    }
    $stmt->close();
} else {
    http_response_code(400);
    echo json_encode(["message" => "Incomplete data. Please provide name, email, and message."]);
}

$conn->close();
?>
