<?
foreach ($arResult['ITEMS'] as $item){
    $d = FormatDate('Y', MakeTimeStamp($item["DATE_ACTIVE_FROM"], "DD.MM.YYYY HH:MI:SS"));
    $arResult['years'][$d][] = $item;
}

?>