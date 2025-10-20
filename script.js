
const radios = document.querySelectorAll('input[name="unit"]');

const inputGroupMetric = document.querySelector('.input-group-metric');
const inputGroupImperial = document.querySelector('.input-group-imperial');


radios.forEach(radio => {
    radio.addEventListener('change', (e) => {
        if (e.target.value === 'metric') {
            inputGroupMetric.classList.add('active');
            inputGroupImperial.classList.remove('active');
        } else {
            inputGroupImperial.classList.add('active');
            inputGroupMetric.classList.remove('active');
        }
    });
});