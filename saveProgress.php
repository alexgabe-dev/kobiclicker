<?php
header('Content-Type: application/json');

// Get JSON input
$data = json_decode(file_get_contents('php://input'), true);
$username = trim($data['username']); // Trim whitespace
$points = $data['points'] ?? 0; // Default to 0 if not provided
$achievements = $data['achievements'] ?? []; // Default to empty array if not provided
$userCode = $data['code'] ?? ''; // Default to empty string if not provided

// Validate username is not empty
if (empty($username)) {
    echo json_encode(['success' => false, 'error' => 'Username cannot be empty.']);
    exit;
}

// Path to JSON file
$filePath = 'users.json';

// Load existing data
if (file_exists($filePath)) {
    $fileContents = file_get_contents($filePath);
    $usersData = json_decode($fileContents, true);
} else {
    $usersData = [];
}

// Check if user already exists
if (!array_key_exists($username, $usersData)) {
    // If user is new, initialize their achievements array
    $usersData[$username] = [
        'code' => $userCode,
        'points' => $points,
        'achievements' => $achievements, // Directly assign the achievements array
    ];
} else {
    // If user exists, update their progress
    $usersData[$username]['points'] = $points; // Update points

    // Merge and ensure unique achievements
    $currentAchievements = $usersData[$username]['achievements'];
    $newAchievements = array_values(array_unique(array_merge($currentAchievements, $achievements)));
    $usersData[$username]['achievements'] = $newAchievements; // Update achievements
    $usersData[$username]['code'] = $userCode; // Update user code if necessary
}

// Write updated data to the JSON file
file_put_contents($filePath, json_encode($usersData, JSON_PRETTY_PRINT));
echo json_encode(['success' => true]);
?>
