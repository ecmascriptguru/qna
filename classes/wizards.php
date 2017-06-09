<?php

// namespace App\Classes;
/**
 *  Getting all step logics
 */
function get_all_wizards($conn) {
    $query = "SELECT * FROM `qna_wizards`;";
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
 *  Creating a new fresh wizard
 */
function create_wizard($conn, $params) {
    $query = "INSERT INTO `qna_wizards` (name)
                VALUES ('{$params->name}')";

    if ($conn->query($query) === TRUE) {
        return [
            'status' => true,
            'wizard_id' => $conn->insert_id
        ];
    } else {
        return [
            'status' => false,
            'wizard_id' => null
        ];
    }
}

/**
 *  Getting wizard with a ID
 */
function get_wizard($conn, $params) {
    $query = "SELECT * FROM `qna_wizards` WHERE `id`={$params->id}";

    $result = $conn->query($query);
    $results = array();

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        return [
            'status' => true,
            'wizard' => $row
        ];
    } else {
        return [
            'status' => false,
            'wizard' => null
        ];
    }
}

/**
 *  updating a wizard
 */
function update_wizard($conn, $params) {
    $query = "UPDATE `qna_wizards` SET name='{$params->name}' WHERE id={$params->id}";

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
 *  Deleting a wizard
 */
function delete_wizard($conn, $params) {
    $query = "DELETE FROM `qna_wizards` WHERE id={$params->id}";

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