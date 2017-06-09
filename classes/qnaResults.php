<?php
require_once("qnaTypes.php");
/**
 *  Getting all results for a subject
 */
function get_all_results($conn, $params) {
    $query = "SELECT * FROM `qna_results`;";
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
 *  Creating a new fresh subject
 */
function create_result($conn, $params) {
    $user_id = $params->user_id;
    if (!isset($user_id) || empty($user_id)) {
        $user_id = 1;   // Initialized with default value.
    }

    $wizard_id = $params->wizard_id;
    if (!isset($wizard_id) || empty($wizard_id)) {
        $wizard_id = 1; // Initialized with default value.
    }

    $query = "INSERT INTO `qna_results` (user_id, wizard_id, analysis)
                VALUES ('{$user_id}', {$wizard_id}, {$params->analysis})";
    
    if ($conn->query($query) === TRUE) {
        $result_id = $conn->insert_id;
        $answers = $params->answers;
        foreach($answers as $answer) {
            $query = "INSERT INTO `qna_answers` (result_id, subject_id, value, estimation)
                        VALUES ({$result_id}, {$answer->subject_id}, '{$answer->value}', {$answer->est})";
            
            if (!$conn->query($query)) {
                die("Something went wrong in SQL");
            }
        }
        return [
            'status' => true,
            'result_id' => $result_id
        ];
    } else {
        return [
            'status' => false,
            'result_id' => null
        ];
    }
}

/**
 *  Getting result with a ID
 */
function get_result($conn, $params) {
    $query = "SELECT * FROM `qna_results` WHERE `id`={$params->id}";

    $result = $conn->query($query);
    $results = array();

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        return [
            'status' => true,
            'result' => $row
        ];
    } else {
        return [
            'status' => false,
            'result' => null
        ];
    }
}

/**
 *  updating a result
 */
function update_result($conn, $params) {
    if(isset($params->value)) {
        $value = $params->value;
    }

    if (empty($value) || $value == "") {
        $type_id = $params->type_id;
        if (!isset($type_id) || empty($type_id)) {
            $type_id = 1;
        }
        $type = get_type($conn, $params->type_id);
        $value = $type['value'];
    }

    $query = "UPDATE `qna_results` SET question='{$params->question}', type_id={$params->type_id}, value='{$value}' WHERE id={$params->id}";
    
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
 *  Deleting a result
 */
function delete_result($conn, $params) {
    $query = "DELETE FROM `qna_results` WHERE id={$params->id}";

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