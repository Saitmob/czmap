<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class case_detail_model extends CI_Model {
    
    public function __construct()
    {
        parent::__construct();
        $this->load->database();
        //$this->load->library('regionmatch');
    }
    public function insertAjDetail($AH,$RX_HYTCRBS,$SSDW,$RX_FY,$RX_AJZT,$RX_AYMC,$RX_SJYBS,$RX_SJY,$RX_CBR,$RX_CBBMMC,$RX_HYTCY,$RX_CBRBS,$RX_AJLX,$AJBS,$MC)
    {
        $result=0;
        $sql = "SELECT ID FROM sp_case_detail WHERE AH='{$AH}'";
        $query = $this->db->query($sql);
        $row = $query->row();
        if(empty($row))
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
    public function getCaseDetail($an_hao,$type)
    {
        $sjzx  = $this->load->database("sjzx",true);
        if ($type != "zx") {
            $table = $type."ajjbxx";
            $sql = "(
            SELECT
            AH ,/*案号*/
            '民事' as AJLX,/*案件类型*/
            ajlyxmc ,/*案件来源*/
            SDSZRQ  ,/*收到诉状日期*/
            LAAYMC AS ZZMMC,/*案由*/
            LABM,/*立案部门*/
            SADJRMC,/*收案登记人*/
            SPRMC,/*收案登记人*/
            LASPRQ,/*立案审批日期*/
            LARQ,/*立案日期*/
            CBSPT,/*承办审判庭*/
            cbrmc,/*承办人*/
            SXQSRQ,/*审限起始日期*/
            SXJMRQ,/*审限届满日期*/
            AJJZJDMC/*案件进展阶段*/
            from
            msysajjbxx
            WHERE
            AJBS = ?
            )
            UNION
            (
            SELECT
            AH,
            '民事' AS AJLX,
            ajlyxmc,
            SDSZRQ,
            LAAYMC AS ZZMMC,
            LABM,
            SADJRMC,
            SPRMC,
            LASPRQ,
            LARQ,
            CBSPT,
            cbrmc,
            SXQSRQ,
            SXJMRQ,
            AJJZJDMC
            FROM
            msesajjbxx
            WHERE
            AJBS = ?
            )
            UNION
            (
            SELECT
            AH ,/*案号*/
            '刑事' as AJLX,/*案件类型*/
            ajlyxmc ,/*案件来源*/
            SDSZRQ  ,/*收到诉状日期*/
            QSZZMMC AS ZZMMC,/*案由*/
            LABM,/*立案部门*/
            SADJRMC,/*收案登记人*/
            SPRMC,/*收案登记人*/
            LASPRQ,/*立案审批日期*/
            LARQ,/*立案日期*/
            CBSPT,/*承办审判庭*/
            cbrmc,/*承办人*/
            SXQSRQ,/*审限起始日期*/
            SXJMRQ,/*审限届满日期*/
            AJJZJDMC/*案件进展阶段*/
            FROM
            xsysajjbxx
            WHERE
            AJBS = ?
            )
            UNION
            (
            SELECT
            AH ,/*案号*/
            '刑事' as AJLX,/*案件类型*/
            ajlyxmc ,/*案件来源*/
            SDSZRQ  ,/*收到诉状日期*/
            ZZMMC,/*案由*/
            LABM,/*立案部门*/
            SADJRMC,/*收案登记人*/
            SPRMC,/*收案登记人*/
            LASPRQ,/*立案审批日期*/
            LARQ,/*立案日期*/
            CBSPT,/*承办审判庭*/
            cbrmc,/*承办人*/
            SXQSRQ,/*审限起始日期*/
            SXJMRQ,/*审限届满日期*/
            AJJZJDMC/*案件进展阶段*/
            FROM
            xsesajjbxx
            WHERE
            AJBS = ?
            )
            UNION
            (
            SELECT
            AH,
            '行政' AS AJLX,
            ajlyxmc,
            SDSZRQ,
            laaymc AS ZZMMC,
            LABM,
            SADJRMC,
            SPRMC,
            LASPRQ,
            LARQ,
            CBSPT,
            cbrmc,
            SXQSRQ,
            SXJMRQ,
            AJJZJDMC
            FROM
            xzysajjbxx
            WHERE
            AJBS = ?
            )
            UNION
            (
            SELECT
            AH,
            '行政' AS AJLX,
            ajlyxmc,
            SDSZRQ,
            laaymc AS ZZMMC,
            LABM,
            SADJRMC,
            SPRMC,
            LASPRQ,
            LARQ,
            CBSPT,
            cbrmc,
            SXQSRQ,
            SXJMRQ,
            AJJZJDMC
            FROM
            xzesajjbxx
            WHERE
            AJBS = ?
            )";
            $query = $sjzx->query($sql,array($an_hao,$an_hao,$an_hao,$an_hao,$an_hao,$an_hao));
            $result['ajjbxx'] = $query->row_array();
            $sql = "SELECT
                    a.xm AS xingming,
                    a.xb AS xingbie,
                    a.mz AS minzu,
                    a.ssdw AS susongdiwei,
                    a.sfzh AS shenfengzheng,
                    a.lxdh AS shouji,
                    a.dsr_type AS dangshirenleixing,
                    a.frdb AS farenmingcheng,
                    a.ajbs,
                    b.zzjgdm as farenjigou
                FROM
                    inputaj.sp_dsr AS a
                LEFT JOIN (
                    SELECT
                        *
                    FROM
                        sjzx.ajdsrxx
                    WHERE
                        ajbs = ?
                ) AS b ON a.xm = b.DSRMC
                WHERE
                    a.ajbs = ?
                group by xingming";
            $query = $sjzx->query($sql,array($an_hao, $an_hao));
            $result['dsr'] = $query->result_array();            
        }
        else{
            $table = $type."ajjbxx";
            $sql = "SELECT AH,
            SATJMC,
            AJLYMC,
            SDCLRQ,
            SQZXBDJE,
            LAAYMC,
            LABM,
            SADJRMC,
            SCRMC,
            SCRQ,
            SPRMC,
            LASPRQ,
            SPYJMC,
            LARQ,
            JSRQ,
            CBSPT,
            CBRMC,
            GXYJMC,
            AJJZJDMC,
            ZDLXJE,
            SJDWJE,
            ZXQXQSRQ,
            ZXQXJMRQ,
            FDZXQX,
            ZXCQTS
            from {$table} where AJBS=?";
            $query = $sjzx->query($sql,array($an_hao));
            $result['ajjbxx'] = $query->row_array();
            $sql = "SELECT
            a.AH,
            (SELECT b.AY from aydm b where b.AYDM= a.AY) as AYMC,
            (SELECT b.FYMC from fybm b where b.FYDM= a.JBFY) as JBFYMC,
            (SELECT b.AJLBMC from ajlbxx b where b.AJLBDM= a.AJLB) as AJLBMC
            FROM `ysqkxx` a where a.AJBS=?";
            $query = $sjzx->query($sql,array($an_hao));
            $result['ysxx'] = $query->row_array();
            $sql = "SELECT
                    a.xm AS xingming,
                    a.xb AS xingbie,
                    a.mz AS minzu,
                    a.ssdw AS susongdiwei,
                    a.sfzh AS shenfengzheng,
                    a.lxdh AS shouji,
                    a.dsr_type AS dangshirenleixing,
                    a.frdb AS farenmingcheng,
                    a.ajbs,
                    b.zzjgdm as farenjigou
                FROM
                    inputaj.zx_dsr AS a
                LEFT JOIN (
                    SELECT
                        *
                    FROM
                        sjzx.ajdsrxx
                    WHERE
                        ajbs = ?
                ) AS b ON a.xm = b.DSRMC
                WHERE
                    a.ajbs = ?
                group by xingming";
            $query = $sjzx->query($sql,array($an_hao, $an_hao));
            $result['dsr'] = $query->result_array();  
        }
        return $result;
    }
    
}
?>