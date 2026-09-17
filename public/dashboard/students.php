<?php
$host = 'localhost';
$db   = 'mbp_site';
$user = 'root';
$pass = '';
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
    $stmt = $pdo->query('SELECT * FROM students ORDER BY id DESC');
    $students = $stmt->fetchAll();
} catch (\PDOException $e) {
    $error = 'Error loading students: ' . $e->getMessage();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Students - Admin Dashboard</title>
    <link rel="stylesheet" href="/dashboard/css/style.css">
</head>
<body>
    <div class="sidebar">
        <h2>Admin Panel</h2>
        <a href="/dashboard/" class="active">Dashboard</a>
        <a href="/dashboard/students.php">Students</a>
        <a href="/dashboard/contacts.php">Contacts</a>
        <a href="/dashboard/login.php?logout">Logout</a>
    </div>
    <div class="main-content">
        <h1>Student Management</h1>
        <?php if(isset($error)): ?>
            <div class="error"><?= $error ?></div>
        <?php else: ?>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Primary School</th>
                        <th>Grade</th>
                        <th>Destination School</th>
                        <th>Status</th>
                        <th>Gender</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach($students as $student): ?>
                        <tr>
                            <td><?= $student['id'] ?></td>
                            <td><?= htmlspecialchars($student['candidate_name']) ?></td>
                            <td><?= htmlspecialchars($student['primary_school']) ?></td>
                            <td><?= $student['grade'] ?></td>
                            <td><?= htmlspecialchars($student['destination_school']) ?></td>
                            <td><?= htmlspecialchars($student['status']) ?></td>
                            <td><?= $student['gender'] === 'M' ? 'Male' : 'Female' ?></td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        <?php endif; ?>
        <p><a href="/dashboard/login.php?logout">Logout</a></p>
    </div>
</body>
</html>