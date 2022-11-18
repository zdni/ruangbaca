      <!-- ======= Footer ======= -->
      <footer id="footer">

      <div class="footer-top" style="background: #e4f5fd !important">
        <div class="container">
        <div class="row">
          <div class="col-lg-3 col-md-6 footer-contact">
            <h3><?= $institut ?></h3>
            <p>
              <?= $alamat ?><br><br>
              <strong>Phone:</strong> <?= $telepon ?><br>
              <strong>Email:</strong> <?= $email ?><br>
            </p>
          </div>

          <div class="col-lg-2 col-md-6 footer-links">
            <h4>Link Terkait</h4>
            <ul>
              <li><i class="bx bx-chevron-right"></i> <a href="https://www.kemenkeu.go.id/">Kemenkeu RI</a></li>
              <li><i class="bx bx-chevron-right"></i> <a href="https://www.bpkp.go.id/">BPKP RI</a></li>
              <li><i class="bx bx-chevron-right"></i> <a href="https://www.kemendagri.go.id/">Kemendagri RI</a></li>
              <li><i class="bx bx-chevron-right"></i> <a href="https://www.sultraprov.go.id/">Pemprov Sultra</a></li>
              <li><i class="bx bx-chevron-right"></i> <a href="http://lpse.konaweutarakab.go.id/">LPSE Konut</a></li>
            </ul>
          </div>
          <div class="col-lg-4 col-md-6 social-links">
            <h4>Link Sosial Media</h4>
            <a href="" class="facebook">
              <i class="bx bxl-facebook"></i>
            </a>
            <a href="" class="instagram">
              <i class="bx bxl-instagram"></i>
            </a>
            <a href="" class="twitter">
              <i class="bx bxl-twitter"></i>
            </a>
            <a href="" class="youtube">
              <i class="bx bxl-youtube"></i>
          </div>
        </div>
        </div>
      </div>

      <div class="container d-md-flex py-4">

        <div class="me-md-auto text-center text-md-start">
        <div class="copyright">
          &copy; Copyright <strong><span>2022</span></strong>
        </div>
        <div class="credits">
          Designed by <a href="https://bkad.konaweutarakab.go.id">BKAD Konawe Utara</a>
        </div>
        </div>
      </div>
      </footer><!-- End Footer -->

    <div id="preloader"></div>
  <a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>

  <!-- Vendor JS Files -->
  <script src="<?= base_url('assets/visitor/') ?>vendor/purecounter/purecounter_vanilla.js"></script>
  <script src="<?= base_url('assets/visitor/') ?>vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
  <script src="<?= base_url('assets/visitor/') ?>vendor/glightbox/js/glightbox.min.js"></script>
  <script src="<?= base_url('assets/visitor/') ?>vendor/swiper/swiper-bundle.min.js"></script>
  <script src="<?= base_url('assets/visitor/') ?>vendor/php-email-form/validate.js"></script>
  <script src="<?= base_url('assets/') ?>plugins/sweetalert2/sweetalert2.min.js"></script>

  <!-- Template Main JS File -->
  <script src="<?= base_url('assets/visitor/') ?>js/main.js"></script>
  <script>
    if( '<?= $this->session->flashdata('alert') ?>' == 'success' ) Swal.fire( 'Berhasil!', '<?= $this->session->flashdata('message') ?>', 'success' );
    if( '<?= $this->session->flashdata('alert') ?>' == 'warning' ) Swal.fire( 'Peringatan!', '<?= $this->session->flashdata('message') ?>', 'warning' );
    if( '<?= $this->session->flashdata('alert') ?>' == 'error' ) Swal.fire( 'Gagal!', '<?= $this->session->flashdata('message') ?>', 'error' );

    const menu_id = "<?= $menu_id ?>";
    const menu_link = document.getElementById( menu_id );
    if( menu_link ) menu_link.classList.add('active');
  </script>

  </body>

</html>