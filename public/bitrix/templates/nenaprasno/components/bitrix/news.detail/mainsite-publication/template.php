<style>
.news-img{
float:left;
margin: 1px 29px 10px 0;
max-width:320px;
height:auto;
}
</style>
<div class="news-img">
	<? $img = CFile::ResizeImageGet($arResult['DETAIL_PICTURE']['ID'], array('width'=>320, 'height'=>300), BX_RESIZE_IMAGE_PROPORTIONAL, true); ?>
	<img src="<?=$img['src']?>" alt="<?=$arResult['NAME']?>">
</div>
<div class="article-block m-b-lg">
	<?=$arResult['~DETAIL_TEXT']?>
</div>
