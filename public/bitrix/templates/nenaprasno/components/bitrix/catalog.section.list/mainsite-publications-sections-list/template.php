<? if (count($arResult['SECTIONS'])): ?>
    <nav class="main-sidebar-menu">
        <ul>
            <? foreach ($arResult['SECTIONS'] as $item): ?>
                <? if ($item['CODE'] == $arParams['OPENED']): ?>
                    <li class="active">
                <? else: ?>
                    <li>
                <? endif ?>
                    <a href="<?=$item['SECTION_PAGE_URL']?>"><?=$item['NAME']?></a>
                </li>
            <? endforeach ?>
        </ul>
    </nav>
<? endif ?>