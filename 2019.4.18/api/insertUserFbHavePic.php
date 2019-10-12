<?php
require_once('./checkFiletype.php');
require_once('./conn.php');
header('content-type:application/json;charset=utf-8');
$theSomething = $_POST['theSomething'];
$thePlace = $_POST['thePlace'];
$time = time();
$toke = $_POST['toke'];
$files = $_FILES['file'];
$state = $_POST['state'];
$isSubmitPicAgain=$_POST["isSubmitPicAgain"];
if($isSubmitPicAgain)
{
    //不是第一次传输，避免重复数据不进行操作    
}else{
    //如果是第一次传输图片，则插入其他数据
    $result = $pdo->query("insert into tb_wx_fb (codeid,name,place,date,state) values ('$toke','$theSomething','$thePlace','$time','$state')");
}
  $query = $pdo->query("select id from tb_wx_fb where codeid = '$toke' order by date desc limit 1 ");//查询当前toke降序第一条数据的lostid
  $queryy = $query->fetch(PDO::FETCH_OBJ);
if($queryy){
    $picid = $queryy->id;
 
        $newName=md5(date("YmdHis")).$_FILES["file"]["name"];
        if(move_uploaded_file($_FILES["file"]["tmp_name"],"../wx-picklist/".$newName)){
            $queryyy = $pdo->query("insert into tb_wx_fb_pic (picid,picsrc) values ('$picid','$newName')");
            if($queryyy){
                echo 1;
            }else{
                echo 0;
            }
        }
    
    
}
require_once('./closeConn.php');

