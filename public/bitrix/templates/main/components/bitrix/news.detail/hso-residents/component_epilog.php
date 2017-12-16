<?
  CModule::IncludeModule('iblock');

  $res = CIBlockElement::GetByID($arResult["ID"]);
  $element = $res->Fetch();

  $APPLICATION->SetPageProperty('image', 'http://hso.nenaprasno.ru/' . CFile::GetPath($element['PREVIEW_PICTURE']));
  $APPLICATION->SetPageProperty('description', $arResult['IPROPERTY_VALUES']['ELEMENT_META_DESCRIPTION']);
  $APPLICATION->SetPageProperty('url', 'http://hso.nenaprasno.ru/residents/' . $element['ID'] . '/');
?>