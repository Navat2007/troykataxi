<?php

session_start();

$page_name = 'Оформление заказа';
$page_href = '';
$meta_desc = '';

include $_SESSION['root'] . 'config.php';

$auto = $_POST["auto"];
$amount = $_POST["amount"];
$from = $_POST["from"];
$to = $_POST["to"];
$from_key = $_POST["from_key"];
$to_key = $_POST["to_key"];
$passengers = $_POST["passengers"];
$adult = $_POST["adult"];
$child = $_POST["child"];

if (empty($amount)) {
    $new_url = './';
    header('Location: ' . $new_url);
}

?>
  <section id="orderContainer">
    <div class="container">
      <div class="row">
        <div class="col-md-8">
          <!-- ORDER -->
          <form action="php/sendAMO.php" method="post" class="order" id="order_form"
                onsubmit="yaCounter51784160.reachGoal('zakaz'); return true;">
            <input type="hidden" name="action" value="order">
            <input type="hidden" name="car" value="<?= $auto; ?> ">
            <input type="hidden" name="passengers" value="<?= $passengers; ?> ">
            <input type="hidden" name="adult" value="<?= $adult; ?> ">
            <input type="hidden" name="child" value="<?= $child; ?> ">
            <input type="hidden" name="from" value="<?= $from; ?> ">
            <input type="hidden" name="to" value="<?= $to; ?> ">
            <input type="hidden" name="price" id="price_input" value="<?= $amount; ?> ">

            <div class="row order__col">
              <div class="col-12 order__title"><p>Информация о трансфере</p></div>
              <div class="col-12 order__way">
                <p><?= $from; ?> — <?= $to; ?></p>
              </div>
            </div>
            <div class="row">
                <?php
                if ($from_key == "Air") {
                    ?>

                  <div class="col-md-6 textfield">
                    <!--                                    <label class="textfield__label">Номер рейса</label>-->
                    <input class="textfield__input" type="text" name="flight" required
                           id="flight_input" placeholder="Номер рейса">
                  </div>
                  <div class="col-md-6 textfield">
                    <!--                                    <label class="textfield__label">Кол-во багажа</label>-->
                    <input class="textfield__input" type="number" min="0" name="luggage"
                           id="luggage_input" placeholder="Кол-во багажа">
                  </div>

                    <?php
                }
                ?>
              <div class="col-md-6 textfield">
                <!--                                <label class="textfield__label">Дата и время</label>-->
                <input class="textfield__input form_datetime" autocomplete="off" type="text" name="date"
                       required id="date_input" placeholder="Дата и время">
              </div>
              <div class="col-md-6 textfield">
                <!--                                <label class="textfield__label">Имя</label>-->
                <input class="textfield__input" type="text" name="name" required id="name_input"
                       placeholder="Имя">
              </div>
              <div class="col-md-6 textfield">
                <!--                                <label class="textfield__label">Телефон</label>-->
                <input class="textfield__input" type="phone" name="phone" minlength="11" required
                       id="phone_input" placeholder="Телефон">
              </div>
              <div class="col-md-6 textfield">
                <!--                                <label class="textfield__label">EMAIL</label>-->
                <input class="textfield__input" type="email" name="email" required id="email_input"
                       placeholder="EMAIL">
              </div>

                <?php
                if ($from_key == "") {
                    ?>

                  <div class="col textfield">
                    <!--                                    <label class="textfield__label">Место отправления</label>-->
                    <input class="textfield__input" type="text" name="place_from" id="place_from_input"
                           placeholder="Место отправления" required>
                  </div>

                    <?php
                }
                ?>

                <?php
                if ($to_key == "") {
                    ?>

                  <div class="col textfield">
                    <!--                                    <label class="textfield__label">Место назначения</label>-->
                    <input class="textfield__input" type="text" name="place_to" id="place_to_input"
                           placeholder="Место назначения" required>
                  </div>

                    <?php
                }
                ?>

              <div class="col-12 textfield d-flex align-items-center">
                <input type="checkbox" name="round" id="round_input">
                <label class="agreement" for="round_input"><span>Обратный трансфер</span></label>
              </div>

              <div class="col-12 textfield" id="round_date_cont" style="display: none;">
                <!--                                <label class="textfield__label">Дата и время</label>-->
                <input class="textfield__input form_datetime" type="text" autocomplete="off"
                       name="round_date" id="round_date_input" placeholder="Дата и время">
              </div>

              <div class="col-12 textfield">
                <!--                                <label class="textfield__label">Примечание к заказу (необязательно)</label>-->
                <input class="textfield__input" type="text" name="note" id="note_input"
                       placeholder="Примечание к заказу (необязательно)">
              </div>
              <div class="col-auto textfield d-flex align-items-center">
                <input type="checkbox" id="agreePolicy" required>
                <label class="agreement" for="agreePolicy"><span>Я согласен с условиями <a
                        href="view/politika.php"
                        target="_blank">Политики конфиденциальности.</a></span>
              </div>
              <div class="col-auto ml-auto textfield">
                <input class="textfield__inputSubmit" type="submit" id="order_btn"
                       value="ОФОРМИТЬ ЗАКАЗ">
              </div>
            </div>
          </form>
        </div>
        <div class="col-md-4">
          <div class="summary">
            <p class="summary__head">
              <strong>Ваш трансфер: </strong>
              <span><?= $auto; ?></span>
            </p>
            <div class="summary__route">
              <div class="summary__place">
                <p id="from"><?= $from; ?></p>
                <p id="date"></p>
                <p><?= $passengers; ?></p>
              </div>
              <div class="summary__place">
                <p id="to"><?= $to; ?></p>
              </div>
            </div>
            <div class="summary__route" id="round_cont" style="display: none;">
              <div class="summary__place">
                <p id="round_from"></p>
                <p id="round_date"></p>
              </div>
              <div class="summary__place">
                <p id="round_to"></p>
              </div>
            </div>
            <div class="summary__route">
              <div class="summary__subtitle" id="name"></div>
              <p id="email"></p>
              <p id="phone"></p>
            </div>
            <div class="summary__subtitle">Стоимость трансфера</div>
            <div class="summary__price">
              <p>Поездка</p>
              <p><span id="amount"><?= $amount; ?> THB</span></p>
            </div>
            <div class="summary__price" id="round_price">
              <p>Обратный трансфер</p>
              <p><span id="round_amount"><?php if (!$round_amount) {
                          $round_amount = 0;
                      }
                      echo $round_amount; ?></span></p>
            </div>
            <div class="summary__total">
              <p>Итого:</p>
              <div data-booking-cost="3733">
                <p id="summ"><?= $amount; ?></p>
                <span id="summ_other"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <script async src="js/libs/bootstrap-datetimepicker.min.js"></script>
  <script async src="js/libs/bootstrap-datetimepicker.ru.js"></script>
<?php
require_once $_SESSION['root'] . 'view/main/footer.php';
?>