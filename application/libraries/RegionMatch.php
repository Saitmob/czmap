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
            $sql = "SELECT ADDRESS,P_ID FROM cz_gis_library WHERE ID={$value}";
            $query=$this->db->query($sql);
            $res = $query->row();
            $add = $res->ADDRESS;
            $pId = $res->P_ID;
            while($pId!=0){
                $sql = "SELECT ADDRESS,P_ID FROM cz_gis_library WHERE ID={$pId}";
                $query=$this->db->query($sql);
                $res = $query->row();
                $pId = $res->P_ID;
                $add = $res->ADDRESS.$add;
            }
            $addArr[]=$add;
        }
        if(!empty($addArr)){
            $addStr = implode(';',$addArr);
        }else{
            $addStr = '';
        }
        return $addStr;
    }
    //名称匹配拿到坐标
    public function nameToPoint($name,$l=2)
    {
        $name = $this->pp($name,$l);
        $sql = "SELECT POINT_X,POINT_Y FROM cz_gis_library WHERE ADDRESS = '{$name}'";
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
        $sql = "SELECT POINT_X,POINT_Y FROM cz_gis_library WHERE ADDRESS='{$add}'";
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
        // 判断当事人的gis_id层级，并拿到该层级的所有父级gis_id
        $sql = "SELECT level,ADDRESS,provinceId,cityId,xianId,villageId,cunId,tunId from cz_gis_library WHERE ID={$gis_id}";
        $query = $this->db->query($sql);
        $row = $query->row();
        $str_append = '';
        if(!empty($row))
        {
            switch ($row->level) {
                case 1:
                    $str_append.=" OR provinceId='".$row->provinceId."'";
                    break;
                case 2:
                    $str_append.=" OR ( level<2 AND (cityId='".$row->cityId."' OR  provinceId='".$row->provinceId."'))";
                    break;
                case 3:
                    $str_append.=" OR ( level<3 AND ( xianId='".$row->xianId."' OR cityId='".$row->cityId."' OR provinceId='".$row->provinceId."'))";
                    break;
                case 4:
                    $str_append.=" OR ( level<4  AND (villageId='".$row->villageId."' OR xianId='".$row->xianId."' OR  cityId='".$row->cityId."' OR provinceId='".$row->provinceId."'))";
                    break;
                case 5:
                $str_append.="  OR ( level<5 AND (cunId='{".$row->cunId."}' OR villageId='".$row->villageId."' OR xianId='".$row->xianId."' OR  cityId='".$row->cityId."' OR provinceId='".$row->provinceId."'))";
                break;
            default:
                break;
    }
    // 拿到并拿到该层级的所有父级gis_id
    $sql = "SELECT ID,ADDRESS from cz_gis_library WHERE ID={$gis_id} {$str_append} GROUP BY ID";
    $query = $this->db->query($sql);
    $res = $query->result();
    $id_arr = array();
    foreach ($res as $key => $value) {
        $id_arr[] = $value->ID;
    }
    $id_str = implode(',',$id_arr);
    // echo $sql.'<br>';
    // $sql = "SELECT person_id from person_add_lib where gis_id=".$gis_id." GROUP BY person_id";
    $sql = "SELECT p.id,p.name,p.rybs from person p LEFT JOIN (SELECT person_id from person_add_lib where gis_id in ({$id_str}) OR gis_id={$gis_id} GROUP BY person_id) padd ON p.id=padd.person_id";
    // echo $sql.'<br>';
    $query = $this->db->query($sql);
    $person_arr = $query->result();
    $tjyArr=array();
    $wgyArr=array();
    $tjy='';
    $wgy='';
    foreach ($person_arr as $kp => $res) {
        //     $sql = "SELECT id,name,rybs from person where id=".$valp->person_id;
        //     $query = $this->db->query($sql);
        //     $res = $query->row();
        if(!empty($res)&&!empty($res->rybs))
        {
            if($res->rybs=='法律顾问')
            {
                $tjyArr['name'][$res->id]=$res->name;
                $tjyArr['id'][$res->id]=$res->id;
            }elseif($res->rybs=='网格员'&&!empty($res->rybs))
            {
                $wgyArr['name'][$res->id]=$res->name;
                $wgyArr['id'][$res->id]=$res->id;
            }
        }
        
    }
    if(!empty($tjyArr)&&!empty($tjyArr['name'])){
        if(count($tjyArr['name'])>4)
        {
            $rand = rand(0,count($tjyArr['name']));
            $tjyArr['name']=array_slice($tjyArr['name'],$rand,2);
            $tjyArr['id'] = array_slice($tjyArr['id'],$rand,2);
        }
        $tjy = implode('、',$tjyArr['name']);
    }
    if(!empty($wgyArr)&&!empty($wgyArr['name'])){
        if(count($wgyArr['name'])>4)
        {
            $rand = rand(0,count($wgyArr['name']));
            $wgyArr['name'] = array_slice($wgyArr['name'],$rand,1);
            $wgyArr['id'] = array_slice($wgyArr['id'],$rand,1);
        }
        // 测试用
        if($gis_id==2417||$gis_id=='2417')
        {
            $wgy = '测试';
            $wgyArr['id']=1436;
        }else{
            
            $wgy = implode('、',$wgyArr['name']);
        }
    }
    if($gis_id==2417||$gis_id=='2417')
    {
        $data = array(
        'tjy'=>$tjyArr,
        'tjystr'=>$tjy,
        'wgy'=>array('name'=>array('测试'),'id'=>array(1436)),
        'wgystr'=>'测试',
        );
    }else{
        $data = array(
        'tjy'=>$tjyArr,
        'tjystr'=>$tjy,
        'wgy'=>$wgyArr,
        'wgystr'=>$wgy,
        );
    }
    return $data;
}


}

}
//gis_id获取R_ID
public function gisToRid($gisId){
    $sql = "SELECT ADDRESS,P_ID FROM cz_gis_library WHERE ID={$gisId}";
    $query=$this->db->query($sql);
    $res = $query->row();
    $add = $res->ADDRESS;
    $R_ID='';
    $pId = $res->P_ID;
    while($pId!=0){
        $sql = "SELECT ADDRESS,P_ID FROM cz_gis_library WHERE ID={$pId}";
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
        $sql = "SELECT POINT_X,POINT_Y FROM cz_gis_library WHERE ID={$gisId}";
        $query = $this->db->query($sql);
        $res=$query->row();
        $x=(isset($res->POINT_X))?$res->POINT_X:'';
        $y=(isset($res->POINT_Y))?$res->POINT_Y:'';
        $data = array(
        'x'=>$x,
        'y'=>$y,
        'gisId'=>$gisId
        );
    }
    return $data;
}

// 插入当事人对应网格员和调解员的中间表
public function dsr_to_person()
{
    $ajxq = $this->load->database('ajxq',true);
    // 执行当事人
    $sql = "SELECT dsr_id,xxdz FROM zx_dsr";
    $query = $ajxq->query($sql);
    $res=$query->result();
    $data=array();
    foreach ($res as $key => $value) {
        $xxdz = (!empty($value->xxdz))?$value->xxdz:'';
        $zxdz = $this->zxdz($xxdz,4);
        $sql = "SELECT id,xxdz FROM person_add_lib where address = '{$zxdz}'";
        $query = $this->db->query($sql);
        $res = $query->result();
        $data[]=array(
        'xxdz'=>$xxdz,
        'zxdz'=>$zxdz,
        'p'=>$res
        );
    }
    var_dump($data);
}

private function zxdz($xxdz,$l=2)
{
    $add=array();
    if($l==2){//拿到乡镇
        if(count(explode('市',$xxdz))>=2)
        {
            $add = explode('市',$xxdz);
            if(strpos($add[0],'崇左')&&strpos($add[1],'市'))
            {
                $add = $add[1];
            }
        }elseif(count(explode('县',$xxdz))>=2){
            $add = explode('县',$xxdz);
        }elseif(count(explode('区',$xxdz))>=2){
            $add = explode('区',$xxdz);
        }else{
            // echo $xxdz.' 2<br>';
            return $this->zxdz($xxdz,1);
        }
        $add = $add[1];
        if(count(explode('镇',$add))>=2)
        {
            $add = explode('镇',$add);
            $add = $add[0].'镇';
        }elseif(count(explode('乡',$add))>=2){
            $add = explode('乡',$add);
            $add = $add[0].'乡';
        }elseif(count(explode('街道',$add))>=2){
            $add = explode('街道',$add);
            $add = $add[0].'街道';
        }
    }
    if($l==3){//拿到镇一下的村或街或小区
        
        if(count(explode('镇',$xxdz))>=2)
        {
            $add = explode('镇',$xxdz);
        }elseif(count(explode('乡',$xxdz))>=2){
            $add = explode('乡',$xxdz);
        }elseif(count(explode('街道',$xxdz))>=2){
            $add = explode('街道',$xxdz);
        }else{
            // echo $xxdz.' 3<br>';
            return $this->zxdz($xxdz,2);//没有到村级则返回查找乡镇
        }
        $add = $add[1];
        if(count(explode('村',$add))>=2)//如果村字后包含组或者号数，只取村名
        {
            if(strpos($add,'村委会')&&count(explode('村',$add))==2){
                $add = explode('村委会',$add);
                $add = $add[0].'村委会';
            }elseif(strpos($add,'村委会')&&count(explode('村',$add))>2){
                $add = explode('村委会',$add);
                $add = $add[count($add)-1];
                $add = explode('村',$add);
                $add = $add[count($add)-2].'村';
            }
            elseif(!strpos($add,'村委会')){
                $add = explode('村',$add);
                $add = $add[0].'村';
            }
        }elseif(count(explode('社区',$add))>=2){
            $add = explode('社区',$add);
            $add = $add[0].'社区';
        }elseif(count(explode('街',$add))>=2){
            $add = explode('街',$add);
            $add = $add[0].'街';
        }elseif(count(explode('路',$add))>=2){
            $add = explode('路',$add);
            $add = $add[0].'路';
        }elseif(count(explode('小区',$add))>=2){
            $add = explode('小区',$add);
            $add = $add[0].'小区';
        }elseif(count(explode('大道',$add))>=2){
            $add = explode('大道',$add);
            $add = $add[0].'大道';
        }
        
    }elseif($l==4){//拿到村下面的屯
        if(count(explode('村',$xxdz))>=2)
        {
            if(strpos($xxdz,'村委会')){
                $add = explode('村委会',$xxdz);
            }
            elseif(!strpos($xxdz,'村委会')){
                $add = explode('村',$xxdz);
            }
        }elseif(count(explode('社区',$xxdz))>=2){
            $add = explode('社区',$xxdz);
        }else{
            // echo $xxdz.' 4<br>';
            return $this->zxdz($xxdz,3);//没有到屯级则返回查找村级名称
        }
        $add = $add[count($add)-1];
        if(count(explode('屯',$add))>=2&&!strpos($add,'组'))
        {
            $add = explode('屯',$add);
            $add = $add[0].'屯';
        }
        // elseif(strpos($add,'组'))
        // {
        //     $add = explode('组',$add);
        //     $add = $add[0].'组';
        // }else{
        //     return $this->zxdz($xxdz,3);//没有到屯级则返回查找村级名称
        // }
        
        
    }
    // var_dump($s);
    
    return $add;
}

//通过中间表获取网格员和调解员
public function get_wgy_tjy($dsr_id,$aj_type)
{
    $sql = "SELECT id,name,rybs from person where id in (SELECT person_id from dsr_to_person where dsr_id='{$dsr_id}' and aj_type='{$aj_type}')";
    $query = $this->db->query($sql);
    $res = $query->result();
    $data = array();
    foreach ($res as $key => $value) {
        if($value->rybs=='网格员'){
            $data['wgy']['name'][]=$value->name;
            $data['wgy']['id'][]=$value->id;
        }elseif($value->rybs=='法律顾问'){
            $data['tjy']['name'][]=$value->name;
            $data['tjy']['id'][]=$value->id;
        }
    }
    return $data;
}
}
?>