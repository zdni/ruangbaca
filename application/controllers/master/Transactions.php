<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Transactions extends Uadmin_Controller {
	
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
        $this->data['transactions'] = $this->transactions_model->transactions()->result();
        
        $this->render('master/transactions');
    }

    public function accept()
    {
        if( !$_POST ) return redirect( base_url('master/transactions') );

        $alert = 'error';
        $message = 'Gagal Menyetujui Peminjaman!';

        $this->form_validation->set_rules('id', 'Id Transaction', 'required');
        if( $this->form_validation->run() )
        {
            $id = $this->input->post('id');

            if( $this->transactions_model->update( $id, [ 'status' => 1 ] ) )
            {
                $alert = 'success';
                $message = 'Berhasil Menyetujui Peminjaman!';
            }
        }
        
        $this->session->set_flashdata('alert', $alert);
        $this->session->set_flashdata('message', $message);
        return redirect( base_url('master/transactions') );
    }

    public function return()
    {
        if( !$_POST ) return redirect( base_url('master/transactions') );

        $alert = 'error';
        $message = 'Gagal Menyetujui Pengembalian!';

        $this->form_validation->set_rules('id', 'Id Data', 'required');
        if( $this->form_validation->run() )
        {
            $id = $this->input->post('id');
            $status = $this->input->post('status');

            $update = 2;
            if( $status == 3 ) $update = 4;

            if( $this->transactions_model->update( $id, [ 'status' => $update ] ) )
            {
                $data = [
                    'transaction_id' => $id,
                    'date' => date('Y-m-d'),
                    'description' => 'Dokumen dikembalikan!',
                ];
                if( $this->returns_model->create( $data ) ){
                    $alert = 'success';
                    $message = 'Berhasil Menyetujui Pengembalian!';
                } else {
                    $this->transactions_model->update( $id, [ 'status' => $status ] );
                }
            }
        }
        
        $this->session->set_flashdata('alert', $alert);
        $this->session->set_flashdata('message', $message);
        return redirect( base_url('master/transactions') );
    }
}
