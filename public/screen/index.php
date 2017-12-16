<?
require($_SERVER['DOCUMENT_ROOT'].'/bitrix/header.php');
$APPLICATION->SetTitle('Главная');
?> 
<div id="app" data-form-id="1">
  <main class="main-content">
      <div class="wrapper">
          <form-app :form="formData"></form-app>
      </div>
  </main>
</div>

<section class="testers-counter-block">
    <div class="wrapper">
        <div class="testers-counter-block-icon">
            <img src="/assets/images/icons-testers.png" alt="">
        </div>
        <div class="testers-counter-block-num">
            146 083
        </div>
        <div class="testers-counter-block-desc">
            людей протестировано
        </div>
    </div>
</section>

<section class="how-test-works-block p-t-xxl p-b-xxl">
    <div class="wrapper">
        <div class="block-title how-test-works-block-title">
            Как работает тестирование?
        </div>

        <div class="how-test-works-block-items">
            <div class="how-test-works-block-item">
                <div class="how-test-works-block-item-icon">
                  <?php echo file_get_contents($_SERVER['DOCUMENT_ROOT'] . "/assets/images/icon-how-test-works-test.svg"); ?>
                </div>
                <div class="how-test-works-block-item-text">
                    Пройдите простой тест и узнайте свой риск рака
                </div>

                <div class="how-test-works-block-item-num">
                    1
                </div>
            </div>

            <div class="how-test-works-block-item">
                <div class="how-test-works-block-item-icon">
                  <?php echo file_get_contents($_SERVER['DOCUMENT_ROOT'] . "/assets/images/icon-how-test-works-calendar.svg"); ?>
                </div>
                <div class="how-test-works-block-item-text">
                    Получите индивидуальный
                    график обследований
                </div>

                <div class="how-test-works-block-item-num">
                    2
                </div>
            </div>

            <div class="how-test-works-block-item">
                <div class="how-test-works-block-item-icon">
                    <?php echo file_get_contents($_SERVER['DOCUMENT_ROOT'] . "/assets/images/icon-how-test-works-clinic.svg"); ?>
                </div>
                <div class="how-test-works-block-item-text">
                    Запишитесь в один клик
                    в проверенную клинику
                </div>
                <div class="how-test-works-block-item-num">
                    3
                </div>
            </div>

            <div class="how-test-works-block-item">
                <div class="how-test-works-block-item-icon">
                  <?php echo file_get_contents($_SERVER['DOCUMENT_ROOT'] . "/assets/images/icon-how-test-works-email.svg"); ?>
                </div>
                <div class="how-test-works-block-item-text">
                    Получайте регулярные
                    напоминания о необходимых
                    обследованиях на почту
                </div>
                <div class="how-test-works-block-item-num">
                    4
                </div>
            </div>
        </div>
    </div>
</section>

<?$APPLICATION->IncludeComponent("bitrix:catalog.section.list", "mainsite-logotypes",
  Array(
          "VIEW_MODE" => "TEXT",
          "SHOW_PARENT_NAME" => "Y",
          "IBLOCK_TYPE" => "",
          "IBLOCK_ID" => "21",
          "SECTION_ID" => "",
          "SECTION_CODE" => "",
          "SECTION_URL" => "",
          "COUNT_ELEMENTS" => "Y",
          "TOP_DEPTH" => "1",
          "SECTION_FIELDS" => "",
          "SECTION_USER_FIELDS" => "",
          "ADD_SECTIONS_CHAIN" => "Y",
          "CACHE_TYPE" => "A",
          "CACHE_TIME" => "36000000",
          "CACHE_NOTES" => "",
          "CACHE_GROUPS" => "Y"
      )   
  );
?>

<?
require($_SERVER['DOCUMENT_ROOT'].'/bitrix/footer.php');
?>