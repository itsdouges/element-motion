(function () {
  var start = document.getElementById('start');
  var end = document.getElementById('end');
  var closeButton = document.getElementById('close');
  var endContainer = document.getElementsByClassName('end-container')[0];
  var revealContainer = document.querySelector('.reveal-container');
  var itemsContainer = document.querySelector('.items');

  function transitionTo () {
    var fadeoutElement;    

    mtCore
      .expand(document.getElementById('start'), {
        duration: 0.5,
        background: '#3d7596',
        autoStart: true,
      })
      .promise
      .then(function (data) {
        fadeoutElement = data.target;
      });

    var moveAnimation = mtCore.move(start, {
      duration: 0.75,
      matchSize: true,
      autoCleanup: true,
    });

    moveAnimation
      .start(end)
      .then(function () {
        return mtCore.reveal(revealContainer, {
          duration: 0.5,
          showFromElement: end,
        });
      })
      .then(function (revealAnimation) {
        endContainer.style.opacity = 1;
        endContainer.style.zIndex = 1;

        return revealAnimation.start();
      })
      .then(function () {
        return mtCore.fadeout(fadeoutElement, {
          duration: 0.75,
          autoCleanup: true,
          autoStart: true,
        }).promise;
      })
      .then(function () {
        itemsContainer.style.opacity = 0;
        console.log('transitionTo: finished');
      });
  }

  function transitionFrom () {
    var revealAnimation = mtCore.reveal(revealContainer, {
      duration: 0.5,
      showFromElement: end,
      reverse: true,
    });

    revealAnimation
      .start()
      .then(function () {
        var moveAnimation = mtCore.move(end, {
          duration: 0.5,
          matchSize: true,
          autoCleanup: true,
        });

        endContainer.style.opacity = 0;
        endContainer.style.zIndex = -1;
        itemsContainer.style.opacity = 1;

        moveAnimation.start(start);

        return mtCore.expand(start, {
          duration: 0.5,
          background: '#3d7596',
          reverse: true,
          autoCleanup: true,
          autoStart: true,
        }).promise;
      })
      .then(function () {
        console.log('transitonFrom: finished')
      });
  }

  start.addEventListener('click', transitionTo);
  closeButton.addEventListener('click', transitionFrom);
})();