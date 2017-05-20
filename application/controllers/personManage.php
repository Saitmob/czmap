<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class personManage extends CI_Controller {
    
    public function __construct()
    {
        parent::__construct();
        $this->load->model('person_manage_model','person');
    }
    public function index()
    {
        $this->load->view('personManageView');
    }
    public function show_person_list()
    {
        $show_type = $this->input->post('show_type');
        // var_dump($show_type);
        if(!empty($show_type))
        {
            $type_val = $this->input->post('type_val');
            $cur_page = $this->input->post('cur_page');
            $per_page_num = $this->input->post('per_page_num');
            $data=$this->person->show_person_list($show_type,$type_val,$cur_page,$per_page_num);
            echo json_encode($data);
        }
        
    }
}