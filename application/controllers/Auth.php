<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Auth extends CI_Controller {
	
	function __construct()
	{
        parent::__construct();
        $this->load->model([
            'users_model',
        ]);
	}

	public function login()
    {
        // cek apakah user sudah login
        if( $this->session->userdata('user_id') ){
            $role_name = $this->session->userdata('role_name');
            if ( $role_name == 'admin' ) {
                $path = 'admin/dashboard';
            }
            return redirect( base_url() . $path );
        }
        
        $this->form_validation->set_rules('username', 'Username', 'required');
        $this->form_validation->set_rules('password', 'Password', 'required|trim');

        if ( $this->form_validation->run() == true )
        {
            $username = $this->input->post('username');
            $password = $this->input->post('password');
			
            $user = $this->users_model->user( NULL, $username )->row();
			
            if ( $user ) {
				
                if( password_verify( $password, $user->password ) ){
                    $session = [
                        'user_id' => $user->id,
                        'username' => $user->username,
                        'name' => $user->name,
                        'role_id' => $user->role_id,
                        'role_name' => $user->role_name,
                        'user_image' => $user->image,
                        'laboratory_id' => $user->laboratory_id,
                    ];

                    if ( $user->role_name == 'admin' ) {
                        $path = 'admin/dashboard';
                    }

                    if ( $user->role_name == 'uadmin' ) {
                        $path = 'admin/laboratories';
                    }

                    $this->session->set_userdata( $session );
                    $this->session->set_flashdata('alert', 'success');   
                    $this->session->set_flashdata('message', 'Login Berhasil');   
                    
                    return redirect( base_url() . $path );
                } else {
                    $alert = 'warning';
                    $message = 'Login Gagal! Password yang anda masukkan salah';
                }

            } else {
                $alert = 'error';
                $message = 'Login Gagal! Username tidak ditemukan';
            }

            $this->session->set_flashdata('alert', $alert);   
            $this->session->set_flashdata('message', $message);   
            return redirect( base_url('auth/login') );
        }

        return $this->load->view('login');
    }

    public function logout()
    {
        $this->session->sess_destroy();
        return redirect( base_url() );
    }

}
