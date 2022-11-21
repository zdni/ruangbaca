    <div class="page-content bg-white">
      <div class="content-block">
        <section class="content-inner bg-white">
          <div class="container">
            <div class="row">
              <div class="col-12 m-b30">
                <div class="shop-bx shop-profile">
                  <div class="shop-bx-title clearfix">
                    <h5 class="">Daftar Peminjaman</h5>
                  </div>
                  <div class="row">
                    <div class="col-12">
                      <table class="table table-hover table-striped table-responsive">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Pengguna</th>
                            <th scope="col">Dokumen</th>
                            <th scope="col">Tanggal Mulai Peminjaman</th>
                            <th scope="col">Tanggal Akhir Peminjaman</th>
                            <th scope="col">Status</th>
                            <th scope="col">Aksi</th>
                          </tr>
                        </thead>
                        <tbody>
                          <?php $status = ['Pengajuan', 'Peminjaman Disetujui', 'Dikembalikan', 'Terlambat', 'Terlambat Dikembalikan', 'Sanksi Telah Dilunasi', 'Dibatalkan'] ?>
                          <?php $number = 1; foreach ($transactions as $transaction) { ?>
                            <tr>
                              <th scope="row"><?= $number ?></th>
                              <td><?= $transaction->user_name ?></td>
                              <td><?= $transaction->document_title ?></td>
                              <td><?= date_format( date_create( $transaction->start_date ), 'd F Y' ) ?></td>
                              <td><?= date_format( date_create( $transaction->end_date ), 'd F Y' ) ?></td>
                              <td><?= $status[ $transaction->status ] ?></td>
                              <td>
                                <?php if( $transaction->status == 0 ): ?>
                                <button type="button" class="btn btn-sm btn-secondary" data-bs-toggle="modal" data-bs-target="#accept-transaction-<?= $transaction->id ?>">
                                  Setujui Peminjaman
                                </button>
                                <?php endif; ?>
                                <?php if( in_array( $transaction->status, [1, 3] ) ): ?>
                                <button type="button" class="btn btn-sm btn-secondary" data-bs-toggle="modal" data-bs-target="#accept-return-<?= $transaction->id ?>">
                                  Terima Pengembalian
                                </button>
                                <?php endif; ?>
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