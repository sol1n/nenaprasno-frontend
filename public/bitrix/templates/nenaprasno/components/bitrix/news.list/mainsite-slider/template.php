<section class="header-slider-wrapper">
    <div class="header-slider js-header-slider">
        <? foreach ($arResult['ITEMS'] as $item): ?>
            <? $img = CFile::GetPath($item['PREVIEW_PICTURE']['ID']); ?>
            <? if ($item['PROPERTIES']['LINK']['VALUE']): ?>
                <a href="<?=$item['PROPERTIES']['LINK']['VALUE']?>">
                    <div class="header-slider-item <?=$item['PROPERTIES']['CLASSES']['VALUE']?>" style="background-image: url('<?=$img?>');">
                        <?=$item['DETAIL_TEXT']?>
                    </div>
                </a>
            <? else: ?>
                <div class="header-slider-item" style="background-image: url('<?=$img?>');"></div>
            <? endif ?>
        <? endforeach ?>
    </div>

    <a href="#" class="header-slider-prev js-header-slider-prev">
        <?php include $_SERVER['DOCUMENT_ROOT'] . "/assets/images/slider-arrow-left.svg"; ?>
    </a>
    <a href="#" class="header-slider-next js-header-slider-next">
        <?php include $_SERVER['DOCUMENT_ROOT'] . "/assets/images/slider-arrow-right.svg"; ?>
    </a>

    <?$APPLICATION->IncludeFile(
      SITE_DIR."include/mainpage/after-slider.php",
      Array(),
      Array("MODE"=>"html")
      );
    ?>
</section>