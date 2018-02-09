<!doctype html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=500">
    <title>Profilactika Media — Ненапрасно</title>
    <link rel="icon" type="image/png" href="favicon.ico">
    <link rel="stylesheet" href="../../public/assets/build/profilaktika-media/style.min.css">
</head>
<body>

<?php include "blocks/header.php"; ?>
<?php include "blocks/offcanvas.php"; ?>

<main class="main-content m-t-lg m-b-lg">
    <div class="wrapper">
        <section class="articles-block">
            <article class="articles-block-item articles-block-item-inverse articles-block-item-featured">
                <a href="#" class="articles-block-item-link">
                    <div class="articles-block-item-bg">
                        <img src="../../public/assets/images/profilaktika-media/tmp/particles-wallpaper-1920x1080.jpg" alt="">
                    </div>
                    <div class="articles-block-item-overlay">
                        <div class="articles-block-item-title">
                            Profilaktika.Media &mdash; это просветительский портал
                        </div>
                        <div class="articles-block-item-subtitle">
                            Подзаголовок материала
                        </div>
                    </div>
                </a>
            </article>

            <div class="row">
            <?php for ($i=0; $i<=3; $i++) : ?>
                <div class="col-xs-6 col-md-4">
                    <article class="articles-block-item">
                        <a href="#" class="articles-block-item-link">
                            <div class="articles-block-item-bg">
                                <img src="../../public/assets/images/profilaktika-media/tmp/soft_flower-wallpaper-1920x1080.jpg" alt="">
                            </div>
                            <div class="articles-block-item-overlay">
                                <div class="articles-block-item-title">
                                    Акция по раннему выявлению рака
                                </div>
                                <div class="articles-block-item-subtitle">
                                    Подзаголовок материала
                                </div>
                            </div>
                        </a>
                    </article>
                </div>

                <div class="col-xs-6 col-md-4">
                    <article class="articles-block-item articles-block-item-inverse">
                        <a href="#" class="articles-block-item-link">
                            <div class="articles-block-item-bg">
                                <img src="../../public/assets/images/profilaktika-media/tmp/particles-wallpaper-1920x1080.jpg" alt="">
                            </div>
                            <div class="articles-block-item-overlay">
                                <div class="articles-block-item-title">
                                    Screen
                                </div>
                                <div class="articles-block-item-subtitle">
                                    Подзаголовок материала
                                </div>
                            </div>
                        </a>
                    </article>
                </div>

                <div class="col-xs-6 col-md-4">
                    <article class="articles-block-item">
                        <a href="#" class="articles-block-item-link">
                            <div class="articles-block-item-bg">
                                <img src="../../public/assets/images/profilaktika-media/tmp/soft_flower-wallpaper-1920x1080.jpg" alt="">
                            </div>
                            <div class="articles-block-item-overlay">
                                <div class="articles-block-item-title">
                                    Что такое Profilaktika.Media?
                                </div>
                                <div class="articles-block-item-subtitle">
                                    Подзаголовок материала
                                </div>
                            </div>
                        </a>
                    </article>
                </div>
            <?php endfor; ?>
            </div>

            <div class="articles-block-loadmore">
                <a href="#">Ещё</a>
            </div>
        </section>

        <a href="#" class="directory-link m-t-lg">Справочник видов рака</a>
    </div>
</main>

<?php include "blocks/footer.php"; ?>

<script src="../../public/assets/build/profilaktika-media/scripts.js"></script>
</body>
</html>