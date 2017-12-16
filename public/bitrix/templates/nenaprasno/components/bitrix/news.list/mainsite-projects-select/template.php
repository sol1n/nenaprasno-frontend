<select name="donate-project">
    <option value="common">Общее пожертвование</option>
    <option value="common">Поддержка работы фонда</option>
    <option value="common">Просветительство</option>
    <? foreach ($arResult['ITEMS'] as $item): ?>
      <? if ($item['CODE'] == $arParams['OPENED']): ?>
        <option selected value="<?=$item['ID']?>"><?=$item['NAME']?></option>
      <? else: ?>
        <option value="<?=$item['ID']?>"><?=$item['NAME']?></option>
      <? endif ?>
    <? endforeach ?>
</select>
