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
    
    public function insert_call_record($name,$lxdx,$phone,$date,$time,$lywj,$note,$result,$sfjt,$lxrxm,$lxryx)
    {
        //    $note = base64_decode($note);
        //    $result = base64_decode($result);
        $time = (strlen($time)>11)?substr($time,0,-3):$time;
        $sql = "INSERT INTO calling_history (lxdx,blxrxm,phone,call_date,call_time,lywj,lxrxm,lxryx,sfjt,call_note,call_result)
        VALUES (?,?,?,?,?,?,?,?,?,?,?)";
        $query = $this->db->query($sql,array($lxdx,$name,$phone,$date,$time,$lywj,$lxrxm,$lxryx,$sfjt,$note,$result));
        return $this->db->affected_rows();
    }
}
?>