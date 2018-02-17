!function(e){function t(n){if(o[n])return o[n].exports;var r=o[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,t),r.l=!0,r.exports}var o={};t.m=e,t.c=o,t.d=function(e,o,n){t.o(e,o)||Object.defineProperty(e,o,{configurable:!1,enumerable:!0,get:n})},t.n=function(e){var o=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(o,"a",o),o},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=7)}([function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e){var t="";switch(e.name){case"QuotaExceededError":t="QuotaExceededError";break;case"NotFoundError":t="NotFoundError";break;case"SecurityError":t="SecurityError";break;case"InvalidModificationError":t="InvalidModificationError";break;case"InvalidStateError":t="InvalidStateError";break;default:t="Unknown Error"}console.error(t)}var t=null;return{init:function(){var o=arguments.length>0&&void 0!==arguments[0]?arguments[0]:500,n=arguments[1];navigator.webkitPersistentStorage.requestQuota(1048576*o,function(o){window.webkitRequestFileSystem(window.PERSISTENT,o,function(e){t=e,n&&n()},e)},e)},usedAndRemaining:function(e){navigator.webkitPersistentStorage.queryUsageAndQuota(function(t,o){e&&e(t,o)})},createDir:function(o,n){t.root.getDirectory(o,{create:!0},function(e){n&&n(e)},e)},getDir:function(o,n){t.root.getDirectory(o,{},function(e){n&&n(e)},e)},deleteDir:function(o,n,r){var n=n||{};void 0===n.recursive&&(n.recursive=!1),t.root.getDirectory(o,{},function(t){n.recursive?t.removeRecursively(function(){r&&r()},e):t.remove(function(){r&&r()},e)},e)},createFile:function(e,o,n){t.root.getFile(e,{create:!0},function(e){e.createWriter(function(t){t.onwriteend=function(){n&&n(e)},t.onerror=function(e){console.log(e)};var r=new Blob([o.file],{type:o.fileType});t.write(r)})})},deleteFile:function(o,n){t.root.getFile(o,{create:!1},function(t){t.remove(function(){n&&n()},e)},e)},purge:function(){t.root.createReader().readEntries(function(t){for(var o,n=0;o=t[n];++n)o.isDirectory?o.removeRecursively(function(){},e):o.remove(function(){},e);console.info("Local storage emptied.")},e)}}}();t.default=n},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={transitionEnd:function(){var e={transition:"transitionend",webkitTransition:"webkitTransitionEnd"},t=document.createElement("fake");for(var o in e)if(void 0!==t.style[o])return e[o];return!1},debounce:function(e,t,o){var n=null;return function(){var r=this,a=arguments,i=function(){n=null,o||e.apply(r,a)},l=o&&!n;clearTimeout(n),n=setTimeout(i,t),l&&e.apply(r,a)}},trigger:function(e,t){var o=document.createEvent("HTMLEvents");o.initEvent(e,!0,!1),t.dispatchEvent(o)},templater:function(e,t){return e.replace(/\%(.*?)\%/g,function(e,o){return t[o]||""})},notifications:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:5e3;window.timerNotice&&(chrome.notifications.clear(e),clearTimeout(window.timerNotice)),chrome.notifications.create(e,{type:"basic",iconUrl:"icons/icon128.png",title:"Visual bookmarks",message:e},function(){window.timerNotice=setTimeout(function(){chrome.notifications.clear(e)},t)})},imageLoaded:function(e,t){var o=new Image;o.onload=function(){t.done&&t.done(e)},o.onerror=function(){t.fail&&t.fail(e)},o.src=e},base64ToBlob:function(e,t,o){for(var n=e,r=t||"",a=atob(n.split(",")[1]),i=(n.split(",")[0].split(":")[1].split(";")[0],new ArrayBuffer(a.length)),l=new Uint8Array(i),s=0;s<a.length;s++)l[s]=a.charCodeAt(s);var c=new Blob([i],{type:r});return o?o(c):c},resizeScreen:function(e,t){var o=new Image;o.onload=function(){300<o.height&&(o.width*=300/o.height,o.height=300);var e=document.createElement("canvas"),n=e.getContext("2d");e.width=o.width,e.height=o.height,n.drawImage(o,0,0,o.width,o.height),t(e.toDataURL("image/jpg"))},o.src=e},rand:function(e,t){return Math.round(e-.5+Math.random()*(t-e+1))},getDomain:function(e){return e.replace(/https?:\/\/(www.)?/i,"").replace(/\/.*/i,"")}}},function(e,t){},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Element.prototype.matches=Element.prototype.matches||function(e){for(var t=this,o=(t.document||t.ownerDocument).querySelectorAll(e),n=0;o[n]&&o[n]!==t;)++n;return!!o[n]},Element.prototype.closest=Element.prototype.closest||function(e){for(var t=this;t;){if(t.matches(e))return t;t=t.parentElement}return null}},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(){Object.keys(r).forEach(function(e){null===localStorage.getItem(e)&&localStorage.setItem(e,r[e])}),["http://free.pagepeeker.com/v2/thumbs.php?size=x&url=[URL]","http://api.webthumbnail.org/?width=500&height=400&screen=1280&url=[URL]"].indexOf(localStorage.getItem("thumbnailing_service"))>-1&&localStorage.setItem("thumbnailing_service","https://logo.clearbit.com/[URL]"),"true"===localStorage.getItem("enable_sync")&&chrome.storage.onChanged.addListener(function(e,t){n.restoreFromSync(),window.location.reload()})}function t(e){chrome.storage.sync.get(function(t){Object.keys(t).forEach(function(e){"default_folder_id"!==e&&localStorage.setItem(e,t[e])}),e&&e()})}function o(){var e={};Object.keys(r).forEach(function(t){localStorage[t]&&"default_folder_id"!==t&&(e[t]=localStorage[t])}),chrome.storage.sync.set(e)}var r={background_color:"#f7f7f7",background_image:"background_color",background_external:"",default_folder_id:1,dial_columns:5,vertical_center:"false",drag_and_drop:"true",auto_generate_thumbnail:"true",enable_sync:"false",show_toolbar:"true",show_settings_icon:"true",show_create_column:"true",show_favicon:"true",thumbnailing_service:"https://logo.clearbit.com/[URL]"};return{init:e,restoreFromSync:t,syncToStorage:o}}();t.default=n},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){var e=document.querySelectorAll("[data-locale-message]");Array.prototype.slice.call(e).forEach(function(e){var t=e.getAttribute("data-locale-message");if(~t.indexOf("placeholder"))return void(e.placeholder=chrome.i18n.getMessage(t));e.textContent=chrome.i18n.getMessage(t)})}},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e){i&&(clearTimeout(l),e.removeChild(i));var t=Object.assign(document.createElement("span"),{className:"ripple"});return e.appendChild(t),t}function t(t,o){if(1!==o.which)return!0;var n=o.target.closest(t);if(n){n.classList.add("ripple-container");var r=i=e(n),a=n.getBoundingClientRect(),l=a.width,s=a.height,c=a.left,d=a.top,u=0,f=0;u=o.pageX-(c+window.pageXOffset),f=o.pageY-(d+window.pageYOffset);var m=Math.max(l,s),g=n.getAttribute("data-ripple-color")||"rgba(255,255,255, .7)";r.style.width=m+"px",r.style.height=m+"px",r.style.left=u-m/2+"px",r.style.top=f-m/2+"px",r.style.backgroundColor=g,setTimeout(function(){r.style.cssText+="transform: scale(2.5); opacity: 0.5"},10)}}function o(e,t){if(!i)return!0;if("mouseout"===t.type&&!t.target.closest(e))return!0;if("mouseup"===t.type&&1!==t.which)return!0;var o=i;i.style.opacity=0,i=null,l=setTimeout(function(){o.parentNode.removeChild(o),l=null},800)}var n={},r=void 0,a=void 0,i=void 0,l=void 0;return n.init=function(e){r=t.bind(null,e),a=o.bind(null,e),document.body.addEventListener("mousedown",r),document.body.addEventListener("mouseout",a),document.body.addEventListener("mouseup",a)},n}();t.default=n},function(e,t,o){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}n(o(2)),o(8),o(3);var r=o(9),a=n(r),i=o(4),l=n(i),s=o(5),c=n(s),d=o(6),u=n(d),f=o(0),m=n(f),g=o(1),h=n(g);localStorage.getItem("custom_dials")||localStorage.setItem("custom_dials","{}"),m.default.init(500),m.default.usedAndRemaining(function(e){0===e&&(localStorage.setItem("custom_dials","{}"),localStorage.setItem("background_local",""))}),(0,c.default)(),u.default.init(".md-ripple"),l.default.init();var v=function(){function e(){if(D){if("true"===localStorage.getItem("vertical_center")&&document.getElementById("content").classList.add("flex-vertical-center"),s(t()),"false"===localStorage.getItem("show_settings_icon")){var e=document.getElementById("settings_icon");e.parentNode.removeChild(e)}if("false"===localStorage.getItem("show_toolbar"))document.getElementById("header").remove(),document.getElementById("main").classList.add("hidden-toolbar");else{var n=document.getElementById("searchReset");o();var r=h.default.debounce(function(e){e.target.value.length>0?n.classList.add("show"):n.classList.remove("show"),u(e)},500),i=document.getElementById("bookmarkSearch");i.addEventListener("input",r,!1),n.addEventListener("click",function(){i.value="",s(t()),i.focus(),n.classList.remove("show")},!1)}D.addEventListener("change",function(e){if(e.target.closest(".c-upload__input")){e.preventDefault();var t=JSON.parse(e.target.getAttribute("data-id"));t.target=e.target,c(t)}}),D.addEventListener("click",function(e){if(e.target.matches(".bookmark__del--bookmark"))g(e);else if(e.target.closest(".bookmark__del--folder"))v(e);else if(e.target.matches(".bookmark__edit")){var t=e.target.closest(".bookmark"),o=t.querySelector(".bookmark__title").textContent,n=t.querySelector(".bookmark__link").getAttribute("href");"#"===n.charAt(0)&&(n="");var r=e.target.getAttribute("data-id"),a=l(r);p.show(r,o,n,a)}else if(e.target.matches(".bookmark__screen")){e.preventDefault();var i=e.target.closest(".bookmark"),s=i.getAttribute("data-sort"),c=i.querySelector(".bookmark__link").href;d(i,s,c)}else e.target.matches("#add")&&p.show("New","","")},!1),document.getElementById("closeModal").addEventListener("click",function(){p.hide()},!1),document.body.addEventListener("keydown",function(e){27===e.which&&h.default.trigger("click",document.getElementById("closeModal"))},!1),document.getElementById("formBookmark").addEventListener("submit",function(e){e.preventDefault();var t=this.getAttribute("data-action"),o=document.getElementById("title").value,n=document.getElementById("url").value;"New"!==t?w(t,o,n)&&p.hide():y(o,n)&&p.hide()},!1),document.getElementById("resetCustomImage").addEventListener("click",function(e){if(e.preventDefault(),confirm(chrome.i18n.getMessage("confirm_delete_image"))){var t=e.target,o=t.getAttribute("data-bookmark");_(o,function(){var e=D.querySelector('[data-sort="'+o+'"]');e.querySelector(".bookmark__img").style.backgroundImage="",e.querySelector(".bookmark__img").classList.remove("bookmark__img--contain"),e.querySelector(".bookmark__img").classList.add("bookmark__img--folder"),t.closest("#customScreen").style.display="",h.default.notifications(chrome.i18n.getMessage("notice_image_removed"))})}}),window.addEventListener("hashchange",function(e){s(t()),"true"===localStorage.getItem("show_toolbar")&&o()},!1),"true"===localStorage.getItem("drag_and_drop")&&(I=a.default.create(D,{animation:200,filter:".bookmark__control",draggable:".column",ghostClass:"column--ghost",chosenClass:"column--chosen",preventOnFilter:!1,onUpdate:function(){Array.prototype.slice.call(D.querySelectorAll(".bookmark")).forEach(function(e,t){S.move(e.getAttribute("data-sort"),{parentId:D.getAttribute("data-folder"),index:t})})}}))}}function t(){var e=localStorage.getItem("default_folder_id");return""!==window.location.hash&&(e=window.location.hash.slice(1)),e}function o(){var e=document.getElementById("selectFolder");e.innerHTML="",e.removeEventListener("change",f,!1),S.getTree(function(o){var n=[],r=[],a=void 0,i=void 0;for(r.push(o[0].children[0]),r.push(o[0].children[1]);void 0!==(a=r.pop());)if(void 0!==a.children){for("0"===a.parentId&&(a.path=""),a.path+=a.title;void 0!==(i=a.children.pop());)void 0!==i.children&&(i.path=a.path+"/",r.push(i));n.push(a)}n.sort(function(e,t){return e.path.localeCompare(t.path)});var l=[];n.forEach(function(e){l.push("<option"+(e.id===t()?" selected":"")+' value="'+e.id+'">'+e.path+"</option>")}),e.innerHTML=l.join(""),e.addEventListener("change",f,!1)})}function n(e){var t="true"===localStorage.getItem("show_favicon")?'<img class="bookmark__favicon" width="16" height="16" src="chrome://favicon/%url%" alt="">':"",o=l(e.id),n=o?'<div class="bookmark__img" style="background-image: url(\''+o+"');\"></div>":'<div class="bookmark__img bookmark__img--external" data-fail-thumb="/img/404.svg" data-external-thumb="%thumbnailing_service%"></div>',r='<div class="column">\n        <div class="bookmark" data-sort="%id%">\n          '+n+'\n          <div class="bookmark__control bookmark__control--left">\n            <div class="bookmark__more">\n              <div class="bookmark__control-wrap">\n                <button class="bookmark__edit" data-bookmark="bookmark" data-title="%title%" data-url="%url%" data-id="%id%"></button>\n                <div class="bookmark__divider"></div>\n                <button class="bookmark__screen" data-id="%id%"></button>\n                <div class="bookmark__divider"></div>\n                <div class="bookmark__image-upload">\n                  <input type="file" name="" id="upload-%id%" class="c-upload__input" data-id=\'{"id": %id%, "site": "%site%"}\'>\n                  <label for="upload-%id%" class="c-upload__label"></label>\n                </div>\n              </div>\n            </div>\n          </div>\n          <div class="bookmark__control bookmark__control--right">\n            <button class="bookmark__del--bookmark" data-id="%id%"></button>\n          </div>\n          <div class="bookmark__caption">\n            '+t+'\n            <div class="bookmark__title">%title%</div>\n          </div>\n          <a class="bookmark__link" href="%url%" title="%title%"></a>\n        </div>\n      </div>';return h.default.templater(r,{id:e.id,url:e.url,site:h.default.getDomain(e.url),thumbnailing_service:localStorage.getItem("thumbnailing_service").replace("[URL]",h.default.getDomain(e.url)),title:e.title})}function r(e){var t=void 0,o=l(e.id);t=o?'<div class="bookmark__img bookmark__img--contain" style="background-image: url('+o+')"></div>':'<div class="bookmark__img bookmark__img--folder"></div>';var n='<div class="column">\n        <div class="bookmark" data-sort="%id%">\n          '+t+'\n          <div class="bookmark__control bookmark__control--left">\n            <div class="bookmark__more">\n              <div class="bookmark__control-wrap">\n                <button class="bookmark__edit" data-bookmark="folder" data-title="%title%" data-id="%id%"></button>\n                <div class="bookmark__divider"></div>\n                <div class="bookmark__image-upload">\n                  <input type="file" name="" id="upload-%id%" class="c-upload__input" data-id=\'{"id": %id%}\'>\n                  <label for="upload-%id%" class="c-upload__label"></label>\n                </div>\n              </div>\n            </div>\n          </div>\n          <div class="bookmark__control bookmark__control--right">\n            <button class="bookmark__del--folder" data-id="%id%"></button>\n          </div>\n          <div class="bookmark__caption">\n            <img src="/img/folder.svg" class="bookmark__favicon" width="16" height="16" alt="">\n            <div class="bookmark__title">%title%</div>\n          </div>\n          <a class="bookmark__link" href="#%url%" title="%title%"></a>\n        </div>\n      </div>';return h.default.templater(n,{id:e.id,url:e.id,title:e.title})}function i(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],o=[];e.forEach(function(e){void 0!==e.url&&o.push(n(e)),void 0!==e.children&&o.push(r(e))}),D.innerHTML=o.join("")+"\n      "+(t?'<div class="column--nosort">\n          <div class="bookmark--create">\n            <div class="bookmark__img--add"></div>\n            <a class="bookmark__link--create" id="add"></a>\n          </div>\n        </div>':"")+"\n    ";var a=D.querySelectorAll(".bookmark__img--external"),i=!0,l=!1,s=void 0;try{for(var c,d=a[Symbol.iterator]();!(i=(c=d.next()).done);i=!0){var u=c.value;!function(e){h.default.imageLoaded(e.dataset.externalThumb,{done:function(t){e.style.backgroundImage="url("+t+")"},fail:function(){e.style.backgroundImage="url("+e.dataset.failThumb+")"}})}(u)}}catch(e){l=!0,s=e}finally{try{!i&&d.return&&d.return()}finally{if(l)throw s}}}function l(e){var t=JSON.parse(localStorage.getItem("custom_dials")),o=void 0;return t&&(o=t[e]),o}function s(e){var t="true"===localStorage.getItem("show_create_column");S.getSubTree(e,function(o){void 0!==o?(i(o[0].children,t),D.setAttribute("data-folder",e)):h.default.notifications(chrome.i18n.getMessage("notice_cant_find_id"),15e3)})}function c(e){var t=e.target,o=e.id,n=e.site,r=t.files[0];if(r){if(!/image\/(jpe?g|png)$/.test(r.type))return alert(chrome.i18n.getMessage("alert_file_type_fail"));t.value="";var a=t.closest(".bookmark"),i=void 0;a.innerHTML+='<div id="overlay_id_'+o+'" class="bookmark__overlay">'+E+"</div>";var l=new FileReader;l.readAsDataURL(r),l.onload=function(){h.default.resizeScreen(l.result,function(t){var r=h.default.base64ToBlob(t,"image/jpg"),l=void 0;l=n?n+"_"+o+".jpg":"folder-"+o+".jpg",m.default.createDir("images",function(t){m.default.createFile("/images/"+l,{file:r,fileType:"jpg"},function(t){var n=JSON.parse(localStorage.getItem("custom_dials"));n[o]=t.toURL(),localStorage.setItem("custom_dials",JSON.stringify(n));var r=a.querySelector(".bookmark__img");e.site?r.classList.remove("bookmark__img--external"):(r.classList.remove("bookmark__img--folder"),r.classList.add("bookmark__img--contain")),r.style.backgroundImage="url('"+t.toURL()+"?refresh="+Date.now()+"')",(i=document.getElementById("overlay_id_"+o))&&a.removeChild(i),h.default.notifications(chrome.i18n.getMessage("notice_thumb_image_updated"))})})})},l.onerror=function(){console.warn("Image upload failed")}}}function d(e,t,o){var n=void 0;e.innerHTML+='<div id="overlay_id_'+t+'" class="bookmark__overlay">'+E+"</div>";var r=e.querySelector(".bookmark__img");chrome.runtime.sendMessage({captureUrl:o,id:t},function(o){if(o.warning)return console.warn(o.warning),(n=document.getElementById("overlay_id_"+t))&&e.removeChild(n),!1;r.classList.remove("bookmark__img--external"),r.style.backgroundImage="url('"+o+"?refresh="+Date.now()+"')",(n=document.getElementById("overlay_id_"+t))&&e.removeChild(n)})}function u(e){var o=e.target.value.trim().toLowerCase();S.search(o,function(e){e.length>0?("true"===localStorage.getItem("drag_and_drop")&&I.option("disabled",!0),i(e)):("true"===localStorage.getItem("drag_and_drop")&&I.option("disabled",!1),s(t()))})}function f(e){var t=this.value;window.location.hash="#"+t,s(t)}function g(e){e.preventDefault();var t=e.target,o=t.closest(".column");if(confirm(chrome.i18n.getMessage("confirm_delete_bookmark"),"")){var n=t.getAttribute("data-id");S.remove(n,function(){D.removeChild(o),_(n),h.default.notifications(chrome.i18n.getMessage("notice_bookmark_removed"))})}}function v(e){e.preventDefault();var t=e.target,n=t.closest(".column");if(confirm(chrome.i18n.getMessage("confirm_delete_folder"),"")){var r=t.getAttribute("data-id");S.removeTree(r,function(){D.removeChild(n),_(r),o(),h.default.notifications(chrome.i18n.getMessage("notice_folder_removed"))})}}function _(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(){},o=l(e);if(o){var n=o.split("/").pop();m.default.deleteFile("/images/"+n,function(){var o=JSON.parse(localStorage.getItem("custom_dials"));delete o[e],localStorage.setItem("custom_dials",JSON.stringify(o)),t()})}}function b(e){return!!/^(http|https|ftp|file|chrome|chrome-extension):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/.test(e)}function k(e,t){if(0!==e.length)return b(t)||0===t.length||(t="http://"+t),{title:e,url:t}}function y(e,t){var o=k(e,t);return void 0!==o?(o.parentId=D.getAttribute("data-folder"),S.create(o,function(e){var t=void 0;t=e.url?n(e):r(e),D.querySelector(".column--nosort").insertAdjacentHTML("beforeBegin",t);var o=D.querySelector('[data-sort="'+e.id+'"]');if(e.url)if("true"===localStorage.getItem("auto_generate_thumbnail"))d(o,e.id,e.url);else{var a=o.querySelector(".bookmark__img");a.classList.add("bookmark__img--external"),h.default.imageLoaded(a.dataset.externalThumb,{done:function(e){a.style.backgroundImage="url("+e+")"},fail:function(){a.style.backgroundImage=a.dataset.failThumb}})}}),!0):(alert(chrome.i18n.getMessage("alert_create_fail_bookmark")),!1)}function w(e,t,o){var n=k(t,o),r=D.querySelector('[data-sort="'+e+'"]');return r.querySelector(".bookmark__edit"),0===o.length||b(o)||(n=void 0),void 0!==n?(S.update(e,n,function(e){r.querySelector(".bookmark__link").href=e.url?e.url:"#"+e.id,r.querySelector(".bookmark__title").textContent=e.title,r.querySelector(".bookmark__link").title=e.title,h.default.notifications(chrome.i18n.getMessage("notice_bookmark_updated"))}),!0):(alert(chrome.i18n.getMessage("alert_update_fail_bookmark")),!1)}var S=chrome.bookmarks,E='\n    <svg class="loading" viewBox= "0 0 100 100" xmlns= "http://www.w3.org/2000/svg" >\n      <circle class="path" fill="none" stroke-width="8" stroke-linecap="round" cx="50" cy="50" r="40"></circle>\n    </svg>\n  ',D=document.getElementById("includeThree"),I=null;return{init:e}}(),p=function(){function e(e){var t=e.target.value.trim(),o=document.getElementById("desc");o&&(o.textContent=t)}var t=(document.getElementById("modal-overlay"),document.getElementById("modal"),document.getElementById("formBookmark")),o=document.getElementById("modalHead"),n=document.getElementById("title"),r=document.getElementById("url"),a=document.getElementById("customScreen"),i=document.getElementById("main"),l=document.body,s=null,c=void 0;return{show:function(d,u,f,m){s||("New"!==d?(m&&!f&&(a.style.display="block",a.querySelector("img").src=m+"?refresh="+Date.now(),a.querySelector("#resetCustomImage").setAttribute("data-bookmark",d)),o.innerHTML='\n          <h4 class="modal__title">'+chrome.i18n.getMessage("edit_bookmark")+'</h4>\n          <span id="desc">'+u+"</span>\n        ",n.value=u,f?(r.style.display="",r.value=f):r.style.display="none",n.addEventListener("input",e)):(setTimeout(function(){n.focus()},100),o.innerHTML='<div class="modal__title">'+chrome.i18n.getMessage("add_bookmark")+"</div>",r.style.display="",n.value="",r.value=""),t.setAttribute("data-action",d),c=window.pageYOffset,i.style.top=-c+"px",i.classList.add("fixed"),l.classList.add("modal--show"),s=!0)},hide:function(){s&&(n.removeEventListener("input",e),l.classList.remove("modal--show"),setTimeout(function(){i.classList.remove("fixed"),i.style.top="",window.scrollTo(0,c),c=null,a.style.display="",t.reset()},250),s=null)}}}(),_=function(){return{setBG:function(){var e=document.getElementById("bg"),t=localStorage.getItem("background_image");if("background_color"===t)return e.style.backgroundColor=localStorage.getItem("background_color"),void setTimeout(function(){e.style.opacity=1},20);var o="background_local"===t?localStorage.getItem("background_local"):localStorage.getItem("background_external");o&&""!==o&&h.default.imageLoaded(o,{done:function(t){e.style.backgroundImage="url('"+t+"')",e.style.opacity=1},fail:function(t){console.warn("Local background image resource problem: "+t),e.style.opacity=1}})},calculateStyles:function(){var e=parseInt(localStorage.getItem("dial_columns")),t=document.getElementById("generateStyles");if(e>=8&&window.innerWidth<1200){var o=Math.floor(1170/e),n=o/(4/3);return void(t.innerHTML=".bookmarks {justify-content: center} .column, .column--nosort {width: "+o+"px; height: "+n+"px}")}if(!(window.innerWidth<768)){var r=Math.floor(document.getElementById("includeThree").offsetWidth),a=Math.floor(r/e),i=a/(4/3);t.innerHTML=".column, .column--nosort {width: "+a+"px; height: "+i+"px}"}}}}();_.calculateStyles(),v.init(),window.addEventListener("load",function(){return _.setBG()}),window.addEventListener("resize",function(){return _.calculateStyles()})},function(e,t){e.exports="/img/404.svg"},function(e,t,o){var n,r;/**!
 * Sortable
 * @author	RubaXa   <trash@rubaxa.org>
 * @license MIT
 */
!function(a){"use strict";n=a,void 0!==(r="function"==typeof n?n.call(t,o,t,e):n)&&(e.exports=r)}(function(){"use strict";function e(t,o){if(!t||!t.nodeType||1!==t.nodeType)throw"Sortable: `el` must be HTMLElement, and not "+{}.toString.call(t);this.el=t,this.options=o=b({},o),t[J]=this;var n={group:Math.random(),sort:!0,disabled:!1,store:null,handle:null,scroll:!0,scrollSensitivity:30,scrollSpeed:10,draggable:/[uo]l/i.test(t.nodeName)?"li":">*",ghostClass:"sortable-ghost",chosenClass:"sortable-chosen",dragClass:"sortable-drag",ignore:"a, img",filter:null,preventOnFilter:!0,animation:0,setData:function(e,t){e.setData("Text",t.textContent)},dropBubble:!1,dragoverBubble:!1,dataIdAttr:"data-id",delay:0,forceFallback:!1,fallbackClass:"sortable-fallback",fallbackOnBody:!1,fallbackTolerance:0,fallbackOffset:{x:0,y:0},supportPointer:!1!==e.supportPointer};for(var r in n)!(r in o)&&(o[r]=n[r]);de(o);for(var i in this)"_"===i.charAt(0)&&"function"==typeof this[i]&&(this[i]=this[i].bind(this));this.nativeDraggable=!o.forceFallback&&oe,a(t,"mousedown",this._onTapStart),a(t,"touchstart",this._onTapStart),o.supportPointer&&a(t,"pointerdown",this._onTapStart),this.nativeDraggable&&(a(t,"dragover",this),a(t,"dragenter",this)),se.push(this._onDragOver),o.store&&this.sort(o.store.get(this))}function t(e,t){"clone"!==e.lastPullMode&&(t=!0),T&&T.state!==t&&(s(T,"display",t?"none":""),t||T.state&&(e.options.group.revertClone?(x.insertBefore(T,C),e._animate(E,T)):x.insertBefore(T,E)),T.state=t)}function o(e,t,o){if(e){o=o||G;do{if(">*"===t&&e.parentNode===o||p(e,t))return e}while(e=n(e))}return null}function n(e){var t=e.host;return t&&t.nodeType?t:e.parentNode}function r(e){e.dataTransfer&&(e.dataTransfer.dropEffect="move"),e.preventDefault()}function a(e,t,o){e.addEventListener(t,o,ee)}function i(e,t,o){e.removeEventListener(t,o,ee)}function l(e,t,o){if(e)if(e.classList)e.classList[o?"add":"remove"](t);else{var n=(" "+e.className+" ").replace(W," ").replace(" "+t+" "," ");e.className=(n+(o?" "+t:"")).replace(W," ")}}function s(e,t,o){var n=e&&e.style;if(n){if(void 0===o)return G.defaultView&&G.defaultView.getComputedStyle?o=G.defaultView.getComputedStyle(e,""):e.currentStyle&&(o=e.currentStyle),void 0===t?o:o[t];t in n||(t="-webkit-"+t),n[t]=o+("string"==typeof o?"":"px")}}function c(e,t,o){if(e){var n=e.getElementsByTagName(t),r=0,a=n.length;if(o)for(;r<a;r++)o(n[r],r);return n}return[]}function d(e,t,o,n,r,a,i,l){e=e||t[J];var s=G.createEvent("Event"),c=e.options,d="on"+o.charAt(0).toUpperCase()+o.substr(1);s.initEvent(o,!0,!0),s.to=r||t,s.from=a||t,s.item=n||t,s.clone=T,s.oldIndex=i,s.newIndex=l,t.dispatchEvent(s),c[d]&&c[d].call(e,s)}function u(e,t,o,n,r,a,i,l){var s,c,d=e[J],u=d.options.onMove;return s=G.createEvent("Event"),s.initEvent("move",!0,!0),s.to=t,s.from=e,s.dragged=o,s.draggedRect=n,s.related=r||t,s.relatedRect=a||t.getBoundingClientRect(),s.willInsertAfter=l,e.dispatchEvent(s),u&&(c=u.call(d,s,i)),c}function f(e){e.draggable=!1}function m(){re=!1}function g(e,t){var o=e.lastElementChild,n=o.getBoundingClientRect();return t.clientY-(n.top+n.height)>5||t.clientX-(n.left+n.width)>5}function h(e){for(var t=e.tagName+e.className+e.src+e.href+e.textContent,o=t.length,n=0;o--;)n+=t.charCodeAt(o);return n.toString(36)}function v(e,t){var o=0;if(!e||!e.parentNode)return-1;for(;e&&(e=e.previousElementSibling);)"TEMPLATE"===e.nodeName.toUpperCase()||">*"!==t&&!p(e,t)||o++;return o}function p(e,t){if(e){t=t.split(".");var o=t.shift().toUpperCase(),n=new RegExp("\\s("+t.join("|")+")(?=\\s)","g");return!(""!==o&&e.nodeName.toUpperCase()!=o||t.length&&((" "+e.className+" ").match(n)||[]).length!=t.length)}return!1}function _(e,t){var o,n;return function(){void 0===o&&(o=arguments,n=this,$(function(){1===o.length?e.call(n,o[0]):e.apply(n,o),o=void 0},t))}}function b(e,t){if(e&&t)for(var o in t)t.hasOwnProperty(o)&&(e[o]=t[o]);return e}function k(e){return K&&K.dom?K.dom(e).cloneNode(!0):Z?Z(e).clone(!0)[0]:e.cloneNode(!0)}function y(e){for(var t=e.getElementsByTagName("input"),o=t.length;o--;){var n=t[o];n.checked&&le.push(n)}}function w(e){return $(e,0)}function S(e){return clearTimeout(e)}if("undefined"==typeof window||!window.document)return function(){throw new Error("Sortable.js requires a window with a document")};var E,D,I,T,x,C,L,B,M,A,N,O,R,P,j,q,Y,F,U,X,H={},W=/\s+/g,z=/left|right|inline/,J="Sortable"+(new Date).getTime(),Q=window,G=Q.document,V=Q.parseInt,$=Q.setTimeout,Z=Q.jQuery||Q.Zepto,K=Q.Polymer,ee=!1,te=!1,oe="draggable"in G.createElement("div"),ne=function(e){return!navigator.userAgent.match(/(?:Trident.*rv[ :]?11\.|msie)/i)&&(e=G.createElement("x"),e.style.cssText="pointer-events:auto","auto"===e.style.pointerEvents)}(),re=!1,ae=Math.abs,ie=Math.min,le=[],se=[],ce=_(function(e,t,o){if(o&&t.scroll){var n,r,a,i,l,s,c=o[J],d=t.scrollSensitivity,u=t.scrollSpeed,f=e.clientX,m=e.clientY,g=window.innerWidth,h=window.innerHeight;if(M!==o&&(B=t.scroll,M=o,A=t.scrollFn,!0===B)){B=o;do{if(B.offsetWidth<B.scrollWidth||B.offsetHeight<B.scrollHeight)break}while(B=B.parentNode)}B&&(n=B,r=B.getBoundingClientRect(),a=(ae(r.right-f)<=d)-(ae(r.left-f)<=d),i=(ae(r.bottom-m)<=d)-(ae(r.top-m)<=d)),a||i||(a=(g-f<=d)-(f<=d),i=(h-m<=d)-(m<=d),(a||i)&&(n=Q)),H.vx===a&&H.vy===i&&H.el===n||(H.el=n,H.vx=a,H.vy=i,clearInterval(H.pid),n&&(H.pid=setInterval(function(){if(s=i?i*u:0,l=a?a*u:0,"function"==typeof A)return A.call(c,l,s,e);n===Q?Q.scrollTo(Q.pageXOffset+l,Q.pageYOffset+s):(n.scrollTop+=s,n.scrollLeft+=l)},24)))}},30),de=function(e){function t(e,t){return void 0!==e&&!0!==e||(e=o.name),"function"==typeof e?e:function(o,n){var r=n.options.group.name;return t?e:e&&(e.join?e.indexOf(r)>-1:r==e)}}var o={},n=e.group;n&&"object"==typeof n||(n={name:n}),o.name=n.name,o.checkPull=t(n.pull,!0),o.checkPut=t(n.put),o.revertClone=n.revertClone,e.group=o};try{window.addEventListener("test",null,Object.defineProperty({},"passive",{get:function(){te=!1,ee={capture:!1,passive:te}}}))}catch(e){}return e.prototype={constructor:e,_onTapStart:function(e){var t,n=this,r=this.el,a=this.options,i=a.preventOnFilter,l=e.type,s=e.touches&&e.touches[0],c=(s||e).target,u=e.target.shadowRoot&&e.path&&e.path[0]||c,f=a.filter;if(y(r),!E&&!(/mousedown|pointerdown/.test(l)&&0!==e.button||a.disabled)&&!u.isContentEditable&&(c=o(c,a.draggable,r))&&L!==c){if(t=v(c,a.draggable),"function"==typeof f){if(f.call(this,e,c,this))return d(n,u,"filter",c,r,r,t),void(i&&e.preventDefault())}else if(f&&(f=f.split(",").some(function(e){if(e=o(u,e.trim(),r))return d(n,e,"filter",c,r,r,t),!0})))return void(i&&e.preventDefault());a.handle&&!o(u,a.handle,r)||this._prepareDragStart(e,s,c,t)}},_prepareDragStart:function(e,t,o,n){var r,i=this,s=i.el,u=i.options,m=s.ownerDocument;o&&!E&&o.parentNode===s&&(F=e,x=s,E=o,D=E.parentNode,C=E.nextSibling,L=o,q=u.group,P=n,this._lastX=(t||e).clientX,this._lastY=(t||e).clientY,E.style["will-change"]="all",r=function(){i._disableDelayedDrag(),E.draggable=i.nativeDraggable,l(E,u.chosenClass,!0),i._triggerDragStart(e,t),d(i,x,"choose",E,x,x,P)},u.ignore.split(",").forEach(function(e){c(E,e.trim(),f)}),a(m,"mouseup",i._onDrop),a(m,"touchend",i._onDrop),a(m,"touchcancel",i._onDrop),a(m,"selectstart",i),u.supportPointer&&a(m,"pointercancel",i._onDrop),u.delay?(a(m,"mouseup",i._disableDelayedDrag),a(m,"touchend",i._disableDelayedDrag),a(m,"touchcancel",i._disableDelayedDrag),a(m,"mousemove",i._disableDelayedDrag),a(m,"touchmove",i._disableDelayedDrag),u.supportPointer&&a(m,"pointermove",i._disableDelayedDrag),i._dragStartTimer=$(r,u.delay)):r())},_disableDelayedDrag:function(){var e=this.el.ownerDocument;clearTimeout(this._dragStartTimer),i(e,"mouseup",this._disableDelayedDrag),i(e,"touchend",this._disableDelayedDrag),i(e,"touchcancel",this._disableDelayedDrag),i(e,"mousemove",this._disableDelayedDrag),i(e,"touchmove",this._disableDelayedDrag),i(e,"pointermove",this._disableDelayedDrag)},_triggerDragStart:function(e,t){t=t||("touch"==e.pointerType?e:null),t?(F={target:E,clientX:t.clientX,clientY:t.clientY},this._onDragStart(F,"touch")):this.nativeDraggable?(a(E,"dragend",this),a(x,"dragstart",this._onDragStart)):this._onDragStart(F,!0);try{G.selection?w(function(){G.selection.empty()}):window.getSelection().removeAllRanges()}catch(e){}},_dragStarted:function(){if(x&&E){var t=this.options;l(E,t.ghostClass,!0),l(E,t.dragClass,!1),e.active=this,d(this,x,"start",E,x,x,P)}else this._nulling()},_emulateDragOver:function(){if(U){if(this._lastX===U.clientX&&this._lastY===U.clientY)return;this._lastX=U.clientX,this._lastY=U.clientY,ne||s(I,"display","none");var e=G.elementFromPoint(U.clientX,U.clientY),t=e,o=se.length;if(e&&e.shadowRoot&&(e=e.shadowRoot.elementFromPoint(U.clientX,U.clientY),t=e),t)do{if(t[J]){for(;o--;)se[o]({clientX:U.clientX,clientY:U.clientY,target:e,rootEl:t});break}e=t}while(t=t.parentNode);ne||s(I,"display","")}},_onTouchMove:function(t){if(F){var o=this.options,n=o.fallbackTolerance,r=o.fallbackOffset,a=t.touches?t.touches[0]:t,i=a.clientX-F.clientX+r.x,l=a.clientY-F.clientY+r.y,c=t.touches?"translate3d("+i+"px,"+l+"px,0)":"translate("+i+"px,"+l+"px)";if(!e.active){if(n&&ie(ae(a.clientX-this._lastX),ae(a.clientY-this._lastY))<n)return;this._dragStarted()}this._appendGhost(),X=!0,U=a,s(I,"webkitTransform",c),s(I,"mozTransform",c),s(I,"msTransform",c),s(I,"transform",c),t.preventDefault()}},_appendGhost:function(){if(!I){var e,t=E.getBoundingClientRect(),o=s(E),n=this.options;I=E.cloneNode(!0),l(I,n.ghostClass,!1),l(I,n.fallbackClass,!0),l(I,n.dragClass,!0),s(I,"top",t.top-V(o.marginTop,10)),s(I,"left",t.left-V(o.marginLeft,10)),s(I,"width",t.width),s(I,"height",t.height),s(I,"opacity","0.8"),s(I,"position","fixed"),s(I,"zIndex","100000"),s(I,"pointerEvents","none"),n.fallbackOnBody&&G.body.appendChild(I)||x.appendChild(I),e=I.getBoundingClientRect(),s(I,"width",2*t.width-e.width),s(I,"height",2*t.height-e.height)}},_onDragStart:function(e,t){var o=this,n=e.dataTransfer,r=o.options;o._offUpEvents(),q.checkPull(o,o,E,e)&&(T=k(E),T.draggable=!1,T.style["will-change"]="",s(T,"display","none"),l(T,o.options.chosenClass,!1),o._cloneId=w(function(){x.insertBefore(T,E),d(o,x,"clone",E)})),l(E,r.dragClass,!0),t?("touch"===t?(a(G,"touchmove",o._onTouchMove),a(G,"touchend",o._onDrop),a(G,"touchcancel",o._onDrop),r.supportPointer&&(a(G,"pointermove",o._onTouchMove),a(G,"pointerup",o._onDrop))):(a(G,"mousemove",o._onTouchMove),a(G,"mouseup",o._onDrop)),o._loopId=setInterval(o._emulateDragOver,50)):(n&&(n.effectAllowed="move",r.setData&&r.setData.call(o,n,E)),a(G,"drop",o),o._dragStartId=w(o._dragStarted))},_onDragOver:function(n){var r,a,i,l,c=this.el,d=this.options,f=d.group,h=e.active,v=q===f,p=!1,_=d.sort;if(void 0!==n.preventDefault&&(n.preventDefault(),!d.dragoverBubble&&n.stopPropagation()),!E.animated&&(X=!0,h&&!d.disabled&&(v?_||(l=!x.contains(E)):Y===this||(h.lastPullMode=q.checkPull(this,h,E,n))&&f.checkPut(this,h,E,n))&&(void 0===n.rootEl||n.rootEl===this.el))){if(ce(n,d,this.el),re)return;if(r=o(n.target,d.draggable,c),a=E.getBoundingClientRect(),Y!==this&&(Y=this,p=!0),l)return t(h,!0),D=x,void(T||C?x.insertBefore(E,T||C):_||x.appendChild(E));if(0===c.children.length||c.children[0]===I||c===n.target&&g(c,n)){if(0!==c.children.length&&c.children[0]!==I&&c===n.target&&(r=c.lastElementChild),r){if(r.animated)return;i=r.getBoundingClientRect()}t(h,v),!1!==u(x,c,E,a,r,i,n)&&(E.contains(c)||(c.appendChild(E),D=c),this._animate(a,E),r&&this._animate(i,r))}else if(r&&!r.animated&&r!==E&&void 0!==r.parentNode[J]){N!==r&&(N=r,O=s(r),R=s(r.parentNode)),i=r.getBoundingClientRect();var b=i.right-i.left,k=i.bottom-i.top,y=z.test(O.cssFloat+O.display)||"flex"==R.display&&0===R["flex-direction"].indexOf("row"),w=r.offsetWidth>E.offsetWidth,S=r.offsetHeight>E.offsetHeight,L=(y?(n.clientX-i.left)/b:(n.clientY-i.top)/k)>.5,B=r.nextElementSibling,M=!1;if(y){var A=E.offsetTop,P=r.offsetTop;M=A===P?r.previousElementSibling===E&&!w||L&&w:r.previousElementSibling===E||E.previousElementSibling===r?(n.clientY-i.top)/k>.5:P>A}else p||(M=B!==E&&!S||L&&S);var j=u(x,c,E,a,r,i,n,M);!1!==j&&(1!==j&&-1!==j||(M=1===j),re=!0,$(m,30),t(h,v),E.contains(c)||(M&&!B?c.appendChild(E):r.parentNode.insertBefore(E,M?B:r)),D=E.parentNode,this._animate(a,E),this._animate(i,r))}}},_animate:function(e,t){var o=this.options.animation;if(o){var n=t.getBoundingClientRect();1===e.nodeType&&(e=e.getBoundingClientRect()),s(t,"transition","none"),s(t,"transform","translate3d("+(e.left-n.left)+"px,"+(e.top-n.top)+"px,0)"),t.offsetWidth,s(t,"transition","all "+o+"ms"),s(t,"transform","translate3d(0,0,0)"),clearTimeout(t.animated),t.animated=$(function(){s(t,"transition",""),s(t,"transform",""),t.animated=!1},o)}},_offUpEvents:function(){var e=this.el.ownerDocument;i(G,"touchmove",this._onTouchMove),i(G,"pointermove",this._onTouchMove),i(e,"mouseup",this._onDrop),i(e,"touchend",this._onDrop),i(e,"pointerup",this._onDrop),i(e,"touchcancel",this._onDrop),i(e,"pointercancel",this._onDrop),i(e,"selectstart",this)},_onDrop:function(t){var o=this.el,n=this.options;clearInterval(this._loopId),clearInterval(H.pid),clearTimeout(this._dragStartTimer),S(this._cloneId),S(this._dragStartId),i(G,"mouseover",this),i(G,"mousemove",this._onTouchMove),this.nativeDraggable&&(i(G,"drop",this),i(o,"dragstart",this._onDragStart)),this._offUpEvents(),t&&(X&&(t.preventDefault(),!n.dropBubble&&t.stopPropagation()),I&&I.parentNode&&I.parentNode.removeChild(I),x!==D&&"clone"===e.active.lastPullMode||T&&T.parentNode&&T.parentNode.removeChild(T),E&&(this.nativeDraggable&&i(E,"dragend",this),f(E),E.style["will-change"]="",l(E,this.options.ghostClass,!1),l(E,this.options.chosenClass,!1),d(this,x,"unchoose",E,D,x,P),x!==D?(j=v(E,n.draggable))>=0&&(d(null,D,"add",E,D,x,P,j),d(this,x,"remove",E,D,x,P,j),d(null,D,"sort",E,D,x,P,j),d(this,x,"sort",E,D,x,P,j)):E.nextSibling!==C&&(j=v(E,n.draggable))>=0&&(d(this,x,"update",E,D,x,P,j),d(this,x,"sort",E,D,x,P,j)),e.active&&(null!=j&&-1!==j||(j=P),d(this,x,"end",E,D,x,P,j),this.save()))),this._nulling()},_nulling:function(){x=E=D=I=C=T=L=B=M=F=U=X=j=N=O=Y=q=e.active=null,le.forEach(function(e){e.checked=!0}),le.length=0},handleEvent:function(e){switch(e.type){case"drop":case"dragend":this._onDrop(e);break;case"dragover":case"dragenter":E&&(this._onDragOver(e),r(e));break;case"mouseover":this._onDrop(e);break;case"selectstart":e.preventDefault()}},toArray:function(){for(var e,t=[],n=this.el.children,r=0,a=n.length,i=this.options;r<a;r++)e=n[r],o(e,i.draggable,this.el)&&t.push(e.getAttribute(i.dataIdAttr)||h(e));return t},sort:function(e){var t={},n=this.el;this.toArray().forEach(function(e,r){var a=n.children[r];o(a,this.options.draggable,n)&&(t[e]=a)},this),e.forEach(function(e){t[e]&&(n.removeChild(t[e]),n.appendChild(t[e]))})},save:function(){var e=this.options.store;e&&e.set(this)},closest:function(e,t){return o(e,t||this.options.draggable,this.el)},option:function(e,t){var o=this.options;if(void 0===t)return o[e];o[e]=t,"group"===e&&de(o)},destroy:function(){var e=this.el;e[J]=null,i(e,"mousedown",this._onTapStart),i(e,"touchstart",this._onTapStart),i(e,"pointerdown",this._onTapStart),this.nativeDraggable&&(i(e,"dragover",this),i(e,"dragenter",this)),Array.prototype.forEach.call(e.querySelectorAll("[draggable]"),function(e){e.removeAttribute("draggable")}),se.splice(se.indexOf(this._onDragOver),1),this._onDrop(),this.el=e=null}},a(G,"touchmove",function(t){e.active&&t.preventDefault()}),e.utils={on:a,off:i,css:s,find:c,is:function(e,t){return!!o(e,t,e)},extend:b,throttle:_,closest:o,toggleClass:l,clone:k,index:v,nextTick:w,cancelNextTick:S},e.create=function(t,o){return new e(t,o)},e.version="1.7.0",e})}]);