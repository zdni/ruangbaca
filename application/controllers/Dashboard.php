<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Dashboard extends Client_Controller 
{
	function __construct()
	{
        parent::__construct();
        $this->load->model([
            'books_model',
            'categories_model',
            'civitas_model',
            'documents_model',
            'specializations_model',
            'storages_model',
            'theses_model',
        ]);
	}

    public function index()
    {
        $documents = $this->documents_model->documents(NULL, 0, 5)->result();
        for ( $i = 0; $i < count( $documents ); $i++ ) { 
            $document = $documents[$i];
            if( $document->type == 'book' ) {
                $data = $this->books_model->book( NULL, $document->id )->row();
                $documents[$i] = $data;
            }
            if( $document->type == 'thesis' ) {
                $data = $this->theses_model->thesis( NULL, $document->id )->row();
                $documents[$i] = $data;
            }
        }

        $this->data['counter'] = [
            $this->civitas_model->civitas( 'student' )->num_rows(),
            $this->civitas_model->civitas( 'lecture' )->num_rows(),
            $this->books_model->books()->num_rows(),
            $this->theses_model->theses()->num_rows(),
        ];

        $this->data['documents'] = $documents;
        $this->render('index');
    }
}