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
                <li><a href="#">Фонд</a></li>
                <li><a href="#">Миссия и цели</a></li>
            </ul>
        </div>

        <div class="page-title">
            Контакты
        </div>

        <div class="contacts-page">
            <div class="row contacts-row m-t-xl m-b-lg">
                <div class="col-xs-12 col-md-4 contacts-col">
                    <div class="contacts-col-icon">
                        <?php include "images/icon-contacts-address.svg"; ?>
                    </div>
                    <div class="contacts-col-content">
                        <div class="contacts-col-title">
                            Адрес
                        </div>
                        <div class="contacts-col-value">
                            Санкт-Петербург, 6-я Красноармейская ул.,
                            д. 23, офис 8 Фонда профилактики рака
                        </div>
                    </div>
                </div>
                <div class="col-xs-12 col-md-4 contacts-col">
                    <div class="contacts-col-icon">
                        <?php include "images/icon-contacts-phone.svg"; ?>
                    </div>
                    <div class="contacts-col-content">
                        <div class="contacts-col-title">
                            Контактная информация
                        </div>
                        <div class="contacts-col-value">
                            <div class="contacts-col-value-item">
                                <span class="contacts-col-value-item-title">
                                    Тел/факс:
                                </span>
                                <a href="tel:+78123163434">
                                    +7 (812) 316-34-34
                                </a>
                            </div>
                            <div class="contacts-col-value-item">
                                <span class="contacts-col-value-item-title">
                                    email:
                                </span>
                                <a href="mailto:fondmain@gmail.com">
                                    fondmain@gmail.com
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xs-12 col-md-4 contacts-col">
                    <div class="contacts-col-icon">
                        <?php include "images/icon-contacts-partnership.svg"; ?>
                    </div>
                    <div class="contacts-col-content">
                        <div class="contacts-col-title">
                            Предложения о сотрудничестве:
                        </div>
                        <div class="contacts-col-value">
                            <div class="contacts-col-value-item">
                                <span class="contacts-col-value-item-title">
                                    Контактное лицо:
                                </span>
                                Фоминцев Илья Алексеевич
                            </div>
                            <div class="contacts-col-value-item">
                                <span class="contacts-col-value-item-title">
                                    Моб.:
                                </span>
                                <a href="tel:+79214162484">
                                    +7 (921) 416-24-84
                                </a>
                            </div>
                            <div class="contacts-col-value-item">
                                <span class="contacts-col-value-item-title">
                                    email:
                                </span>
                                <a href="mailto:i.fomintsev@gmail.com">
                                    i.fomintsev@gmail.com
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row contacts-map-feedback">
                <div class="col-xs-12 col-md-6">
                    <div class="contacts-map">
                        <iframe src="https://api-maps.yandex.ru/frame/v1/-/C6AzYYMo" width="100%" height="100%" frameborder="0"></iframe>
                    </div>
                </div>
                <div class="col-xs-12 col-md-6">
                    <form action="#" method="post" class="contacts-feedback">
                        <div class="contacts-feedback-title">
                            Обратная связь
                        </div>
                        <div class="row">
                            <div class="col-xs-6">
                                <div class="contacts-feedback-control">
                                    <label class="contacts-feedback-control-label">
                                        Ваше имя <sup>*</sup>
                                    </label>

                                    <input type="text" name="name" class="contacts-feedback-control-input" required placeholder="Например: Иван">
                                </div>
                            </div>
                            <div class="col-xs-6">
                                <div class="contacts-feedback-control">
                                    <label class="contacts-feedback-control-label">
                                        Email <sup>*</sup>
                                    </label>

                                    <input type="email" name="email" class="contacts-feedback-control-input" required placeholder="ivan@example.ru">
                                </div>
                            </div>
                        </div>
                        <div class="contacts-feedback-control">
                            <label class="contacts-feedback-control-label">
                                Тема сообщения <sup>*</sup>
                            </label>

                            <input type="text" name="subject" class="contacts-feedback-control-input" required placeholder="Тема сообщения даст понимание о чем вы напишете">
                        </div>
                        <div class="contacts-feedback-control">
                            <label class="contacts-feedback-control-label">
                                Сообщение
                            </label>

                            <textarea required name="message" class="contacts-feedback-control-textarea" placeholder="Что бы вы хотели донести до нас?"></textarea>
                        </div>

                        <button type="submit" class="button button-round button-orange contacts-feedback-submit-button">
                            Отправить сообщение
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>

</main>

<?php include "blocks/footer.php"; ?>

<script src="../../public/assets/build/scripts.js"></script>
</body>
</html>