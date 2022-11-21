<div class="page-content bg-white">
      <!-- contact area -->
      <div class="content-block">
        <!-- Browse Jobs -->
        <section class="content-inner bg-white">
          <div class="container">
            <div class="row">
              <div class="col-xl-3 col-lg-4 m-b30">
                <div class="sticky-top">
                  <div class="shop-account">
                    <div class="account-detail text-center">
                      <div class="my-image">
                        <a href="javascript:void(0);">
                          <img alt="" src="<?= $user_image ?>">
                        </a>
                      </div>
                      <div class="account-title">
                        <div class="p-2">
                          <h4 class="m-b5"><a href="javascript:void(0);"><?= $data->name ?></a></h4>
                          <p class="m-b0"><a href="javascript:void(0);"><?= $username ?></a></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-xl-9 col-lg-8 m-b30">
                <div class="shop-bx shop-profile">
                  <div class="shop-bx-title clearfix">
                    <h5 class="text-uppercase">Profil</h5>
                  </div>
                  <div class="row m-b30">
                    <div class="col-lg-6 col-md-6 col-12">
                      <form action="<?= base_url('profile/update') ?>" method="post" >
                        <input type="hidden" class="form-control" id="id" name="id" value="<?= $data->id ?>">
                        <input type="hidden" class="form-control" id="role_id" name="role_id" value="<?= $data->role_id ?>">
                        <input type="hidden" class="form-control" id="civitas_id" name="civitas_id" value="<?= $data->civitas_id ?>">
                        <div class="form-group mb-2">
                          <label for="" class="form-label">Nama:</label>
                          <input type="text" class="form-control" id="name" name="name" value="<?= $data->name ?>">
                        </div>
                        <?php if( $data->role_id == 3 ): ?>
                          <input type="hidden" class="form-control" id="status" name="status" value="<?= $data->status ?>">
                          <div class="form-group mb-2">
                            <label for="" class="form-label"><?= ( $data->status == 'lecture' ) ? 'NIP' : 'NIM' ?></label>
                            <input type="text" class="form-control" id="id_number" name="id_number" value="<?= $data->id_number ?>">
                          </div>
                          <?php if( $data->status == 'student' ): ?>
                          <div class="form-group mb-2">
                            <label for="" class="form-label">Angkatan</label>
                            <input type="number" class="form-control" id="class_year" name="class_year" value="<?= $data->class_year ?>">
                          </div>
                          <?php endif; ?>
                        <?php endif; ?>
                        <button type="submit" class="btn btn-sm btn-primary btnhover">Ubah Profil</button>
                      </form>
                    </div>
                    <div class="col-lg-6 col-md-6 col-12">
                      <form action="<?= base_url('profile/change_profile_picture') ?>" method="post" enctype="multipart/form-data">
                        <input type="hidden" class="form-control" id="id" name="id" value="<?= $data->id ?>">
                        <div class="form-group mb-2">
                          <label for="" class="form-label">Foto Profil:</label>
                          <input type="file" class="form-control" id="image" name="image" required>
                        </div>
                        <button type="submit" class="btn btn-sm btn-primary btnhover">Ubah Foto Profil</button>
                      </form>
                    </div>
                  </div>
                  <form action="<?= base_url('profile/update_password') ?>" method="post" class="mt-4">
                    <div class="shop-bx-title clearfix">
                      <h5 class="text-uppercase">Ubah Password</h5>
                    </div>
                    <div class="row m-b30">
                      <input type="hidden" class="form-control" id="id" name="id" value="<?= $data->id ?>">
                      <input type="hidden" class="form-control" id="password" name="password" value="<?= $data->password ?>">
                      <div class="col-md-4 col-12">
                        <div class="form-group">
                          <label for="" class="form-label">Password Lama:</label>
                          <input type="text" class="form-control" id="old_password" name="old_password" autocomplete="off">
                        </div>
                      </div>
                      <div class="col-md-4 col-12">
                        <div class="form-group">
                          <label for="" class="form-label">Password Baru:</label>
                          <input type="password" class="form-control" id="new_password" name="new_password" autocomplete="off">
                        </div>
                      </div>
                      <div class="col-md-4 col-12">
                        <div class="form-group">
                          <label for="" class="form-label">Konfirmasi Password:</label>
                          <input type="password" class="form-control" id="confirm_password" name="confirm_password" >
                        </div>
                      </div>
                    </div>
                    <button type="submit" class="btn btn-sm btn-primary btnhover">Ubah Password</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
        <!-- Browse Jobs END -->
      </div>
    </div>