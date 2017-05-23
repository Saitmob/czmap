<?php
session_start();
$CI =& get_instance();
$CI->load->library('phpcas');
$CI->phpcas->client(CAS_VERSION_2_0, '147.1.6.16', 8080, '/cas');
$CI->phpcas->setNoCasServerValidation();
$CI->phpcas->forceAuthentication();
if (!isset($_SESSION['isLoginProjectManage']))
{
    //获得CAS登录用户名
    $user_email = $CI->phpcas->getUser();
    //$user_id = "gyzzt@gxfy.com";
    $CI->load->library('cportal');
    $user_info = $CI->cportal->GetUserInfo($user_email);
    if (sizeof($user_info) > 0)
    {
        //登录用户所属法院代码，查案件用
        $_SESSION['court_dm'] = $user_info[$user_email]['court_dm'];
        //登录用户所属法院分级码
        $_SESSION['court_fjm'] = $user_info[$user_email]['court_fjm'];
        //登录用户所属法院名称
        $_SESSION['court_name'] = $user_info[$user_email]['court_name'];
        //登录用户人员标识
        $_SESSION['user_rybs'] = $user_info[$user_email]['rybs'];
        //登录用户邮箱
        $_SESSION['user_email'] = $user_info[$user_email]['email'];
        //登录用户姓名
        $_SESSION['user_name'] = $user_info[$user_email]['name'];
        //登录用户手机号
        $_SESSION['user_mobile'] = $user_info[$user_email]['mobile'];
        //部门ID
        $_SESSION['department_id'] = $user_info[$user_email]['dept_id'];
        //部门名称
        $_SESSION['department_name'] = $user_info[$user_email]['dept_name'];
        
        $_SESSION['isLoginProjectManage'] = TRUE;
    }
    else
    {
        echo '当前登录账户异常！';
        exit();
    }
    
}

if (isset($_REQUEST['logout']))
{
    $_SESSION = array();
    session_destroy();
    $CI->load->helper('url');
    $logoutService = base_url();
    // $this->phpcas->logoutWithRedirectService("http://192.168.1.199:8050/cas/logout?service=$logoutService");
    $this->phpcas->logoutWithRedirectService("http://147.1.6.16:8080/cas/logout?service=$logoutService");
}