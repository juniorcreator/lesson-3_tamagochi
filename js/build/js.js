'use strict';

function Application(petName) {
  var _this = this;

  this.petName = petName;
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
  this.allowMusic = true;
  this.interval = null;
  this.itemInterval = null;
  this.counter = 0;
  this.props = {
    health: 10,
    happy: 20,
    playful: 50,
    boring: 100
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
  this.playPause = function () {
    _this.allowMusic ? _this.audio.play() : _this.audio.pause();
    console.log('onOffSong2');
  };
  this.onOffSong = function () {
    _this.audioControll.addEventListener('click', function (e) {
      _this.allowMusic = !_this.allowMusic;
      _this.playPause();
    });
  };
  this.setSong = function (song) {
    if (song === undefined) {
      _this.playPause();
      return;
    }
    _this.audio.setAttribute('src', song);
    _this.playPause();
  };
  this.showHideInfo = function () {
    var isInfo = true;
    var close = document.getElementById('close');
    var info = document.querySelector('.instructions__info');
    var instructions = document.querySelector('.instructions');
    close.addEventListener('click', function () {
      instructions.classList.add('hidden');
    });
    info.addEventListener('click', function () {
      instructions.classList.remove('hidden');
    });
  };
  this.btnEvents = function (e) {
    var btns = document.querySelectorAll('.button');
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      var _loop = function _loop() {
        var btn = _step.value;

        btn.addEventListener('click', function (e) {
          _this.selectedItem(btn.getAttribute('id'));
        });
      };

      for (var _iterator = btns[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        _loop();
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
  this.setProps = function (_ref) {
    var health = _ref.health,
        happy = _ref.happy,
        playful = _ref.playful,
        boring = _ref.boring;

    _this.health.textContent = health + '%';
    _this.happy.textContent = happy + '%';
    _this.playful.textContent = playful + '%';
    _this.boring.textContent = boring + '%';
  };
  this.setOneProperty = function (element, value) {
    var el = _this[element].parentElement.parentElement.firstElementChild.firstElementChild;
    el.style.width = _this.props[value] + '%';
  };
  this.setInitialProperty = function () {
    for (var prop in _this.props) {
      _this.setOneProperty(prop, prop);
    }
  };
  this.downProperties = function () {
    var interval = 1000 * 2;
    _this.interval = setInterval(function () {
      _this.props.health -= _this.props.health > 0 ? 1 : 0;
      _this.props.happy -= _this.props.happy > 0 ? 1 : 0;
      _this.props.playful -= _this.props.playful > 0 ? 1 : 0;
      _this.props.boring += _this.props.boring < 100 ? 1 : 0;
      _this.setInitialProperty();
      _this.setProps(_this.props);
      _this.die();
    }, interval);

    console.log('setInterval');
  };
  this.selectedItem = function (id) {
    switch (id) {
      case 'bt-1':
        _this.itemImage.setAttribute('src', _this.imgPath + _this.images.eat);
        _this.patDoing.textContent = '"' + (_this.petName + ' is eating') + '"';
        _this.setSong(_this.songs.eat);
        _this.eat();
        break;
      case 'bt-2':
        _this.itemImage.setAttribute('src', _this.imgPath + _this.images.drink);
        _this.patDoing.textContent = '"' + (_this.petName + ' is drinking') + '"';
        _this.setSong(_this.songs.drink);
        _this.drink();
        break;
      case 'bt-3':
        _this.itemImage.setAttribute('src', _this.imgPath + _this.images.walk);
        _this.patDoing.textContent = '"' + (_this.petName + ' is walking') + '"';
        _this.setSong(_this.songs.walk);
        _this.walk();
        break;
      case 'bt-4':
        _this.itemImage.setAttribute('src', _this.imgPath + _this.images.dance);
        _this.patDoing.textContent = '"' + (_this.petName + ' is dancing') + '"';
        _this.setSong(_this.songs.dance);
        _this.dance();
        break;
      case 'bt-5':
        _this.itemImage.setAttribute('src', _this.imgPath + _this.images.play);
        _this.patDoing.textContent = '"' + (_this.petName + ' is playing') + '"';
        _this.setSong(_this.songs.play);
        _this.play();
        break;
      case 'bt-6':
        _this.itemImage.setAttribute('src', _this.imgPath + _this.images.sleep);
        _this.patDoing.textContent = '"' + (_this.petName + ' is sleeping') + '"';
        _this.setSong(_this.songs.sleep);
        _this.sleep();
        break;
      default:
        break;
    }
  };
  this.resetUfterUpdating = function () {
    clearInterval(_this.itemInterval);
    _this.downProperties();
    _this.itemImage.setAttribute('src', _this.imgPath + _this.images.main);
    _this.setSong(_this.songs.main);
  };
  this.cleaMainInterval = function () {
    clearInterval(_this.interval);
  };
  this.dance = function () {
    _this.cleaMainInterval();
    clearInterval(_this.itemInterval);
    _this.counter = 0;
    _this.itemInterval = setInterval(function () {
      _this.counter++;
      _this.props.playful += _this.props.playful <= 99 ? 1 : 0;
      _this.props.boring -= _this.props.boring >= 0 ? 1 : 0;
      _this.setInitialProperty();
      _this.setProps(_this.props);
      if (_this.counter === 20 || _this.props.playful === 100 || _this.props.boring === 0) {
        _this.patDoing.textContent = _this.props.playful === 100 ? 'Woooow enougph to dance' : _this.patDoing.textContent;
        _this.resetUfterUpdating();
        _this.counter = 0;
      }
    }, 200);
  };
  this.eat = function () {
    _this.cleaMainInterval();
    clearInterval(_this.itemInterval);
    _this.counter = 0;
    _this.itemInterval = setInterval(function () {
      _this.counter++;
      _this.props.health += _this.props.health <= 99 ? 1 : 0;
      _this.setInitialProperty();
      _this.setProps(_this.props);
      if (_this.counter === 20 || _this.props.health === 100) {
        _this.patDoing.textContent = _this.props.health === 100 ? 'That il all I do not wanna eat' : _this.patDoing.textContent;
        _this.resetUfterUpdating();
        _this.counter = 0;
      }
    }, 1500);
  };
  this.drink = function () {
    _this.cleaMainInterval();
    clearInterval(_this.itemInterval);
    _this.counter = 0;
    _this.itemInterval = setInterval(function () {
      _this.counter++;
      _this.props.happy += _this.props.happy <= 99 ? 1 : 0;
      _this.props.boring -= _this.props.boring >= 0 ? 1 : 0;
      _this.setInitialProperty();
      _this.setProps(_this.props);
      if (_this.counter === 20 || _this.props.happy === 100 || _this.props.boring === 0) {
        _this.patDoing.textContent = _this.props.happy === 100 ? 'Woooow enougph to drink' : _this.patDoing.textContent;
        _this.resetUfterUpdating();
        _this.counter = 0;
      }
    }, 800);
  };
  this.walk = function () {
    _this.cleaMainInterval();
    clearInterval(_this.itemInterval);
    _this.counter = 0;
    _this.itemInterval = setInterval(function () {
      _this.counter++;
      _this.props.health += _this.props.health <= 99 ? 1 : 0;
      _this.props.boring -= _this.props.boring >= 0 ? 1 : 0;
      _this.setInitialProperty();
      _this.setProps(_this.props);
      if (_this.counter === 20 || _this.props.health === 100 || _this.props.boring === 0) {
        _this.patDoing.textContent = _this.props.health === 100 ? 'Woooow enougph to walk' : _this.patDoing.textContent;
        _this.resetUfterUpdating();
        _this.counter = 0;
      }
    }, 800);
  };
  this.play = function () {
    _this.cleaMainInterval();
    clearInterval(_this.itemInterval);
    _this.counter = 0;
    _this.itemInterval = setInterval(function () {
      _this.counter++;
      _this.props.happy += _this.props.happy <= 99 ? 1 : 0;
      _this.props.boring -= _this.props.boring >= 0 ? 1 : 0;
      _this.setInitialProperty();
      _this.setProps(_this.props);
      if (_this.counter === 20 || _this.props.happy === 100 || _this.props.boring === 0) {
        _this.patDoing.textContent = _this.props.happy === 100 ? 'I played too much, need to relax' : _this.patDoing.textContent;
        _this.resetUfterUpdating();
        _this.counter = 0;
      }'';
    }, 900);
  };
  this.sleep = function () {
    _this.cleaMainInterval();
    clearInterval(_this.itemInterval);
    _this.counter = 0;
    _this.itemInterval = setInterval(function () {
      _this.counter++;
      _this.props.health += _this.props.health <= 99 ? 1 : 0;
      _this.props.happy += _this.props.happy <= 99 ? 1 : 0;
      _this.setInitialProperty();
      _this.setProps(_this.props);
      if (_this.counter === 20 || _this.props.health === 100 || _this.props.happy === 100) {
        _this.patDoing.textContent = _this.props.health === 100 ? 'Woooow enougph to sleep' : _this.patDoing.textContent;
        _this.resetUfterUpdating();
        _this.counter = 0;
      }
    }, 200);
  };
  this.blockButtons = function () {
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = _this.buttons[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var _btn = _step2.value;

        _btn.classList.add('disabled');
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
  this.unblockButtons = function () {
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = _this.buttons[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var _btn2 = _step3.value;

        _btn2.classList.remove('disabled');
      }
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3.return) {
          _iterator3.return();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }
  };
  this.die = function () {
    var isDead = _this.props.health === 0;
    if (isDead) {
      _this.itemImage.setAttribute('src', _this.imgPath + _this.images.rip);
      _this.patDoing.textContent = 'Oh no';
      _this.allowMusic = false;
      _this.tamagochi.classList.add('die');
      _this.playPause();
      _this.blockButtons();
      clearInterval(_this.interval);
    }
  };
  this.riseAgain = function () {};
  this.init = function () {
    _this.onOffSong();
    _this.showHideInfo();
    _this.btnEvents();
    _this.setProps(_this.props);
    _this.setInitialProperty();
    _this.downProperties();
  };
}

if (!localStorage.getItem('petName')) {
  var patName = prompt('Enter pat name') || 'Pall';
  localStorage.setItem('petName', patName);
}
var zombie = new Application(localStorage.getItem('petName'));
console.log(localStorage.getItem('petName'));
zombie.init();