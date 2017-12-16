<? if (count($arResult['ITEMS'])): ?>
    <div class="partners-block-items">
        <? foreach ($arResult['ITEMS'] as $item): ?>
            <? if ($item['PROPERTIES']['LINK']['VALUE']): ?>
                <a target="_blank" href="<?=$item['PROPERTIES']['LINK']['VALUE']?>" class="partners-block-item">
            <? else: ?>
                <a class="partners-block-item">
            <? endif ?>
                <? $img = CFile::GetPath($item['PREVIEW_PICTURE']['ID']); ?>
                <div class="partners-block-item-image">
                    <img width="140" src="<?=$img?>" alt="<?=$item['NAME']?>">
                </div>
                <div class="partners-block-item-title">
                  <?=$item['NAME']?>
                </div>
            </a>
        <? endforeach ?>
    </div>
<? endif ?>
