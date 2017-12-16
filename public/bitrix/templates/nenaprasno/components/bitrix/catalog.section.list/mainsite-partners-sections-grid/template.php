<? if (count($arResult['SECTIONS'])): ?>
    <? foreach ($arResult['SECTIONS'] as $section): ?>
        <? if ($section['ELEMENT_CNT'] > 0): ?>
            <div class="partners-block m-b-md">
                <div class="partners-block-title partners-block-title-top">
                    <a href="<?=$section['SECTION_PAGE_URL']?>">
                        <?=$section['NAME']?>
                    </a>
                </div>

                <?
                    $APPLICATION->IncludeComponent("bitrix:news.list", "mainsite-partners-block", array(
                      "IBLOCK_ID" => $arParams['IBLOCK_ID'],
                      "NEWS_COUNT" => "4",
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
				<div class="project-block-load-more" style="width: 100%; margin: 20px 0 20px 0;">
						<a href="<?=$section['SECTION_PAGE_URL']?>" class="button button-gray-hollow button-round" style="font-size: 12px; padding: 10px 10px;">Все <?=strtolower($section['NAME']);?></a>
				</div>
            </div>
        <? endif ?>
    <? endforeach ?>
<? endif ?>