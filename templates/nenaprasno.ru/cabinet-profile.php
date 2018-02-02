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
                <li><a href="#">Личный кабинет</a></li>
            </ul>
        </div>

        <div class="page-title">
            Риски и рекомендации
        </div>

        <div class="main-wrapper">
            <aside class="main-sidebar main-sidebar-left">
                <nav class="main-sidebar-menu">
                    <ul>
                        <li><a href="#">Риски и рекомендации</a></li>
                        <li class="active"><a href="#">Настройки</a></li>
                    </ul>
                </nav>
            </aside>
            <div class="main-wrapper-column">
                <form action="#" method="POST" class="cabinet-profile">
                    <div class="cabinet-profile-card">
                        <div class="cabinet-profile-title">
                            Ваши риски
                        </div>

                        <div class="cabinet-profile-subtitle">
                            1. Личные данные
                        </div>

                        <div class="cabinet-profile-control">
                            <label class="cabinet-profile-label">ФИО</label>
                            <input type="text" class="form-input" placeholder="Введите имя" required>
                        </div>

                        <div class="row">
                            <div class="col-xs-12 col-md-6">
                                <div class="cabinet-profile-control">
                                    <label class="cabinet-profile-label">Дата рождения</label>
                                    <input type="text" class="form-input" data-flatpickr placeholder="дд.мм.гггг">
                                </div>
                            </div>
                            <div class="col-xs-12 col-md-6">
                                <div class="cabinet-profile-control">
                                    <label class="cabinet-profile-label">Пол</label>

                                    <div class="form-control-radio-tabs" style="width: 100%;">
                                        <div class="form-control-radio-tab">
                                            <input id="cabinet-profile-sex-male" type="radio" name="user-select" value="0" checked autocomplete="off">
                                            <label for="cabinet-profile-sex-male">Мужчина</label>
                                        </div>

                                        <div class="form-control-radio-tab">
                                            <input id="cabinet-profile-sex-female" type="radio" name="user-select" value="1" checked autocomplete="off">
                                            <label for="cabinet-profile-sex-female">Женщина</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div class="cabinet-profile-subtitle">
                            2. Контактные данные
                        </div>

                        <div class="row">
                            <div class="col-xs-12 col-md-6">
                                <div class="cabinet-profile-control">
                                    <label class="cabinet-profile-label">E-mail</label>
                                    <input type="email" class="form-input" placeholder="Введите e-mail">
                                </div>
                            </div>
                            <div class="col-xs-12 col-md-6">
                                <div class="cabinet-profile-control">
                                    <label class="cabinet-profile-label">Мобильный телефон</label>
                                    <input
                                            type="tel"
                                            class="form-input"
                                            placeholder="Введите телефон"
                                            data-masked-input="+7 (000) 000-00-00"
                                            data-masked-input-placeholder="+7 (___) ___-__-__"
                                            data-masked-input-clearifnotmatch
                                    >
                                </div>
                            </div>
                        </div>

                        <div class="cabinet-profile-subtitle">
                            3. Местонахождение
                        </div>

                        <div class="row">
                            <div class="col-xs-12 col-md-6">
                                <div class="cabinet-profile-control">
                                    <label class="cabinet-profile-label">Город</label>
                                    <input type="text" class="form-input" placeholder="Введите город">
                                </div>
                            </div>
                            <div class="col-xs-12 col-md-6">
                                <div class="cabinet-profile-control">
                                    <label class="cabinet-profile-label">Район</label>
                                    <input type="text" class="form-input" placeholder="Введите район">
                                </div>

                                <div class="cabinet-profile-submit">
                                    <div class="row">
                                        <div class="col-xs-6">
                                            <a href="#" class="button button-white button-round button-block">
                                                Отмена
                                            </a>
                                        </div>
                                        <div class="col-xs-6">
                                            <button type="submit" class="button button-blue button-round button-block">
                                                Сохранить
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="cabinet-profile-card">
                        <div class="cabinet-profile-title">
                            Безопасность
                        </div>

                        <div class="cabinet-profile-control">
                            <label class="cabinet-profile-label">Текущий пароль</label>
                            <input type="password" class="form-input" name="oldpassword" placeholder="Введите пароль">
                        </div>

                        <div class="cabinet-profile-control">
                            <label class="cabinet-profile-label">Новый пароль</label>
                            <input type="password" class="form-input" name="newpassword" placeholder="Новый пароль">
                        </div>

                        <div class="cabinet-profile-control">
                            <label class="cabinet-profile-label">Повторите новый пароль</label>
                            <input type="password" class="form-input" name="repeatpassword" placeholder="Повторите пароль">
                        </div>

                        <div class="cabinet-profile-submit">
                            <button type="submit" class="button button-blue button-round">
                                Сохранить
                            </button>
                        </div>
                    </div>

                    <div class="cabinet-profile-card">
                        <div class="cabinet-profile-title">
                            Настройка уведомлений
                        </div>

                        <div class="cabinet-profile-control">
                            <div class="form-control-checkbox">
                                <input id="cabinet-profile-subscribe" name="subscribe" type="checkbox">
                                <label for="cabinet-profile-subscribe">
                                    Хочу получать новости «Фонда профилактики рака» (не чаще 1 р/нед)
                                </label>
                            </div>
                        </div>

                        <div class="cabinet-profile-control">
                            <div class="form-control-checkbox">
                                <input id="cabinet-profile-notifications" name="notifications" type="checkbox">
                                <label for="cabinet-profile-notifications">
                                    Получать уведомления о прохождении обследования
                                </label>
                            </div>
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