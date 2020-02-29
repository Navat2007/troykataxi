'use strict';

let isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

class Notif {

    static prop_init() {
        Notif.isShow = false;
    }

    static config(object) {

        Notif.disabledClassButtons = false;
        if ("disabledClassButtons" in object) Notif.disabledClassButtons = object.disabledClassButtons;

        Notif.classButtons = 'a-btn';
        Notif.confirmBtnClass = ['--success', '--md'];
        Notif.confirmBtnText = 'Да';
        Notif.cancelBtnClass = ['--error', '--md'];
        Notif.cancelBtnText = 'Нет';
        Notif.okBtnClass = ['--primary', '--md'];
        Notif.okBtnText = 'Ок';

        if ("buttons" in object) {
            if ("classButtons" in object.buttons) Notif.classButtons = object.buttons.classButtons;
            if ("confirmBtnClass" in object.buttons) Notif.confirmBtnClass = object.buttons.confirmBtnClass;
            if ("confirmBtnText" in object.buttons) Notif.confirmBtnText = object.buttons.confirmBtnText;
            if ("cancelBtnClass" in object.buttons) Notif.cancelBtnClass = object.buttons.cancelBtnClass;
            if ("cancelBtnText" in object.buttons) Notif.cancelBtnText = object.buttons.cancelBtnText;
            if ("okBtnClass" in object.buttons) Notif.okBtnClass = object.buttons.okBtnClass;
            if ("okBtnText" in object.buttons) Notif.okBtnText = object.buttons.okBtnText;
        }

        Notif.alertIcon = `<div class="a-notific__icon"><p>!</p></div>`;
        Notif.alertClass = '--alert';
        Notif.successIcon = `<div class="a-notific__icon"><p>✓</p></div>`;
        Notif.successClass = '--success';
        Notif.errorIcon = `<div class="a-notific__icon"><p>🞪</p></div>`;
        Notif.errorClass = '--error';
        Notif.infoIcon = `<div class="a-notific__icon"><p>!</p></div>`;
        Notif.infoClass = '--info';
        Notif.questionIcon = `<div class="a-notific__icon"><p>?</p></div>`;
        Notif.questionClass = '--info';

        if ("alert" in object) {
            if ("icon" in object.alert) Notif.alertIcon = object.alert.icon;
            if ("class" in object.alert) Notif.alertClass = object.alert.class;
        }
        if ("success" in object) {
            if ("icon" in object.success) Notif.successIcon = object.success.icon;
            if ("class" in object.success) Notif.successClass = object.success.class;
        }
        if ("error" in object) {
            if ("icon" in object.error) Notif.errorIcon = object.error.icon;
            if ("class" in object.error) Notif.errorClass = object.error.class;
        }
        if ("info" in object) {
            if ("icon" in object.info) Notif.infoIcon = object.info.icon;
            if ("class" in object.info) Notif.infoClass = object.info.class;
        }
        if ("question" in object) {
            if ("icon" in object.question) Notif.questionIcon = object.question.icon;
            if ("class" in object.question) Notif.questionClass = object.question.class;
        }

        Notif.configLoad = true;
    }

    // Виды уведомлений
    static show(object) {

        if (!Notif.isShow) Notif.prop_init();
        if (!Notif.configLoad) Notif.config({});
        if (Notif.isShow) Notif.close();

        Notif.window = document.createElement('div');
        document.body.appendChild(Notif.window);
        Notif.window.classList.add('a-notific');

        let card = document.createElement('div');
        card.classList.add('a-notific__card');

        if ("type" in object) {

            let icon, className;
            switch (object.type) {
                case "alert":
                    className = Notif.alertClass;
                    icon = Notif.alertIcon;
                    break;
                case "success":
                    className = Notif.successClass;
                    icon = Notif.successIcon;
                    break;
                case "error":
                    className = Notif.errorClass;
                    icon = Notif.errorIcon;
                    break;
                case "info":
                    className = Notif.infoClass;
                    icon = Notif.infoIcon;
                    break;
                case "question":
                    className = Notif.questionClass;
                    icon = Notif.questionIcon;
                    break;
            }

            card.classList.add(className);
            card.innerHTML = icon;
        }

        if ("title" in object) {
            let title = document.createElement('p');
            title.classList.add('a-notific__title');
            title.innerHTML = object.title;
            card.append(title);
        }

        if ("text" in object) {
            let text = document.createElement('p');
            text.classList.add('a-notific__text');
            text.innerHTML = object.text;
            card.append(text);
        }

        let controls = document.createElement('div');
        controls.classList.add('a-notific__controls');

        let btn;
        if (object.okBtn) {
            btn = document.createElement('button');
            btn.type = 'button';
            object.okBtnText ? btn.innerHTML = object.okBtnText : btn.innerHTML = Notif.okBtnText;
            if (!Notif.disabledClassButtons && !object.okBtnClassDisabled) {
                btn.classList.add(Notif.classButtons);
                for (let i = 0; i < Notif.okBtnClass.length; i++) {
                    btn.classList.add(Notif.okBtnClass[i]);
                }
            }
            if (object.okBtnClass) {
                for (let i = 0; i < object.okBtnClass.length; i++) {
                    btn.classList.add(object.okBtnClass[i]);
                }
            }

            if (object.okBtnClick) btn.onclick = () => object.okBtnClick();
            else btn.onclick = () => Notif.close();

            controls.appendChild(btn);
        }

        if (object.confirmBtn) {
            btn = document.createElement('button');
            btn.type = 'button';
            object.confirmBtnText ? btn.innerHTML = object.confirmBtnText : btn.innerHTML = Notif.confirmBtnText;
            if (!Notif.disabledClassButtons && !object.confirmBtnClassDisabled) {
                btn.classList.add(Notif.classButtons);
                for (let i = 0; i < Notif.confirmBtnClass.length; i++) {
                    btn.classList.add(Notif.confirmBtnClass[i]);
                }
            }
            if (object.confirmBtnClass) {
                for (let i = 0; i < object.confirmBtnClass.length; i++) {
                    btn.classList.add(object.confirmBtnClass[i]);
                }
            }
            if (object.confirmBtnClick) {
                btn.onclick = () => { object.confirmBtnClick(); };
            }
            controls.appendChild(btn);
        }

        if (object.cancelBtn) {
            btn = document.createElement('button');
            btn.type = 'button';
            object.cancelBtnText ? btn.innerHTML = object.cancelBtnText : btn.innerHTML = Notif.cancelBtnText;
            if (!Notif.disabledClassButtons && !object.cancelBtnClassDisabled) {
                btn.classList.add(Notif.classButtons);
                for (let i = 0; i < Notif.cancelBtnClass.length; i++) {
                    btn.classList.add(Notif.cancelBtnClass[i]);
                }
            }
            if (object.cancelBtnClass) {
                for (let i = 0; i < object.cancelBtnClass.length; i++) {
                    btn.classList.add(object.cancelBtnClass[i]);
                }
            }
            if (object.cancelBtnClick) {
                btn.onclick = () => { object.cancelBtnClick(); };
            } else {
                btn.onclick = () => { Notif.close(); };
            }
            controls.appendChild(btn);
        }

        card.append(controls);
        Notif.window.append(card);

        Notif.scrollWidth = window.innerWidth - document.documentElement.clientWidth;
        if (Notif.scrollWidth != 0) document.documentElement.style.paddingRight = Notif.scrollWidth + "px";
        document.documentElement.style.overflow = 'hidden';

        Notif.isShow = true;

        if (object.timeToClose) Notif.timeToClose(object);
    }

    static close() {
        document.documentElement.style.overflow = '';
        document.documentElement.style.paddingRight = '';
        Notif.window.remove();
        Notif.isShow = false;
    }

    // конструктивные элементы
    static timeToClose(object) {
        setTimeout(() => Notif.close(), object.timeToClose);
    }
}

window.onload = () => {

    if (isMobile.any()) document.getElementById('qRCodeBlock').style.display = 'none';
    else new QRCode(document.getElementById("qRCode"), 'https://api.whatsapp.com/send?phone=66945800333&text= Для%20начала%20нажмите%20Отправить%20--->');

    let sendBtn = document.getElementById('sMBtn');
    sendBtn.onclick = () => {

        if (validate('sMtel') && !Cookies.get('send')) {

            let form = new FormData();
            form.append('phone', document.getElementById('sMtel').value);

            fetch('public/php/send_request_whatsapp.php', {
                method: 'POST',
                body: form
            })
                .then(function (response) {
                    return response.json();
                })
                .then(function (result) {

                    console.log(result);

                    Cookies.set('send', "1", {
                        expires: 60 * 2
                    });

                    Notif.show({
                        type: 'success',
                        title: 'Успех',
                        text: 'Ваш запрос успешно отправлен.',
                        timeToClose: 2000
                    });

                })
                .catch(function (error) {
                    console.log('Request failed', error);
                    Notif.show({
                        type: 'error',
                        title: 'Ошибка',
                        text: 'Что-то пошло не так, попробуйте еще раз',
                        timeToClose: 2000
                    });
                });

        }
        else
        {

            Notif.show({
                type: 'error',
                title: 'Ошибка',
                text: 'Вы уже отправляли запрос, подождите 2 минуты',
                timeToClose: 2000
            });

        }

    };

    document.getElementById('sMtel').addEventListener('input', maskInput);

    //#region VK
    var quantityComments = 6;

    var group_id = '101187764';
    var topic_id = '35118150';
    var JSONReviewsGeneratorReference = 'php/d_reviews.php';
    var discussionsContainer = document.querySelector('.discussions-vk');
    var commentTemplate;
    if ('content' in document.querySelector('#comment-template')) {
        commentTemplate = document.querySelector('#comment-template').content;
    } else {
        commentTemplate = document.querySelector('.a-comment');
    }
    var MONTHS = ['янв', 'фев', 'марта', 'апр', 'мая', 'июня', 'июля', 'августа', 'сентября', 'окт', 'ноября', 'дек'];
    var VK_LINK = 'https://vk.com/';
    var xhr = new XMLHttpRequest();
    var fragment = document.createDocumentFragment();

    function isOnline(checkStatus) {
        var status;
        if (checkStatus === 0) {
            status = 'Не в сети';
        } else {
            status = 'В сети';
        }
        return status;
    }

    function validationDate(date) {
        var minutes = String(date.getMinutes());
        var hours = String(date.getHours());
        if (minutes.length < 2) {
            minutes += '0';
        }
        if (hours.length < 2) {
            hours += '0';
        }
        date = date.getDate() + ' ' + MONTHS[date.getMonth()] + ' ' + date.getFullYear() + ' в ' + hours + ':' + minutes;
        return date;
    }

    function getCommentText(data, i) {
        var text = data.items[i].text;
        var dataReplyToUser = text.split(',')[0];
        var dataReplyToUser_user = dataReplyToUser.split('[')[1];
        var idPost;
        var userName;
        var postWithoutReply;
        if (dataReplyToUser_user !== undefined) {
            postWithoutReply = text.split('],')[1].trim();
            idPost = dataReplyToUser.split('[')[1].split(']')[0].split('_')[1].split('|')[0];
            userName = dataReplyToUser.split('[')[1].split(']')[0].split('_')[1].split('|')[1];
            text = userName + ', ' + postWithoutReply;
        }
        return text;
    }

    function createCommentElement(data, i) {
        var element = commentTemplate.cloneNode(true);
        var sourceIDLink = VK_LINK + data.groups.screen_name;
        var sourcePhoto = data.groups.photo_100;
        var stateOnline = '';
        var nameTitle = data.groups.name;
        var sourceSticker = '';
        var date = new Date(data.items[i].date * 1000);
        var commentDate = validationDate(date);
        element.querySelector('.a-comment__text-title').textContent = getCommentText(data, i);
        element.querySelector('.a-comment__like-number').textContent = data.items[i].likes.count;
        element.querySelector('.a-comment__comment-date').href = VK_LINK + 'topic-' + group_id + '_' + topic_id + '?post=' + data.items[i].id;
        for (var j = 0; j < data.profiles.length; j++) {
            if (data.items[i].from_id === data.profiles[j].id) {
                sourceIDLink = VK_LINK + data.profiles[j].screen_name;
                sourcePhoto = data.profiles[j].photo_100;
                stateOnline = isOnline(data.profiles[j].online);
                nameTitle = data.profiles[j].first_name + ' ' + data.profiles[j].last_name;
            }
        }

        for (var key in data.items[i]) {
            if (data.items[i].hasOwnProperty('attachments')) {
                switch (data.items[i].attachments[0].type) {
                    case 'sticker':
                        sourceSticker = data.items[i].attachments[0].sticker.photo_128;
                        break;
                    case 'photo':
                        sourceSticker = data.items[i].attachments[0].photo.photo_604;
                        break;
                }
            }
        }

        element.querySelector('.a-comment__logo-image').src = sourcePhoto;
        element.querySelector('.a-comment__logo').href = sourceIDLink;
        element.querySelector('.a-comment__online').textContent = stateOnline;
        element.querySelector('.a-comment__group-title').textContent = nameTitle;
        element.querySelector('.a-comment__group-title').href = sourceIDLink;
        element.querySelector('.a-comment__comment-date').textContent = commentDate;
        //element.querySelector('.a-comment__image').src = sourceSticker;
        return element;
    }

    function addComments(data) {

        if (data.count > quantityComments - 1) {
            for (var i = 0; i < quantityComments; i++) {
                fragment.appendChild(createCommentElement(data, i));
            }
        } else {
            for (var i = 0; i < data.count; i++) {
                fragment.appendChild(createCommentElement(data, i));
            }
        }

        // console.log('Add disc');
        discussionsContainer.appendChild(fragment);

        // console.log('Done');
    }

    function showDiscussion() {
        xhr.open('GET', JSONReviewsGeneratorReference, true);
        xhr.onload = function () {
            var data = JSON.parse(this.response).response;
            addComments(data);
        };
        xhr.onerror = function () {
            console.log('Ошибка ' + this.status);
        };
        xhr.send();
    }

    showDiscussion();
    //#endregion

};

function validate(inputID) {

    let error = false;

    let filterPhone = /^(\+)?(\(\d{2,3}\) ?\d|\d)(([ \-]?\d)|( ?\(\d{2,3}\) ?)){5,12}\d$/;

    let input = document.getElementById(inputID);
    let parent;

    // Если TEXTAREA - игнорируем обертку
    (input.tagName == 'TEXTAREA') ? parent = input.parentElement : parent = input.parentElement.parentElement;

    let textMsg; // Тесктовое сообщение

    if (input.required == true) {

        if (input.value !== "") {

            if (input.type == "tel" && !filterPhone.test(input.value)) {

                error = true;
                textMsg = 'Телефон заполнен не корректно!';
                inputError(parent, textMsg);
            }

        } else {

            error = true;
            textMsg = 'Поле не должно быть пустым!';
            inputError(parent, textMsg);
        }
    }
    return (!error);
}

function inputError(inputParent, textMsg) {

    inputParent.classList.add("--error");
    if (textMsg != undefined)
        inputParent.lastElementChild.textContent = textMsg;

    setTimeout(function () {
        inputParent.classList.remove("--error");
    }, 3000);

}

// маска на телефон
function maskInput() {
    let input = this,
        mask = input.dataset.mask,
        value = input.value,
        literalPattern = /[0\*]/,
        numberPattern = /[0-9]/,
        newValue = "";
    try {
        let maskLength = mask.length,
            valueIndex = 0,
            maskIndex = 0;

        for (; maskIndex < maskLength;) {
            if (maskIndex >= value.length) break;

            if (mask[maskIndex] === "0" && value[valueIndex].match(numberPattern) === null) break;

            // Found a literal
            while (mask[maskIndex].match(literalPattern) === null) {
                if (value[valueIndex] === mask[maskIndex]) break;
                newValue += mask[maskIndex++];
            }
            newValue += value[valueIndex++];
            maskIndex++;
        }

        input.value = newValue;
    } catch (e) {
        console.log(e);
    }
}