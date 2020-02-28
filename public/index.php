<?php
// Если true - выгружаем на сайт - false - тестовый стенд
if (strpos($_SERVER['DOCUMENT_ROOT'], 'D:/') !== false) {
    $_SERVER['DOCUMENT_ROOT'] = 'D:/XAMPP/htdocs/troykataxi/';
    $version = rand();
    $versionJs = ".js?" . $version;
    $site_base = '/troykataxi/public/';

} else {
    $version = '001';
    $versionJs = ".min.js?" . $version;
    $site_base = '/';
}

$site_url = "https://troykataxi.ru"; // url-сайта

// OPEN GRAPH, JSON-LD
$open_graph = array(
    'type' => 'website', // website article
    'title' => "Такси на Пхукете из аэропорта: заказать онлайн 24 часа ✔", // Длинное название
    'site_name' => "Русское такси Тройка", // Короткое название
    'description' => "Заказывайте такси из Пхукета. Русскоязычная круглосуточная поддержка. 5 классов авто: от экономичных седанов до микроавтобусов. Скидка 30%", // Краткое описание
    'url' => $site_url,
    'image' => $site_url . '/favicon/icon_192x192.png', // путь до миниатюры
    'locale' => "ru_RU", // ru_RU
);

// ПОДКЛЮЧЕНИЕ СТИЛЕЙ
$styles_store = array(
    'https://fonts.googleapis.com/css?family=Lato&display=swap',
    'css/styles.min.css?' . $version,
);

//ПОДКЛЮЧЕНИЕ СКРИПТОВ
$scripts_store = array(
    '//ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js',
    'js/scripts.min.js?' . $version,
);

?>

<!DOCTYPE html>
<html lang="ru">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <meta http-equiv="X-UA-Compatible" content="ie=edge">

  <!--OG -->
    <?php
    if (!empty($open_graph) && is_array($open_graph)) {
        foreach ($open_graph AS $property => $content) {
            echo '<meta property="og:' . $property . '" content="' . $content . '">';
        }
    }
    ?>

  <meta name="description" content="<?php echo $meta_desc; ?>">
  <title><?php echo $open_graph['title']; ?></title>

  <!-- favicon -->
  <link rel="icon" type="image/png" href="favicon/icon_192x192.png">
  <link rel="manifest" href="manifest.json">
  <link rel="yandex-tableau-widget" href="manifest.json"/>

  <!-- CSS -->
  <base href="<?php echo $site_base; ?>">
    <?php
    if (!empty($styles_store) && is_array($styles_store)) {
        foreach ($styles_store AS $style) {
            echo '<link rel="stylesheet" href="' . $style . '">';
        }
    }

    if (!empty($scripts_store) && is_array($scripts_store)) {
        foreach ($scripts_store AS $script) {
            echo '<script src="' . $script . '"></script>';
        }
    }
    ?>
  <script>
      window.jQuery || document.write('<script src="js/libs/jquery.min.js"><\/script>')
  </script>
</head>
<body>
<header class="a-header">
  <div class="a-header__wrap">
    <div class="a-header__logo"><img src="img/WhatsApp.png" alt="WhatsApp"></div>
    <div class="a-header__tel">
      <i>Добавь телефон в список контактов <br>
        Чтобы не потерять!</i>
      <a href="tel:+66 80 514 03 33" rel="nofollow noopener">+66 80 514 03 33</a>
    </div>
    <h1 class="a-header__title">Узнай стоимость такси на Пхукете</h1>
  </div>
</header>
<section class="a-main">
  <div class="a-main__wrap">
    <h2 class="a-main__title">Выбери один из способов ниже</h2>
    <div class="a-main__section">
      <div class="a-main__item">
        <button type="button" class="a-btn --accent --md">Написать в WhatsApp</button>
        <i>Нажмите кнопку и Чат откроется в новом окне</i>
        <button type="button" class="a-btn --primary --md">Открыть Чат</button>
      </div>
      <div class="a-main__item">
        <button type="button" class="a-btn --accent --md">Сканировать QR</button>
        <i>Откройте Камеру или приложение для сканирования QR - кода.</i>
        <div class="qrcode"></div>
      </div>
      <div class="a-main__item">
        <button type="button" class="a-btn --accent --md">Введите номер</button>
        <i>Введите номер телефона и Менеджер напишет в WhatsApp</i>
        <div class="a-textfield">
          <div class="a-textfield__inner">
            <input class="a-textfield__input" type="tel">
          </div>
        </div>
        <button type="button" class="a-btn --primary --md">Напишите Мне</button>
      </div>
    </div>
  </div>
</section>
<section class="a-reviews">
  <div class="a-reviews__wrap">
    <h2 class="a-reviews__title">Отзывы</h2>
  </div>
</section>
</body>
</html>

