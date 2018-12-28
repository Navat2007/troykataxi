<form action="" class="search" id="form_search">
    <div class="row search__col">
        <div class="col-md-6 col-lg-3 textfield">
            <input class="textfield__input" type="text" id="taxi_from_input" autocomplete="off" placeholder="ОТКУДА">
            <div class="miniModal" id="taxi_from" style="display: none;">
                <ul class="listBox" id="taxi_from_list">
                </ul>
            </div>
        </div>
        <div class="col-md-6 col-lg-3 textfield">
            <input class="textfield__input" type="text" id="taxi_to_input" autocomplete="off" placeholder="КУДА">
            <div class="miniModal" id="taxi_to" style="display: none;">
                <ul class="listBox" id="taxi_to_list">

                </ul>
            </div>
        </div>
        <div class="col-md-6 col-lg-3 textfield">
            <div class="textfield__count" id="people_count">
                <span class="countNumber" id="all_count">1</span>
                <span id="all_text">пассажир</span>
            </div>
            <input id="count" type="hidden">
            <div class="miniModal" id="mini_modal" style="display: none">
                <div class="countBox">
                    <span>Взрослый</span>
                    <a class="countMinus" id="adult_minus"><i class="material-icons">remove_circle_outline</i></a>
                    <span id="adult_count">1</span>
                    <a class="countPlus" id="adult_plus"><i
                            class="material-icons">add_circle_outline</i></a>
                </div>
                <div class="countBox">
                    <span>Ребенок</span>
                    <a class="countMinus" id="child_minus"><i class="material-icons">remove_circle_outline</i></a>
                    <span id="child_count">0</span>
                    <a class="countPlus" id="child_plus"><i
                            class="material-icons">add_circle_outline</i></a>
                </div>
            </div>
        </div>
        <div class="col-md-6 col-lg-3 textfield">
            <div id="animate_btn">
                <input class="textfield__inputSubmit " type="button" value="РАССЧИТАТЬ" id="search_submit">
            </div>
        </div>
    </div>
    <div class="search__error" style="display: none;">ТЕКСТ ОШИБКИ</div>
    <div id="cars_choice" style="display: none;">

    </div>
</form>