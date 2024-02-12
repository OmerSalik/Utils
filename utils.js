class Functions {
  constructor() {
    this.setKey();
    this.whenLoad(this.setStyle);
  }
  Key = null;
  Style = `#fixed-container, *[modal-name], #utilTimer { top: 0; left: 0; right: 0; bottom: 0; display: flex; position: fixed; align-items: center; justify-content: center; background-color: rgba(0, 0, 0, .3); } #utilTimer { color: green; font-weight: bold; font-size: xx-large; }`;
  Timer = { active: false };
  Variables = {};
  c = () => console.clear();
  clear = () => console.clear();
  mf = number => Math.floor(number);
  lerp = (a, b, c) => a + (b - a) * c;
  gid = id => document.getElementById(id);
  log = (...argList) => console.log(...argList);
  redirect = href => window.location.href = href;
  get = itemName =>localStorage.getItem(itemName);
  table = (...content) => console.table(...content);
  qs = selector => document.querySelector(selector);
  ga = (el, attribute) => el.getAttribute(attribute);
  hidden = element => element.hidden=!element.hidden;
  del = itemName => localStorage.removeItem(itemName);
  qsa = selector => document.querySelectorAll(selector);
  set = (itemName, value) =>localStorage.setItem(itemName, value);
  error = (...errorList) => console.error('\n', ...errorList, '\n');
  rs = (min, max) => this.mf(Math.random() * (( max + 1 ) - min)) + min;
  cac = (id = 'canvas') => [this.gid(id),this.gid(id).getContext('2d')];
  sa = (el, attribute, newValue) => el.setAttribute(attribute, newValue);
  bigFirstLetter = text => text[0].toUpperCase() + text.slice(1, text.length);
  w = sure => new Promise(resolve => setTimeout(()=>resolve(true), sure * 1000));
  bekle = sure => new Promise(resolve => setTimeout(()=>resolve(true), sure * 1000));
  la = (array, fun) => array.forEach(element => this.log(fun ? fun(element) : element));
  display = (element,d='block') => element.style.display=element.style.display==d?'none':d;
  variables = (key, value) => {if(value) this.Variables[key]=value;return this.Variables[key];};
  adv = (selector, event, fun) => this.qsa(selector).forEach(el => el.addEventListener(event, fun));
  setStyle = () => this.gid('utilStyle') ? this.gid('utilStyle').innerHTML = this.Style : document.body.innerHTML += `<style id="utilStyle">${this.Style}</style>`;
  modal = modalName => this.qs(`[modal-name="${modalName}"]`) ? this.qs(`[modal-name="${modalName}"]`).style.display == 'none' ? 'flex' : 'none' : this.error(`Modal '${modalName}' not found.`);
  warn = (...warnList) => console.warn(...warnList);
  setKey = async () => {
    let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    let key = '';
    for (let i = 0; i < this.rs(16, 32); i++) key += letters.splice(this.rs(0, letters.length - 1), 1);
    await this.w(.2);
    this.Key = key;
  }
  token = (len = 16) => {
    if(this.Key != null) {
      let ttr = '';
      for (let i = 0; i < len; i++) ttr += this.Key[this.rs(0, this.Key.length - 1)];
      return ttr;
    }
    return new Promise(async (resolve) => {
      await this.w(.1);
      resolve(await this.token(len))
    })
  }
  timer = (duration = 3, extraFeatures = { function: () => {}, type: 'second', style: {} }, ...argList) => {
    return new Promise(async (resolve) => {
      let { active } = this.Timer;
      if(!active) {
        this.Timer.active = true;
        if(!extraFeatures.type) extraFeatures.type = 'second'; if(!extraFeatures.style) extraFeatures.style = {};
        this.gid('utilTimer') ? this.gid('utilTimer').remove() : document.body.innerHTML += '<div id="utilTimer"></div>';
        let el = this.gid('utilTimer');
        Object.keys(extraFeatures.style).forEach(key => el.style[key] = extraFeatures.style[key]);
        while (duration > 0) {
          el.innerHTML = extraFeatures.type == 'second' ? duration : duration.toFixed(2);
          await this.w(extraFeatures.type == 'second' ? 1 : .01);
          duration -= extraFeatures.type == 'second' ? 1 : .01;
        }
        el.remove();
        this.Timer.active = false;
        extraFeatures.function && typeof(extraFeatures.function) == 'function' ? extraFeatures.function(...argList) : false;
        resolve('Timer finished');
        return;
      } else {
        this.error('Timer is already active');
        resolve('Timer is already active');
        return;
      }
    })
  }
  mailOrPhone = text => {
    text = text.replace(/\s/g, '');
    let isThisMail = /[^0-9+()]/g.test(text), data;
    if(isThisMail) {
      text = text.toLowerCase();
      if(!text.includes('@')) return { Error: "Mail must contain '@'"}
      else if(text.length < 7 || text.split('@')[0].length < 1 || text.split('@')[1].length < 5) return { Error: "Please enter a valid E-Mail address."}
      else data = text;
    } else {
      text = text.replace('(','').replace(')','');
      if(text[0] == '5' && text.length == 10) data = '+90 (' + text.slice(0, 3) + ') ' + text.slice(3, 6) + ' ' + text.slice(6, 10);
      else if(text[0] == '0' && text.length == 11) data = '+90 (' + text.slice(1, 4) + ') ' + text.slice(4, 7) + ' ' + text.slice(7, 11);
      else if(text[0] == '9' && text.length == 12) data = '+90 (' + text.slice(2, 5) + ') ' + text.slice(5, 8) + ' ' + text.slice(8, 12);
      else if(text[0] == '+' && text.length == 13) data = '+90 (' + text.slice(3, 6) + ') ' + text.slice(6,9) + ' ' + text.slice(9, 13);
    }
    return { Type: data ? isThisMail ? 'mail' : 'tel' : 'null', DATA: data };
  };
  image = (source) => {
    let image = new Image();
    image.src = source;
    return image;
  };
  getIntersection = (A, B, C, D) => {
    let tTop = (D.x - C.x) * (A.y - C.y) - (D.y - C.y) * (A.x - C.x);
    let uTop = (C.y - A.y) * (A.x - B.x) - (C.x - A.x) * (A.y - B.y);
    let bottom = (D.y - C.y) * (B.x - A.x) - (D.x - C.x) * (B.y - A.y);
    if (bottom != 0) {
      let t = tTop / bottom;
      let u = uTop / bottom;
      if (t >= 0 && t <= 1 && u >= 0 && u <= 1) return {
        x: this.lerp(A.x, B.x, t),
        y: this.lerp(A.y, B.y, t),
        offsetT: t,
        offsetU: u
      }
    }
    return null;
  };
  whenLoad = async (nextProcess = function() {}, log = false) => {
    return new Promise(async (resolve) => {
      while(true) {
        if(document.readyState === 'complete') {
          resolve(true);
          nextProcess();
          if(log) console.log('load completed');
          break;
        } else {
          await new Promise(res => setTimeout(res, 50))
          if(log) console.log('still waiting for load...');
        }
      }
    })
  };
};

const f = new Functions();
