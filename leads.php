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
            <div id="qna-container">
                Here we will see the questions and answer options one by one rendered by JavaScript library.
            </div>
        </div>
		<footer>
            <a href="<?php echo $BASE_URL . '/admin.php'; ?>">Go to Admin Page</a>
        </footer>
    </div>
	<script src="assets/js/jquery.js"></script>
    <script src="assets/js/bootstrap.js"></script>
    <script src="assets/js/jquery.dataTables.min.js"></script>
    <script src="assets/js/dataTables.bootstrap.min.js"></script>
    <script src="assets/js/env.js"></script>
    <script src="assets/js/storage.js"></script>
	<script src="assets/js/qna.js"></script>
	<script src="assets/js/leads.js"></script>
</body>
</html>