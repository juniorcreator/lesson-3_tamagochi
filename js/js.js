function DoomElements() {
  this.tamagochi = document.getElementById('tamagochi');
  this.itemImage = document.querySelector('#screen-wrap img');
  this.imgPath = 'img/pumpkin/';
  this.patDoing = document.getElementById('pat-doing');
  this.audio = document.getElementById('song');
  this.audioControll = document.getElementById('play');
  this.health = document.getElementById('health');
  this.happy = document.getElementById('happy');
  this.playful = document.getElementById('playful');
  this.boring = document.getElementById('boring');
  this.buttons = document.querySelectorAll('.button');
  this.riseBtn = document.getElementById('rise-again');
}
function ImagesSongs() {
  this.images = {
    dance: 'dance.gif',
    drink: 'drink.gif',
    eat: 'eat.gif',
    main: 'main.gif',
    sleep: 'sleep.gif',
    walk: 'walk.gif',
    play: 'play.gif',
    rip: 'rip.jpeg'
  };
  this.songs = {
    main: 'song/1.mp3',
    long: 'song/2.mp3',
    dance: 'song/3.mp3',
    sleep: 'song/sleep.mp3',
    drink: 'song/drink.mp3',
    walk: 'song/walk.mp3',
    eat: 'song/eat.mp3',
    play: 'song/play.mp3'
  };
}
function Props() {
  this.props = {
    health: 100 ,
    happy: 50,
    playful: 20,
    boring: 0
  };
}
function PatCanDo() {
  this.dance = () => {
    this.cleaMainInterval();
    clearInterval(this.itemInterval);
    this.counter = 0;
    this.itemInterval = setInterval(() => {
      this.counter++;
      this.props.playful += this.props.playful <= 99 ? 1 : 0;
      this.props.boring -= this.props.boring > 0 ? 1 : 0;
      this.setInitialProperty();
      this.setProps(this.props);
      if (this.counter === 20 || (this.props.playful === 100 && this.props.boring === 0)) {
        this.patDoing.textContent = this.props.playful === 100
            ? 'Woooow enougph to dance'
            : this.patDoing.textContent;
        this.resetUfterUpdating();
        this.counter = 0;
      }
    }, 800);
  };
  this.eat = () => {
    this.cleaMainInterval();
    clearInterval(this.itemInterval);
    this.counter = 0;
    this.itemInterval = setInterval(() => {
      this.counter++;
      this.props.health += this.props.health <= 99 ? 1 : 0;
      this.setInitialProperty();
      this.setProps(this.props);
      if ( this.counter === 20 || this.props.health === 100 ) {
        this.patDoing.textContent = this.props.health === 100
            ? 'That il all I do not wanna eat'
            : this.patDoing.textContent;
        this.resetUfterUpdating();
        this.counter = 0;
      }
    }, 1000);
  };
  this.drink = () => {
    this.cleaMainInterval();
    clearInterval(this.itemInterval);
    this.counter = 0;
    this.itemInterval = setInterval(() => {
      this.counter++;
      this.props.happy += this.props.happy <= 99 ? 1 : 0;
      this.props.boring -= this.props.boring > 0 ? 1 : 0;
      this.setInitialProperty();
      this.setProps(this.props);
      if ( this.counter === 20 || this.props.happy === 100 || this.props.boring === 0) {
        this.patDoing.textContent = this.props.happy === 100
            ? 'Woooow enougph to drink'
            : this.patDoing.textContent;
        this.resetUfterUpdating();
        this.counter = 0;
      }
    }, 900);
  };
  this.walk = () => {
    this.cleaMainInterval();
    clearInterval(this.itemInterval);
    this.counter = 0;
    this.itemInterval = setInterval(() => {
      this.counter++;
      this.props.health += this.props.health <= 99 ? 1 : 0;
      this.props.boring -= this.props.boring >= 0 ? 1 : 0;
      this.setInitialProperty();
      this.setProps(this.props);
      if ( this.counter === 20 || this.props.health === 100 || this.props.boring === 0) {
        this.patDoing.textContent = this.props.health === 100
            ? 'Woooow enougph to walk'
            : this.patDoing.textContent;
        this.resetUfterUpdating();
        this.counter = 0;
      }
    }, 800);
  };
  this.play = () => {
    this.cleaMainInterval();
    clearInterval(this.itemInterval);
    this.counter = 0;
    this.itemInterval = setInterval(() => {
      this.counter++;
      this.props.playful += this.props.playful <= 99 ? 1 : 0;
      this.setInitialProperty();
      this.setProps(this.props);
      if (this.counter === 20 || this.props.playful === 100) {
        this.patDoing.textContent = this.props.playful === 100
            ? 'I played too much, need to relax'
            : this.patDoing.textContent;
        this.resetUfterUpdating();
        this.counter = 0;
      }``
    }, 900);
  };
  this.sleep = () => {
    this.cleaMainInterval();
    clearInterval(this.itemInterval);
    this.counter = 0;
    this.itemInterval = setInterval(() => {
      this.counter++;
      this.props.health += this.props.health <= 99 ? 1 : 0;
      this.props.happy += this.props.happy <= 99 ? 1 : 0;
      this.setInitialProperty();
      this.setProps(this.props);
      if ( this.counter === 20 || (this.props.health === 100 && this.props.happy === 100)) {
        this.patDoing.textContent = this.props.health === 100
            ? 'Woooow enough to sleep'
            : this.patDoing.textContent;
        this.resetUfterUpdating();
        this.counter = 0;
      }
    }, 800);
  };
  this.blockButtons = () => {
    for (let btn of this.buttons) {
      btn.classList.add('disabled');
    }
  };
  this.die = () => {
    let isDead = this.props.health === 0;
    if (isDead) {
      this.itemImage.setAttribute('src', this.imgPath + this.images.rip);
      this.patDoing.textContent = 'Oh no';
      this.allowMusic = false;
      this.tamagochi.classList.add('die');
      this.playPause();
      this.blockButtons();
      clearInterval(this.interval);
    }
  };
  this.riseAgain = () => {
    this.riseBtn.addEventListener('click', () => {
      localStorage.setItem('petName', '');
      location.reload();
    });
  };
}
function Application(petName) {
  DoomElements.call(this);
  ImagesSongs.call(this);
  Props.call(this);
  PatCanDo.call(this);
  this.gameSpeed = 1000;
  this.petName = petName || 'Pall';
  this.allowMusic = true;
  this.interval = null;
  this.itemInterval = null;
  this.counter = 0;
  this.welcome = () => {
    this.patDoing.textContent = `Hello I am ${this.petName}`;
  };
  this.playPause = () => {
    this.allowMusic ? this.audio.play() : this.audio.pause();
  };
  this.onOffSong = () => {
    this.audioControll.addEventListener('click', (e) => {
      this.allowMusic = !this.allowMusic;
      this.playPause();
    });
  };
  this.setSong = (song) => {
    if (song === undefined) {
      this.playPause();
      return;
    }
      this.audio.setAttribute('src', song);
      this.playPause();
  };
  this.showHideInfo = () => {
    let close = document.getElementById('close');
    let info = document.querySelector('.instructions__info');
    let instructions = document.querySelector('.instructions');
    close.addEventListener('click', () => {
      instructions.classList.add('hidden');
    });
    info.addEventListener('click', () => {
      instructions.classList.remove('hidden');
    })
  };
  this.btnEvents = (e) => {
    let btns = document.querySelectorAll('.button');
    for (let btn of btns) {
      btn.addEventListener('click', (e) => {
        this.selectedItem(btn.getAttribute('id'));
      });
    }
  };
  this.setProps = ({health, happy, playful, boring}) => {
    this.health.textContent = health + '%';
    this.happy.textContent = happy + '%';
    this.playful.textContent = playful + '%';
    this.boring.textContent = boring + '%';
  };
  this.setOneProperty = (element, value) => {
    let el = this[element].parentElement.parentElement.firstElementChild.firstElementChild;
    el.style.width = this.props[value] + '%';
  };
  this.setInitialProperty = () => {
    for (let prop in this.props) {
      this.setOneProperty(prop, prop);
    }
  };
  this.downProperties = () => {
    this.interval = setInterval(() => {
      this.props.health -= this.props.health > 0 ? 1 : 0;
      this.props.happy -= this.props.happy > 0 ? 1 : 0;
      this.props.playful -= this.props.playful > 0 ? 1 : 0;
      this.props.boring += this.props.boring < 100 ? 1 : 0;
      this.setInitialProperty();
      this.setProps(this.props);
      this.die();
      this.autoTalker();
    }, this.gameSpeed);
  };
  this.selectedItem = (id) => {
    switch (id) {
      case 'bt-1' :
        this.itemImage.setAttribute('src', this.imgPath + this.images.eat);
        this.patDoing.textContent = `"${this.petName + ' is eating'}"`;
        this.setSong(this.songs.eat);
        this.eat();
        break;
      case 'bt-2' :
        this.itemImage.setAttribute('src', this.imgPath + this.images.drink);
        this.patDoing.textContent = `"${this.petName + ' is drinking'}"`;
        this.setSong(this.songs.drink);
        this.drink();
        break;
      case 'bt-3' :
        this.itemImage.setAttribute('src', this.imgPath + this.images.walk);
        this.patDoing.textContent = `"${this.petName + ' is walking'}"`;
        this.setSong(this.songs.walk);
        this.walk();
        break;
      case 'bt-4' :
        this.itemImage.setAttribute('src', this.imgPath + this.images.dance);
        this.patDoing.textContent = `"${this.petName + ' is dancing'}"`;
        this.setSong(this.songs.dance);
        this.dance();
        break;
      case 'bt-5' :
        this.itemImage.setAttribute('src', this.imgPath + this.images.play);
        this.patDoing.textContent = `"${this.petName + ' is playing'}"`;
        this.setSong(this.songs.play);
        this.play();
        break;
      case 'bt-6' :
        this.itemImage.setAttribute('src', this.imgPath + this.images.sleep);
        this.patDoing.textContent = `"${this.petName + ' is sleeping'}"`;
        this.setSong(this.songs.sleep);
        this.sleep();
        break;
      default:
        break;
    }
  };
  this.resetUfterUpdating = () => {
    clearInterval(this.itemInterval);
    this.downProperties();
    this.itemImage.setAttribute('src',
        this.imgPath + this.images.main);
    this.setSong(this.songs.main);
  };
  this.cleaMainInterval = () => {clearInterval(this.interval);};
  this.autoTalker = () => {
    this.patDoing.textContent = this.props.health < 30 ?
        'Hey, feed me': this.props.happy < 30 ?
        'I am not happy(' : this.props.playful < 30 ?
        'Wanna play' : this.props.boring > 50 ?
        'it is getting boring' : this.patDoing.textContent;
  };
  this.init = () => {
    this.welcome();
    this.riseAgain();
    this.onOffSong();
    this.showHideInfo();
    this.btnEvents();
    this.setProps(this.props);
    this.setInitialProperty();
    this.downProperties();
  };
}

if (!localStorage.getItem('petName')) {
  let patName = prompt('Enter pat name') || 'Pall';
  localStorage.setItem('petName', patName);
}
new Application(localStorage.getItem('petName')).init();