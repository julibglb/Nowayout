import $ from 'jquery';
import '../styles/style.scss';

// Змінні
const $body = $('body');
const $burger = $('.burger');
const $nav = $('.main-nav');
const $headerInfo = $('.header-info');
const $buttonCookies = $('#button-cookies');
const $cookiesBlock = $('.cookies');

// Функції
function toggleMenu() {
    console.log('click');
    $nav.toggleClass('active');
    $headerInfo.toggleClass('active');

    if ($nav.hasClass('active')) {
        $body.css('overflow', 'hidden');
    } else {
        $body.css('overflow', '');
    }
}

function resetMenuOnResize() {
    if ($(window).width() >= 1281) {
        $burger.removeClass('active');
        $nav.removeClass('active');
        $headerInfo.removeClass('active');
        $body.css('overflow', '');
    }
}

function hiddenMessageCookies() {
    $cookiesBlock.css('display', 'none');
}

// Події
$burger.on('click', toggleMenu);
$(window).on('resize', resetMenuOnResize);
$buttonCookies.on('click', hiddenMessageCookies);
