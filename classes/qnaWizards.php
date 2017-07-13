<?php
require_once("qnaSubjects.php");
require_once("qnaCalculations.php");
require_once("qnaAnalyses.php");
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
 *  Clone a new wizard from a specific wizard.
 */
function clone_wizard($conn, $params) {
    // $str = "Something like this {{A5}} and {{Q2}}. Also {{Cal34}} and {{Val45}} as well as {{A5}} and {{Q2}}";
    // $pattern = "/\{\{(Q|A|Cal|Val)(\d+)\}\}/";
    // if (preg_match_all($pattern, $str, $matches)) {
    //     return ['something' => $matches];
    // } else {
    //     return ['something' => 'wrong'];
    // }
    // exit; 
    $query = "SELECT * FROM `qna_wizards` WHERE `id`={$params->id}";
    $result = $conn->query($query);
    $pattern = "/\{\{(Q|A|Cal|Val)(\d+)\}\}/";

    if ($result->num_rows < 0) {
        return ['wizard_id' => null];
    }
    $wizard = $result->fetch_assoc();
    $wizard['name'] = "Copy of {$wizard['name']}";
    $newId = create_wizard($conn, (object)$wizard)['wizard_id'];
    $wizard['id'] = $newId;

    $subjects = get_all_subjects($conn, (object)['wizard_id' => $params->id]);
    $subjectsMap = array();

    for ($i = 0; $i < sizeof($subjects); $i ++) {
        $subjects[$i]['wizard_id'] = $newId;
        $subjectsMap[$subjects[$i]['id']] = create_subject($conn, (object)$subjects[$i])['subject_id'];
        $subjects[$i]['id'] = $subjectsMap[$subjects[$i]['id']];
    }

    foreach ($subjects as $key => $subject) {
        $answers = json_decode($subject['answers']);

        for ($j = 0; $j < sizeof($answers); $j ++) {
            if (!is_null($answers[$j]->next)) {
                $answers[$j]->next = $subjectsMap[$answers[$j]->next];
            }
        }
        $subject['answers'] = json_encode($answers);
        update_subject($conn, (object)$subject);
    }

    $calculations = get_all_calculations($conn, (object)['wizard_id' => $params->id]);
    $calculationsMap = array();
    for ($i = 0; $i < sizeof($calculations); $i ++) {
        $calculations[$i]['wizard_id'] = $newId;
        $factors = json_decode($calculations[$i]['factors']);
        for($j = 0; $j < sizeof($factors); $j ++) {
            $factors[$j]->id = $subjectsMap[$factors[$j]->id];
        }
        $calculations[$i]['factors'] = json_encode($factors);
        $calculationsMap[$calculations[$i]['id']] = create_calculation($conn, (object)$calculations[$i])['calculation_id'];
        $calculations[$i]['id'] = $calculationsMap[$calculations[$i]['id']];
    }

    $analyses = get_all_analyses($conn, (object)['wizard_id' => $params->id]);
    $analysesMap = array();
    for($i = 0; $i < sizeof($analyses); $i ++) {
        $analyses[$i]['wizard_id'] = $newId;
        $condition = $analyses[$i]['condition'];
        $condition = json_decode($condition);
        $condSubjects = $condition->subjects;
        $condCalculations = $condition->calculations;

        for ($j = 0; $j < sizeof($condSubjects); $j ++) {
            $condSubjects[$j]->id = $subjectsMap[$condSubjects[$j]->id];
        }

        for ($j = 0; $j < sizeof($condCalculations); $j ++) {
            $condCalculations[$j]->id = $calculationsMap[$condCalculations[$j]->id];
        }
        $condition = (object)[
            'subjects' => $condSubjects,
            'calculations' => $condCalculations
        ];
        $analyses[$i]['condition'] = json_encode($condition);

        //  Changing analysis result text
        $result = $analyses[$i]['result'];
        if (preg_match_all($pattern, $result, $matches)) {
            $tags = $matches[0];
            $replace = array();

            for ($j = 0; $j < sizeof($tags); $j ++) {
                $tempReplace = "{{" . $matches[1][$j];
                switch($matches[1][$j]) {
                    case "A":
                    case "Q":
                        $tempReplace .= $subjectsMap[$matches[2][$j]];
                        break;
                        
                    case "Cal":
                    case "Val":
                        $tempReplace .= $calculationsMap[$matches[2][$j]];
                        break;
                }
                $tempReplace .= "}}";
                array_push($replace, $tempReplace);
            }

            $analyses[$i]['result'] = str_replace($tags, $replace, $result);
        }

        $analyses[$i]['id'] = create_analysis($conn, (object)$analyses[$i])['analysis_id'];
    }
    $wizard['starts_with'] = $subjectsMap[$wizard['starts_with']];
    update_wizard($conn, (object)$wizard);

    return [
        'wizard_id' => $newId
    ];
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