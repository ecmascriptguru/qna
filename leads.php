<?php
require("config/env.php");
?>

<!DOCTYPE html>
<html>
<head>
	<title>Questions and Answers</title>
    <link rel="stylesheet" href="assets/css/bootstrap.css">
    <link rel="stylesheet" href="assets/css/bootstrap-theme.css">
    <link href="assets/images/favicon.png" rel="shortcut icon" type="image/x-icon" />
</head>
<body>
	<div class="wrapper">
        <div class="container">
            <h3>Question and Answers</h3>

            <div class="panel panel-default" id="qna-leads-wizards" style="display:none;">
                <div class="panel-heading">
                    <h3>Please Select a wizard.</h3>
                </div>
                <div class="panel-body">
                </div>
                <div class="panel-footer">
                    <div class="row">
                        <div class="col-lg-2 col-md-3 col-sm-4 col-xs-6">
                            <button class="btn btn-default form-control">Prev</button>
                        </div>
                        <div class="col-lg-2 col-lg-offset-8 col-md-3 col-md-offset-6 col-sm-4 col-sm-offset-4 col-xs-6">
                            <button class="btn btn-default form-control">Next</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="panel panel-default" id="qna-leads-subject" style="display:none;">
            </div>

            <div class="panel panel-default" id="qna-leads-analysis" style="display:none;">
                <div class="panel-heading">
                    <h3>Thanks for your answers.</h3>
                </div>
                <div class="panel-body">
                </div>
                <div class="panel-footer">
                    <div class="row">
                        <div class="col-lg-2 col-md-3 col-sm-4 col-xs-6">
                            <button class="btn btn-default form-control" id="back-to-answers-button">Back to Answers</button>
                        </div>
                        <div class="col-lg-2 col-lg-offset-8 col-md-3 col-md-offset-6 col-sm-4 col-sm-offset-4 col-xs-6">
                            <button class="btn btn-primary form-control" id="qna-analysis-submit-answers-button">Submit Answers</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
		<footer>
            <a href="<?php echo $BASE_URL . '/admin.php'; ?>">Go to Admin Page</a>
        </footer>
    </div>
    <?php
    include "leads-templates.html";
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
	<script src="assets/js/leads.js"></script>
</body>
</html>