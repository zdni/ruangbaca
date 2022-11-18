<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Users extends User_Controller {
	
	function __construct()
	{
        parent::__construct();
        $this->load->model([
            'users_model',
        ]);
		$this->load->library('upload');
	}

    public function create()
    {
        $this->form_validation->set_rules('username', 'Username', 'required');
        $this->form_validation->set_rules('name', 'Nama', 'required');

        $alert = 'error';
        $message = 'Gagal Menambah Data Admin Baru! <br> Silahkan isi semua inputan!';
        if ( $this->form_validation->run() )
        {
            $username = $this->input->post('username');
            $name = $this->input->post('name');
            $laboratory_id = $this->input->post('laboratory_id');

            $data['username'] = $username;
            $data['name'] = $name;
            $data['image'] = 'user.png';
            $data['role_id'] = 2;
            $data['laboratory_id'] = $laboratory_id;
            $data['password'] = password_hash( str_replace(" ", "", strtolower( $username )), PASSWORD_DEFAULT );
            
            if( $this->users_model->create( $data ) )
            {
                $this->session->set_flashdata('alert', 'success');
                $this->session->set_flashdata('message', 'Berhasil Membuat Data Admin Baru!');
                return redirect( base_url('admin/laboratories/detail/') . $laboratory_id );
            } else {
                $message = 'Gagal Membuat Data Admin Baru!';
            }
        }

        $this->session->set_flashdata('alert', $alert);
        $this->session->set_flashdata('message', $message);
        return redirect( base_url('admin/laboratories') );
    }

    public function reset_password()
    {
        if( !$_POST ) return redirect( base_url('admin/laboratories') );
        
        $this->form_validation->set_rules('username', 'Username', 'required');

        $alert = 'error';
        $message = 'Gagal Reset Password!';
        if ( $this->form_validation->run() )
        {
            $username = $this->input->post('username');
            $id = $this->input->post('id');
            $laboratory_id = $this->input->post('laboratory_id');

            $data['password'] = password_hash( str_replace(" ", "", strtolower( $username )), PASSWORD_DEFAULT );
            
            if( $this->users_model->update( $id, $data ) )
            {
                $this->session->set_flashdata('alert', 'success');
                $this->session->set_flashdata('message', 'Berhasil Reset Password!');
                return redirect( base_url('admin/laboratories/detail/') . $laboratory_id );
            } else {
                $message = 'Gagal Reset Password!';
            }
        }

        $this->session->set_flashdata('alert', $alert);
        $this->session->set_flashdata('message', $message);
        return redirect( base_url('admin/laboratories') );
    }

    public function delete()
    {
        if( !$_POST ) return redirect( base_url('admin/laboratories') );

        $alert = 'error';
        $message = 'Gagal Menghapus Admin!';

        $this->form_validation->set_rules('id', 'Id Admin', 'required');
        if( $this->form_validation->run() )
        {
            $laboratory_id = $this->input->post('laboratory_id');
            $id = $this->input->post('id');
            if( $this->users_model->delete( $id ) )
            {
                $alert = 'success';
                $message = 'Berhasil Menghapus Admin!';
            }
        }
        
        $this->session->set_flashdata('alert', $alert);
        $this->session->set_flashdata('message', $message);
        return redirect( base_url('admin/laboratories/detail/') . $laboratory_id );
    }
}
