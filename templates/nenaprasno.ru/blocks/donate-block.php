<section class="donate-block p-t-xl p-b-xl b-gray">
    <div class="wrapper">
        <div class="block-title">
            <span>Помочь прямо сейчас</span>
        </div>

        <div class="donate-block-row">
            <div class="donate-block-row-col donate-block-row-col-form">
                <form action="#" method="POST" class="donate-block-form">
                    <div class="donate-block-form-tabs">
                        <a href="#donate-block-internet" data-toggle data-toggle-group="donate-block-type" class="donate-block-form-tabs-item active">
                            <div class="donate-block-form-tabs-item-title">
                                Через интернет
                            </div>
                            Банковской картой или через интернет
                        </a>
                        <a href="#donate-block-sberbank" data-toggle data-toggle-group="donate-block-type" class="donate-block-form-tabs-item">
                            <div class="donate-block-form-tabs-item-title">
                                Через «Сбербанк»
                            </div>
                            Распечатать квитанцию и оплатить в банке
                        </a>
                    </div>
                    <div id="donate-block-internet" class="donate-block-form-tab active">
                        <div class="donate-block-form-padding">
                            <label class="donate-block-form-label">Тип платежа</label>

                            <div class="donate-block-form-payment-type">
                                <div class="donate-block-form-custom-radio donate-block-form-payment-type-item">
                                    <input id="donate-block-payment-type-1" type="radio" checked name="payment-type">
                                    <label for="donate-block-payment-type-1">Разовое</label>
                                </div>
                                <div class="donate-block-form-custom-radio donate-block-form-payment-type-item">
                                    <input id="donate-block-payment-type-2" type="radio" name="payment-type">
                                    <label for="donate-block-payment-type-2">Ежемесячно</label>
                                </div>
                            </div>

                            <label class="donate-block-form-label">Сумма пожертвования</label>
                            <div class="donate-block-form-payment-value">
                                <div class="row">
                                    <div class="col-xs-4">
                                        <div class="donate-block-form-custom-radio donate-block-form-payment-value-item">
                                            <input id="donate-block-payment-100" type="radio" name="payment-value" value="100" checked>
                                            <label for="donate-block-payment-100">100 руб.</label>
                                        </div>
                                    </div>
                                    <div class="col-xs-4">
                                        <div class="donate-block-form-custom-radio donate-block-form-payment-value-item">
                                            <input id="donate-block-payment-500" type="radio" name="payment-value" value="500">
                                            <label for="donate-block-payment-500">500 руб.</label>
                                        </div>
                                    </div>
                                    <div class="col-xs-4">
                                        <div class="donate-block-form-custom-radio donate-block-form-payment-value-item">
                                            <input id="donate-block-payment-1000" type="radio" name="payment-value" value="1000">
                                            <label for="donate-block-payment-1000">1 000 руб.</label>
                                        </div>
                                    </div>
                                    <div class="col-xs-4">
                                        <div class="donate-block-form-custom-radio donate-block-form-payment-value-item">
                                            <input id="donate-block-payment-2000" type="radio" name="payment-value" value="2000">
                                            <label for="donate-block-payment-2000">2 000 руб.</label>
                                        </div>
                                    </div>
                                    <div class="col-xs-4">
                                        <div class="donate-block-form-custom-radio donate-block-form-payment-value-item">
                                            <input id="donate-block-payment-5000" type="radio" name="payment-value" value="5000">
                                            <label for="donate-block-payment-5000">5 000 руб.</label>
                                        </div>
                                    </div>
                                    <div class="col-xs-4">
                                        <div class="donate-block-form-custom-radio donate-block-form-payment-value-item">
                                            <input id="donate-block-payment-10000" type="radio" name="payment-value" value="10000">
                                            <label for="donate-block-payment-10000">10 000 руб.</label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-xs-12 col-sm-6 m-b-md">
                                    <label class="donate-block-form-label">Другая сумма</label>
                                    <input type="text" class="form-input donate-block-form-input" placeholder="руб.">
                                </div>
                                <div class="col-xs-12 col-sm-6 m-b-md">
                                    <label class="donate-block-form-label">Поддержать проект</label>
                                    <div class="donate-block-form-select">
                                        <select name="donate-type">
                                            <option value="1">Общее пожертвование</option>
                                            <option value="2">Общее пожертвование</option>
                                            <option value="3">Общее пожертвование</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div class="m-b-md">
                                <label class="donate-block-form-label">E-mail</label>
                                <input type="email" class="form-input donate-block-form-input" required placeholder="example@domain.com">
                            </div>

                            <div class="donate-block-form-user">
                                <div class="donate-block-form-user-select">
                                    <div class="donate-block-form-user-select-item">
                                        <div class="form-control-radio">
                                            <input id="donate-block-user-0" type="radio" name="user-select" value="0" checked autocomplete="off" onchange="if($(this).val() == 0) { $('#js-donate-block-user').hide().find('input').attr('disabled', true); } else { $('#js-donate-block-user').show();} ">
                                            <label for="donate-block-user-0">Анонимно</label>
                                        </div>
                                    </div>
                                    <div class="donate-block-form-user-select-item">
                                        <div class="form-control-radio">
                                            <input id="donate-block-user-1" type="radio" name="user-select" value="1" autocomplete="off" onchange="if($(this).val() == 1) { $('#js-donate-block-user').show().find('input').attr('disabled', false); } else { $('#js-donate-block-user').hide();} ">
                                            <label for="donate-block-user-1">Представьтесь</label>
                                        </div>
                                    </div>
                                </div>

                                <div id="js-donate-block-user" class="row" style="display: none;">
                                    <div class="col-xs-12 col-sm-6 m-t-md m-b-md">
                                        <label class="donate-block-form-label">Имя</label>
                                        <input type="text" name="name" class="form-input donate-block-form-input" required disabled placeholder="Как вас зовут?">
                                    </div>
                                    <div class="col-xs-12 col-sm-6 m-t-md m-b-md">
                                        <label class="donate-block-form-label">Фамилия</label>
                                        <input type="text" name="lastname" class="form-input donate-block-form-input" required disabled placeholder="Как ваша фамилия?">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="donate-block-form-footer">
                            <div class="donate-block-form-padding">
                                <div class="row">
                                    <div class="col-xs-6 col-sm-4">
                                        <div class="donate-block-form-agreement">
                                            <div class="form-control-checkbox">
                                                <input id="donate-block-agreement" type="checkbox" name="agreement" required>
                                                <label for="donate-block-agreement">
                                                    Согласен с <a href="#">офертой</a>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-xs-6 col-sm-8 text-right">
                                        <button class="button button-orange button-round donate-block-form-submit">Продолжить</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="donate-block-sberbank" class="donate-block-form-tab">
                        <div class="donate-block-form-padding">
                            <div class="donate-block-form-bank">
                                <div class="donate-block-form-bank-icon">
                                    <?php include "images/icon-donate-download.svg"; ?>
                                </div>
                                <div class="donate-block-form-bank-desc">
                                    Скачайте и распечатайте квитанцию, <br>
                                    заполните необходимые поля и оплатите ее <br>
                                    в любом банке.
                                </div>

                                <div class="donate-block-form-bank-buttons">
                                    <a href="#" class="button button-orange button-round">
                                        Скачать квитанцию
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="donate-block-form-footer">
                            <div class="donate-block-form-padding">
                                Пожертвование осуществляется на условиях <a href="#" target="_blank">Публичной офертой</a>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            <div class="donate-block-row-col donate-block-row-col-comment">
                <div class="donate-block-comment">
                    <div class="donate-block-comment-title">
                        Куда будут потрачены собранные средства?
                    </div>
                    <p>В 2015 году мы запустили собственный образовательный проект &mdash; «Программу подготовки молодых онкологов». Это наш ответ на ухудшающуюся ситуацию с системой образования специалистов в сфере онкологии.</p>

                    <p>Ведь сейчас в России наблюдается острая нехватка квалифицированных онкологов, а на одного врача приходится порядка 500 пациентов. При этом, ежегодно от разных видов рака умирает около 500 000 человек, а число заболевших постоянно растет. Мы поставили перед собой цель &mdash; обучить и подготовить по международным стандартам новое поколение специалистов-онкологов.</p>

                    <div class="donate-block-comment-author">
                        <div class="donate-block-comment-author-photo">
                            <div class="donate-block-comment-author-photo-wrap">
                                <img src="http://placekitten.com/160/160" alt="">
                            </div>
                        </div>

                        <div class="donate-block-comment-author-meta">
                            <div class="donate-block-comment-author-meta-name">
                                Илья Фоминцев
                            </div>
                            <div class="donate-block-comment-author-meta-title">
                                Исполнительный директор «Фонда
                                профилактики рака»
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>