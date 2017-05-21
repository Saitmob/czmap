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

    public function show_list($range, $persontype, $name, $cur_page, $per_page_num)
    {
        $per_page_num = (int)$per_page_num;
        $cur_page = (int)$cur_page;
        $start = ($cur_page-1)*$per_page_num;
        $status = "";
        if ($name != "") 
        {
            $status .= " AND name = '{$name}'";
        }
        if ($persontype != "all") 
        {
            $status .= " AND rybs = '{$persontype}'";
        }
        if ($range == "all") 
        {
            $sql = "SELECT id, name, sex, csny, duty, address, phone, rybs  FROM person WHERE 1=1 ".$status." ORDER BY id ASC LIMIT ?,?";
            $count_sql = "SELECT count(0) as total FROM person WHERE 1=1 ".$status;
            $query = $this->db->query($sql,array($start, $per_page_num));
            $count_query = $this->db->query($count_sql);
        }
        else
        {
            $status .= " AND c.xian = '{$range}'";
            $sql = "SELECT a.id, a.name, a.sex, a.csny, a.duty, a.address, a.phone , a.rybs  FROM person AS a LEFT JOIN person_add_lib AS b ON a.ID = b.person_id LEFT JOIN cz_gis_library AS c ON b.gis_id = c.id WHERE 1 = 1 ".$status." ORDER BY c.id ASC LIMIT ?,?";
            //echo "SELECT c.name, c.sex, c.csny, c.duty, c.address, c.phone  FROM cz_gis_library_copy AS a LEFT JOIN person_add_lib AS b ON a.ID = b.gis_id LEFT JOIN person AS c ON b.person_id = c.id WHERE 1 = 1 ".$status." ORDER BY c.id ASC LIMIT 0,8";die(); 
            $count_sql = "SELECT count(0) as total FROM person AS a LEFT JOIN person_add_lib AS b ON a.ID = b.person_id LEFT JOIN cz_gis_library AS c ON b.gis_id = c.id WHERE 1 = 1 ".$status;
            $query = $this->db->query($sql, array($start, $per_page_num));
            $count_query = $this->db->query($count_sql);
        }
        $data['result'] = $query->result_array();
        $row = $count_query->row_array();
        $data['page_num'] = $row['total'];
        return $data;
    }

}
?>