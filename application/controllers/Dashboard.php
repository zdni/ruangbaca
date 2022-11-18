<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Dashboard extends Client_Controller 
{
	function __construct()
	{
        parent::__construct();
        $this->load->model([
            // 'articles_model',
        ]);
	}

    public function index()
    {
        $this->render('index');
    }
}