<? if (count($arResult['ITEMS'])): ?>
    <div class="projects-block-items">
        <? foreach ($arResult['ITEMS'] as $item): ?>
            <div class="projects-block-items-col">
                <div class="projects-block-item">

                    <div class="projects-block-item-image">
                        <a href="<?=$item['DETAIL_PAGE_URL']?>">
                            <? $img = CFile::ResizeImageGet($item['PREVIEW_PICTURE']['ID'], array('width'=>740, 'height'=>440), BX_RESIZE_IMAGE_PROPORTIONAL, true); ?>
                            <img src="<?=$img['src']?>" alt="<?=$item['NAME']?>">
                        </a>
                    </div>
                    <div class="projects-block-item-padding">
                        <div class="projects-block-item-title">
                            <a href="<?=$item['DETAIL_PAGE_URL']?>">
                                <?=$item['NAME']?>
                            </a>
                        </div>
                        <div class="projects-block-item-desc">
                            <?=$item['PREVIEW_TEXT']?>
                        </div>
                    </div>
                    <?if($item['PROPERTIES']['CANDONATE']['VALUE']=='Y'):?>
                        <div class="projects-block-item-donate">
                            <? if ( !empty($item['PROPERTIES']['COLLECTED']['VALUE']) && !empty($item['PROPERTIES']['GOAL']['VALUE'])): ?>
                                <? $percent = ceil($item['PROPERTIES']['COLLECTED']['VALUE'] / $item['PROPERTIES']['GOAL']['VALUE'] * 100) ?>
                                <div class="projects-block-item-donate-bar">
                                    <div class="projects-block-item-donate-bar-active" style="width: <?=$percent?>%;"></div>
                                </div>
                            <? endif ?>
                            <? if ( !empty($item['PROPERTIES']['COLLECTED']['VALUE']) ) : ?>
                                <div class="projects-block-item-donate-collected">
                                    <div class="projects-block-item-donate-title">Собрано</div>
                                    <b><?=number_format($item['PROPERTIES']['COLLECTED']['VALUE'], 0, '.', ' ')?> Р.</b>
                                </div>
                            <? endif; ?>
                            <? if ( !empty($item['PROPERTIES']['GOAL']['VALUE']) ) : ?>
                            <div class="projects-block-item-donate-goal">
                                <div class="projects-block-item-donate-title">Цель проекта</div>
                                <b><?=number_format($item['PROPERTIES']['GOAL']['VALUE'], 0, '.', ' ')?> Р.</b>
                            </div>
                            <? endif; ?>
                            <div class="projects-block-item-donate-button">
                                <? if ($item['PROPERTIES']['CANDONATE']['VALUE'] == 'Y'): ?>
                                    <a href="/#donate-<?=$item['ID']?>" class="button button-small button-round button-orange">Поддержать</a>
                                <? endif ?>
                            </div>
                        </div>
                    <? endif ?>
                </div>
            </div>
        <? endforeach ?>
    </div>
<? endif ?>
