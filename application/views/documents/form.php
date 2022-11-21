    <?php $type = ['book' => 'Buku', 'thesis' => 'Skripsi']; ?>  
    <div class="page-content bg-white">
      <div class="content-block">
        <section class="content-inner bg-white">
          <div class="container">
            <div class="row">
              <div class="col-12 m-b30">
                <div class="shop-bx shop-profile">
                  <div class="shop-bx-title clearfix">
                    <h5 class="">Informasi Dokumen</h5>
                  </div>
                  <form action="<?= base_url($url) ?>" method="post" enctype="multipart/form-data">
                    <input type="hidden" class="form-control" name="document_id" id="document_id" value="<?php if( $action == 'update' ) echo $document->document_id ?>">
                    <div class="row">
                      <div class="col-md-4 form-group mb-2">
                        <label for="">Tipe Dokumen</label>
                        <?php if( $action == 'update' ): ?>
                          <input name="type" id="type" type="text" class="form-control" value="<?= $type[$document->type] ?>" disabled>
                          <?php else: ?>
                            <select name="type" id="type" class="form-control" onchange="onchangeSelectTypeDocument(this)" <?php if($action == 'update') echo 'disabled' ?>>
                              <option value="book">Buku</option>
                              <option value="thesis">Skripsi</option>
                            </select>
                        <?php endif; ?>
                      </div>
                      <div class="col-md-8 form-group mb-2">
                        <label for="">Judul</label>
                        <input type="text" class="form-control" name="title" id="title" required value="<?php if( $action == 'update' ) echo $document->title ?>">
                      </div>
                      <div class="col-md-4 form-group mb-2">
                        <label for="">Kode Dokumem</label>
                        <input type="text" class="form-control" name="code" id="code" required value="<?php if( $action == 'update' ) echo $document->code ?>">
                      </div>
                      <div class="col-md-4 form-group mb-2">
                        <label for="">Penulis</label>
                        <input type="text" class="form-control" name="writer" id="writer" required value="<?php if( $action == 'update' ) echo $document->writer ?>">
                      </div>
                      <div class="col-md-4 form-group mb-2">
                        <label for="">Cover</label>
                        <input type="file" class="form-control" name="cover" id="cover">
                      </div>
                    </div>
                    <?php if( $action == 'update' ): ?>
                    <div class="col-md-2 col-6 mb-2">
                      <label for="">Cover</label><br>
                      <img src="<?= base_url('uploads/documents/covers/') . $document->cover ?>" alt="Cover">
                    </div>
                    <?php endif; ?>
                    
                    <div class="shop-bx-title mt-5 clearfix"></div>

                    <input type="hidden" class="form-control" name="id" id="id" value="<?php if( $action == 'update' ) echo $document->id ?>">
                    
                    <div class="row" id="form-book">
                      <div class="col-md-4 form-group mb-2">
                        <label for="">Penerbit</label>
                        <input type="text" class="form-control" name="publisher" id="publisher" required value="<?php if( $action == 'update' ) if( $document->type == 'book' ) echo $document->publisher ?>">
                      </div>
                      <div class="col-md-4 form-group mb-2">
                        <label for="">Kategori Buku</label>
                        <select name="category_id" id="category_id" class="form-control">
                          <?php foreach ($categories as $category) { ?>
                            <option <?php if( $action == 'update' ) if( $document->type == 'book' ) if( $document->category_id == $category->id ) echo 'selected' ?> value="<?= $category->id ?>"><?= $category->name ?></option>
                          <?php } ?>
                        </select>
                      </div>
                      <div class="col-md-2 form-group mb-2">
                        <label for="">Tahun Terbit</label>
                        <input type="number" class="form-control" name="publication_year" id="publication_year" required value="<?php if( $action == 'update' ) if( $document->type == 'book' ) echo $document->publication_year ?>">
                      </div>
                      <div class="col-md-2 form-group mb-2">
                        <label for="">Stok</label>
                        <input type="number" class="form-control" name="stock" id="stock" required value="<?php if( $action == 'update' ) if( $document->type == 'book' ) echo $document->stock ?>">
                      </div>
                    </div>
                    
                    <div class="row" id="form-thesis" style="display: none;">
                      <div class="col-md-2 form-group mb-2">
                        <label for="">NIM</label>
                        <input type="text" class="form-control" name="student_id_number" id="student_id_number" value="<?php if( $action == 'update' ) if( $document->type == 'thesis' ) echo $document->student_id_number ?>">
                      </div>
                      <div class="col-md-2 form-group mb-2">
                        <label for="">Tahun Lulus</label>
                        <input type="number" class="form-control" name="graduation_year" id="graduation_year" value="<?php if( $action == 'update' ) if( $document->type == 'thesis' ) echo $document->graduation_year ?>">
                      </div>
                      <div class="col-md-4 form-group mb-2">
                        <label for="">Peminatan</label>
                        <select name="specialization_id" id="specialization_id" class="form-control">
                          <?php foreach ($specializations as $specialization) { ?>
                            <option <?php if( $action == 'update' ) if( $document->type == 'thesis' ) if( $document->specialization_id == $specialization->id ) echo 'selected' ?> value="<?= $specialization->id ?>"><?= $specialization->name ?></option>
                          <?php } ?>
                        </select>
                      </div>
                      <div class="col-md-4 form-group mb-2">
                        <label for="">Lokasi</label>
                        <select name="storage_id" id="storage_id" class="form-control">
                          <?php foreach ($storages as $storage) { ?>
                            <option <?php if( $action == 'update' ) if( $document->type == 'thesis' ) if( $document->storage_id == $storage->id ) echo 'selected' ?> value="<?= $storage->id ?>"><?= $storage->name ?></option>
                          <?php } ?>
                        </select>
                      </div>
                      <div class="col-md-4 form-group mb-2">
                        <label for="">Dosen Pembimbing Utama</label>
                        <input type="text" class="form-control" name="mentor_main" id="mentor_main" value="<?php if( $action == 'update' ) if( $document->type == 'thesis' ) echo $document->title ?>">
                      </div>
                      <div class="col-md-4 form-group mb-2">
                        <label for="">Dosen Pembimbing Kedua</label>
                        <input type="text" class="form-control" name="mentor_secondary" id="mentor_secondary" value="<?php if( $action == 'update' ) if( $document->type == 'thesis' ) echo $document->mentor_secondary ?>">
                      </div>
                      <div class="col-md-4 form-group mb-2">
                        <label for="">Dosen Penguji Utama</label>
                        <input type="text" class="form-control" name="examiner_main" id="examiner_main" value="<?php if( $action == 'update' ) if( $document->type == 'thesis' ) echo $document->examiner_main ?>">
                      </div>
                      <div class="col-md-4 form-group mb-2">
                        <label for="">Dosen Penguji Kedua</label>
                        <input type="text" class="form-control" name="examiner_secondary" id="examiner_secondary" value="<?php if( $action == 'update' ) if( $document->type == 'thesis' ) echo $document->examiner_secondary ?>">
                      </div>
                      <div class="col-md-4 form-group mb-2">
                        <label for="">Dosen Penguji Ketiga</label>
                        <input type="text" class="form-control" name="examiner_tersier" id="examiner_tersier" value="<?php if( $action == 'update' ) if( $document->type == 'thesis' ) echo $document->examiner_tersier ?>">
                      </div>
                      <div class="col-md-4 form-group mb-2">
                        <label for="">File</label>
                        <input type="file" class="form-control" name="file" id="file" value="<?php if( $action == 'update' ) if( $document->type == 'thesis' ) echo $document->title ?>">
                        <?php if( $action == 'update' ): ?>
                          <?php if( $document->file ): ?>
                          <a href="<?= base_url('uploads/documents/files/') . $document->file ?>" class="btn btn-sm btn-light mt-2">Lihat File</a>
                          <?php endif; ?>
                        <?php endif; ?>
                      </div>
                    </div>
                    <button class="btn btn-primary" type="submit">
                      Simpan
                    </button>
                    <a href="<?= base_url('documents') ?>" class="btn btn-default">
                      Kembali
                    </a>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>

    <script>
      const formBook = document.getElementById('form-book');
      const formThesis = document.getElementById('form-thesis');

      function onchangeSelectTypeDocument(type) {
        if( type.value == 'book' ) {
          formBook.removeAttribute('style');
          formThesis.setAttribute('style', 'display: none');

          for (let index = 1; index < formBook.children.length; index++) {
            const element = formBook.children[index];
            if( element.children[1].type != 'file' ) {
              element.children[1].setAttribute('required', 'true');
            }
          }
          
          for (let index = 1; index < formThesis.children.length; index++) {
            const element = formThesis.children[index];
            if( element.children[1].type != 'file' ) {
              element.children[1].removeAttribute('required');
            }
          }
        }
        if( type.value == 'thesis' ) {
          formThesis.removeAttribute('style');
          formBook.setAttribute('style', 'display: none');

          for (let index = 1; index < formThesis.children.length; index++) {
            const element = formThesis.children[index];
            if( element.children[1].type != 'file' ) {
              element.children[1].setAttribute('required', 'true');
            }
          }

          for (let index = 1; index < formBook.children.length; index++) {
            const element = formBook.children[index];
            if( element.children[1].type != 'file' ) {
              element.children[1].removeAttribute('required');
            }
          }
        }
      }

    </script>

    <?php if( $action == 'update' ): ?>
      <script>
        function showThesis() {
          const documentType = '<?= $document->type ?>';
          if( documentType == 'thesis' ) {
            formThesis.removeAttribute('style');
            formBook.setAttribute('style', 'display: none');
  
            for (let index = 0; index < formThesis.children.length; index++) {
              const element = formThesis.children[index];
              if( element.children[1].type != 'file' ) {
                element.children[1].setAttribute('required', 'true');
              }
            }
  
            for (let index = 0; index < formBook.children.length; index++) {
              const element = formBook.children[index];
              if( element.children[1].type != 'file' ) {
                element.children[1].removeAttribute('required');
              }
            }
          }
        }
        showThesis();
      </script>
    <?php endif; ?>