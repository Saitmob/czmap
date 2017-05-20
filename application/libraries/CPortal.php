<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class CPortal {

    private $CI;
    private $portal;

    public function __construct()
    {
        $this->CI =& get_instance();
        $this->portal = $this->CI->load->database('portal', TRUE);
    }

    //参数$searchUser可为email或人员标识，参数可为单个字符串或数组
    //例GetUserInfo('gyzzt@gxfy.com')
    //  GetUserInfo(180224919)
    //  GetUserInfo(array('gyzzt@gxfy.com', 'gylinxh@gxfy.com'))
    //  GetUserInfo(array(180224919, 180224927))

    //返回值为数组，若参数为email，数组下标为邮箱，若参数为人员标识，数组下标为人员标识
    //例array (size=1)
    //   'gyzzt@gxfy.com' => 
    //     array (size=10)
    //       'rybs' => string '180224919' (length=9)
    //       'nw_user_id' => string 'gyzzt' (length=5)
    //       'email' => string 'gyzzt@gxfy.com' (length=14)
    //       'name' => string '张志涛' (length=9)
    //       'court_dm' => string '2750' (length=4)
    //       'court_fjm' => string 'K00' (length=3)
    //       'court_name' => string '广西壮族自治区高级人民法院' (length=39)
    //       'dept_jgbs' => string '180224042' (length=9)
    //       'dept_id' => string '2547' (length=4)
    //       'dept_name' => string '运维组' (length=9)
    //       'mobile' => string '18776884053' (length=11)
    public function GetUserInfo($searchUser)
    {
        if (!is_array($searchUser))
        {
            $searchUser = array($searchUser);
        }

        if (strpos($searchUser[0], '@') !== FALSE)
        {
            $searchType = 'r.dlm';
        }
        else
        {
            $searchType = 'r.rybs';
        }

        $sql = "SELECT 
                    r.rybs,
                    r.nwid,
                    r.dlm,
                    f.DM,
                    r.fy,
                    f.MC AS court_name,
                    r.xm,
                    r.jgbs,
                    o.orgId,
                    o.MC AS dept_name,
                    u.SJHM,
                    u.unitPhone
                FROM
                    org_user_rybs r,
                    org_user u,
                    org_orginfo o,
                    org_fyxx f
                WHERE
                    {$searchType} IN ?
                        AND r.jgbs = o.JGBS
                        AND r.fy = f.FJM
                        AND r.rybs = u.RYBS";
        $query = $this->portal->query($sql, array($searchUser));
        $user = array();
        foreach ($query->result() as $row)
        {
            if (isset($row->SJHM) && !empty($row->SJHM) && !is_null($row->SJHM))
            {
                $mobile = $row->SJHM;
            }
            else
            {
                $mobile = '';
            }
            if (isset($row->unitPhone) && !empty($row->unitPhone) && !is_null($row->unitPhone))
            {
                $phone = $row->unitPhone;
            }
            else
            {
                $phone = '';
            }
            if ($searchType === 'r.dlm')
            {
                $user[$row->dlm] = array(
                    'rybs' => $row->rybs,
                    'nw_user_id' => $row->nwid,
                    'email' => $row->dlm,
                    'name' => $row->xm,
                    'court_dm' => $row->DM,
                    'court_fjm' => $row->fy,
                    'court_name' => $row->court_name,
                    'dept_jgbs' => $row->jgbs,
                    'dept_id' => $row->orgId,
                    'dept_name' => $row->dept_name,
                    'mobile' => $mobile,
                    'phone' => $phone
                );
            }
            else
            {
                $user[$row->rybs] = array(
                    'rybs' => $row->rybs,
                    'nw_user_id' => $row->nwid,
                    'email' => $row->dlm,
                    'name' => $row->xm,
                    'court_dm' => $row->DM,
                    'court_fjm' => $row->fy,
                    'court_name' => $row->court_name,
                    'dept_jgbs' => $row->jgbs,
                    'dept_id' => $row->orgId,
                    'dept_name' => $row->dept_name,
                    'mobile' => $mobile,
                    'phone' => $phone
                );
            }
        }
        return $user;
    }

    public function GetAllCourt()
    {
        $court = array();
        $sql = "SELECT FJM, MC FROM org_fyxx ORDER BY fyId";
        $query = $this->portal->query($sql);
        foreach ($query->result() as $row)
        {
            $court[$row->FJM] = $row->MC;
        }
        return $court;
    }

    public function GetCourtFjmByRybs($rybs)
    {
        $sql = "SELECT FY FROM org_user WHERE RYBS = ?";
        $query = $this->portal->query($sql, array($rybs));
        $row = $query->row();
        return $row->FY;
    }

}