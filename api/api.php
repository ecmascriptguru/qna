<?php

require_once("../config/env.php");
require_once("../config/db-config.php");

require_once("../classes/qnaTypes.php");
require_once("../classes/qnaWizards.php");
require_once("../classes/qnaSubjects.php");
require_once("../classes/qnaCalculations.php");
require_once("../classes/qnaAnalyses.php");
require_once("../classes/qnaResults.php");

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
        } else if ($action == "get") {
            $id = $DATA['id'];
            $type = get_type($conn, $id);
            echo json_encode([
                'status' => true,
                'type' => $type
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
        } else if ($action == "clone") {
            $return = clone_wizard($conn, $params);

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
        } else if ($action == "settings") {
            $result = get_wizard_options($conn, $params);

            echo json_encode($result);
        }
        break;

    case "subjects":
        if ($action == "get_all") {
            $subjects = get_all_subjects($conn, $params);

            echo json_encode([
                'status' => true,
                'subjects' => $subjects
            ]);
        } else if ($action == "create") {
            $return = create_subject($conn, $params);

            echo json_encode($return);
        } else if ($action == "get") {
            $return = get_subject($conn, $params);

            echo json_encode($return);
        } else if ($action == "update") {
            $return = update_subject($conn, $params);

            echo json_encode($return);
        } else if ($action == "delete") {
            $return = delete_subject($conn, $params);

            echo json_encode($return);
        }
        break;

    case "calculations":
        if ($action == "get_all") {
            $calculations = get_all_calculations($conn, $params);

            echo json_encode([
                'status' => true,
                'calculations' => $calculations
            ]);
        } else if ($action == "create") {
            $return = create_calculation($conn, $params);

            echo json_encode($return);
        } else if ($action == "get") {
            $return = get_calculation($conn, $params);

            echo json_encode($return);
        } else if ($action == "update") {
            $return = update_calculation($conn, $params);

            echo json_encode($return);
        } else if ($action == "delete") {
            $return = delete_calculation($conn, $params);

            echo json_encode($return);
        }
        break;

    case "analyses":
        if ($action == "option") {
            $result = get_analysis_options($conn, $params);

            echo json_encode([
                'status'=> true,
                'option' => $result
            ]);
        } else if ($action == "get_all") {
            $analyses = get_all_analyses($conn, $params);

            echo json_encode([
                'status' => true,
                'analyses' => $analyses
            ]);
        } else if ($action == "create") {
            $return = create_analysis($conn, $params);

            echo json_encode($return);
        } else if ($action == "get") {
            $return = get_analysis($conn, $params);

            echo json_encode($return);
        } else if ($action == "update") {
            $return = update_analysis($conn, $params);

            echo json_encode($return);
        } else if ($action == "delete") {
            $return = delete_analysis($conn, $params);

            echo json_encode($return);
        }
        break;

    case "results":
        if ($action == "get_all") {
            $results = get_all_results($conn, $params);

            echo json_encode([
                'status' => true,
                'results' => $results
            ]);
        } else if ($action == "get_by_wizard") {
            $results = get_results_by_wizard($conn, $params);

            echo json_encode([
                'status' => true,
                'results' => $results
            ]);
        } else if ($action == "create") {
            $return = create_result($conn, $params);

            echo json_encode($return);
        } else if ($action == "get") {
            $return = get_result($conn, $params);

            echo json_encode($return);
        } else if ($action == "update") {
            $return = update_result($conn, $params);

            echo json_encode($return);
        } else if ($action == "delete") {
            $return = delete_result($conn, $params);

            echo json_encode($return);
        }
        break;

    case "preserved":
        //
        break;

    default:
        echo "unknown end point detected.";
        break;
}


require("../config/db-disc.php");