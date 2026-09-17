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

// Handle delete
if ($_GET['action'] === 'delete' && isset($_GET['id'])) {
    $id = intval($_GET['id']);
    $conn->prepare("DELETE FROM contacts WHERE id = ?")->bind_param("i", $id)->execute();
    echo "<p style='color: green;'>Message deleted successfully.</p>";
}

// Fetch all contacts
$contacts = [];
$result = $conn->query("SELECT * FROM contacts ORDER BY created_at DESC");
while ($row = $result->fetch_assoc()) {
    $contacts[] = $row;
}
$conn->close();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MBP Admin - Contact Messages</title>
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
        <h2>Contact Messages</h2>
        <p>Total messages: <?= count($contacts) ?></p>

        <?php if (count($contacts) === 0): ?>
            <p>No contact messages yet.</p>
        <?php else: ?>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Message</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($contacts as $contact): ?>
                        <tr>
                            <td><?= htmlspecialchars($contact['name']) ?></td>
                            <td><?= htmlspecialchars($contact['email']) ?></td>
                            <td><?= substr(htmlspecialchars($contact['message']), 0, 100) . (strlen($contact['message']) > 100 ? '...' : '') ?></td>
                            <td><?= htmlspecialchars($contact['created_at']) ?></td>
                            <td>
                                <form action="?action=delete&id=<?= $contact['id'] ?>" method="GET" 
                                      onreturn="return confirm('Are you sure you want to delete this message?');"
                                      style="display:inline;">
                                    <button type="submit" style="color: #e74c3c; border: none; background: transparent; padding: 0; cursor: pointer;">Delete</button>
                                </form>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        <?php endif; ?>

        <a href="dashboard.php" style="margin-top: 2rem; display: inline-block;">← Back to Dashboard</a>
    </div>
</body>
</html>