<?php
if ($arResult['PROPERTIES']['DONATIONS']['VALUE']){
  $colors = [
    'project-preview-donation-bar-green',
    'project-preview-donation-bar-lily',
    'project-preview-donation-bar-red',
    'project-preview-donation-bar-yellow',
    'project-preview-donation-bar-blue',
  ];

  $total = $arResult['PROPERTIES']['GOAL']['VALUE'];
  $collected = $arResult['PROPERTIES']['COLLECTED']['VALUE'];
  $donationsSum = 0;
  $arResult['percentsLeft'] = 100;

  $donations = [];
  $tmp = explode(PHP_EOL, $arResult['PROPERTIES']['DONATIONS']['VALUE']['TEXT']);

  foreach ($tmp as $k => $row){
    $explodedRow = explode(' ', $row);

    $donationValue = $explodedRow[count($explodedRow) - 1];
    unset($explodedRow[count($explodedRow) - 1]);
    $donationTitle = implode(' ', $explodedRow);
    $donationPercent = round($donationValue / $total * 100);

    $colorIndex = ($k % count($colors));

    $arResult['percentsLeft'] -= $donationPercent;

    $donations[] = [
      'value' => $donationValue,
      'title' => $donationTitle,
      'percent' => $donationPercent,
      'color' => $colors[$colorIndex]
    ];

    $donationsSum += $donationValue;
  }

  if ($collected > $donationsSum){
    $colorIndex = ($colorIndex + 1) % count($colors);

    $donations[] = [
      'value' => $collected - $donationsSum,
      'title' => 'Нерегулярные частные пожертвования',
      'percent' => round(($collected - $donationsSum) / $total * 100),
      'color' => $colors[$colorIndex]
    ];

    $arResult['percentsLeft'] -= round(($collected - $donationsSum) / $total * 100);
  }

  $arResult['donations'] = $donations;

  $steps = [];

  if ($arResult['PROPERTIES']['STEPS']['VALUE']['TEXT']){
    $tmp = explode(PHP_EOL, $arResult['PROPERTIES']['STEPS']['VALUE']['TEXT']);
    foreach ($tmp as $k => $row){
      $explodedRow = explode(' ', $row);
      $stepValue = intval($explodedRow[count($explodedRow) - 1]);
      unset($explodedRow[count($explodedRow) - 1]);
      $stepTitle = implode(' ', $explodedRow);

      $steps[] = [
        'value' => $stepValue,
        'title' => $stepTitle
      ];
    }

    $steps[0]['value'] += 3;
    $steps[count($steps) - 1]['value'] -= 5;
  }

  $arResult['steps'] = $steps;

}



?>