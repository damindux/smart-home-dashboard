const livingSwitch = document.getElementById('lrl-switch');
const livingLabel = document.getElementById('lrl-label');
const bedSwitch = document.getElementById('bdl-switch');
const bedLabel = document.getElementById('bdl-label');
const bathSwitch = document.getElementById('btl-switch');
const bathLabel = document.getElementById('btl-label');
const kitchenSwitch = document.getElementById('kl-switch');
const kitchenLabel = document.getElementById('kl-label');
const doorSwitch = document.getElementById('d-lock');
const doorLabel = document.getElementById('door-label');

const checkBoxToggle = (roomSwitch, roomLabel) => {
    if (roomSwitch.checked) {
        roomLabel.innerHTML = 'ON';
    } else {
        roomLabel.innerHTML = 'OFF';
    }
}

livingSwitch.addEventListener('change', () => {
    checkBoxToggle(livingSwitch, livingLabel);
});

bedSwitch.addEventListener('change', () => {
    checkBoxToggle(bedSwitch, bedLabel);
});

bathSwitch.addEventListener('change', () => {
    checkBoxToggle(bathSwitch, bathLabel);
});

kitchenSwitch.addEventListener('change', () => {
    checkBoxToggle(kitchenSwitch, kitchenLabel);
});

doorSwitch.addEventListener('change', () => {
    if (doorSwitch.checked) {
        doorLabel.innerHTML = 'UNLOCKED';
    } else {
        doorLabel.innerHTML = 'LOCKED';
    }
});
