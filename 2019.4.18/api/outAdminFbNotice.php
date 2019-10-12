<?php
header('content-type:application/json;charset=utf-8');
require_once('./conn.php');
$query = $pdo->query("select * from tb_wx_notice order by time desc");
$result = $query->fetch(PDO::FETCH_OBJ);
if ($result) {
    $i = 0;
    $arr["code"] = 200;
    do {
        $arr["list"][$i]["title"] = $result->title;
        $arr["list"][$i]["content"] = $result->content;
        $arr["list"][$i]["date"] = date("Y.m.d",$result->time);
        $i++;
    } while ($result = $query->fetch(PDO::FETCH_OBJ));
} else {
    $arr["code"] = 400;
    $arr["msg"] = "获取信息失败";
}

echo json_encode($arr);
require_once('./closeConn.php');
