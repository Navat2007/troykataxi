<!DOCTYPE html>
<html lang="ru">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <!--Основные метатеги -->
    <meta property="og:type" content="website"/>
    <meta property="og:title" content="<?php echo $title; ?>"/>
    <meta property="og:site_name" content="<?php echo $title; ?>"/>
    <meta property="og:description" content="<?php echo $meta_desc; ?>"/>
    <meta property="og:image:secure_url" content="<?php echo $site_name; ?>/img/svg/logo.png"/>
    <meta property="og:locale" content="ru"/>
    <meta property="og:url" content="<?php echo $site_name; ?>"/>

    <meta name="description" content="<?php echo $meta_desc; ?>">
    <meta name="keywords" content="<?php echo $meta_key; ?>">
    <title><?php echo $page_name . ' | ' . $title; ?></title>

    <!-- favicon -->
    <link rel="icon" type="image/png" href="favicon/icon_192x192.png">
    <link rel="manifest" href="favicon/manifest.json">
    <link rel="yandex-tableau-widget" href="favicon/manifest.json"/>

    <!-- CSS -->
    <base href="<?php echo $site_base; ?>">
    <link rel="stylesheet" href="css/libs/bootstrap-datetimepicker.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <link rel="stylesheet" href="fonts/font.css">
    <link rel="stylesheet" href="css/style.min.css?<?php echo rand(); ?>">

    <script src="js/libs/jquery.min.js"></script>
</head>

<body>
<section id="header">
    <div class="container">
        <div class="row header">
            <a href="./" class="col-6 col-md-auto">
                <img src="img/svg/logo.svg" alt="Русское такси на Пхукете">
            </a>
            <div class="col-6 col-md-auto header__phone">
                <a href="tel:88005517233">8 800 551 72 33</a>
            </div>
            <div class="col-auto header__social">
                <a href="view/social/whatsupp/" target="_blank">
                    <img src="img/svg/w.svg" width="27" alt="WhatsApp">
                </a>
                <a href="view/social/viber/" target="_blank">
                    <img src="img/svg/v.svg" width="27" alt="viber">
                </a>
                <a href="view/social/telegramm/" target="_blank">
                    <img src="img/svg/t.svg" width="27" alt="telegramm">
                </a>
            </div>
        </div>
    </div>
</section>