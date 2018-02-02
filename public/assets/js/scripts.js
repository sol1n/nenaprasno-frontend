$(document).ready(function () {
    $('[data-toggle]').toggler();
    $('[data-masked-input]').maskedinput();
    tippy('[data-tooltip]', {
        theme: 'light'
    });
});