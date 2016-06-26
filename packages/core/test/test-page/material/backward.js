(function () {
  function getSpeed () {
    return 1;
  };

  function fade (element, onFinish) {
    mtCore.fadeout(element, {
      duration: 0.75 / getSpeed(),
      onStart: function () {
        console.log('fadeout:start');
      },
      onFinish: function () {
        console.log('fadeout:finish');
        onFinish && onFinish();
      },
    });
  }

  function fadeout (onFinish) {
    fade(document.getElementById('start'), onFinish);
  };

  function move (onFinish, onStart) {
    // Prepare starting element.
    const setEndElement = mtCore.move(document.getElementById('end'), {
      duration: 0.5 / getSpeed(),
      matchSize: true,
      cleanup: true,
      onStart: function () {
        console.log('move:start');
        onStart && onStart();
      },
      onFinish: function () {
        console.log('move:finish');
        onFinish && onFinish();
      },
    });

    // Prepare end element, can set it async (wait for page load).
    const doMove = setEndElement(document.getElementById('start'));

    // Fire when you want.
    setTimeout(doMove, 0 / getSpeed());
  }

  let fadeOutElement;

  function expand (onStart) {
    mtCore.expand(document.getElementById('start'), {
      duration: 0.5 / getSpeed(),
      background: '#3d7596',
      reverse: true,
      cleanup: true,
      coverage: 'contain',
      onStart: function () {
        console.log('expand:start');
        onStart && onStart();
      },
      onFinish: function (e) {
        fadeOutElement = e;
        console.log('expand:finish');
      },
    });
  }

  function prepareReveal (onFinish) {
    return mtCore.reveal(document.querySelector('.reveal-container'), {
      duration: 0.5 / getSpeed(),
      showFromElement: document.getElementById('end'),
      reverse: true,
      onStart: function () {
        console.log('reveal:start');
      },
      onFinish: function () {
        console.log('reveal:finish');
        onFinish && onFinish();
      },
    });
  }

  function reveal (onFinish) {
    const doReveal = prepareReveal(onFinish);
    document.querySelector('.end-container').style.opacity = 1;
    doReveal();
  }

  function close () {
    document.querySelector('.items').style.opacity = 0;
    document.getElementsByClassName('end-container')[0].style.zIndex = -1;
    reveal(function () {
      move(null, function () {
        expand(function () {
          document.querySelector('.items').style.opacity = 1;
        });
        document.querySelector('.end-container').style.opacity = 0;
      });
    });
  }

  document.getElementById('close').addEventListener('click', close);
})();
