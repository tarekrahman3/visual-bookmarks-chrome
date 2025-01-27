
export function $createElement(tag, attributes = {}, ...children) {
  const element = document.createElement(tag);
  for (const attribute in attributes) {
    if (Object.prototype.hasOwnProperty.call(attributes, attribute)) {
      element.setAttribute(attribute, attributes[attribute]);
    }
  }
  if (children.length && children[0].innerHTML) {
    element.innerHTML = children[0].innerHTML;
  } else if (children.length) {
    const fragment = document.createDocumentFragment();
    children.forEach(child => {
      if (typeof child === 'string') {
        child = document.createTextNode(child);
      }
      fragment.appendChild(child);
    });
    element.appendChild(fragment);
  }
  return element;
}

export function $debounce(func, wait, immediate) {
  let timeout = null;

  return function() {
    const context = this,
      args = arguments;

    const later = () => {
      timeout = null;

      if (!immediate) {
        func.apply(context, args);
      }
    };

    const callNow = immediate && !timeout;

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);

    if (callNow) {
      func.apply(context, args);
    }
  };
}

export function $trigger(evt, el, flags = {}) {
  const event = new Event(evt, {
    ...flags
  });
  el.dispatchEvent(event);
}

export function $customTrigger(event, el, params = {}) {
  const e = new CustomEvent(event, {
    ...params
  });
  el.dispatchEvent(e);
}

export function $templater(tpl, data) {
  return tpl.replace(/\%(.*?)\%/g, function(str, a) {
    return data[a] || '';
  });
}

export function $escapeHtmlToText(unsafe) {
  const escape = $escapeHtml(unsafe);
  const div = document.createElement('div');
  div.textContent = escape;
  return div.innerHTML;
}

export function $escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function $unescapeHtml(unsafe) {
  return unsafe
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, '\'');
}

export function $notifications(message, id) {
  id = id || message;

  // For requireInteraction
  // if (window.timerNotice) {
  //   chrome.notifications.clear(message);
  //   clearTimeout(window.timerNotice);
  // }

  chrome.notifications.create(id, {
    type: 'basic',
    iconUrl: 'icons/icon128.png',
    title: 'Visual bookmarks',
    message: message
    // requireInteraction: true
  }, function() {
    // For requireInteraction
    // window.timerNotice = setTimeout(() => {
    //   chrome.notifications.clear(id);
    //   window.timerNotice = null;
    // }, delay)
  });

}

export function $imageLoaded(img) {
  const image = new Image();
  image.src = img;
  return image.decode().then(() => image);
}

export function $base64ToBlob(base64, type, callback) {
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  let dataURI = base64;
  let contentType = type || '';

  let byteString = atob(dataURI.split(',')[1]);

  // separate out the mime component
  // let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

  // write the bytes of the string to an ArrayBuffer
  let ab = new ArrayBuffer(byteString.length);
  let ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  // write the ArrayBuffer to a blob, and you're done
  let bb = new Blob([ab], { type: contentType });
  if (callback) return callback(bb);
  return bb;
}

export function $resizeScreen(image) {
  return new Promise((resolve) => {
    let img = new Image();
    let maxHeight = 300;
    img.onload = function() {
      if (maxHeight < img.height) {
        img.width *= maxHeight / img.height;
        img.height = maxHeight;
      }
      let canvas = document.createElement('canvas');
      let ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, img.width, img.height);
      resolve(canvas.toDataURL('image/jpg'));
    };
    img.src = image;
  });
}

export function $shuffle([...arr]) {
  let m = arr.length;
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [arr[m], arr[i]] = [arr[i], arr[m]];
  }
  return arr;
}

export function $getDomain(url) {
  // return url.replace(/https?:\/\/(www.)?/i, '').replace(/\/.*/i, '');
  return url
    .replace(/(https?|ftps?|chrome|chrome-extension|file):\/\/\/?(www.)?/i, '')
    .replace(/:?\/.*/i, '');
}

export function $isValidUrl(url) {
  // The regex used in AngularJS to validate a URL + chrome internal pages & extension url & on-disk files
  const URL_REGEXP = /^(http|https|ftp|file|chrome|chrome-extension):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/;
  if (URL_REGEXP.test(url)) {
    return true;
  }
  return false;
}

// Copy String
export function $copyStr(str) {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.cssText = `
      position: absolute;
      left: -9999px;
    `;

  document.body.appendChild(el);

  const selection = document.getSelection();
  let originalRange = (selection.rangeCount > 0) ? selection.getRangeAt(0) : false;

  el.select();

  let success = false;
  try {
    success = document.execCommand('copy');
  } catch (err) {}

  document.body.removeChild(el);

  if (originalRange) {
    selection.removeAllRanges();
    selection.addRange(originalRange);
  }

  return success;
}

export function $uid() {
  return `id${Math.floor(Math.random() * Date.now()).toString(36)}`;
}
