<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class point_manage_model extends CI_Model {
    private $ajxq;
    public function __construct()
    {
        parent::__construct();
        $this->load->database();
        $this->ajxq=$this->load->database('ajxq',true);
    }
    public function show_dsr_list($ajbs,$aj_type,$page,$perPageNum){
        $data=array();
        $page = (int)$page;
        $perPageNum = (int)$perPageNum;
        $start = ($page-1)*$perPageNum;
        $sql = "SELECT dsr_id,xm,lxdh,xxdz,ssdw,POINT_X,POINT_Y,ajbs from {$aj_type}_dsr  WHERE ajbs=? LIMIT ?,?";
        $query = $this->ajxq->query($sql,array($ajbs,$start,$perPageNum));
        $res = $query->result();
        $sql = "SELECT dsr_id FROM {$aj_type}_dsr  WHERE ajbs=?";
        $query = $this->ajxq->query($sql,array($ajbs));
        $res_num = $query->result();
        $data = array(
        'result'=>$res,
        'page_num'=>count($res_num)
        );
        return $data;
    }
    public function get_wgy_tjy($dsr_id,$aj_type)
    {
        $sql = "SELECT a.person_id,b.name,b.rybs,c.xxdz FROM
        (SELECT person_id FROM dsr_to_person WHERE dsr_id=? AND aj_type=?) a
        LEFT JOIN (SELECT id,name,rybs FROM person) b on a.person_id=b.id
        LEFT JOIN (SELECT person_id,xxdz FROM person_add_lib) c on a.person_id=c.person_id
        GROUP BY a.person_id
        ";
        $query = $this->db->query($sql,array($dsr_id,$aj_type));
        $res = $query->result();
        return $res;
    }
    public function get_wgy_tjy_by_gisid($gis_id,$p_type)
    {
        $lv_str = '';
        $sql1 = "SELECT a.person_id,b.name,a.xxdz FROM (SELECT xxdz,person_id FROM person_add_lib WHERE ";
        if($p_type=='wgy')
        {
            $sql2 = " AND person_id IN (SELECT id FROM person WHERE rybs='网格员') GROUP BY person_id) a LEFT JOIN (SELECT id,name FROM person) b ON a.person_id=b.id";
        }else if($p_type=='flgw'){
            $sql2 = " AND person_id IN (SELECT id FROM person WHERE rybs='法律顾问') GROUP BY person_id) a LEFT JOIN (SELECT id,name FROM person) b ON a.person_id=b.id";
        }
        $sql = "SELECT level,ADDRESS,xian,village,cun,tun FROM cz_gis_library WHERE ID=?";
        $query = $this->db->query($sql,array($gis_id));
        $res = $query->row();
        switch ($res->level) {
            case 3:
                $lv_str = "county='{$res->xian}'";
                break;
            case 4:
                $lv_str = "county='{$res->xian}' AND town='{$res->village}'";
                break;
            case 5:
                $lv_str = "town='{$res->village}' AND village='{$res->cun}'";
                break;
            case 6:
                $lv_str = "village='{$res->cun}' AND  tun='{$res->tun}'";
                break;
        }
        $sql = $sql1.$lv_str.$sql2;
        $query = $this->db->query($sql);
        $res = $query->result();
        return $res;
    }
    public function save_dsr_p_w_t($dsr_id,$aj_type,$person_id_str,$point)
    {
        if(!empty($person_id_str))
        {
            $person_id_arr = explode(',',$person_id_str);
        }else{
            return;
        }
        $this->db->trans_start();
        //插入中间表
        $sql = "DELETE FROM dsr_to_person WHERE dsr_id=? AND aj_type=?";
        $query = $this->db->query($sql,array($dsr_id,$aj_type));
        $sql = "INSERT INTO dsr_to_person (dsr_id,person_id,aj_type) VALUES ";
        $values_str = '';
        foreach ($person_id_arr as $key => $value) {
            $values_str .= "({$dsr_id},{$value},'{$aj_type}'),";
        }
        $values_str = substr($values_str,0,-1);
        $sql .= $values_str;
        $query = $this->db->query($sql);
        $rows = $this->db->affected_rows();
        //更新当事人坐标
        if(!empty($point))
        {
            $point = explode(',',$point);
            $x=$point[0];
            $y=$point[1];
        }else{
            $x=null;$y=null;
        }
        $sql = "UPDATE {$aj_type}_dsr SET POINT_X=?,POINT_Y=? WHERE dsr_id=?";
        $query = $this->ajxq->query($sql,array($x,$y,$dsr_id));
        $rows_p = $this->db->affected_rows();
        $this->db->trans_complete();
        if($rows==count($person_id_arr)&&$rows_p==1)
        {
            return 1;
        }else{
            return 0;
        }
    }
}
?>