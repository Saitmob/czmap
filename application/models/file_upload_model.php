<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class file_upload_model extends CI_Model {
    
    public function __construct()
    {
        parent::__construct();
        $this->load->database();
    }
    public function insertFile($file_path,$upload_user,$photo_id='')
    {
        if($photo_id=='')
        {
            $sql = "INSERT INTO user_files (FILE_PATH,UPLOAD_USER_EMAIL) VALUES ('{$file_path}','{$upload_user}')";
            $query = $this->db->query($sql);
            if($query)
            {
                return $this->db->insert_id();
            }
        }else {
            $sql = "UPDATE user_files SET FILE_PATH='{$file_path}', UPLOAD_USER_EMAIL='{$upload_user}' WHERE ID='{$photo_id}'";
            $query = $this->db->query($sql);
            if($this->db->affected_rows()>0)
            {
                return $photo_id;
            }
        }
    }
}
?>