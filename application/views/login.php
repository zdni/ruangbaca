<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">

  <link rel="icon" type="image/x-icon" href="<?= base_url('assets/') ?>images/favicon.png" />

  <title>Ruang Baca</title>

  <meta name="viewport" content="width=device-width, initial-scale=1">

  <link rel="stylesheet" type="text/css" href="<?= base_url('assets/') ?>css/style.css">
  <link rel="stylesheet" type="text/css" href="<?= base_url('assets/') ?>icons/fontawesome/css/all.min.css">
  <link rel="stylesheet" type="text/css" href="<?= base_url('assets/') ?>vendor/bootstrap-select/dist/css/bootstrap-select.min.css">
  <link rel="stylesheet" type="text/css" href="<?= base_url('assets/') ?>vendor/sweetalert2-theme-bootstrap-4/bootstrap-4.min.css">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700;800&family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
</head>

<body>
  <div class="page-wraper">
    <header class="site-header mo-left header style-1">
      <div class="header-info-bar">
        <div class="container clearfix">
          
          <div class="logo-header logo-dark">
            <a href="<?= base_url('/') ?>"><img src="<?= base_url('assets/') ?>images/logo.png" alt="logo"></a>
          </div>

        </div>
      </div>

      <div class="sticky-header main-bar-wraper navbar-expand-lg">
        <div class="main-bar clearfix">
          <div class="container clearfix">
            <div class="logo-header logo-dark">
              <a href="<?= base_url() ?>"><img src="<?= base_url('assets/') ?>images/logo.png" alt="logo"></a>
            </div>

            <button class="navbar-toggler collapsed navicon justify-content-end" type="button" data-bs-toggle="collapse"
              data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false"
              aria-label="Toggle navigation">
              <span></span>
              <span></span>
              <span></span>
            </button>

            <div class="extra-nav">
              <div class="extra-cell">
                <a href="<?= base_url('auth/login') ?>" class="btn btn-primary btnhover">Masuk</a>
              </div>
            </div>

            <div class="header-nav navbar-collapse collapse justify-content-start" id="navbarNavDropdown">
              <div class="logo-header logo-dark">
                <a href="<?= base_url() ?>"><img src="<?= base_url('assets/') ?>images/logo.png" alt=""></a>
              </div>
              </form>
              <ul class="nav navbar-nav">
                <li><a href="<?= base_url('/') ?>"><span>Beranda</span></a>
                </li>
                <li><a href="<?= base_url('documents') ?>"><span>Dokumen</span></a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

    </header>

    <div class="page-content">

      <section class="content-inner shop-account">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-6 col-md-6 col-12 mb-4">
              <div class="login-area">
                <div class="tab-content nav">
                  <form class="tab-pane active col-12" action="<?= base_url('auth/login') ?>" method="post">
                    <h4 class="text-secondary">Masuk</h4>
                    <div class="mb-4">
                      <label class="label-title">Username</label>
                      <input name="username" required="" class="form-control" placeholder="Masukkan Username" type="text">
                    </div>
                    <div class="mb-4">
                      <label class="label-title">Password</label>
                      <input name="password" required="" class="form-control " placeholder="Masukkan Password" type="password">
                    </div>
                    <div class="text-left">
                      <button class="btn btn-primary btnhover me-2">Masuk</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <footer class="site-footer">
      <div class="footer-category">
        <div class="container">
        </div>
      </div>

      <div class="footer-top">
        <div class="container">
          <div class="row">
            <div class="col-3 wow fadeInUp" data-wow-delay="0.1s">
              <div class="widget widget_about">
                <div class="footer-logo logo-white">
                  <a href="index.html"><img src="<?= base_url('assets/') ?>images/logo.png" alt=""></a>
                </div>
                <p class="text">Website Perpustakaan Teknik Informatika Universitas Halu Oleo.
                </p>
              </div>
            </div>
            <div class="col-4 wow fadeInUp" data-wow-delay="0.2s">
              <div class="widget widget_services">
                <h5 class="footer-title">Link Terkait</h5>
                <ul>
                  <li><a href="about-us.html">About us</a></li>
                </ul>
              </div>
            </div>
            <div class="col-5 wow fadeInUp" data-wow-delay="0.5s">
              <div class="widget widget_getintuch">
                <h5 class="footer-title">Info Kontak</h5>
                <ul>
                  <li>
                    <i class="flaticon-placeholder"></i>
                    <span>Kampus Hijau Bumi Tridharma Andounohu Kendari, 93132 Kompleks gedung Fakultas Teknik, Universitas Halu Oleo, Jurusan Teknik Informatika</span>
                  </li>
                  <li>
                    <i class="flaticon-phone"></i>
                    <span>+123 345123 556<br>
                      +123 345123 556</span>
                  </li>
                  <li>
                    <i class="flaticon-email"></i>
                    <span>support@bookland.id<br>
                      info@bookland.id</span>
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
  <script src="<?= base_url('assets/') ?>vendor/wow/wow.min.js"></script>
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
  </script>

</body>

</html>