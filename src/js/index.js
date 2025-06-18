
import $ from 'jquery';
import '../styles/style.scss';

$(document).ready(function () {
    $('.burger').on('click', function () {
        $('.main-nav').toggleClass('active');
    });
});
