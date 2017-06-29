<?php
require("config/env.php");
?>
<!DOCTYPE html>
<html>
<head>
	<title>QA Administration</title>
    <link rel="stylesheet" href="assets/css/bootstrap.css">
    <link rel="stylesheet" href="assets/css/bootstrap-theme.css">
    <link rel="stylesheet" href="assets/css/admin.css">
    <link href="assets/images/favicon.png" rel="shortcut icon" type="image/x-icon" />
</head>
<body>
    <div class="wrapper">
        <div class="container">
            <h3>Question and Answer Generation</h3>
            <div id="tool-container">
                <div class="panel panel-default" id="wizards-panel">
                </div>

                <div class="panel panel-default" id="new-wizard-panel">
                    <div class="panel-heading">
                        <h3>Create/Update a new Wizard</h3>
                    </div>
                    
                    <div class="panel-body">
                        <div class="form-group">
                            <label for="new-wizard-name-input">Wizard Name</label>
                            <input class="form-control" id="new-wizard-name-input" placeholder="Wizard Name">
                        </div>

                        <div class="form-group" id="wizard-starting-subject-container">
                        </div>
                    </div>
                    
                    <div class="panel-footer">
                        <div class="row">
                            <div class="col-lg-2 col-md-3 col-sm-4 col-xs-6">
                                <button class="btn btn-default form-control" id="new-wizard-back-button">Back to List</button>
                            </div>
                            <div class="col-lg-2 col-lg-offset-8 col-md-3 col-md-offset-6 col-sm-4 col-sm-offset-4 col-xs-6">
                                <button class="btn btn-primary form-control" id="new-wizard-create-button" data-action="create" data-id="1">Save Changes</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="subjects-panel" class="panel panel-default">
                    <div class="panel-heading">
                        <h3>Manage Subjects and Calculations</h3>
                    </div>
                    <div class="panel-body">
                        <ul class="nav nav-tabs">
                            <li role="presentation" class="active"><a href="#tab-content-subjects">Subjects</a></li>
                            <li role="presentation"><a href="#tab-content-calculation">Calculations</a></li>
                            <li role="presentation"><a href="#tab-content-analysis">Analysis</a></li>
                        </ul>
                        <div class="tab-content">
                            <div role="tabpanel" id="tab-content-subjects" class="tab-pane active">
                                <button class="btn btn-default pull-right new-subject" id="new-subject-button">New Subject</button>
                                <table class="table table-striped table-bordered" id="subjects-table">
                                </table>
                            </div>
                            <div role="tabpanel" id="tab-content-calculation" class="tab-pane">
                                <button class="btn btn-default pull-right new-calculation" id="new-calculation-button">New Calculation</button>
                                <table class="table table-striped table-bordered" id="calculation-table">
                                </table>
                            </div>
                            <div role="tabpanel" id="tab-content-analysis" class="tab-pane">
                                <button class="btn btn-default pull-right new-analysis" id="new-analysis-button">New Analysis</button>
                                <table class="table table-striped table-bordered" id="analyses-table">
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="panel-footer">
                        <button class="btn btn-default" id="subjects-panel-back-to-wizards">Back To Wizards</button>
                    </div>
                </div>

                <div class="panel panel-default" id="new-subject-panel">
                    <div class="panel-heading">
                        <h3>Create/Update a new Subject</h3>
                    </div>
                    <div class="panel-body">
                        <div class="form-group">
                            <label for="new-subject-question-input">Enter a question.</label>
                            <input class="form-control" id="new-subject-question-input" placeholder="Enter a question.">
                        </div>
                        <div class="form-group">
                            <label for="new-subject-type-select"></label>
                            <select class="form-control" id="new-subject-type-select">
                                <option value="1">Text Field</option>
                                <option value="2">Number Field</option>
                                <option value="3">Drop Down Choice</option>
                                <option value="4">Multiple Choice</option>
                                <option value="5">Yes / No</option>
                            </select>
                        </div>
                        <div class="form-group" id="new-subject-data-info-container">
                            Selected Type Info.
                            <pre></pre>
                        </div>
                        <div id="new-subject-answers-container">
                            <div class="form-group row answer-option">
                                <div class="col-lg-3 col-md-3 col-sm-sm-3 col-xs-6">
                                    <input data-id="caption" placeholder="Caption" value="" class="form-control">
                                </div>
                                <div class="col-lg-2 col-md-2 col-sm-sm-2 col-xs-6">
                                    <input data-id="value" placeholder="Value" class="form-control" value="">
                                </div>
                                <div class="col-lg-2 col-md-2 col-sm-sm-2 col-xs-4">
                                    <input type="number" placeholder="Weight" data-id="weight" class="form-control" value="0">
                                </div>
                                <div class="col-lg-3 col-md-3 col-sm-sm-3 col-xs-4">
                                    <select class="form-control" data-id="next">
                                        <option value="">Select a next subject</option>
                                        
                                    </select>
                                </div>
                                <div class="col-lg-2 col-md-2 col-sm-sm-2 col-xs-4">
                                    <button class="btn btn-danger form-control answer-option-delete">Remove</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="panel-footer">
                        <div class="row">
                            <div class="col-lg-2 col-md-3 col-sm-4 col-xs-6">
                                <button class="btn btn-default form-control" id="new-subject-back-button">Back to List</button>
                            </div>
                            <div class="col-lg-2 col-lg-offset-8 col-md-3 col-md-offset-6 col-sm-4 col-sm-offset-4 col-xs-6">
                                <button class="btn btn-primary form-control" id="new-subject-create-button" data-action="create">Save Changes</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="panel panel-default" id="new-calculation-panel">
                    <div class="panel-heading">
                        <h3>Create/Update a Calculation</h3>
                    </div>
                    <div class="panel-body">
                        <div class="form-group">
                            <label for="new-calculation-name-input">Enter Name.</label>
                            <input class="form-control" id="new-calculation-name-input" placeholder="Name">
                        </div>
                        <div class="form-group">
                            <label for="new-calculation-operator-select">Select an operator</label>
                            <select id="new-calculation-operator-select" class="form-control">
                                <option value="+">+</option>
                                <option value="-">-</option>
                                <option value="*">x</option>
                                <option value="/">/</option>
                            </select>
                        </div>
                        <div class="form-group" id="new-calculation-data-info-container">
                            Selected Type Info.
                            <pre></pre>
                        </div>
                        <div id="new-calculation-factors-container">
                            
                        </div>
                    </div>
                    <div class="panel-footer">
                        <div class="row">
                            <div class="col-lg-2 col-md-3 col-sm-4 col-xs-6">
                                <button class="btn btn-default form-control" id="new-calculation-back-button">Back to List</button>
                            </div>
                            <div class="col-lg-2 col-lg-offset-8 col-md-3 col-md-offset-6 col-sm-4 col-sm-offset-4 col-xs-6">
                                <button class="btn btn-primary form-control" id="new-calculation-create-button" data-action="create">Save Changes</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="panel panel-default" id="new-analysis-panel">
                    <div class="panel-heading">
                        <h3>Create/Update an Analysis</h3>
                    </div>
                    <div class="panel-body">
                        <div class="form-group">
                            <label for="new-analysis-name-input">Enter Name.</label>
                            <input class="form-control" id="new-analysis-name-input" placeholder="Name">
                        </div>
                        <div class="form-group">
                            <div class="row">
                                <div class="col-xs-12">
                                    <h4>Subject Comparison Configuration</h4>
                                </div>
                                <div class="col-sm-5 col-xs-12">
                                    <select id="new-analysis-subject-select-for-comparison" class="form-control">
                                        
                                    </select>
                                </div>
                                <div class="col-sm-2 col-xs-12">
                                    <select id="new-analysis-operator-select-for-subjects" class="form-control">

                                    </select>
                                </div>
                                <div class="col-sm-2 col-xs-12">
                                    <input id="new-analysis-subject-comparison-value" class="form-control" placeholder="Type Something" />
                                </div>
                                <div class="col-sm-3 col-xs-12">
                                    <button id="new-analysis-subject-comparison-add-button" class="btn btn-default form-control">Add Subject</button>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-xs-12">
                                    <h4>Calculation Comparisons Configuration</h4>
                                </div>
                                <div class="col-sm-5 col-xs-12">
                                    <select id="new-analysis-calculation-select-for-comparison" class="form-control">
                                        
                                    </select>
                                </div>
                                <div class="col-sm-2 col-xs-12">
                                    <select id="new-analysis-operator-select-for-calculations" class="form-control">

                                    </select>
                                </div>
                                <div class="col-sm-2 col-xs-12">
                                    <input id="new-analysis-calculation-comparison-value" class="form-control" placeholder="Type Something" />
                                </div>
                                <div class="col-sm-3 col-xs-12">
                                    <button id="new-analysis-calculation-comparison-add-button" class="btn btn-default form-control">Add Calculation</button>
                                </div>
                            </div>

                            <input type="hidden" id="new-analysis-condition-value" value='{"subjects":[],"calculations":[]}' />
                        </div>
                        
                        <div id="new-analysis-conditions-container" class="form-group">
                            
                        </div>

                        <div class="form-group">
                            <div class="row">
                                <div class="col-lg-3 col-md-3 col-sm-4 col-xs-12">
                                    <select id="new-analysis-comparison-type-select" class="form-control">
                                        <option value="subject">Subject Comparison</option>
                                        <option value="calculation">Calculation Comparison</option>
                                    </select>
                                </div>
                                <div class="col-lg-5 col-md-3 col-sm-3 col-xs-12">
                                    <select id="new-analysis-comparison-value-select" class="form-control">
                                    </select>
                                </div>
                                <div class="col-lg-2 col-md-3 col-sm-2 col-xs-6">
                                    <select id="new-analysis-comparison-visible-type-select" class="form-control">
                                        <option value="question">Question</option>
                                        <option value="answer">Answer</option>
                                    </select>
                                </div>
                                <div class="col-lg-2 col-md-3 col-sm-3 col-xs-6">
                                    <button id="new-analysis-analysis-tag-add-button" class="btn btn-default form-control">Copy to Clipboard</button>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xs-12">
                                    <label for="new-analysis-result-value">Analysis Text</label>
                                    <textarea type="text" id="new-analysis-result-value" value="" class="form-control" ></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="panel-footer">
                        <div class="row">
                            <div class="col-lg-2 col-md-3 col-sm-4 col-xs-6">
                                <button class="btn btn-default form-control" id="new-analysis-back-button">Back to List</button>
                            </div>
                            <div class="col-lg-2 col-lg-offset-8 col-md-3 col-md-offset-6 col-sm-4 col-sm-offset-4 col-xs-6">
                                <button class="btn btn-primary form-control" id="new-analysis-create-button" data-action="create">Save Changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <footer>
            <a href="<?php echo $BASE_URL . '/leads.php'; ?>" target="_blank">Go to Leads Page</a>
        </footer>
    </div>
    <?php
    include "admin-templates.html";
    ?>
    
    <script src="assets/js/jquery.js"></script>
    <script src="assets/js/bootstrap.js"></script>
    <script src="assets/js/jquery.dataTables.min.js"></script>
    <script src="assets/js/dataTables.bootstrap.min.js"></script>
    <script src="assets/js/handlebars.js"></script>
    <script src="assets/js/env.js"></script>
    <script src="assets/js/mockData.js"></script>
    <script src="assets/js/storage.js"></script>
    <script src="assets/js/qna.js"></script>
    <script src="assets/js/admin.js"></script>
</body>
</html>