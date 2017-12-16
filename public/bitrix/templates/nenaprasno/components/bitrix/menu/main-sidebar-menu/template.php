<?if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();?>


<?if (!empty($arResult)):?>
<nav class="main-sidebar-menu">
	<ul>
		<?foreach($arResult as $arItem):?>
			<?if($arItem["SELECTED"]):?>
				<li class="active">
					<a href="<?=$arItem["LINK"]?>" class="selected"><?=$arItem["TEXT"]?></a>
				</li>
			<?else:?>
				<li>
					<a href="<?=$arItem["LINK"]?>"><?=$arItem["TEXT"]?></a>
				</li>
			<?endif?>
		<?endforeach?>
	</ul>
</nav>
<?endif?>



