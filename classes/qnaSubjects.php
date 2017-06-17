<?php

require_once("qnaTypes.php");
/**
 *  Getting all subjects for a subject
 */
function get_all_subjects($conn, $params) {
    $query = "SELECT * FROM `qna_subjects` WHERE wizard_id='{$params->wizard_id}';";
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
function create_subject($conn, $params) {
    $type_id = $params->type_id;
    if (!isset($type_id) || empty($type_id)) {
        $type_id = 1;
    }
    $type = get_type($conn, $params->type_id);

    $query = "INSERT INTO `qna_subjects` (question, wizard_id, type_id, value)
                VALUES ('{$params->question}', {$params->wizard_id}, {$type['id']}, '{$type['value']}')";

    if ($conn->query($query) === TRUE) {
        return [
            'status' => true,
            'subject_id' => $conn->insert_id
        ];
    } else {
        return [
            'status' => false,
            'subject_id' => null
        ];
    }
}

/**
 *  Getting subject with a ID
 */
function get_subject($conn, $params) {
    $query = "SELECT * FROM `qna_subjects` WHERE `id`={$params->id}";

    $result = $conn->query($query);
    $results = array();

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        return [
            'status' => true,
            'subject' => $row
        ];
    } else {
        return [
            'status' => false,
            'subject' => null
        ];
    }
}

/**
 *  updating a subject
 */
function update_subject($conn, $params) {
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

    $query = "UPDATE `qna_subjects` SET question='{$params->question}', type_id={$params->type_id}, answers='{$params->answers}' WHERE id={$params->id}";
    
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
 *  Deleting a subject
 */
function delete_subject($conn, $params) {
    $query = "DELETE FROM `qna_subjects` WHERE id={$params->id}";

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