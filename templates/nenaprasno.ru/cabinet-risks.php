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
                        <li class="active"><a href="#">Риски и рекомендации</a></li>
                        <li><a href="#">Настройки</a></li> 
                    </ul>
                </nav>
            </aside>
            <div class="main-wrapper-column">
                <div class="cabinet-risks">
                    <div class="cabinet-risks-title">
                        Ваши риски
                    </div>
                    
                    <div class="cabinet-risks-list">
                        <div class="cabinet-risks-list-item cabinet-risks-list-item-low">
                            <div class="cabinet-risks-list-item-label"></div>
                            <div class="cabinet-risks-list-item-name">
                                Рак легких
                            </div>
                            <div class="cabinet-risks-list-item-value c-low-risk">
                                низкий риск
                            </div>
                        </div>
                        <div class="cabinet-risks-list-item cabinet-risks-list-item-medium">
                            <div class="cabinet-risks-list-item-label"></div>
                            <div class="cabinet-risks-list-item-name">
                                Рак толстой и прямой кишки
                            </div>
                            <div class="cabinet-risks-list-item-value c-medium-risk">
                                средний риск
                            </div>
                        </div>
                        <div class="cabinet-risks-list-item cabinet-risks-list-item-high">
                            <div class="cabinet-risks-list-item-label"></div>
                            <div class="cabinet-risks-list-item-name">
                                Рак желудка
                            </div>
                            <div class="cabinet-risks-list-item-value c-high-risk">
                                высокий риск
                            </div>
                        </div>
                        <div class="cabinet-risks-list-item cabinet-risks-list-item-medium">
                            <div class="cabinet-risks-list-item-label"></div>
                            <div class="cabinet-risks-list-item-name">
                                Рак толстой и прямой кишки
                            </div>
                            <div class="cabinet-risks-list-item-value c-medium-risk">
                                средний риск
                            </div>
                        </div>
                        <div class="cabinet-risks-list-item cabinet-risks-list-item-high">
                            <div class="cabinet-risks-list-item-label"></div>
                            <div class="cabinet-risks-list-item-name">
                                Рак желудка
                            </div>
                            <div class="cabinet-risks-list-item-value c-high-risk">
                                высокий риск
                            </div>
                        </div>
                    </div>

                    <div class="cabinet-risks-legend-row">
                        <div class="cabinet-risks-legend-col">
                            <div class="cabinet-risks-legend">
                                <div class="cabinet-risks-legend-title c-low-risk">
                                    Низкий риск
                                </div>

                                Риск ниже, чем в популяции, на данный момент не требуется никаких диагностических мероприятий для раннего выявления или профилактики этого заболевания. Вероятность вреда от возможного вмешательства (в том числе и диагностического) превышает вероятность его пользы.
                            </div>
                        </div>

                        <div class="cabinet-risks-legend-col">
                            <div class="cabinet-risks-legend">
                                <div class="cabinet-risks-legend-title c-medium-risk">
                                    Средний риск
                                </div>

                                Средний риск, Вам требуется медицинское вмешательство для снижения риска смерти от этого вида рака (скрининг или иные виды профилактики рака). Вероятность пользы от медицинского вмешательства превышает вероятность вреда.
                            </div>
                        </div>                            

                        <div class="cabinet-risks-legend-col">
                            <div class="cabinet-risks-legend">
                                <div class="cabinet-risks-legend-title c-high-risk">
                                    Высокий риск
                                </div>

                                Высокий риск. Вам требуется особое медицинское наблюдение или вмешательство для радикального снижения риска смерти от этого вида рака.
                            </div>
                        </div>
                    </div>

                    <div class="cabinet-risks-title m-t-lg">
                        Рекомендации
                    </div>

                    <form method="#" class="cabinet-risks-recommendations m-b-lg">
                        <div class="cabinet-risks-recommendations-heading">
                            <div class="cabinet-risks-recommendations-heading-name">
                                Направление
                            </div>
                            <div class="cabinet-risks-recommendations-heading-date">
                                Дата обследования
                            </div>
                            <div class="cabinet-risks-recommendations-heading-clinics">
                                Клиники
                            </div>
                            <div class="cabinet-risks-recommendations-heading-button">
                                &nbsp;
                            </div>
                        </div>

                        <div class="cabinet-risks-recommendation">
                            <div class="cabinet-risks-recommendation-name">
                                <div class="cabinet-risks-recommendation-title">
                                    Кожа
                                </div>
                                Самоосмотр кожи
                            </div>
                            <div class="cabinet-risks-recommendation-date">
                                Октябрь 2018
                            </div>
                            <div class="cabinet-risks-recommendation-clinics">
                                <a data-tooltip data-html="risk-1-clinics" data-position="bottom" data-trigger="click" data-arrow="true">
                                    <?php include "images/icon-geomarker.svg"; ?>
                                    <span class="link-dotted">
                                        Список клиник
                                    </span>
                                </a>

                                <div id="risk-1-clinics" style="display: none">
                                    <div class="cabinet-risks-recommendation-clinics-list">
                                        <a href="#" target="_blank" class="cabinet-risks-recommendation-clinics-list-item">
                                            <div class="cabinet-risks-recommendation-clinics-name">
                                                МРНЦ им. А.Ф.Цыба
                                            </div>
                                            <div class="cabinet-risks-recommendation-clinics-desc">
                                                Обнинск, ул.Королева, д.4
                                            </div>
                                        </a>

                                        <a href="#" target="_blank" class="cabinet-risks-recommendation-clinics-list-item">
                                            <div class="cabinet-risks-recommendation-clinics-name">
                                                МНИОИ им. П.А. Герцена
                                            </div>
                                            <div class="cabinet-risks-recommendation-clinics-desc">
                                                2-й Боткинский пр., д.3
                                            </div>
                                        </a>

                                        <a href="#" target="_blank" class="cabinet-risks-recommendation-clinics-list-item">
                                            <div class="cabinet-risks-recommendation-clinics-name">
                                                РОНЦ им. Н.Н. Блохина
                                            </div>
                                            <div class="cabinet-risks-recommendation-clinics-desc">
                                                Каширское шоссе, дом 23
                                            </div>
                                        </a>

                                        <a href="#" target="_blank" class="cabinet-risks-recommendation-clinics-list-item">
                                            <div class="cabinet-risks-recommendation-clinics-name">
                                                Московская городская онкологическая больница № 62
                                            </div>
                                            <div class="cabinet-risks-recommendation-clinics-desc">
                                                п/о Степановское, поселок Истра, 27
                                            </div>
                                        </a>

                                        <a href="#" target="_blank" class="cabinet-risks-recommendation-clinics-list-item">
                                            <div class="cabinet-risks-recommendation-clinics-name">
                                                МРНЦ им. А.Ф.Цыба
                                            </div>
                                            <div class="cabinet-risks-recommendation-clinics-desc">
                                                Обнинск, ул.Королева, д.4
                                            </div>
                                        </a>

                                        <a href="#" target="_blank" class="cabinet-risks-recommendation-clinics-list-item">
                                            <div class="cabinet-risks-recommendation-clinics-name">
                                                МНИОИ им. П.А. Герцена
                                            </div>
                                            <div class="cabinet-risks-recommendation-clinics-desc">
                                                2-й Боткинский пр., д.3
                                            </div>
                                        </a>

                                        <a href="#" target="_blank" class="cabinet-risks-recommendation-clinics-list-item">
                                            <div class="cabinet-risks-recommendation-clinics-name">
                                                РОНЦ им. Н.Н. Блохина
                                            </div>
                                            <div class="cabinet-risks-recommendation-clinics-desc">
                                                Каширское шоссе, дом 23
                                            </div>
                                        </a>

                                        <a href="#" target="_blank" class="cabinet-risks-recommendation-clinics-list-item">
                                            <div class="cabinet-risks-recommendation-clinics-name">
                                                Московская городская онкологическая больница № 62
                                            </div>
                                            <div class="cabinet-risks-recommendation-clinics-desc">
                                                п/о Степановское, поселок Истра, 27
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div class="cabinet-risks-recommendation-button">
                                <a href="#" class="button button-round">
                                    Уже проходил
                                </a>
                            </div>
                        </div>

                        <div class="cabinet-risks-recommendation">
                            <div class="cabinet-risks-recommendation-name">
                                <div class="cabinet-risks-recommendation-title">
                                    Кишечник
                                </div>
                                Колоноскопия под общей анестезией, раз в 2 года
                            </div>
                            <div class="cabinet-risks-recommendation-date">
                                Октябрь 2018
                            </div>
                            <div class="cabinet-risks-recommendation-clinics">
                                <a data-tooltip data-html="risk-2-clinics" data-position="bottom" data-trigger="click" data-arrow="true">
                                    <?php include "images/icon-geomarker.svg"; ?>
                                    <span class="link-dotted">
                                        Список клиник
                                    </span>
                                </a>

                                <div id="risk-2-clinics" style="display: none">
                                    <div class="cabinet-risks-recommendation-clinics-list">
                                        <a href="#" target="_blank" class="cabinet-risks-recommendation-clinics-list-item">
                                            <div class="cabinet-risks-recommendation-clinics-name">
                                                МРНЦ им. А.Ф.Цыба
                                            </div>
                                            <div class="cabinet-risks-recommendation-clinics-desc">
                                                Обнинск, ул.Королева, д.4
                                            </div>
                                        </a>

                                        <a href="#" target="_blank" class="cabinet-risks-recommendation-clinics-list-item">
                                            <div class="cabinet-risks-recommendation-clinics-name">
                                                МНИОИ им. П.А. Герцена
                                            </div>
                                            <div class="cabinet-risks-recommendation-clinics-desc">
                                                2-й Боткинский пр., д.3
                                            </div>
                                        </a>

                                        <a href="#" target="_blank" class="cabinet-risks-recommendation-clinics-list-item">
                                            <div class="cabinet-risks-recommendation-clinics-name">
                                                РОНЦ им. Н.Н. Блохина
                                            </div>
                                            <div class="cabinet-risks-recommendation-clinics-desc">
                                                Каширское шоссе, дом 23
                                            </div>
                                        </a>

                                        <a href="#" target="_blank" class="cabinet-risks-recommendation-clinics-list-item">
                                            <div class="cabinet-risks-recommendation-clinics-name">
                                                Московская городская онкологическая больница № 62
                                            </div>
                                            <div class="cabinet-risks-recommendation-clinics-desc">
                                                п/о Степановское, поселок Истра, 27
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div class="cabinet-risks-recommendation-button">
                                <a href="#" class="button button-round">
                                    Уже проходил
                                </a>
                            </div>
                        </div>

                        <div class="cabinet-risks-recommendation">
                            <div class="cabinet-risks-recommendation-name">
                                <div class="cabinet-risks-recommendation-title">
                                    Мозг
                                </div>
                                Колоноскопия под общей анестезией, раз в 2 года
                            </div>
                            <div class="cabinet-risks-recommendation-enter-date">
                                <input type="text" class="form-input form-input-block" data-flatpickr='{"altInput": true, "altFormat": "F Y"}' value="01.12.2017" placeholder="Выберите дату">
                            </div>
                            <div class="cabinet-risks-recommendation-button">
                                <a href="#" class="button button-blue button-round">
                                    Указать дату
                                </a>
                            </div>
                        </div>

                        <div class="cabinet-risks-recommendation">
                            <div class="cabinet-risks-recommendation-name">
                                <div class="cabinet-risks-recommendation-title">
                                    Желудок
                                </div>
                                Колоноскопия под общей анестезией, раз в 2 года. Повторная колоноскопия через 3 года
                            </div>
                            <div class="cabinet-risks-recommendation-date">
                                Октябрь 2018
                            </div>
                            <div class="cabinet-risks-recommendation-clinics">
                                <a data-tooltip data-html="risk-4-clinics" data-position="bottom" data-trigger="click" data-arrow="true">
                                    <?php include "images/icon-geomarker.svg"; ?>
                                    <span class="link-dotted">
                                        Список клиник
                                    </span>
                                </a>

                                <div id="risk-4-clinics" style="display: none">
                                    <div class="cabinet-risks-recommendation-clinics-list">
                                        <a href="#" target="_blank" class="cabinet-risks-recommendation-clinics-list-item">
                                            <div class="cabinet-risks-recommendation-clinics-name">
                                                МРНЦ им. А.Ф.Цыба
                                            </div>
                                            <div class="cabinet-risks-recommendation-clinics-desc">
                                                Обнинск, ул.Королева, д.4
                                            </div>
                                        </a>

                                        <a href="#" target="_blank" class="cabinet-risks-recommendation-clinics-list-item">
                                            <div class="cabinet-risks-recommendation-clinics-name">
                                                МНИОИ им. П.А. Герцена
                                            </div>
                                            <div class="cabinet-risks-recommendation-clinics-desc">
                                                2-й Боткинский пр., д.3
                                            </div>
                                        </a>

                                        <a href="#" target="_blank" class="cabinet-risks-recommendation-clinics-list-item">
                                            <div class="cabinet-risks-recommendation-clinics-name">
                                                РОНЦ им. Н.Н. Блохина
                                            </div>
                                            <div class="cabinet-risks-recommendation-clinics-desc">
                                                Каширское шоссе, дом 23
                                            </div>
                                        </a>

                                        <a href="#" target="_blank" class="cabinet-risks-recommendation-clinics-list-item">
                                            <div class="cabinet-risks-recommendation-clinics-name">
                                                Московская городская онкологическая больница № 62
                                            </div>
                                            <div class="cabinet-risks-recommendation-clinics-desc">
                                                п/о Степановское, поселок Истра, 27
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div class="cabinet-risks-recommendation-button">
                                <a href="#" class="button button-round">
                                    Уже проходил
                                </a>
                            </div>
                        </div>

                        <div class="cabinet-risks-recommendations-subscribe">
                            <div class="form-control-checkbox">
                                <input id="recommendations-subscribe" name="agreement" required="" type="checkbox">
                                <label for="recommendations-subscribe">
                                    Отказаться от напоминаний по e-mail
                                </label>
                            </div>
                        </div>
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