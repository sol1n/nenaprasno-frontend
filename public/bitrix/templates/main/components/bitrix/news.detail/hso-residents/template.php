<div class="staff-member-card m-b-lg">
<div class="staff-member-card-photo">
    <? $img = CFile::ResizeImageGet($arResult['PREVIEW_PICTURE']['ID'], array('width'=>270, 'height'=>270), BX_RESIZE_IMAGE_PROPORTIONAL, true); ?>
    <img src="<?=$img['src']?>" alt="<?=$arResult['NAME']?>">
</div>
<div class="staff-member-card-content">
    <div class="staff-member-card-name">
        <?=$arResult['NAME']?>
    </div>
    <div class="staff-member-card-title">
        <?=$arResult['PREVIEW_TEXT']?>
    </div>

    <div class="staff-member-card-desc">
        <? if ($arResult['PROPERTIES']['EDUCATION']['VALUE']): ?>
            <div class="staff-member-card-desc-title">
                Образование
            </div>
            <?=$arResult['PROPERTIES']['EDUCATION']['~VALUE']['TEXT']?>
        <? endif ?>
    </div>
</div>
</div>

<?=$arResult['~DETAIL_TEXT']?>