<?php
session_start();

if (isset($_GET['logout'])) {
    session_destroy();
    header('Location: /dashboard/login.php');
    exit;
}

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

$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $pdo = new PDO($dsn, $user, $pass, $options);
        $stmt = $pdo->prepare('SELECT id FROM admin_users WHERE username = ? AND password = ?');
        $stmt->execute([$_POST['username'], $_POST['password']]);
        if ($stmt->rowCount() > 0) {
            $_SESSION['admin_logged_in'] = true;
            header('Location: /dashboard/');
            exit;
        } else {
            $error = 'Invalid username or password';
        }
    } catch (\PDOException $e) {
        $error = 'Database error. Please try again.';
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Login - Milne Bay Province</title>
    <link rel="stylesheet" href="/dashboard/css/style.css">
</head>
<body>
    <div class="sidebar">
        <h2>Admin Panel</h2>
        <a href="/dashboard/">Dashboard</a>
        <a href="/dashboard/students.php">