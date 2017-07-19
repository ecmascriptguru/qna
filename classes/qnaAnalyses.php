<?php
// require("qnaSubjects.php");
// require("qnaCalculations.php");
/**
 *  Get all subjects and caculations belong to a specific wizard.
 */
function get_analysis_options($conn, $params) {
    $wizard_id = $params->wizard_id;
    $subjects = get_all_subjects($conn, $params);
    $calculations = get_all_calculations($conn, $params);

    return array(
        'subjects' => $subjects,
        'calculations' => $calculations
    );
}
/**
 *  Getting all analyses for a wizard
 */
function get_all_analyses($conn, $params) {
    $query = "SELECT * FROM `qna_analyses` WHERE wizard_id='{$params->wizard_id}';";
    $result = $conn->query($query);
    $results = array();

    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            array_push($results, $row);
        }
    }

    return $results;
}

/**
 *  Creating a new fresh analysis
 */
function create_analysis($conn, $params) {
    $result = mysqli_real_escape_string($conn, $params->result);
    $query = "INSERT INTO `qna_analyses` (`name`, `wizard_id`, `condition`, `result`)
                VALUES ('{$params->name}', {$params->wizard_id}, '{$params->condition}', '{$result}')";

    if ($conn->query($query) === TRUE) {
        return [
            'status' => true,
            'analysis_id' => $conn->insert_id
        ];
    } else {
        return [
            'status' => false,
            'analysis_id' => null
        ];
    }
}

/**
 *  Getting analysis with a ID
 */
function get_analysis($conn, $params) {
    $query = "SELECT * FROM `qna_analyses` WHERE `id`={$params->id}";

    $result = $conn->query($query);
    $results = array();

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        return [
            'status' => true,
            'analysis' => $row
        ];
    } else {
        return [
            'status' => false,
            'analysis' => null
        ];
    }
}

/**
 *  updating a analysis
 */
function update_analysis($conn, $params) {
    $result = mysqli_real_escape_string($conn, $params->result);
    $query = "UPDATE `qna_analyses` SET `name`='{$params->name}', `condition`='{$params->condition}', `result`='{$result}' WHERE id={$params->id}";
    
    if ($conn->query($query) === TRUE) {
        return [
            'status' => true
        ];
    } else {
        return [
            'status' => false
        ];
    }
}

/**
 *  Deleting a analysis
 */
function delete_analysis($conn, $params) {
    $query = "DELETE FROM `qna_analyses` WHERE id={$params->id}";

    if ($conn->query($query) === TRUE) {
        return [
            'status' => true
        ];
    } else {
        return [
            'status' => false
        ];
    }
}