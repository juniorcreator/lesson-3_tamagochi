'use strict';

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
    health: 100,
    happy: 50,
    playful: 20,
    boring: 0
  };
}
function patCanDo() {
  var _this = this;

  this.beforeToDo = function () {
    clearInterval(_this.interval);
    clearInterval(_this.itemInterval);
    _this.counter = 0;
  };
  this.dance = function () {
    _this.beforeToDo();
    _this.itemInterval = setInterval(function () {
      _this.counter++;
      _this.props.playful += _this.props.playful <= 99 ? 1 : 0;
      _this.props.boring -= _this.props.boring > 0 ? 1 : 0;
      _this.setInitialProperty();
      _this.setProps(_this.props);
      if (_this.counter === 20) {
        _this.patDoing.textContent = _this.props.playful === 100 ? 'Woooow enougph to dance' : _this.patDoing.textContent;
        _this.resetUfterUpdating();
        _this.counter = 0;
      }
    }, 800);
  };
  this.eat = function () {
    _this.beforeToDo();
    _this.itemInterval = setInterval(function () {
      _this.counter++;
      _this.props.health += _this.props.health <= 99 ? 1 : 0;
      _this.setInitialProperty();
      _this.setProps(_this.props);
      if (_this.counter === 20) {
        _this.patDoing.textContent = _this.props.health === 100 ? 'That is all I do not wanna eat' : _this.patDoing.textContent;
        _this.resetUfterUpdating();
        _this.counter = 0;
      }
    }, 1000);
  };
  this.drink = function () {
    _this.beforeToDo();
    _this.itemInterval = setInterval(function () {
      _this.counter++;
      _this.props.happy += _this.props.happy <= 99 ? 1 : 0;
      _this.props.boring -= _this.props.boring > 0 ? 1 : 0;
      _this.setInitialProperty();
      _this.setProps(_this.props);
      if (_this.counter === 20) {
        _this.patDoing.textContent = _this.props.happy === 100 ? 'Woooow enougph to drink' : _this.patDoing.textContent;
        _this.resetUfterUpdating();
        _this.counter = 0;
      }
    }, 900);
  };
  this.walk = function () {
    _this.beforeToDo();
    _this.itemInterval = setInterval(function () {
      _this.counter++;
      _this.props.health += _this.props.health <= 99 ? 1 : 0;
      _this.props.boring -= _this.props.boring > 0 ? 1 : 0;
      _this.setInitialProperty();
      _this.setProps(_this.props);
      if (_this.counter === 20) {
        _this.patDoing.textContent = _this.props.health === 100 ? 'Woooow enougph to walk' : _this.patDoing.textContent;
        _this.resetUfterUpdating();
        _this.counter = 0;
      }
    }, 800);
  };
  this.play = function () {
    _this.beforeToDo();
    _this.itemInterval = setInterval(function () {
      _this.counter++;
      _this.props.playful += _this.props.playful <= 99 ? 1 : 0;
      _this.setInitialProperty();
      _this.setProps(_this.props);
      if (_this.counter === 20) {
        _this.patDoing.textContent = _this.props.playful === 100 ? 'I played too much, need to relax' : _this.patDoing.textContent;
        _this.resetUfterUpdating();
        _this.counter = 0;
      }
    }, 900);
  };
  this.sleep = function () {
    _this.beforeToDo();
    _this.itemInterval = setInterval(function () {
      _this.counter++;
      _this.props.health += _this.props.health <= 99 ? 1 : 0;
      _this.props.happy += _this.props.happy <= 99 ? 1 : 0;
      _this.setInitialProperty();
      _this.setProps(_this.props);
      if (_this.counter === 20) {
        _this.patDoing.textContent = _this.props.health === 100 ? 'Woooow enough to sleep' : _this.patDoing.textContent;
        _this.resetUfterUpdating();
        _this.counter = 0;
      }
    }, 800);
  };
  this.blockButtons = function () {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = _this.buttons[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var btn = _step.value;

        btn.classList.add('disabled');
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  };
  this.die = function () {
    if (!_this.props.health) {
      _this.itemImage.setAttribute('src', _this.imgPath + _this.images.rip);
      _this.tamagochi.classList.add('die');
      _this.blockButtons();
      clearInterval(_this.interval);
      _this.patDoing.textContent = 'Oh no';
      _this.audioControll.click();
      _this.allowMusic = false;
      _this.playPause();
    }
  };
  this.riseAgain = function () {
    _this.riseBtn.addEventListener('click', function () {
      localStorage.setItem('petName', '');
      location.reload();
    });
  };
}

function Application(petName) {
  var _this2 = this;

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
  this.welcome = function () {
    _this2.patDoing.textContent = 'Hello I am ' + _this2.petName;
  };
  this.playPause = function () {
    _this2.allowMusic ? _this2.audio.play() : _this2.audio.pause();
  };
  this.onOffSong = function () {
    _this2.audioControll.addEventListener('click', function (e) {
      _this2.audioControll.classList.toggle('play');
      _this2.allowMusic = !_this2.allowMusic;
      _this2.playPause();
    });
    _this2.audioControll.click();
  };
  this.setSong = function (song) {
    _this2.audio.setAttribute('src', song);
    _this2.playPause();
  };
  this.showHideInfo = function () {
    var instructions = document.querySelector('.instructions');
    document.getElementById('close').addEventListener('click', function () {
      instructions.classList.add('hidden');
    });
    document.querySelector('.instructions__info').addEventListener('click', function () {
      instructions.classList.remove('hidden');
    });
  };
  this.btnEvents = function (e) {
    var btns = document.querySelectorAll('.button');
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      var _loop = function _loop() {
        var btn = _step2.value;

        btn.addEventListener('click', function (e) {
          _this2.selectedItem(btn.getAttribute('id'), btn.dataset.btn, btn.dataset.doing);
        });
      };

      for (var _iterator2 = btns[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        _loop();
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
  };
  this.setProps = function (_ref) {
    var health = _ref.health,
        happy = _ref.happy,
        playful = _ref.playful,
        boring = _ref.boring;

    _this2.health.textContent = health + '%';
    _this2.happy.textContent = happy + '%';
    _this2.playful.textContent = playful + '%';
    _this2.boring.textContent = boring + '%';
  };
  this.setInitialProperty = function () {
    for (var prop in _this2.props) {
      var el = _this2[prop].parentElement.parentElement.firstElementChild.firstElementChild;
      el.style.width = _this2.props[prop] + '%';
    }
  };
  this.downProperties = function () {
    _this2.interval = setInterval(function () {
      _this2.props.health -= _this2.props.health > 0 ? 1 : 0;
      _this2.props.happy -= _this2.props.happy > 0 ? 1 : 0;
      _this2.props.playful -= _this2.props.playful > 0 ? 1 : 0;
      _this2.props.boring += _this2.props.boring < 100 ? 1 : 0;
      _this2.setInitialProperty();
      _this2.setProps(_this2.props);
      _this2.die();
      _this2.autoTalker();
    }, _this2.gameSpeed);
  };
  this.selectedItem = function (id, src, doing) {
    _this2.itemImage.setAttribute('src', _this2.imgPath + _this2.images[src]);
    _this2.setSong(_this2.songs[src]);
    _this2.patDoing.textContent = '"' + _this2.petName + '" is ' + doing;
    _this2[src]();
  };
  this.resetUfterUpdating = function () {
    clearInterval(_this2.itemInterval);
    _this2.downProperties();
    _this2.itemImage.setAttribute('src', _this2.imgPath + _this2.images.main);
    _this2.setSong(_this2.songs.main);
  };
  this.cleaMainInterval = function () {
    clearInterval(_this2.interval);
  };
  this.autoTalker = function () {
    _this2.patDoing.textContent = _this2.props.health === 0 ? 'OH no' : _this2.props.health < 30 ? 'Hey, feed me' : _this2.props.happy < 30 ? 'I am not happy(' : _this2.props.playful < 30 ? 'Wanna play' : _this2.patDoing.textContent;
  };
  this.init = function () {
    _this2.welcome();
    _this2.riseAgain();
    _this2.onOffSong();
    _this2.showHideInfo();
    _this2.btnEvents();
    _this2.setProps(_this2.props);
    _this2.setInitialProperty();
    _this2.downProperties();
  };
}

if (!localStorage.getItem('petName')) {
  var patName = prompt('Enter pat name') || 'Pall';
  localStorage.setItem('petName', patName);
}
new Application(localStorage.getItem('petName')).init();