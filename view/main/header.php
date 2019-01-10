<!DOCTYPE html>
<html prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb#">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <meta http-equiv="X-UA-Compatible" content="ie=edge">

  <!--OG -->
    <?php
    if (!empty($open_graph) && is_array($open_graph)) {
        foreach ($open_graph AS $property => $content) {
            echo '<meta property="og:' . $property . '" content="' . $content .'">';
        }
    }
    ?>

  <meta name="description" content="<?php echo $meta_desc; ?>">
  <meta name="keywords" content="<?php echo $meta_key; ?>">
  <title><?php echo $page_name . ' | ' . $title; ?></title>

  <!-- favicon -->
  <link rel="icon" type="image/png" href="favicon/icon_192x192.png">
  <link rel="manifest" href="favicon/manifest.json">
  <link rel="yandex-tableau-widget" href="favicon/manifest.json"/>

  <!-- CSS -->
  <base href="<?php echo $site_base; ?>">
    <?php
    if (!empty($styles) && is_array($styles)) {
        foreach ($styles AS $style) {
            echo '<link rel="stylesheet" href="' . $style . '">';
        }
    }
    ?>
  <link rel="stylesheet" href="css/style.min.css?<?php echo rand(); ?>">

  <script src="js/libs/jquery.min.js"></script>
</head>

<body>
<section id="header">
  <div class="container">
    <div class="row header">
      <a href="./" class="col-auto">
        <img src="img/svg/logo.svg" alt="Такси Тройка на Пхукете">
      </a>
      <div class="col-auto header__phone">
        <a href="tel:+74951280733" onclick="yaCounter51784160.reachGoal('phone'); return true;">+7 495 128 07 33</a>
      </div>
      <div class="col-auto header__social">
        <a href="view/social/whatsupp/" target="_blank" onclick="yaCounter51784160.reachGoal('whatsapp'); return true;">
          <img src="img/svg/w.svg" alt="WhatsApp">
        </a> <a href="view/social/viber/" target="_blank" onclick="yaCounter51784160.reachGoal('viber'); return true;">
          <img src="img/svg/v.svg" alt="viber">
        </a> <a href="view/social/telegramm/" target="_blank"
                onclick="yaCounter51784160.reachGoal('telegram'); return true;">
          <img src="img/svg/t.svg" alt="telegramm">
        </a>
      </div>
    </div>
  </div>
</section>