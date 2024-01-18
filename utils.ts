export class Functions {
  constructor() { }
  isTimerActive: any = false;
  timerName: any = null;
  mf: any = (number: any) => Math.floor(number);
  log: any = (...argList: any) => console.log(...argList);
  table: any = (...content: any) => console.table(...content);
  clear: any = () => console.clear();
  qs: any = (selector: any) => document.querySelector(selector);
  qsa: any = (selector: any) => document.querySelectorAll(selector);
  dq: any = (selector: any) => document.querySelector(selector);
  dqa: any = (selector: any) => document.querySelectorAll(selector);
  dqs: any = (selector: any) => document.querySelector(selector);
  dqsa: any = (selector: any) => document.querySelectorAll(selector);
  bekle: any = (sure: any) => new Promise(resolve => setTimeout(()=>resolve(true), sure * 1000));
  w: any = (sure: any) => new Promise(resolve => setTimeout(()=>resolve(true), sure * 1000));
  gid: any = (id: any) => document.getElementById(id);
  hidden: any = (element: any) => element.hidden=!element.hidden;
  display: any = (element: any, d:any = 'block') => element.style.display=element.style.display==d?'none':d;
  rs: any = (min: any, max: any) => this.mf(Math.random() * (( max + 1 ) - min)) + min;
  lerp: any = (a: any, b: any, c: any) => a + (b - a) * c;
  ga: any = (el: any, attribute: any) => el.getAttribute(attribute);
  sa: any = (el: any, attribute: any, newValue: any) => el.setAttribute(attribute, newValue);
  get: any = (itemName: any) =>localStorage.getItem(itemName);
  set: any = (itemName: any, value: any) =>localStorage.setItem(itemName, value);
  del: any = (itemName: any) => localStorage.removeItem(itemName);
  limitText: any = (text: any, number: any) => {
    let ttr = '';
    for (let i = 0; i < number; i++) ttr += text[i];
    return ttr;
  }
  mailOrPhone: any = (text: any) => {
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
      else if(text[0] == '+' && text.length == 13) data = text.slice(0, 3) + ' (' + text.slice(3, 6) + ') ' + text.slice(6,9) + ' ' + text.slice(9, 13);
    }
    return {mailMi: isThisMail, DATA: data};
  }
  ilkHarfBuyut: any = (text: any) => {
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
  createToken(): any {
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
  timer: any = (time: any = 3, process: any, extraFeatures: any, isItFirstTime: any = true) => {
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
  image: any = (source: any) => {
    var image = new Image();
    image.src = source;
    return image;
  }
  getIntersection: any = (A: any, B: any, C: any, D: any) => {
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
