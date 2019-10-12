<?php
header('content-type:application/json;charset=utf-8');
require_once('./conn.php');
$toke = $_POST['toke'];
$query = $pdo->query("select a.name,a.place,a.date,a.state,a.codeid,b.picsrc,c.usericon,c.username,c.usertel from tb_wx_fb as a left join tb_wx_fb_pic as b on a.id = b.picid left join tb_wx_Login as c on a.codeid = c.codeid where a.codeid = '$toke' order by a.date desc ");
$result = $query->fetch(PDO::FETCH_OBJ);
if($result){
    $i = 0;
    $arr["code"] = 200;
    do {
        $arr["list"][$i]["name"] = $result->name;
        $arr["list"][$i]["place"] = $result->place;
        $arr["list"][$i]["date"] = date("Y.m.d",$result->date);
        $arr["list"][$i]["state"] = $result->state;
        $arr["list"][$i]["picsrc"] = $result->picsrc;
        $arr["list"][$i]["usericon"] = $result->usericon;
        $arr["list"][$i]["username"] = $result->username;
        $arr["list"][$i]["usertel"] = $result->usertel;
        if ($arr["list"][$i]["picsrc"]) {
            $arr["list"][$i]["picsrc"] = "https://renyongqi.com/wx-picklist/" . $result->picsrc;
        }
        $i++;
    } while ($result = $query->fetch(PDO::FETCH_OBJ));
}else{
    $arr["code"] = 0;
}

echo json_encode($arr);
require_once('./closeConn.php');