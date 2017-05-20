<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class case_data extends CI_Controller {
    
    public function __construct()
    {
        parent::__construct();
        // $this->load->model('map_case_model','mapcase');
        $this->load->model('case_data_model','case');
    }
    //
    public function get_case_base_data()
    {
        $aj_id = $this->input->post('aj_id');
        if(!empty($aj_id))
        {
            $aj_type = $this->input->post('aj_type');
            $data = $this->case->get_case_base_data($aj_type,$aj_id);
            echo json_encode($data);
        }
    }
}