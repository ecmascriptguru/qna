<?php

require_once("qnaTypes.php");
/**
 *  Getting all calculations for a wizard
 */
function get_all_calculations($conn, $params) {
    $query = "SELECT * FROM `qna_calculations` WHERE wizard_id='{$params->wizard_id}';";
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
 *  Creating a new fresh calculation
 */
function create_calculation($conn, $params) {
    $query = "INSERT INTO `qna_calculations` (name, wizard_id, operator, factors)
                VALUES ('{$params->name}', {$params->wizard_id}, {$params->operator}, '{$params->factors}')";

    if ($conn->query($query) === TRUE) {
        return [
            'status' => true,
            'calculation_id' => $conn->insert_id
        ];
    } else {
        return [
            'status' => false,
            'calculation_id' => null
        ];
    }
}

/**
 *  Getting calculation with a ID
 */
function get_calculation($conn, $params) {
    $query = "SELECT * FROM `qna_calculations` WHERE `id`={$params->id}";

    $result = $conn->query($query);
    $results = array();

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        return [
            'status' => true,
            'calculation' => $row
        ];
    } else {
        return [
            'status' => false,
            'calculation' => null
        ];
    }
}

/**
 *  updating a calculation
 */
function update_calculation($conn, $params) {
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

    $query = "UPDATE `qna_calculations` SET name='{$params->name}', operator={$params->operator}, factors='{$params->factors}' WHERE id={$params->id}";
    
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
 *  Deleting a calculation
 */
function delete_calculation($conn, $params) {
    $query = "DELETE FROM `qna_calculations` WHERE id={$params->id}";

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