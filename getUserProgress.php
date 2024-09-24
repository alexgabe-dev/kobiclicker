<?php
header('Content-Type: application/json');

$username = $_GET['username'];
$filePath = 'users.json';

// Load existing data
if (file_exists($filePath)) {
    $fileContents = file_get_contents($filePath);
    $usersData = json_decode($fileContents, true);
    
    // Check if user exists
    if (isset($usersData[$username])) {
        echo json_encode($usersData[$username]);
    } else {
        echo json_encode(['error' => 'User not found.']);
    }
} else {
    echo json_encode(['error' => 'No user data found.']);
}
?>
