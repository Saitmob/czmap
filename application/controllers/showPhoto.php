<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class showPhoto extends CI_Controller {
    
    public function __construct()
    {
        parent::__construct();
    }
    public function index()
    {
        $photo = $_GET['photo'];
        $type = $_GET['type'];
        // header("Content-type:image/".$type);
        // echo base64_decode($photo);
        
        $img = base64_decode($photo);
        $a = file_put_contents('./test.jpg', $img);//返回的是字节数
        
    }
    
}