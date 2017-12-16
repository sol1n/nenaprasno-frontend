<? if (count($arResult['ITEMS'])): ?>
    <div class="publications-block-items">
        <? foreach ($arResult['ITEMS'] as $item): ?>
            <div class="publications-block-item-large">
                <div class="publications-block-item-large-image">
                    <div class="publications-block-item-large-image-wrap">
                        <a href="<?=$item['DETAIL_PAGE_URL']?>">
                            <? $img = CFile::ResizeImageGet($item['PREVIEW_PICTURE']['ID'], array('width'=>270, 'height'=>180), BX_RESIZE_IMAGE_PROPORTIONAL, true); ?>
                            <img src="<?=$img['src']?>" alt="<?=$item['NAME']?>">
                        </a>
                    </div>
                </div>
                <div class="publications-block-item-large-content">
                    <? if ($item['ACTIVE_FROM']): ?>
                        <? $d = FormatDate('j F', MakeTimeStamp($item["ACTIVE_FROM"], "DD.MM.YYYY HH:MI:SS")); ?>
                    <? else: ?>
                        <? $d = FormatDate('j F', MakeTimeStamp($item["DATE_CREATE"], "DD.MM.YYYY HH:MI:SS")); ?>
                    <? endif ?>
                    <div class="publications-block-item-large-date">
                        <?=$d?>
                    </div>
                    <div class="publications-block-item-large-title">
                        <a href="<?=$item['DETAIL_PAGE_URL']?>">
                            <?=$item['NAME']?>
                        </a>
                    </div>
                    <div class="publications-block-item-large-text">
                        <?=$item['PREVIEW_TEXT']?>
                    </div>
                </div>
            </div>
        <? endforeach ?>
    </div>
<? endif ?>