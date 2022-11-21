<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Documents extends Client_Controller 
{
	function __construct()
	{
        parent::__construct();
        $this->load->model([
            'books_model',
            'categories_model',
            'documents_model',
            'specializations_model',
            'storages_model',
            'transactions_model',
            'theses_model',
        ]);
		$this->load->library('upload');
	}

    public function index()
    {
        $this->data['title_'] = ( $this->input->get('title') !== '' ) ? $this->input->get('title') : NULL;
        $this->data['category_id_'] = ( $this->input->get('category_id') !== '' ) ? $this->input->get('category_id') : NULL;
        $this->data['specialization_id_'] = ( $this->input->get('specialization_id') !== '' ) ? $this->input->get('specialization_id') : NULL;
        $this->data['storage_id_'] = ( $this->input->get('storage_id') !== '' ) ? $this->input->get('storage_id') : NULL;

        $this->data['type_'] = ( $this->input->get('type') !== '' ) ? $this->input->get('type') : NULL;

        $documents = [];
        $datas = $this->documents_model->documents( $this->data['title_'], $this->data['type_'] )->result();
        for ( $i = 0; $i < count( $datas ); $i++ ) { 
            $document = $datas[$i];
            if( $document->type == 'book' && (!$this->data['specialization_id_'] && !$this->data['storage_id_']) ) {
                $data = $this->books_model->book( NULL, $document->id, $this->data['category_id_'] )->row();
                if( $data ) $documents[] = $data;
            }
            if( $document->type == 'thesis' && !$this->data['category_id_'] ) {
                $data = $this->theses_model->thesis( NULL, $document->id, $this->data['specialization_id_'], $this->data['storage_id_'] )->row();
                if( $data ) $documents[] = $data;
            }
        }
        
        // $books = $theses = [];
        // if( in_array( $this->data['type_'], [NULL, 'book'] ) ) $books = $this->books_model->books( $this->data['title_'], $this->data['category_id_'] )->result();
        // if( in_array( $this->data['type_'], [NULL, 'thesis'] ) ) $theses = $this->theses_model->theses( $this->data['title_'], $this->data['specialization_id_'], $this->data['storage_id_'] )->result();
        
        // $this->data['documents'] = array_merge( $books, $theses );
        
        $this->data['documents'] = $documents;
        $this->data['categories'] = $this->categories_model->categories()->result();
        $this->data['specializations'] = $this->specializations_model->specializations()->result();
        $this->data['storages'] = $this->storages_model->storages()->result();

        $this->render('documents/index');
    }

    public function form()
    {
        if( !$this->data['role_id'] || $this->data['role_id'] == 3 ) return redirect( base_url('documents') );

        $this->data['action'] = $this->input->get('action');
        if( !$this->data['action'] ) return redirect( base_url('documents/') );
        if( $this->data['action'] == 'update' ) {
            $model_name = ['book' => 'books_model', 'thesis' => 'theses_model'];
            
            $id = $this->input->get('id');
            $type = $this->input->get('type');
            
            $model = $model_name[$type];
            
            $this->data['document'] = $this->$model->$type( $id )->row();
        }

        $this->data['categories'] = $this->categories_model->categories()->result();
        $this->data['specializations'] = $this->specializations_model->specializations()->result();
        $this->data['storages'] = $this->storages_model->storages()->result();

        $this->data['url'] = ( $this->data['action'] == 'create' ) ? 'documents/create' : 'documents/update';
     
        $this->render('documents/form');
    }

    public function create()
    {
        if( !$this->data['role_id'] || $this->data['role_id'] == 3 || !$_POST ) return redirect( base_url('documents') );

        $this->form_validation->set_rules('title', 'Judul Dokumen', 'required');
        $this->form_validation->set_rules('type', 'Tipe', 'required');
        $this->form_validation->set_rules('code', 'Kode', 'required');
        $this->form_validation->set_rules('writer', 'Penulis', 'required');

        $alert = 'error';
        $message = 'Gagal Menambah Data Dokumen Baru! <br> Silahkan isi semua inputan!';
        if ( $this->form_validation->run() )
        {
            $title = $this->input->post('title');
            $type = $this->input->post('type');
            $code = $this->input->post('code');
            $writer = $this->input->post('writer');

            $data['title'] = $title;
            $data['type'] = $type;
            $data['code'] = $code;
            $data['writer'] = $writer;

            $slug = str_replace( " ", "_", $title );
            $slug = str_replace( ".", "", $slug );
            $slug = strtolower( $slug );

            $data['slug'] = $slug;
            $data['cover'] = NULL;
			if($_FILES['cover']['name']){
				$uploaded_file = $this->upload_cover( $slug );
				$data['cover'] = $uploaded_file['file_name'];
			}

            $model = '';
            $option = [];
            if( $type == 'book' ) {
                $option = [
                    'document_id'       => '',
                    'publisher'         => $this->input->post('publisher'),
                    'category_id'       => $this->input->post('category_id'),
                    'publication_year'  => $this->input->post('publication_year'),
                    'stock'             => $this->input->post('stock'),
                ];
                $model = 'books_model';
            }
            if( $type == 'thesis' ) {
                $option = [
                    'document_id'       => '',
                    'student_id_number' => $this->input->post('student_id_number'),
                    'graduation_year'   => $this->input->post('graduation_year'),
                    'specialization_id' => $this->input->post('specialization_id'),
                    'storage_id'        => $this->input->post('storage_id'),
                    'mentor_main'       => $this->input->post('mentor_main'),
                    'mentor_secondary'  => $this->input->post('mentor_secondary'),
                    'examiner_main'     => $this->input->post('examiner_main'),
                    'examiner_secondary'=> $this->input->post('examiner_secondary'),
                    'examiner_tersier'  => $this->input->post('examiner_tersier'),
                    'file'              => '',
                ];

                if($_FILES['file']['name']){
                    $uploaded_file = $this->upload_file( $slug );
                    $option['file'] = $uploaded_file['file_name'];
                }
                $model = 'theses_model';
            }

            $id = $this->documents_model->create( $data );
            if( $id )
            {
                if( $model && $option ) {
                    $option['document_id'] = $id;

                    if( !$this->$model->create( $option ) ) {
                        $this->session->set_flashdata('alert', 'error');
                        $this->session->set_flashdata('message', 'Gagal Menambah Dokumen Baru!');
                        return redirect( base_url('documents/') );
                    }
                }
                $alert = 'success';
                $message = 'Berhasil Menambah Dokumen Baru!';
            } else {
                $message = 'Gagal Menambah Dokumen Baru!';
            }
        }

        $this->session->set_flashdata('alert', $alert);
        $this->session->set_flashdata('message', $message);
        return redirect( base_url('documents/') );
    }

    public function detail()
    {
        $id = $this->input->get('id');
        if( !$id ) return redirect( base_url('documents') );
        
        $type = $this->input->get('type');
        $model_name = ['book' => 'books_model', 'thesis' => 'theses_model'];
        
        $model = $model_name[$type];
        
        $this->data['document'] = $this->$model->$type( $id )->row();
        if( !$this->data['document'] ) return redirect( base_url('documents') );

        $this->render('documents/detail');
    }

    public function update()
    {
        if( !$this->data['role_id'] || $this->data['role_id'] == 3 || !$_POST ) return redirect( base_url('documents') );

        $this->form_validation->set_rules('title', 'Judul Dokumen', 'required');
        $this->form_validation->set_rules('type', 'Tipe', 'required');
        $this->form_validation->set_rules('code', 'Kode', 'required');
        $this->form_validation->set_rules('writer', 'Penulis', 'required');

        $alert = 'error';
        $message = 'Gagal Mengubah Data Dokumen! <br> Silahkan isi semua inputan!';
        if ( $this->form_validation->run() )
        {
            $document_id = $this->input->post('document_id');
            $id = $this->input->post('id');
         
            $title = $this->input->post('title');
            $type = $this->input->post('type');
            $code = $this->input->post('code');
            $writer = $this->input->post('writer');

            $data['title'] = $title;
            $data['code'] = $code;
            $data['writer'] = $writer;

            $slug = str_replace( " ", "_", $title );
            $slug = str_replace( ".", "", $slug );
            $slug = strtolower( $slug );

            $data['slug'] = $slug;
			if($_FILES['cover']['name']){
				$uploaded_file = $this->upload_cover( $slug );
				$data['cover'] = $uploaded_file['file_name'];
			}

            $model = '';
            $option = [];
            if( $type == 'book' ) {
                $option = [
                    'publisher'         => $this->input->post('publisher'),
                    'category_id'       => $this->input->post('category_id'),
                    'publication_year'  => $this->input->post('publication_year'),
                    'stock'             => $this->input->post('stock'),
                ];
                $model = 'books_model';
            }
            if( $type == 'thesis' ) {
                $option = [
                    'student_id_number' => $this->input->post('student_id_number'),
                    'graduation_year'   => $this->input->post('graduation_year'),
                    'specialization_id' => $this->input->post('specialization_id'),
                    'storage_id'        => $this->input->post('storage_id'),
                    'mentor_main'       => $this->input->post('mentor_main'),
                    'mentor_secondary'  => $this->input->post('mentor_secondary'),
                    'examiner_main'     => $this->input->post('examiner_main'),
                    'examiner_secondary'=> $this->input->post('examiner_secondary'),
                    'examiner_tersier'  => $this->input->post('examiner_tersier'),
                ];

                if($_FILES['file']['name']){
                    $uploaded_file = $this->upload_file( $slug );
                    $option['file'] = $uploaded_file['file_name'];
                }
                $model = 'theses_model';
            }

            if( $this->documents_model->update( $document_id, $data ) )
            {
                if( $model && $option ) {

                    if( !$this->$model->update( $id, $option ) ) {
                        $this->session->set_flashdata('alert', 'error');
                        $this->session->set_flashdata('message', 'Gagal Mengubah Dokumen!');
                        return redirect( base_url('documents/') );
                    }
                }
                $alert = 'success';
                $message = 'Berhasil Mengubah Dokumen!';
            } else {
                $message = 'Gagal Mengubah Dokumen!';
            }
        }

        $this->session->set_flashdata('alert', $alert);
        $this->session->set_flashdata('message', $message);
        return redirect( base_url('documents/') );
    }

    public function delete()
    {
        if( !$this->data['role_id'] || $this->data['role_id'] == 3 || !$_POST ) return redirect( base_url('documents') );

        $alert = 'error';
        $message = 'Gagal Menghapus Dokumen!';

        $this->form_validation->set_rules('id', 'Id', 'required');
        $this->form_validation->set_rules('document_id', 'Id Dokumen', 'required');
        $this->form_validation->set_rules('type', 'Tipe', 'required');
        if( $this->form_validation->run() )
        {
            $model_name = ['book' => 'books_model', 'thesis' => 'theses_model'];
            
            $id = $this->input->post('id');
            $document_id = $this->input->post('document_id');
            $type = $this->input->post('type');
            
            $model = $model_name[$type];
            if( $this->$model->delete( $id ) )
            {
                $this->documents_model->delete( $document_id );
                $alert = 'success';
                $message = 'Berhasil Menghapus Dokumen!';
            }
        }
        
        $this->session->set_flashdata('alert', $alert);
        $this->session->set_flashdata('message', $message);
        return redirect( base_url('documents') );
    }

    public function transaction()
    {
        $document_id = $this->input->get('id');
        $user_id = $this->input->get('user_id');

        $alert = 'error';
        $message = 'Gagal Mengajukan Peminjaman!';
        if( $document_id && $user_id ) {

            $transaction = $this->transactions_model->transactions( $user_id, $document_id, [0, 1, 3] )->num_rows();
            if( !$transaction ) {
                $data = [
                    'user_id'       => $user_id,
                    'document_id'   => $document_id,
                    'start_date'    => date('Y-m-d'),
                    'end_date'      => date('Y-m-d', strtotime('+5 days')),
                    'stock'         => 1,
                    'status'        => 0,
                ];
                if( $this->transactions_model->create( $data ) ) {
                    $alert = 'success';
                    $message = 'Berhasil Mengajukan Peminjaman!';
                }
            } else {
                $message = 'Anda sudah melakukan peminjaman untuk dokumen ini!';
            }
        }

        $this->session->set_flashdata('alert', $alert);
        $this->session->set_flashdata('message', $message);
        return redirect( base_url('documents') );
    }

    public function return()
    {
        
    }

    public function upload_cover( $title )
    {
        $config['upload_path']          = './uploads/documents/covers/';
		$config['overwrite']            = true;
		$config['allowed_types']        = 'jpg|png|jpeg';
		$config['max_size']             = 2048;
		$config['file_name']			= $title;

		$this->upload->initialize($config);
		if (!$this->upload->do_upload('cover')) {
			$this->session->set_flashdata('alert', 'error');   
			$this->session->set_flashdata('message', $this->upload->display_errors());   
			return redirect( base_url('documents') );
		} else {
			$uploaded_data = $this->upload->data();
		}
		return $uploaded_data;
    }

    public function upload_file( $title )
    {
        $config['upload_path']          = './uploads/documents/files/';
		$config['overwrite']            = true;
		$config['allowed_types']        = 'pdf|doc|docx';
		$config['max_size']             = 2048;
		$config['file_name']			= $title;

		$this->upload->initialize($config);
		if (!$this->upload->do_upload('file')) {
			$this->session->set_flashdata('alert', 'error');   
			$this->session->set_flashdata('message', $this->upload->display_errors());   
			return redirect( base_url('documents') );
		} else {
			$uploaded_data = $this->upload->data();
		}
		return $uploaded_data;
    }
}