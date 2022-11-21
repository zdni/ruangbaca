<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Settings extends Uadmin_Controller {
	
	function __construct()
	{
        parent::__construct();
        $this->load->model([
            'categories_model',
            'specializations_model',
            'storages_model',
        ]);
	}

	public function index()
    {
        $this->data['create']['links'] = true;
        $this->data['create']['categories'] = true;
        $this->data['create']['specializations'] = true;
        $this->data['create']['storages'] = true;

        $this->data['categories'] = $this->categories_model->categories()->result();
        $this->data['specializations'] = $this->specializations_model->specializations()->result();
        $this->data['storages'] = $this->storages_model->storages()->result();

        $this->render('master/settings');
    }

    public function create()
    {
        $this->form_validation->set_rules('name', 'Nama', 'required');
        $this->form_validation->set_rules('model', 'Model', 'required');
        $this->form_validation->set_rules('data', 'Data', 'required');

        $alert = 'error';
        $message = 'Gagal Menambah Data Baru! <br> Silahkan isi semua inputan!';
        if ( $this->form_validation->run() )
        {
            $name = $this->input->post('name');
            $model = $this->input->post('model') . '_model';
            $data = $this->input->post('data');

            $value['name'] = $name;
            
            if( $this->$model->create( $value ) )
            {
                $this->session->set_flashdata('alert', 'success');
                $this->session->set_flashdata('message', 'Berhasil Membuat Data '. $data .' Baru!');
                return redirect( base_url('master/settings') );
            } else {
                $message = 'Gagal Membuat Data '. $data .' Baru!';
            }
        }

        $this->session->set_flashdata('alert', $alert);
        $this->session->set_flashdata('message', $message);
        return redirect( base_url('master/settings') );
    }

    public function update()
    {
        $this->form_validation->set_rules('name', 'Nama', 'required');
        $this->form_validation->set_rules('model', 'Model', 'required');

        $alert = 'error';
        $message = 'Gagal Mengubah Data! <br> Silahkan isi semua inputan!';
        if ( $this->form_validation->run() )
        {
            $id = $this->input->post('id');
            $name = $this->input->post('name');
            
            $model = $this->input->post('model') . '_model';

            $data['name'] = $name;
            
            if( $this->$model->update( $id, $data ) )
            {
                $this->session->set_flashdata('alert', 'success');
                $this->session->set_flashdata('message', 'Berhasil Mengubah Data!');
                return redirect( base_url('master/settings') );
            } else {
                $message = 'Gagal Mengubah Data!';
            }
        }

        $this->session->set_flashdata('alert', $alert);
        $this->session->set_flashdata('message', $message);
        return redirect( base_url('master/settings') );
    }

    public function delete()
    {
        if( !$_POST ) return redirect( base_url('master/settings') );

        $alert = 'error';
        $message = 'Gagal Menghapus Data!';

        $this->form_validation->set_rules('id', 'Id Data', 'required');
        if( $this->form_validation->run() )
        {
            $id = $this->input->post('id');
            $model = $this->input->post('model') . '_model';

            if( $this->$model->delete( $id ) )
            {
                $alert = 'success';
                $message = 'Berhasil Menghapus Data!';
            }
        }
        
        $this->session->set_flashdata('alert', $alert);
        $this->session->set_flashdata('message', $message);
        return redirect( base_url('master/settings') );
    }

    public function create_link()
    {
        $this->form_validation->set_rules('url', 'URL Link', 'required');
        $this->form_validation->set_rules('label', 'Label', 'required');

        $alert = 'error';
        $message = 'Gagal Menambah Data Link Baru! <br> Silahkan isi semua inputan!';
        if ( $this->form_validation->run() )
        {
            $url = $this->input->post('url');
            $label = $this->input->post('label');

            $data['url'] = $url;
            $data['label'] = $label;
            
            if( $this->links_model->create( $data ) )
            {
                $this->session->set_flashdata('alert', 'success');
                $this->session->set_flashdata('message', 'Berhasil Membuat Data Link Baru!');
                return redirect( base_url('master/settings') );
            } else {
                $message = 'Gagal Membuat Data Link Baru!';
            }
        }

        $this->session->set_flashdata('alert', $alert);
        $this->session->set_flashdata('message', $message);
        return redirect( base_url('master/settings') );
    }

    public function update_link()
    {
        if( !$_POST ) return redirect( base_url('master/settings') );

        $this->form_validation->set_rules('id', 'Id Link', 'required');
        $this->form_validation->set_rules('url', 'URL Link', 'required');
        $this->form_validation->set_rules('label', 'Label', 'required');

        $alert = 'error';
        $message = 'Gagal Mengubah Data Link! <br> Silahkan isi semua inputan!';
        if ( $this->form_validation->run() )
        {
            $id = $this->input->post('id');
            
            $url = $this->input->post('url');
            $label = $this->input->post('label');
            
            $data['label'] = $label;
            $data['url'] = $url;

            if( $this->links_model->update( $id, $data ) )
            {
                $alert = 'success';
                $message = 'Berhasil Mengubah Link!';
            } else {
                $message = 'Gagal Mengubah Link!';
            }
        }

        $this->session->set_flashdata('alert', $alert);
        $this->session->set_flashdata('message', $message);
        return redirect( base_url('master/settings') );
    }

    public function delete_link()
    {
        if( !$_POST ) return redirect( base_url('master/settings') );

        $alert = 'error';
        $message = 'Gagal Menghapus Link!';

        $this->form_validation->set_rules('id', 'Id Link', 'required');
        if( $this->form_validation->run() )
        {
            $id = $this->input->post('id');
            if( $this->links_model->delete( $id ) )
            {
                $alert = 'success';
                $message = 'Berhasil Menghapus Link!';
            }
        }
        
        $this->session->set_flashdata('alert', $alert);
        $this->session->set_flashdata('message', $message);
        return redirect( base_url('master/settings') );
    }

    public function update_contact()
    {
        if( !$_POST ) return redirect( base_url('master/settings') );

        $alert = 'error';
        $message = 'Gagal Mengubah Informasi Kontak! <br> Silahkan isi semua inputan!';

        $this->form_validation->set_rules('file', 'Informasi Kontak', 'required');
        $this->form_validation->set_rules('file_content', 'Konten', 'required');
        if( $this->form_validation->run() )
        {
            $file = $this->input->post('file');
            $file_content = $this->input->post('file_content');
            if( !file_put_contents( './files/contacts/' . $file, $file_content ) )
            {
                $alert = 'warning';
                $message = 'Gagal Mengubah Informasi Kontak!';
            } else {
                $alert = 'success';
                $message = 'Berhasil Mengubah Informasi Kontak!';
            }
        }
        
        $this->session->set_flashdata('alert', $alert);
        $this->session->set_flashdata('message', $message);
        return redirect( base_url('master/settings') );
    }
}
