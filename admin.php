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
                                <div class="col-lg-6 col-md-12 col-sm-12">
                                    <h4>Calculations Configuration</h4>
                                    <div class="row">
                                        <div class="col-lg-8 col-md-7 col-sm-6 col-xs-12">
                                            <select id="new-analysis-calculation-select" class="form-control">
                                                
                                            </select>
                                            <script id="new-anlysis-calculation-select-template" type="text/x-handlebars-template">
                                                <option value="">Select a calculation</option>
                                                {{#each calculations}}
                                                <option value="{{id}}">{{name}}</option>
                                                {{/each}}
                                            </script>
                                        </div>
                                        <div class="col-lg-4 col-md-5 col-sm-6 col-xs-12">
                                            <button class="btn btn-default form-control" id="new-analysis-calculation-add-button">Add calculation</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-12 col-sm-12">
                                    <h4>Subjects Configuration</h4>
                                    <div class="row">
                                        <div class="col-lg-5 col-md-6 col-sm-6 col-xs-12">
                                            <select id="new-analysis-subject-select" class="form-control">
                                                
                                            </select>
                                            <script id="new-analysis-subject-select-template" type="text/x-handlebars-template">
                                                <option value="">Select a Subject</option>
                                                {{#each subjects}}
                                                <option value="{{id}}">{{question}}</option>
                                                {{/each}}
                                            </script>
                                        </div>
                                        <div class="col-lg-4 col-md-3 col-sm-3 col-xs-12">
                                            <select id="new-analysis-answers-select" class="form-control">
                                                <option value="">Select an answer</option>
                                            </select>
                                            <script id="new-analysis-answers-select-template" type="text/x-handlebars-template">
                                                <option value="">Select an answer</option>
                                                {{#each values}}
                                                <option value="{{value}}">{{value}}</option>
                                                {{/each}}
                                            </script>
                                        </div>
                                        <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                                            <button id="new-analysis-subject-add-button" class="btn btn-default form-control">Add Subject</button>
                                        </div>
                                    </div>
                                </div>
                                <input type="hidden" id="new-analysis-condition-value" value='{"subjects":[],"calculations":[],"comparisons":[]}' />
                            </div>

                            <div class="row">
                                <div class="col-xs-12">
                                    <h4>Comparisons Configuration</h4>
                                </div>
                                <div class="col-sm-5 col-xs-12">
                                    <select id="new-analysis-calculation-select-for-comparison" class="form-control">
                                        
                                    </select>
                                </div>
                                <div class="col-sm-2 col-xs-12">
                                    <select id="new-analysis-comparisons-select" class="form-control">

                                    </select>
                                    <script id="new-analysis-comparisions-template" type="text/x-handlebars-template">
                                        <option value="">Select an operator</option>
                                        {{#each operators}}
                                        <option value="{{value}}">{{caption}}</option>
                                        {{/each}}
                                    </script>
                                </div>
                                <div class="col-sm-2 col-xs-12">
                                    <input id="new-analysis-comparison-value" class="form-control" placeholder="Type Something" />
                                </div>
                                <div class="col-sm-3 col-xs-12">
                                    <button id="new-analysis-comparison-add-button" class="btn btn-default form-control">Add Comparison</button>
                                </div>
                            </div>
                        </div>
                        
                        <div id="new-analysis-conditions-container" class="form-group">
                            
                        </div>
                        <script id="new-analysis-condition-subject-template" type="text/x-handlebars-template">
                            <div class="row form-group condition condition-subject" data-id="{{id}}">
                                <div class="col-xs-2">
                                    <strong>subject_{{id}}</strong>
                                </div>
                                <div class="col-xs-4 question">
                                    {{question}}
                                </div>
                                <div class="col-xs-4 answer">
                                    {{answer}}
                                </div>
                                <div class="col-xs-2">
                                    <button class="btn btn-danger form-control condition-subject-delete">Delete</button>
                                </div>
                            </div>
                        </script>
                        <script id="new-analysis-condition-comparison-template" type="text/x-handlebars-template">
                            <div class="row form-group condition condition-comparison" data-id="{{id}}">
                                <div class="col-xs-2">
                                    <strong>calculation_{{id}}</strong>
                                </div>
                                <div class="col-xs-4 operator">
                                    {{operator}}
                                </div>
                                <div class="col-xs-4 value">
                                    {{value}}
                                </div>
                                <div class="col-xs-2">
                                    <button class="btn btn-danger form-control condition-comparison-delete">Delete</button>
                                </div>
                            </div>
                        </script>
                        <script id="new-analysis-condition-calculation-template" type="text/x-handlebars-template">
                            <div class="row form-group condition condition-calculation" data-id="{{id}}">
                                <div class="col-xs-2">
                                    <strong>calculation_{{id}}</strong>
                                </div>
                                <div class="col-xs-4 name">
                                    {{name}}
                                </div>
                                <div class="col-xs-4 factors">
                                    <code>{{operator}}</code>
                                </div>
                                <div class="col-xs-2">
                                    <button class="btn btn-danger form-control condition-subject-delete">Delete</button>
                                </div>
                            </div>
                        </script>

                        <div class="form-group">
                            <div class="row">
                                <div class="col-xs-12">
                                    <label for="new-analysis-result-value">Analysis Text</label>
                                    <input type="text" id="new-analysis-result-value" value="" class="form-control" />
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

    <script id="wizard-starting-question-template" type="text/x-handlebars-template">
        <!--<div class="form-group">-->
            <label for="wizard-starting-subject">Starts with:</label>
            <select id="wizard-starting-subject" class="form-control">
                {{#each subjects}}
                <option value="{{id}}" 
                {{#if selected }}
                    selected
                {{/if}}>{{question}}</option>
                {{/each}}
            </select>
        <!--</div>-->
    </script>

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

    <script id="add-new-factor-option-button" type="text/x-handlebars-template">
        <div class="form-group">
            <button class="btn btn-default pull-right" id="btn-add-factor-option">Add new factor(operand)</button>
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
                    <th class="actions-header">Actions</th>
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
            <div class="col-lg-3 col-md-3 col-sm-sm-3 col-xs-2">
                <input data-id="caption" placeholder="Caption" value="{{caption}}" class="form-control">
            </div>
            <div class="col-lg-2 col-md-2 col-sm-sm-2 col-xs-2">
                <input data-id="value" placeholder="Value" class="form-control" value="{{value}}">
            </div>
            <div class="col-lg-2 col-md-2 col-sm-sm-2 col-xs-2">
                <input type="number" placeholder="Weight" data-id="weight" class="form-control" value="{{weight}}">
            </div>
            <div class="col-lg-3 col-md-3 col-sm-sm-3 col-xs-4">
                <select class="form-control" data-id="next">
                    <option value="">Select a next subject</option>
                    {{#each subjects}}
                    <option value="{{id}}" 
                        {{#if selected}} 
                            selected 
                        {{/if}}
                    >{{question}}</option>
                    {{/each}}
                    <!--<option value="create_new_and_link">Create to Link</option>-->
                </select>
            </div>
            <div class="col-lg-2 col-md-2 col-sm-sm-2 col-xs-2">
                <button class="btn btn-danger form-control answer-option-delete">Remove</button>
            </div>
        </div>
    </script>

    <script id="subjects-list-template" type="text/x-handlebars-template">
        <ul class="nav nav-tabs">
            <li role="presentation" class="active"><a href="#tab-content-subjects">Subjects</a></li>
            <li role="presentation"><a href="#tab-content-calculation">Calculations</a></li>
        </ul>
        <div class="tab-content">
            <div role="tabpanel" class="tab-pane active" id="tab-content-subjects">
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
            </div>
            <div role="tabpanel" class="tab-pane active" id="tab-content-calculation">
            </div>
        </div>
    </script>

    <script id="subjects-table-template" type="text/x-handlebars-template">
        <table class="{{class}}" id="{{id}}">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Question</th>
                    <th>Answer Type</th>
                    <th class="actions-header">Actions</th>
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

    <script id="calculation-table-template" type="text/x-handlebars-template">
        <table class="{{class}}" id="{{id}}">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>operator</th>
                    <th>Factors</th>
                    <th class="actions-header">Actions</th>
                </tr>
            </thead>
            <tbody>
                {{#each calculations}}
                <tr data-calculation-id='{{id}}'>
                    <td>{{@index}}</td>
                    <td>{{name}}</td>
                    <td>{{operator}}</td>
                    <td><code>{{factors}}</code></td>
                    <td>
                        <div class="col-xs-6">
                            <button class="btn btn-info form-control calculation-edit">Edit</button>
                        </div>
                        <div class="col-xs-6">
                            <button class="btn btn-danger form-control calculation-delete">Delete</button>
                        </div>
                    </td>
                </tr>
                {{/each}}
            </tbody>
        </table>
    </script>

    <script id="analyses-table-template" type="text/x-handlebars-template">
        <table class="{{class}}" id="{{id}}">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Condition</th>
                    <th>Result</th>
                    <th class="actions-header">Actions</th>
                </tr>
            </thead>
            <tbody>
                {{#each analyses}}
                <tr data-analysis-id='{{id}}'>
                    <td>{{@index}}</td>
                    <td>{{name}}</td>
                    <td><code>{{condition}}</code></td>
                    <td><code>{{result}}</code></td>
                    <td>
                        <div class="col-xs-6">
                            <button class="btn btn-info form-control analysis-edit">Edit</button>
                        </div>
                        <div class="col-xs-6">
                            <button class="btn btn-danger form-control analysis-delete">Delete</button>
                        </div>
                    </td>
                </tr>
                {{/each}}
            </tbody>
        </table>
    </script>

    <script id="new-calculation-factor-option-template" type="text/x-handlebars-template">
        <!--<div id="new-calculation-factors-container">-->
            <div class="form-group row factor-option">
                <div class="col-lg-2 col-md-3 col-sm-sm-3 col-xs-3">
                    <input data-id="coeff" type="number" placeholder="Coefficient" value="{{coeff}}" class="form-control">
                </div>
                <div class="col-lg-8 col-md-6 col-sm-sm-6 col-xs-6">
                    <select class="form-control" data-id="subject-id">
                        {{#each subjects}}
                        <option value="{{id}}" 
                            {{#if selected}}
                            selected
                            {{/if}}
                            >{{question}}
                        </option>
                        {{/each}}
                    </select>
                </div>
                <div class="col-lg-2 col-md-3 col-sm-sm-3 col-xs-3">
                    <button class="btn btn-danger form-control factor-option-delete">Remove</button>
                </div>
            </div>
        <!--</div>-->
    </script>
    
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