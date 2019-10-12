<?php
//初始化
header('content-type:application/json;charset=utf-8');
$appid = 'wx5eecaf34baf73706';
$secret = '567e2c173e04a44379df226d8b2f08a3';
$code = $_POST["code"];
$url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' . $appid . '&secret=' . $secret . '&js_code=' . $code . '&grant_type=authorization_code';

$curl = curl_init();
curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false); //绕过ssl验证
curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
//设置获取的信息以文件流的形式返回，而不是直接输出。
curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
//设置抓取的url
curl_setopt($curl, CURLOPT_URL, $url);
//执行命令
$data = curl_exec($curl);
//关闭URL请求
curl_close($curl);
$jsonData = json_decode($data);
//入库

require_once('./conn.php');
$reName=md5($jsonData->openid . $jsonData->key);
$query = $pdo -> query("select * from tb_wx_Login where codeid='$reName'");
$selectData = $query->fetch(PDO::FETCH_OBJ);
//判断用户是否存在
if ($selectData) {
    //echo 'is have user';
    $res = array(
        "code" => 100
    );
    $res["toke"] = $selectData->codeid;
} else {
    //echo 'new user ';
    //不存在用户，创建新用户
    $toke = md5($jsonData->openid . $jsonData->key);
    //echo $toke;
    $result = $pdo->query("insert into tb_wx_Login (codeid,usericon,username) values ('$toke','0','0')");
    if ($result) {
        $res = array(
            "code" => 200
        );
        $res["toke"] = $toke;
    } else {
        $res = array(
            "code" => 0
        );
        $res["selectData"] = $selectData;
    }
};

echo json_encode($res);
require_once('./closeConn.php');
// //入库
// require_once('./conn.php');
// $query = $pdo->query("select * from tb_wx_user where openid='$jsonData->openid'");
// $selectData = $query->fetch(PDO::FETCH_OBJ);
// if (!$selectData)   //不存在该用户 =》创建用户openid
//     {
//         $token=md5($jsonData->openid.$jsonData->key);
//         $result = $pdo->query("insert into tb_wx_user (openid,token,isError,errorTime) values ('$jsonData->openid','$token','0','0')");
//         if ($result) {
//             $res = array(
//                 "code" => 200
//             );
//             $res['token']= $token;
//         } else {
//             $res = array(
//                 "code" => 0
//             );
//         }
//     } else {
//     //用户存在
//     $res = array(
//         "code" => 100
//     );
//     $res['token']= $selectData->token;
// }

// if(strlen($selectData->mobile)==0){
//     $res["isFull"]=false;
// }else{
//     $res["isFull"]=true;
// }
// $res["id"]=$jsonData->openid;

// echo json_encode($res);
// require_once('../api/closeConn.php');
