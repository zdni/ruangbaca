  <?php if( in_array( $role_id, [1,2] ) ): ?>
    <?php if( isset( $create ) ): ?>
      <?php if( $create['links'] ): ?>
      <div class="modal fade" id="create-new-link" tabindex="-1" aria-labelledby="create-new-linkLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <form action="<?= base_url('master/settings/create_link') ?>" method="post">
              <div class="modal-header">
                <h5 class="modal-title" id="create-new-linkLabel">Buat Link Baru</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Batal"></button>
              </div>
              <div class="modal-body">
                <div class="form-group">
                  <label for="">Label Link</label>
                  <input type="text" class="form-control" name="label" id="label">
                </div>
                <div class="form-group">
                  <label for="">URL</label>
                  <input type="text" class="form-control" name="url" id="url">
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
                <button type="submit" class="btn btn-primary">Buat Link</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <?php endif; ?>

      <?php if( $create['categories'] ): ?>
      <div class="modal fade" id="create-new-category" tabindex="-1" aria-labelledby="create-new-categoryLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <form action="<?= base_url('master/settings/create') ?>" method="post">
              <div class="modal-header">
                <h5 class="modal-title" id="create-new-categoryLabel">Buat Kategori Baru</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Batal"></button>
              </div>
              <div class="modal-body">
                <input type="hidden" name="model" id="model" value="categories">
                <input type="hidden" name="data" id="data" value="Kategori">
                <div class="form-group">
                  <label for="">Kategori</label>
                  <input type="text" class="form-control" name="name" id="name">
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
                <button type="submit" class="btn btn-primary">Buat Kategori</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <?php endif; ?>

      <?php if( $create['specializations'] ): ?>
      <div class="modal fade" id="create-new-specialization" tabindex="-1" aria-labelledby="create-new-specializationLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <form action="<?= base_url('master/settings/create') ?>" method="post">
              <div class="modal-header">
                <h5 class="modal-title" id="create-new-specializationLabel">Buat Peminatan Baru</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Batal"></button>
              </div>
              <div class="modal-body">
                <input type="hidden" name="model" id="model" value="specializations">
                <input type="hidden" name="data" id="data" value="Peminatan">
                <div class="form-group">
                  <label for="">Peminatan</label>
                  <input type="text" class="form-control" name="name" id="name">
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
                <button type="submit" class="btn btn-primary">Buat Peminatan</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <?php endif; ?>

      <?php if( $create['storages'] ): ?>
      <div class="modal fade" id="create-new-storage" tabindex="-1" aria-labelledby="create-new-storageLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <form action="<?= base_url('master/settings/create') ?>" method="post">
              <div class="modal-header">
                <h5 class="modal-title" id="create-new-storageLabel">Buat Lokasi Baru</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Batal"></button>
              </div>
              <div class="modal-body">
                <input type="hidden" name="model" id="model" value="storages">
                <input type="hidden" name="data" id="data" value="Lokasi">
                <div class="form-group">
                  <label for="">Lokasi</label>
                  <input type="text" class="form-control" name="name" id="name">
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
                <button type="submit" class="btn btn-primary">Buat Lokasi</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <?php endif; ?>

      <?php if( $create['uadmin'] ): ?>
      <div class="modal fade" id="create-new-uadmin" tabindex="-1" aria-labelledby="create-new-uadminLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <form action="<?= base_url('master/users/create') ?>" method="post">
              <div class="modal-header">
                <h5 class="modal-title" id="create-new-uadminLabel">Tambah Admin</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Batal"></button>
              </div>
              <div class="modal-body">
                <input type="hidden" class="form-control" name="role_id" id="role_id" value="2">
                <div class="form-group">
                  <label for="">Nama</label>
                  <input type="text" class="form-control" name="name" id="name">
                </div>
                <div class="form-group">
                  <label for="">Username</label>
                  <input type="text" class="form-control" name="username" id="username">
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
                <button type="submit" class="btn btn-primary">Tambah Admin</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <?php endif; ?>

      <?php if( $create['civitas'] ): ?>
      <div class="modal fade" id="create-new-civitas" tabindex="-1" aria-labelledby="create-new-civitasLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <form action="<?= base_url('master/users/create') ?>" method="post">
              <div class="modal-header">
                <h5 class="modal-title" id="create-new-civitasLabel">Tambah Civitas</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Batal"></button>
              </div>
              <div class="modal-body">
              <input type="hidden" class="form-control" name="role_id" id="role_id" value="3">
                <div class="form-group mb-2">
                  <label for="">Nama</label>
                  <input type="text" class="form-control" name="name" id="name">
                </div>
                <div class="form-group mb-2">
                  <label for="">Username</label>
                  <input type="text" class="form-control" name="username" id="username">
                  <span style="font-size: 12px;" class="text-info">PASSWORD DEFAULT SAMA DENGAN USERNAME PENGGUNA</span>
                </div>
                <div class="form-group mb-2">
                  <label for="">Status</label>
                  <select name="status" id="status" class="form-control" onchange="onchangeStatus(this)">
                    <option value="lecture">Staf/Dosen</option>
                    <option value="student">Mahasiswa</option>
                  </select>
                </div>
                <div class="form-group mb-2">
                  <label for="">NIP</label>
                  <input type="text" name="id_number" id="id_number" class="form-control" required>
                </div>
                <div class="form-group mb-2" hidden="hidden">
                  <label for="">Angkatan</label>
                  <input type="text" name="class_year" id="class_year" class="form-control">
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
                <button type="submit" class="btn btn-primary">Tambah Civitas</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <?php endif; ?>


    <?php endif; ?>

    <?php 
      if( isset( $links ) ): 
        foreach ($links as $link) {
    ?>
      <div class="modal fade" id="update-link-<?= $link->id ?>" tabindex="-1" aria-labelledby="update-link-<?= $link->id ?>Label" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <form action="<?= base_url('master/settings/update_link') ?>" method="post">
              <div class="modal-header">
                <h5 class="modal-title" id="update-link-<?= $link->id ?>Label">Ubah Link</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Batal"></button>
              </div>
              <div class="modal-body">
                <input type="hidden" name="id" id="id" value="<?= $link->id ?>">
                <div class="form-group">
                  <label for="">Label Link</label>
                  <input type="text" class="form-control" name="label" id="label" value="<?= $link->label ?>">
                </div>
                <div class="form-group">
                  <label for="">URL</label>
                  <input type="text" class="form-control" name="url" id="url" value="<?= $link->url ?>">
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
                <button type="submit" class="btn btn-primary">Ubah Link</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div class="modal fade" id="delete-link-<?= $link->id ?>" tabindex="-1" aria-labelledby="delete-link-<?= $link->id ?>Label" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <form action="<?= base_url('master/settings/delete_link') ?>" method="post">
              <div class="modal-header">
                <h5 class="modal-title" id="delete-link-<?= $link->id ?>Label">Hapus Link</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Batal"></button>
              </div>
              <div class="modal-body">
                <input type="hidden" name="id" id="id" value="<?= $link->id ?>">
                <p>Yakin ingin menghapus link <?= $link->label ?></p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
                <button type="submit" class="btn btn-danger">Hapus Link</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    <?php 
        } 
      endif; 
    ?>

    <?php 
      if( isset( $uadmin ) ): 
        foreach ($uadmin as $user) {
    ?>
      <div class="modal fade" id="reset-password-uadmin-<?= $user->id ?>" tabindex="-1" aria-labelledby="reset-password-uadmin-<?= $user->id ?>Label" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <form action="<?= base_url('master/users/reset_password') ?>" method="post">
              <div class="modal-header">
                <h5 class="modal-title" id="reset-password-uadmin-<?= $user->id ?>Label">Reset Password</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Batal"></button>
              </div>
              <div class="modal-body">
                <input type="hidden" name="id" id="id" value="<?= $user->id ?>">
                <input type="hidden" name="username" id="username" value="<?= $user->username ?>">
                <p>Yakin ingin mereset password <?= $user->name ?>?</p>
                <p>Password akan menjadi default, yaitu <b><?= $user->username ?></b></p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
                <button type="submit" class="btn btn-danger">Reset Password</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div class="modal fade" id="delete-user-uadmin-<?= $user->id ?>" tabindex="-1" aria-labelledby="delete-user-uadmin-<?= $user->id ?>Label" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <form action="<?= base_url('master/users/delete') ?>" method="post">
              <div class="modal-header">
                <h5 class="modal-title" id="delete-user-uadmin-<?= $user->id ?>Label">Hapus Admin</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Batal"></button>
              </div>
              <div class="modal-body">
                <input type="hidden" name="id" id="id" value="<?= $user->id ?>">
                <input type="hidden" name="role_id" id="role_id" value="<?= $user->role_id ?>">
                <p>Yakin ingin menghapus Admin <?= $user->name ?>?</p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
                <button type="submit" class="btn btn-danger">Hapus Admin</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    <?php 
        } 
      endif; 
    ?>

    <?php 
      if( isset( $civitas ) ): 
        foreach ($civitas as $user) {
    ?>
      <div class="modal fade" id="reset-password-civitas-<?= $user->id ?>" tabindex="-1" aria-labelledby="reset-password-civitas-<?= $user->id ?>Label" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <form action="<?= base_url('master/users/reset_password') ?>" method="post">
              <div class="modal-header">
                <h5 class="modal-title" id="reset-password-civitas-<?= $user->id ?>Label">Reset Password</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Batal"></button>
              </div>
              <div class="modal-body">
                <input type="hidden" name="id" id="id" value="<?= $user->id ?>">
                <input type="hidden" name="username" id="username" value="<?= $user->username ?>">
                <p>Yakin ingin mereset password <?= $user->name ?></p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
                <button type="submit" class="btn btn-danger">Reset Password</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div class="modal fade" id="update-user-civitas-<?= $user->id ?>" tabindex="-1" aria-labelledby="update-user-civitas-<?= $user->id ?>Label" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <form action="<?= base_url('master/users/update') ?>" method="post">
              <div class="modal-header">
                <h5 class="modal-title" id="update-user-civitas-<?= $user->id ?>Label">Ubah Civitas</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Batal"></button>
              </div>
              <div class="modal-body">
              <input type="hidden" class="form-control" name="id" id="id" value="<?= $user->id ?>">
                <div class="form-group mb-2">
                  <label for="">Nama</label>
                  <input type="text" class="form-control" name="name" id="name" value="<?= $user->name ?>">
                </div>
                <div class="form-group mb-2">
                  <label for="">Username</label>
                  <input type="text" class="form-control" value="<?= $user->username ?>" disabled>
                </div>
                <div class="form-group mb-2">
                  <label for="">Status</label>
                  <select name="status" id="status" class="form-control" onchange="onchangeStatus(this)">
                    <option <?php if( $user->status == 'lecture' ) echo 'selected'; ?> value="lecture">Staf/Dosen</option>
                    <option <?php if( $user->status == 'student' ) echo 'selected'; ?> value="student">Mahasiswa</option>
                  </select>
                </div>
                <div class="form-group mb-2">
                  <label for="">NIP</label>
                  <input type="text" name="id_number" id="id_number" class="form-control" value="<?= $user->id_number ?>">
                </div>
                <div class="form-group mb-2" hidden="hidden">
                  <label for="">Angkatan</label>
                  <input type="text" name="class_year" id="class_year" class="form-control" value="<?= $user->class_year ?>">
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
                <button type="submit" class="btn btn-primary">Ubah Civitas</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div class="modal fade" id="delete-user-civitas-<?= $user->id ?>" tabindex="-1" aria-labelledby="delete-user-civitas-<?= $user->id ?>Label" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <form action="<?= base_url('master/users/delete') ?>" method="post">
              <div class="modal-header">
                <h5 class="modal-title" id="delete-user-civitas-<?= $user->id ?>Label">Hapus Civitas</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Batal"></button>
              </div>
              <div class="modal-body">
                <input type="hidden" name="id" id="id" value="<?= $user->id ?>">
                <input type="hidden" name="civitas_id" id="civitas_id" value="<?= $user->civitas_id ?>">
                <input type="hidden" name="role_id" id="role_id" value="<?= $user->role_id ?>">
                <p>Yakin ingin menghapus Civitas <?= $user->name ?></p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
                <button type="submit" class="btn btn-danger">Hapus Civitas</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    <?php 
        } 
      endif; 
    ?>

    <?php 
      if( isset( $categories ) ): 
        foreach ($categories as $category) {
    ?>
      <div class="modal fade" id="update-category-<?= $category->id ?>" tabindex="-1" aria-labelledby="update-category-<?= $category->id ?>Label" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <form action="<?= base_url('master/settings/update') ?>" method="post">
              <div class="modal-header">
                <h5 class="modal-title" id="update-category-<?= $category->id ?>Label">Ubah Kategori</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Batal"></button>
              </div>
              <div class="modal-body">
              <input type="hidden" class="form-control" name="id" id="id" value="<?= $category->id ?>">
                <input type="hidden" name="model" id="model" value="categories">
                <div class="form-group mb-2">
                  <label for="">Nama</label>
                  <input type="text" class="form-control" name="name" id="name" value="<?= $category->name ?>">
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
                <button type="submit" class="btn btn-primary">Ubah Kategori</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div class="modal fade" id="delete-category-<?= $category->id ?>" tabindex="-1" aria-labelledby="delete-category-<?= $category->id ?>Label" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <form action="<?= base_url('master/settings/delete') ?>" method="post">
              <div class="modal-header">
                <h5 class="modal-title" id="delete-category-<?= $category->id ?>Label">Hapus Kategori</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Batal"></button>
              </div>
              <div class="modal-body">
                <input type="hidden" name="model" id="model" value="categories">
                <input type="hidden" name="id" id="id" value="<?= $category->id ?>">
                <p>Yakin ingin menghapus Kategori <?= $category->name ?></p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
                <button type="submit" class="btn btn-danger">Hapus Kategori</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    <?php 
        } 
      endif; 
    ?>

    <?php 
      if( isset( $specializations ) ): 
        foreach ($specializations as $specialization) {
    ?>
      <div class="modal fade" id="update-specialization-<?= $specialization->id ?>" tabindex="-1" aria-labelledby="update-specialization-<?= $specialization->id ?>Label" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <form action="<?= base_url('master/settings/update') ?>" method="post">
              <div class="modal-header">
                <h5 class="modal-title" id="update-specialization-<?= $specialization->id ?>Label">Ubah Peminatan</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Batal"></button>
              </div>
              <div class="modal-body">
              <input type="hidden" class="form-control" name="id" id="id" value="<?= $specialization->id ?>">
                <input type="hidden" name="model" id="model" value="specializations">
                <div class="form-group mb-2">
                  <label for="">Nama</label>
                  <input type="text" class="form-control" name="name" id="name" value="<?= $specialization->name ?>">
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
                <button type="submit" class="btn btn-primary">Ubah Peminatan</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div class="modal fade" id="delete-specialization-<?= $specialization->id ?>" tabindex="-1" aria-labelledby="delete-specialization-<?= $specialization->id ?>Label" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <form action="<?= base_url('master/settings/delete') ?>" method="post">
              <div class="modal-header">
                <h5 class="modal-title" id="delete-specialization-<?= $specialization->id ?>Label">Hapus Peminatan</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Batal"></button>
              </div>
              <div class="modal-body">
                <input type="hidden" name="model" id="model" value="specializations">
                <input type="hidden" name="id" id="id" value="<?= $specialization->id ?>">
                <p>Yakin ingin menghapus Peminatan <?= $specialization->name ?></p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
                <button type="submit" class="btn btn-danger">Hapus Peminatan</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    <?php 
        } 
      endif; 
    ?>

  <?php 
      if( isset( $storages ) ): 
        foreach ($storages as $storage) {
    ?>
      <div class="modal fade" id="update-storage-<?= $storage->id ?>" tabindex="-1" aria-labelledby="update-storage-<?= $storage->id ?>Label" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <form action="<?= base_url('master/settings/update') ?>" method="post">
              <div class="modal-header">
                <h5 class="modal-title" id="update-storage-<?= $storage->id ?>Label">Ubah Lokasi</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Batal"></button>
              </div>
              <div class="modal-body">
              <input type="hidden" class="form-control" name="id" id="id" value="<?= $storage->id ?>">
                <input type="hidden" name="model" id="model" value="storages">
                <div class="form-group mb-2">
                  <label for="">Nama</label>
                  <input type="text" class="form-control" name="name" id="name" value="<?= $storage->name ?>">
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
                <button type="submit" class="btn btn-primary">Ubah Lokasi</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div class="modal fade" id="delete-storage-<?= $storage->id ?>" tabindex="-1" aria-labelledby="delete-storage-<?= $storage->id ?>Label" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <form action="<?= base_url('master/settings/delete') ?>" method="post">
              <div class="modal-header">
                <h5 class="modal-title" id="delete-storage-<?= $storage->id ?>Label">Hapus Lokasi</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Batal"></button>
              </div>
              <div class="modal-body">
                <input type="hidden" name="model" id="model" value="storages">
                <input type="hidden" name="id" id="id" value="<?= $storage->id ?>">
                <p>Yakin ingin menghapus Lokasi <?= $storage->name ?></p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
                <button type="submit" class="btn btn-danger">Hapus Lokasi</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    <?php 
        } 
      endif; 
    ?>

    <?php 
      if( isset( $documents ) ): 
        foreach ($documents as $document) {
    ?>
      <div class="modal fade" id="delete-document-<?= $document->id ?>" tabindex="-1" aria-labelledby="delete-document-<?= $document->id ?>Label" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <form action="<?= base_url('documents/delete') ?>" method="post">
              <div class="modal-header">
                <h5 class="modal-title" id="delete-document-<?= $document->id ?>Label">Hapus Dokumen</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Batal"></button>
              </div>
              <div class="modal-body">
                <input type="hidden" name="document_id" id="document_id" value="<?= $document->document_id ?>">
                <input type="hidden" name="id" id="id" value="<?= $document->id ?>">
                <input type="hidden" name="type" id="type" value="<?= $document->type ?>">
                <p>Yakin ingin menghapus Dokumen <?= $document->title ?>?</p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
                <button type="submit" class="btn btn-danger">Hapus Dokumen</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    <?php 
        } 
      endif; 
    ?>
  <?php endif; ?>
  
  <?php 
    if( isset( $transactions ) ): 
      foreach ($transactions as $transaction) {
  ?>
    <?php if( in_array( $role_id, [1,2] ) ): ?>
    <div class="modal fade" id="accept-transaction-<?= $transaction->id ?>" tabindex="-1" aria-labelledby="accept-transaction-<?= $transaction->id ?>Label" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <form action="<?= base_url('master/transactions/accept') ?>" method="post">
            <div class="modal-header">
              <h5 class="modal-title" id="accept-transaction-<?= $transaction->id ?>Label">Setujui Peminjaman</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Batal"></button>
            </div>
            <div class="modal-body">
              <input type="hidden" name="id" id="id" value="<?= $transaction->id ?>">
              <p>Yakin ingin menyetujui peminjaman?</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
              <button type="submit" class="btn btn-primary">Setujui Peminjaman</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div class="modal fade" id="accept-return-<?= $transaction->id ?>" tabindex="-1" aria-labelledby="accept-return-<?= $transaction->id ?>Label" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <form action="<?= base_url('master/transactions/return') ?>" method="post">
            <div class="modal-header">
              <h5 class="modal-title" id="accept-return-<?= $transaction->id ?>Label">Setujui Pengembalian</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Batal"></button>
            </div>
            <div class="modal-body">
              <input type="hidden" name="id" id="id" value="<?= $transaction->id ?>">
              <input type="hidden" name="status" id="status" value="<?= $transaction->status ?>">
              <p>Yakin ingin menyetujui pengembalian?</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
              <button type="submit" class="btn btn-primary">Setujui Pengembalian</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <?php endif; ?>
    <div class="modal fade" id="cancel-transaction-<?= $transaction->id ?>" tabindex="-1" aria-labelledby="cancel-transaction-<?= $transaction->id ?>Label" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <form action="<?= base_url('user/transactions/cancel') ?>" method="post">
            <div class="modal-header">
              <h5 class="modal-title" id="cancel-transaction-<?= $transaction->id ?>Label">Batalkan Peminjaman</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Batal"></button>
            </div>
            <div class="modal-body">
              <input type="hidden" name="id" id="id" value="<?= $transaction->id ?>">
              <p>Yakin ingin membatalkan peminjaman?</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
              <button type="submit" class="btn btn-danger">Batalkan Peminjaman</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  <?php 
      } 
    endif; 
  ?>

  <script>
    function onchangeStatus(status) {
      const label = status.parentElement.nextElementSibling.children[0];
      const classYearForm = status.parentElement.nextElementSibling.nextElementSibling;

      if( status.value == 'student' ) {
        label.innerHTML = 'NIM';
        classYearForm.removeAttribute('hidden');
        console.log( classYearForm )
        classYearForm.children[1].setAttribute('required', 'true');
      }
      if( status.value == 'lecture' ) {
        label.innerHTML = 'NIP';
        classYearForm.setAttribute('hidden', 'hidden');
        classYearForm.children[1].removeAttribute('required');
      }
    }
  </script>
</body>

</html>