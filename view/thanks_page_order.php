<?php
session_start();

$page_name = 'Ваш заказ успешно сформирован!';
$page_href = '';
$meta_desc = '';

include $_SESSION['root'] . 'config.php';
?>
<!--   <section id="main_menu">
    <div class="container">
      <ul class="row mainMenu">
        <li class="mainMenu__li">
          <a href="https://denisphuket.ru/ekskursii/?utm_source=taxi" target="_blank" class="customize-unpreviewable">экскурсии
            на пхукете</a>
        </li>
      </ul>
    </div>
  </section> -->
  <section id="orderContainer">
      <div class="container">
        <div class="row">
          <div class="col-auto order">
              <div class="order__complete">
                <p>Ваш заказ успешно сформирован!</p>
                <p>В ближайщее время с Вами свяжется наш диспетчер.</p>
              </div>
          </div>
        </div>
      </div>
    </section>
<?php
  require_once $_SESSION['root'] . 'view/main/footer.php'; 
?>