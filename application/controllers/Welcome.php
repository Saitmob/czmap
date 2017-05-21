<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Welcome extends CI_Controller {
    
    public function __construct()
    {
        parent::__construct();
        $this->load->model('map_case_model','mapcase');
    }
    public function init()
    {
        $data['court_dm'] = $_SESSION['court_dm'];
        //登录用户所属法院分级码
        $data['court_fjm'] = $_SESSION['court_fjm'];
        //登录用户所属法院名称
        $data['court_name'] = $_SESSION['court_name'];
        //登录用户人员标识
        $data['user_rybs'] = $_SESSION['user_rybs'];
        //登录用户邮箱
        $data['user_email'] = $_SESSION['user_email'];
        //登录用户姓名
        $data['user_name'] = $_SESSION['user_name'];
        //登录用户手机号
        $data['user_mobile'] = $_SESSION['user_mobile'];
        //部门ID
        $data['department_id'] = $_SESSION['department_id'];
        //部门名称
        $data['department_name'] = $_SESSION['department_name'];
        echo json_encode($data);
    }
    //退出
    public function logout()
    {
        $this->load->library('phpcas');
        $_SESSION = array();
        session_destroy();
        $logoutService = base_url();
        $this->phpcas->logoutWithRedirectService("http://192.168.1.199:8050/cas/logout?service=$logoutService");
    }
    public function index()
    {
        // $data = $this->mapcase->getCaseNum();
        $data = $this->mapcase->getBaseData();
        $this->load->view('index',$data);
    }
    // public function baiduMap($r_id)
    // {
    // 	$data=array(
    // 		'region'=>$r_id
    // 	);
    // 	var_dump($r_id);die();
    // 	$this->load->view('baiduMap',$data);
    // }
    public function getRegionData()
    {
        $data = $this->mapcase->getRegionData();
        echo json_encode($data);
    }
    //获取某地区案件数以及信息
    public function getOneRegionData()
    {
        $r_id = $this->input->post('r_id');
        $data = $this->mapcase->getOneRegionData($r_id);
        echo json_encode($data);
    }
    
    //获取非崇左市区域案件信息
    public function getUnthisArea()
    {
        $data = $this->mapcase->getUnthisArea();
        echo json_encode($data);
    }
    //非崇左地区案件视图
    public function unthisArea()
    {
        $this->load->view('unthisAreaView');
    }
    //增加或删除数据管理页
    public function addNDelData()
    {
        $this->load->view('addNDelDataView');
    }
    //人员信息管理页
    public function personManage()
    {
        // $pageNum = $this->mapcase->showPageNum();
        // $data = array(
        // 	'pageNum'=>$pageNum
        // );
        $this->load->view('personManageView');
    }
    //搜索
    public function searchCase()
    {
        $val = $this->input->post('val');
        $type = $this->input->post('type');
        $data = $this->mapcase->searchCase($val,$type);
        echo json_encode($data);
    }
    //更改数据
    public function addOrUpdate()
    {
        $GIS_ID = $this->input->post('GIS_ID');
        $R_NAME = $this->input->post('R_NAME');
        $ADDRESS = $this->input->post('ADDRESS');
        $POINT_X = $this->input->post('POINT_X');
        $POINT_Y = $this->input->post('POINT_Y');
        $COURT_NAME = $this->input->post('COURT_NAME');
        $DO_AH = $this->input->post('DO_AH');
        $CASE_TYPE = $this->input->post('CASE_TYPE');
        $LA_DATE = $this->input->post('LA_DATE');
        $AN_REASON = $this->input->post('AN_REASON');
        $BZXR_NAME = $this->input->post('BZXR_NAME');
        $BD = $this->input->post('BD');
        $THIS_AREA = $this->input->post('THIS_AREA');
        $NOTE = $this->input->post('NOTE');
        if(!empty($DO_AH)){
            $data = $this->mapcase->addOrUpdate($GIS_ID,$R_NAME,$ADDRESS,$POINT_X,$POINT_Y,$COURT_NAME,$DO_AH,$CASE_TYPE,$LA_DATE,$AN_REASON,$BZXR_NAME,$BD,$THIS_AREA,$NOTE);
            echo $data;
        }else{
            echo '请填写案号';
        }
        
    }
    //删除数据
    public function deleteCase()
    {
        $an_hao = $this->input->post('anHao');
        if(!empty($an_hao))
        {
            $data = $this->mapcase->deleteCase($an_hao);
            echo $data;
        }else{
            echo '请填写案号';
        }
        
    }
    //获取个人简介和照片
    public function getPersonOtherInfo()
    {
        $pId = $this->input->post('pId');
        if(!empty($pId))
        {
            $data = $this->mapcase->getPersonOtherInfo($pId);
            echo json_encode($data);
        }
    }
    //保存人员信息
    public function savePersonInfo()
    {
        $email = $this->input->post('email');
        $name = $this->input->post('name');
        if(!empty($name))
        {
            $pId = $this->input->post('pId');
            $gis_id = $this->input->post('gis_id');
            $photoId = empty($this->input->post('photoId'))?0:$this->input->post('photoId');
            $phototype = $this->input->post('phototype');
            $photourl = $this->input->post('photourl');
            $sex = $this->input->post('sex');
            $csny = $this->input->post('age');
            $nation = $this->input->post('nation');
            $education = $this->input->post('education');
            $company = $this->input->post('company');
            $ndsfd = $this->input->post('ndsfd');
            $zzmm = $this->input->post('zzmm');
            $duty = $this->input->post('duty');
            $zzet = $this->input->post('zzet');
            $phone = $this->input->post('phone');
            $email = $this->input->post('email');
            $rybs = $this->input->post('rybs');
            $operator = (isset($_SESSION['user_email']))?$_SESSION['user_email']:"test";
            $data = $this->mapcase->savePersonInfo($pId,$name,$sex,$csny,$nation,$duty,$education,$company,$ndsfd,$zzmm,$rybs,$zzet,$photourl,$phototype,$gis_id,$phone,$email,$rybs);
            echo $data;
        }
        else{
            $data = 0;
            echo $data;
        }
    }
    //人员列表
    public  function showPersonList()
    {
        $page = $this->input->post('page');
        if(!empty($page)){
            $perPageNum = $this->input->post('perPageNum');
            $searchType = $this->input->post('searchType');
            $typeVal = $this->input->post('typeVal');
            $res = $this->mapcase->showPersonList($page,$perPageNum,$searchType,$typeVal);
            echo json_encode($res);
        }
    }
    //人员分页页数
    public function showPageNum()
    {
        $type = $this->input->post('type');
        $val = $this->input->post('val');
        $pageNum = $this->mapcase->showPageNum($type,$val);
        echo $pageNum;
    }
    //查询人员
    public function searchPerson()
    {
        $user_name = $this->input->post('user_name');
        if(!empty($user_name)){
            $res = $this->mapcase->searchPerson($user_name);
            echo json_encode($res);
        }
    }
    //
    public function  getAddName()
    {
        $data = $this->mapcase->getAddName();
        echo json_encode($data);
    }
    //插入数据库
    public function insertPoint()
    {
        $add = $this->input->post('id');
        $x = $this->input->post('x');
        $y = $this->input->post('y');
        $data = $this->mapcase->insertPoint($add,$x,$y);
        echo $data;
    }
    //得到地区树形结构
    public function regionNode()
    {
        $data = $this->mapcase->regionNode();
        echo json_encode($data);
    }
    //得到坐标
    public function getPointById()
    {
        $GIS_ID = $this->input->post('gisId');
        $this->load->library('regionmatch');
        $data = $this->regionmatch->getPointById($GIS_ID);
        echo json_encode($data);
    }
    //删除人员
    public function deletePerson()
    {
        $id = $this->input->post('id');
        $data = $this->mapcase->deletePerson($id);
        echo $data;
    }
    //显示三个职位人员数量
    public function showPersonNum()
    {
        $data = $this->mapcase->showPersonNum();
        echo json_encode($data);
    }
    //展示案件信息
    public function showCaseList()
    {
        $page = $this->input->post('page');
        if(!empty($page)){
            $perPageNum = $this->input->post('perPageNum');
            $searchType = $this->input->post('searchType');
            $typeVal = $this->input->post('typeVal');
            $res = $this->mapcase->showCaseList($page,$perPageNum,$searchType,$typeVal);
            echo json_encode($res);
        }
    }
    // ------------------new----------
    //获取某地区案件数以及信息 废弃旧的 getOneRegionData
    public function getOneRData()
    {
        $fjm = $this->input->post('fjm');
        $data = $this->mapcase->getOneRData($fjm);
        echo json_encode($data);
    }
    // 首页展示案件列表 废弃旧的
    public function indexShowCaseList()
    {
        $page = $this->input->post('page');
        if(!empty($page)){
            $perPageNum = $this->input->post('perPageNum');
            $searchType = $this->input->post('case_type');
            $fjm = $this->input->post('fjm');
            $res = $this->mapcase->indexShowCaseList($page,$perPageNum,$fjm,'ALL');
            echo json_encode($res);
        }
    }
    // 分页页数方法，废弃旧的
    public function indexShowPageNum()
    {
        $type = $this->input->post('type');
        $val = $this->input->post('val');
        $fjm = $this->input->post('fjm');
        $pageNum = $this->mapcase->indexShowPageNum($type,$val,$fjm);
        echo $pageNum;
    }
    //通过案件id获取地点信息
    public function getRdataById()
    {
        $aj_id = $this->input->post('aj_id');
        if(!empty($aj_id))
        {
            $aj_type = $this->input->post('aj_type');
            $fjm = $this->input->post('fjm');
            $data = $this->mapcase->getRdataById($fjm,$aj_type,'AJ_ID',$aj_id);
            echo json_encode($data);
        }
        
    }
    
    // 名称匹配测试
    public function getPointByName()
    {
        // $this->load->library('regionmatch');
        // $p = $this->regionmatch->nameToPoint('大新县雷平镇振兴村甫留屯');
        $data=$this->mapcase->getOneRData('K00');
        var_dump($data);
    }
    //得到各个法院的诉讼案件以及执行案件和诉讼案件数
    public function getSpZxNum()
    {
        $data = $this->mapcase->getSpZxNum();
        echo json_encode($data);
    }
    public function getPersonInfo()
    {
        $id = $this->input->post('id');
        if(!empty($id))
        {
            $data = $this->mapcase->getPersonInfo($id);
            // var_dump($data);
            echo json_encode($data);
        }
    }
}