<?php

if ($env === "dev") {
    $DB_HOST = "localhost";
    $DB_USERNAME = "root";
    $DB_PASSWORD = "";
    $DB_NAME = "qna";
} else {
    $DB_HOST = "localhost";
    $DB_USERNAME = "alexdev";
    $DB_PASSWORD = "dKLB?iDe&PwI";
    $DB_NAME = "alexdev_qna";
}

$conn = new mysqli($DB_HOST, $DB_USERNAME, $DB_PASSWORD, $DB_NAME);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}