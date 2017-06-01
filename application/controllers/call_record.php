<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class call_record extends CI_Controller {
    
    public function __construct()
    {
        parent::__construct();
        // $this->load->model('map_case_model','mapcase');
        $this->load->model('call_record_model','call');
    }
    //
    public function insert_call_record()
    {
        $name = $this->input->post('name');
        if(!empty($name)){
            $lxdx = $this->input->post('lxdx');
            $phone = $this->input->post('phone');
            $date=$this->input->post('date');
            $time=$this->input->post('time');
            $lywj=$this->input->post('lywj');
            $lywj = implode(',',$lywj);
            $note=$this->input->post('note');
            $result=$this->input->post('result');
            $sfjt=$this->input->post('sfjt');
            $lxrxm=$_SESSION['user_name'];
            $lxryx=$_SESSION['user_email'];
            $data = $this->call->insert_call_record($name,$lxdx,$phone,$date,$time,$lywj,$note,$result,$sfjt,$lxrxm,$lxryx);
            echo $data;
        }
    }
    
    public function upload_record_file()
    {
        $file_name = $_FILES["files"]["name"][0];
        if(!is_dir('record'))
        {
            mkdir('record', 0777);
        }
        $res = move_uploaded_file($_FILES["files"]["tmp_name"][0],"record/" .$file_name);
        echo $res;
    }
    public function delete_record_file()
    {
        $file_arr = $this->input->post('file_arr');
        if(!empty($file_arr)){
            foreach ($file_arr as $key => $value) {
                unlink('record/'.$value);
            }
        }
    }
}