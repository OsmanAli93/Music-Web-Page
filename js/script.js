
/* ================================================================ *\
                            TOGGLE MOBILE MENU
\* ================================================================ */

const mobileBtn = document.querySelector('.hmb-mobile__menu');
const subMenuBtn = document.querySelectorAll('.menu-btn');

function toggleMobileMenu () {
    
    const mobileMenu = document.querySelector('.mobile-navigation__container');

    this.classList.toggle('rotate');

    if (window.getComputedStyle(mobileMenu).display === 'none') {
        mobileMenu.style.display = 'block';
    } else {
        mobileMenu.style.display = 'none';
    }

}

function toggleSubMenu () {
    
    const subMenuItem = this.parentElement.nextElementSibling;
  
    if (subMenuItem.style.maxHeight) {
        subMenuItem.style.maxHeight = null;
    } else {
        subMenuItem.style.maxHeight = subMenuItem.scrollHeight + 'px';
    }
    
    console.log(this.parentElement.nextElementSibling);
    
    
}

mobileBtn.addEventListener('click', toggleMobileMenu);
subMenuBtn.forEach(item => item.addEventListener('click', toggleSubMenu, false));


/* ================================================================ *\
                            TOGGLE SIDE MENU
\* ================================================================ */

const sideMenuBtn = document.getElementById('hmb-menu');
const sideMenuPanel = document.getElementById('side-menu');
const closeBtn = document.querySelector('.close-btn');

function toggleSideMenu () {

    sideMenuPanel.classList.add('slide-in');
}

function closeSideMenu () {

    sideMenuPanel.classList.remove('slide-in');
}


sideMenuBtn.addEventListener('click', toggleSideMenu, false);
closeBtn.addEventListener('click', closeSideMenu, false);


/* ================================================================ *\
                            VIDEO PLAYER
\* ================================================================ */

const playBtn = document.getElementById('play-btn');
const videoWrapper = document.getElementById('video-inner');

function playVideo () {

    const ytVideo = '<video id="video-player" controls src="/video/access - YouTube.MKV"></video>';
    
    this.style.display = 'none';
    document.querySelector('.video-wrapper').style.background = 'none';

    videoWrapper.innerHTML += ytVideo;
    document.querySelector('#video-player').play();


    console.log(this);
}

playBtn.addEventListener('click', playVideo);


/* ================================================================ *\
                            AUDIO PLAYER
\* ================================================================ */

const musicPlayer = document.querySelectorAll('.player-song');
const audio = document.getElementById('audio');
const musicPlay = document.querySelector('.play-ctrl__btn');
const musicPause = document.querySelector('.pause-ctrl__btn');
const nowPlaying = document.querySelectorAll('.music-player__item');
const musicPlayerContainer = document.querySelector('.music-player__container');
const progressBar = document.querySelector('.music-player__slider');
const nextPlay = document.querySelector('.next');
const prevPlay = document.querySelector('.prev');
let current = 0;

const playlist = [
    
    {
        "artist": "Linkin Park",
        "album": "Minutes To Midnight",
        "albumCover": "/img/cover_1.jpg",
        "song": "One More Light",
        "songFile": "/audio/One More Light.mp3",
        "duration": "4:30"
    },

    {
        "artist": "Linkin Park",
        "album": "A Thousand Suns",
        "albumCover": "/img/cover_2.jpg",
        "song": "Waiting For The End",
        "songFile": "/audio/Waiting For The End.mp3",
        "duration": "3:54"
        
    },

    {
        "artist": "Linkin Park",
        "album": "One More Light",
        "albumCover": "/img/cover_5.jpg",
        "song": "Talking To Myself",
        "songFile": "/audio/Talking To Myself.mp3",
        "duration": "3:51"
    },

    {
        "artist": "Martin Garrix",
        "album": "Seven",
        "albumCover": "/img/cover_3.jpg",
        "song": "Together",
        "songFile": "/audio/Together.mp3",
        "duration": "3:41"
    },

    {
        "artist": "Martin Garrix",
        "album": "Seven",
        "albumCover": "/img/cover_4.jpg",
        "song": "Burnout",
        "songFile": "/audio/Burnout.mp3",
        "duration": "3:37"
    }
];

audio.src = playlist[current].songFile;
document.querySelector('.music-player__left').style.background = `url(${playlist[current].albumCover}) no-repeat center/cover`;

function playMusic () {

    const method = audio.paused ? 'play' : 'pause';

    if (this.className === 'ion-ios-pause play-ctrl__btn') {
        this.className = 'ion-play play-ctrl__btn';
    } else {
        this.className = 'ion-ios-pause play-ctrl__btn';
    }
    
    audio[method]();
}

function moveToNextPlayList () {
   
    current++;
    document.querySelector('.music-player__left').style.background = `url(${playlist[current].albumCover}) no-repeat center/cover`;
    document.getElementById('current-song').textContent = `${playlist[current].artist} - ${playlist[current].song}`;
    document.getElementById('song-duration').textContent = `${playlist[current].duration}`;
   
    for (let i = 0; i < nowPlaying.length; i++) {
        nowPlaying[i].classList.remove('now_playing');
    }

    if (current === playlist.length - 1) {
        current = 0;
    } 

    nowPlaying[current].classList.add('now_playing');
    audio.src = playlist[current].songFile;
    audio.play();
    
    console.log(current);
}

function selectPlaylistOnClick () {

    const dataIndex = this.dataset.playlist;
    
    for (let i = 0; i < nowPlaying.length; i++) {
        nowPlaying[i].classList.remove('now_playing');
    }

    nowPlaying[dataIndex].classList.add('now_playing');
    document.getElementById('current-song').textContent = `${playlist[dataIndex].artist} - ${playlist[dataIndex].song}`;
    document.getElementById('song-duration').textContent = `${playlist[dataIndex].duration}`;
    document.querySelector('.music-player__left').style.background = `url(${playlist[dataIndex].albumCover}) no-repeat center/cover`;
    musicPlay.className = 'ion-ios-pause play-ctrl__btn';
    audio.src = playlist[dataIndex].songFile;
    audio.play();
   
    console.log(this.dataset.playlist);
}

function nextPlaylist () {

    const count = current % playlist.length;

    for (let i = 0; i < nowPlaying.length; i++) {
        nowPlaying[i].classList.remove('now_playing');
    }

    current++;
    nowPlaying[count].classList.add('now_playing');
    document.getElementById('current-song').textContent = `${playlist[count].artist} - ${playlist[count].song}`;
    document.getElementById('song-duration').textContent = `${playlist[count].duration}`;
    document.querySelector('.music-player__left').style.background = `url(${playlist[count].albumCover}) no-repeat center/cover`;
    musicPlay.className = 'ion-ios-pause play-ctrl__btn';
    audio.src = playlist[count].songFile;
    audio.play();
}

function prevPlaylist () {

    for (let i = 0; i < nowPlaying.length; i++) {
        nowPlaying[i].classList.remove('now_playing');
    }

    if (current <= 0) {
        current = playlist.length;
    } 
 
    current--;
    nowPlaying[current].classList.add('now_playing');
    document.getElementById('current-song').textContent = `${playlist[current].artist} - ${playlist[current].song}`;
    document.getElementById('song-duration').textContent = `${playlist[current].duration}`;
    document.querySelector('.music-player__left').style.background = `url(${playlist[current].albumCover}) no-repeat center/cover`;
    musicPlay.className = 'ion-ios-pause play-ctrl__btn';
    audio.src = playlist[current].songFile;
    audio.play();

}


function updateCurrentTime () {

    const percent = audio.currentTime / audio.duration * 100;
    const minutes = parseInt(audio.currentTime / 60) % 60;
    const seconds = parseInt(audio.currentTime % 60);

    document.querySelector('.song-current__progress').textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    document.getElementById('music-slider').style.width = percent + '%';
    
    console.log(audio.currentTime);
}


function seek (e) {
    
    const percent = e.offsetX / this.offsetWidth;
    
    audio.currentTime = percent * audio.duration;
    document.getElementById('music-slider').style.width = percent / 100 + '%';   
}

audio.addEventListener('timeupdate', updateCurrentTime);
audio.addEventListener('ended', moveToNextPlayList);
musicPlay.addEventListener('click', playMusic);
progressBar.addEventListener('click', seek);
nextPlay.addEventListener('click', nextPlaylist);
prevPlay.addEventListener('click', prevPlaylist);
musicPlayer.forEach(player => player.addEventListener('click', selectPlaylistOnClick));



/* ================================================================ *\
                            REVIEW CAROUSEL
\* ================================================================ */

let counter = -1;
const carouselSlider = document.querySelector('.carousel-slider');
const carouselItem = document.querySelectorAll('.carousel-item');
const size = carouselItem[0].clientWidth;
const next = document.getElementById('next');
const prev = document.getElementById('prev');

function autoCarouselSlide () {

    if (counter >= carouselItem.length - 1) {
        counter = -1;
    }

    counter++;
    carouselSlider.style.transform = 'translateX(' + (-size * counter) + 'px)';
    carouselSlider.style.transition = 'transform .25s ease-in-out';
    setTimeout(autoCarouselSlide, 5000);
    console.log(counter);

}

function nextSlide () {

    if (counter >= carouselItem.length - 1) {
        counter = -1;
    }

    counter++;
    carouselSlider.style.transform = 'translateX(' + (-size * counter) + 'px)';
    carouselSlider.style.transition = 'transform .25s ease-in-out';
}

function prevSlide () {

    if (counter <= 0) {
        counter = carouselItem.length;
    }

    counter--;
    carouselSlider.style.transform = 'translateX(' + (-size * counter) + 'px)';
    carouselSlider.style.transition = 'transform .25s ease-in-out';
    console.log(counter);
}

next.addEventListener('click', nextSlide);
prev.addEventListener('click', prevSlide);
document.addEventListener('DOMContentLoaded', autoCarouselSlide);


/* ================================================================ *\
                            NAVBAR
\* ================================================================ */

const navbar = document.getElementById('desktop-navbar');

function scrollFixedNavBar () {

    let pageWindow = window.pageYOffset;

    if (pageWindow > 80) {
        navbar.style.position = 'fixed';
        navbar.style.width = '100%';
        navbar.style.height = '8vh';
        navbar.style.zIndex = '999';
        navbar.style.backgroundColor = 'rgba(27, 29, 47, 1)';
    } else {
        navbar.style.position = 'absolute';
        navbar.style.width = '100%';
        navbar.style.height = '10vh';
        navbar.style.transition = 'none';
        navbar.style.zIndex = '999';
        navbar.style.backgroundColor = 'transparent';
    }
    console.log(pageWindow);
}

window.addEventListener('scroll', scrollFixedNavBar);