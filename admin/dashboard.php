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

// Get statistics
$stats = [];
$stats['total_students'] = 0;
$stats['total_schools'] = 0;
$stats['total_contacts'] = 0;

// Count students
$studentResult = $conn->query("SELECT COUNT(*) as count FROM students");
if ($studentResult) {
    $row = $studentResult->fetch_assoc();
    $stats['total_students'] = $row['count'];
    $stats['total_schools'] = $conn->query("SELECT COUNT(DISTINCT destination_school) FROM students")->fetch_assoc()['COUNT(DISTINCT destination_school)'];
}

// Count contacts
$contactResult = $conn->query("SELECT COUNT(*) as count FROM contacts");
if ($contactResult) {
    $row = $contactResult->fetch_assoc();
    $stats['total_contacts'] = $row['count'];
}
$conn->close();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MBP Admin Dashboard</title>
    <link rel="stylesheet" href="../styles.css">
</head>
<body>
    <nav class="admin-nav">
        <div class="nav-left">
            <h2>MBP Admin</h2>
        </div>
        <div class="nav-right">
            <span>Logged in as Admin</span>
            <a href="logout.php" style="color: #e74c3c;">Logout</a>
        </div>
    </nav>

    <div class="admin-container">
        <div class="stats-grid">
            <div class="stat-card">
                <h3>Total Students</h3>
                <div class="stat-number"><?= number_format($stats['total_students']) ?></div>
            </div>
            <div class="stat-card">
                <h3>Active Schools</h3>
                <div class="stat-number"><?= number_format($stats['total_schools']) ?></div>
            </div>
            <div class="stat-card">
                <h3>Contact Messages</h3>
                <div class="stat-number"><?= number_format($stats['total_contacts']) ?></div>
            </div>
        </div>

        <div class="admin-sections">
            <h3>Administration Panel</h3>
            <div class="sections-grid">
                <a href="contacts.php" class="section-link">
                    <div class="section-item">
                        <h4>Contact Messages</h4>
                        <p>View and manage incoming contact form submissions</p>
                    </div>
                </a>
                <a href="students.php" class="section-link">
                    <div class="section-item">
                        <h4>Student Selection Lists</h4>
                        <p>Manage Grade 9 & Grade 11 selection data</p>
                    </div>
                </a>
                <a href="settings.php" class="section-link">
                    <div class="section-item">
                        <h4>Site Settings</h4>
                        <p>Update statistics and configuration</p>
                    </div>
                </a>
            </div>
        </div>
    </div>
</body>
</html>