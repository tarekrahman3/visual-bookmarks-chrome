import Gmodal from 'glory-modal';
import { $createElement } from '../utils';

let confirm = false;
const template = /* html */
`<div class="gmodal__container gmodal__container--popup has-center">
  <div class="gmodal__dialog">
    <div class="gmodal__header">
      <div class="gmodal__title">${chrome.i18n.getMessage('ext_name')}</div>
      <button type="button" class="gmodal__close md-ripple" data-popup="reject" data-ripple-center>
        <svg version="1.1" width="24" height="24" viewBox="0 0 24 24" fill="#000">
          <path d="M18.984 6.422l-5.578 5.578 5.578 5.578-1.406 1.406-5.578-5.578-5.578 5.578-1.406-1.406 5.578-5.578-5.578-5.578 1.406-1.406 5.578 5.578 5.578-5.578z"></path>
        </svg>
      </button>
    </div>
    <div class="gmodal__body" id="popupBody"></div>
    <div class="gmodal__footer text-right">
      <button type="button" class="btn btn--clear md-ripple" data-popup="reject">${chrome.i18n.getMessage('btn_close')}</button>
      <button type="button" class="btn md-ripple" data-popup="resolve">Ok</button>
    </div>
  </div>
</div>`;
const popupEl = $createElement('div',
  {
    class: 'gmodal gmodal--popup',
    id: 'popup'
  },
  {
    innerHTML: template
  }
);
document.body.appendChild(popupEl);

const popupBody = document.getElementById('popupBody');
const controls = popupEl.querySelectorAll('[data-popup]');
const popupInstance = new Gmodal(popupEl, {
  closeBackdrop: false
});

function preparePopup(message) {
  popupBody.textContent = message;
}

function confirmPopup(message) {
  preparePopup(message);
  popupInstance.open();

  return new Promise((resolve) => {

    const handleClick = function() {
      const target = this.dataset.popup;
      confirm = (target === 'resolve');
      popupInstance.close();
    };

    const closePopup = function() {
      controls.forEach(control => {
        control.removeEventListener('click', handleClick);
      });
      popupInstance.element.removeEventListener('gmodal:close', closePopup);
      (confirm) ? resolve(true) : resolve(false);
      confirm = false;
    };
    controls.forEach(control => {
      control.addEventListener('click', handleClick);
    });
    popupInstance.element.addEventListener('gmodal:close', closePopup);
  });
}


export default confirmPopup;
