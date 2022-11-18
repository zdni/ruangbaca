<?php defined('BASEPATH') OR exit('No direct script access allowed');

class MY_Controller extends CI_Controller {
    
    protected $data = array();

    public function __construct(){
	   parent::__construct();
	   $this->data["menu_id"] = $this->router->fetch_class() . '_' . $this->router->fetch_method() ; 
	   $this->data["user_image"] = ( $this->session->userdata( 'user_image' ) != "" ) ? base_url('uploads/users/') . $this->session->userdata( 'user_image' ) : base_url('assets/img/user.png') ;
	   $this->data["username"] = ( $this->session->userdata( 'username' ) != "" ) ? $this->session->userdata( 'username' ) : "User" ;
	   $this->data["name"] = ( $this->session->userdata( 'name' ) != "" ) ? $this->session->userdata( 'name' ) : "User" ;
    }

    protected function render( $view = NULL, $template = NULL ) {
        if( is_null( $template ) ) {
            $this->load->view( $view, $this->data );
        } else {
            $this->data['view_content'] = ( is_null( $view ) ) ? '' : $this->load->view( $view, $this->data, TRUE );
            $this->load->view( 'templates/' . $template . '_template', $this->data );
        }
    }

}

class User_Controller extends MY_Controller
{

    public function __construct(){
	    parent::__construct();
  	    if( !$this->session->userdata( 'user_id' ) ){
            $this->session->set_flashdata('alert', '' );
            redirect( base_url('/auth/login') );
  	    }
    }

    protected function render( $view = NULL, $template = 'web' ){
  		parent::render( $view, $template );
  	}

}

class Client_Controller extends MY_Controller
{
    protected function render( $view = NULL, $template = 'web' ){
  		parent::render( $view, $template );
  	}

}

class Admin_Controller extends User_Controller
{

    public function __construct(){
	    parent::__construct();
  	    if( !( in_array( $this->session->userdata( 'role_name' ), ['admin'] ) ) ){
            $this->session->set_flashdata('alert', 'error' );
            redirect( base_url('/admin/laboratories') );
  	    }
    }

}

class Uadmin_Controller extends User_Controller
{

    public function __construct(){
	    parent::__construct();
  	    if( !( in_array( $this->session->userdata( 'role_name' ), ['admin', 'uadmin'] ) ) ){
            $this->session->set_flashdata('alert', 'error' );
            redirect( base_url('/auth/login') );
  	    }
    }

}