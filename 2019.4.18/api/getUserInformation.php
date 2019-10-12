<?php
header('content-type:application/json;charset=utf-8');
$name = $_POST['name'];
$telnumber = $_POST['telnumber'];
$professional = $_POST['professional'];
$toke = $_POST['toke'];
require_once('./conn.php');
$query = $pdo->query("select * from tb_wx_user where codeid='$toke'");
$selectData = $query->fetch(PDO::FETCH_OBJ);
//判断手机号是否正确
if (!preg_match("/^1[34578]\d{9}$/", $telnumber)) {
    $res = array(
        "checktel" =>0
    );
}else if ($selectData) {
    //存在用户，更新用户信息
    $result = $pdo->query("update tb_wx_user set username = '$name',usertel = '$telnumber',userzy = '$professional' where codeid = '$toke'");
    $resultt = $pdo->query("update tb_wx_Login set usertel = '$telnumber'");
    if ($result) {
        //更新成功
        $res = array(
            "code" => 200,
            "checktel" => 1
        );
    } else {
        $res = array(
            "code" => 0,
            "checktel" => 1
        );
    }
} else {
    //不存在用户，插入用户信息
    $result = $pdo->query("insert into tb_wx_user (codeid,usertel,username,userzy) values ('$toke','$telnumber','$name','$professional')");
    $resultt = $pdo->query("update tb_wx_Login set usertel = '$telnumber'");
    if ($result) {
        //插入成功
        $res = array(
            "code" => 200,
            "checktel" => 1
        );
    } else {
        $res = array(
            "code" => 0,
            "checktel" => 1
        );
    }
}
echo json_encode($res);
require_once('./closeConn.php');
