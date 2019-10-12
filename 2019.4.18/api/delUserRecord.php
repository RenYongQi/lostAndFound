<?php
header('content-type:application/json;charset=utf-8');
$toke = $_POST['toke'];
$cont = $_POST['cont'];
$name = $_POST['name'];
$tel = $_POST['tel'];
require_once('./conn.php');
