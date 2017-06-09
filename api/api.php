<?php

require("../config/env.php");
require("../config/db-config.php");

require("../classes/qnaType.php");
require("../classes/wizards.php");

if (!isset($_POST) || empty($_POST)) {
    $DATA = $_GET;
} else {
    $DATA = $_POST;
}

$end_point = $DATA['end_point'];
$action = $DATA['action'];
$params = json_decode($DATA['params']);

switch($end_point) {
    case "types":
        if ($action == "get_all") {
            $types = get_all_types($conn);

            echo json_encode([
                'status' => true,
                'types' => $types
            ]);
        }
        break;

    case "wizards":
        if ($action == "get_all") {
            $wizards = get_all_wizards($conn);

            echo json_encode([
                'status' => true,
                'wizards' => $wizards
            ]);
        } else if ($action == "create") {
            $return = create_wizard($conn, $params);

            echo json_encode($return);
        } else if ($action == "get") {
            $return = get_wizard($conn, $params);

            echo json_encode($return);
        } else if ($action == "update") {
            $return = update_wizard($conn, $params);

            echo json_encode($return);
        } else if ($action == "delete") {
            $return = delete_wizard($conn, $params);

            echo json_encode($return);
        }
        break;

    case "subjects":
        //
        break;

    case "answers":
        //
        break;

    case "preserved":
        //
        break;

    default:
        echo "unknown end point detected.";
        break;
}


require("../config/db-disc.php");