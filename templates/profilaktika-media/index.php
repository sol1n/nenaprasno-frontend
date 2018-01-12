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
<header class="main-header">
    <div class="wrapper">
        <a href="#" class="main-header-toggler js-offcanvas">
            <?php include "../../public/assets/images/profilaktika-media/icon-menu.svg"; ?>
        </a>

        <a href="#" class="main-header-logo">
            <img src="../../public/assets/images/profilaktika-media/logo.svg" alt="Profilaktika Media — Ненапрасно" width="230">
        </a>

        <ul class="main-header-menu">
            <li>
                <a href="#">Кейсы</a>
            </li>
            <li>
                <a href="#">Правила</a>
            </li>
            <li>
                <a href="#">Колонки</a>
            </li>
            <li>
                <a href="#">События</a>
            </li>
            <li>
                <a href="#">Образ жизни</a>
            </li>
            <li>
                <a href="#">Библиотека</a>
            </li>
        </ul>

        <form action="#" class="main-header-search">
            <a href="#" class="main-header-search-toggle">
                <?php include "../../public/assets/images/profilaktika-media/icon-search.svg"; ?>
            </a>
        </form>

        <div class="main-header-userarea">
            <div class="main-header-userarea-links">
                <a href="#">Вход</a>
                <br>
                <a href="#">Регистрация</a>
            </div>
        </div>
    </div>
</header>

<div id="offcanvas" class="main-offcanvas-overlay">
    <nav class="main-offcanvas">
        <ul class="main-offcanvas-menu">
            <li>
                <a href="#">Кейсы</a>
            </li>
            <li>
                <a href="#">Правила</a>
            </li>
            <li>
                <a href="#">Колонки</a>
            </li>
            <li>
                <a href="#">События</a>
            </li>
            <li>
                <a href="#">Образ жизни</a>
            </li>
            <li>
                <a href="#">Библиотека</a>
            </li>
        </ul>

        <div class="main-offcanvas-padding">
            <a href="#">Войти</a> &nbsp;|&nbsp; <a href="#">Зарегистрироваться</a>
        </div>
    </nav>
</div>

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
<footer class="main-footer">
    <div class="wrapper">
        <a href="#" class="main-footer-logo">
            <img src="../../public/assets/images/profilaktika-media/logo.svg" alt="Profilaktika Media — Ненапрасно" width="140">
        </a>

        <ul class="main-footer-menu">
            <li>
                <a href="#">О проекте</a>
            </li>
            <li>
                <a href="#">Контакты</a>
            </li>
            <li>
                <a href="#">Помочь проекту</a>
            </li>
            <li>
                <a href="#">Рекламодателям</a>
            </li>
        </ul>

        <div class="main-footer-socials">
            <a href="#" target="_blank" class="main-footer-socials-item">
                <?php include "../../public/assets/images/profilaktika-media/icon-facebook.svg"; ?>
            </a>
            <a href="#" target="_blank" class="main-footer-socials-item">
                <?php include "../../public/assets/images/profilaktika-media/icon-instagram.svg"; ?>
            </a>
            <a href="#" target="_blank" class="main-footer-socials-item">
                <?php include "../../public/assets/images/profilaktika-media/icon-vk.svg"; ?>
            </a>
        </div>
    </div>
</footer>

<script src="../../public/assets/build/profilaktika-media/scripts.js"></script>
</body>
</html>