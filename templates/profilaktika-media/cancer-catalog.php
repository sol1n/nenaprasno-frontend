<!doctype html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=500">
    <title>Profilactika Media — Ненапрасно</title>
    <link rel="icon" type="image/png" href="favicon.png">
    <link rel="stylesheet" href="../../public/assets/build/profilaktika-media/style.min.css">
</head>
<body class="header-fixed">

<?php include "blocks/header.php"; ?>
<?php include "blocks/offcanvas.php"; ?>

<main class="main-content m-t-lg m-b-lg">
    <div class="wrapper">
        <div class="cancer-catalog-block">
            <h1 class="cancer-catalog-block-title">
                Справочник видов рака
            </h1>

            <div class="cancer-catalog-block-desc">
                Вступительный текст
            </div>

            <form action="#" class="cancer-catalog-block-search m-t-md">
                <input class="cancer-catalog-block-search-input" placeholder="Поиск" name="search">
                <button class="cancer-catalog-block-search-submit" type="submit">
                    <img src="../../public/assets/images/profilaktika-media/icon-search.svg" alt="Найти">
                </button>
            </form>


            <?php
                $russianAlphabet = array();
                foreach (range(chr(0xC0), chr(0xDF)) as $a) {
                    $russianAlphabet[] = iconv('CP1251', 'UTF-8', $a);
                }
            ?>

            <div class="cancer-catalog-block-sections m-t-lg">
                <?php foreach($russianAlphabet as $letter) : ?>
                    <div class="cancer-catalog-block-section">
                        <div class="cancer-catalog-block-section-letter">
                            <?php echo $letter; ?>
                        </div>

                        <div class="cancer-catalog-block-section-item">
                            <a href="#">Название</a>
                        </div>
                        <div class="cancer-catalog-block-section-item">
                            <a href="#">Название</a>
                        </div>
                        <div class="cancer-catalog-block-section-item">
                            <a href="#">Название</a>
                        </div>
                        <div class="cancer-catalog-block-section-item">
                            <a href="#">Название</a>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
    </div>
</main>

<?php include "blocks/footer.php"; ?>

<script src="../../public/assets/build/profilaktika-media/scripts.js"></script>
</body>
</html>