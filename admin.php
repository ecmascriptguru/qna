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
            </div>
        </div>
        <footer>
            <a href="<?php echo $BASE_URL . '/leads.php'; ?>">Go to Leads Page</a>
        </footer>
    </div>

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