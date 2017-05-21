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
            $sql = "SELECT name, sex, csny, duty, address, phone  FROM person WHERE 1=1 ".$status." ORDER BY id ASC LIMIT ?,?";
            $count_sql = "SELECT count(0) as total FROM person WHERE 1=1 ".$status;
            $query = $this->db->query($sql,array($start, $per_page_num));
            $count_query = $this->db->query($count_sql);
        }
        else
        {
            $status .= " AND a.xian = '{$range}'";
            $sql = "SELECT c.name, c.sex, c.csny, c.duty, c.address, c.phone  FROM cz_gis_library AS a LEFT JOIN person_add_lib AS b ON a.ID = b.gis_id LEFT JOIN person AS c ON b.person_id = c.id WHERE 1 = 1 ".$status." ORDER BY c.id ASC LIMIT ?,?";
            //echo "SELECT c.name, c.sex, c.csny, c.duty, c.address, c.phone  FROM cz_gis_library_copy AS a LEFT JOIN person_add_lib AS b ON a.ID = b.gis_id LEFT JOIN person AS c ON b.person_id = c.id WHERE 1 = 1 ".$status." ORDER BY c.id ASC LIMIT 0,8";die(); 
            $count_sql = "SELECT count(0) as total FROM cz_gis_library AS a LEFT JOIN person_add_lib AS b ON a.ID = b.gis_id LEFT JOIN person AS c ON b.person_id = c.id WHERE 1 = 1 ".$status;
            $query = $this->db->query($sql, array($start, $per_page_num));
            $count_query = $this->db->query($count_sql);
        }
        $data['result'] = $query->result_array();
        $row = $count_query->row_array();
        $data['page_num'] = $row['total'];
        return $data;
    }

/*    public function query_range($range)
    {
        if ($range == "all") 
        {
            $sql = "SELECT name, sex, csny, duty, address, phone  FROM person ";
            $query = $this->db->query($sql);
        }
        else
        {
            $sql = "SELECT c.name, c.sex, c.csny, c.duty, c.address, c.phone  FROM cz_gis_library_copy AS a LEFT JOIN person_add_lib AS b ON a.ID = b.gis_id LEFT JOIN person AS c ON b.person_id = c.id WHERE a.ADDRESS = ?";
            $query = $this->db->query($sql, array($range));
        }
        $result = $query->result_array();
        return $result;
    }*/

    public function get_range_child_id($range)
    {
        if (!strpos($range, ",")) {
            $sql = "SELECT id FROM cz_gis_library_copy WHERE ADDRESS = ?";
            $query = $this->db->query($sql,array($range));
            $sql = "SELECT id FROM cz_gis_library_copy WHERE P_ID = ?";
            $row = $query->row_array();
            $query = $this->db->query($sql,array($row['id']));
        }
        else{
            $sql = "SELECT id FROM cz_gis_library_copy WHERE P_ID in (?)";
            $query = $this->db->query($sql,array($range));
        }
        $result = $query->result_array;
        foreach ($result as $key => $value) 
        {
            $pid .= $value['id'].",";
        }
        if ($key > 0) {
            $pid = substr($pid, 0, -1);
            $sql = "SELECT id FROM cz_gis_library_copy WHERE P_ID IN (?)";
            $query = $this->db->query($sql, array($pid));
        }
        else{
            $pid = substr($pid, 0, -1);
            $sql = "SELECT id FROM cz_gis_library_copy WHERE P_ID = ?";
            $query = $this->db->query($sql, array($pid));            
        }
        $result = $query->result_array();
        if (empty($result)) {
            return $pid;
        }
        else{
            return $this->get_range_child_id($pid);
        }
    }
}
?>