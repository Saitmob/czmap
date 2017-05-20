<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class FileUpload extends CI_Controller {
    
    public function __construct()
    {
        parent::__construct();
        $this->load->model('file_upload_model','file');
    }
    public function index()
    {
        $file_name = iconv('utf-8','GBK',$_FILES["files"]["name"][0]);
        // move_uploaded_file($_FILES["files"]["tmp_name"][0],"upload/" .$file_name);
        $file_name = explode('.',$_FILES["files"]["name"][0]);
        // if($file_name!='png')
        $file_name = time().'.'.$file_name[1];
        $file_path = "upload/" .$file_name;
        $file_size = $_FILES["files"]['size'][0];
        $upload_res = move_uploaded_file($_FILES["files"]["tmp_name"][0],"upload/" .$file_name);
        $upload_user = 'gyqinxp@gxfy.com';
        // $user = $_REQUEST['user-email'];
        if(isset($_REQUEST['photoId'])){
            $photo_id = $_REQUEST['photoId'];
        }else{
            $photo_id=0;
        }
        $update_result = $this->file->insertFile($file_path,$upload_user,$photo_id);
        $data=array(
        'files'=>$_FILES,
        'file_path'=>$file_path,
        'upload_res_tips'=>$upload_res,
        'file_id'=>$update_result
        );
        echo json_encode($data);
    }
    
}