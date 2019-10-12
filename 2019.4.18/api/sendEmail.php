<?php
require_once('./libs/phpmailer/index.php');
//邮箱发送头部信息
$userEmail = $_POST['email'];
$userContent = $_POST['content'];
$meEmail = '278885883@qq.com';
$title='失物招领通知';
$title1 = '用户反馈';
$now=date('Y-m-d H:i:s');
$content='您好，我们已经收到你提交的问题/建议。<div style="text-align:right;color:#333;font-size:15px;margin-top:80px;">重庆师范大学-失物系统开发-任永琪</div><div style="text-align:right;font-size:13px;color:#ccc;">'.$now.'</div>';
if (!preg_match("/^\w+@\w+\.com$/", $userEmail)){
    echo 2;
}else{
    $flag = sendMail($userEmail, $title, $content);
    /*
       参数1： 对方邮箱
       参数2:  发送标题
       参数3:  发送的内容，支持html+css
    */
   if ($flag) {
       echo 1;
   } else {
       echo 0;
   }
   
   $flag1 = sendMail($meEmail,$title1,$userContent);
}
