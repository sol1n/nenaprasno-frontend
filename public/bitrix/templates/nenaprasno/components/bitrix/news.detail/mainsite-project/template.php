<div class="project-preview m-b-lg">
    <div class="project-preview-content">
        <div class="project-preview-content-padding">
            <div class="page-title">
                <?=$arResult['NAME']?>
            </div>
            <div class="page-subtitle">
                <?=$arResult['PREVIEW_TEXT']?>
            </div>

            <div class="project-preview-content-desc">
                <?=$arResult['PROPERTIES']['AUDIENCE']['~VALUE']['TEXT']?>
            </div>

            <div class="project-preview-content-goal m-b-lg">
                <div class="project-preview-content-goal-title">Цель проекта</div>
                <?=$arResult['PROPERTIES']['TARGET']['~VALUE']['TEXT']?>
            </div>
			<?if($arResult['PROPERTIES']['CANDONATE']['VALUE']=='Y'):?>
				<div class="project-preview-content-button m-b-lg">
					<a href="#donate" class="button button-blue button-round">Помочь проекту</a>
				</div>
			<?endif;?>

            <div class="project-preview-content-links">
                <div class="project-preview-share">
                    <a href="#project-share" data-toggle data-toggle-self-deactive class="link-dotted">Поделиться</a>
                    <div id="project-share" class="project-preview-share-tooltip">
                        <script src="//yastatic.net/es5-shims/0.0.2/es5-shims.min.js"></script>
                        <script src="//yastatic.net/share2/share.js"></script>
                        <div class="ya-share2" data-services="vkontakte,facebook,odnoklassniki"></div>
                    </div>
                </div>

                <!-- <a href="#" class="link-dotted">Список поддержавших</a> -->
            </div>
        </div>
    </div>

    <div class="project-preview-photo">
        <img src="<?=$arResult['DETAIL_PICTURE']['SRC']?>" alt="<?=$arResult['NAME']?>">
    </div>
</div>

</div> 

<?if($arResult['PROPERTIES']['CANDONATE']['VALUE']=='Y'):?>
	<? if ($arResult['donations']): ?>
	<div class="project-preview-donation m-b-lg">
	  <div class="wrapper">
		<div class="project-preview-donation-title">
			Собрано <?=number_format($arResult['PROPERTIES']['COLLECTED']['VALUE'], 0, '.', ' ')?> руб из <?=number_format($arResult['PROPERTIES']['GOAL']['VALUE'], 0, '.', ' ')?> руб/год
		</div>

		<div class="project-preview-donation-bar">
		  <? foreach ($arResult['donations'] as $donate): ?>
			<div class="project-preview-donation-bar-section <?=$donate['color']?>" style="width: <?=$donate['percent']?>%;"></div>
		  <? endforeach ?>
		  <? if ($arResult['percentsLeft'] > 0): ?>
			<div class="project-preview-donation-bar-section project-preview-donation-bar-gray" style="width: <?=$arResult['percentsLeft']?>%;"></div>
		  <? endif ?>
		

		  <? if (($arResult['steps'])): ?>
			<? foreach ($arResult['steps'] as $step): ?>
			  <div class="project-preview-donation-bar-arrow" style="left: <?=$step['value']?>%;">
				  <div class="project-preview-donation-bar-arrow-text">
					  <?=$step['title']?>
				  </div>
			  </div>
			<? endforeach ?>
		  <? endif ?>

		</div>

		<div class="project-preview-donation-legend">
		  <? foreach ($arResult['donations'] as $donate): ?>
			<div class="project-preview-donation-legend-item">
			  <div class="project-preview-donation-legend-item-name">
				  <div class="project-preview-donation-legend-item-dot <?=$donate['color']?>"></div>
				  <?=$donate['title']?>
			  </div>
			  <div class="project-preview-donation-legend-item-value">
				  <?=number_format($donate['value'], 0, '.', ' ')?> руб
			  </div>
		  </div>
		  <? endforeach ?>
		</div>

	  </div>
	</div>
	<? endif ?>
<?endif;?>

<div class="wrapper"> 

<div class="main-wrapper">
    <div class="main-wrapper-column">
			<div class="article-block m-b-lg">
				<?=$arResult['~DETAIL_TEXT']?>
				<?if($arResult['PROPERTIES']['CANDONATE']['VALUE']=='Y'):?>
					<a href="#donate-<?=$arResult['ID']?>" class="button button-blue button-xsmall">Оформить пожертвование</a>
				<?endif;?>
			</div>

		<?if($arResult['PROPERTIES']['CANDONATE']['VALUE']=='Y'):?>
			<div class="m-t-lg m-b-lg">
			  <?$APPLICATION->IncludeFile(
				SITE_DIR."include/projects/banner.php",
				Array(),
				Array("MODE"=>"html", "SHOW_BORDER" => false)
				);
			  ?>
			</div>
		<?endif;?>

        <? if (($arResult['PROPERTIES']['PARTNERS']['VALUE'])): ?>
            <div class="partners-block m-b-md">
                <div class="partners-block-title">
                    Генеральные партнеры
                </div>
                <?
                    global $projectPartnersFilter;
                    $projectPartnersFilter = ['ID' => $arResult['PROPERTIES']['PARTNERS']['VALUE']];
                    $APPLICATION->IncludeComponent("bitrix:news.list", "mainsite-partners-on-projects", array(
                      "FILTER_NAME" => "projectPartnersFilter",
                      "IBLOCK_ID" => "8",
                      "NEWS_COUNT" => "5",
                      "SORT_BY1" => "ID",
                      "SORT_ORDER1" => "DESC",
                      "FIELD_CODE" => array("DATE_CREATE", "ACTIVE_FROM"),
                      "PROPERTY_CODE" => array("*"),
                      "SET_TITLE" => "N",
                      "SET_STATUS_404" => "N",
                      "INCLUDE_IBLOCK_INTO_CHAIN" => "N",
                      "ADD_SECTIONS_CHAIN" => "N",
                      "PARENT_SECTION" => "",
                      "PARENT_SECTION_CODE" => "",
                      "DISPLAY_TOP_PAGER" => "N",
                      "DISPLAY_BOTTOM_PAGER" => "N",
                      "PAGER_SHOW_ALWAYS" => "N",
                      "PAGER_TEMPLATE" => "main",
                      "CACHE_TYPE" => "A",
                      "CACHE_TIME" => "360000",
                      "CACHE_FILTER" => "N",
                      "CACHE_GROUPS" => "N",
                    ),
                    false
                  );
                ?>
            </div>
        <? endif ?>

        <? if (($arResult['PROPERTIES']['SPONSORS']['VALUE'])): ?>
            <div class="partners-block m-b-md">
                <div class="partners-block-title">
                    Спонсоры
                </div>
                <?
                    global $projectSponsorsFilter;
                    $projectSponsorsFilter = ['ID' => $arResult['PROPERTIES']['SPONSORS']['VALUE']];
                    $APPLICATION->IncludeComponent("bitrix:news.list", "mainsite-partners-on-projects", array(
                      "FILTER_NAME" => "projectSponsorsFilter",
                      "IBLOCK_ID" => "8",
                      "NEWS_COUNT" => "5",
                      "SORT_BY1" => "ID",
                      "SORT_ORDER1" => "DESC",
                      "FIELD_CODE" => array("DATE_CREATE", "ACTIVE_FROM"),
                      "PROPERTY_CODE" => array("*"),
                      "SET_TITLE" => "N",
                      "SET_STATUS_404" => "N",
                      "INCLUDE_IBLOCK_INTO_CHAIN" => "N",
                      "ADD_SECTIONS_CHAIN" => "N",
                      "PARENT_SECTION" => "",
                      "PARENT_SECTION_CODE" => "",
                      "DISPLAY_TOP_PAGER" => "N",
                      "DISPLAY_BOTTOM_PAGER" => "N",
                      "PAGER_SHOW_ALWAYS" => "N",
                      "PAGER_TEMPLATE" => "main",
                      "CACHE_TYPE" => "A",
                      "CACHE_TIME" => "360000",
                      "CACHE_FILTER" => "N",
                      "CACHE_GROUPS" => "N",
                    ),
                    false
                  );
                ?>
            </div>
        <? endif ?>
    </div>
    <div class="main-sidebar main-sidebar-right">
        <?
            global $projectNewsFilter;
            $projectNewsFilter = ['PROPERTY_PROJECTS' => $arResult['ID']];
            $APPLICATION->IncludeComponent("bitrix:news.list", "mainsite-news-on-projects", array(
              "FILTER_NAME" => "projectNewsFilter",
              "IBLOCK_ID" => "5",
              "NEWS_COUNT" => "5",
              "SORT_BY1" => "ID",
              "SORT_ORDER1" => "DESC",
              "FIELD_CODE" => array("DATE_CREATE", "ACTIVE_FROM"),
              "PROPERTY_CODE" => array("*"),
              "SET_TITLE" => "N",
              "SET_STATUS_404" => "N",
              "INCLUDE_IBLOCK_INTO_CHAIN" => "N",
              "ADD_SECTIONS_CHAIN" => "N",
              "PARENT_SECTION" => "",
              "PARENT_SECTION_CODE" => "",
              "DISPLAY_TOP_PAGER" => "N",
              "DISPLAY_BOTTOM_PAGER" => "N",
              "PAGER_SHOW_ALWAYS" => "N",
              "PAGER_TEMPLATE" => "main",
              "CACHE_TYPE" => "A",
              "CACHE_TIME" => "360000",
              "CACHE_FILTER" => "N",
              "CACHE_GROUPS" => "N",
            ),
            false
          );
        ?>
    </div>
</div>
