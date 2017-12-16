<? if (count($arResult['SECTIONS'])): ?>
    <? foreach ($arResult['SECTIONS'] as $section): ?>
        <? if ($section['ELEMENT_CNT'] > 0): ?>
            <div class="reports-block m-b-lg">
                <div class="reports-block-title">
                    <?=$section['NAME']?>
                </div>

                <?
                    $APPLICATION->IncludeComponent("bitrix:news.list", "mainsite-smi-block", array(
                      "IBLOCK_ID" => $arParams['IBLOCK_ID'],
                      "NEWS_COUNT" => "40",
                      "SORT_BY1" => "SORT",
                      "SORT_ORDER1" => "ASC",
                      "FIELD_CODE" => array('DATE_CREATE', 'DATE_ACTIVE_FROM'),
                      "PROPERTY_CODE" => array("*"),
                      "SET_TITLE" => "N",
                      "SET_STATUS_404" => "N",
                      "INCLUDE_IBLOCK_INTO_CHAIN" => "N",
                      "ADD_SECTIONS_CHAIN" => "N",
                      "PARENT_SECTION" => $section['ID'],
                      "PARENT_SECTION_CODE" => "",
                      "DISPLAY_TOP_PAGER" => "N",
                      "DISPLAY_BOTTOM_PAGER" => "N",
                      "PAGER_SHOW_ALWAYS" => "N",
                      "PAGER_TEMPLATE" => "main",
                      "CACHE_TYPE" => "A",
                      "CACHE_TIME" => "360000",
                      "CACHE_FILTER" => "Y",
                      "CACHE_GROUPS" => "N",
                    ),
                    false
                  );
                ?>
            </div>
        <? endif ?>
    <? endforeach ?>
<? endif ?>