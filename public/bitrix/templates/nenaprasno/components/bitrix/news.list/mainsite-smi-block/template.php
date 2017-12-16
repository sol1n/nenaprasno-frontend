<? if (count($arResult['ITEMS'])): ?>
    <div class="reports-block-row">
        <div class="reports-block-col-content">
            <div class="row">
                <div class="col-sm-12">
                    <ul class="ul-blue">
                        <? foreach ($arResult['ITEMS'] as $item): ?>
                            <li>
                                <a target="_blank" href="<?=$item['PROPERTIES']['LINK']['VALUE']?>">
                                    <?=$item['NAME']?>
                                </a>
                            </li>
                        <? endforeach ?>
                    </ul>
                </div>
            </div>
        </div>
    </div>
<? endif ?>
