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
                <li><a href="#">Авторизация</a></li>
            </ul>
        </div>

        <div class="main-wrapper">
            <div class="main-wrapper-column">

                <form action="#" method="POST" class="cabinet-profile">
                    <div class="cabinet-profile-card m-t-lg m-b-lg" style="max-width: 570px; margin-left: auto; margin-right: auto;">
                        <div class="cabinet-profile-title">
                            Вход
                        </div>

                        <div class="cabinet-profile-control">
                            <label class="cabinet-profile-label">E-mail</label>
                            <input type="text" class="form-input" name="login" placeholder="Введите ваш e-mail" required>
                        </div>

                        <div class="cabinet-profile-control">
                            <label class="cabinet-profile-label">Пароль</label>
                            <input type="password" class="form-input" name="password" placeholder="Пароль" required>
                        </div>

                        <div class="cabinet-profile-submit">
                            <button type="submit" class="button button-blue button-round">
                                Войти
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