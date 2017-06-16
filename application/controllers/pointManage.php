<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class pointManage extends CI_Controller {
    
    public function __construct()
    {
        parent::__construct();
        $this->load->model('point_manage_model','pointmm');
    }
    public function index(){
        $this->load->view('pointManageView');
    }
    public function show_dsr_list()
    {
        $ajbs = $this->input->post('ajbs');
        if(!empty($ajbs))
        {
            $aj_type = $this->input->post('aj_type');
            $page = $this->input->post('page');
            $perPageNum = $this->input->post('perPageNum');
            $data=$this->pointmm->show_dsr_list($ajbs,$aj_type,$page,$perPageNum);
            echo json_encode($data);
        }
    }
    //拿到某个当事人对应网格员和调解员的姓名和地址
    public function get_wgy_tjy()
    {
        $dsr_id = $this->input->post('dsr_id');
        if(!empty($dsr_id))
        {
            $aj_type = $this->input->post('aj_type');
            $data = $this->pointmm->get_wgy_tjy($dsr_id,$aj_type);
            echo json_encode($data);
        }
    }
    //通过gis_id拿到它下面的网格员或调解员
    public function get_wgy_tjy_by_gisid()
    {
        $gis_id = $this->input->post('gis_id');
        if(!empty($gis_id))
        {
            $p_type = $this->input->post('p_type');
            $data = $this->pointmm->get_wgy_tjy_by_gisid($gis_id,$p_type);
            echo json_encode($data);
        }
    }
    //修改当事人坐标以及网格员和调解员信息
    public function save_dsr_p_w_t()
    {
        $dsr_id = $this->input->post('dsr_id');
        if(!empty($dsr_id))
        {
            $aj_type = $this->input->post('aj_type');
            $person_id_str = $this->input->post('person_id_str');
            $point = $this->input->post('point');
            $data = $this->pointmm->save_dsr_p_w_t($dsr_id,$aj_type,$person_id_str,$point);
            echo $data;
        }
    }
}