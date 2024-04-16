<?php
// Include Composer dependencies
require 'vendor/autoload.php';

use Firebase\JWT\JWT;

// Salesforce OAuth Configuration
$consumerKey = '3MVG9riCAn8HHkYVBwpsATiMex79TCoE6Ym6NBQ66xJRPETeLZw_JJjOFw7.s0OeClLKieNz_VvcBKVhH0sEw';
$privateKeyPath = '/var/convesio/laravel/public/private/server.key';
$username = 'hello@taylordesens.com';
$tokenUrl = "https://login.salesforce.com/services/oauth2/token"; // Ensure this is the correct environment URL
$audience = "https://login.salesforce.com";

// Function to generate JWT
function generateJWT($keyPath, $consumerKey, $username, $audience)
{
    if (!file_exists($keyPath) || !is_readable($keyPath)) {
        die("Private key file is not accessible.");
    }
    $privateKey = file_get_contents($keyPath);
    $payload = [
        'iss' => $consumerKey,
        'sub' => $username,
        'aud' => $audience,
        'exp' => time() + (15 * 60) // Expiration time set to 15 minutes
    ];
    return JWT::encode($payload, $privateKey, 'RS256');
}

// Generate the JWT
// $jwt = generateJWT($privateKeyPath, $consumerKey, $username, $audience);
// Output the JWT to the console for testing
// echo $jwt;

// Function to request Access Token from Salesforce
function requestSalesforceToken($jwt, $tokenUrl)
{
    $postData = http_build_query([
        'grant_type' => 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        'assertion'  => $jwt
    ]);

    $ch = curl_init($tokenUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/x-www-form-urlencoded'));

    $response = curl_exec($ch);
    if ($response === false) {
        $error = curl_error($ch);
        curl_close($ch);
        die('Curl error: ' . $error);
    } else {
        // Log the complete raw response for debugging
        // echo "<script>logToConsole('Salesforce Response: " . json_encode($response) . "');</script>"; 
    }

    curl_close($ch);
    return json_decode($response, true);
}

/**
 * Queries Salesforce to check if an email exists.
 *
 * @param string $email The email to check in Salesforce.
 * @param string $accessToken The access token for Salesforce API.
 * @param string $instanceUrl The base URL for the Salesforce instance.
 * @return bool Returns true if the email exists, false otherwise.
 */
function checkEmailExists($email, $accessToken, $instanceUrl)
{
    $query = "SELECT Id FROM Contact WHERE Email = '" . addslashes($email) . "' LIMIT 1";
    $url = $instanceUrl . '/services/data/v53.0/query/?q=' . urlencode($query); // Adjust API version as necessary

    $curl = curl_init($url);
    curl_setopt($curl, CURLOPT_HTTPHEADER, [
        'Authorization: Bearer ' . $accessToken,
        'Content-Type: application/json'
    ]);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($curl);
    curl_close($curl);

    if (!$response) {
        return false;
    }

    $response = json_decode($response, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        return false; // Handle JSON decode error
    }

    return !empty($response['records']); // Return true if any records found
}

// Handling the AJAX POST request
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['email'])) {
    $email = $_POST['email'];  // Get email from AJAX POST
    $jwt = generateJWT($privateKeyPath, $consumerKey, $username, $tokenUrl);
    $responseData = requestSalesforceToken($jwt, $tokenUrl);
    if (isset($responseData['access_token'])) {
        $instanceUrl = $responseData['instance_url']; // Assuming instance URL is part of the response
        $emailExists = checkEmailExists($email, $responseData['access_token'], $instanceUrl);
        echo $emailExists ? "Email exists in Salesforce DB" : "Email does not exist in Salesforce DB";
    } else {
        echo "Error getting access token: " . ($responseData['error'] ?? 'Unknown error');
    }
} else {
    echo "This script only handles POST requests with an email parameter.";
}