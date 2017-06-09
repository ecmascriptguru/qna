<?php
require("../config/env.php");
require("../config/db-config.php");

if (!isset($_POST) || empty($_POST)) {
    $DATA = $_GET;
} else {
    $DATA = $_POST;
}

$end_point = $DATA['end_point'];
$params = json_decode($DATA['params']);


switch($end_point) {
    case "types":
        echo json_encode([
            'end_point' => $end_point,
            'params' => $params
        ]);
        break;

    default:
        echo "unknown end point detected.";
        break;
}


require("../config/db-disc.php");