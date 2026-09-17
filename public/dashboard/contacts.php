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
    $stmt = $pdo->query('SELECT * FROM contacts ORDER BY created_at DESC');
    $contacts = $stmt->fetchAll();
} catch (\PDOException $e) {
    $error = 'Error loading contacts: ' . $e->getMessage();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contacts - Admin Dashboard</title>
    <link rel="stylesheet" href="/dashboard/css/style.css">
</head>
<body>
    <div class="sidebar">
        <h2>Admin Panel</h2>
        <a href="/dashboard/" >Dashboard</a>
        <a href="/dashboard/students.php">Students</a>
        <a href="/dashboard/contacts.php">Contacts</a>
        <a href="/dashboard/login.php?logout">Logout</a>
    </div>
    <div class="main-content">
        <h1>Contact Messages</h1>
        <?php if(isset($error)): ?>
            <div class="error"><?= $error ?></div>
        <?php else: ?>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Message</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach($contacts as $contact): ?>
                        <tr>
                            <td><?= $contact['id'] ?></td>
                            <td><?= htmlspecialchars($contact['name']) ?></td>
                            <td><?= htmlspecialchars($contact['email']) ?></td>
                            <td><?= substr(htmlspecialchars($contact['message']), 0, 100) . (strlen($contact['message']) > 100 ? '...' : '') ?></td>
                            <td><?= $contact['created_at'] ?></td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        <?php endif; ?>
        <p><a href="/dashboard/login.php?logout">Logout</a></p>
    </div>
</body>
</html>