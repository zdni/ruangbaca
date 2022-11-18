<body>

  <!-- ======= Top Bar ======= -->
  <div id="topbar" class="d-flex align-items-center fixed-top">
    <div class="container d-flex justify-content-between">
      <div class="contact-info d-flex align-items-center">
        <i class="bi bi-envelope"></i> <a href="mailto:<?= $email ?>"><?= $email ?></a>
        <i class="bi bi-phone"></i> <?= $telepon ?>
      </div>
      <div class="d-none d-lg-flex social-links align-items-center">
        <a href="<?= base_url('auth/login') ?>">Login</a>
      </div>
    </div>
  </div>

  <!-- ======= Header ======= -->
  <header id="header" class="fixed-top">
    <div class="container d-flex align-items-center">

      <h1 class="logo me-auto">
        <a href="<?= base_url() ?>">
          <img src="<?= base_url('uploads/logo/') . $logo ?>">
        </a>
      </h1>

      <nav id="navbar" class="navbar order-last order-lg-0">
        <ul>
          <li><a class="nav-link scrollto active" href="<?= base_url('dashboard') ?>#hero">Beranda</a></li>
          <li class="dropdown"><a href="#"><span>Tentang Kami</span> <i class="bi bi-chevron-down"></i></a>
            <ul>
              <?php foreach ($menu_profiles as $profile) { ?>
                <li><a href="<?= base_url('dashboard/profile?slug=') . $profile->slug ?>"><?= $profile->title ?></a></li>
              <?php } ?>
            </ul>
          </li>
          <li class="dropdown"><a href="#"><span>Bidang</span> <i class="bi bi-chevron-down"></i></a>
            <ul>
              <?php foreach ($menu_sectors as $sector) { ?>
                <li><a href="<?= base_url('dashboard/sector?slug=') . $sector->slug ?>"><?= $sector->name ?></a></li>
              <?php } ?>
            </ul>
          </li>
          <li class="dropdown"><a href="#"><span>Galeri</span> <i class="bi bi-chevron-down"></i></a>
            <ul>
              <li><a href="<?= base_url('dashboard/gallery?slug=photos') ?>">Foto</a></li>
              <li><a href="<?= base_url('dashboard/gallery?slug=videos') ?>">Video</a></li>
            </ul>
          </li>
          <li class="dropdown"><a href="#"><span>Informasi</span> <i class="bi bi-chevron-down"></i></a>
            <ul>
              <li><a href="<?= base_url('dashboard/articles') ?>">Berita</a></li>
              <li><a href="<?= base_url('dashboard/announcements') ?>">Pengumuman</a></li>
            </ul>
          </li>
          <li class="dropdown"><a href="#"><span>Regulasi</span> <i class="bi bi-chevron-down"></i></a>
            <ul>
              <?php foreach ($menu_downloads as $download) { ?>
                <li><a href="<?= base_url('dashboard/documents/') . $download->id ?>"><?= $download->menu ?></a></li>
              <?php } ?>
            </ul>
          </li>
          <li><a class="nav-link scrollto" href="<?= base_url('dashboard/contact_us') ?>">Kontak Kami</a></li>
        </ul>
        <i class="bi bi-list mobile-nav-toggle"></i>
      </nav><!-- .navbar -->
    </div>
  </header><!-- End Header -->