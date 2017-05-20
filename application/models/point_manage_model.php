<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class map_case_model extends CI_Model {
    
    public function __construct()
    {
        parent::__construct();
        $this->load->database();
        $this->load->library('regionmatch');
    }
    public function get_person_list(){
        
    }
}
?>