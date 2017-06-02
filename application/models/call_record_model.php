<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class call_record_model extends CI_Model {
    private $ajxx;
    public function __construct()
    {
        parent::__construct();
        $this->load->database();
        $this->ajxx = $this->load->database('ajxq',true);
        $this->load->library('regionmatch');
    }
    
    public function insert_call_record($id,$name,$lxdx,$address,$phone,$date,$time,$lywj,$note,$result,$sfjt,$lxrxm,$lxryx,$lxrrybs,$aj_type,$ajbs)
    {
        //    $note = base64_decode($note);
        //    $result = base64_decode($result);
        $time = (strlen($time)>11)?substr($time,0,-3):$time;
        if($id==''){
            $sql = "INSERT INTO calling_history (lxdx,blxrxm,address,phone,call_date,call_time,lywj,lxrxm,lxryx,lxrrybs,sfjt,call_note,call_result,ajlx,ajbs)
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
            $query = $this->db->query($sql,array($lxdx,$name,$address,$phone,$date,$time,$lywj,$lxrxm,$lxryx,$lxrrybs,$sfjt,$note,$result,$aj_type,$ajbs));
        }else{
            $sql = "UPDATE calling_history SET lywj=?,call_note=?,call_result=?,sfjt=? WHERE id={$id}";
            $query=$this->db->query($sql,array($lywj,$note,$result,$sfjt));
        }
        return $this->db->affected_rows();
    }
    
    public function show_call_record_list($page,$perPageNum)
    {
        $page = (int)$page;
        $start = ($page-1)*$perPageNum;
        $qx_level = $_SESSION['user_qx_level'];
        $rybs = $_SESSION['user_rybs'];
        if($qx_level==1)
        {
            $sql = "SELECT id,blxrxm,lxdx,phone,call_date,sfjt FROM calling_history order by call_time DESC limit {$start},$perPageNum";
            $sql2 = "SELECT id from calling_history";
        }else{
            $sql = "SELECT id,blxrxm,lxdx,phone,call_date,sfjt FROM calling_history where lxrrybs='{$rybs}' order by call_time DESC limit {$start},$perPageNum";
            $sql2 = "SELECT id from calling_history where lxrrybs='{$rybs}'";
        }
        $query = $this->db->query($sql);
        $res = $query->result();
        $data = array();
        $data['result']=$res;
        $query = $this->db->query($sql2);
        $res = $query->result();
        $data['page_num']=count($res);
        return $data;
    }
    public function get_record_data($id)
    {
        $sql = "SELECT * from calling_history where id={$id}";
        $query = $this->db->query($sql);
        $res = $query->row();
        // echo $sql;
        // var_dump($res);die();
        return $res;
    }
}
?>