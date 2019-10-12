<?php
header('content-type:application/json;charset=utf-8');
$toke = $_POST['toke'];
require_once('./conn.php');
$query = $pdo->query("select * from tb_wx_Login where codeid = '$toke'");
$result = $query->fetch(PDO::FETCH_OBJ);
if($result){
    $isAdmin = $result->isadmin;
    //echo $isAdmin;
    if($isAdmin == 'yes'){
        echo 1;
    }else{
        echo 2;
    }
}