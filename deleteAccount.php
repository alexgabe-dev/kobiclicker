<?php
// Assuming users.json is in the same directory
$jsonFile = 'users.json';

// Get the content of the users.json file
if (file_exists($jsonFile)) {
    $data = json_decode(file_get_contents($jsonFile), true);
    $input = json_decode(file_get_contents("php://input"), true);
    $usernameToDelete = $input['username'];

    if (isset($data[$usernameToDelete])) {
        unset($data[$usernameToDelete]); // Remove the user's data

        // Write back the updated data to the JSON file
        file_put_contents($jsonFile, json_encode($data));

        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "error" => "Username not found."]);
    }
} else {
    echo json_encode(["success" => false, "error" => "User data file not found."]);
}
?>
