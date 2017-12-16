<? if (count($arResult['ITEMS'])): ?>
    <div class="news-block-items">
        <? foreach ($arResult['ITEMS'] as $item): ?>
            <div class="news-block-items-col">
                <a href="<?=$item['DETAIL_PAGE_URL']?>" class="news-block-item">
                    <div class="news-block-item-image">
                        <? $img = CFile::ResizeImageGet($item['PREVIEW_PICTURE']['ID'], array('width'=>270, 'height'=>200), BX_RESIZE_IMAGE_PROPORTIONAL, true); ?>
                        <img src="<?=$img['src']?>" alt="<?=$item['NAME']?>">
                    </div>
                    <div class="news-block-item-content">
                        <? if ($item['ACTIVE_FROM']): ?>
                            <? $d = FormatDate('j F', MakeTimeStamp($item["ACTIVE_FROM"], "DD.MM.YYYY HH:MI:SS")); ?>
                        <? else: ?>
                            <? $d = FormatDate('j F', MakeTimeStamp($item["DATE_CREATE"], "DD.MM.YYYY HH:MI:SS")); ?>
                        <? endif ?>
                        <div class="news-block-item-date"><?=$d?></div>

                        <div class="news-block-item-title">
                            <?=$item['NAME']?>
                        </div>
                    </div>
                </a>
            </div>
        <? endforeach ?>
    </div>
<? endif ?>