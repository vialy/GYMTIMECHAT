import dayjs from 'dayjs'

const env = process.env.NODE_ENV;

export const getEnv = () => {
  // if (location.host === 'amrefinance.com') {
  //   return 'production'
  // } else if (location.host === 'test.amrefinance.com') {
  //   return 'staging'
  // } else {
  //   return 'development'
  // }
  return 'production';
  return env || 'production';
}

export const siteTitle = process.env.TITLE || 'GYMTIME'

export const formatDateOnly =  value => {
  if(value){
    value = new Date(value + ' 00:00:00').toISOString();
    return formatDate(value, 'MMM D, YYYY')
  }
  return '';
}
export const formatDate = (value, format = 'MMM D, YYYY hh:mm') => {
  if(!value.toLowerCase().includes('z')){
      value = new Date(value);
      value.setUTCHours(value.getHours(),value.getMinutes());
      value.setUTCFullYear(value.getFullYear());
      value.setUTCMonth(value.getMonth());
  }
  return dayjs(value).format(format)
}

export const showLoader = (mode = true)=>{
  if(process.browser){
    const loader = document.getElementById('loader');
    if(loader){
      loader.style.display = 'block';
    }
  }
}

export const hideLoader = (mode = true)=>{
  if(process.browser){
    const loader = document.getElementById('loader');
    if(loader){
      loader.style.display = 'none';
    }
  }
}

export const setLocal = (key, value)=>{
  try{
    localStorage.setItem(key, JSON.stringify(value));
  }catch(e){}
}

export const getLocal = (key = '')=>{
  try{
    return JSON.parse(localStorage.getItem(key));
  }catch(e){
    return null;
  }
}

export const getToken = ()=>{
  return getLocal('user-token') || '';
}

export const clearLocal = ()=>{
  try{
    localStorage.clear();
  }catch(e){

  }
}

export const removeLocal = (key)=>{
  try{
    localStorage.removeItem(key);
  }catch(e){

  }
}

export const createLoader = (key)=>{
  // loader is being created in the footer component (css)
  if(process.browser){
    const loader = document.getElementById('loader');
    if(!loader){
      const loader = document.createElement('div');
      loader.id = "loader";
      loader.innerHTML = `
        <div class="sk-chase">
          <div class="sk-chase-dot"></div>
          <div class="sk-chase-dot"></div>
          <div class="sk-chase-dot"></div>
          <div class="sk-chase-dot"></div>
          <div class="sk-chase-dot"></div>
          <div class="sk-chase-dot"></div>
        </div>
      `
      document.body.prepend(loader);
      hideLoader();
    }
  }
}

export const generateSeo = (t = (e)=>e, params = {}) =>{
  const { description, title, image} = params
  return {
    lang: t('locale'),
    title: title? `${title} | ${t('title')}`: t('title'),
    ogTitle: title? `${title} | ${t('title')}`: t('title'),
    description: description || t('description'),
    ogDescription: description || t('description'),
    twitterDescription: description || t('description'),
    ogImage: image || '/logo-seo.jpg',
    twitterImage: image || '/logo-seo.jpg',
    image: image || '/logo-seo.jpg',
    twitterCard: 'summary_large_image'
  }
}

export const parseStrapiData = (data)=>{

}

export const validateEmail = (inputText = '')=> {
  var format = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (inputText.match(format)) {
      console.log('Passed')
      return true;
  }
  return false;
}

const resolveRichTextNode = (node)=>{
  let html = '';
  const children = node.children ? node.children.map((c) => resolveRichTextNode(c)).join('') : '';

  switch (node.type) {
    case 'heading':
      html = `<h${node.level}>${children}</h${node.level}>`;
      break;
    case 'text':
      if (node.text) {
        let tmp = node.text.replaceAll('\n', '<br />');

        if (node.bold) tmp = `<b>${tmp}</b>`;
        if (node.code) tmp = `<code>${tmp}</code>`;
        if (node.italic) tmp = `<i>${tmp}</i>`;
        if (node.strikethrough) tmp = `<s>${tmp}</s>`;
        if (node.underline) tmp = `<u>${tmp}</u>`;

        html = tmp;
      }
      break;
    case 'paragraph':
      html = `<p class="mt-3">${children}</p>`;
      break;
    case 'link':
      html = `<a href="${node.url}">${children}</a>`;
      break;
    case 'list':
      switch (node.format) {
        case 'ordered':
          html = `<ol>${children}</ol>`;
          break;
        case 'unordered':
          html = `<ul>${children}</ul>`;
          break;
      }
      break;
    case 'list-item':
      html = `<li>${children}</li>`;
      break;
    case 'quote':
      html = `<blockquote>${children}</blockquote>`;
      break;
    case 'code':
      html = `<pre>${children}</pre>`;
      break;
    case 'image':
      if (node.image) {
        html = `<div class="text-center"><img src="${node.image.url}" style="max-height: 500px; max-width: 90vh" height="${node.image.height}" alt="${node.image.alternativeText}" /></div>`;
      }
      break;
  }

  return html.replaceAll('\t', '');
}

export const resolveRichText = (nodes)=>{
  return nodes.map((c) => resolveRichTextNode(c)).join('');
}


export const baseUrl = getEnv() == 'development' ? 'http://localhost:3000': ( getEnv() == 'production' ? 'https://www.amrefinance.com' : 'https://test.amrefinance.com');

export const logout = ()=>{
  clearLocal()
  location.reload();
}

export const isLogin = ()=>{
  if(getLocal('user-data')) return true;
  return false;
}
export const getUserData = ()=>{
  if(process.browser){
    return getLocal('user-data') || {};
  }
  return {};
}

export const setUserData = (value)=>{
  setLocal('user-data', value);
}


export const getProgress = (targetAmount = 0, currentAmount = 0)=>{
  if(currentAmount == 0 || targetAmount == 0) return 0;
  return Number((currentAmount * 100) / targetAmount).toFixed(2);
}

export const convertToUTC = (date)=>{ // takes a give time (utc + 1) and makes it utc
  return new Date(new Date(date)).toISOString()
}

export const formatToDays =  value => {
  if(!value.toLowerCase().includes('z')){
      value = new Date(value);
      value.setUTCHours(value.getHours(),value.getMinutes());
      value.setUTCFullYear(value.getFullYear());
      value.setUTCMonth(value.getMonth());
  }
  return dayjs(value).endOf('day').fromNow();
}
export const formatChat =  value => {
  return "Hello"
  if(!value.toLowerCase().includes('z')){
      value = new Date(value);
      value.setUTCHours(value.getHours(),value.getMinutes());
      value.setUTCFullYear(value.getFullYear());
      value.setUTCMonth(value.getMonth());
  }
  return dayjs(value).startOf('day').fromNow();
}


export const checkPassword = (str = '')=> { // password should match uppercase, lowercase and number
  let re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  return re.test(str);
}

export const campaignTypes =  Object.freeze({
  recursive: 1,
  normal: 2,
  endsOnTartAttained: 3,
  neverEnds: 5,
  // rejected: -10,
})

export const getCampaignStatuses = ()=> {
  return {
    stopped: -300,
    rejected: -10,
    init: 20,
    unSubmitted: 1,
    pendingValidation: 2,
    started: 300,
    approved: 100,
    paused: 400,
    pendingDeletion: 500,
    undefined: undefined
  }
}

export const calculateTargetAmount = (directCosts = 0, projectCosts = 0) =>{
  const a = Number(directCosts || 0);
  const b = Number(projectCosts || 0);
  const c = Number((8 * (a + b)) / 100)
  const d = Number((10 * (a + b + c)) / 100)
  const e = Number((5 * (a + b + c)) / 100)

  return {
    indirectCosts: c.toFixed(2), // Also know as management fee
    transactionFee: e.toFixed(2),
    taxExpenses: d.toFixed(2), // Also known as error margin
    targetAmount: Number(a + b + c + d + e).toFixed(2)
  }
}

export const currency = function(value, currency = 'USD', language = 'en-US') {
  return new Intl.NumberFormat(language, { style: 'currency', currency: currency }).formatToParts(value).map(
      p => p.type != 'literal' && p.type != 'currency' ? p.value : ''
  ).join('');
};

export const thousand = function(value){
  return currency(value).split('.')[0];
}

export const copyText = function(value){
  return navigator.clipboard.writeText(value)
}

export const emailValidator = function(email) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
    return true;
  }else{
    return false;
  }
};

export const completeTable = (items = [])=>{
  if (items.length >= 10) return items;
  const loop = 10 - items.length;
  for (let i = 0; i < loop; i++) {
      items.push({});
  }
  return items;
};

export const showToast = (Toast, message = '', type = 'danger',  title = 'Alert')=>{
  if(!Toast){
    // console.error('Parse a toast class')
    return;
  }
  const toastContainer = document.getElementById('toast-container');
  const el = document.createElement('div');
  el.className = 'toast text-light'
  el.setAttribute('role', 'alert');
  el.setAttribute('aria-live', "assertive");
  el.setAttribute('aria-atomic', "true");
  el.innerHTML = `
  <div class="toast-header bg-${type}">
      <strong class="me-auto text-light">${title }</strong>
      <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
    <div class="toast-body text-dark bg-light">
      ${ message }
  </div>
  `;
  toastContainer.prepend(el);
  const toastElement = new Toast(el, {delay: 10000, autohide: true});
  setTimeout(() => {
    toastElement.dispose();
    el.remove();
  }, 10000)
  toastElement.show();
}


export default {
  getToken
}
