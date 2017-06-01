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
    public function index()
    {
        $this->load->view('callRecordView');
    }
    public function insert_call_record()
    {
        $name = $this->input->post('name');
        if(!empty($name)){
            $lxdx = $this->input->post('lxdx');
            $address = $this->input->post('address');
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
            $lxrrybs = $_SESSION['user_rybs'];
            $aj_type = $this->input->post('aj_type');
            $ajbs = $this->input->post('ajbs');
            $data = $this->call->insert_call_record($name,$lxdx,$address,$phone,$date,$time,$lywj,$note,$result,$sfjt,$lxrxm,$lxryx,$lxrrybs,$aj_type,$ajbs);
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
    // 录音列表
    public function show_call_record_list()
    {
        $page = $this->input->post('page');
        if(!empty($page)){
            $perPageNum = $this->input->post('perPageNum');
        }
        $data = $this->call->show_call_record_list($page,$perPageNum);
        echo json_encode($data);
    }
    // 获取通话数据
    public function get_record_data()
    {
        $id = $this->input->post('id');
        if(!empty($id))
        {
            $data = $this->call->get_record_data($id);
            echo json_encode($data);
        }
    }
}