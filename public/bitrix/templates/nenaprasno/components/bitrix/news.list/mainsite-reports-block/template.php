<? if (count($arResult['ITEMS'])): ?>
    <? foreach ($arResult['years'] as $year => $records): ?>
    <div class="reports-block-row">
        <div class="reports-block-col-year">
            <?=$year?> год
        </div>
        <div class="reports-block-col-content">
            <div class="row">
                <? foreach ($records as $item): ?>
                <div class="col-sm-4">
                    <? $file = CFile::GetPath($item['PROPERTIES']['FILE']['VALUE']); ?>
                    <a target="_blank" href="<?=$file?>" class="reports-block-item">
                        <div class="reports-block-item-icon">
                            <?php include $_SERVER['DOCUMENT_ROOT'] . "/assets/images/icon-report-file.svg"; ?>
                        </div>
                        <div class="reports-block-item-content">
                            <div class="reports-block-item-title">
                                <?=$item['NAME']?>
                            </div>
                            <div class="reports-block-item-date">
                                <?=$item['PROPERTIES']['PERIOD']['VALUE']?>
                            </div>
                        </div>
                    </a>
                </div>
                <? endforeach ?>
            </div>
        </div>
    </div>
    <? endforeach ?>
<? endif ?>
