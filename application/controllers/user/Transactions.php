<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Transactions extends User_Controller {
	
	function __construct()
	{
        parent::__construct();
        $this->load->model([
            'documents_model',
            'penalties_model',
            'returns_model',
            'transactions_model',
        ]);
	}

	public function index()
    {
        $this->data['transactions'] = $this->transactions_model->transactions( $this->data['user_id'] )->result();
        
        $this->render('user/transactions');
    }

    public function cancel()
    {
        if( !$_POST ) return redirect( base_url('user/transactions') );

        $alert = 'error';
        $message = 'Gagal Membatalkan Peminjaman!';

        $this->form_validation->set_rules('id', 'Id Transaction', 'required');
        if( $this->form_validation->run() )
        {
            $id = $this->input->post('id');

            if( $this->transactions_model->update( $id, [ 'status' => 6 ] ) )
            {
                $alert = 'success';
                $message = 'Berhasil Membatalkan Peminjaman!';
            }
        }
        
        $this->session->set_flashdata('alert', $alert);
        $this->session->set_flashdata('message', $message);
        return redirect( base_url('user/transactions') );
    }
}
