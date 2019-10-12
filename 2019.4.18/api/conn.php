<?php
header('content-type:application/json;charset=utf-8');
$dbName = 'qdm214563686_db';                       //数据库名称
$dbms = 'mysql';                                   //数据库类型
$host = 'qdm214563686.my3w.com';                   //数据库地址
$user = 'qdm214563686';                            //连接用户名
$pwd = 'Ryq19970210...';                              //连接密码
$dsn="$dbms:host=$host;dbname=$dbName";
try {
   $pdo = new PDO($dsn, $user, $pwd);
   $pdo->query("set names utf8");
   // echo "成功";
} catch (PDOException $e) {
   echo "erorr:" . $e->getMessage();
}
?>