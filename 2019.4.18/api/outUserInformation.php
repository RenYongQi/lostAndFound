<?php
header('content-type:application/json;charset=utf-8');
require_once('./conn.php');
$toke = $_POST['toke'];
$query = $pdo ->query("select * from tb_wx_user where codeid = '$toke'");
$selectData = $query ->fetch(PDO::FETCH_OBJ);
if($selectData){
    $res = array(
        "name" =>$selectData->username,
        "tel" =>$selectData->usertel,
        "userzy" =>$selectData->userzy
    );
}
echo json_encode($res);
require_once('./closeConn.php');
