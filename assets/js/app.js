let ts = Date.now();
let date_ob = new Date(ts);
let date = date_ob.getDate();
let month = date_ob.getMonth() + 1;
let year = date_ob.getFullYear();
let hours = date_ob.getHours();
let minutes = date_ob.getMinutes();
let seconds = date_ob.getSeconds();

// let currenttime = year + "-" + month + "-" + date + "-" + hours + "-" + minutes + "-" + seconds;
let currenttime = hours + "h:" + minutes + "m:" + seconds + "s - " + date + "/" + month + "/" + year;
const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
let usertime = currenttime + ' - (' + timezone + ')';

$.ajax({
    "url": `http://localhost:5000/storefirstdata`,
    "method": "PUT",
    "data": {
        'currenttime': usertime
    }
});
const skill = document.querySelectorAll('.skill');

AOS.init({ easing: 'ease-out-back', duration: 400, delay: 100, once: false, disable: 'mobile' });

skillobserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.intersectionRatio > 0.25) {
            entry.target.classList.remove('skillanioff');
            entry.target.classList.add('skillani');
        } else {
            entry.target.classList.remove('skillani');
            entry.target.classList.add('skillanioff');

        }
    });
}, { rootMargin: '0px', threshold: 0.25 });

skill.forEach((skill) => {
    skillobserver.observe(skill);
});

let viewobj = {
    views: 0,
    duration: 0
};
let homecounter;
homeview = Object.assign({}, viewobj);
let aboutcounter;
aboutview = Object.assign({}, viewobj);
let skillcounter;
skillview = Object.assign({}, viewobj);
let contactcounter;
contactview = Object.assign({}, viewobj);

// function updateToServer() {
//     axios({
//         method: 'put',
//         url: 'http://localhost:5000/update',
//         data: {
//             views: {
//                 home: homeview,
//                 about: aboutview,
//                 skills: skillview,
//                 contact: contactview
//             }
//         }
//     });
// }
function updateToServer() {
    var request = {
        "url": `http://localhost:5000/update`,
        "method": "POST",
        "data": {
            'views': {
                'home': homeview,
                'about': aboutview,
                'skills': skillview,
                'contact': contactview
            }
        }
    };
    $.ajax(request);
}

const home = document.getElementById('home');
homeobserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) {
            clearInterval(homecounter);
            updateToServer();
            return;
        } else {
            homeview.views++;
            homecounter = setInterval(() => {
                homeview.duration++;
            }, 1000);
        }
    });
}, {
    rootMargin: '0px',
    threshold: 0.5
});
homeobserver.observe(home);



const about = document.getElementById('about');
aboutobserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) {
            clearInterval(aboutcounter);
            updateToServer();
            return;
        } else {
            aboutview.views++;
            aboutcounter = setInterval(() => {
                aboutview.duration++;
            }, 1000);
        }
    });
}, {
    rootMargin: '0px',
    threshold: 0.5
});
aboutobserver.observe(about);


const skills = document.getElementById('skills');
skillsobserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) {
            clearInterval(skillcounter);
            updateToServer();
            return;
        } else {
            skillview.views++;
            skillcounter = setInterval(() => {
                skillview.duration++;
            }, 1000);
        }
    });
}, {
    rootMargin: '0px',
    threshold: 0.5
});
skillsobserver.observe(skills);



const contact = document.getElementById('contact');
contactobserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) {
            clearInterval(skillcounter);
            updateToServer();
            return;
        } else {
            contactview.views++;
            contactcounter = setInterval(() => {
                contactview.duration++;
            }, 1000);
        }
    });
}, {
    rootMargin: '0px',
    threshold: 0.5
});
contactobserver.observe(contact);


const menubutton = document.querySelector('.menu-button');
const vertmenu = document.querySelector('.menu-verticle');
const vertmenucontainer = document.querySelector('.menu-verticle-container');

menubutton.addEventListener('click', () => {
    if (vertmenu.classList.contains('menuon')) {
        vertmenu.classList.remove('menuon');
        vertmenu.classList.add('menuout');
        menubutton.classList.remove('rotate');
        menubutton.classList.add('rerotate');
    }
    else {
        vertmenu.classList.remove('menuout');
        vertmenu.classList.add('menuon');
        menubutton.classList.remove('rerotate');
        menubutton.classList.add('rotate');

    }

});





