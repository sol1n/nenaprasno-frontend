<? if (count($arResult['ITEMS'])): ?>
    <div class="partners-block-items">
        <? foreach ($arResult['ITEMS'] as $item): ?>
            <a href="<?=$item['DETAIL_PAGE_URL']?>" class="partners-block-item">
                <? $file = CFile::GetPath($item['PREVIEW_PICTURE']['ID']); ?>
                <div class="partners-block-item-image">
                    <img width="140" src="<?=$file?>" alt="<?=$item['NAME']?>">
                </div>
                <div class="partners-block-item-title">
                  <?=$item['NAME']?>
                </div>
            </a>
        <? endforeach ?>
    </div>
<? endif ?>
