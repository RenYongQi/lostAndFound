<?php
header('content-type:application/json;charset=utf-8');
require_once('./conn.php');
$theSomething = $_POST['theSomething'];
$thePlace = $_POST['thePlace'];
$time = time();
$state = $_POST['state'];
$toke = $_POST['toke'];
$result = $pdo->query("insert into tb_wx_fb (codeid,name,place,date,state) values ('$toke','$theSomething','$thePlace','$time','$state')");
if($result){
    echo 1;
}else{
    echo 0;
}
require_once('./closeConn.php');