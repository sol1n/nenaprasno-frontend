<? foreach ($arResult['ITEMS'] as $item): ?>
  <? if ($item['NAME'] == $arParams['selected']): ?>
    <option selected value="<?=$item['NAME']?>"><?=$item['NAME']?></option>
  <? else: ?>
    <option value="<?=$item['NAME']?>"><?=$item['NAME']?></option>
  <? endif ?>
<? endforeach ?>