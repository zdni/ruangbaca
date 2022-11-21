<?php defined('BASEPATH') or exit('No direct script access allowed');
$this->load->view('templates/web/head');
$this->load->view('templates/web/header');
?>
<?php echo $view_content; ?>
<?php $this->load->view('templates/web/footer'); ?>
<?php $this->load->view('templates/web/modal'); ?>
