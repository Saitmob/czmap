<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class caseDetail extends CI_Controller {
    
    public function __construct()
    {
        parent::__construct();
        //$this->load->model('map_case_model','mapcase');
        $this->load->model('case_detail_model','case');
    }
    //
    public function insertSpAjDetail()
    {
        $AH = $this->input->post('AH');
        $RX_HYTCRBS= $this->input->post('RX_HYTCRBS');
        $SSDW= $this->input->post('SSDW');
        $RX_FY= $this->input->post('RX_FY');
        $RX_AJZT= $this->input->post('RX_AJZT');
        $RX_AYMC= $this->input->post('RX_AYMC');
        $RX_SJYBS= $this->input->post('RX_SJYBS');
        $RX_SJY= $this->input->post('RX_SJY');
        $RX_CBR= $this->input->post('RX_CBR');
        $RX_CBBMMC= $this->input->post('RX_CBBMMC');
        $RX_HYTCY= $this->input->post('RX_HYTCY');
        $RX_CBRBS= $this->input->post('RX_CBRBS');
        $RX_AJLX= $this->input->post('RX_AJLX');
        $AJBS= $this->input->post('AJBS');
        $MC= $this->input->post('MC');
        $data = $this->case->insertSpAjDetail($AH,$RX_HYTCRBS,$SSDW,$RX_FY,$RX_AJZT,$RX_AYMC,$RX_SJYBS,$RX_SJY,$RX_CBR,$RX_CBBMMC,$RX_HYTCY,$RX_CBRBS,$RX_AJLX,$AJBS,$MC);
        echo $data;
    }
    public function insertZxAjDetail()
    {
        $AH = $this->input->post('AH');
        $data = $this->case->insertZxAjDetail($AH);
        echo json_encode($data);
    }
    //审判案件详情
    public function getcaseDetail(){
        $an_hao = urldecode($_GET['AH']);
        $type = urldecode($_GET['type']);
        //$case_type = $_GET['CASE_TYPE'];
        // $spsoap =  new SoapClient("http://147.1.4.28:8080/dwjk/services/GxsssjService?wsdl");
        // $spsoap =  new SoapClient("http://192.168.1.107:8080/dwjk/services/GxsssjService?wsdl");
        // $data = $spsoap->getAj(array('ah' => $an_hao, 'dsr' => ''));
        $data = $this->case->getCaseDetail($an_hao,$type);
        if ($type == 'sp') {
            $data['casetype'] = 'sp';
            $this->load->view('spcaseDetailView',$data);
        }
        else{
            $data['casetype'] = 'zx';
            $this->load->view('zxcaseDetailView',$data);
        }
        
    }
}