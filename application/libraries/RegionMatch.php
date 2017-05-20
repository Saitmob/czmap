<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class RegionMatch extends CI_Model {
    
    public function __construct()
    {
        parent::__construct();
        $this->load->database();
    }
    //gis库的id转地址详细信息
    public function idToRegionName($id)
    {
        $idArr = explode(',',$id);
        $addArr=array();
        foreach ($idArr as $key => $value) {
            $sql = "SELECT ADDRESS,P_ID FROM cz_gis_library_copy WHERE ID={$value}";
            $query=$this->db->query($sql);
            $res = $query->row();
            $add = $res->ADDRESS;
            $pId = $res->P_ID;
            while($pId!=0){
                $sql = "SELECT ADDRESS,P_ID FROM cz_gis_library_copy WHERE ID={$pId}";
                $query=$this->db->query($sql);
                $res = $query->row();
                $pId = $res->P_ID;
                $add = $res->ADDRESS.$add;
            }
            $addArr[]=$add;
        }
        $addStr = implode(';',$addArr);
        return $addStr;
    }
    //名称匹配拿到坐标
    public function nameToPoint($name,$l=2)
    {
        $name = $this->pp($name,$l);
        $sql = "SELECT POINT_X,POINT_Y FROM cz_gis_library_copy WHERE ADDRESS = '{$name}'";
        $query = $this->db->query($sql);
        $res=$query->row();
        // var_dump($sql);
        $data = array(
        'x'=>(isset($res->POINT_X))?$res->POINT_X:'',
        'y'=>(isset($res->POINT_Y))?$res->POINT_Y:''
        );
        // var_dump($name);
        // var_dump($data);
        return $data;
    }
    // 通过名称以及匹配级别获取某级名称
    public function pp($s='',$l=2){//匹配字符串，匹配级别，2级到村，3级到屯
        if($l==2){
            $add=array();
            if(count(explode('镇',$s))==2)
            {
                $add = explode('镇',$s);
            }elseif(count(explode('乡',$s))==2){
                $add = explode('乡',$s);
            }elseif(count(explode('街道',$s))==2){
                $add = explode('街道',$s);
            }
            $add = $add[1];
            if(count(explode('村',$add))==2)
            {
                $add = explode('村',$add);
                $add = $add[0].'村';
            }elseif(count(explode('社区',$add))==2){
                $add = explode('社区',$add);
                $add = $add[0].'社区';
            }
            
        }elseif($l==3){
            if(count(explode('村',$s))==2)
            {
                $add = explode('村',$s);
                
            }elseif(count(explode('社区',$s))==2){
                $add = explode('社区',$s);
            }
            $add = $add[1];
        }
        // var_dump($s);
        return $add;
    }
    //根据分级码拿到法院所在的区域，并返回坐标
    public function getRegionByFjm($fjm)
    {
        if(!empty($fjm))
        {
            $add = '';
            switch ($fjm) {
                case 'K60':
                    $add = '江州区';
                    break;
                case 'K67':
                    $add = '江州区';
                    break;
                case 'K61':
                    $add = '凭祥市';
                    break;
                case 'K68':
                    $add = '大新县';
                    break;
                case 'K69':
                    $add = '天等县';
                    break;
                case 'K6A':
                    $add = '宁明县';
                    break;
                case 'K6B':
                    $add = '龙州县';
                    break;
                case 'K6C':
                    $add = '扶绥县';
                    break;
        }
        $sql = "SELECT POINT_X,POINT_Y FROM cz_gis_library_copy WHERE ADDRESS='{$add}'";
        $query = $this->db->query($sql);
        $res = $query->row();
        return array('x'=>$res->POINT_X,'y'=>$res->POINT_Y,'fjm'=>$fjm);
    }
    
}
//案件数据的地址匹配gis库，列出陪审员，执行员，网格员
public function addressMatchPZW($gisId){
    $sql = "SELECT * FROM cz_person WHERE GIS_ID={$gisId}";
    $query=$this->db->query($sql);
    $data=array();
    $res = $query->result();
    foreach ($res as $key => $value) {
        $data[$value->USER_DUTY][] = $value->USER_NAME;
    }
    return $data;
}
//案件数据的地址匹配gis库，列出陪审员，执行员，网格员  （废弃
public function addressMatchPZWStr($gisId){
    $sql = "SELECT * FROM cz_person WHERE GIS_ID={$gisId}";
    $query=$this->db->query($sql);
    $data=array();
    $res = $query->result();
    foreach ($res as $key => $value) {
        $data[$value->USER_DUTY][] = $value->USER_NAME;
    }
    $psyArr=array();
    $zxyArr=array();
    $wgyArr=array();
    foreach ($data as $k2 => $v2) {
        if($k2=='陪审员'){
            foreach ($v2 as $k3 => $v3) {
                $psyArr[]=$v3;
            }
        }
        if($k2=='执行员'){
            foreach ($v2 as $k3 => $v3) {
                $zxyArr[]=$v3;
            }
        }
        if($k2=='网格员'){
            foreach ($v2 as $k3 => $v3) {
                $wgyArr[]=$v3;
            }
        }
    }
    $psy=implode(',',$psyArr);
    $zxy=implode(',',$zxyArr);
    $wgy=implode(',',$wgyArr);
    $result = array(
    'psy'=>$psy,
    'zxy'=>$zxy,
    'wgy'=>$wgy
    );
    return $result;
}
public function getTWByGis($gis_id)
{
    if(!empty($gis_id)&&$gis_id!=0)
    {
        $sql = "SELECT person_id from person_add_lib where gis_id=".$gis_id;
        $query = $this->db->query($sql);
        $person_arr = $query->result();
        $tjyArr=array();
        $wgyArr=array();
        $tjy='';
        $wgy='';
        foreach ($person_arr as $kp => $valp) {
            $sql = "SELECT id,name,rybs from person where id=".$valp->person_id;
            $query = $this->db->query($sql);
            $res = $query->row();
            // var_dump($res);
            if(!empty($res))
            {
                if($res->rybs=='法律顾问')
                {
                    $tjyArr['name'][]=$res->name;
                    $tjyArr['id'][]=$res->id;
                }elseif($res->rybs=='网格员')
                {
                    $wgyArr['name'][]=$res->name;
                    $wgyArr['id'][]=$res->id;
                }
            }
            
        }
        if(!empty($tjyArr)&&!empty($tjyArr['name'])){
            $tjy = implode('、',$tjyArr['name']);
        }
        if(!empty($wgyArr)&&!empty($wgyArr['name'])){
            $wgy = implode('、',$wgyArr['name']);
        }
        $data = array(
        'tjy'=>$tjyArr,
        'tjystr'=>$tjy,
        'wgy'=>$wgyArr,
        'wgystr'=>$wgy,
        );
        return $data;
    }
    
}
//gis_id获取R_ID
public function gisToRid($gisId){
    $sql = "SELECT ADDRESS,P_ID FROM cz_gis_library_copy WHERE ID={$gisId}";
    $query=$this->db->query($sql);
    $res = $query->row();
    $add = $res->ADDRESS;
    $R_ID='';
    $pId = $res->P_ID;
    while($pId!=0){
        $sql = "SELECT ADDRESS,P_ID FROM cz_gis_library_copy WHERE ID={$pId}";
        $query=$this->db->query($sql);
        $res = $query->row();
        $pId = $res->P_ID;
        $add = $res->ADDRESS;
    }
    $sql = "SELECT R_ID,R_NAME FROM region WHERE R_NAME='{$add}'";
    $query=$this->db->query($sql);
    $res = $query->row();
    $R_ID=$res->R_ID;
    $data = array(
    'R_ID'=>$R_ID,
    'R_NAME'=>$res->R_NAME
    );
    return $data;
}
//获取坐标
public function getPointById($gisId)
{
    $data = array();
    if(!empty($gisId)&&$gisId!=0)
    {
        $sql = "SELECT POINT_X,POINT_Y FROM cz_gis_library_copy WHERE ID={$gisId}";
        $query = $this->db->query($sql);
        $res=$query->row();
        $x=($res->POINT_X)?$res->POINT_X:'';
        $y=($res->POINT_Y)?$res->POINT_Y:'';
        $data = array(
        'x'=>$x,
        'y'=>$y,
        'gisId'=>$gisId
        );
    }
    return $data;
}
}
?>