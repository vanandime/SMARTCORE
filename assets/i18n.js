// assets/i18n.js
(function(){
  const translations = {
    id: {
      chatHeading: 'Asisten AI Serbaguna',
      chatSub: 'Asisten pintar WorkSpace untuk membantu pertanyaan, analisis, & produktivitas.',
      phChatInput: 'Ketik pertanyaan atau perintah...',
      btnSend: 'Kirim',
      finTitle: 'Manajemen Keuangan',
      finSub: 'Pantau arus kas, grafik lingkaran, dan perbandingan online vs offline.',
      lblBudgetGoal: 'Target Batas Pengeluaran Bulanan:',
      used: 'Terpakai',
      focusHeading: 'Focus Mode',
      focusSub: 'Mode fokus ringan — fullscreen & quick Pomodoro.',
      btnToggleFull: 'Toggle Fullscreen',
      toolsHeading: 'Tools Berguna',
      loginTitle: 'Masuk',
      phLoginEmail: 'Email',
      phLoginPass: 'Password',
      copied: 'Disalin ke papan klip',
      errBase64: 'Input Base64 tidak valid'
    },
    en: {
      chatHeading: 'AI Assistant',
      chatSub: 'Workspace smart assistant for questions, analysis & productivity.',
      phChatInput: 'Type a question or command...',
      btnSend: 'Send',
      finTitle: 'Finance Manager',
      finSub: 'Monitor cashflow, charts, and online vs offline.',
      lblBudgetGoal: 'Monthly Spending Limit:',
      used: 'Used',
      focusHeading: 'Focus Mode',
      focusSub: 'Lightweight focus — fullscreen & quick Pomodoro.',
      btnToggleFull: 'Toggle Fullscreen',
      toolsHeading: 'Useful Tools',
      loginTitle: 'Sign In',
      phLoginEmail: 'Email',
      phLoginPass: 'Password',
      copied: 'Copied to clipboard',
      errBase64: 'Invalid Base64 input'
    },
    zh: {
      chatHeading: 'AI 助手',
      chatSub: '帮助提问、分析与提高生产力的 WorkSpace 智能助手。',
      phChatInput: '输入问题或指令...',
      btnSend: '发送',
      finTitle: '财务管理',
      finSub: '监控现金流、图表与线上/线下对比。',
      lblBudgetGoal: '每月支出限制：',
      used: '已使用',
      focusHeading: '专注模式',
      focusSub: '轻量专注 — 全屏与快速番茄计时。',
      btnToggleFull: '切换全屏',
      toolsHeading: '实用工具',
      loginTitle: '登录',
      phLoginEmail: '邮箱',
      phLoginPass: '密码',
      copied: '已复制到剪贴板',
      errBase64: '无效的 Base64 输入'
    },
    ar: {
      chatHeading: 'مساعد الذكاء الاصطناعي',
      chatSub: 'مساعد WorkSpace الذكي للأسئلة والتحليل والإنتاجية.',
      phChatInput: 'اكتب سؤالًا أو أمرًا...',
      btnSend: 'إرسال',
      finTitle: 'إدارة المالية',
      finSub: 'مراقبة التدفق النقدي والرسوم البيانية.',
      lblBudgetGoal: 'حد الإنفاق الشهري:',
      used: 'مستخدم',
      focusHeading: 'وضع التركيز',
      focusSub: 'وضع تركيز خفيف — ملء الشاشة وبومودورو سريع.',
      btnToggleFull: 'تبديل ملء الشاشة',
      toolsHeading: 'أدوات مفيدة',
      loginTitle: 'تسجيل الدخول',
      phLoginEmail: 'البريد الإلكتروني',
      phLoginPass: 'كلمة المرور',
      copied: 'تم النسخ إلى الحافظة',
      errBase64: 'مدخل Base64 غير صالح'
    }
  };

  function getCurrentLang(){return localStorage.getItem('ws_lang')||'id'}
  function setCurrentLang(l){localStorage.setItem('ws_lang',l)}
  window.getCurrentLang=getCurrentLang;

  function changeLanguage(lang){
    setCurrentLang(lang);
    document.documentElement.lang = lang;
    if(lang==='ar') document.documentElement.dir='rtl'; else document.documentElement.dir='ltr';

    // update texts
    document.querySelectorAll('[data-i18n]').forEach(el=>{
      const key = el.getAttribute('data-i18n');
      if(translations[lang] && translations[lang][key]) el.textContent = translations[lang][key];
    });
    // placeholders
    document.querySelectorAll('[data-i18n-ph]').forEach(el=>{
      const key = el.getAttribute('data-i18n-ph');
      if(translations[lang] && translations[lang][key]) el.placeholder = translations[lang][key];
    });

    // format numbers/currencies (elements with data-i18n-currency)
    document.querySelectorAll('[data-i18n-currency]').forEach(el=>{
      const currency = el.getAttribute('data-i18n-currency');
      const v = parseFloat(el.dataset.value||el.textContent||0)||0;
      try{ el.textContent = new Intl.NumberFormat(lang,{style:'currency',currency:currency}).format(v);}catch(e){}
    });
  }

  function initI18n(){
    const lang = getCurrentLang();
    const selector = document.getElementById('langSelectorHeader'); if(selector) selector.value=lang;
    changeLanguage(lang);
  }

  function getTranslation(key){
    const lang=getCurrentLang(); return (translations[lang] && translations[lang][key]) || (translations['en'] && translations['en'][key]) || key;
  }

  window.changeLanguage = changeLanguage;
  window.initI18n = initI18n;
  window.getTranslation = getTranslation;

})();
