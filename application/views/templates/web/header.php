  <div class="page-wraper">

    <header class="site-header mo-left header style-1">
      <div class="header-info-bar">
        <div class="container clearfix">
          <div class="logo-header logo-dark">
            <a href="index.html"><img src="<?= base_url('assets/') ?>images/logo.png" alt="logo"></a>
          </div>

          <?php if( $user_id ): ?>
          <div class="extra-nav">
            <div class="extra-cell">
              <ul class="navbar-nav header-right">
                <li class="nav-item dropdown profile-dropdown  ms-4">
                  <a class="nav-link" href="javascript:void(0);" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="<?= $user_image ?>" alt="/">
                    <div class="profile-info">
                      <h6 class="title"><?= $name ?></h6>
                      <span><?= $username ?></span>
                    </div>
                  </a>
                  <div class="dropdown-menu py-0 dropdown-menu-end">
                    <div class="dropdown-header">
                      <h6 class="m-0" style="overflow: hidden;"><?= $name ?></h6>
                      <span><?= $username ?></span>
                    </div>
                    <div class="dropdown-body">
                      <a href="<?= base_url('profile') ?>" class="dropdown-item d-flex justify-content-between align-items-center ai-icon">
                        <div>
                          <span class="ms-2">Profil</span>
                        </div>
                      </a>
                    </div>
                    <div class="dropdown-footer">
                      <a class="btn btn-primary w-100 btnhover btn-sm" href="<?= base_url('auth/logout') ?>">Keluar</a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <?php endif; ?>

        </div>
      </div>

      <div class="sticky-header main-bar-wraper navbar-expand-lg">
        <div class="main-bar clearfix">
          <div class="container clearfix">
            <div class="logo-header logo-dark">
              <a href="index.html"><img src="<?= base_url('assets/') ?>images/logo.png" alt="logo"></a>
            </div>

            <button class="navbar-toggler collapsed navicon justify-content-end" type="button" data-bs-toggle="collapse"
              data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false"
              aria-label="Toggle navigation">
              <span></span>
              <span></span>
              <span></span>
            </button>

            <?php if( !$user_id ): ?>
            <div class="extra-nav">
              <div class="extra-cell">
                <a href="<?= base_url('auth/login') ?>" class="btn btn-primary btnhover">Masuk</a>
              </div>
            </div>
            <?php endif; ?>

            <div class="header-nav navbar-collapse collapse justify-content-start" id="navbarNavDropdown">
              <div class="logo-header logo-dark">
                <a href="index.html"><img src="<?= base_url('assets/') ?>images/logo.png" alt=""></a>
              </div>
              </form>
              <ul class="nav navbar-nav">
                <li><a href="<?= base_url('/') ?>"><span>Beranda</span></a>
                </li>
                <li><a href="<?= base_url('documents') ?>"><span>Dokumen</span></a></li>
                <?php if( $user_id ): ?>
                  <?php if( in_array( $role_id, [1,2] ) ): ?>
                    <li class="sub-menu-down"><a href="javascript:void(0);"><span>Data Master</span></a>
                      <ul class="sub-menu">
                        <li><a href="<?= base_url('master/settings') ?>">Pengaturan</a></li>
                        <li><a href="<?= base_url('master/users') ?>">Pengguna</a></li>
                        <li><a href="<?= base_url('master/transactions') ?>">Peminjaman</a></li>
                        <!-- <li><a href="<?= base_url('master/penalties') ?>">Keterlambatan</a></li> -->
                      </ul>
                    </li>
                  <?php endif; ?>
                  <?php if( $role_id == 3 ): ?>
                    <li class="sub-menu-down"><a href="javascript:void(0);"><span>Transaksi</span></a>
                      <ul class="sub-menu">
                        <li><a href="<?= base_url('user/transactions') ?>">Peminjaman</a></li>
                        <!-- <li><a href="<?= base_url('user/penalties') ?>">Keterlambatan</a></li> -->
                      </ul>
                    </li>
                  <?php endif; ?>
                <?php endif; ?>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
