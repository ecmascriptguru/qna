<?php

/**
*  Getting all of answer types
*/
function get_all_types($conn) {
    $query = "SELECT * FROM `qna_types`;";
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
 *  Getting type with a ID
 */
function get_type($conn, $id) {
    $query = "SELECT * FROM `qna_types` WHERE `id`={$id}";

    $result = $conn->query($query);
    $results = array();

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        return $row;
    } else {
        return null;
    }
}