<?
if(!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true)
	die();
?><!DOCTYPE html>
<html>
	<head>

		<?$APPLICATION->ShowHead();?>
		<title><?$APPLICATION->ShowTitle();?></title>
		<link rel="stylesheet" href="/assets/css/style.min.css">
		<link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" /> 	
        <meta name="viewport" content="width=500">
        <meta property="og:url" content="<?$APPLICATION->ShowProperty("url", "https://nenaprasno.ru")?>"/>
        <meta property="og:description" content="<?$APPLICATION->ShowProperty("description", "Сайт Фонда профилактики рака")?>" />
        <meta property="og:title" content="<?$APPLICATION->ShowTitle()?>" />
        <meta property="og:image" content="<?$APPLICATION->ShowProperty("image", "http://nenaprasno.webglyphs.ru/assets/images/slider/slider-image-1.jpg")?>"/>
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
                    <img height="80px" src="/assets/images/logo-new.png" alt="Фонд профилактики рака. Живу не напрасно.">
                <? else: ?>
                    <a href="/">
                        <img height="80px" src="/assets/images/logo-new.png" alt="Фонд профилактики рака. Живу не напрасно.">
                    </a>
                <? endif ?>
            </div>   
            <div class="main-header-right">
                <div class="main-header-contacts">
                    <div class="main-header-contacts-title">
                        Связаться с нами
                    </div>
                    <a href="tel:+78123163434"class="main-header-contacts-phone">
                        +7 812 316-34-34
                    </a>                    
                    <a href="mailto:fond@nenaprasno.ru"class="main-header-contacts-phone">
                        fond@nenaprasno.ru
                    </a>
                </div>
                <div class="main-header-buttons">

                    <div class="main-header-button-login">
                        <!--
                        <a href="#" class="link-dotted">Вход</a> / <a href="#" class="link-dotted">Регистрация</a>
                        -->
                    </div>

                    <div class="social-buttons">
                        <a href="http://vk.com/nenaprasno" target="_blank" title="Вконтакте">
                            <?php echo file_get_contents($_SERVER['DOCUMENT_ROOT'] . "/assets/images/icon-social-vk.svg"); ?>
                        </a>
                        <a href="https://www.facebook.com/nenaprasno" target="_blank" title="Facebook">
                            <?php echo file_get_contents($_SERVER['DOCUMENT_ROOT'] . "/assets/images/icon-social-facebook.svg"); ?>
                        </a>
                        <a href="https://twitter.com/ne_naprasno" target="_blank" title="Twitter">
                            <?php echo file_get_contents($_SERVER['DOCUMENT_ROOT'] . "/assets/images/icon-social-odnoklassniki.svg"); ?>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <nav class="main-header-nav">
            <div class="wrapper">
                <?$APPLICATION->IncludeComponent("bitrix:menu", "main-header-nav-list", Array("ROOT_MENU_TYPE" => "top"), false);?>
                <div class="main-header-nav-right">
                    <a href="/#donate" class="button button-orange">Помочь прямо сейчас</a>
                </div>
            </div>
        </nav>
    </header>

    <div id="offcanvas" class="main-offcanvas-overlay">
        <nav class="main-offcanvas">
            <?$APPLICATION->IncludeComponent("bitrix:menu", "main-offcanvas-menu", Array("ROOT_MENU_TYPE" => "top"), false);?>


            <div class="main-offcanvas-padding">
                <div class="social-buttons">
                    <a href="#" target="_blank" title="Вконтакте">
                        <?php echo file_get_contents($_SERVER['DOCUMENT_ROOT'] . "/assets/images/icon-social-vk.svg"); ?>
                    </a>
                    <a href="#" target="_blank" title="Facebook">
                        <?php echo file_get_contents($_SERVER['DOCUMENT_ROOT'] . "/assets/images/icon-social-facebook.svg"); ?>
                    </a>
                    <a href="#" target="_blank" title="Twitter">
                        <?php echo file_get_contents($_SERVER['DOCUMENT_ROOT'] . "/assets/images/icon-social-odnoklassniki.svg"); ?>
                    </a>
                </div>
            </div>
        </nav>
    </div>