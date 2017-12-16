<?
if(!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true)
	die();
?>
    <footer class="footer">
        <div class="wrapper">
            &copy; Живу не напрасно, 2017
        </div>
    </footer>
    <script src="/assets/scripts.js"></script>
    <? if (CSite::InDir('/test/')): ?>
        <script>vueApp.activateForm();</script>
    <? endif ?>

    <!-- Yandex.Metrika counter -->
    <script src="https://mc.yandex.ru/metrika/watch.js" type="text/javascript"></script>
    <script type="text/javascript">
    try {
        var yaCounter24911267 = new Ya.Metrika({
            id:24911267,
            clickmap:true,
            trackLinks:true,
            accurateTrackBounce:true,
            webvisor:true
        });
    } catch(e) { }
    </script>
    <noscript><div><img src="https://mc.yandex.ru/watch/24911267" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
    <!-- /Yandex.Metrika counter -->

	</body>
</html>