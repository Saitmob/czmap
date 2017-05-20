<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class case_data_model extends CI_Model {
    private $ajxx;
    public function __construct()
    {
        parent::__construct();
        $this->load->database();
        $this->ajxx = $this->load->database('ajxq',true);
        $this->load->library('regionmatch');
    }
    
    public function get_case_base_data($aj_type,$aj_id)
    {
        $add_num=0;
        $add_dsr_num = 0;
        $add_cc_num = 0;
        $hytcy_name = array();
        $data = array();
        $sql = "SELECT * FROM {$aj_type}_ajxx WHERE aj_id = {$aj_id}";
        $query = $this->ajxx->query($sql);
        $res1 = $query->row();
        // 当事人
        $sql = "SELECT * FROM {$aj_type}_dsr WHERE aj_id = {$aj_id}";
        $query = $this->ajxx->query($sql);
        $res2 = $query->result();
        $add_dsr_num=count($res2);
        // 财产
        $sql = "SELECT * FROM {$aj_type}_ccszd WHERE aj_id = {$aj_id}";
        $query = $this->ajxx->query($sql);
        $res3 = $query->result();
        $add_cc_num=count($res3);
        $add_num = $add_dsr_num+$add_cc_num;
        // 合议庭成员
        $sql = "SELECT xm,jsmc FROM {$aj_type}_hytcy WHERE aj_id = {$aj_id}";
        $query = $this->ajxx->query($sql);
        $res4 = $query->result();
        foreach ($res4 as $key => $value) {
            $hytcy_name[] = $value->xm."（".$value->jsmc."）";
        }
        $hytcy_name = implode('、',$hytcy_name);
        $data = array(
            'AH'=>$res1->ah,
            'LARQ'=>$res1->larq,
            'COURT'=>$res1->fymc,
            'AY'=>$res1->ay,
            'BDJE'=>$res1->bdje,
            'ADD_NUM'=>$add_num,
            'ADD_DSR_NUM'=>$add_dsr_num,
            'ADD_CC_NUM'=>$add_cc_num,
            'HYTCY'=>$hytcy_name,
        );
        return $data;
    }
}
?>