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
    
    public function insert_call_record($id,$name,$lxdx,$address,$phone,$date,$time,$lywj,$note,$result,$sfjt,$lxrxm,$lxryx,$lxrrybs,$aj_type,$ajbs,$in_or_out)
    {
        //    $note = base64_decode($note);
        //    $result = base64_decode($result);
        
        $time = (strlen($time)>11)?substr($time,0,-3):$time;
        if($id==0){
            $sql = "INSERT INTO calling_history (lxdx,blxrxm,address,phone,call_date,call_time,lywj,lxrxm,lxryx,lxrrybs,sfjt,call_note,call_result,ajlx,ajbs,in_or_out)
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
            $query = $this->db->query($sql,array($lxdx,$name,$address,$phone,$date,$time,$lywj,$lxrxm,$lxryx,$lxrrybs,$sfjt,$note,$result,$aj_type,$ajbs,$in_or_out));
        }else{
            // var_dump($lywj);die();
            $sql = "UPDATE calling_history SET lywj=?,call_note=?,call_result=?,sfjt=? WHERE id={$id}";
            $query=$this->db->query($sql,array($lywj,$note,$result,$sfjt));
        }
        return $this->db->affected_rows();
    }
    
    public function show_call_record_list($page,$perPageNum,$ajbs)//直接展示通话记录
    {
        $page = (int)$page;
        $start = ($page-1)*$perPageNum;
        $qx_level = $_SESSION['user_qx_level'];
        $rybs = $_SESSION['user_rybs'];
        if($qx_level==1)
        {
            $sql = "SELECT id,blxrxm,lxdx,phone,call_date,sfjt FROM calling_history where ajbs={$ajbs} order by call_time DESC limit {$start},$perPageNum";
            $sql2 = "SELECT id from calling_history where ajbs={$ajbs}";
        }else{
            $sql = "SELECT id,blxrxm,lxdx,phone,call_date,sfjt FROM calling_history where  ajbs={$ajbs} AND lxrrybs='{$rybs}' order by call_time DESC limit {$start},$perPageNum";
            $sql2 = "SELECT id from calling_history where lxrrybs='{$rybs}' AND  where ajbs={$ajbs}";
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
    
    public function show_aj_call_list($page,$perPageNum,$show_type='ALL',$type_val='ALL')//通过案件展示通话记录
    {
        // var_dump($type_val);
        $page = (int)$page;
        $start = ($page-1)*$perPageNum;
        $data = array();
        $page_num=0;
        $qx_level = $_SESSION['user_qx_level'];
        $rybs = $_SESSION['user_rybs'];
        $sp_sql = "SELECT
        a.ah,
        a.ajbs,
        a.ajzt,
        a.larq,
        b.num
        FROM
        (
        SELECT
        ah,
        ajbs,
        ajzt,
        larq
        FROM
        inputaj.sp_ajxx
        WHERE
        ajbs IN (
        SELECT
        ajbs
        FROM
        calling_history
        WHERE
        ajlx = 'sp'
        )
        ) a
        LEFT JOIN (
        SELECT
        ajbs,
        COUNT(ajbs) AS num
        FROM
        calling_history
        WHERE ajbs IS NOT NULL AND ajbs!=''
        GROUP BY ajbs
        ) b ON a.ajbs = b.ajbs";
        
        $zx_sql = "SELECT
        a.ah,
        a.ajbs,
        a.ajzt,
        a.larq,
        b.num
        FROM
        (
        SELECT
        ah,
        ajbs,
        ajzt,
        larq
        FROM
        inputaj.zx_ajxx
        WHERE
        ajbs IN (
        SELECT
        ajbs
        FROM
        calling_history
        WHERE
        ajlx = 'zx'
        )
        ) a
        LEFT JOIN (
        SELECT
        ajbs,
        COUNT(ajbs) AS num
        FROM
        calling_history
        WHERE ajbs IS NOT NULL AND ajbs!=''
        GROUP BY ajbs
        ) b ON a.ajbs = b.ajbs";
        if($qx_level==1)//最大权限
        {
            
            if($show_type=='ALL'){
                $sql_num = "({$sp_sql}) union all ({$zx_sql}) order by larq";
                $sql = $sql_num." LIMIT {$start},$perPageNum";
                
            }else if($show_type=='sp'){
                $sql_num = $sp_sql." WHERE a.ah LIKE '%{$type_val}%'";
                $sql= $sql_num." LIMIT {$start},$perPageNum";
            }else if($show_type=='zx'){
                $sql_num = $zx_sql." WHERE a.ah LIKE '%{$type_val}%'";
                $sql= $sql_num." LIMIT {$start},$perPageNum";
            }
        }
        $query = $this->db->query($sql);
        $res = $query->result();
        if(empty($res)&&$show_type=='sp'){//输入案号搜索时直接输入号，此时判断为审判案件但未查到结果
            $sql_num = $zx_sql." WHERE a.ah LIKE '%{$type_val}%'";
            $sql= $sql_num." LIMIT {$start},$perPageNum";
            $query = $this->db->query($sql);
            $res = $query->result();
        }
        $data['result']=$res;
        $query_num = $this->db->query($sql_num);
        $res = $query_num->result();
        $page_num=count($res);
        $data['page_num']=$page_num;
        return $data;
    }
    public function get_record_data($id)
    {
        $sql = "SELECT * from calling_history where id={$id}";
        $query = $this->db->query($sql);
        $res = $query->row();
        return $res;
    }
    public function get_person_by_phone($phone)//呼入时获取信息
    {
        $data = array();
        $sql = "SELECT a.id,a.name,a.rybs,b.xxdz FROM (SELECT id,name,rybs,phone FROM person) a LEFT JOIN (SELECT person_id,xxdz FROM person_add_lib) b ON a.id=b.person_id where a.phone='{$phone}'";
        $person_q = $this->db->query($sql);
        $person_data = $person_q->row();
        if(empty($person_data))
        {
            $data['has']=0;
            return $data;//不存在对应电话的网格员或调解员
        }
        $sql = "SELECT ah,ajbs FROM inputaj.sp_ajxx WHERE ajbs IN
        (SELECT ajbs FROM inputaj.sp_dsr WHERE dsr_id IN
        (SELECT dsr_id FROM dsr_to_person WHERE person_id='{$person_data->id}'))";
        $aj_q = $this->db->query($sql);
        $spaj_data = $aj_q->result();
        $sql = "SELECT ah,ajbs FROM inputaj.zx_ajxx WHERE ajbs IN
        (SELECT ajbs FROM inputaj.zx_dsr WHERE dsr_id IN
        (SELECT dsr_id FROM dsr_to_person WHERE person_id='{$person_data->id}'))";
        $aj_q = $this->db->query($sql);
        $zxaj_data = $aj_q->result();
        $data=array(
        'has'=>1,
        'person'=>$person_data,
        'aj'=>array('sp'=>$spaj_data,'zx'=>$zxaj_data)
        );
        return $data;
    }
    
    public function delete_record_data($id)
    {
        $res=0;
        $sql = "DELETE FROM calling_history WHERE id={$id}";
        $query = $this->db->query($sql);
        if($this->db->affected_rows()==1)
        {
            $res=1;
        }
        return $res;
    }
}
?>