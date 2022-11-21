    <div class="page-content">
      
      <section class="content-inner-1 bg-img-fix">
        <div class="container">
          <div class="row justify-content-end">
            <div class="col-md-6">
              <form action="<?= base_url('master/users') ?>" method="get">
                <div class="row">
                  <div class="col-sm-9">
                    <input type="text" class="form-control form-control-sm mb-2" id="name" name="name" placeholder="Masukkan Nama Pengguna" value="<?php if( $this->input->get('name') !== null ) echo $this->input->get('name'); ?>">
                  </div>
                  <div class="col-sm-3 d-flex justify-content-end align-items-center">
                    <button type="submit" class="btn btn-primary ">
                      <i class="fas fa-search"></i>
                    </button>
                    <a href="<?= base_url('master/users') ?>" class="btn btn-secondary m-l10">
                      <i class="fas fa-sync"></i>
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="row">
            <div class="col-12 m-b30">
              <div class="shop-bx shop-profile">
                <div class="shop-bx-title clearfix">
                  <h5 class="text-uppercase">Daftar Pengguna Admin</h5>
                </div>
                <?php if( $role_id == 1 ): ?>
                <div class="col-12 mb-3">
                  <button type="button" class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#create-new-uadmin">
                    Tambah Admin
                  </button>
                </div>
                <?php endif; ?>
                <?php if( count( $uadmin ) > 0 ): ?>
                <div class="row">
                  <?php foreach ($uadmin as $user) { ?>
                    <div class="col-lg-3 col-md-4 mb-3">
                      <div class="style-1 bg-white m-b30">
                        <div class="dz-media dz-img-effect zoom">
                          <img src="<?= base_url('uploads/users/') . $user->image ?>" alt="">
                        </div>
                        <div class="dz-info">
                          <h4 class="dz-title"><?= $user->name ?></h4>
                          <ul class="border-0 pt-0">
                            <li class="post-author"><i class="far fa-user fa-fw m-r10"></i><?= $user->username ?></li>
                          </ul>
                          <?php if( $role_id == 1 ): ?>
                          <div class="dz-meta meta-bottom mt-3">
                            <button type="button" class="btn btn-sm btn-warning mb-2" data-bs-toggle="modal" data-bs-target="#reset-password-uadmin-<?= $user->id ?>">
                              Reset Password
                            </button>
                            <button type="button" class="btn btn-sm btn-danger mb-2" data-bs-toggle="modal" data-bs-target="#delete-user-uadmin-<?= $user->id ?>">
                              Hapus Admin
                            </button>
                          </div>
                          <?php endif; ?>
                        </div>
                      </div>
                    </div>
                  <?php } ?>
                </div>
                <?php else: ?>
                  <div class="col-12 text-center mt-5">
                    <h3 class="text-warning">Pengguna Tidak Ada!</p>
                  </div>
                <?php endif; ?>
              </div>
            </div>
            <div class="col-12 m-b30">
              <div class="shop-bx shop-profile">
                <div class="shop-bx-title clearfix">
                  <h5 class="text-uppercase">Daftar Pengguna Civitas</h5>
                </div>
                <div class="col-12 mb-3">
                  <button type="button" class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#create-new-civitas">
                    Tambah Civitas
                  </button>
                </div>
                <?php $status = ['lecture' => 'Staf/Dosen', 'student' => 'Mahasiswa']; if( count( $civitas ) > 0 ): ?>
                <div class="row">
                  <?php foreach ($civitas as $user) { ?>
                    <div class="col-lg-3 col-md-4 mb-3">
                      <div class="style-1 bg-white m-b30">
                        <div class="dz-media dz-img-effect zoom">
                          <img src="<?= base_url('uploads/users/') . $user->image ?>" alt="">
                        </div>
                        <div class="dz-info">
                          <h4 class="dz-title">
                            <a href="#"><?= $user->name ?></a>
                          </h4>
                          <ul class="border-0 pt-0">
                            <li class="post-author mb-1"><i class="far fa-user fa-fw m-r10"></i><?= $user->username ?></li>
                            <li class="post-author mb-1"><i class="far fa-id-card fa-fw m-r10"></i><?= $user->id_number ?></li>
                            <li class="post-author mb-1"><i class="fas fa-info fa-fw m-r10"></i><?= $status[ $user->status ] ?></li>
                            <?php if( $user->status == 'student' ): ?>
                            <li class="post-author mb-1"><i class="fas fa-graduation-cap fa-fw m-r10"></i><?= $user->class_year ?></li>
                            <?php endif; ?>
                          </ul>
                          <div class="dz-meta meta-bottom mt-3">
                            <button type="button" class="btn btn-sm btn-secondary mb-2" data-bs-toggle="modal" data-bs-target="#update-user-civitas-<?= $user->id ?>">
                              Ubah
                            </button>
                            <button type="button" class="btn btn-sm btn-warning mb-2" data-bs-toggle="modal" data-bs-target="#reset-password-civitas-<?= $user->id ?>">
                              Reset Password
                            </button>
                            <button type="button" class="btn btn-sm btn-danger mb-2" data-bs-toggle="modal" data-bs-target="#delete-user-civitas-<?= $user->id ?>">
                              Hapus Civitas
                            </button>
                            <a href="<?= base_url('master/transactions?user=') . $user->id ?>" class="btn btn-sm btn-info mb-2">
                              Lihat Peminjaman
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  <?php } ?>
                </div>
                <?php else: ?>
                  <div class="col-12 text-center mt-5">
                    <h3 class="text-warning">Pengguna Tidak Ada!</p>
                  </div>
                <?php endif; ?>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>