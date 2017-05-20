<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class file_delete extends CI_Controller {
    
    public function __construct()
    {
        parent::__construct();
    }
    //删除upload里的文件
    public function delete_file()
    {
        $file_name = $this->input->post('file_name');
        return unlink('upload/'.$file_name);
    }
}