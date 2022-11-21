    <div class="page-content bg-white">
      <div class="main-slider style-1 slider-white">
        <div class="main-swiper">
          <div class="swiper-wrapper">
            <div class="swiper-slide bg-light" style="background-image: url(<?= base_url('assets/') ?>images/background/waveElement2.png);">
              <div class="container">
                <div class="banner-content">
                  <div class="row">
                    <div class="col-md-6">
                      <div class="swiper-content">
                        <div class="content-info">
                          <h6 class="sub-title" data-swiper-parallax="-10">Ruang Baca </h6>
                          <h1 class="title mb-0" data-swiper-parallax="-20">Teknik Informatika</h1>
                          <p class="text mb-0" data-swiper-parallax="-40">
                            Temukan referensi yang Anda cari.  
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="banner-media" data-swiper-parallax="-100">
                        <img src="<?= base_url('assets/') ?>images/object.png" alt="media">
                      </div>
                      <img class="pattern" src="<?= base_url('assets/') ?>images/Group.png" data-swiper-parallax="-100" alt="dots">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="container swiper-pagination-wrapper">
            <div class="swiper-pagination-five"></div>
          </div>
        </div>
      </div>

      <section class="content-inner-1 overlay-white-middle">
        <div class="container">
          <div class="row about-style1 align-items-center">
            <div class="col-lg-6 m-b30 wow fadeInUp" data-wow-delay="0.1s">
              <div class="row sp10 about-thumb">
                <div class="col-sm-6 aos-item ">
                  <div class="split-box">
                    <div>
                      <img class="m-b30" src="<?= base_url('assets/') ?>images/about/about1.jpg" alt="/">
                    </div>
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="split-box ">
                    <div>
                      <img class="m-b20 aos-item" src="<?= base_url('assets/') ?>images/about/about2.jpg" alt="/">
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-6 m-b30 wow fadeInUp" data-wow-delay="0.2s">
              <div class="about-content px-lg-4">
                <div class="section-head style-1">
                  <h2 class="title">Perpustakaan Teknik Informatika</h2>
                  <p>
                    
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="swiper client-swiper mt-5">
            <div class="swiper-wrapper">
              <div class="swiper-slide"><img src="<?= base_url('assets/') ?>images/ti.png" alt="Logo"></div>
              <div class="swiper-slide"><img src="<?= base_url('assets/') ?>images/unhalu.png" alt="Logo"></div>
            </div>
          </div>
        </div>
      </section>

      <section class="content-inner-1 bg-grey reccomend">
        <div class="container">
          <div class="section-head text-center">
            <div class="circle style-1"></div>
            <h2 class="title">Dokumen Terbaru</h2>
          </div>
        </div>
        <div class="container">
          <div class="swiper-container books-wrapper-2 swiper-three">
            <div class="swiper-wrapper">
                <?php $type = ['book' => 'Buku', 'thesis' => 'Skripsi']; foreach ($documents as $document) { ?>
                <div class="swiper-slide">
                  <div class="books-card style-2">
                    <div class="dz-media">
                      <img src="<?= base_url('uploads/documents/covers/') . $document->cover ?>" alt="book">
                    </div>
                    <div class="dz-content">
                      <h6 class="sub-title"><?= $type[$document->type] ?></h6>
                      <h2 style="font-size: 28px;" class="title"><?= $document->title ?></h2>
                      <ul class="dz-tags">
                        <li><?= $document->writer ?></li>
                        <?php if( $document->type == 'book' ): ?>
                          <li><a href="<?= base_url('documents?category=') . $document->category_id ?>"><?= $document->category ?></a></li>
                        <?php endif; ?>
                        <?php if( $document->type == 'thesis' ): ?>
                          <li><a href="<?= base_url('documents?specialization=') . $document->specialization_id ?>"><?= $document->specialization ?></a></li>
                        <?php endif; ?>
                      </ul>
                      <!-- <p class="text">
                        
                      </p> -->
                      <div class="bookcard-footer">
                        <a href="<?= base_url('documents?id=') . $document->document_id ?>" class="btn btn-secondary btnhover m-t15 m-r10">Ajukan Peminjaman</a>
                      </div>
                    </div>
                  </div>
                </div>
                <?php } ?>
              </div>
            <div class="pagination-align style-2">
              <div class="swiper-button-prev"><i class="fa-solid fa-angle-left"></i></div>
              <div class="swiper-pagination-three"></div>
              <div class="swiper-button-next"><i class="fa-solid fa-angle-right"></i></div>
            </div>
          </div>
        </div>
      </section>

      <section class="content-inner">
        <div class="container">
          <div class="row sp15">
            <div class="col-lg-3 col-md-6 col-sm-6 col-6 wow fadeInUp" data-wow-delay="0.1s">
              <div class="icon-bx-wraper style-2 m-b30 text-center">
                <div class="icon-bx-lg">
                  <i class="fa-solid fa-user-graduate icon-cell"></i>
                </div>
                <div class="icon-content">
                  <h2 class="dz-title counter m-b0"><?= $counter[0] ?></h2>
                  <p class="font-20">Mahasiswa</p>
                </div>
              </div>
            </div>
            <div class=" col-lg-3 col-md-6 col-sm-6 col-6 wow fadeInUp" data-wow-delay="0.2s">
              <div class="icon-bx-wraper style-2 m-b30 text-center">
                <div class="icon-bx-lg">
                  <i class="fa-solid fa-user-tie icon-cell"></i>
                </div>
                <div class="icon-content">
                  <h2 class="dz-title counter m-b0"><?= $counter[1] ?></h2>
                  <p class="font-20">Staf/Dosen</p>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-6 col-6 wow fadeInUp" data-wow-delay="0.3s">
              <div class="icon-bx-wraper style-2 m-b30 text-center">
                <div class="icon-bx-lg">
                  <i class="fa-solid fa-book icon-cell"></i>
                </div>
                <div class="icon-content">
                  <h2 class="dz-title counter m-b0"><?= $counter[2] ?></h2>
                  <p class="font-20">Buku</p>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-6 col-6 wow fadeInUp" data-wow-delay="0.4s">
              <div class="icon-bx-wraper style-2 m-b30 text-center">
                <div class="icon-bx-lg">
                  <i class="fa-solid fa-journal-whills icon-cell"></i>
                </div>
                <div class="icon-content">
                  <h2 class="dz-title counter m-b0"><?= $counter[3] ?></h2>
                  <p class="font-20">Skripsi</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>