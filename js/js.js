function doomElements() {
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
function imagesSongs() {
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
function props() {
  this.props = {
    health: 100 ,
    happy: 50,
    playful: 20,
    boring: 0
  };
}
function patCanDo() {
  this.beforeToDo = () => {
    clearInterval(this.interval);
    clearInterval(this.itemInterval);
    this.counter = 0;
  };
  this.dance = () => {
    this.beforeToDo();
    this.itemInterval = setInterval(() => {
      this.counter++;
      this.props.playful += this.props.playful <= 99 ? 1 : 0;
      this.props.boring -= this.props.boring > 0 ? 1 : 0;
      this.setInitialProperty();
      this.setProps(this.props);
      if (this.counter === 20 ) {
        this.patDoing.textContent = this.props.playful === 100
            ? 'Woooow enougph to dance'
            : this.patDoing.textContent;
        this.resetUfterUpdating();
        this.counter = 0;
      }
    }, 800);
  };
  this.eat = () => {
    this.beforeToDo();
    this.itemInterval = setInterval(() => {
      this.counter++;
      this.props.health += this.props.health <= 99 ? 1 : 0;
      this.setInitialProperty();
      this.setProps(this.props);
      if ( this.counter === 20 ) {
        this.patDoing.textContent = this.props.health === 100
            ? 'That is all I do not wanna eat'
            : this.patDoing.textContent;
        this.resetUfterUpdating();
        this.counter = 0;
      }
    }, 1000);
  };
  this.drink = () => {
    this.beforeToDo();
    this.itemInterval = setInterval(() => {
      this.counter++;
      this.props.happy += this.props.happy <= 99 ? 1 : 0;
      this.props.boring -= this.props.boring > 0 ? 1 : 0;
      this.setInitialProperty();
      this.setProps(this.props);
      if ( this.counter === 20 ) {
        this.patDoing.textContent = this.props.happy === 100
            ? 'Woooow enougph to drink'
            : this.patDoing.textContent;
        this.resetUfterUpdating();
        this.counter = 0;
      }
    }, 900);
  };
  this.walk = () => {
    this.beforeToDo();
    this.itemInterval = setInterval(() => {
      this.counter++;
      this.props.health += this.props.health <= 99 ? 1 : 0;
      this.props.boring -= this.props.boring > 0 ? 1 : 0;
      this.setInitialProperty();
      this.setProps(this.props);
      if ( this.counter === 20 ) {
        this.patDoing.textContent = this.props.health === 100
            ? 'Woooow enougph to walk'
            : this.patDoing.textContent;
        this.resetUfterUpdating();
        this.counter = 0;
      }
    }, 800);
  };
  this.play = () => {
    this.beforeToDo();
    this.itemInterval = setInterval(() => {
      this.counter++;
      this.props.playful += this.props.playful <= 99 ? 1 : 0;
      this.setInitialProperty();
      this.setProps(this.props);
      if (this.counter === 20 ) {
        this.patDoing.textContent = this.props.playful === 100
            ? 'I played too much, need to relax'
            : this.patDoing.textContent;
        this.resetUfterUpdating();
        this.counter = 0;
      }
    }, 900);
  };
  this.sleep = () => {
    this.beforeToDo();
    this.itemInterval = setInterval(() => {
      this.counter++;
      this.props.health += this.props.health <= 99 ? 1 : 0;
      this.props.happy += this.props.happy <= 99 ? 1 : 0;
      this.setInitialProperty();
      this.setProps(this.props);
      if ( this.counter === 20 ) {
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
    if (!this.props.health) {
      this.itemImage.setAttribute('src', this.imgPath + this.images.rip);
      this.tamagochi.classList.add('die');
      this.blockButtons();
      clearInterval(this.interval);
      this.patDoing.textContent = 'Oh no';
      this.audioControll.click();
      this.allowMusic = false;
      this.playPause();
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
  doomElements.call(this);
  imagesSongs.call(this);
  props.call(this);
  patCanDo.call(this);
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
      this.audioControll.classList.toggle('play');
      this.allowMusic = !this.allowMusic;
      this.playPause();
    });
    this.audioControll.click();
  };
  this.setSong = (song) => {
      this.audio.setAttribute('src', song);
      this.playPause();
  };
  this.showHideInfo = () => {
    let instructions = document.querySelector('.instructions');
    document.getElementById('close').addEventListener('click', () => {
      instructions.classList.add('hidden');
    });
    document.querySelector('.instructions__info').addEventListener('click', () => {
      instructions.classList.remove('hidden');
    })
  };
  this.btnEvents = (e) => {
    let btns = document.querySelectorAll('.button');
    for (let btn of btns) {
      btn.addEventListener('click', (e) => {
        this.selectedItem(btn.getAttribute('id'),
            btn.dataset.btn,
            btn.dataset.doing
        );
      });
    }
  };
  this.setProps = ({health, happy, playful, boring}) => {
    this.health.textContent = health + '%';
    this.happy.textContent = happy + '%';
    this.playful.textContent = playful + '%';
    this.boring.textContent = boring + '%';
  };
  this.setInitialProperty = () => {
    for (let prop in this.props) {
      let el = this[prop].parentElement.parentElement.firstElementChild.firstElementChild;
      el.style.width = this.props[prop] + '%';
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
  this.selectedItem = (id, src, doing) => {
    this.itemImage.setAttribute('src', this.imgPath + this.images[src]);
    this.setSong(this.songs[src]);
    this.patDoing.textContent = `"${this.petName}" is ${doing}`;
    this[src]();
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
    this.patDoing.textContent = this.props.health === 0 ?
        'OH no' : this.props.health < 30 ?
        'Hey, feed me': this.props.happy < 30 ?
        'I am not happy(' : this.props.playful < 30 ?
        'Wanna play' : this.patDoing.textContent;
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