<?php
session_start();

// Admin credentials (in production, use environment variables or a proper auth system)
$adminUsername = 'admin';
$adminPassword = 'mbp-admin-2026';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';
    
    if ($username === $adminUsername && $password === $adminPassword) {
        $_SESSION['admin_logged_in'] = true;
        header('Location: dashboard.php');
        exit();
    } else {
        $error = 'Invalid credentials';
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MBP Admin - Login</title>
    <link rel="stylesheet" href="../styles.css">
</head>
<body>
    <div class="admin-login-container">
        <h2>MBP Administration</h2>
        <?php if(isset($error)): ?>
            <p style="color: red; margin-bottom: 1rem;"><?= htmlspecialchars($error) ?></p>
        <?php endif; ?>
        <form method="POST" action="">
            <div class="form-group">
                <label>Username</label>
                <input type="text" name="username" required>
            </div>
            <div class="form-group">
                <label>Password</label>
                <input type="password" name="password" required>
            </div>
            <button type="submit" class="btn-primary">Login</button>
        </form>
    </div>
</body>
</html>