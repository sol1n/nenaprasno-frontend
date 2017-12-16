$(function(){
	var pay = function (pubkey, amount, email, description, firstname, lastname, recurr, order) {
		if (typeof cp == 'undefined'){
			alert('Оплата через cloudpayments временно недоступна, попробуйте повторить операцию позже, либо воспользуйтесь оплатой через электронные кошельки');
		}
		else{
			var widget = new cp.CloudPayments();
			var data = {firstname: firstname, lastname: lastname, email: email};
			if (recurr) {
				data.cloudPayments = {
					recurrent: { interval: 'Month',	period: 1 }
				}
			}
			widget.charge({
					publicId: pubkey,
					description: description,
					amount: amount,
					currency: 'RUB',
					accountId: email,
					data: data,
			invoiceId: order
				},
				function (data) {
			$.ajax({
			  type: "POST",
			  url: "/ajax/cp/",
			  data: data
			});
				},
				function (reason, options) {

				});
		}
	};

	var payment = function(data, form){
		

		if ($('[name=other-sum]').val()){
			data['sum'] = $('[name=other-sum]').val();
		}
		else{
			data['sum'] = $('[name=payment-value]:checked').val();
		}

		data['project'] = form.find('[name=donate-project]').val();
		data['email'] = form.find('[name=email]').val();
		data['name'] = form.find('[name=name]').val();
		data['lastname'] = form.find('[name=lastname]').val();

		$.ajax({
			type: "POST",
			url: "/ajax/payment/",
			data: data,
			dataType: 'JSON',
			success: function(msg){
			if (msg.success)
				if (msg.gate == 'robokassa'){
					document.location.href= msg.href;
				}
				else{
					pay(msg.pubkey, msg.sum, msg.email, msg.description, msg.firstname, msg.lastname, msg.regular, msg.order)
				}
				else{
					alert('Извините, в данный момент платежи не принимаются по техническим причинам');
				}
			}
		});

	};

/* old "back-button" function 
$('.donate-block-form-tabs a').on('click', function(){
	$('#donate-block-internet-once-payment').hide();
	var tab = $(this).attr('href');
	if(tab == '#donate-block-internet'){
		$('#donate-block-internet').show();
	}
	
	return false;
});
*/

/* new "back-button" function */
$("a[href^='#donate-block-internet']").on('click', function(){
	$('#donate-block-internet-once-payment').hide();
	$('#donate-block-internet-monthly-payment').hide();
	$('#donate-block-internet').show();
	return false;
});

$("a[href^='#donate-block-sberbank']").on('click', function(){
	$('#donate-block-internet-once-payment').hide();
	$('#donate-block-internet-monthly-payment').hide();
	$('#donate-block-sberbank').show();
	return false;
});

	$('#once-card').on('click', function(){
		var form = $('.donate-block-form');
		var data = {};
		data['type'] = 'once';
		data['gate'] = 'cp';
		payment(data, form);/*
		if ($('[name=other-sum]').val()){
			data['sum'] = $('[name=other-sum]').val();
		}
		else{
			data['sum'] = $('[name=payment-value]:checked').val();
		}


		data['project'] = form.find('[name=donate-project]').val();
		data['email'] = form.find('[name=email]').val();
		data['name'] = form.find('[name=name]').val();
		data['lastname'] = form.find('[name=lastname]').val();

		$.ajax({
		  type: "POST",
		  url: "/ajax/payment/",
		  data: data,
		  dataType: 'JSON',
		  success: function(msg){
			if (msg.success)
				pay(msg.pubkey, msg.sum, msg.email, msg.description, msg.firstname, msg.lastname, msg.regular, msg.order);
			else{
			  alert('Извините, в данный момент платежи не принимаются по техническим причинам');
			}
		  }
		});
*/
		return false;
	});

	$('#once-emoney').on('click', function(){
		var form = $('.donate-block-form');
		var data = {};
		data['type'] = 'once';
		data['gate'] = 'robokassa';
		payment(data, form);/*

		if ($('[name=other-sum]').val()){
			data['sum'] = $('[name=other-sum]').val();
		}
		else{
			data['sum'] = $('[name=payment-value]:checked').val();
		}

		data['project'] = form.find('[name=donate-project]').val();
		data['email'] = form.find('[name=email]').val();
		data['name'] = form.find('[name=name]').val();
		data['lastname'] = form.find('[name=lastname]').val();

		$.ajax({
		  type: "POST",
		  url: "/ajax/payment/",
		  data: data,
		  dataType: 'JSON',
		  success: function(msg){
			if (msg.success)
				document.location.href= msg.href;
			else{
			  alert('Извините, в данный момент платежи не принимаются по техническим причинам');
			}
		  }
		});*/

		return false;
	});

	$('[name=agreement]').on('click', function(){
		$('.form-control-checkbox label').removeClass('red');
		$('.oferta-error').hide();
	});

	$('.donate-block-form').on('submit', function(){

		if($('[name=agreement]:checked').val()!='ch'){
			$('.form-control-checkbox label').addClass('red');
			$('.oferta-error').show();
			return false;
		}
		else{
			$('.oferta-error').hide();
		}

		var form = $(this);
		var data = {};

		data['type'] = form.find('[name=payment-type]:checked').val();

			var sum_text = 100;
			if ($('[name=other-sum]').val()){
				sum_text = $('[name=other-sum]').val();
			}
			else{
				sum_text = $('[name=payment-value]:checked').val();
			}

			var project_text = form.find('[name=donate-project] option:selected').text();


		if (data['type']=='once'){
			$('#donate-block-internet').hide();
			$('#donate-block-internet-monthly-payment').hide();
			$('#donate-block-internet-once-payment').show();

			$('.internet-payment-text').html('Перевести '+sum_text+' руб. на '+project_text.toLowerCase());

			return false;
		}
		else{
			//$('#donate-block-internet').show();
			$('#donate-block-internet').hide();
			$('#donate-block-internet-once-payment').hide();
			$('#donate-block-internet-monthly-payment').show();

			$('.internet-payment-text').html('Ежемесячно переводить '+sum_text+' руб. на '+project_text.toLowerCase()
			+'<br><br><span>Ежемесячное пожертвование возможно только с банковской карты. По карты Maestro нельзя оформить регулярный платеж.</span>');

			//data['gate'] = form.find('[name=payment-gate]:checked').val(); //dr
			//payment(data, form); //dr
			/*
			if ($('[name=other-sum]').val()){
				data['sum'] = $('[name=other-sum]').val();
			}
			else{
				data['sum'] = $('[name=payment-value]:checked').val();
			}

			data['project'] = form.find('[name=donate-project]').val();
			data['email'] = form.find('[name=email]').val();
			data['name'] = form.find('[name=name]').val();
			data['lastname'] = form.find('[name=lastname]').val();

			$.ajax({
				type: "POST",
				url: "/ajax/payment/",
				data: data,
				dataType: 'JSON',
				success: function(msg){
				if (msg.success)
					if (msg.gate == 'robokassa'){
						document.location.href= msg.href;
					}
					else{
						pay(msg.pubkey, msg.sum, msg.email, msg.description, msg.firstname, msg.lastname, msg.regular, msg.order)
					}
					else{
						alert('Извините, в данный момент платежи не принимаются по техническим причинам');
					}
				}
			});*/

			return false;
		}
	});

	$('.button-pay-monthly').on('click', function(){
		var form = $('.donate-block-form');
		var data = {};

		data['type'] = form.find('[name=payment-type]:checked').val();

		payment(data, form);

		return false;
	});

	var scrollToDonate = function(){
		var hash = document.location.hash;
		if (hash && (hash.indexOf('donate-') != -1)){
			var id = hash.replace('#donate-', '') * 1;
			$('[name=donate-project]').val(id);
			$('html, body').animate({
          scrollTop: $('#donate').offset().top + 20
      }, 500);
		}
	}

	scrollToDonate();

	$(window).on('hashchange', function() {
		scrollToDonate();
	});
});
