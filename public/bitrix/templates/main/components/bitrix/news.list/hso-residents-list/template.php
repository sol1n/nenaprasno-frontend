<? if (count($arResult['ITEMS'])): ?>
    <div class="staff-block">
        <div class="row">
            <? foreach ($arResult['ITEMS'] as $item): ?>
                <div class="col-xs-6 col-sm-4">
                    <div class="staff-block-item">
                        <div class="staff-block-item-photo">
                            <a href="<?=$item['DETAIL_PAGE_URL']?>">
                                <? $img = CFile::ResizeImageGet($item['PREVIEW_PICTURE']['ID'], array('width'=>270, 'height'=>270), BX_RESIZE_IMAGE_PROPORTIONAL, true); ?>
                                <img src="<?=$img['src']?>" alt="<?=$item['NAME']?>" class="img-responsive">
                            </a>
                        </div>
                        <div class="staff-block-item-name">
                            <?=$item['NAME']?>
                        </div>
                        <div class="staff-block-item-desc">
                            <?=$item['PREVIEW_TEXT']?>
                        </div>
                    </div>
                </div>
            <? endforeach ?>
        </div>
    </div>
<? endif ?>
