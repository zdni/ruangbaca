    <footer class="site-footer">
      <div class="footer-category">
        <div class="container">
          <?php if( count( $categories_footer ) > 0 ): ?>
          <div class="category-toggle">
            <a href="javascript:void(0);" class="toggle-btn">Kategori Dokumen</a>
            <div class="toggle-items row book-grid-row">
              <div class="footer-col-book">
                <ul>
                  <?php foreach ($categories_footer as $categpry) { ?>
                    <li><a href="<?= base_url('dashboard/documents?category=') ?>">Kategori</a></li>
                  <?php } ?>
                </ul>
              </div>
            </div>
          </div>
          <?php endif; ?>
        </div>
      </div>

      <div class="footer-top">
        <div class="container">
          <div class="row">
            <div class="col-lg-3 wow fadeInUp" data-wow-delay="0.1s">
              <div class="widget widget_about">
                <div class="footer-logo logo-white">
                  <a href="index.html"><img src="<?= base_url('assets/') ?>images/logo.png" alt=""></a>
                </div>
                <p class="text">Website Perpustakaan Teknik Informatika Universitas Halu Oleo.
                </p>
              </div>
            </div>
            <div class="col-lg-4 wow fadeInUp" data-wow-delay="0.2s">
              <div class="widget widget_services">
                <h5 class="footer-title">Link Terkait</h5>
                <ul>
                  <?php foreach ($links as $link) { ?>
                    <li><a target="_new" href="<?= $link->url ?>"><?= $link->label ?></a></li>
                  <?php } ?>
                </ul>
              </div>
            </div>
            <div class="col-lg-5 wow fadeInUp" data-wow-delay="0.5s">
              <div class="widget widget_getintuch">
                <h5 class="footer-title">Info Kontak</h5>
                <ul>
                  <li>
                    <i class="flaticon-placeholder"></i>
                    <span><?= $contacts[0]->file_content ?></span>
                  </li>
                  <li>
                    <i class="flaticon-email"></i>
                    <span><?= $contacts[1]->file_content ?></span>
                  </li>
                  <li>
                    <i class="flaticon-phone"></i>
                    <span><?= $contacts[2]->file_content ?></span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <div class="container">
          <div class="row fb-inner">
            <div class="col-lg-6 col-md-12 text-start">
              <p class="copyright-text">Ruang Baca Teknik Informatika Universitas Halu Oleo</p>
            </div>
            <div class="col-lg-6 col-md-12 text-end">
              <p>2022</p>
            </div>
          </div>
        </div>
      </div>

    </footer>

    <button class="scroltop" type="button"><i class="fas fa-arrow-up"></i></button>
  </div>

  <script src="<?= base_url('assets/') ?>js/jquery.min.js"></script>
  <script src="<?= base_url('assets/') ?>vendor/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
  <script src="<?= base_url('assets/') ?>vendor/bootstrap-select/dist/js/bootstrap-select.min.js"></script>
  <script src="<?= base_url('assets/') ?>vendor/counter/waypoints-min.js"></script>
  <script src="<?= base_url('assets/') ?>vendor/counter/counterup.min.js"></script>
  <script src="<?= base_url('assets/') ?>vendor/wow/wow.min.js"></script>
  <script src="<?= base_url('assets/') ?>vendor/swiper/swiper-bundle.min.js"></script>
  <script src="<?= base_url('assets/') ?>js/dz.carousel.js"></script>
  <script src="<?= base_url('assets/') ?>js/dz.ajax.js"></script>
  <script src="<?= base_url('assets/') ?>js/custom.js"></script>
  <script src="<?= base_url('assets/') ?>vendor/sweetalert2/sweetalert2.min.js"></script>

  <script>
    if( '<?= $this->session->flashdata('alert') ?>' == 'success' ) {
      Swal.fire( 'Berhasil!', '<?= $this->session->flashdata('message') ?>', 'success' );
    }
    
    if( '<?= $this->session->flashdata('alert') ?>' == 'warning' ) {
      Swal.fire( 'Peringatan!', '<?= $this->session->flashdata('message') ?>', 'warning' );
    }

    if( '<?= $this->session->flashdata('alert') ?>' == 'error' ) {
      Swal.fire( 'Gagal!', '<?= $this->session->flashdata('message') ?>', 'error' );
    }
    if( "<?php echo $this->session->flashdata('logout') != null ?>" ) setTimeout(() => { window.location.replace("<?= base_url('auth/logout') ?>") }, 1500);
  </script>