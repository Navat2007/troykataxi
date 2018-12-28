<section id="title">
    <div class="container">
        <h1>русское такси<br>на пхукете</h1>
    </div>
</section>
<section id="searchContainer">
    <div class="container">
        <div class="row searchContainer">
            <div class="col-12 searchContainer__title">
                <p>ЗАКАЖИ ТАКСИ ЧЕРЕЗ НАШ САЙТ И ПОЛУЧИ 30% СКИДКУ!</p>
            </div>
            <div class="col-12 mx-auto">
                <?php
                require_once $_SESSION['root'] . 'view/main/search_form.php';
                ?>
            </div>
        </div>
    </div>
</section>
<section id="cars">
    <div class="container">
        <div class="row cars">
            <div class="col-12 cars__title">
                <p>наше такси</p>
            </div>
            <div class="col-12 d-flex justify-content-center flex-wrap flex-lg-nowrap">
                <div class="col-auto">
                    <picture class="cars__img">
                        <source srcset="img/cars/mini/webp/vios.webp" type="image/webp">
                        <source srcset="img/cars/mini/vios_@2x.jpg 2x" type="image/jpg">
                        <img srcset="img/cars/mini/vios.jpg" alt="Седан Эконом">
                    </picture>
                </div>
                <div class="col-auto">
                    <picture class="cars__img">
                        <source srcset="img/cars/mini/webp/minivan.webp" type="image/webp">
                        <source srcset="img/cars/mini/minivan_@2x.jpg 2x" type="image/jpg">
                        <img srcset="img/cars/mini/minivan.jpg" alt="Минивен">
                    </picture>
                </div>
                <div class="col-auto">
                    <picture class="cars__img">
                        <source srcset="img/cars/mini/webp/vip_minivan.webp" type="image/webp">
                        <source srcset="img/cars/mini/vip_minivan_@2x.jpg 2x" type="image/jpg">
                        <img srcset="img/cars/mini/vip_minivan.jpg" alt="Vip Минивен">
                    </picture>
                </div>
                <div class="col-auto">
                    <picture class="cars__img">
                        <source srcset="img/cars/mini/webp/jeep.webp" type="image/webp">
                        <source srcset="img/cars/mini/jeep_@2x.jpg 2x" type="image/jpg">
                        <img srcset="img/cars/mini/jeep.jpg" alt="Внедорожник">
                    </picture>
                </div>
                <div class="col-auto">
                    <picture class="cars__img">
                        <source srcset="img/cars/mini/webp/pickup.webp" type="image/webp">
                        <source srcset="img/cars/mini/pickup_@2x.jpg 2x" type="image/jpg">
                        <img srcset="img/cars/mini/pickup.jpg" alt="Пикап">
                    </picture>
                </div>
            </div>

        </div>
    </div>
</section>
