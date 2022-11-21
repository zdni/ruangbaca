<?php defined('BASEPATH') OR exit('No direct script access allowed');

class MY_Controller extends CI_Controller {
    
    protected $data = array();

    public function __construct(){
        parent::__construct();

        $this->load->model([
            'links_model',
        ]);
        $this->data["menu_id"] = $this->router->fetch_class() . '_' . $this->router->fetch_method() ; 
        $this->data["username"] = ( $this->session->userdata( 'username' ) != "" ) ? $this->session->userdata( 'username' ) : "User" ;
        $this->data["name"] = ( $this->session->userdata( 'name' ) != "" ) ? $this->session->userdata( 'name' ) : "User" ;
        $this->data["user_id"] = ( $this->session->userdata( 'user_id' ) != "" ) ? $this->session->userdata( 'user_id' ) : NULL ;
        $this->data["role_id"] = ( $this->session->userdata( 'role_id' ) != "" ) ? $this->session->userdata( 'role_id' ) : NULL ;
        $this->data["user_image"] = ( $this->session->userdata( 'user_image' ) != "" ) ? ( (1) ? base_url('uploads/users/') . $this->session->userdata( 'user_image' ) : base_url('assets/images/user.jpg') ) : base_url('assets/images/user.png') ;
        
        $this->data['create'] = [
            'links' => false,
            'uadmin' => false,
            'civitas' => false,
            'categories' => false,
            'specializations' => false,
            'storages' => false,
        ];
        $this->data['categories_footer'] = [];

        $contacts = [
            (object) ['label' => 'Alamat',  'file' => 'address.html',   'file_content' => ''],
            (object) ['label' => 'Email',   'file' => 'email.html',     'file_content' => ''],
            (object) ['label' => 'Telepon', 'file' => 'phone.html',     'file_content' => ''],
        ];
        $index = 0;
        foreach ($contacts as $contact) {
            if( file_exists( './files/contacts/' . $contact->file ) )
            {
                $contacts[$index]->file_content = file_get_contents( './files/contacts/' . $contact->file );
            }
            $index++;
        }

        $this->data['contacts'] = $contacts;
        $this->data['links'] = $this->links_model->links()->result();
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
            redirect( base_url() );
  	    }
    }

}

class Uadmin_Controller extends User_Controller
{

    public function __construct(){
	    parent::__construct();
  	    if( !( in_array( $this->session->userdata( 'role_name' ), ['admin', 'uadmin'] ) ) ){
            redirect( base_url() );
  	    }
    }

}