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
    public function insert_call_record()//插入或更新通话记录
    {
        $name = $this->input->post('name');
        if(!empty($name)){
            $id = $this->input->post('id');
            // var_dump($id);die();
            $lxdx = $this->input->post('lxdx');
            $address = $this->input->post('address');
            $phone = $this->input->post('phone');
            $date=$this->input->post('date');
            $time=$this->input->post('time');
            $lywj=$this->input->post('lywj');
            $lywj = (!empty($lywj))?(implode(',',$lywj)):'';
            $note=$this->input->post('note');
            $result=$this->input->post('result');
            $sfjt=$this->input->post('sfjt');
            $lxrxm=$_SESSION['user_name'];
            $lxryx=$_SESSION['user_email'];
            $lxrrybs = $_SESSION['user_rybs'];
            $aj_type = $this->input->post('aj_type');
            $ajbs = $this->input->post('ajbs');
            $in_or_out = $this->input->post('in_or_out');
            $data = $this->call->insert_call_record($id,$name,$lxdx,$address,$phone,$date,$time,$lywj,$note,$result,$sfjt,$lxrxm,$lxryx,$lxrrybs,$aj_type,$ajbs,$in_or_out);
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
    //删除录音文件
    public function delete_record_file()
    {
        $file_arr = $this->input->post('file_arr');
        if(!empty($file_arr)){
            foreach ($file_arr as $key => $value) {
                unlink('record/'.$value);
            }
        }
    }
    //删除通话记录
    public function delete_record_data()
    {
        $id = $this->input->post('id');
        if(!empty($id))
        {
            $data = $this->call->delete_record_data($id);
            echo $data;
        }
    }
    // 录音列表
    public function show_call_record_list()
    {
        $ajbs=$this->input->post('ajbs');
        if(!empty($ajbs)){
            $page = $this->input->post('page');
            $perPageNum = $this->input->post('perPageNum');
        }
        $data = $this->call->show_call_record_list($page,$perPageNum,$ajbs);
        echo json_encode($data);
    }
    //存在录音的案件列表
    public function show_aj_call_list()
    {
        $page = $this->input->post('page');
        if(!empty($page)){
            $perPageNum = $this->input->post('perPageNum');
            $show_type = $this->input->post('show_type');
            $type_val = $this->input->post('type_val');
        }
        $data = $this->call->show_aj_call_list($page,$perPageNum,$show_type,$type_val);
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
    
    public function get_person_by_phone()
    {
        $phone = $this->input->post('phone');
        if(!empty($phone))
        {
            $data = $this->call->get_person_by_phone($phone);
            echo json_encode($data);
        }
    }
    // 最小地址测试
    public function zxdzcs()
    {
        $this->load->library('regionmatch');
        $this->regionmatch->dsr_to_person();
    }
}