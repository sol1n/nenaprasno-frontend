<? if (count($arResult['SECTIONS'])): ?>
    <? foreach ($arResult['SECTIONS'] as $section): ?>
        <? if ($section['ELEMENT_CNT'] > 0): ?>
            <div class="reports-block m-b-lg">
                <div class="reports-block-title">
                    <a href="<?=$section['SECTION_PAGE_URL']?>">
                        <?=$section['NAME']?>
                    </a>
                </div>
                <?
                    $APPLICATION->IncludeComponent(
	"bitrix:news.list", 
	"mainsite-reports-block", 
	array(
		"IBLOCK_ID" => $arParams["IBLOCK_ID"],
		"NEWS_COUNT" => "12",
		"SORT_BY1" => "SORT",
		"SORT_ORDER1" => "ASC",
		"FIELD_CODE" => array(
			0 => "DATE_ACTIVE_FROM",
			1 => "DATE_CREATE",
			2 => "",
		),
		"PROPERTY_CODE" => array(
			0 => "",
			1 => "*",
			2 => "",
		),
		"SET_TITLE" => "N",
		"SET_STATUS_404" => "N",
		"INCLUDE_IBLOCK_INTO_CHAIN" => "N",
		"ADD_SECTIONS_CHAIN" => "N",
		"PARENT_SECTION" => $section["ID"],
		"PARENT_SECTION_CODE" => "",
		"DISPLAY_TOP_PAGER" => "N",
		"DISPLAY_BOTTOM_PAGER" => "N",
		"PAGER_SHOW_ALWAYS" => "N",
		"PAGER_TEMPLATE" => "main",
		"CACHE_TYPE" => "A",
		"CACHE_TIME" => "360000",
		"CACHE_FILTER" => "Y",
		"CACHE_GROUPS" => "N",
		"COMPONENT_TEMPLATE" => "mainsite-reports-block",
		"IBLOCK_TYPE" => "-",
		"SORT_BY2" => "SORT",
		"SORT_ORDER2" => "ASC",
		"FILTER_NAME" => "",
		"CHECK_DATES" => "Y",
		"DETAIL_URL" => "",
		"AJAX_MODE" => "N",
		"AJAX_OPTION_JUMP" => "N",
		"AJAX_OPTION_STYLE" => "Y",
		"AJAX_OPTION_HISTORY" => "N",
		"AJAX_OPTION_ADDITIONAL" => "",
		"PREVIEW_TRUNCATE_LEN" => "",
		"ACTIVE_DATE_FORMAT" => "d.m.Y",
		"SET_BROWSER_TITLE" => "Y",
		"SET_META_KEYWORDS" => "Y",
		"SET_META_DESCRIPTION" => "Y",
		"SET_LAST_MODIFIED" => "N",
		"HIDE_LINK_WHEN_NO_DETAIL" => "N",
		"INCLUDE_SUBSECTIONS" => "Y",
		"PAGER_TITLE" => "Новости",
		"PAGER_DESC_NUMBERING" => "N",
		"PAGER_DESC_NUMBERING_CACHE_TIME" => "36000",
		"PAGER_SHOW_ALL" => "N",
		"PAGER_BASE_LINK_ENABLE" => "N",
		"SHOW_404" => "N",
		"MESSAGE_404" => ""
	),
	false
);
                ?>
            </div>
        <? endif ?>
    <? endforeach ?>
<? endif ?>