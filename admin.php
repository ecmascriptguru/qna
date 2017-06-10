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
    <script src="assets/js/jquery.js"></script>
    <script src="assets/js/bootstrap.js"></script>
    <script src="assets/js/jquery.dataTables.min.js"></script>
    <script src="assets/js/dataTables.bootstrap.min.js"></script>
    <script src="assets/js/env.js"></script>
    <script src="assets/js/storage.js"></script>
    <script src="assets/js/qna.js"></script>
    <script src="assets/js/admin.js"></script>
</body>
</html>