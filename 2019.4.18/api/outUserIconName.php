<?php
header('content-type:application/json;charset=utf-8');
$toke = $_POST['toke'];
require_once('./conn.php');
$query = $pdo ->query("select * from tb_wx_Login where codeid = '$toke'");
$selectData = $query ->fetch(PDO::FETCH_OBJ);
if($selectData){
    $res = array(
        "usericon" =>$selectData->usericon,
        "username" =>$selectData->username,
        "usercity" =>$selectData->usercity,
        "userprovince" =>$selectData->userprovince
    );
}
echo json_encode($res);
require_once('./closeConn.php');