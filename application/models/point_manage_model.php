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
    //拿到当事人匹配的网格员和法律顾问
    public function get_wgy_tjy($dsr_id,$aj_type)
    {
        // $dsr_id = (int)$dsr_id;
        $sql = "SELECT a.person_id,b.name,b.rybs,c.xxdz FROM
        (SELECT person_id FROM dsr_to_person WHERE dsr_id=? AND aj_type=?) a
        LEFT JOIN (SELECT id,name,rybs FROM person) b on a.person_id=b.id
        LEFT JOIN (SELECT person_id,xxdz FROM person_add_lib) c on a.person_id=c.person_id
        GROUP BY a.person_id
        ";
        $query = $this->db->query($sql,array($dsr_id,$aj_type));
        $res = $query->result();
        $sql = "SELECT POINT_X,POINT_Y FROM cz_gis_library_dsr WHERE ID=(SELECT gis_id FROM inputaj.{$aj_type}_dsr WHERE dsr_id=?)";
        $query = $this->db->query($sql,array($dsr_id));
        $res_p = $query->result();
        $data = array();

        return $data = array(
            'wg_tj'=>$res,
            'x_y'=>$res_p
        );
    }
    //通过gisid拿到其下的网格员、法律顾问
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
    //检查当事人对应地址库的变化
    public function checkIsChange($id,$name)
    {
        $sql = "SELECT ADDRESS FROM cz_gis_library_dsr WHERE ID=?";
        $query = $this->db->query($sql,array((int)$id));
        $res = $query->row();
        if(!empty($res))
        {
            if($name==$res->ADDRESS)
            {
                return 0;//未发生改变
            }
            else{
                return 1;
            }
        }else{
            return 1;
        }
    }
    //更改当事人对应地址库，return 0,1,2,3,4 表示更改失败、修改成功，删除成功，
    public function changeAddress($id,$name,$type)
    {
        // var_dump($id);
        // var_dump($name);
        // var_dump($type);
        // die();
        if($type=='rename')
        {
            $sql = "UPDATE cz_gis_library_dsr SET ADDRESS = ? WHERE ID=?";
            $query = $this->db->query($sql,array($name,(int)$id));
            $affect_row=$this->db->affected_rows();
            if($affect_row==1){
                return 1;
            }else{
                return 0;
            }
        }elseif ($type=="remove") {
            $sql = "DELETE FROM cz_gis_library_dsr WHERE ID=?";
            $query = $this->db->query($sql,array($id));
            $affect_row=$this->db->affected_rows();
            if($affect_row==1){
                return 2;
            }else{
                return 0;
            }
        }elseif ($type=="add") {
            $sql = "SELECT * FROM cz_gis_library_dsr WHERE ID=?";
            $query = $this->db->query($sql,array($id));
            $res = $query->row();
            if($res->level<6&&$res->level>=3)//前端已验证，这里再验证一次
            {
                $affect_row = 0;
                $sql = "INSERT INTO cz_gis_library_dsr (ADDRESS,P_ID,POINT_X,POINT_Y,province,city,xian,village,cun,tun,level,provinceId,cityId,xianId,villageId,cunId,tunId)
                            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
                $query = $query = $this->db->query($sql,array(
                    $name,$id,null,null,$res->province,$res->city,$res->xian,$res->village,$res->cun,$res->tun,$res->level+1,$res->provinceId,$res->cityId,$res->xianId,$res->villageId,
                    $res->cunId,$res->tunId
                ));
                $affect_row+=$this->db->affected_rows();
                $insert_id = $this->db->insert_id();
                // var_dump($insert_id);die();
                switch ($res->level) {
                    case 3:
                        $village = $name;
                        $sql_update = "SET village='{$village}',villageId={$insert_id}";
                    break;
                    case 4:
                        $cun = $name;
                        $sql_update = "SET cun='{$cun}',cunId={$insert_id}";
                    break;
                    case 5:
                        $tun = $name;
                        $sql_update = "SET tun='{$tun}',tunId={$insert_id}";
                    break;
                }
                $sql = "UPDATE cz_gis_library_dsr ".$sql_update." WHERE ID={$insert_id}";
                $query = $this->db->query($sql);
                $affect_row+=$this->db->affected_rows();
                if($affect_row==2)
                {
                    return 3;
                }else{
                    return 0;
                }
            }else{//不能在屯级添加子节点，屯已经是最小级
                return 0;
            }
        }
    }

    public function save_region_x_y($gis_id,$x,$y)
    {
        $gis_id = (int)$gis_id;
        if($gis_id!=0)
        {//保存到区域表
            $sql = "UPDATE cz_gis_library_dsr SET POINT_X=?,POINT_Y=? WHERE ID=?";
            $query = $this->db->query($sql,array($x,$y,$gis_id));
        }
        if($this->db->affected_rows()>=1)
        {
            return 1;
        }else{
            return 0;
        }
    }
    public function save_dsr_gisId($dsr_id,$aj_type,$gis_id,$x,$y)
    {
        $gis_id = (int)$gis_id;
        $sql = "UPDATE {$aj_type}_dsr SET gis_id = ? WHERE dsr_id=?";
        $query = $this->ajxq->query($sql,array($gis_id,$dsr_id));
        if($this->ajxq->affected_rows()>=1)
        {
            return 1;
        }else{
            return 0;
        }
    }
}
?>