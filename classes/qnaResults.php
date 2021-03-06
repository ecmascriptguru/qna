<?php
require_once("qnaTypes.php");
/**
 *  Getting all results for a subject
 */
function get_all_results($conn, $params) {
    $user_id = $params->user_id;
    $query = "SELECT * FROM `qna_results` WHERE `user_id`={$user_id};";
    $result = $conn->query($query);
    $results = array();

    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            array_push($results, $row);
        }
    }

    return $results;
}

function get_results_by_wizard($conn, $params) {
    $wizardId = $params->wizard_id;

    $query = "SELECT * FROM `qna_results` WHERE `wizard_id`={$wizardId};";
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
    $paramResult = $params->result;
    $paramAnswers = $params->answers;

    $address = $paramResult->address;
    $city = $paramResult->city;
    $state = $paramResult->state;
    $zip_code = $paramResult->zip_code;
    $user_id = $paramResult->user_id;
    if (!isset($paramResult->user_id) || empty($paramResult->user_id)) {
        $user_id = 1;   // Initialized with default value.
    }

    $query = "INSERT INTO `qna_results` (address, city, state, zip_code, user_id, wizard_id, analysis) VALUES ('{$address}', '{$city}', '{$state}', '{$zip_code}', '{$user_id}', {$paramResult->wizard_id}, 0)";

    // var_dump($query);exit;
    
    if ($conn->query($query) === TRUE) {
        $result_id = $conn->insert_id;
        foreach($paramAnswers as $answer) {
            $value = addslashes($answer->value);
            $query = "INSERT INTO `qna_answers` (result_id, subject_id, value, estimation)
                        VALUES ({$result_id}, {$answer->id}, '{$value}', 0)";
            
            if (!$conn->query($query)) {
                die($query);
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
        $resultRow = $result->fetch_assoc();

        $query = "SELECT 
                    answers.*, 
                    subjects.question as question 
                FROM 
                    `qna_answers` as answers, 
                    `qna_subjects` as subjects 
                WHERE 
                    `answers`.`result_id`={$resultRow['id']} and 
                    `subjects`.id=`answers`.`subject_id`";
        $answers = array();
        $answerResult = $conn->query($query);
        if ($answerResult->num_rows > 0) {
            while($answerRow = $answerResult->fetch_assoc()) {
                array_push($answers, $answerRow);
            }
        }
        return [
            'status' => true,
            'result' => $resultRow,
            'answers' => $answers
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
    if(isset($params->analysis)) {
        $analysis = $params->analysis;
    }

    $query = "UPDATE `qna_results` SET analysis='{$analysis}' WHERE id={$params->id}";
    
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