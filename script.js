const form = document.getElementById('form');
const btn = document.querySelector('.btn');
const uploadInput = document.getElementById('upload');
const inputs = document.querySelectorAll('.inputs');
const info = document.querySelector('.info');
const redInfos = document.querySelectorAll('.redInfo');
const uploadIcon = document.querySelector('.updateLabel img');
const content = document.querySelector('.content');
const contentSuccess = document.querySelector('.contentSuccess');
const title = document.getElementById('title');
const desc = document.getElementById('desc');
const nameTicket = document.querySelector('.nameTicket');
const githubTicket = document.querySelector('.githubTicket');
const infoImage = document.querySelector('.infoImage');
const emailInput = document.getElementById('emailInput')
let fullName;
let email;
let username;
let profilePic;

function valid(em) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(em)
}

uploadInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if(file) {
        const sizeKB = file.size / 1024;
        if(sizeKB > 500) {
            uploadInput.value = '';
            uploadIcon.src = 0;
            info.style.display = 'none';
            redInfos[0].style.display = 'flex';
            redInfos[0].style.marginTop = '15px';
        } else {
            const imageURL = URL.createObjectURL(file);
            profilePic = imageURL;
            uploadIcon.src = imageURL;
            uploadIcon.style.padding = 0;
            uploadIcon.width = 45;
            uploadIcon.height = 45;
            if(redInfos[0].style.display !== 'none') {
                info.style.display = 'flex';
                redInfos[0].style.display = 'none';
            }
        }
    }
})

inputs.forEach((input, index) => {
    input.addEventListener('input', () => {
        if(input.getAttribute('id') !== 'upload') {
            if(input.value.trim() === '') {
                redInfos[index].style.display = 'flex';
                info.style.display = 'none';
            } else {
                redInfos[index].style.display = 'none';
            }
        }
    })
})

emailInput.addEventListener('input', () => {
    if(!valid(emailInput.value)) {
        redInfos[2].style.display = 'flex';
    }
})

btn.addEventListener('click', () => {
    inputs.forEach((input, index) => {
        if(input.value.trim() === '') {
            redInfos[index].style.display = 'flex';
        } else {
            redInfos[index].style.display = 'none';
        }
        if(!valid(emailInput.value)) {
            redInfos[2].style.display = 'flex';
        }
    })
})

form.onsubmit = (e) => {
    e.preventDefault();
    window.scrollTo({top: 0})
    content.style.display = 'none';
    contentSuccess.style.display = 'flex';
    fullName = inputs[1].value;
    email = inputs[2].value;
    username = inputs[3].value;
    title.innerHTML = `Congrats, <b class='name'>${fullName}!</b> Your ticket is ready.`;
    desc.innerHTML = `We've emailed your ticket to <b class='email'>${email}</b> and will send updates in the run up to the event.`;
    nameTicket.innerHTML = fullName;
    githubTicket.innerHTML = `<img src="assets/images/icon-github.svg" alt="">${username[0] === '@' ? username : '@' + username}`
    infoImage.src = profilePic;
}

window.onload = () => {
    form.reset();
}