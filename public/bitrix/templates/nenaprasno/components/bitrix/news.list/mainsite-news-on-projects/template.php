<? if (count($arResult['ITEMS'])): ?>
    <div class="news-module m-b-lg">
        <div class="news-module-title">Новости проекта</div>
            <? foreach ($arResult['ITEMS'] as $item): ?>
                <a href="<?=$item['DETAIL_PAGE_URL']?>" class="news-module-item">
                    <div class="news-module-item-image" style="margin-bottom: 0; position: relative;">
                        <? $img = CFile::ResizeImageGet($item['PREVIEW_PICTURE']['ID'], array('width'=>90, 'height'=>90), BX_RESIZE_IMAGE_PROPORTIONAL, true); ?>
                        <img src="<?=$img['src']?>" alt="<?=$item['NAME']?>" style="position: absolute; margin: auto; left: 0; top: 0; bottom: 0; right: 0;">
                    </div>

                    <div class="news-module-item-content" style="margin-left: 40%; width: 60%; text-align: left;">
                        <? if ($item['ACTIVE_FROM']): ?>
                            <? $d = FormatDate('j F', MakeTimeStamp($item["ACTIVE_FROM"], "DD.MM.YYYY HH:MI:SS")); ?>
                        <? else: ?>
                            <? $d = FormatDate('j F', MakeTimeStamp($item["DATE_CREATE"], "DD.MM.YYYY HH:MI:SS")); ?>
                        <? endif ?>
                        <div class="news-module-item-date"><?=$d?></div>
                        <div class="news-module-item-text">
                             <?=$item['NAME']?>
                        </div>
                    </div>
                </a>
            <? endforeach ?>
            <a href="/fund/news/" class="news-module-read-all">Посмотреть все новости</a>
        </div>
    </div>
<? endif ?>
