    <div class="page-content bg-grey">
      <section class="content-inner-1 border-bottom">
        <div class="container">
          <div class="d-md-flex justify-content-between align-items-center mb-3">
            <h4 class="title">Temukan Referensi yang Anda Cari.</h4>
            <?php if( in_array( $role_id, [1,2] ) ): ?>
            <a href="<?= base_url('documents/form?action=create') ?>" class="btn btn-sm btn-primary mt-2">
              Tambah Dokumen
            </a>
            <?php endif; ?>
          </div>
          <form action="<?= base_url('documents') ?>" method="get">
            <div class="d-md-flex justify-content-between">
              <input type="text" class="form-control m-r10 mb-2" name="title" id="title" placeholder="Masukkan Judul" value="<?= $title_ ?>">
              <select name="type" id="type" class="form-control m-r10 mb-2" onchange="changeTypeSearchDocuments(this)">
                <option <?php if( $type_ == 'book' ) echo 'selected' ?> value="book">Buku</option>
                <option <?php if( $type_ == 'thesis' ) echo 'selected' ?> value="thesis">Skripsi</option>
              </select>
              <select name="category_id" id="category_id" class="form-control m-r10 mb-2 form-search-book">
                <option value="">-- Pilih Kategori --</option>
                <?php foreach ($categories as $category) { ?>
                  <option <?php if( $category_id_ == $category->id ) echo 'selected' ?> value="<?= $category->id ?>"><?= $category->name ?></option>
                <?php } ?>
              </select>
              <select name="specialization_id" id="specialization_id" class="form-control m-r10 mb-2 form-search-thesis" style="display: none;">
                  <option value="">-- Pilih Peminatan --</option>
                <?php foreach ($specializations as $specialization) { ?>
                  <option <?php if( $specialization_id_ == $specialization->id ) echo 'selected' ?> value="<?= $specialization->id ?>"><?= $specialization->name ?></option>
                <?php } ?>
              </select>
              <select name="storage_id" id="storage_id" class="form-control m-r10 mb-2 form-search-thesis" style="display: none;">
                  <option value="">-- Pilih Lokasi --</option>
                <?php foreach ($storages as $storage) { ?>
                  <option <?php if( $storage_id_ == $storage->id ) echo 'selected' ?> value="<?= $storage->id ?>"><?= $storage->name ?></option>
                <?php } ?>
              </select>
              <button type="submit" class="btn btn-primary mt-2 mt-md-0 mb-2">
                <i class="fas fa-search"></i>
              </button>
            </div>
          </form>

          <div class="row mt-5">
            <?php if( count($documents) <= 0 ): ?>
              <h3>Tidak ada Dokumen</h3>
            <?php endif; ?>
            <?php $type = ['book' => 'Buku', 'thesis' => 'Skripsi']; foreach ($documents as $document) { ?>
              <div class="col-12">
                <div class="dz-shop-card style-2">
                  <div class="dz-media">
                    <img src="<?= base_url('uploads/documents/covers/') . $document->cover ?>" alt="book">
                  </div>
                  <div class="dz-content">
                    <div class="dz-header">
                      <div>
                        <ul class="dz-tags">
                          <li><a href="<?= base_url('documents?type=') . $document->type ?>"><?= $type[$document->type] ?></a></li>
                        </ul>
                        <h4 class="title mb-0"><a href="javascript:void(0);"><?= $document->title ?></a></h4>
                        <!-- <h4 class="title mb-0"><a href="<?= base_url('documents/detail?id=') . $document->id . '&type=' . $document->type ?>"><?= $document->title ?></a></h4> -->
                      </div>
                    </div>
  
                    <div class="dz-body">
                      <div class="dz-rating-box">
                        <div>
                          <!-- <p class="dz-para"></p> -->
                          <div>
                            <a href="javascript:void(0);" class="badge">Kode: <?= $document->code ?></a>
                            <?php if($document->type == 'book'): ?>
                              <a href="<?= base_url('documents?category_id=') . $document->category_id ?>" class="badge badge-light text-black">Kategori: <?= $document->category ?></a>
                            <?php endif; ?>
                            <?php if($document->type == 'thesis'): ?>
                              <a href="<?= base_url('documents?specialization_id=') . $document->specialization_id ?>" class="badge badge-info">Peminatan: <?= $document->specialization ?></a>
                              <a href="<?= base_url('documents?storage_id=') . $document->storage_id ?>" class="badge badge-light text-black">Lokasi: <?= $document->storage ?></a>
                            <?php endif; ?>
                          </div>
                        </div>
                      </div>
                      <div class="rate">
                        <ul class="book-info">
                          <li><span>Penulis</span><?= $document->writer ?></li>
                          <?php if($document->type == 'book'): ?>
                            <li><span>Penerbit</span><?= $document->publisher ?></li>
                            <li><span>Tahun Terbit</span><?= $document->publication_year ?></li>
                            <li><span>Stok</span><?= $document->stock ?></li>
                          <?php endif; ?>
                          <?php if($document->type == 'thesis'): ?>
                            <li><span>NIM</span><?= $document->student_id_number ?></li>
                            <li><span>Tahun Lulus</span><?= $document->graduation_year ?></li>
                          <?php endif; ?>
                        </ul>
                      </div>
                      <?php if($document->type == 'thesis'): ?>
                      <div class="rate">
                        <ul class="book-info">
                          <li><span>Dosen Pembimbing Utama</span><?= $document->mentor_main ?></li>
                          <li><span>Dosen Penguji Utama</span><?= $document->examiner_main ?></li>
                        </ul>
                      </div>
                      <?php endif; ?>
                      <div class="mt-3 d-flex">
                        <?php if( in_array( $role_id, [3] ) ): ?>
                        <a href="<?= base_url('documents/transaction?id=') . $document->document_id . '&user_id=' . $user_id ?>" class="btn btn-secondary btnhover btnhover2 m-r10">
                          Ajukan Peminjaman <?= $type[$document->type] ?>
                        </a>
                        <?php endif; ?>
                        <?php if( in_array( $role_id, [1,2] ) ): ?>
                        <a href="<?= base_url('documents/form?action=update&id=') . $document->id . '&type=' . $document->type ?>" class="btn btn-info btnhover btnhover2 m-r10">
                          Ubah <?= $type[$document->type] ?>
                        </a>
                        <a href="javascript:void(0);" class="btn btnhover btnhover2" data-bs-toggle="modal" data-bs-target="#delete-document-<?= $document->id ?>">
                          Hapus <?= $type[$document->type] ?>
                        </a>
                        <?php endif; ?>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            <?php } ?>
          </div>
          <!-- <div class="row page mt-0">
            <div class="col-12">
              <nav aria-label="Blog Pagination">
                <ul class="pagination style-1 p-t20">
                  <li class="page-item"><a class="page-link active" href="javascript:void(0);">1</a></li>
                  <li class="page-item"><a class="page-link" href="javascript:void(0);">2</a></li>
                  <li class="page-item"><a class="page-link" href="javascript:void(0);">3</a></li>
                </ul>
              </nav>
            </div>
          </div> -->
        </div>
      </section>

    </div>

    <script>
      const formSearchBook = document.getElementsByClassName( 'form-search-book' );
      const formSearchThesis = document.getElementsByClassName( 'form-search-thesis' );
      
      const thesis = ['specialization_id', 'storage_id'];
      const book = ['category_id'];

      function changeTypeSearchDocuments(type) {
        if( type.value == 'book' ) {
          for (let index = 0; index < formSearchBook.length; index++) {
            const element = formSearchBook[index];
            element.removeAttribute('style');  
            element.setAttribute('name', book[index]);  
            element.setAttribute('id', book[index]);
          }

          for (let index = 0; index < formSearchThesis.length; index++) {
            const element = formSearchThesis[index];
            element.setAttribute('style', 'display: none');
            element.removeAttribute('name');  
            element.removeAttribute('id');  
          }
        }
        if( type.value == 'thesis' ) {
          for (let index = 0; index < formSearchBook.length; index++) {
            const element = formSearchBook[index];
            element.setAttribute('style', 'display: none');
            element.removeAttribute('name');  
            element.removeAttribute('id');  
          }

          for (let index = 0; index < formSearchThesis.length; index++) {
            const element = formSearchThesis[index];
            element.removeAttribute('style');  
            element.setAttribute('name', thesis[index]);  
            element.setAttribute('id', thesis[index]);
          }
        }
      }

      function typeSearchDocuments() {
        for (let index = 0; index < formSearchBook.length; index++) {
          const element = formSearchBook[index];
          element.setAttribute('style', 'display: none');
          element.removeAttribute('name');  
          element.removeAttribute('id');  
        }

        for (let index = 0; index < formSearchThesis.length; index++) {
          const element = formSearchThesis[index];
          element.removeAttribute('style');  
          element.setAttribute('name', thesis[index]);  
          element.setAttribute('id', thesis[index]);
        }
      }
      
      const type = '<?= $type_ ?>';
      if (type == 'thesis') {
        typeSearchDocuments()
      }
    </script>