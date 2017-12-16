<?php
if (!defined('B_PROLOG_INCLUDED') || (B_PROLOG_INCLUDED !== true)) {
    die();
}


if (!$arResult["NavShowAlways"]) {
    if (
       (0 == $arResult["NavRecordCount"])
       ||
       ((1 == $arResult["NavPageCount"]) && (false == $arResult["NavShowAll"]))
    ) {
        return;
    }
}

$strNavQueryString = ($arResult["NavQueryString"] != "" ? $arResult["NavQueryString"]."&amp;" : "");
$strNavQueryStringFull = ($arResult["NavQueryString"] != "" ? "?".$arResult["NavQueryString"] : "");

?>


<div class="pagination m-b-lg">

	<?if ($arResult["NavPageNomer"] > 1):?>
    <a href="<?=$arResult["sUrlPath"]?>?PAGEN_<?=$arResult["NavNum"]?>=<?=$arResult["NavPageNomer"] - 1?>" class="pagination-item pagination-item-prev">
        <?php include $_SERVER['DOCUMENT_ROOT'] . "/assets/images/icon-pagination-prev.svg"; ?>
        Пред.
    </a>
	<?else:?>
		<a disabled class="pagination-item pagination-item-prev">
        <?php include $_SERVER['DOCUMENT_ROOT'] . "/assets/images/icon-pagination-prev.svg"; ?>
        Пред.
    </a>
	<?endif?>

	<?while($arResult["nStartPage"] <= $arResult["nEndPage"]):?>

		<?if ($arResult["nStartPage"] == $arResult["NavPageNomer"]):?>
      <a class="pagination-item active"><?=$arResult["nStartPage"]?></a>
		<?else:?>
      <a href="<?=$arResult["sUrlPath"]?>?PAGEN_<?=$arResult["NavNum"]?>=<?=$arResult["nStartPage"]?>" class="pagination-item">
        <?=$arResult["nStartPage"]?>
      </a>
		<?endif?>
		<?$arResult["nStartPage"]++?>
	<?endwhile?>

	<?if($arResult["NavPageNomer"] < $arResult["NavPageCount"]):?>
    <a href="<?=$arResult["sUrlPath"]?>?PAGEN_<?=$arResult["NavNum"]?>=<?=$arResult["NavPageNomer"] + 1?>" class="pagination-item pagination-item-next">
        След.
        <?php include $_SERVER['DOCUMENT_ROOT'] . "/assets/images/icon-pagination-next.svg"; ?>
    </a>
	<?else:?>
    <a disabled class="pagination-item pagination-item-next">
        След.
        <?php include $_SERVER['DOCUMENT_ROOT'] . "/assets/images/icon-pagination-next.svg"; ?>
    </a>
	<?endif?>

</div>