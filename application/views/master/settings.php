    <div class="page-content bg-white">
      <div class="content-block">
        <section class="content-inner bg-white">
          <div class="container">
            <div class="row">
              <div class="col-12 m-b30">
                <div class="shop-bx shop-profile">
                  <div class="shop-bx-title clearfix">
                    <h5 class="">Kategori Buku</h5>
                  </div>
                  <div class="row">
                    <div class="col-12">
                      <button type="button" class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#create-new-category">
                        Buat Kategori
                      </button>
                      <table class="table">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nama</th>
                            <th scope="col">Aksi</th>
                          </tr>
                        </thead>
                        <tbody>
                          <?php $number = 1; foreach ($categories as $category) { ?>
                            <tr>
                              <th scope="row"><?= $number ?></th>
                              <td><?= $category->name ?></td>
                              <td>
                                <button type="button" class="btn btn-sm btn-secondary" data-bs-toggle="modal" data-bs-target="#update-category-<?= $category->id ?>">
                                  Ubah
                                </button>
                                <button type="button" class="btn btn-sm btn-danger" data-bs-toggle="modal" data-bs-target="#delete-category-<?= $category->id ?>">
                                  Hapus
                                </button>
                              </td>
                            </tr>
                          <?php $number++; } ?>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div class="shop-bx-title clearfix mt-3">
                    <h5 class="">Peminatan</h5>
                  </div>
                  <div class="row">
                    <div class="col-12">
                      <button type="button" class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#create-new-specialization">
                        Buat Peminatan
                      </button>
                      <table class="table">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nama</th>
                            <th scope="col">Aksi</th>
                          </tr>
                        </thead>
                        <tbody>
                          <?php $number = 1; foreach ($specializations as $specialization) { ?>
                            <tr>
                              <th scope="row"><?= $number ?></th>
                              <td><?= $specialization->name ?></td>
                              <td>
                                <button type="button" class="btn btn-sm btn-secondary" data-bs-toggle="modal" data-bs-target="#update-specialization-<?= $specialization->id ?>">
                                  Ubah
                                </button>
                                <button type="button" class="btn btn-sm btn-danger" data-bs-toggle="modal" data-bs-target="#delete-specialization-<?= $specialization->id ?>">
                                  Hapus
                                </button>
                              </td>
                            </tr>
                          <?php $number++; } ?>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div class="shop-bx-title clearfix mt-3">
                    <h5 class="">Lokasi</h5>
                  </div>
                  <div class="row mb-5 pb-5">
                    <div class="col-12">
                      <button type="button" class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#create-new-storage">
                        Buat Lokasi
                      </button>
                      <table class="table">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nama</th>
                            <th scope="col">Aksi</th>
                          </tr>
                        </thead>
                        <tbody>
                          <?php $number = 1; foreach ($storages as $storage) { ?>
                            <tr>
                              <th scope="row"><?= $number ?></th>
                              <td><?= $storage->name ?></td>
                              <td>
                                <button type="button" class="btn btn-sm btn-secondary" data-bs-toggle="modal" data-bs-target="#update-storage-<?= $storage->id ?>">
                                  Ubah
                                </button>
                                <button type="button" class="btn btn-sm btn-danger" data-bs-toggle="modal" data-bs-target="#delete-storage-<?= $storage->id ?>">
                                  Hapus
                                </button>
                              </td>
                            </tr>
                          <?php $number++; } ?>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div class="shop-bx-title clearfix mt-5 pt-5">
                    <h5 class="text-uppercase">Informasi Kontak</h5>
                  </div>
                  <div class="row">
                    <?php foreach ($contacts as $contact) { ?>
                      <div class="col-lg-6 col-sm-12 mb-3">
                        <form action="<?= base_url('master/settings/update_contact') ?>" method="post">
                          <div class="form-group mb-1">
                            <label for="" class="form-label"><?= $contact->label ?></label>
                            <input type="text" name="file_content" id="file_content" class="form-control" value="<?= $contact->file_content ?>">
                            <input type="hidden" name="file" id="file" value="<?= $contact->file ?>" >
                          </div>
                          <button type="submit" class="btn btn-sm btn-primary">Ubah</button>
                        </form>
                      </div>
                    <?php } ?>
                  </div>
                  <div class="shop-bx-title clearfix">
                    <h5 class="text-uppercase">Link Terkait</h5>
                  </div>
                  <div class="row">
                    <div class="col-12">
                      <button type="button" class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#create-new-link">
                        Buat Link Terkait
                      </button>

                      <table class="table">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Label</th>
                            <th scope="col">Aksi</th>
                          </tr>
                        </thead>
                        <tbody>
                          <?php $number = 1; foreach ($links as $link) { ?>
                            <tr>
                              <th scope="row"><?= $number ?></th>
                              <td><?= $link->label ?></td>
                              <td>
                                <button type="button" class="btn btn-sm btn-secondary" data-bs-toggle="modal" data-bs-target="#update-link-<?= $link->id ?>">
                                  Ubah
                                </button>
                                <button type="button" class="btn btn-sm btn-danger" data-bs-toggle="modal" data-bs-target="#delete-link-<?= $link->id ?>">
                                  Hapus
                                </button>
                              </td>
                            </tr>
                          <?php $number++; } ?>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>