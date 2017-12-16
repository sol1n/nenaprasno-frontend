<? if (count($arResult['ITEMS'])): ?>
    <div class="logotypes-block-slider">
        <div class="logotypes-block-slider-items js-logotypes-slider">
            <div class="logotypes-block-slider-item">
                <? $length = count($arResult['ITEMS']); ?>
                <? foreach ($arResult['ITEMS'] as $k => $item): ?>
                    <? if ($item['PROPERTIES']['LINK']['VALUE']): ?>
                    <a href="<?=$item['PROPERTIES']['LINK']['VALUE']?>" target="_blank" class="logotypes-block-slider-image">
                    <? else: ?>
                    <a class="logotypes-block-slider-image">
                    <? endif ?>
                        <img src="<?=$item['PREVIEW_PICTURE']['SRC']?>" alt="<?=$item['NAME']?>">
                    </a>

                    <? if (($k + 1) % 5 == 0 and $k != $length): ?>
                        </div>
                        <div class="logotypes-block-slider-item">
                    <? endif ?>
                <? endforeach ?>
            </div>
        </div>
        <a href="#" class="logotypes-block-slider-prev js-logotypes-slider-prev">
            <?php echo file_get_contents($_SERVER['DOCUMENT_ROOT'] . "/assets/images/slider-arrow-left.svg"); ?>
        </a>
        <a href="#" class="logotypes-block-slider-next js-logotypes-slider-next">
            <?php echo file_get_contents($_SERVER['DOCUMENT_ROOT'] . "/assets/images/slider-arrow-right.svg"); ?>
        </a>
    </div>
<? endif ?>