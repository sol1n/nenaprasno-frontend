<?
if(!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true)
	die();
?><!DOCTYPE html>
<html>
	<head>

		<?$APPLICATION->ShowHead();?>
		<title><?$APPLICATION->ShowTitle();?></title>
		<link rel="stylesheet" href="/assets/style.min.css">
		<link rel="stylesheet" href="/assets/custom.css">
		<link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" /> 	
		<meta property="og:url" content="http://hso.nenaprasno.ru"/>
		<meta property="og:description" content="Конкурс в высшую школу онкологии - проект Фонда профилактики рака" />
		<meta property="og:title" content="Высшая школа онкологии" />
		<meta property="og:image" content="http://hso.nenaprasno.ru/images/slide-1.jpg"/>
	</head>
	<body>

	<? if ($USER->IsAdmin()): ?>
		<? $APPLICATION->ShowPanel(); ?>
	<? endif ?>

	<header class="header">
    <div class="wrapper">
        <div class="header-logo">
        	<? if (! CSite::InDir('/index.php')): ?>
            <a href="/">Высшая школа онкологии</a>
          <? else: ?>
          	<a>Высшая школа онкологии</a>
        	<? endif ?>
        </div>
        <div class="header-right">
            <div class="header-links">
				<? if (!$USER->IsAuthorized()): ?>
    				<a href="/login/">Вход</a>
                <? else: ?>
					<a href="/test/">Тестирование</a> /
                    <a href="/?logout=yes">Выход</a>
                <? endif ?>
            </div>
            <div class="header-socials">
                <a href="http://vk.com/nenaprasno" target="_blank" title="Вконтакте">
                    <?php include ($_SERVER['DOCUMENT_ROOT'] . "/images/icons/icon-social-vk.svg"); ?>
                </a>
                <a href="https://www.facebook.com/nenaprasno" target="_blank" title="Facebook">
                    <?php include ($_SERVER['DOCUMENT_ROOT'] . "/images/icons/icon-social-facebook.svg"); ?>
                </a>
                <a href="https://twitter.com/ne_naprasno" target="_blank" title="Twitter">
                    <?php include ($_SERVER['DOCUMENT_ROOT'] . "/images/icons/icon-social-twitter.svg"); ?>
                </a>
            </div>
        </div>
    </div>
</header>