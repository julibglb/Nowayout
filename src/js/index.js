import $ from 'jquery';
import Swiper from 'swiper';
import 'swiper/css';
import '../styles/style.scss';

// Змінні
const $body = $('body');
const $burger = $('.burger');
const $nav = $('.main-nav');
const $headerInfo = $('.header-info');
const $buttonCookies = $('#button-cookies');
const $cookiesBlock = $('.cookies');
const $backArrow = $('.back-arrow');
const $langButtons = $('.lang-btn');
const $footerLangs = $('.footer-lang span');
const $regionSelector = $('#city-select');

let swiper = null;
let isSwiperInit = false;
const swiperConfig = {
    loop: false,
    direction: "vertical",
    slidesPerView: 1,
    spaceBetween: 12,
    scrollbar: {
        el: ".swiper-scrollbar",
        hide: true,
    },
    breakpoints: {
        768: {
            direction: "horizontal",
            slidesPerView: 2,

        },
        1920: {
            direction: "horizontal",
            slidesPerView: 7,
        },
    },
}

// Функції
// Відкриває або закриває бургер меню
function toggleMenu() {
    $nav.toggleClass('active');
    $headerInfo.toggleClass('active');

    if ($nav.hasClass('active')) {
        $body.css('overflow', 'hidden');
    } else {
        $body.css('overflow', '');
    }
}

//Очищає всі налаштування бургер меню при відкриті на великих екранах
function resetMenuOnResize() {
    if ($(window).width() >= 1281) {
        $burger.removeClass('active');
        $nav.removeClass('active');
        $headerInfo.removeClass('active');
        $body.css('overflow', '');
    }
}

// Ховає поідомлення по cookies
function hideCookiesMessage() {
    $cookiesBlock.hide();

    sessionStorage.setItem('cookies', 'checked');
}

function checkCookies() {
    if (sessionStorage.getItem('cookies')) {
        $cookiesBlock.hide();
    }
}

// Повертає скролом доверну сторінки
function backArrowScroll() {
    $('html, body').animate({ scrollTop: 0 }, 'slow');
}

// Додає клас active-lang до обраної коистувачем мови
function setActiveLang(lang) {
    $langButtons.removeClass('active-lang');
    $footerLangs.removeClass('active-lang');

    $langButtons.filter(`[data-lang="${lang}"]`).addClass('active-lang');
    $footerLangs.filter(`[data-lang="${lang}"]`).addClass('active-lang');
}

function clickLangFooter() {
    const selectedLang = $(this).data('lang');
    setActiveLang(selectedLang);
}

function clickLangHeader() {
    const selectedLang = $(this).data('lang');
    setActiveLang(selectedLang);
}

function resetSwiper() {
    if ($(window).width() > 768) {
        if (swiper) swiper.destroy();
        swiper = new Swiper('.games-cards', swiperConfig);
        isSwiperInit = true;
    }
}

function checkSwiper() {
    if ($(window).width() > 768) {
        if (!isSwiperInit) {
            isSwiperInit = true;
            swiper = new Swiper('.games-cards', swiperConfig);
        }
    } else if (isSwiperInit) {
        swiper.destroy();
        isSwiperInit = false;
    }
}

function onRegionChanged() {
    const currentCity = $regionSelector.val();

    const $cards = $('.game-card');
    $cards.removeClass('hidden');

    const $filteredCards = $cards.filter((index, card) => {
        const $card = $(card);
        const cardData = $card.data('region').split(',');

        return !cardData.includes(currentCity);
    });

    $filteredCards.each((index, card) => {
        $(card).addClass('hidden');
    });

    resetSwiper();
}

checkCookies()
onRegionChanged();
setActiveLang('en');

// Події
$burger.on('click', toggleMenu);
$buttonCookies.on('click', hideCookiesMessage);
$backArrow.on('click', backArrowScroll);
$langButtons.on('click', clickLangFooter);
$footerLangs.on('click', clickLangHeader);
$regionSelector.on('change', onRegionChanged);

$(window).on('resize', resetMenuOnResize);
$(window).on('resize', checkSwiper);
