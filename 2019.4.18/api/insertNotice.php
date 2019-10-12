<?php
header('content-type:application/json;charset=utf-8');
$title = $_POST['title'];
$content = $_POST['content'];
$time = time();
require_once('./conn.php');
$query = $pdo->query("insert into tb_wx_notice (title,content,time) values ('$title','$content','$time')");
if($query){
    echo 1;
}else{
    echo 0;
}

require_once('./closeConn.php');