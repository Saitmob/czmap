<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Uploadfile extends CI_Controller {
	
	public function __construct()
	{
		parent::__construct();
		$this->load->helper('url');
	}

    public function upload()
    {
        $rootdir = "person_photo/";
        $message = '';
        $max_size = 200000000;
        $file = $_FILES['files'];
        if (!is_dir($rootdir)) {
            mkdir ($rootdir,0777,true);
        }
        if ($file['size'][0] <= $max_size && $file['size'][0] > 0) {
            $return_name = substr($file['name'][0], 0, strrpos($file['name'][0], "."));
            $houzhui = substr($file['name'][0],strrpos($file['name'][0], "."));
            $new_name = time().rand(100,999).$houzhui;
            $new_dir = $rootdir . $new_name;
            $return_dir = $rootdir . $new_name;
            $copied = move_uploaded_file($file['tmp_name'][0], $new_dir);
            if ($copied) {
                $message = '1';
            } 
            else {
                $message = '0';
            }
        } 
        else {
            $message = '0';
        }
        echo json_encode(array("result" => $message,"filename" => $return_name,"filedir" => $return_dir,"filetype" => $_FILES['files']['type'][0]));
    }

    /*public function upload()
    {
        $file = $_FILES['files'];
        $return_dir = date('Y-m',time());
        $return_name = substr($file['name'][0], 0, strrpos($file['name'][0], "."));
        $PSize = filesize($file['tmp_name'][0]);
        $picturedata = fread(fopen($file['tmp_name'][0], "r"), $PSize);
        $picturedata = base64_encode($picturedata);
        $picturedata = "data:".$_FILES['files']['type'][0].";base64,".$picturedata;
        //$picturedata = addslashes($picturedata);
        $message = 1;
        echo json_encode(array("result" => $message,"filename" => $return_name,"file" => $picturedata,"filetype" => $_FILES['files']['type'][0]));
    }
    */

}