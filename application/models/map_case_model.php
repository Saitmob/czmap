<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class map_case_model extends CI_Model {
    private $ajxq;
    public function __construct()
    {
        parent::__construct();
        session_start();
        $this->load->database();
        $this->ajxq=$this->load->database('ajxq',true);
        $this->load->library('regionmatch');
    }
    //案件总数
    public function getCaseNum(){
        $sql = "SELECT ID from map_case WHERE THIS_AREA=0";
        $query = $this->db->query($sql);
        $res = $query->result();
        $unthis_num = count($res);
        $sql = "SELECT R_TC from region";
        $query = $this->db->query($sql);
        $res = $query->result();
        $this_num = 0;
        foreach ($res as $key => $value) {
            $this_num += $value->R_TC;
        }
        $data = array(
        'this_num'=>$this_num,
        'unthis_num'=>$unthis_num
        );
        return $data;
    }
    public function getRegionData()
    {
        $sql="SELECT R_ID,R_TC FROM region";
        $query = $this->db->query($sql);
        $res = $query->result();
        $data=array();
        foreach ($res as $key => $value) {
            $data[$value->R_ID] = $value->R_TC;
        }
        return $data;
    }
    public function getOneRegionData($r_id)
    {
        $sql = "SELECT * FROM map_case WHERE THIS_AREA=1 AND R_ID='{$r_id}'";
        $query = $this->db->query($sql);
        $res = $query->result();//该地区所有案件信息
        $sql = "SELECT R_POINT_X,R_POINT_Y,R_NAME FROM region WHERE R_ID='{$r_id}'";
        $query = $this->db->query($sql);
        $res2 = $query->row();//该地区坐标及名称
        $sql = "SELECT * FROM address WHERE R_ID = '{$r_id}'";
        $query = $this->db->query($sql);
        $res3 = $query->result_array();//该地区所有已录案件的地区信息
        foreach ($res3 as $key => $value) {
            $address = $value['ADDRESS'];
            $sql = "SELECT * FROM map_case WHERE THIS_AREA=1 AND ADDRESS='{$address}'";
            $query = $this->db->query($sql);
            $res4 = $query->result_array();//该地区的案件信息
            $detail_info='地址：'.$address.'<br>';
            $case_num = 0;//该地点案件数
            foreach ($res4 as $k => $val) {
                //获取该区域的陪审员和执行员以及网格员
                $pzwArr = $this->regionmatch->addressmatchpzwstr($val['GIS_ID']);
                $psy = (empty($pzwArr['psy']))?'无':$pzwArr['psy'];
                $zxy = (empty($pzwArr['zxy']))?'无':$pzwArr['zxy'];
                $wgy = (empty($pzwArr['wgy']))?'无':$pzwArr['wgy'];
                $an_hao = urlencode($val['DO_AH']);
                $case_type = $val['CASE_TYPE'];
                //案件详情权限
                // $rybs = $_SESSION['user_rybs'];
                $rybs = '00';
                $qx = false;//权限
                if($rybs==180225133)
                {
                    $qx=true;
                }
                if($case_type==1)
                {
                    $sql = "SELECT RX_HYTCRBS,RX_SJYBS,RX_CBRBS FROM sp_case_detail WHERE AH='".$val['DO_AH']."'";
                    $query = $this->db->query($sql);
                    $sp_res = $query->result();
                    if(!empty($sp_res))
                    {
                        foreach ($sp_res as $sp_k => $sp_v) {
                            // $hytbs = ();
                            if($sp_v->RX_HYTCRBS==$rybs||$sp_v->RX_SJYBS==$rybs||$sp_v->RX_CBRBS==$rybs)
                            {
                                $qx=true;
                            }
                            // var_dump($sp_v->RX_SJYBS);
                            // var_dump($sp_v->RX->CBRBS);
                            
                        }
                        
                    }
                    $ah_str = (($qx)?('；<a href="'.base_url().'index.php/caseDetail/spcaseDetail?AH='.$an_hao.'&CASE_TYPE='.$val['CASE_TYPE'].'" >'.$val['DO_AH'].'</a>；'):('；'.$val['DO_AH'].'；'));
                }else{
                    $sql = "SELECT CBR,AJXQURL FROM zx_case_detail WHERE AH = '".$val['DO_AH']."'";
                    $query = $this->db->query($sql);
                    $zx_res = $query->row();
                    if(!empty($zx_res))
                    {
                        if($zx_res->CBR==$rybs)
                        {
                            $qx=true;
                        }
                        $URL=$zx_res->AJXQURL;
                    }
                    $ah_str = (($qx)?('；<a href="'.$URL.'" target="_blank" >'.$val['DO_AH'].'</a>；'):('；'.$val['DO_AH'].'；'));
                }
                
                $detail_info .= ($k+1)."、".$val['COURT_NAME'].$ah_str.(($val['LA_DATE']==NULL)?'无立案时间':$val['LA_DATE']).'；'.$val['AN_REASON'].'；'.(($val['BZXR_NAME']==NULL)?'无被执行人':$val['BZXR_NAME']).'；标的：'.$val['BD'].'万元；备注：'.$val['NOTE']."<br><div style='position:absolute;bottom:0px;height：80px;width:80%;padding-top:10px;border-top:1px solid;'>陪审员：".$psy."；执行员：".$zxy."；网格员：".$wgy."</div>";
                $case_num+=1;
            }
            $res3[$key]['detail_info'] = $detail_info;
            $res3[$key]['case_num'] = '未结：'.$case_num.' 件';
        }
        $data = array();
        $data['point']=$res2;
        $data['region_data'] = $res;
        $data['address'] = $res3;
        return $data;
    }
    public function getOneRData($fjm,$showType='ALL',$currPage=0,$perPageNum=0)//废弃旧的getOneRegionData
    {
        $ADDRESS=array();
        // 执行案件
        $zx_arr = $this->getAddress('zx',$showType,$fjm,$currPage,$perPageNum);
        // 诉讼案件
        $sp_arr = $this->getAddress('sp',$showType,$fjm,$currPage,$perPageNum);
        $data = array(
        'ZX'=>$zx_arr,
        'SP'=>$sp_arr,
        'REGION_POINT'=>$this->regionmatch->getRegionByFjm($fjm)
        // 'REGION_POINT'=>''
        );
        return $data;
        
    }
    public function getRdataById($fjm,$aj_type,$showType='AJ_ID',$id)
    {
        $data = array();
        if($aj_type=='sp')
        {
            $data = array(
            'SP'=>$this->getAddress('sp',$showType,$id),
            'ZX'=>array(),
            'REGION_POINT'=>$this->regionmatch->getRegionByFjm($fjm)
            );
        }elseif($aj_type=='zx'){
            $data = array(
            'SP'=>array(),
            'ZX'=>$this->getAddress('zx',$showType,$id),
            'REGION_POINT'=>$this->regionmatch->getRegionByFjm($fjm)
            );
        }
        return $data;
    }
    // 拿到address的各种坐标以及当事人信息和案件信息
    private function getAddress($type,$showType='ALL',$showTypeVal='',$currPage=0,$perPageNum=0)//分级码，案件类型,展示类型（全部展示，按照id展示），类型值，分页当前页码，分页每页行数
    {
        if($showType=='ALL'){
            $sql="SELECT * FROM  {$type}_ajxx  where fjm = '{$showTypeVal}'";
        }elseif($showType=='AJ_TYPE'){
            $currPage = (int)$currPage;
            $start = ($currPage-1)*$perPageNum;
            $sql="SELECT * FROM  {$type}_ajxx  where fjm = '{$showTypeVal}' LIMIT {$start} {$perPageNum}";
        }elseif($showType=='AJ_ID'){
            $sql="SELECT * FROM  {$type}_ajxx  where aj_id='{$showTypeVal}'";
        }
        $query = $this->ajxq->query($sql);
        $res = $query->result();
        $aj_num = count($res);//案件数
        $ADDRESS=array();
        // 所有坐标数组，用于判断是否存在相同坐标，存在则内容显示在同一个坐标上
        $points = array();
        $reduce_num = 0;
        foreach ($res as $key => $value) {
            $aj_id = $value->aj_id;
            // 当事人
            $sql = "SELECT * FROM {$type}_dsr WHERE aj_id={$aj_id}";
            $query = $this->ajxq->query($sql);
            $dsr = $query->result();
            if(!empty($dsr)){
                $i=1;
                foreach ($dsr as $k => $val) {
                    // $point = $this->get_point();//通过地址得到坐标,返回一个数组array('x'=>232,'y'=>123);
                    $bz_info='';
                    if((int)$val->gis_id!=0)
                    {
                        $point = $this->regionmatch->getPointById($val->gis_id);
                        // if(in_array($point,$points))
                        // {
                        //     $p_key = array_search($point,$points);
                        //     $bz_info .= $ADDRESS[$p_key]['BZ_INFO'];
                        //     $ADDRESS[$p_key-$reduce_num]['BZ_BOTTOM']='';
                        //     array_splice($points,$p_key,1);
                        //     $reduce_num++;
                        //     // array_splice($ADDRESS,$p_key,1);
                        // }
                        $points[] = $point;
                    }else{
                        $point = array();
                    }
                    
                    // $point = array('x'=>1,'y'=>1,'gisId'=>1);//通过地址得到坐标,返回一个数组array('x'=>232,'y'=>123);
                    // 通过gis_id查询网格员以及调解员
                    // $sql = "(SELECT gis_id,person_id from person_add_lib WHERE gis_id=".$val->gis_id.") ad LEFT JOIN (SELECT id,name from person) p ON ad.person_id=p.id";
                    // $query = $this->db->query($sql);
                    // $person_arr = $query->result();
                    $person_arr=array();
                    if((int)$val->gis_id!=0)
                    {
                        // var_dump((int)$val->gis_id);
                        $person_arr = $this->regionmatch->getTWByGis($val->gis_id);
                    }
                    if(empty($person_arr['tjy'])||!isset($person_arr['tjy']))
                    {
                        $tjy='无';
                    }else{
                        $tjy='';
                        foreach ($person_arr['tjy']['name'] as $kt => $valt) {
                            $tjy.='<span style="cursor:pointer;" onclick="get_person_info('.$person_arr['tjy']['id'][$kt].')">'.$valt.'、</span>';
                        }
                    }
                    if(empty($person_arr['wgy'])||!isset($person_arr['wgy']))
                    {
                        $wgy='无';
                    }else{
                        $wgy='';
                        foreach ($person_arr['wgy']['name'] as $kt => $valt) {
                            $wgy.='<span style="cursor:pointer;" onclick="get_person_info('.$person_arr['wgy']['id'][$kt].')">'.$valt.'、</span>';
                        }
                    }
                    // $tjy = (empty($person_arr['tjy']))?'无':$person_arr['tjystr'];
                    // $wgy = (empty($person_arr['wgy']))?'无':$person_arr['wgystr'];
                    $ssdw=$val->ssdw;
                    $xb = (isset($val->xb))?$val->xb:'性别：无';
                    $mz = (isset($val->mz))?$val->mz:'民族：无';
                    $bz_info .= $i.'、'.$value->ah.'<br>立案日期：'.$value->larq.'<br>当事人：'.$val->xm.'('.$val->ssdw.')、'.$xb.'、'.$mz.'、身份证：'.$val->sfzh.'、联系电话：'.$val->lxdh."<br>";
                    $ADDRESS[]=array(
                    'ADD_TYPE'=>$ssdw,
                    'POINT'=>$point,
                    'NAME'=>$val->xm,
                    'ADD_NAME'=>$val->xxdz,
                    'BZ_INFO'=>$bz_info,
                    'BZ_BOTTOM'=>"<div style='position:absolute;bottom:0px;height：80px;width:80%;padding-top:10px;border-top:1px solid;'>法律顾问：".$tjy."；网格员：".$wgy."</div>"
                    );
                    $i++;
                }
            }
            // 财产地址
            $sql = "SELECT * FROM {$type}_ccszd WHERE aj_id='{$aj_id}'";
            $query = $this->ajxq->query($sql);
            $ccszd = $query->result();
            if(!empty($ccszd)){
                $i=1;
                foreach ($ccszd as $k => $val) {
                    // $point = array('x'=>1,'y'=>1,'gisId'=>1);//通过地址得到坐标,返回一个数组array('x'=>232,'y'=>123);
                    $point = $this->regionmatch->getPointById($val->gis_id);
                    $ADDRESS[]=array(
                    'ADD_TYPE'=>'财产',//财产
                    'POINT'=>$point,
                    'NAME'=>$val->ccdz,
                    'BZ_INFO'=>"地址：".$val->ccdz."<br>".$i.'、'.$value->ah.'<br>立案日期：'.$value->larq.'<br>财产类型：'.$val->cclx
                    );
                    $i++;
                }
            }
            
        }
        $aj_p_num=count($ADDRESS);//坐标数
        $data = array(
        'AJ_NUM'=>$aj_num,
        'AJ_P_NUM'=>$aj_p_num,
        'ADDRESS'=>$ADDRESS
        );
        return $data;
    }
    public function getUnthisArea()
    {
        $sql = 'SELECT * FROM map_case WHERE THIS_AREA=0';
        $query = $this->db->query($sql);
        $res = $query->result_array();
        // var_dump($res);die();
        return $res;
    }
    //搜索
    public function searchCase($val,$type)
    {
        if($type=='AH'){
            $sql = "SELECT * FROM map_case WHERE DO_AH ='{$val}'";
        }elseif($type=='ID'){
            $sql = "SELECT * FROM map_case WHERE ID ='{$val}'";
        }
        $query = $this->db->query($sql);
        $res = $query->row_array();
        if(count($res)==0){
            $sql = "SELECT * FROM map_case WHERE DO_AH LIKE'%{$val}%'";
            $query = $this->db->query($sql);
            $res = $query->row_array();
        }
        return $res;
    }
    //更新
    public function addOrUpdate($GIS_ID,$R_NAME,$ADDRESS,$POINT_X,$POINT_Y,$COURT_NAME,$DO_AH,$CASE_TYPE,$LA_DATE,$AN_REASON,$BZXR_NAME,$BD,$THIS_AREA,$NOTE)
    {
        $result='';
        $sql = "SELECT DO_AH FROM map_case WHERE DO_AH='{$DO_AH}'";
        $query = $this->db->query($sql);
        $res = $query->row();
        if($THIS_AREA==0)
        {
            $GIS_ID=0;
            $POINT_X=0;
            $POINT_Y=0;
            $R_ID='';
            $R_NAME='';
        }else{
            $regionData = $this->regionmatch->gistorid($GIS_ID);
            $R_ID = $regionData['R_ID'];
            $R_NAME = $regionData['R_NAME'];
        }
        $this->db->trans_start();
        if(empty($res))
        {
            $sql = "INSERT INTO map_case (
            R_ID,
            GIS_ID,
            R_NAME,
            ADDRESS,
            POINT_X,
            POINT_Y,
            COURT_NAME,
            DO_AH,
            CASE_TYPE,
            LA_DATE,
            AN_REASON,
            BZXR_NAME,
            BD,
            THIS_AREA,
            NOTE) VALUES (
            '{$R_ID}',
            {$GIS_ID},
            '{$R_NAME}',
            '{$ADDRESS}',
            $POINT_X,
            $POINT_Y,
            '{$COURT_NAME}',
            '{$DO_AH}',
            {$CASE_TYPE},
            '{$LA_DATE}',
            '{$AN_REASON}',
            '{$BZXR_NAME}',
            $BD,
            $THIS_AREA,
            '{$NOTE}'
            )";
            $query = $this->db->query($sql);
            if($query)
            {
                $result= "插入成功";
            }else{
                $result= "插入失败";
            }
        }else{
            $sql = "UPDATE map_case SET
            R_ID='{$R_ID}',
            GIS_ID={$GIS_ID},
            R_NAME='{$R_NAME}',
            ADDRESS='{$ADDRESS}',
            POINT_X=$POINT_X,
            POINT_Y=$POINT_Y,
            COURT_NAME='{$COURT_NAME}',
            DO_AH='{$DO_AH}',
            LA_DATE='{$LA_DATE}',
            AN_REASON='{$AN_REASON}',
            BZXR_NAME='{$BZXR_NAME}',
            BD=$BD,
            THIS_AREA=$THIS_AREA,
            NOTE='$NOTE' WHERE DO_AH='{$DO_AH}'";
            if($query = $this->db->query($sql))
            {
                $result= "更新成功";
            }else{
                $result= "更新失败";
            }
        }
        $sql = "select R_ID from map_case where R_ID = '{$R_ID}'";
        $query = $this->db->query($sql);
        $num = count($query->result_array());
        $sql = "UPDATE region set R_TC={$num} where R_ID='{$R_ID}'";
        $query = $this->db->query($sql);
        //更新address表
        $sql = "SELECT ADDRESS FROM address WHERE ADDRESS='{$ADDRESS}'";
        $query = $this->db->query($sql);
        $res = $query->row();
        if(empty($res))
        {
            $sql = "INSERT INTO address (
            ADDRESS,
            POINT_X,
            POINT_Y,
            R_ID
            ) VALUES (
            '{$ADDRESS}',
            {$POINT_X},
            {$POINT_Y},
            '{$R_ID}'
            )";
            $query = $this->db->query($sql);
        }else{
            $sql = "UPDATE address SET
            POINT_X='{$POINT_X}',
            POINT_Y='{$POINT_Y}'
            WHERE ADDRESS='{$ADDRESS}'";
            $query = $this->db->query($sql);
        }
        $this->db->trans_complete();
        return $result;
    }
    //删除
    public function deleteCase($an_hao)
    {
        $sql="SELECT R_ID FROM map_case WHERE DO_AH='{$an_hao}'";
        $query = $this->db->query($sql);
        $res = $query->row();
        $R_ID = $res->R_ID;
        $this->db->trans_start();
        $sql="DELETE FROM map_case WHERE DO_AH='{$an_hao}'";
        $query = $this->db->query($sql);
        $sql="SELECT R_TC FROM region WHERE R_ID='{$R_ID}'";
        $query = $this->db->query($sql);
        $res = $query->row();
        $num = $res->R_TC;
        $num = $num-1;
        $sql="UPDATE region SET R_TC={$num} WHERE R_ID='{$R_ID}'";
        $query = $this->db->query($sql);
        $this->db->trans_complete();
        $rows=$this->db->affected_rows();
        if($rows>0)
        {
            return '删除成功';
        }elseif($rows==0){
            return '删除失败，没有该案号';
        }
    }
    //获取个人其他信息
    public function getPersonOtherInfo($pId)
    {
        $sql = "SELECT photo_url, photo_type FROM person  WHERE ID = '{$pId}'";
        $query=$this->db->query($sql);
        $res = $query->row();
        $gis_id = "";
        $gis_name = "";
        if(!empty($res)){
            $sql = "SELECT a.gis_id, b.xian, b.village, b.cun FROM person_add_lib AS a LEFT JOIN cz_gis_library AS b ON a.gis_id = b.id WHERE person_id = ? AND b.xian IS NOT NULL AND b.village IS NOT NULL AND b.cun IS NOT NULL";
            $query = $this->db->query($sql, array($pId));
            $result = $query->result_array();
            if (!empty($result)) 
            {
                foreach ($result as $key => $value) {
                    $gis_id .= $value['gis_id'].",";
                    $gis_name .= $value['xian'].$value['village'].$value['cun'].",";
                }
            }
            $data = array(
            'photo'=>$res->photo_url,
            'photo_type'=>$res->photo_type,
            'gis_id'=>$gis_id,
            'gis_name'=>$gis_name
            );
        }
        else{
             $data = array(
            'photo'=>"",
            'photo_type'=>"",
            'gis_id'=>"",
            'gis_name'=>""
            );           
        }
        return $data;
    }
    //保存个人信息
    public function savePersonInfo($pId,$name,$sex,$csny,$nation,$sex,$education,$company,$ndsfd,$zzmm,$duty,$zzet,$photo,$phototype,$gis_id)
    {
        $pId = (empty($pId))?"":$pId;
        $name = (empty($name))?"":$name;
        $sex = (empty($sex))?"":$sex;
        $csny = (empty($csny))?"":$csny;
        $nation = (empty($nation))?"":$nation;
        $sex = (empty($sex))?"":$sex;
        $education = (empty($education))?"":$education;
        $company = (empty($company))?"":$company;
        $ndsfd = (empty($ndsfd))?"":$ndsfd;
        $zzmm = (empty($zzmm))?"":$zzmm;
        $duty = (empty($duty))?"":$duty;
        $zzet = (empty($zzet))?"":$zzet;
        $photo = (empty($photo))?"":$photo;
        $phototype = (empty($phototype))?"":$phototype;
        $result=0;//插入
        // if (!empty($photo)) {
        //     //echo $photo;
        //     $picturedata = substr($photo, strpos($photo,",")+1, strlen($photo));
        //     //echo $picturedata;
        //     $picturedata = base64_decode($picturedata);
        //     $picturedata = addslashes($picturedata);
        // }
        // else{
        //     $picturedata = "";
        // }
        if(empty($pId))
        {
            // var_dump($phone);die();
            $sql = "INSERT INTO person (name,sex,csny,nation,sex,education,company,ndsfd,zzmm,duty,zzet,photo_url,photo_type) VALUES ('{$name}','{$sex}','{$csny}',{$nation},'{$education}',{$company},'{$ndsfd}',{$zzmm},'{$duty}','{$zzet}','{$phone}','{$phototype}')";
            $query = $this->db->query($sql);
            $result = $this->db->insert_id();
        }else{

            $sql = "UPDATE person SET name='{$name}',sex='{$sex}',csny='{$csny}',nation='{$nation}',education='{$education}',company='{$company}',ndsfd='{$ndsfd}',zzmm='{$zzmm}',duty='{$duty}',zzet='{$zzet}', photo_url = '{$photo}', photo_type = '{$phototype}' WHERE ID = {$pId}";
            //echo $sql;die();
            $query = $this->db->query($sql);
            if ($this->db->affected_rows() > 0)
            {
                if (!empty($gis_id)) {
                    if (stripos($gis_id, ",") >= 0) {
                        $gis_id_arr = explode(",", $gis_id);
                        $gis_id_arr = explode(",", $gis_id);
                        foreach ($gis_id_arr as $key => $value) {
                            $sql = "SELECT COUNT(0) AS total FROM person_add_lib WHERE gis_id = ? AND person_id = ?";
                            $query = $this->db->query($sql, array($value, $pId));
                            $row = $query->row_array();
                            if ($row['total'] > 0) {
                            }
                            else{
                                $sql = "SELECT ADDRESS FROM cz_gis_library WHERE ID = ?";
                                $query = $this->db->query($sql,array($value));
                                $row = $query->row_array();
                                $sql = "INSERT INTO person_add_lib (gis_id, address, person_id) VALUES(?,?,?)";
                                $query = $this->db->query($sql, array($value,$row['ADDRESS'],$pId));
                            }
                        }
                    }
                    else{
                        echo "1111b1";die();
                        $sql = "SELECT COUNT(0) AS total FROM person_add_lib WHERE id = ? AND person_id = ?";
                        $query = $this->db->query($sql, array($pId, $gis_id));
                        $row = $query->row_array();
                        if (row['total'] > 0) {
                        }
                        else{
                            $sql = "SELECT ADDRESS FROM cz_gis_library WHERE ID = ?";
                            $query = $this->db->query($sql,array($gis_id));
                            $row = $query->row_array();
                            $sql = "INSERT INTO person_add_lib (gis_id, address, person_id) VALUES(?,?,?)";
                            $query = $this->db->query($sql, array($gis_id,$sql['ADDRESS'],$pId));
                        }                        
                    }
                    $result=2;//更新
                }
                else{
                    $result=0;//更新失败
                }
            }else 
            {
                $result=0;//更新失败
            }          
        }
        if($query==0||$query==false)
        {
            $result = 0;
        }
        return $result;
    }
    //删除人员
    public function deletePerson($id)
    {
        $sql = "DELETE FROM person WHERE ID={$id}";
        $query = $this->db->query($sql);
        return $query;
    }
    //人员信息分页
    public function showPersonList($page,$perPageNum,$searchType,$typeVal)
    {
        $page = (int)$page;
        $start = ($page-1)*$perPageNum;
        if($searchType=='ALL')
        {
            $sql = "SELECT * FROM cz_person LIMIT $start,$perPageNum";
        }elseif($searchType=='R_ID'){
            $sql = "SELECT * FROM cz_person WHERE {$searchType} = '{$typeVal}' LIMIT $start,$perPageNum";
        }elseif($searchType=='USER_NAME')
        {
            $sql = "SELECT * FROM cz_person WHERE {$searchType} LIKE '%{$typeVal}%' LIMIT $start,$perPageNum";
        }
        $query=$this->db->query($sql);
        $res = $query->result();
        $data = array();
        foreach ($res as $key => $value) {
            if(!empty($value->GIS_ID)){
                $add =$this->regionmatch->idtoregionname($value->GIS_ID);
            }else{
                $add = '无';
            }
            
            $sex = ($value->USER_SEX=='male')?'男':'女';
            $gisId = ($value->GIS_ID==NULL)?'无':$value->GIS_ID;
            $phone = ($value->USER_PHONE==0)?'':$value->USER_PHONE;
            $age = ($value->USER_AGE==0)?'':$value->USER_AGE;
            $data[] = array(
            'ID'=>$value->ID,
            'ADDRESS'=>$add,
            'GIS_ID'=>$value->GIS_ID,
            'USER_EMAIL'=>$value->USER_EMAIL,
            'USER_NAME'=>$value->USER_NAME,
            'USER_SEX'=>$sex,
            'USER_AGE'=>$age,
            'USER_DUTY'=>$value->USER_DUTY,
            'USER_PHONE'=>$phone,
            'PHOTO_ID'=>$value->PHOTO_ID
            );
        }
        return $data;
    }
    //展示总页数
    public function showPageNum($type='ALL',$val='ALL')
    {
        if($type=='ALL')
        {
            $sql = "SELECT id FROM cz_person";
        }elseif($type=='USER_NAME'){
            $sql = "SELECT id FROM cz_person WHERE USER_NAME='{$val}'";
        }elseif($type=='CASE')
        {
            $sql = "SELECT id FROM map_case";
        }
        $query=$this->db->query($sql);
        $res = count($query->result());
        return $res;
    }
    //执行导入人员表
    public function sqlTabl($sql)
    {
        $query = $this->db->query($sql);
        if($this->db->affected_rows()==0)
        return '插入失败，请按照模板文件格式插入';
        else
            return $query;
    }
    //查询人员
    public function searchPerson($user_name)
    {
        $sql = "SELECT * FROM cz_person WHERE USER_NAME LIKE '%{$user_name}%'";
        $query = $this->db->query($sql);
        return $query->result();
    }
    //获取名称
    public function getAddName()
    {
        $sql="SELECT ID,ADDRESS,P_ID FROM cz_gis_library_copy";
        $query = $this->db->query($sql);
        $res = $query->result();
        $data = array();
        foreach ($res as $key => $value) {
            $add = $value->ADDRESS;
            $bfadd=$value->ADDRESS;
            if($value->P_ID!=0){
                $PID = $value->P_ID;
                $sql = "SELECT ADDRESS FROM cz_gis_library_copy WHERE ID ={$PID}";
                $query = $this->db->query($sql);
                $res2 = $query->row();
                $p_name = $res2->ADDRESS;
                $add = $p_name.$add;
            }
            $data[] = array('ADDRESS'=>$add,'ID'=>$value->ID,'BF_ADD'=>$bfadd);
        }
        return $data;
    }
    //插入坐标库脚本
    public function insertPoint($id,$x,$y)
    {
        // $sql="SELECT P_ID FROM cz_gis_library_copy WHERE ADDRESS='{$add}'";
        // $query = $this->db->query($sql);
        // $res = $query->row();
        // $pid = $res->P_ID;
        // if($pid!=0&&isset($pid))
        // {
        //     $sql = "SELECT ADDRESS FROM cz_gis_library_copy WHERE ID={$pid}";
        //     $query = $this->db->query($sql);
        //     $res = $query->row();
        //     $res = $res->ADDRESS;
        //     $add =$res.$add;
        // }
        $sql = "UPDATE cz_gis_library_copy SET POINT_X={$x},POINT_Y={$y} WHERE ID={$id}";
        $query = $this->db->query($sql);
        if($this->db->affected_rows()==0)
        {
            return $sql.'未插入成功';
        }
    }
    //更新重复坐标
    
    //获得区域树形结构
    public function regionNode()
    {
        $sql = "SELECT ID,P_ID,ADDRESS FROM cz_gis_library_copy order by P_ID,ID";
        $query=$this->db->query($sql);
        $res=$query->result();
        $data = array();
        foreach ($res as $key => $value) {
            $data[]=array('id'=>$value->ID,'pId'=>$value->P_ID,'name'=>$value->ADDRESS);
        }
        // var_dump($data);die();
        return $data;
    }
    //显示人员数
    public function showPersonNum()
    {
        $sql = "SELECT USER_DUTY FROM cz_person";
        $query = $this->db->query($sql);
        $res = $query->result();
        $data = array();
        foreach ($res as $key => $value) {
            $name = $value->USER_DUTY;
            switch ($name) {
                case '陪审员':
                    $name='psy';
                    break;
                case '执行员':
                    $name='zxy';
                    break;
                case '网格员':
                    $name='wgy';
                    break;
        }
        if(!isset($data[$name]))
        {
            $data[$name]=0;
        }
        $data[$name]+=1;
    }
    return $data;
}
//显示案件列表
public function showCaseList($page,$perPageNum,$searchType,$typeVal)
{
    $page = (int)$page;
    $start = ($page-1)*$perPageNum;
    if($searchType=='ALL')
    {
        $sql = "SELECT * FROM map_case LIMIT $start,$perPageNum";
    }elseif($searchType=='R_ID'){
        $sql = "SELECT * FROM map_case WHERE {$searchType} = '{$typeVal}' LIMIT $start,$perPageNum";
    }
    // elseif($searchType=='USER_NAME')
    // {
    //     $sql = "SELECT * FROM cz_person WHERE {$searchType} LIKE '%{$typeVal}%' LIMIT $start,$perPageNum";
    // }
    $query=$this->db->query($sql);
    $res = $query->result();
    $data = array();
    foreach ($res as $key => $value) {
        // if(!empty($value->GIS_ID)){
        //     $add =$this->regionmatch->idtoregionname($value->GIS_ID);
        // }else{
        //     $add = '无';
        // }
        
        // $sex = ($value->USER_SEX=='male')?'男':'女';
        // $gisId = ($value->GIS_ID==NULL)?'无':$value->GIS_ID;
        // $phone = ($value->USER_PHONE==0)?'':$value->USER_PHONE;
        // $age = ($value->USER_AGE==0)?'':$value->USER_AGE;
        $data[] = array(
        'DO_AH'=>$value->DO_AH,
        'AN_REASON'=>$value->AN_REASON,
        'COURT_NAME'=>$value->COURT_NAME,
        'R_NAME'=>$value->R_NAME,
        'BZXR_NAME'=>$value->BZXR_NAME,
        'LA_DATE'=>$value->LA_DATE,
        'ADDRESS'=>$value->ADDRESS,
        'ID'=>$value->ID,
        'GIS_ID'=>$value->GIS_ID
        );
    }
    return $data;
}
public function indexShowCaseList($currpage,$perPageNum,$fjm,$case_type='ALL'){
    $currpage = (int)$currpage;
    $start = ($currpage-1)*$perPageNum;
    if($case_type=='ALL'){
        $sql="(SELECT * FROM sp_ajxx WHERE fjm='{$fjm}') union all (SELECT * FROM zx_ajxx WHERE fjm='{$fjm}')  ORDER BY larq  LIMIT {$start},{$perPageNum}";
        $query = $this->ajxq->query($sql);
        $res = $query->result();
    }
    return $res;
}
public function indexShowPageNum($type,$val,$fjm='')
{
    $num=0;
    if($type=='CASE'&&$fjm!=''){
        if($val=='ALL'){
            $sql = "(SELECT aj_id FROM sp_ajxx WHERE fjm='{$fjm}') union all (SELECT aj_id FROM zx_ajxx WHERE fjm='{$fjm}') ";
            $query = $this->ajxq->query($sql);
            $res = $query->result();
            $num = count($res);
        }
        elseif($val=='SP'){
            $sql = "SELECT aj_id FROM sp_ajxx WHERE fjm='{$fjm}'";
            $query = $this->ajxq->query($sql);
            $res = $query->result();
            $num = count($res);
        }elseif($val=='ZX'){
            $sql = "SELECT aj_id FROM zx_ajxx WHERE fjm='{$fjm}'";
            $query = $this->ajxq->query($sql);
            $res = $query->result();
            $num = count($res);
        }
        
    }
    return $num;
}

//首页法院数，法官人数以及 立案数和陪审员数等
public function getBaseData($type='all')
{
    $data=array();
    $aj_num=0;
    $aj_p_num=0;
    if($type=='all')
    {
        $arr = $this->getAjNumAndPNum('sp');
        $aj_num+=$arr['AJ_NUM'];
        $aj_p_num+=$arr['AJ_P_NUM'];
        $arr = $this->getAjNumAndPNum('zx');
        $aj_num+=$arr['AJ_NUM'];
        $aj_p_num+=$arr['AJ_P_NUM'];
    }
    $data= array(
    'AJ_NUM'=>$aj_num,
    'AJ_P_NUM'=>$aj_p_num
    );
    return $data;
}
public function getAjNumAndPNum($type)//获取案件数和地点数
{
    $sql = "SELECT aj_id from {$type}_ajxx";
    $query = $this->ajxq->query($sql);
    $aj_res = $query->result();
    $aj_num = count($aj_res);
    $aj_p_num = 0;
    foreach ($aj_res as $key => $value) {
        $aj_id = $value->aj_id;
        //dsr
        $sql = "SELECT dsr_id from {$type}_dsr WHERE aj_id = $aj_id";
        $query = $this->ajxq->query($sql);
        $aj_dsr = $query->result();
        $aj_p_num += count($aj_dsr);
        //cc
        $sql = "SELECT ccszd_id from {$type}_ccszd WHERE aj_id = $aj_id";
        $query = $this->ajxq->query($sql);
        $aj_cc = $query->result();
        $aj_p_num +=count($aj_cc);
    }
    return array(
    'AJ_NUM'=>$aj_num,
    'AJ_P_NUM'=>$aj_p_num
    );
}
public function getSpZxNum()
{
    $fjm_arr = array('K60','K61','K67','K68','K69','K6A','K6B','K6B','K6C');
    $data = array();
    foreach ($fjm_arr as $key => $value) {
        $data[$value]['sp']=$this->getAjNum($value,'sp');
        $data[$value]['zx']=$this->getAjNum($value,'zx');
    }
    return $data;
}
private function getAjNum($fjm,$type)
{
    $sql = "SELECT aj_id from {$type}_ajxx where fjm='{$fjm}'";
    $query = $this->ajxq->query($sql);
    $aj_res = $query->result();
    $aj_num = count($aj_res);
    return $aj_num;
}
public function getPersonInfo($id)
{
    $sql = "SELECT * from person where id='{$id}'";
    $query = $this->db->query($sql);
    $res = $query->row();
    $img = $res->photo;
    $res->photo_name = time();
    $a = file_put_contents('./'.$res->photo_name.'.jpg', $img);
    $res->photo = '';
    return $res;
}

}
?>