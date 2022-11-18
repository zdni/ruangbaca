<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Profile extends User_Controller {
	
	function __construct()
	{
        parent::__construct();
        $this->load->model([
            'users_model',
        ]);
		$this->load->library('upload');
        $this->data['menu_id'] = 'profile_user_index';
	}

	public function index()
    {
        $this->data['data'] = $this->users_model->user( $this->session->userdata('user_id') )->row();
        
        $this->data['page'] = 'Profil';
        $this->render('admin/user');
    }

    public function update()
    {
        if( !$_POST ) return redirect( base_url('profile') );

        $this->form_validation->set_rules('id', 'Id Profil', 'required');
        $this->form_validation->set_rules('name', 'Nama', 'required');
        $this->form_validation->set_rules('username', 'Username', 'required');   

        $alert = 'error';
        $message = 'Gagal Mengubah Profil! <br> Silahkan isi semua inputan!';
        if ( $this->form_validation->run() )
        {
            $id = $this->input->post('id');
            $username = $this->input->post('username');
            $username_old = $this->input->post('username_old');
            $name = $this->input->post('name');

            $data['username'] = $username;
            $data['name'] = $name;
            
            if( $this->users_model->update( $id, $data ) )
            {
                $alert = 'success';
                $message = 'Berhasil Mengubah Profil!';
                if( $username != $username_old ) {
                    $message = 'Berhasil Mengubah Profil! <br> Silahkan Login ulang karena username anda berubah';
                    $this->session->set_flashdata('logout', true);
                }
            } else {
                $message = 'Gagal Mengubah Profil!';
            }
        }

        $this->session->set_flashdata('alert', $alert);
        $this->session->set_flashdata('message', $message);
        return redirect( base_url('profile') );
    }

    public function update_password()
    {
        if( !$_POST ) return redirect( base_url('profile') );

        $this->form_validation->set_rules('id', 'Id Profil', 'required');
        $this->form_validation->set_rules('new_password', 'Password Baru', 'required');
        $this->form_validation->set_rules('confirm_password', 'Konfirmasi Password', 'required');
        $this->form_validation->set_rules('old_password', 'Password Lama', 'required');
        $this->form_validation->set_rules('password', 'Password Lama', 'required');

        $alert = 'error';
        $message = 'Gagal Mengubah Password! <br> Silahkan isi semua inputan!';
        if ( $this->form_validation->run() )
        {
            $id = $this->input->post('id');
            $new_password = $this->input->post('new_password');
            $confirm_password = $this->input->post('confirm_password');
            $old_password = $this->input->post('old_password');
            $password = $this->input->post('password');
            
            if( password_verify( $old_password, $password ) )
            {
                if( $new_password == $confirm_password )
                {
                    $data['password'] = password_hash( $new_password, PASSWORD_DEFAULT );

                    if( $this->users_model->update( $id, $data ) )
                    {
                        $alert = 'success';
                        $message = 'Berhasil Mengubah Password! <br> Silahkan Login ulang karena password anda berubah';
                        $this->session->set_flashdata('logout', true);
                    } else {
                        $message = 'Gagal Mengubah Password!';
                    }
                }else {
                    $message = 'Gagal Mengubah Password! <br> Konfirmasi Password dan Password Baru yang anda masukkan tidak cocok!';
                }
            } else {
                $message = 'Gagal Mengubah Password! <br> Password lama yang anda masukkan salah!';
            }
        }

        $this->session->set_flashdata('alert', $alert);
        $this->session->set_flashdata('message', $message);
        return redirect( base_url('profile') );
    }

    public function change_profile_picture()
    {
        $this->form_validation->set_rules('id', 'Id Profil', 'required');

        $alert = 'error';
        $message = 'Gagal Mengubah Foto Profil! <br> Silahkan isi semua inputan!';
        if ( $this->form_validation->run() )
        {
            $id = $this->input->post('id');
            $username = $this->input->post('username');
			
			if($_FILES['image']['name']){
				$uploaded_foto = $this->upload_image( $username );
                $image = $uploaded_foto['file_name'];
				$data['image'] = $image;
			}

            if( $this->users_model->update( $id, $data ) )
            {
                $alert = 'success';
                $message = 'Berhasil Mengubah Foto Profil!';

                $this->session->set_userdata( ['user_image' => $image ] );
            } else {
                $message = 'Gagal Mengubah Foto Profil!';
            }
        }

        $this->session->set_flashdata('alert', $alert);
        $this->session->set_flashdata('message', $message);
        return redirect( base_url('profile') );
    }

	public function upload_image( $title )
	{
		$config['upload_path']          = './uploads/users/';
		$config['overwrite']            = true;
		$config['allowed_types']        = 'jpg|png|jpeg';
		$config['max_size']             = 2048;
		$config['file_name']			= $title;

		$this->upload->initialize($config);
		if (!$this->upload->do_upload('image')) {
			$this->session->set_flashdata('alert', 'error');   
			$this->session->set_flashdata('message', $this->upload->display_errors());   
			return redirect( base_url('profile') );
		} else {
			$uploaded_data = $this->upload->data();
		}
		return $uploaded_data;
	}
}
