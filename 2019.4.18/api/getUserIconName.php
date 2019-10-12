<?php
header('content-type:application/json;charset=utf-8');
$userName = $_POST['userName'];
$userImg = $_POST['userImg'];
$userCity = $_POST['userCity'];
$userProvince = $_POST['userProvince'];
$toke = $_POST['toke'];
require_once('./conn.php');
$query = $pdo->query("select * from tb_wx_Login where codeid='$toke'");
$selectData = $query->fetch(PDO::FETCH_OBJ);
if ($selectData) {
    //存在当前用户，完善用户名-头像-城市-区县
    $result = $pdo->query("update tb_wx_Login set username = '$userName',usericon = '$userImg',usercity = '$userCity',userprovince = '$userProvince' where codeid = '$toke'");
    if ($result) {
        $res = array(
            "code" => 200
        );
    } else {
        $res = array(
            "code" => 0
        );
    }
}else{
    $result = $pdo->query("update tb_wx_Login set codeid = '$toke',usericon = '$userImg',username = '$userName',usercity = '$userCity',userprovince = '$userProvince'");
    $res = array(
        "code" => 1
    );
}
 echo json_encode($res);
 require_once('./closeConn.php');
