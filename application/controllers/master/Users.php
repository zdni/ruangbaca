<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Users extends Uadmin_Controller {
	
	function __construct()
	{
        parent::__construct();
        $this->load->model([
            'users_model',
            'civitas_model',
        ]);
		$this->load->library('upload');
	}

    public function index()
    {
        $name = ( $this->input->get('name') !== null ) ? '%' . $this->input->get('name') . '%' : '';

        $this->data['create']['uadmin'] = true;
        $this->data['create']['civitas'] = true;

        $this->data['uadmin'] = $this->users_model->user( '', $name, 2 )->result();
        $this->data['civitas'] = $this->users_model->user( '', $name, 3 )->result();
        $this->render('master/users');
    }

    public function create()
    {
        $this->form_validation->set_rules('username', 'Username', 'required');
        $this->form_validation->set_rules('name', 'Nama', 'required');

        $alert = 'error';
        $message = 'Gagal Menambah Pengguna Baru! <br> Silahkan isi semua inputan!';
        if ( $this->form_validation->run() )
        {
            $username = $this->input->post('username');
            $name = $this->input->post('name');
            $role_id = $this->input->post('role_id');

            $data['username'] = $username;
            $data['name'] = $name;
            $data['image'] = 'user.jpg';
            $data['role_id'] = $role_id;
            $data['password'] = password_hash( str_replace(" ", "", strtolower( $username )), PASSWORD_DEFAULT );
            
            $id = $this->users_model->create( $data );
            if( $id )
            {
                // civitas
                if( $role_id == 3 ){
                    $data = [];
                    $id_number = $this->input->post('id_number');
                    $status = $this->input->post('status');

                    $data['user_id'] = $id;
                    $data['id_number'] = $id_number;
                    $data['status'] = $status;

                    if( $status == 'student' ) $data['class_year'] = $this->input->post('class_year');
                    
                    if( !$this->civitas_model->create( $data ) ) {
                        $this->users_model->delete( $id );

                        $this->session->set_flashdata('alert', 'danger');
                        $this->session->set_flashdata('message', 'Gagal Membuat Civitas Baru!');
                        return redirect( base_url('master/users/') );
                    }
                }

                $this->session->set_flashdata('alert', 'success');
                $this->session->set_flashdata('message', 'Berhasil Membuat Pengguna Baru!');
                return redirect( base_url('master/users/') );
            } else {
                $message = 'Gagal Membuat Pengguna Baru!';
            }
        }

        $this->session->set_flashdata('alert', $alert);
        $this->session->set_flashdata('message', $message);
        return redirect( base_url('master/users') );
    }

    public function update()
    {
        if( !$_POST ) return redirect( base_url('master/users') );

        $this->form_validation->set_rules('name', 'Nama', 'required');

        $alert = 'error';
        $message = 'Gagal Menambah Pengguna Baru! <br> Silahkan isi semua inputan!';
        if ( $this->form_validation->run() )
        {
            $name = $this->input->post('name');

            $data['name'] = $name;
            
            $id = $this->users_model->create( $data );
            if( $id )
            {
                // civitas
                $data = [];
                $id_number = $this->input->post('id_number');
                $status = $this->input->post('status');

                $data['user_id'] = $id;
                $data['id_number'] = $id_number;
                $data['status'] = $status;

                if( $status == 'student' ) $data['class_year'] = $this->input->post('class_year');
                
                if( !$this->civitas_model->create( $data ) ) {
                    $this->users_model->delete( $id );

                    $this->session->set_flashdata('alert', 'danger');
                    $this->session->set_flashdata('message', 'Gagal Membuat Civitas Baru!');
                    return redirect( base_url('master/users/') );
                }

                $this->session->set_flashdata('alert', 'success');
                $this->session->set_flashdata('message', 'Berhasil Membuat Pengguna Baru!');
                return redirect( base_url('master/users/') );
            } else {
                $message = 'Gagal Membuat Pengguna Baru!';
            }
        }

        $this->session->set_flashdata('alert', $alert);
        $this->session->set_flashdata('message', $message);
        return redirect( base_url('master/users') );
    }

    public function reset_password()
    {
        if( !$_POST ) return redirect( base_url('master/users') );
        
        $this->form_validation->set_rules('username', 'Username', 'required');

        $alert = 'error';
        $message = 'Gagal Reset Password!';
        if ( $this->form_validation->run() )
        {
            $username = $this->input->post('username');
            $id = $this->input->post('id');

            $data['password'] = password_hash( str_replace(" ", "", strtolower( $username )), PASSWORD_DEFAULT );
            
            if( $this->users_model->update( $id, $data ) )
            {
                $this->session->set_flashdata('alert', 'success');
                $this->session->set_flashdata('message', 'Berhasil Reset Password!');
                return redirect( base_url('master/users') );
            } else {
                $message = 'Gagal Reset Password!';
            }
        }

        $this->session->set_flashdata('alert', $alert);
        $this->session->set_flashdata('message', $message);
        return redirect( base_url('master/users') );
    }

    public function delete()
    {
        if( !$_POST ) return redirect( base_url('master/users') );

        $alert = 'error';
        $message = 'Gagal Menghapus Pengguna!';

        $this->form_validation->set_rules('id', 'Id Pengguna', 'required');
        if( $this->form_validation->run() )
        {
            $role_id = $this->input->post('role_id');
            $civitas_id = $this->input->post('civitas_id');
            $id = $this->input->post('id');
            if( $role_id == 3 ) $this->civitas_model->delete( $civitas_id );

            if( $this->users_model->delete( $id ) )
            {
                $alert = 'success';
                $message = 'Berhasil Menghapus Pengguna!';
            }
        }
        
        $this->session->set_flashdata('alert', $alert);
        $this->session->set_flashdata('message', $message);
        return redirect( base_url('master/users/') );
    }
}
