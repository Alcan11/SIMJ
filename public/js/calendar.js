new Calendar('.calendar');
document.querySelector('.calendar').addEventListener('clickDay', function(e) {
    alert(e.date.toString());
});