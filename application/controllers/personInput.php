<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class personInput extends CI_Controller {
    
    public function __construct()
    {
        parent::__construct();
        $this->load->model('map_case_model','mapcase');
    }
    // public function excel_out(){
    //     header("Content-type:text/html");
    //     header("Content-Disposition:attachment;filename=123.xls");
    //     $array=$this->db->get("city")->result_array();
    //     $str="id\t"."name\t"."pid\n";
    //     foreach($array as $val){
    //         $str.=$val['id']."\t".$val['name']."\t".$val['pid']."\n";
    //     }
    //     echo $str;
    // }
    //从excel导入到数据表
    public function excel_put(){
        //先做一个文件上传，保存文件
        $path=$_FILES['file'];
        // var_dump($_FILES);die();
        // $filePath = "upload/".$path["name"];
        $fileType = explode('.',$path["name"]);
        $fileType = $fileType[1];
        // var_dump($fileType);die();
        $filePath = "upload/tmp.".$fileType;
        move_uploaded_file($path["tmp_name"],$filePath);
        //$data=array('B'=>'name','C'=>'pwd','D'=>'money1','E'=>'salt');
        // $data=array('B'=>'name','C'=>'pid');
        // $tablename='city2';//表名字
        $this->excel_fileput($filePath);
    }
    private function excel_fileput($filePath){
        $this->load->library("phpexcel");//ci框架中引入excel类
        $fileType = explode('.',$filePath);
        $fileType = $fileType[1];
        // var_dump($fileType);
        // var_dump($filePath);
        $PHPExcel = new PHPExcel();
        if($fileType=='xlsx')
        {
            $PHPReader = new PHPExcel_Reader_Excel2007();
        }elseif($fileType=='xls'){
            $PHPReader = new PHPExcel_Reader_Excel5();
        }
        
        // if(!$PHPReader->canRead($filePath)){
        //     $PHPReader = new PHPExcel_Reader_Excel5();
        //     if(!$PHPReader->canRead($filePath)){
        //         echo 'no Excel';
        //         // return ;
        //     }
        // }
        // 加载excel文件
        $PHPExcel = $PHPReader->load($filePath);
        
        // 读取excel文件中的第一个工作表
        $currentSheet = $PHPExcel->getSheet(0);
        // 取得最大的列号
        $allColumn = $currentSheet->getHighestColumn();
        // 取得一共有多少行
        $allRow = $currentSheet->getHighestRow();
        $data = array();
        $sql = 'INSERT INTO cz_person (USER_EMAIL,USER_NAME,USER_SEX,USER_AGE,USER_DUTY,USER_PHONE,USER_INTRO,OPERATOR) VALUES ';
        $firstValue = $currentSheet->getCellByColumnAndRow(ord('A') - 65,1)->getValue();
        if($firstValue!='邮箱')
        {
            echo 0;
        }else{
            // 从第二行开始输出，因为excel表中第一行为列名
            for($currentRow = 2;$currentRow <= $allRow;$currentRow++){
                /**从第A列开始输出*/
                
                $sql .='(';
                for($currentColumn= 'A';$currentColumn<= $allColumn; $currentColumn++){
                    $val = $currentSheet->getCellByColumnAndRow(ord($currentColumn) - 65,$currentRow)->getValue();
                    $sql .= "'{$val}',";
                    var_dump($val);
                }
                // $sql .= "'".$_SESSION['user_email']."'";
                $sql .= '),';
                // foreach($data as $key=>$val){
                //     $data2[$val]=$data1[$key];
                // }
                // $this->db->insert($tablename,$data2);
                //print_r($data2);
                //echo "</br>";
            }
            $sql = substr($sql,0,-1);
            //echo "\n";
            // echo $this->mapcase->sqlTabl($sql);
        }
        
    }

    // 调java接口上传
    public function input_person()
    {
        $path=$_FILES['file'];
        // var_dump($_FILES);die();
        // $filePath = "upload/".$path["name"];
        $fileType = explode('.',$path["name"]);
        $fileType = $fileType[count($fileType)-1];
        $filePath = "upload/tmp.".$fileType;
        $fileSize = $path['size'];
        move_uploaded_file($path["tmp_name"],$filePath);
        $handle = fopen($filePath,'rb');
        $content = fread($handle,$fileSize);
        fclose($handle); 
        $content = base64_encode($content);
        // var_dump($content);die();
        $soap = new SoapClient("http://192.168.118.16:8080/services/dyhjmd/RyxxService?wsdl");
        $json_str = '{"excelFile":"'.$content.'","fileSuffix":"'.$fileType.'"}';
        // $json_str = mb_convert_encoding($json_str,'GB2312','UTF-8');
        // $json_str = mb_check_encoding($json_str,'UTF-8');
        // var_dump($json_str) ;
        // $json_str = base64_encode($json_str);
        // $json_str = iconv('GB2312','UTF-8',$json_str);
        // $p = array('excelFile'=>$json_str);
        // var_dump($p);die();
        $res=$soap->saveRyxx($json_str);
        var_dump($res);
    }
}