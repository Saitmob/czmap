<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class pointManage extends CI_Controller {
    
    public function __construct()
    {
        parent::__construct();
        $this->load->model('map_case_model','mapcase');
    }
    public function index(){
        $this->load->view('pointManageView');
    }
}