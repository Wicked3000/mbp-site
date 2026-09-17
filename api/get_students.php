<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$conn = new mysqli("hayabusa.proxy.rlwy.net", "root", "ydxqzsUvGTMEbFhBqmSJrcuPAXcKsJqS", "railway", 39501);

if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

$school = isset($_GET['school']) ? $_GET['school'] : '';
$grade = isset($_GET['grade']) ? intval($_GET['grade']) : 0;

$stmt = $conn->prepare("SELECT * FROM students WHERE destination_school = ? AND grade = ?");
$stmt->bind_param("si", $school, $grade);
$stmt->execute();
$result = $stmt->get_result();

$students = [];
while($row = $result->fetch_assoc()) {
    $students[] = [
        "name" => $row['candidate_name'],
        "prev" => $row['primary_school'],
        "status" => $row['status'],
        "gender" => $row['gender']
    ];
}

echo json_encode($students);
$stmt->close();
$conn->close();
?>
