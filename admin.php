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
                        <h3>Create a new Wizard</h3>
                    </div>
                    
                    <div class="panel-body">
                        <div class="form-group">
                            <label for="new-wizard-name-input">Wizard Name</label>
                            <input class="form-control" id="new-wizard-name-input" placeholder="Wizard Name">
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

                <div class="panel panel-default" id="subjects-panel">
                    <div class="panel-heading">
                        <h3>subjects List</h3>
                        <button class="btn btn-default pull-right new-subject" id="new-subject-button">New Subject</button>
                    </div>
                    <div class="panel-body">
                        <table class="table table-striped table-bordered" id="subjects-table">
                        </table>
                    </div>
                    <div class="panel-footer">
                        <button class="btn btn-default" id="subjects-panel-back-to-wizards">Back To Wizards</button>
                    </div>
                </div>

                <div class="panel panel-default" id="new-subject-panel">
                    <div class="panel-heading">
                        <h3>Create a new Subject</h3>
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
                            <pre>[{"caption":"","value":1,"min":1,"max":100,"weight":100,"next":null}]</pre>
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
            </div>
        </div>
        <footer>
            <a href="<?php echo $BASE_URL . '/leads.php'; ?>">Go to Leads Page</a>
        </footer>
    </div>

    <script id="wizards-list-template" type="text/x-handlebars-template">
        <!--<div class="panel panel-default">-->
            <div class="panel-heading">
                <h3>{{title}}</h3>
                <button class="btn btn-default pull-right new-wizard" id="new-wizard-button">New Wizard</button>
            </div>
            <div class="panel-body">
                {{> wizardsTable }}
            </div>
            <div class="panel-footer">
                <div class="row">
                    <div class="col-lg-2 col-md-3 col-sm-4 col-xs-6">
                        <button class="btn btn-default form-control">Prev</button>
                    </div>
                    <div class="col-lg-2 col-lg-offset-8 col-md-3 col-md-offset-6 col-sm-4 col-sm-offset-4 col-xs-6">
                        <button class="btn btn-primary form-control">Next</button>
                    </div>
                </div>
            </div>
        <!--</div>-->
    </script>

    <script id="add-new-answer-option-button" type="text/x-handlebars-template">
        <div class="form-group">
            <button class="btn btn-default pull-right" id="btn-add-answer-option">Add new Answer Option</button>
        </div>
    </script>

    <script id="new-subject-type-template" type="text/x-handlebars-template">
        <!--<select class="form-control" id="new-subject-type-select">-->
            {{#each types}}
            <option value="{{id}}">{{type_name}}</option>
            {{/each}}
        <!--</select>-->
    </script>

    <script id="wizards-table-template" type="text/x-handlebars-template">
        <table class="{{class}}" id="{{id}}">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {{#each wizards}}
                <tr data-wizard-id='{{id}}'>
                    <td>{{@index}}</td>
                    <td>{{name}}</td>
                    <td>
                        <div class="col-xs-6">
                            <button class="btn btn-info form-control wizard-edit">Edit</button>
                        </div>
                        <div class="col-xs-6">
                            <button class="btn btn-danger form-control wizard-delete">Delete</button>
                        </div>
                    </td>
                </tr>
                {{/each}}
            </tbody>
        </table>
    </script>

    <script id="wizard-form-template" type="text/x-handlebars-template">

    </script>

    <script id="new-answer-option-template" type="text/x-handlebars-template">
        <div class="form-group row answer-option">
            <div class="col-lg-3 col-md-3 col-sm-sm-3 col-xs-6">
                <input data-id="caption" placeholder="Caption" value="{{caption}}" class="form-control">
            </div>
            <div class="col-lg-2 col-md-2 col-sm-sm-2 col-xs-6">
                <input data-id="value" placeholder="Value" class="form-control" value="{{value}}">
            </div>
            <div class="col-lg-2 col-md-2 col-sm-sm-2 col-xs-4">
                <input type="number" placeholder="Weight" data-id="weight" class="form-control" value="{{weight}}">
            </div>
            <div class="col-lg-3 col-md-3 col-sm-sm-3 col-xs-4">
                <select class="form-control" data-id="next">
                    <option value="">Select a next subject</option>
                    {{#each subjects}}
                    <option value="{{id}}">{{question}}</option>
                    {{/each}}
                    <option value="create_new_and_link">Create to Link</option>
                </select>
            </div>
            <div class="col-lg-2 col-md-2 col-sm-sm-2 col-xs-4">
                <button class="btn btn-danger form-control answer-option-delete">Remove</button>
            </div>
        </div>
    </script>

    <script id="subjects-list-template" type="text/x-handlebars-template">
        <!--<div class="panel panel-default">-->
            <div class="panel-heading">
                <h3>{{title}}</h3>
                <button class="btn btn-default pull-right new-subject" id="new-subject-button">New Subject</button>
            </div>
            <div class="panel-body">
                {{> subjectsTable }}
            </div>
            <div class="panel-footer">
                <div class="row">
                    <div class="col-lg-2 col-md-3 col-sm-4 col-xs-6">
                        <button class="btn btn-default form-control">Back to Wizards</button>
                    </div>
                    <div class="col-lg-2 col-lg-offset-8 col-md-3 col-md-offset-6 col-sm-4 col-sm-offset-4 col-xs-6">
                        <button class="btn btn-primary form-control">Next</button>
                    </div>
                </div>
            </div>
        <!--</div>-->
    </script>

    <script id="subjects-table-template" type="text/x-handlebars-template">
        <table class="{{class}}" id="{{id}}">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Question</th>
                    <th>Answer Type</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {{#each subjects}}
                <tr data-subject-id='{{id}}'>
                    <td>{{@index}}</td>
                    <td>{{question}}</td>
                    <td>{{type_name}}</td>
                    <td>
                        <div class="col-xs-6">
                            <button class="btn btn-info form-control subject-edit">Edit</button>
                        </div>
                        <div class="col-xs-6">
                            <button class="btn btn-danger form-control subject-delete">Delete</button>
                        </div>
                    </td>
                </tr>
                {{/each}}
            </tbody>
        </table>
    </script>
    
    <script src="assets/js/jquery.js"></script>
    <script src="assets/js/bootstrap.js"></script>
    <script src="assets/js/jquery.dataTables.min.js"></script>
    <script src="assets/js/dataTables.bootstrap.min.js"></script>
    <script src="assets/js/handlebars.js"></script>
    <script src="assets/js/env.js"></script>
    <script src="assets/js/storage.js"></script>
    <script src="assets/js/qna.js"></script>
    <script src="assets/js/admin.js"></script>
</body>
</html>