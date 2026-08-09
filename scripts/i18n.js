/* scripts/i18n.js
   Internationalization + formatting utilities for WorkSpace Pro
   - Supports languages: id (default), en, zh (basic), ar (basic)
   - Formats numbers, currency, dates using Intl
   - Provides login modal helpers and insights renderer
*/
(function(){
  const translations = {
    id: {
      insTitle: 'Insights',
      insSub: 'Ringkasan cepat metrik penting',
      insTasks: 'Tugas',
      insTx: 'Transaksi (Bulan Ini)',
      insBalance: 'Saldo',
      insPom: 'Sesi Pomodoro',
      loginTitle: 'Masuk',
      phEmail: 'Email',
      phPassword: 'Kata sandi',
      btnLogin: 'Masuk',
      btnCancel: 'Batal',
      // some common labels
      chatHeading: 'Asisten AI Serbaguna',
      chatSub: 'Asisten pintar WorkSpace untuk membantu pertanyaan, analisis, & produktivitas.',
      phApiKey: 'API Key (Kustom/Opsional)',
      btnClearChatText: 'Bersihkan Chat',
      btnExportChat: 'Ekspor',
      lblQuickPrompt: 'PROMPT CEPAT:',
      chatWelcomeMsg: 'Halo! Saya asisten AI WorkSpace Pro. Ada yang bisa saya bantu hari ini? Tanyakan apa saja.',
      phChatInput: 'Ketik pertanyaan atau perintah...',
      finTitle: 'Manajemen Keuangan',
      finSub: 'Pantau arus kas, grafik lingkaran, dan perbandingan online vs offline.',
      lblBudgetGoal: 'Target Batas Pengeluaran Bulanan:',
      btnExportFin: 'Ekspor CSV',
      btnPrint: '🖨️ Cetak / PDF',
      btnShareFin: 'Bagikan',
      lblNet: 'Total Saldo',
      lblIncome: 'Pemasukan',
      lblExpense: 'Pengeluaran',
      thDate: 'Tanggal',
      thCat: 'Kategori / Metode',
      thDesc: 'Keterangan',
      thNom: 'Nominal',
      thAct: 'Aksi',
      // settings
      setHeading: 'Pengaturan & Informasi',
      lblTheme: 'Tema Tampilan',
      lblAboutTitle: 'Tentang Aplikasi & Pengembang'
    },
    en: {
      insTitle: 'Insights',
      insSub: 'Quick summary of important metrics',
      insTasks: 'Tasks',
      insTx: 'Transactions (This Month)',
      insBalance: 'Balance',
      insPom: 'Pomodoro Sessions',
      loginTitle: 'Login',
      phEmail: 'Email',
      phPassword: 'Password',
      btnLogin: 'Login',
      btnCancel: 'Cancel',
      chatHeading: 'Versatile AI Assistant',
      chatSub: 'WorkSpace smart assistant for questions, analysis, & productivity.',
      phApiKey: 'API Key (Custom/Optional)',
      btnClearChatText: 'Clear Chat',
      btnExportChat: 'Export',
      lblQuickPrompt: 'QUICK PROMPTS:',
      chatWelcomeMsg: "Hi! I'm the WorkSpace Pro AI assistant. How can I help today?",
      phChatInput: 'Type a question or command...',
      finTitle: 'Finance Management',
      finSub: 'Monitor cashflow, donut charts, and online vs offline breakdown.',
      lblBudgetGoal: 'Monthly Spending Limit Target:',
      btnExportFin: 'Export CSV',
      btnPrint: '🖨️ Print / PDF',
      btnShareFin: 'Share',
      lblNet: 'Net Balance',
      lblIncome: 'Income',
      lblExpense: 'Expense',
      thDate: 'Date',
      thCat: 'Category / Method',
      thDesc: 'Description',
      thNom: 'Amount',
      thAct: 'Action',
      setHeading: 'Settings & Info',
      lblTheme: 'Appearance Theme',
      lblAboutTitle: 'About App & Developer'
    },
    zh: {
      insTitle: '洞察',
      insSub: '重要指标的快速摘要',
      insTasks: '任务',
      insTx: '本月交易',
      insBalance: '余额',
      insPom: '番茄钟会话',
      loginTitle: '登录',
      phEmail: '电子邮件',
      phPassword: '密码',
      btnLogin: '登录',
      btnCancel: '取消'
    },
    ar: {
      insTitle: 'لمحات',
      insSub: 'ملخص سريع للقياسات المهمة',
      insTasks: 'المهام',
      insTx: 'المعاملات (هذا الشهر)',
      insBalance: 'الرصيد',
      insPom: 'جلسات بومودورو',
      loginTitle: 'تسجيل الدخول',
      phEmail: 'البريد الإلكتروني',
      phPassword: 'كلمة المرور',
      btnLogin: 'تسجيل الدخول',
      btnCancel: 'إلغاء'
    }
  };

  const defaultLang = 'id';

  function getLang() {
    return localStorage.getItem('ws_lang') || defaultLang;
  }

  function setLang(lang) {
    localStorage.setItem('ws_lang', lang);
  }

  function formatNumber(val, locale) {
    const n = Number(val) || 0;
    return new Intl.NumberFormat(locale).format(n);
  }

  function formatCurrency(val, currency, locale) {
    const n = Number(val) || 0;
    try{
      return new Intl.NumberFormat(locale, { style: 'currency', currency: currency || 'IDR' }).format(n);
    }catch(e){
      return (currency||'') + ' ' + n.toFixed(2);
    }
  }

  function formatDate(dateStr, locale, opts){
    const d = dateStr ? new Date(dateStr) : new Date();
    return new Intl.DateTimeFormat(locale, opts || { dateStyle: 'medium', timeStyle: 'short' }).format(d);
  }

  function translateDOM(lang){
    const dict = translations[lang] || translations[defaultLang];
    // text content
    document.querySelectorAll('[data-i18n]').forEach(el=>{
      const key = el.getAttribute('data-i18n');
      if(!key) return;
      if(dict[key]) el.textContent = dict[key];
    });
    // placeholders
    document.querySelectorAll('[data-i18n-ph]').forEach(el=>{
      const key = el.getAttribute('data-i18n-ph');
      if(!key) return;
      const phKey = el.getAttribute('data-i18n-ph');
      // sometimes attribute contains actual placeholder text instead of key
      if(dict[phKey]) el.setAttribute('placeholder', dict[phKey]);
      else if(el.getAttribute('placeholder')){/*keep*/}
      else el.setAttribute('placeholder','');
    });

    // numbers
    document.querySelectorAll('[data-value]').forEach(el=>{
      const raw = el.getAttribute('data-value');
      const asNum = Number(raw);
      if(!isNaN(asNum)){
        if(el.hasAttribute('data-currency')){
          const currency = el.getAttribute('data-currency');
          el.textContent = formatCurrency(asNum, currencySymbolToCode(currency), langToLocale(lang));
        } else {
          el.textContent = formatNumber(asNum, langToLocale(lang));
        }
      }
    });

    // currency-specific attributes
    document.querySelectorAll('[data-i18n-currency]').forEach(el=>{
      const val = el.getAttribute('data-i18n-currency');
      const currency = el.getAttribute('data-currency') || 'IDR';
      el.textContent = formatCurrency(val, currencySymbolToCode(currency), langToLocale(lang));
    });

    // numbers with data-i18n-num and optional data-format
    document.querySelectorAll('[data-i18n-num]').forEach(el=>{
      const raw = el.getAttribute('data-i18n-num');
      const asNum = Number(raw || el.textContent.replace(/[^0-9.-]/g,''));
      if(!isNaN(asNum)) el.textContent = formatNumber(asNum, langToLocale(lang));
    });
  }

  function langToLocale(lang){
    switch(lang){
      case 'en': return 'en-US';
      case 'zh': return 'zh-CN';
      case 'ar': return 'ar-EG';
      case 'id':
      default: return 'id-ID';
    }
  }

  function currencySymbolToCode(sym){
    // Accepts 'Rp' or 'IDR' or '$' etc, returns ISO currency code
    if(!sym) return 'IDR';
    const map = { 'Rp':'IDR','IDR':'IDR','$':'USD','USD':'USD','€':'EUR','EUR':'EUR','£':'GBP','GBP':'GBP','¥':'JPY','JPY':'JPY','SGD':'SGD' };
    return map[sym] || sym;
  }

  function changeLanguage(lang){
    if(!translations[lang]) lang = defaultLang;
    setLang(lang);
    // set html lang & dir
    document.documentElement.lang = (lang==='zh')? 'zh-CN' : (lang==='ar'? 'ar' : lang);
    document.documentElement.dir = (lang==='ar')? 'rtl' : 'ltr';

    translateDOM(lang);
    // re-render dynamic areas
    if(window.renderFinance) try{ window.renderFinance(); }catch(e){}
    if(window.renderInsights) try{ window.renderInsights(); }catch(e){}
    // update live clocks if present
    if(window.updateLiveClock) try{ window.updateLiveClock(); }catch(e){}
  }

  function initLangSelector(){
    const selector = document.getElementById('langSelector');
    if(selector){
      selector.value = getLang();
      selector.addEventListener('change', (e)=> changeLanguage(e.target.value));
    }
  }

  function openLoginModal(){
    const m = document.getElementById('loginModal');
    if(m) m.classList.remove('hidden');
  }
  function closeLoginModal(){
    const m = document.getElementById('loginModal');
    if(m) m.classList.add('hidden');
  }

  function doLogin(){
    const em = document.getElementById('loginEmail').value;
    // naive demo login: store user
    if(em){
      localStorage.setItem('ws_user_email', em);
      document.getElementById('welcomeUserBadge').textContent = (translations[getLang()].welcomeUser || 'Hi,') + ' ' + em.split('@')[0];
      closeLoginModal();
      alert(translations[getLang()].loginSuccess || 'Logged in');
      if(window.switchTab) try{ switchTab('chatbot'); }catch(e){}
    } else {
      alert(translations[getLang()].phEmail || 'Please enter email');
    }
  }

  function renderInsights(){
    // Read sample data from localStorage or fallback to placeholders
    const tasks = JSON.parse(localStorage.getItem('ws_tasks')||'[]');
    const tx = JSON.parse(localStorage.getItem('ws_transactions')||'[]');
    const balance = Number(localStorage.getItem('ws_balance')||0);
    const pom = Number(localStorage.getItem('ws_pom_sessions')||0);

    const lang = getLang();
    const locale = langToLocale(lang);

    const elTasks = document.getElementById('metricTasks');
    const elTx = document.getElementById('metricTxCount');
    const elBal = document.getElementById('metricBalance');
    const elPom = document.getElementById('metricPomSessions');

    if(elTasks) { elTasks.setAttribute('data-value', tasks.length); elTasks.textContent = formatNumber(tasks.length, locale); }
    if(elTx) { elTx.setAttribute('data-value', tx.length); elTx.textContent = formatNumber(tx.length, locale); }
    if(elBal) { elBal.setAttribute('data-value', balance); elBal.textContent = formatCurrency(balance, 'IDR', locale); }
    if(elPom) { elPom.setAttribute('data-value', pom); elPom.textContent = formatNumber(pom, locale); }
  }

  // expose to global scope for existing inline handlers
  window.changeLanguage = changeLanguage;
  window.openLoginModal = openLoginModal;
  window.closeLoginModal = closeLoginModal;
  window.doLogin = doLogin;
  window.renderInsights = renderInsights;
  window.formatCurrency = formatCurrency;

  // init on DOM loaded
  document.addEventListener('DOMContentLoaded', ()=>{
    initLangSelector();
    const lang = getLang();
    changeLanguage(lang);
    // rerender insights on load
    renderInsights();

    // attach login modal open/close to any existing elements missing
    const loginBtns = document.querySelectorAll('[onclick="openLoginModal()"]');
    loginBtns.forEach(b=> b.addEventListener('click', openLoginModal));

    // ensure any element with data-value gets formatted initially
    translateDOM(lang);
  });

})();
