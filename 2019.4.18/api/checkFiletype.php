<?php
//判断上传文件是否是图片格式 
$arrFile=array(
    "fileName"=>$_FILES["file"]["name"],
    "fileSize"=>$_FILES["file"]["size"],
    "filePath"=>$_FILES["file"]["tmp_name"],
    "fileType"=>$_FILES["file"]["type"]
);
$picType=array('jpg','jpeg','png');
$uploadType=explode('.',$arrFile["fileName"]);//切割
if(!in_array( $uploadType[count($uploadType)-1],$picType)){
    echo "上传的文件格式不是图片!";
    return;
}else if($arrFile["fileSize"]>5120000){
    //判断是否超过5MB
    echo "上传的文件大小超过5MB";
    return;
}else if($_FILES["file"]["error"]>0){
    echo "上传发生错误";
    return;

}