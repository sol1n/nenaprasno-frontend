<!doctype html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=500">
    <title>Фонд профилактики рака</title>
    <link rel="icon" type="image/png" href="favicon.ico">
    <link rel="stylesheet" href="../../public/assets/build/style.min.css">
</head>
<body>

<?php include "blocks/header.php"; ?>

<main class="main-content">
    <div class="wrapper m-b-lg">
        <div class="breadcrumbs">
            <ul>
                <li><a href="#">Главная</a></li>
                <li><a href="#">Восстановление пароля</a></li>
            </ul>
        </div>

        <div class="main-wrapper">
            <div class="main-wrapper-column">

                <a href="#modal-login" data-fancybox data-src="#modal-login">
                    Модальное окно «Войти»
                </a>
                <br>
                <a href="#modal-register" data-fancybox data-src="#modal-register">
                    Модальное окно «Регистрация»
                </a>
                <br>
                <a href="#modal-recover" data-fancybox data-src="#modal-recover">
                    Модальное окно «Восстановление пароля»
                </a>
                <br>
                <a href="#modal-recover-complete" data-fancybox data-src="#modal-recover-complete">
                    Модальное окно «Восстановление пароля успешно»
                </a>
                <br>
                <a href="#modal-thankyou" data-fancybox data-src="#modal-thankyou">
                    Модальное окно «Спасибо»
                </a>

                <div style="display: none;" class="modal-window modal-window-login" id="modal-login">
                    <div class="modal-window-padding">
                        <div class="modal-window-title">
                            Войти
                        </div>

                        <div class="modal-window-subtitle">
                            Введите e-mail и пароль указанные при регистрации
                        </div>

                        <form action="#" method="POST" class="modal-window-form" autocomplete="off">
                            <div class="modal-window-control">
                                <label class="modal-window-label">
                                    E-mail
                                </label>
                                <input type="email" name="login" required class="modal-window-input" placeholder="Введите e-mail адрес">
                            </div>

                            <div class="modal-window-control">
                                <label class="modal-window-label">
                                    Пароль
                                </label>
                                <input type="password" name="password" required class="modal-window-input" placeholder="Введите пароль">
                            </div>

                            <div class="modal-window-control">
                                <button type="submit" class="modal-window-submit">
                                    Войти
                                </button>
                            </div>
                        </form>

                        <div class="modal-window-sublinks">
                            <a href="#modal-recover" data-fancybox data-src="#modal-recover">
                                Забыли пароль?
                            </a>
                            <a href="#modal-register" data-fancybox data-src="#modal-register">
                                Регистрация
                            </a>
                        </div>
                    </div>

                    <div class="modal-window-footer">
                        <div class="modal-window-padding">
                            <div class="modal-window-socials">
                                <div class="modal-window-socials-title">
                                    Войти с помощью вашего аккаунта в соцсети
                                </div>
                                <div class="modal-window-socials-row">
                                    <div class="modal-window-socials-cell">
                                        <a href="#" class="modal-window-socials-item modal-window-socials-item-vk">
                                            Вконтакте
                                        </a>
                                    </div>
                                    <div class="modal-window-socials-cell">
                                        <a href="#" class="modal-window-socials-item modal-window-socials-item-fb">
                                            Facebook
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div style="display: none;" class="modal-window modal-window-login" id="modal-register">
                    <div class="modal-window-padding">
                        <div class="modal-window-title">
                            Регистрация
                        </div>

                        <div class="modal-window-subtitle">
                            Спасибо, что присоединяйтесь к нам
                        </div>

                        <form action="#" method="POST" class="modal-window-form" autocomplete="off">
                            <div class="modal-window-control">
                                <label class="modal-window-label">
                                    E-mail
                                </label>
                                <input type="email" name="login" required class="modal-window-input" placeholder="Введите e-mail адрес">
                            </div>

                            <div class="modal-window-control">
                                <label class="modal-window-label">
                                    Город
                                </label>
                                <input type="text" name="city" required class="modal-window-input" placeholder="Введите название города">
                            </div>

                            <div class="modal-window-control">
                                <label class="modal-window-label">
                                    Пароль
                                </label>
                                <input type="password" name="password" required class="modal-window-input" placeholder="Придумайте пароль">
                            </div>

                            <div class="modal-window-control">
                                <div class="form-control-checkbox">
                                    <input id="register-modal-subscribe" name="subscribe" type="checkbox">
                                    <label for="register-modal-subscribe">
                                        <small>
                                            Хочу получать новости «Фонда профилактики рака»
                                            (не чаще 1 р/нед)
                                        </small>
                                    </label>
                                </div>
                            </div>
                            <div class="modal-window-control">
                                <div class="form-control-checkbox">
                                    <input id="register-modal-agreement" name="agreement" required type="checkbox">
                                    <label for="register-modal-agreement">
                                        <small>
                                            Я принимаю условия <a href="#" target="_blank">пользовательского соглашения</a>
                                            и даю согласие на обработку моих персональных данных
                                        </small>
                                    </label>
                                </div>
                            </div>

                            <div class="modal-window-control">
                                <button type="submit" class="button button-blue button-round button-block">
                                    Зарегистрироваться
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div style="display: none;" class="modal-window modal-window-thankyou" id="modal-thankyou">
                    <div class="modal-window-padding">
                        <div class="modal-window-thankyou-icon">
                            <img src="images/icon-registration-success.svg" alt="">
                        </div>
                        <div class="modal-window-thankyou-title">
                            Спасибо
                        </div>
                        <div class="modal-window-thankyou-desc">
                            Присоединяйтесь к проектам Фонда профилактики рака - нам нужна ваша поддержка!
                        </div>
                        <button class="button button-blue button-round button-block">В личный кабинет</button>
                    </div>
                </div>

                <div style="display: none;" class="modal-window modal-window-recover" id="modal-recover">
                    <div class="modal-window-padding">
                        <div class="modal-window-title">
                            Восстановление пароля
                        </div>

                        <div class="modal-window-subtitle">
                            Введите ваш e-mail адрес ниже и мы поможем вам
                        </div>

                        <form action="#" method="POST" class="modal-window-form" autocomplete="off">
                            <div class="modal-window-control">
                                <label class="modal-window-label">
                                    E-mail
                                </label>
                                <input type="email" name="login" required class="modal-window-input" placeholder="Введите e-mail адрес">
                            </div>

                            <div class="modal-window-control">
                                <button type="submit" class="button button-blue button-round button-block">
                                    Восстановить пароль
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div style="display: none;" class="modal-window modal-window-recover" id="modal-recover-complete">
                    <div class="modal-window-padding">
                        <div class="modal-window-title">
                            Восстановление пароля
                        </div>

                        <div class="modal-window-recover-complete-icon">
                            <img src="images/icon-password-recover-success.svg" alt="">
                        </div>

                        <div class="modal-window-recover-complete-desc">
                            Ссылка на восстановление пароля отправлена на e-mail asd@asd.neverland
                        </div>
                    </div>
                </div>

                <form action="#" method="POST" class="cabinet-profile">
                    <div class="cabinet-profile-card m-t-lg m-b-lg" style="max-width: 570px; margin-left: auto; margin-right: auto;">
                        <div class="cabinet-profile-title">
                            Восстановление пароля
                        </div>

                        <div class="cabinet-profile-control">
                            <label class="cabinet-profile-label">Новый пароль</label>
                            <input type="password" class="form-input" name="oldpassword" placeholder="Введите пароль" required>
                        </div>

                        <div class="cabinet-profile-control">
                            <label class="cabinet-profile-label">Повторите новый пароль</label>
                            <input type="password" class="form-input" name="newpassword" placeholder="Новый пароль" required>
                        </div>

                        <div class="cabinet-profile-submit">
                            <button type="submit" class="button button-blue button-round">
                                Сохранить
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>

</main>

<?php include "blocks/footer.php"; ?>

<script src="../../public/assets/build/scripts.js"></script>
</body>
</html>