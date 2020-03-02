<?php

// Включен режим разработки?
$test = false;
$version = rand();
$versionJs = ".js?" . $version; // Для сжатия JS файлов
$site_base = '/';
$file = 'php/headlings.csv';

if (strpos($_SERVER['DOCUMENT_ROOT'], 'D:/') !== false) {
    $_SERVER['DOCUMENT_ROOT'] = 'D:/XAMPP/htdocs/troykataxi/';
    $site_base = '/troykataxi/public/';
    $file = 'public/php/headlings.csv';
} else {
    if ($test == false) {
        $version = '010'; // 02.03.2020
        $versionJs = ".min.js?" . $version;
    }
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
    'js/libs/qrcode.js',
    'js/libs/js.cookie.js',
    'js/scripts' . $versionJs,
);

// UTM - метки и заголовки
$utm_term = '';
$h1 = 'Узнай стоимость такси на Пхукете';

if (isset($_GET['utm_source'])) {
    foreach ($_GET as $key => $val) {
        if (0 === strpos($key, 'utm_content')) {
            $utm_term .= "$val";
        }
    }
}

function kama_parse_csv_file($file_path, $file_encodings = ['cp1251', 'UTF-8'], $col_delimiter = '', $row_delimiter = "")
{

    if (!file_exists($file_path))
        return false;

    $cont = trim(file_get_contents($file_path));

    $encoded_cont = mb_convert_encoding($cont, 'UTF-8', mb_detect_encoding($cont, $file_encodings));

    unset($cont);

    // определим разделитель
    if (!$row_delimiter) {
        $row_delimiter = "\r\n";
        if (false === strpos($encoded_cont, "\r\n"))
            $row_delimiter = "\n";
    }

    $lines = explode($row_delimiter, trim($encoded_cont));
    $lines = array_filter($lines);
    $lines = array_map('trim', $lines);

    // авто-определим разделитель из двух возможных: ';' или ','.
    // для расчета берем не больше 30 строк
    if (!$col_delimiter) {
        $lines10 = array_slice($lines, 0, 30);

        // если в строке нет одного из разделителей, то значит другой точно он...
        foreach ($lines10 as $line) {
            if (!strpos($line, ',')) $col_delimiter = ';';
            if (!strpos($line, ';')) $col_delimiter = ',';

            if ($col_delimiter) break;
        }

        // если первый способ не дал результатов, то погружаемся в задачу и считаем кол разделителей в каждой строке.
        // где больше одинаковых количеств найденного разделителя, тот и разделитель...
        if (!$col_delimiter) {
            $delim_counts = array(';' => array(), ',' => array());
            foreach ($lines10 as $line) {
                $delim_counts[','][] = substr_count($line, ',');
                $delim_counts[';'][] = substr_count($line, ';');
            }

            $delim_counts = array_map('array_filter', $delim_counts); // уберем нули

            // кол-во одинаковых значений массива - это потенциальный разделитель
            $delim_counts = array_map('array_count_values', $delim_counts);

            $delim_counts = array_map('max', $delim_counts); // берем только макс. значения вхождений

            if ($delim_counts[';'] === $delim_counts[','])
                return array('Не удалось определить разделитель колонок.');

            $col_delimiter = array_search(max($delim_counts), $delim_counts);
        }

    }

    $data = [];
    foreach ($lines as $key => $line) {
        $data[] = str_getcsv($line, $col_delimiter); // linedata
        unset($lines[$key]);
    }

    return $data;
}

$data = kama_parse_csv_file($file);

//$utm_term = 'phuket';

for ($i = 0; $i < count($data); $i++) {

    if ($utm_term == $data[$i][1]) {
        $h1 = $data[$i][0];
    }
}
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

  <meta name="description" content="<?php echo $open_graph['description']; ?>">
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

  <?php include $_SERVER['DOCUMENT_ROOT'] . '/ya.html'; ?>
</head>
<body>
<header class="a-header">
  <div class="a-header__wrap">
    <div class="a-header__logo"><img src="img/WhatsApp.png" alt="WhatsApp"></div>
    <i class="a-header__comment">Добавь телефон в список контактов <br>
      Чтобы не потерять!</i>
    <a class="a-header__link" href="tel:+66 80 514 03 33" rel="nofollow noopener" onclick="ym(51784160, 'reachGoal', 'shapka'); return true;">+66 80 514 03 33</a>
    <h1 class="a-header__title"><?= $h1; ?></h1>
  </div>
</header>
<section class="a-main">
  <div class="a-main__wrap">
    <h2 class="a-main__title">Выбери один из способов ниже</h2>
    <div class="a-main__section">
      <div class="a-main__item">
        <p class="a-btn --accent --md" style="cursor: default">Написать в WhatsApp</p>
        <i class="comment">Нажмите кнопку и Чат откроется в новом окне</i>
        <a class="a-btn --primary --md"
           target="_blank"
           onclick="ym(51784160, 'reachGoal', 'whats'); return true;"
           href="https://api.whatsapp.com/send?phone=66945800333&text= Для%20начала%20нажмите%20Отправить%20--->"
           rel="noopener nofollow">Открыть Чат</a>
      </div>
      <div class="a-main__item" id="qRCodeBlock">
        <p class="a-btn --accent --md" style="cursor: default">Сканировать QR</p>
        <i class="comment">Откройте Камеру или приложение для сканирования QR - кода.</i>
        <div class="qrcode" id="qRCode"></div>
      </div>
      <div class="a-main__item">
        <p class="a-btn --accent --md" style="cursor: default">Введите номер</p>
        <i class="comment">Введите номер телефона и Менеджер напишет в WhatsApp</i>
        <div class="a-textfield">
          <div class="a-textfield__inner">
            <input class="a-textfield__input"
                   type="tel"
                   id="sMtel"
                   pattern="(\+)?(\(\d{2,3}\) ?\d|\d)(([ \-]?\d)|( ?\(\d{2,3}\) ?)){5,12}\d"
                   data-mask="+7 (000) 000-00-00"
                   autocomplete="tel"
                   placeholder="+7 (___) ___-__-__"
                   required>
            <i class="a-textfield__icon"></i>
          </div>
          <span class="a-textfield__info">Поле не должно быть пустым!</span>
        </div>
        <button type="button" class="a-btn --primary --md" id="sMBtn">Напишите Мне</button>
      </div>
    </div>
  </div>
</section>
<section class="a-reviews">
  <div class="a-reviews__wrap">
    <h2 class="a-reviews__title">Отзывы</h2>
    <div class="discussions-vk a-reviews__section">
      <template id="comment-template" style="display: none">
        <div class="a-comment">
          <div class="a-comment__column-1">
            <a class="a-comment__logo" href="" target="_blank">
              <img class="a-comment__logo-image" src="https://vk.com/images/camera_100.png"
                   alt="logo-group">
            </a>
            <div class="a-comment__column-2">
              <div class="a-comment__header">
                <a class="a-comment__group-title" href="" target="_blank"></a>
                <a class="a-comment__comment-date" href="" target="_blank"></a>
              </div>
              <div class="a-comment__like">
                <p>
                  <i class="material-icons" alt="Количество лайков:">favorite</i>
                  <span class="a-comment__like-number"></span>
                </p>
                <p class="a-comment__online"></p>
              </div>
            </div>
          </div>
          <p class="a-comment__text-title"></p>
        </div>
      </template>
    </div>
  </div>
</section>
</body>
</html>

