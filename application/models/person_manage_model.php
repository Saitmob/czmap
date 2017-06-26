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
            $status .= " AND a.name = '{$name}'";
        }
        if ($persontype != "all")
        {
            $status .= " AND a.rybs = '{$persontype}'";
        }
        if ($range == "all")
        {
            $sql = "SELECT a.id, name, sex, csny, duty, phone, rybs, concat(b.county, b.town, b.village) as address  FROM person AS a LEFT JOIN person_add_lib AS b ON a.id = b.PERSON_ID WHERE 1=1 ".$status." GROUP BY a.id ORDER BY a.id ASC LIMIT ?,?";
            $count_sql = "SELECT count(0) as total FROM person as a WHERE 1=1 ".$status;
            $query = $this->db->query($sql,array($start, $per_page_num));
            $count_query = $this->db->query($count_sql);
        }
        else
        {
            $status .= " AND b.county = '{$range}'";
            $sql = "SELECT a.id, a.name, a.sex, a.csny, a.duty, a.phone , a.rybs, concat(b.county, b.town, b.village) as address  FROM person AS a LEFT JOIN person_add_lib AS b ON a.ID = b.person_id  WHERE 1 = 1 ".$status." GROUP BY a.id ORDER BY a.id ASC LIMIT ?,?";
            //echo $sql;die();
            //echo "SELECT c.name, c.sex, c.csny, c.duty, c.address, c.phone  FROM cz_gis_library_copy AS a LEFT JOIN person_add_lib AS b ON a.ID = b.gis_id LEFT JOIN person AS c ON b.person_id = c.id WHERE 1 = 1 ".$status." ORDER BY c.id ASC LIMIT 0,8";die();
            $count_sql = "SELECT count(DISTINCT(a.id)) as total FROM person AS a LEFT JOIN person_add_lib AS b ON a.ID = b.person_id  WHERE 1 = 1 ".$status;
            $query = $this->db->query($sql, array($start, $per_page_num));
            $count_query = $this->db->query($count_sql);
        }
        $data['result'] = $query->result_array();
        $row = $count_query->row_array();
        $data['page_num'] = $row['total'];
        return $data;
    }
    //区域等级赋值
    public function update_gis_lib()
    {
        $sql = "SELECT ID,ADDRESS,P_ID FROM cz_gis_library_copy_01 ";
        $query= $this->db->query($sql);
        $res = $query->result();
        foreach ($res as $key => $value) {
            $pId=$value->P_ID;
            $add = array();
            $ad_id=array();
            $l = 1;
            $level;
            $add[1] = $value->ADDRESS;
            $ad_id[1] = $value->ID;
            if($pId!=0)
            {
                $l++;
            }
            while ($pId!='0') {
                // var_dump('pid: '.$pId.'; ');
                $sql = "SELECT ID,ADDRESS,P_ID FROM cz_gis_library_copy_01 WHERE ID={$pId}";
                $query= $this->db->query($sql);
                $res1 = $query->row();
                // if($key>=150)
                // {
                //     var_dump($res1);die();
                // }
                $pId = $res1->P_ID;
                $add[$l] = $res1->ADDRESS;
                $ad_id[$l] = $res1->ID;
                // else{
                //     $add[$l+1]=$res1->ADDRESS;
                //     $ad_id[$l+1]=$res1->ID;
                // }
                
                if($pId!=0)
                {
                    $l++;
                }
                
            }
            krsort($add);
            krsort($ad_id);
            $xian = null;
            $village = null;
            $cun = null;
            $tun = null;
            $xian_id = null;
            $village_id = null;
            $cun_id = null;
            $tun_id = null;
            
            switch ($l) {
                case 1:
                    $xian = $add[1];
                    $xian_id = $ad_id[1];
                    
                    break;
                case 2:
                    $xian = $add[2];
                    $xian_id = $ad_id[2];
                    $village = $add[1];
                    $village_id = $ad_id[1];
                    break;
                case 3:
                    $xian = $add[3];
                    $xian_id = $ad_id[3];
                    $village = $add[2];
                    $village_id = $ad_id[2];
                    $cun = $add[1];
                    $cun_id = $ad_id[1];
                    break;
        }
        $level = $l+2;
        // var_dump($xian);
        // var_dump($village);
        // var_dump($cun);
        $sql = "UPDATE cz_gis_library_copy_01 SET level=?,xian=?,village=?,cun=?,tun=?,xianId=?,villageId=?,cunId=?,tunId=? WHERE ID=?";
        $query = $this->db->query($sql,array($l,$xian,$village,$cun,$tun,$xian_id,$village_id,$cun_id,$tun_id,$value->ID));
        echo $value->ID.'：'.$this->db->affected_rows().'<br>';
    }
}
public function insert_tun()
{
    $sql="SELECT
    a.tun,
    d.ID AS P_ID,
    a.county AS xian,
    b.ID AS xianId,
    a.town AS village,
    c.ID AS villageId,
    a.village AS cun,
    d.ID AS cunId 
    FROM
    (
    SELECT
    county,
    town,
    village,
    tun
    FROM
    person_add_lib
    WHERE
    tun IS NOT NULL
    AND tun != ''
    GROUP BY
    tun
    ) a
    LEFT JOIN (
    SELECT
    replace(ADDRESS,' ','') AS ADDRESS,
    ID
    FROM
    cz_gis_library_copy_01
    ) b ON a.county = b.ADDRESS 
    LEFT JOIN (
    SELECT
    replace(ADDRESS,' ','') AS ADDRESS,
    ID
    FROM
    cz_gis_library_copy_01
    ) c ON a.town = c.ADDRESS 
    LEFT JOIN (
    SELECT
    replace(ADDRESS,' ','') AS ADDRESS,
    ID
    FROM
    cz_gis_library_copy_01
    ) d ON a.village = d.ADDRESS 
    WHERE
    a.tun IS NOT NULL
    AND a.tun != ''
    GROUP BY
    a.tun";
    $query= $this->db->query($sql);
    $res = $query->result();
    // var_dump($res);
    $data=array();
    $id=969;
    foreach ($res as $key => $value) {
        $p_id = (!empty($value->P_ID))?$value->P_ID:'null';
        $xianId = (!empty($value->xianId))?$value->xianId:'null';
        $villageId = (!empty($value->villageId))?$value->villageId:'null';
        $cunId = (!empty($value->cunId))?$value->cunId:'null';
        $data[]="('{$value->tun}',{$p_id},'{$value->xian}','{$value->village}','{$value->cun}','{$value->tun}',6,{$xianId},{$villageId},{$cunId},{$id})";
        $id++;
    }
    // var_dump($data);die();
    $str = implode(",",$data);
    // echo $str;die();
    $sql = "INSERT INTO cz_gis_library_copy_01 (ADDRESS,P_ID,xian,village,cun,tun,level,xianId,villageId,cunId,tunId) VALUES $str";
    $query= $this->db->query($sql);
    echo $this->db->affected_rows().'<br>';
}
}
?>