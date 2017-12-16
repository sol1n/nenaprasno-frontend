<?
if(!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true)
	die();
?>
    <footer class="main-footer">
        &copy; Фонд профилактики рака, 2017
    </footer>

    <? if (CSite::InDir('/screen/')): ?>
        <script src="/assets/scripts.js"></script>
        <script src="/assets/screen/app.js"></script>
        <script src="https://code.jquery.com/jquery-1.12.4.min.js"></script>
        <link rel="stylesheet" href="/assets/screen/nenaprasno-form.css">
        <link rel="stylesheet" href="/assets/screen/nenaprasno-form-1.css">
    <? else: ?>
        <script src="/assets/scripts.js"></script>
        <script async src="https://widget.cloudpayments.ru/bundles/cloudpayments"></script>
        <script async src="/assets/payments.js?p=<?=time()?>"></script>
    <? endif ?>

    <!-- Yandex.Metrika counter -->
    <script type="text/javascript">
        (function (d, w, c) {
            (w[c] = w[c] || []).push(function() {
                try {
                    w.yaCounter24911267 = new Ya.Metrika({
                        id:24911267,
                        clickmap:true,
                        trackLinks:true,
                        accurateTrackBounce:true
                    });
                } catch(e) { }
            });

            var n = d.getElementsByTagName("script")[0],
                s = d.createElement("script"),
                f = function () { n.parentNode.insertBefore(s, n); };
            s.type = "text/javascript";
            s.async = true;
            s.src = "https://mc.yandex.ru/metrika/watch.js";

            if (w.opera == "[object Opera]") {
                d.addEventListener("DOMContentLoaded", f, false);
            } else { f(); }
        })(document, window, "yandex_metrika_callbacks");
    </script>
    <noscript><div><img src="https://mc.yandex.ru/watch/24911267" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
    <!-- /Yandex.Metrika counter -->
	</body>
</html>
