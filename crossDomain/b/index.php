<?php
    $username = $_GET['username'];
    $callback = $_GET['callback'];

    echo "$callback($username)";
?>