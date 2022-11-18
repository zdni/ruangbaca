<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Dashboard extends Admin_Controller {
	
	function __construct()
	{
        parent::__construct();
        $this->load->model([
            'users_model',
            'heros_model',
        ]);
		$this->load->library('upload');
	}

	public function index()
    {
        $counts = [
            (object) ['label' => '', 'icon' => '', 'total' => ''],
            (object) ['label' => '', 'icon' => '', 'total' => ''],
            (object) ['label' => '', 'icon' => '', 'total' => ''],
            (object) ['label' => '', 'icon' => '', 'total' => ''],
        ];
        $index = 1;
        foreach ($counts as $count) {
            // file label
            if( file_exists( './uploads/counts/labels/label_' . $index . '.html' ) )
            {
                $counts[$index-1]->label = file_get_contents( './uploads/counts/labels/label_' . $index . '.html' );
            }
            // file icon
            if( file_exists( './uploads/counts/icons/icon_' . $index . '.html' ) )
            {
                $counts[$index-1]->icon = file_get_contents( './uploads/counts/icons/icon_' . $index . '.html' );
            }
            // file total
            if( file_exists( './uploads/counts/totals/total_' . $index . '.html' ) )
            {
                $counts[$index-1]->total = file_get_contents( './uploads/counts/totals/total_' . $index . '.html' );
            }
            $index++;
        }

        $this->data['counts'] = $counts;
        
        $heros = $this->heros_model->heros()->result();
        $this->data['about'] = $heros[0];
        $this->data['popup'] = $heros[1];
        
        unset( $heros[0] );
        unset( $heros[1] );
        $this->data['heros'] = $heros;

        $this->data['page'] = 'Beranda';
        $this->render('admin/dashboard');
    }
    
    public function heros_create()
    {
        $this->form_validation->set_rules('name', 'File Gambar', 'required');

        $alert = 'error';
        $message = 'Gagal Menambah Gambar Baru! <br> Silahkan isi semua inputan!';
        if ( $this->form_validation->run() )
        {
            $data['image'] = NULL;
			if($_FILES['image']['name']){
                $title = str_replace(" ", '', strtolower( $_FILES['image']['name'] ));
				$uploaded_foto = $this->upload_image( $title );
				$data['image'] = $uploaded_foto['file_name'];
			}
            
            if( $this->heros_model->create( $data ) )
            {
                $this->session->set_flashdata('alert', 'success');
                $this->session->set_flashdata('message', 'Berhasil Membuat Gambar Baru!');
                return redirect( base_url('admin/dashboard') );
            } else {
                $message = 'Gagal Membuat Gambar Baru!';
            }
        }

        $this->session->set_flashdata('alert', $alert);
        $this->session->set_flashdata('message', $message);
        return redirect( base_url('admin/dashboard') );
    }
    
    public function heros_edit()
    {
        $this->form_validation->set_rules('id', 'File Gambar', 'required');

        $alert = 'error';
        $message = 'Gagal Mengubah Gambar Beranda! <br> Silahkan isi semua inputan!';
        if ( $this->form_validation->run() )
        {
            $id = $this->input->post('id');
            $data['image'] = NULL;
			if($_FILES['image']['name']){
                $title = str_replace(" ", '', strtolower( $_FILES['image']['name'] ));
				$uploaded_foto = $this->upload_image( $title );
				$data['image'] = $uploaded_foto['file_name'];
			}
            
            if( $this->heros_model->update( $id, $data ) )
            {
                $this->session->set_flashdata('alert', 'success');
                $this->session->set_flashdata('message', 'Berhasil Mengubah Gambar Baru!');
                return redirect( base_url('admin/dashboard') );
            } else {
                $message = 'Gagal Mengubah Gambar Baru!';
            }
        }

        $this->session->set_flashdata('alert', $alert);
        $this->session->set_flashdata('message', $message);
        return redirect( base_url('admin/dashboard') );
    }

    public function heros_delete()
    {
        if( !$_POST ) return redirect( base_url('admin/dashboard') );

        $alert = 'error';
        $message = 'Gagal Menghapus Gambar!';

        $this->form_validation->set_rules('id', 'Id Gambar', 'required');
        if( $this->form_validation->run() )
        {
            $id = $this->input->post('id');
            if( $this->heros_model->delete( $id ) )
            {
                $alert = 'success';
                $message = 'Berhasil Menghapus Gambar!';
            }
        }
        
        $this->session->set_flashdata('alert', $alert);
        $this->session->set_flashdata('message', $message);
        return redirect( base_url('admin/dashboard') );
    }

	public function upload_image( $title )
	{
		$config['upload_path']          = './uploads/heros/';
		$config['overwrite']            = true;
		$config['allowed_types']        = 'jpg|png|jpeg';
		$config['max_size']             = 2048;
		$config['file_name']			= $title;

		$this->upload->initialize($config);
		if (!$this->upload->do_upload('image')) {
			$this->session->set_flashdata('alert', 'error');   
			$this->session->set_flashdata('message', $this->upload->display_errors());   
			return redirect( base_url('admin/dashboard') );
		} else {
			$uploaded_data = $this->upload->data();
		}
		return $uploaded_data;
	}

    public function count_update()
    {
        if( !$_POST ) return redirect( base_url('admin/dashboard') );

        $file = $this->input->post('file');
        $icon = $this->input->post('icon');
        $total = $this->input->post('total');
        $label = $this->input->post('label');

        $alert = 'success';
        $message = 'Berhasil!';
        
        if( !file_put_contents( './uploads/counts/labels/label_' . $file, $label ) )
        {
            $alert = 'warning';
            $message = 'Gagal!';
        }
        if( !file_put_contents( './uploads/counts/icons/icon_' . $file, $icon ) )
        {
            $alert = 'warning';
            $message = 'Gagal!';
        } 
        if( !file_put_contents( './uploads/counts/totals/total_' . $file, $total ) )
        {
            $alert = 'warning';
            $message = 'Gagal!';
        }

        $this->session->set_flashdata('alert', $alert);
        $this->session->set_flashdata('message', $message);
        return redirect( base_url('admin/dashboard') );
    }
}
