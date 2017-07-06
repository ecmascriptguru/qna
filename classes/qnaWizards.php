<?php

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

function get_wizard_options($conn, $params) {
    $wizardId = $params->id;
    $calculationsQuery = "SELECT * FROM `qna_calculations` WHERE `wizard_id`={$wizardId}";
    $analysesQuery = "SELECT * FROM `qna_analyses` WHERE `wizard_id`={$wizardId}";
    $cals = array();
    $analyses = array();
    $flag = true;

    $calculationsResult = $conn->query($calculationsQuery);
    if ($calculationsResult->num_rows > 0) {
        while($row = $calculationsResult->fetch_assoc()) {
            array_push($cals, $row);
        }
    }

    $analysesResult = $conn->query($analysesQuery);
    if ($analysesResult->num_rows > 0) {
        while($row = $analysesResult->fetch_assoc()) {
            array_push($analyses, $row);
        }
    }

    return [
        'status' => $flag,
        'calculations' => $cals,
        'analyses' => $analyses
    ];
}

/**
 *  Creating a new fresh wizard
 */
function create_wizard($conn, $params) {
    $query = "INSERT INTO `qna_wizards` (name, starts_with)
                VALUES ('{$params->name}', '{$params->starts_with}')";

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
    $query = "UPDATE `qna_wizards` SET name='{$params->name}', starts_with='{$params->starts_with}' WHERE id={$params->id}";

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