<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class person_manage_model extends CI_Model {
    
    public function __construct()
    {
        parent::__construct();
        $this->load->database();
    }
    public function show_person_list($show_type='all',$type_val='all',$cur_page,$per_page_num)//展示类型，类型值，当前页，每页数
    {
        $cur_page = (int)$cur_page;
        $start = ($cur_page-1)*$per_page_num;
        if($show_type=='all'){
            $sql = "SELECT * FROM person LIMIT {$start},{$per_page_num}";
            $sql2 = "SELECT * FROM person";//页数sql
        }else{
            $sql = "SELECT * FROM person where {$show_type}='{$type_val}' LIMIT {$start},{$per_page_num}";
            $sql2 = "SELECT * FROM person where {$show_type}='{$type_val}'";
        }
        $query = $this->db->query($sql);
        $res = $query->result();
        $query2 = $this->db->query($sql);
        $page_num = count($query2->result());//总页数
        $data=array();
        foreach ($res as $key => $value) {
            $value->photo = '';
            $data['result'][] =$value;
        }
        $data['page_num']=$page_num;
        return $data;
    }
}
?>