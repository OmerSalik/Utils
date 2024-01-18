class Functions {
  constructor() {
    this.isTimerActive = false
    this.timerName = null
  }
  mf = number => Math.floor(number);
  log = (...argList) => console.log(...argList);
  table = (...content) => console.table(...content);
  clear = () => console.clear();
  qs = selector => document.querySelector(selector);
  qsa = selector => document.querySelectorAll(selector);
  dq = selector => document.querySelector(selector);
  dqa = selector => document.querySelectorAll(selector);
  dqs = selector => document.querySelector(selector);
  dqsa = selector => document.querySelectorAll(selector);
  bekle = sure => new Promise(resolve => setTimeout(()=>resolve(true), sure * 1000));
  w = sure => new Promise(resolve => setTimeout(()=>resolve(true), sure * 1000));
  gid = id => document.getElementById(id);
  hidden = element => element.hidden=!element.hidden;
  display = (element,d='block') => element.style.display=element.style.display==d?'none':d;
  rs = (min, max) => this.mf(Math.random() * (( max + 1 ) - min)) + min;
  lerp = (a, b, c) => a + (b - a) * c;
  ga = (el, attribute) => el.getAttribute(attribute);
  sa = (el, attribute, newValue) => el.setAttribute(attribute, newValue);
  get = itemName =>localStorage.getItem(itemName);
  set = (itemName, value) =>localStorage.setItem(itemName, value);
  del = itemName => localStorage.removeItem(itemName);
  limitText = (text, number) => {
    let ttr = '';
    for (let i = 0; i < number; i++) ttr += text[i];
    return ttr;
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
      else if(text[0] == '+' && text.length == 13) data = text.slice(0, 3) + ' (' + text.slice(3, 6) + ') ' + text.slice(6,9) + ' ' + text.slice(9, 13);
    }
    return {mailMi: isThisMail, DATA: data};
  }
  ilkHarfBuyut = text => {
    let ttr = '';
    if(typeof text == 'string') {
      text.split(' ').forEach((word, index) => {
        let Text = '';
        let nword = word.slice(0, 1).toLocaleUpperCase() + word.slice(1);
        ttr += `${index != 0 ? ' ' : ''}${nword}`;
      })
    }
    return ttr;
  }
  createToken() {
    if (window.crypto && window.crypto.getRandomValues) {
      const buffer = new Uint8Array(32);
      window.crypto.getRandomValues(buffer);
      const randomToken = Array.from(buffer, byte => byte.toString(16).padStart(2, '0')).join('');
      return randomToken;
    } else {
      console.error('Tarayıcı rastgele isim oluşturma işlemini desteklemiyor. Bu sebeple a4Goo!3ub8fY atanıyor');
      return 'a4Goo3ub8fY';
    }
  }
  timer = (time = 3, process, extraFeatures, isItFirstTime = true) => {
    if(typeof(time) != 'number') time = 3;
    time = Math.floor(time);
    let id = this.timerName, color = 'green', backgroundColor = 'rgba(0,0,0,.2)';

    if(typeof(extraFeatures) == 'object') {
      id = extraFeatures.id ? extraFeatures.id : id;
      color = extraFeatures.color ? extraFeatures.color : color;
      backgroundColor = extraFeatures.backgroundColor ? extraFeatures.backgroundColor : backgroundColor;
    }
    
    if(this.isTimerActive === false) {
      time += 1;
      id = this.createToken();
      this.isTimerActive = true;
      this.timerName = id;
    }

    let el = this.gid(this.timerName);

    if(el) {
      if(time == 1) {
        this.isTimerActive = false;
        el.innerHTML = '';
        el.remove();
        if(process && typeof(process) == 'function') process();
      }
      else {
        time--;
        el.innerHTML = `<div style="display:flex;justify-content:center;align-items:center;position:fixed;top:0;bottom:0;left:0;right:0;background-color:${backgroundColor};z-index:999;font-size:4em;font-weight: bold;color: ${color};">${time}</div>`;
        setTimeout(()=>{this.timer(time, process, { id, color, backgroundColor }, false)},1000)
      }
    } else {
      let newElement = document.createElement('div');
      newElement.setAttribute('id', this.timerName);
      document.body.appendChild(newElement);
      this.timer(time, process, extraFeatures, false);
      return;
    }
  }
  image = (source) => {
    var image = new Image();
    image.src = source;
    return image;
  }
  getIntersection = (A, B, C, D) => {
    const tTop = (D.x - C.x) * (A.y - C.y) - (D.y - C.y) * (A.x - C.x);
    const uTop = (C.y - A.y) * (A.x - B.x) - (C.x - A.x) * (A.y - B.y);
    const bottom = (D.y - C.y) * (B.x - A.x) - (D.x - C.x) * (B.y - A.y);
    if (bottom != 0) {
      const t = tTop / bottom;
      const u = uTop / bottom;
      if (t >= 0 && t <= 1 && u >= 0 && u <= 1) return {
        x: this.lerp(A.x, B.x, t),
        y: this.lerp(A.y, B.y, t),
        offsetT: t,
        offsetU: u
      }
    }
    return null;
  }
}
