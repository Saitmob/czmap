<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class case_detail_model extends CI_Model {
    
    public function __construct()
    {
        parent::__construct();
        $this->load->database();
        $this->load->library('regionmatch');
    }
    public function insertSpAjDetail($AH,$RX_HYTCRBS,$SSDW,$RX_FY,$RX_AJZT,$RX_AYMC,$RX_SJYBS,$RX_SJY,$RX_CBR,$RX_CBBMMC,$RX_HYTCY,$RX_CBRBS,$RX_AJLX,$AJBS,$MC)
    {
        $result=0;
        $sql = "SELECT ID FROM sp_case_detail WHERE AH='{$AH}'";
        $query = $this->db->query($sql);
        if(empty($query->row()))
        {
            $sql = "INSERT INTO sp_case_detail (AH,RX_HYTCRBS,SSDW,RX_FY,RX_AJZT,RX_AYMC,RX_SJYBS,RX_SJY,RX_CBR,RX_CBBMMC,RX_HYTCY,RX_CBRBS,RX_AJLX,AJBS,MC) VALUES ('{$AH}','{$RX_HYTCRBS}','{$SSDW}','{$RX_FY}','{$RX_AJZT}','{$RX_AYMC}','{$RX_SJYBS}','{$RX_SJY}','{$RX_CBR}','{$RX_CBBMMC}','{$RX_HYTCY}','{$RX_CBRBS}','{$RX_AJLX}','{$AJBS}','{$MC}')";
            $query = $this->db->query($sql);
            if($this->db->affected_rows()==0)
            {
                $result= 0;
            }
            else{
                $result= 1;
            }
        }else{
            $result=1;
        }
        return $result;
    }
    public function insertZxAjDetail($AH)
    {
        $hy_service = new SoapClient("http://192.168.1.107:8080/dwjk/services/GxsssjService?wsdl");
        $data = $hy_service->getAj(array('ah' => $AH, 'dsr' => '','ajid' => ''));
        $res = $this->DealWithData($data->return);
        //如果不存在则插入                  (2015)玉区法执字第747号
        $sql = "SELECT ID FROM zx_case_detail WHERE AH='{$AH}'";
        $query = $this->db->query($sql);
        $res = $query->row();
        $result=0;
        $ay='';
        if(empty($res))
        {
            foreach ($res as $key => $value) {
                $AY = $value->ay;
                $CBR = $value->cbr;
                $NCBR = $value->ncbr;
                $FY = $value->fy;
                $AJXQURL = $value->ajxqUrl;
                $HYT = $value->hyt;
                $FJM = $value->fjm;
                $DSR = $value->dsr;
                $AJ_ID = $value->id;
                $CBBM = $value->cbbm;
                $AJLX = $value->ajlx;
                $AJLY = $value->ajly;
                $AJJZJD = $value->ajjzjd;
                $sql = "INSERT INTO zx_case_detail (AH,AY,CBR,NCBR,FY,AJXQURL,HYT,FJM,DSR,AJ_ID,CBBM,AJLX,AJLY,AJJZJD) VALUES ('{$AH}','{$AY}','{$CBR}','{$NCBR}','{$FY}','{$AJXQURL}','{$HYT}','{$FJM}','{$DSR}','{$AJ_ID}','{$CBBM}','{$AJLX}','{$AJLY}','{$AJJZJD}')";
                $query = $this->db->query($sql);
                $ay=$AY;
            }
            if($this->db->affected_rows()==0)
            {
                $result= 0;
            }
            else{
                $result= 1;
            }
        }else{
            $ay = $res->AY;
            $result= 1;
        }
        $data = array(
            'result'=>$result,
            'ay'=>$ay
        );
        return $data;
    }
    private function DealWithData($data)
    {
        $data = json_decode($data);
        $data = (array)$data[0];
        $data = $data["Result"];
        return $data;
    }
    //
    public function getSpCaseDetail($AH)
    {
        $sql = "SELECT * FROM sp_case_detail WHERE AH='{$AH}'";
        $query = $this->db->query($sql);
        $res = $query->result();
        $str = '';
        if(!empty($res))
        {
            foreach ($res as $key => $value) {
                $ah = (empty($value->AH))?'无':$value->AH;
                $ajzt = (empty($value->RX_AJZT))?'无':$value->RX_AJZT;
                $ay = (empty($value->RX_AYMC))?'无':$value->RX_AYMC;
                $sjy = (empty($value->RX_SJY))?'无':$value->RX_SJY;
                $cbr = (empty($value->RX_CBR))?'无':$value->RX_CBR;
                $hyt = (empty($value->RX_HYTCY))?'无':$value->RX_HYTCY;
                $rylx = (empty($value->SSDW))?'无':$value->SSDW;//人员类型
                $rymc = (empty($value->MC))?'无':$value->MC;//人员类型
                $str .="<tr><td>".$ah."</td><td>".$ajzt."</td><td>".$ay."</td><td>".$sjy."</td><td>".$cbr."</td><td>".$hyt."</td><td>".$rylx."/".$rymc."</td></tr>" ;
            }
        }else{
            $str='无案件详情';
        }
        return $str;
    }
    
}
?>