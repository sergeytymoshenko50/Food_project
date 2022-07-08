<?php
// if we send data in json format
$_POST = json_decode(file_get_contents("php://input"), true);
// if we send data by FormData without decode
echo var_dump($_POST);