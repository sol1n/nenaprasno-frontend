<? if ($arResult['ITEMS']): ?>
  <? foreach ($arResult['ITEMS'] as $item): ?>
    <?
      if ($arParams['answers']){
        $tactics = $arParams['answers'][$item['ID']]['answers']['tactics']; 
        $diagnoses = $arParams['answers'][$item['ID']]['answers']['diagnoses']; 
      }
    ?>
    <div class="question-form-title-2"><?=$item['NAME']?></div>

    <div class="question-form-group">
        <div class="question-form-text-description">
            <?=$item['PREVIEW_TEXT']?>
        </div>
        <label for="task-<?=$item['ID']?>-diag" class="question-form-label question-form-label-small">
            Диагноз
        </label>
        <textarea name="diagnoses[<?=$item['ID']?>]" id="task-<?=$item['ID']?>-diag" class="question-form-textarea" cols="30" rows="10" placeholder="Список диагнозов от наиболее вероятного к наименее вероятному" required><?=$diagnoses?></textarea>
    </div>

    <div class="question-form-group">
        <label for="task-<?=$item['ID']?>-tactics" class="question-form-label question-form-label-small">
            Тактика действий
        </label>
        <textarea name="tactics[<?=$item['ID']?>]" id="task-<?=$item['ID']?>-tactics" class="question-form-textarea" cols="30" rows="10" placeholder="Опишите последовательно тактики ваших действий" required><?=$tactics?></textarea>
    </div>
  <? endforeach ?>
<? endif ?>