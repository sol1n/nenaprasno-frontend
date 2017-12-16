<? if ($arResult['ITEMS']): ?>
  <div class="partners-grid-wrap">
    <div class="partners-grid">
      <? foreach ($arResult['ITEMS'] as $item): ?>
        <div class="partners-grid-item">
          <? if ($item['PROPERTIES']['LINK']['VALUE']): ?>
            <a href="<?=$item['PROPERTIES']['LINK']['VALUE']?>" target="_blank">
          <? else: ?>  
            <a>
          <? endif ?>
              <img src="<?=$item['PREVIEW_PICTURE']['SRC']?>" alt="<?=$item['NAME']?>">
          </a>
        </div>
      <? endforeach ?>
    </div>
  </div>
<? endif ?>