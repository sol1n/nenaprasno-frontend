<?
  CModule::IncludeModule('iblock');

  $res = CIBlockElement::GetByID($arResult["ID"]);
  $element = $res->Fetch();

  $image = CIBlockElement::GetProperty($element['IBLOCK_ID'], $element['ID'], array("sort" => "asc"), Array("CODE"=>"OG_IMAGE"))->Fetch();
  if ($image) {
  	$APPLICATION->SetPageProperty('image', 'http://' . $_SERVER['SERVER_NAME'] . CFile::GetPath($image['VALUE']));
  } elseif ($element['PREVIEW_PICTURE']) {
  	$APPLICATION->SetPageProperty('image', 'http://' . $_SERVER['SERVER_NAME'] . CFile::GetPath($element['PREVIEW_PICTURE']));
  }

  $title = CIBlockElement::GetProperty($element['IBLOCK_ID'], $element['ID'], array("sort" => "asc"), Array("CODE"=>"OG_TITLE"))->Fetch();
  if ($title) {
    $APPLICATION->SetPageProperty('t', $title['VALUE']);
  } else {
    $APPLICATION->SetPageProperty('t', $arResult['IPROPERTY_VALUES']['ELEMENT_META_TITLE']);
  }

  $description = CIBlockElement::GetProperty($element['IBLOCK_ID'], $element['ID'], array("sort" => "asc"), Array("CODE"=>"OG_DESCRIPTION"))->Fetch();
  if ($description) {
    $APPLICATION->SetPageProperty('d', $description['VALUE']);
  } else {
    $APPLICATION->SetPageProperty('d', $arResult['IPROPERTY_VALUES']['ELEMENT_META_DESCRIPTION']);  
  }
  
  $APPLICATION->SetPageProperty('url', 'http://nenaprasno.webglyphs.ru/projects/' . $element['CODE'] . '/');
?>