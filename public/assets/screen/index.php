<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <title>Nenaprasno Vue forms</title>
    <link rel="stylesheet" href="css/nenaprasno.css">
    <link rel="stylesheet" href="css/nenaprasno-form.css">
    <link rel="stylesheet" href="css/nenaprasno-form-1.css">
</head>
<body>
<div id="app" data-form-id="1">
    <header class="main-header">
        <div class="wrapper">
            <div class="main-header-logo">
                <a href="#">
                    <img src="images/nenaprasno-logo.png" alt="Фонд профилактики рака. Живу не напрасно.">
                </a>
            </div>
            <div class="main-header-right">
                <div class="main-header-contacts">
                    <div class="main-header-contacts-title">
                        Связаться с нами
                    </div>
                    <a href="#" class="main-header-contacts-phone">
                        +7 812 316-34-34
                    </a>
                </div>
                <div class="main-header-buttons">
                    <div href="#" class="main-header-button-login">
                        <form-userarea></form-userarea>
                    </div>

                    <div class="social-buttons">
                        <a href="#" target="_blank" title="Вконтакте">
                            <?php include "images/icon-social-vk.svg"; ?>
                        </a>
                        <a href="#" target="_blank" title="Facebook">
                            <?php include "images/icon-social-facebook.svg"; ?>
                        </a>
                        <a href="#" target="_blank" title="Twitter">
                            <?php include "images/icon-social-twitter.svg"; ?>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <nav class="main-header-nav">
            <div class="wrapper">
                <ul class="main-header-nav-list">
                    <li><a href="#">Фонд</a></li>
                    <li><a href="#">Проекты</a></li>
                    <li><a href="#">Как помочь?</a></li>
                    <li><a href="#">Публикации</a></li>
                    <li><a href="#">Партнеры</a></li>
                    <li><a href="#">Контакты</a></li>
                </ul>
                <div class="main-header-nav-right">
                    <a href="#" class="button button-orange">Помочь прямо сейчас</a>
                </div>
            </div>
        </nav>
    </header>
    <main class="main-content">
        <div class="wrapper">
            <form-app :form="formData"></form-app>
        </div>
    </main>
    <footer class="main-footer">
        <div class="wrapper">
            <div class="main-footer-cols">
                <div class="main-footer-col main-footer-about">
                    <img src="images/screen.png" alt="Screen">
                    <p>
                        Система
                        профилактики
                        рака
                    </p>
                </div>

                <div class="main-footer-col main-footer-menu">
                    <ul>
                        <li>
                            <a href="#">О системе SCREEN</a>
                        </li>
                        <li>
                            <a href="#">Экспертный совет</a>
                        </li>
                        <li>
                            <a href="#">FAQ</a>
                        </li>
                        <li>
                            <a href="#">Политика конфиденциальности</a>
                        </li>
                    </ul>
                </div>

                <div class="main-footer-col main-footer-counter">
                    <div class="main-footer-counter-value">146 083</div>
                    <div class="main-footer-counter-title">людей протестировано</div>
                </div>

                <div class="main-footer-col main-footer-buttons">
                    <a href="#" class="button button-blue-hollow button-round">Задать вопрос</a><br>
                    <a href="#" class="button button-gray-hollow button-round">Читать ответы</a>
                </div>
            </div>
        </div>
        <div class="main-footer-copyright">
            <div class="wrapper">
                &copy; Фонд профилактики рака, 2017
            </div>
        </div>
    </footer>
</div>
<script src="build/app.js"></script>
<script src="js/scripts.js"></script>
</body>
</html>