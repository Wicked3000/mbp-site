<?php
session_start();
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header('Location: login.php');
    exit();
}

// Database connection
$conn = new mysqli("mysql.railway.internal", "root", "ydxqzsUvGTMEbFhBqmSJrcuPAXcKsJqS", "railway");
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Handle form submissions
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action'])) {
    if ($_POST['action'] === 'add') {
        $name = $_POST['candidate_name'];
        $primary = $_POST['primary_school'];
        $grade = intval($_POST['grade']);
        $dest = $_POST['destination_school'];
        $status = $_POST['status'];
        $gender = $_POST['gender'];
        
        $stmt = $conn->prepare("INSERT INTO students (candidate_name, primary_school, grade, destination_school, status, gender) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("sssiss", $name, $primary, $grade, $dest, $status, $gender);
        if ($stmt->execute()) {
            echo "<p style='color: green;'>Student added successfully.</p>";
        } else {
            echo "<p style='color: red;'>Error adding student.</p>";
        }
        $stmt->close();
    }
    // Handle edit
    if ($_POST['action'] === 'edit' && isset($_POST['student_id'])) {
        $id = intval($_POST['student_id']);
        $name = $_POST['candidate_name'];
        $primary = $_POST['primary_school'];
        $grade = intval($_POST['grade']);
        $dest = $_POST['destination_school'];
        $status = $_POST['status'];
        $gender = $_POST['gender'];
        
        $stmt = $conn->prepare("UPDATE students SET candidate_name=?, primary_school=?, grade=?, destination_school=?, status=?, gender=? WHERE id=?");
        $stmt->bind_param("sssiiss", $name, $primary, $grade, $dest, $status, $gender, $id);
        if ($stmt->execute()) {
            echo "<p style='color: green;'>Student updated successfully.</p>";
        } else {
            echo "<p style='color: red;'>Error updating student.</p>";
        }
        $stmt->close();
    }
}

// Fetch all students
$students = [];
$result = $conn->query("SELECT * FROM students ORDER BY grade, destination_school");
while ($row = $result->fetch_assoc()) {
    $students[] = $row;
}
$conn->close();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MBP Admin - Student Selection Lists</title>
    <link rel="stylesheet" href="../styles.css">
</head>
<body>
    <nav class="admin-nav">
        <div class="nav-left">
            <h2>MBP Admin</h2>
        </div>
        <div class="nav-right">
            <span>Logged in as Admin</span>
            <a href="logout.php">Logout</a>
        </div>
    </nav>

    <div class="admin-container">
        <h2>Student Selection Lists</h2>
        
        <div class="add-student-form">
            <h3>Add New Student</h3>
            <form method="POST" action="">
                <input type="hidden" name="action" value="add">
                <div class="form-grid">
                    <div class="form-group">
                        <label>Candidate Name</label>
                        <input type="text" name="candidate_name" required>
                    </div>
                    <div class="form-group">
                        <label>Primary School</label>
                        <input type="text" name="primary_school" required>
                    </div>
                    <div class="form-group">
                        <label>Grade</label>
                        <select name="grade" required>
                            <option value="">Select grade</option>
                            <option value="9">Grade 9</option>
                            <option value="11">Grade 11</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Destination School</label>
                        <input type="text" name="destination_school" required>
                    </div>
                    <div class="form-group">
                        <label>Status</label>
                        <select name="status" required>
                            <option value="">Select status</option>
                            <option value="Selected">Selected</option>
                            <option value="Waitlist">Waitlist</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Gender</label>
                        <select name="gender" required>
                            <option value="">Select gender</option>
                            <option value="M">Male</option>
                            <option value="F">Female</option>
                        </select>
                    </div>
                </div>
                <button type="submit" class="btn-primary">Add Student</button>
            </form>
        </div>

        <div class="student-table">
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Primary School</th>
                        <th>Grade</th>
                        <th>Destination School</th>
                        <th>Status</th>
                        <th>Gender</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($students as $student): ?>
                        <tr>
                            <td><?= htmlspecialchars($student['candidate_name']) ?></td>
                            <td><?= htmlspecialchars($student['primary_school']) ?></td>
                            <td><?= htmlspecialchars($student['grade']) ?></td>
                            <td><?= htmlspecialchars($student['destination_school']) ?></td>
                            <td><?= htmlspecialchars($student['status']) ?></td>
                            <td><?= htmlspecialchars($student['gender']) ?></td>
                            <td>
                                <form method="POST" action="" style="display:inline;">
                                    <input type="hidden" name="action" value="edit">
                                    <input type="hidden" name="student_id" value="<?= $student['id'] ?>">
                                    <button type="submit" style="color: #3498db; border: none; background: transparent; padding: 0; cursor: pointer;">Edit</button>
                                </form>
                                <a href="?delete=<?= $student['id'] ?>" style="color: #e74c3c; text-decoration: underline; cursor: pointer;">Delete</a>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
    </div>
</body>
</html>