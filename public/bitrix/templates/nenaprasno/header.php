<?
if(!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true)
	die();
?><!DOCTYPE html>
<html>
	<head>

		<?$APPLICATION->ShowHead();?>
		<title><?$APPLICATION->ShowTitle();?></title>
		<link rel="stylesheet" href="/assets/build/style.min.css">
		<link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" /> 	
        <meta name="viewport" content="width=500">
        <link rel="canonical" href="<?=$APPLICATION->GetProperty("canonical", htmlspecialchars($_SERVER['SERVER_NAME']  . $_SERVER['REQUEST_URI']))?>"/>
        <meta property="og:url" content="<?$APPLICATION->ShowProperty("url", htmlspecialchars($_SERVER['SERVER_NAME'] .  $_SERVER['REQUEST_URI']))?>"/>
        <meta property="og:description" content="<?$APPLICATION->ShowProperty("d", "Сайт Фонда профилактики рака")?>" />
        <meta property="og:title" content="<?$APPLICATION->ShowProperty("t", $APPLICATION->GetTitle())?>" />
        <meta property="og:image" content="<?$APPLICATION->ShowProperty("image", "http://nenaprasno.webglyphs.ru/assets/images/slider/slider-image-1.jpg")?>"/>
        <meta property="og:image:url" content="<?$APPLICATION->ShowProperty("image", "http://nenaprasno.webglyphs.ru/assets/images/slider/slider-image-1.jpg")?>"/>

	</head>
	<body>

	<? if ($USER->IsAdmin()): ?>
		<? $APPLICATION->ShowPanel(); ?>
	<? endif ?>

    <header class="main-header">
        <div class="wrapper">
            <a href="#" class="main-header-toggler js-offcanvas">
                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="16" viewBox="0 0 21 16">
                    <path fill="#48ABEC" d="M34,40H55v2.094H34V40Zm0,6.938H55v2.125H34V46.937Zm0,6.969H55V56H34V53.906Z" transform="translate(-34 -40)"></path>
                </svg>
            </a>

            <div class="main-header-logo">
                <? if (CSite::InDir('/index.php')): ?>
                    <img height="60px" src="/assets/images/logo.svg" alt="Фонд профилактики рака. Живу не напрасно.">
                <? else: ?>
                    <a href="/">
                        <img height="60px" src="/assets/images/logo.svg" alt="Фонд профилактики рака. Живу не напрасно.">
                    </a>
                <? endif ?>
            </div>   
            <div class="main-header-right">
				<div class="main-header-contacts phone-col">
					<a href="tel:+78123163434" class="main-header-contacts-phone">
						<img src="/assets/images/call-answer.svg">
						+7 812 316-34-34
					</a>
				</div>
				<div class="main-header-contacts mail-col">
					<a href="mailto:fond@nenaprasno.ru" class="main-header-contacts-email">
						<img src="/assets/images/close-envelope.svg">
						fond@nenaprasno.ru
					</a>
				</div>

                <div class="main-header-separator"></div>

                <div class="main-header-buttons">

                    <div class="social-buttons">
                        <a href="http://vk.com/nenaprasno" target="_blank" title="Вконтакте">
                            <?php echo file_get_contents($_SERVER['DOCUMENT_ROOT'] . "/assets/images/icon-social-vk.svg"); ?>
                        </a>
                        <a href="https://www.facebook.com/nenaprasno" target="_blank" title="Facebook">
                            <?php echo file_get_contents($_SERVER['DOCUMENT_ROOT'] . "/assets/images/icon-social-facebook.svg"); ?>
                        </a>
						<?/*
                        <a href="https://twitter.com/ne_naprasno" target="_blank" title="Twitter">
                            <?php echo file_get_contents($_SERVER['DOCUMENT_ROOT'] . "/assets/images/icon-social-odnoklassniki.svg"); ?>
                        </a>
						*/?>
                    </div>
                </div>

                <div class="main-header-separator"></div>

                <? $user = getAppercodeUser(); ?>

                <div class="main-header-button-login">
                    <? if (is_null($user)): ?>
                        <a href="http://nenaprasno-cabinet.webglyphs.ru/registration">Регистрация</a>
                        <a href="http://nenaprasno-cabinet.webglyphs.ru/login">Вход</a>
                    <? else: ?>
                        <a href="http://nenaprasno-cabinet.webglyphs.ru">Личный кабинет</a>
                        <a href="http://nenaprasno-cabinet.webglyphs.ru/logout">Выход</a>
                    <? endif ?>
                </div>
            </div>
        </div>
        <nav class="main-header-nav">
            <div class="wrapper">
                <?$APPLICATION->IncludeComponent("bitrix:menu", "main-header-nav-list", Array("ROOT_MENU_TYPE" => "top"), false);?>
                <div class="main-header-nav-right">
                    <a href="/#donate" class="button button-red">Помочь прямо сейчас</a>
                </div>
            </div>
        </nav>
    </header>

    <div id="offcanvas" class="main-offcanvas-overlay">
        <nav class="main-offcanvas">
            <div class="main-offcanvas-logo">
                <a href="/">
                    <img height="60px;" src="/assets/images/logo.svg" alt="Фонд профилактики рака. Живу не напрасно.">
                </a>
            </div>
            
            <?$APPLICATION->IncludeComponent("bitrix:menu", "main-offcanvas-menu", Array("ROOT_MENU_TYPE" => "top"), false);?>

            <div class="main-offcanvas-user">
                <div class="main-offcanvas-padding">
                    <a href="http://nenaprasno-cabinet.webglyphs.ru/login" class="main-offcanvas-user-login">
                        Войти на сайт
                    </a>
                    <a href="http://nenaprasno-cabinet.webglyphs.ru/registration" class="main-offcanvas-user-registration">
                        Зарегистрироваться
                    </a>
                </div>
            </div>
        </nav>
    </div>
