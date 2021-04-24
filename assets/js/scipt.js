var workdayInputs = $('input');
var saveFormSubmission = $('.saveBtn');
var currentHour = moment().hour();
var currentDay = moment().format('dddd, MMM Do YYYY');
$('#currentDay').html(currentDay);
//checks time in order to change background colors
function checkHour () {
    workdayInputs.each(function () {
        if ($(this).attr('data-hour') < currentHour) {
            $(this).addClass("past");
        } else if ($(this).attr('data-hour') == currentHour) {
            $(this).addClass('present');
        }
    });
}
//storing inputs to local storage
function saveWorkdayObjective(event) {
    event.preventDefault();
    var input = $(event.target).siblings('input').first();
    localStorage.setItem('objective' + input.attr('data-hour'), input.val());

};
//function to run on load
function init() {
//retrieving local storage
    workdayInputs.each(function () {
        $(this).val(localStorage.getItem('objective' + $(this).attr('data-hour')))
    });
//dynamic editing to change background color
    workdayInputs.each(function () {
        if ($(this).attr('data-hour') < currentHour) {
            $(this).removeClass('future');
            $(this).addClass('past');
        } else if ($(this).attr('data-hour') == currentHour) {
            $(this).removeClass('future');
            $(this).addClass('present'); 
        }
    });
};
init();
//event handler and interval
saveFormSubmission.on('click', saveWorkdayObjective);
setInterval(checkHour, 60000);
