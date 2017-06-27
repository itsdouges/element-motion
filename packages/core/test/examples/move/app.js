const yubaba = window.yubaba;
const rootElement = document.getElementById('root');

const getStartElement = () => document.querySelector('.square');
const getEndElement = () => document.querySelector('.square.small');
const setElementHidden = (element, hidden) => (hidden
  ? element.classList.add('hidden')
  : element.classList.remove('hidden'));

function renderEndState () {
  rootElement.innerHTML = `
<div class="square small"></div>
  `;

  const element = getEndElement();
  element.addEventListener('click', () => {
    const transition = yubaba.move(element, {
      duration: 0.75,
      matchSize: true,
      autoCleanup: true,
    });

    // eslint-disable-next-line
    renderStartState();

    const endElement = getStartElement();
    setElementHidden(endElement, true);
    transition.start(endElement).then(() => setElementHidden(endElement, false));
  });
}

function renderStartState () {
  rootElement.innerHTML = `
<div class="spacer"></div>
<div class="square"></div>
  `;

  const element = getStartElement();
  element.addEventListener('click', () => {
    const transition = yubaba.move(element, {
      duration: 0.75,
      matchSize: true,
      autoCleanup: true,
    });

    renderEndState();

    const endElement = getEndElement();
    setElementHidden(endElement, true);
    transition.start(endElement).then(() => setElementHidden(endElement, false));
  });
}

renderStartState();
