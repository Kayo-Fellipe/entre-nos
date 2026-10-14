/* ============================================================
   Roleta a Dois — Lógica do jogo
   JavaScript puro. Sem frameworks.
   Máquina de estados + roleta 3D + eliminação.
   ============================================================ */

(function () {
  "use strict";

  /* ============================================================
     1. DADOS
     ============================================================ */

  var CATEGORIES = [
    { id: "beijos", name: "Beijos",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"/></svg>' },
    { id: "intimidade", name: "Intimidade",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4"/></svg>' },
    { id: "desafios", name: "Desafios",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/></svg>' },
    { id: "posicoes", name: "Posições",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8"/><path d="M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4"/><path d="M12 4v6"/><path d="M2 18h20"/></svg>' }
  ];

  var INTENSITIES = [
    { id: "conexao", name: "Conexão", hint: "Perguntas sobre preferências, memórias, relacionamento e curiosidades." },
    { id: "provocacao", name: "Provocação", hint: "Brincadeiras, flertes e desafios leves." },
    { id: "intimidade", name: "Intimidade", hint: "Desafios românticos e íntimos. Sempre consensuais." },
    { id: "personalizado", name: "Personalizado", hint: "Você escolhe as categorias manualmente." }
  ];

  var RULES = [
    { id: "elimina_sorteada", title: "Eliminar a sorteada", desc: "A opção sorteada sai do jogo permanentemente." },
    { id: "elimina_proxima", title: "Eliminar a próxima", desc: "A sorteada é eliminada e uma extra também na próxima rodada." },
    { id: "progressiva", title: "Eliminação progressiva", desc: "A cada 3 rodadas, uma opção extra é eliminada além da sorteada." }
  ];

  var END_CONDITIONS = [
    { id: "uma_resta", name: "Restar 1" },
    { id: "tres_restam", name: "Restar 3" },
    { id: "dez_rodadas", name: "10 rodadas" }
  ];

  var SEG_COLORS = [
    "#102040", "#1a3060", "#0d2848", "#1e4470",
    "#102040", "#1a3060", "#0d2848", "#1e4470",
    "#102040", "#1a3060", "#0d2848", "#1e4470",
    "#102040", "#1a3060", "#0d2848", "#1e4470",
    "#102040", "#1a3060", "#0d2848", "#1e4470"
  ];

  function card(cat, int, text) { return { cat: cat, int: int, text: text }; }

  var CARDS = [
    // BEIJOS / conexao
    card("beijos","conexao","Beije lentamente a boca do seu parceiro durante 20 segundos."),
    card("beijos","conexao","Dê um beijo demorado no pescoço do seu parceiro."),
    card("beijos","conexao","Beije o rosto inteiro do seu parceiro, terminando na boca."),
    card("beijos","conexao","Dê três beijos lentos em lugares escolhidos pelo seu parceiro."),
    card("beijos","conexao","Beije seu parceiro sem usar as mãos."),
    card("beijos","conexao","Dê um beijo surpresa no seu parceiro quando ele menos esperar."),
    card("beijos","conexao","Beije lentamente o pescoço e depois volte para a boca."),
    card("beijos","conexao","Dê um beijo na testa, um no pescoço e um na boca."),
    card("beijos","conexao","Beije seu parceiro enquanto mantém uma das mãos no rosto dele(a)."),
    card("beijos","conexao","Escolha uma parte do corpo do seu parceiro e cubra-a de beijos."),
    // BEIJOS / provocacao
    card("beijos","provocacao","Beije seu parceiro lentamente enquanto aproxima cada vez mais o corpo."),
    card("beijos","provocacao","Beije o pescoço do seu parceiro e termine com uma mordida suave."),
    card("beijos","provocacao","Beijem-se por um minuto sem interromper o contato corporal."),
    card("beijos","provocacao","Comece com um beijo delicado e aumente a intensidade aos poucos."),
    card("beijos","provocacao","Beije seu parceiro enquanto passa lentamente as mãos pelo corpo dele(a)."),
    card("beijos","provocacao","Dê beijos pelo peito do seu parceiro e deixe que ele(a) escolha onde parar."),
    card("beijos","provocacao","Beije seu parceiro no pescoço enquanto sussurra algo provocante."),
    card("beijos","provocacao","Beije lentamente uma região do corpo que normalmente você não beija."),
    card("beijos","provocacao","Seu parceiro fecha os olhos enquanto você decide onde dará cinco beijos."),
    card("beijos","provocacao","Aproxime-se para beijar, pare e provoque antes de continuar."),
    // BEIJOS / intimidade
    card("beijos","intimidade","Beije seu parceiro por dois minutos, alternando entre suave e intenso."),
    card("beijos","intimidade","Cubra o corpo do seu parceiro com beijos. Ele(a) escolhe quando parar."),
    card("beijos","intimidade","Beije lentamente o peito do seu parceiro enquanto mantém contato visual."),
    card("beijos","intimidade","Beije seu parceiro enquanto suas mãos exploram lentamente o corpo."),
    card("beijos","intimidade","Dê beijos demorados pelo pescoço e peito do seu parceiro."),
    card("beijos","intimidade","Olhos fechados: escolha uma sequência de beijos para arrepiar seu parceiro."),
    card("beijos","intimidade","Beije seu parceiro enquanto sussurra o que mais deseja fazer."),
    card("beijos","intimidade","Comece suave e aumente a intensidade até seu parceiro pedir para parar."),
    card("beijos","intimidade","Dê beijos pelo corpo. A última região é escolhida por ele(a)."),
    card("beijos","intimidade","Finalize com o beijo mais intenso que vocês conseguirem criar."),
    // INTIMIDADE / conexao
    card("intimidade","conexao","Diga três coisas no corpo do seu parceiro que você mais gosta."),
    card("intimidade","conexao","Conte quando você percebeu que sentia desejo pelo seu parceiro."),
    card("intimidade","conexao","Sussurre no ouvido algo que você acha extremamente atraente nele(a)."),
    card("intimidade","conexao","Diga qual parte do corpo do seu parceiro mais chama sua atenção."),
    card("intimidade","conexao","Olhem-se nos olhos por 30 segundos sem falar."),
    card("intimidade","conexao","Conte qual foi o momento mais romântico que vocês já viveram."),
    card("intimidade","conexao","Complete: 'Eu sinto mais vontade de você quando...'"),
    card("intimidade","conexao","Diga uma coisa que seu parceiro faz que desperta sua atenção."),
    card("intimidade","conexao","Conte qual foi o beijo entre vocês que você mais gostou."),
    card("intimidade","conexao","Diga uma fantasia romântica que gostaria de viver com seu parceiro."),
    // INTIMIDADE / provocacao
    card("intimidade","provocacao","Sussurre no ouvido uma fantasia que você nunca contou."),
    card("intimidade","provocacao","Diga qual situação deixa você mais atraído(a) pelo seu parceiro."),
    card("intimidade","provocacao","Descreva como seria uma noite perfeita entre vocês."),
    card("intimidade","provocacao","Escolha uma parte do corpo do seu parceiro para admirar por 30 segundos."),
    card("intimidade","provocacao","Fique bem próximo e diga três coisas que despertam seu desejo."),
    card("intimidade","provocacao","Conte uma fantasia de casal que você gostaria de experimentar."),
    card("intimidade","provocacao","Diga qual é o momento em que você sente mais química entre vocês."),
    card("intimidade","provocacao","Seu parceiro faz uma pergunta íntima e você responde sinceramente."),
    card("intimidade","provocacao","Escolha uma região do corpo para uma massagem lenta."),
    card("intimidade","provocacao","Diga exatamente o que mais desperta sua vontade de beijá-lo(a)."),
    // INTIMIDADE / intimidade
    card("intimidade","intimidade","Conte uma fantasia que você realmente gostaria de realizar."),
    card("intimidade","intimidade","Diga qual é seu maior desejo para uma noite a dois."),
    card("intimidade","intimidade","Fique frente a frente e diga o que mais deseja viver com seu parceiro."),
    card("intimidade","intimidade","Cada um revela algo novo que gostaria de experimentar juntos."),
    card("intimidade","intimidade","Descreva detalhadamente seu encontro ideal com seu parceiro."),
    card("intimidade","intimidade","Olhe nos olhos e diga qual é sua maior fantasia envolvendo vocês dois."),
    card("intimidade","intimidade","Diga algo que gostaria de experimentar na próxima noite especial."),
    card("intimidade","intimidade","Cada um escolhe uma fantasia do outro e imagina como realizá-la."),
    card("intimidade","intimidade","Diga algo que sempre teve vontade de pedir ao seu parceiro."),
    card("intimidade","intimidade","Abrace seu parceiro enquanto revela seu maior desejo para aquela noite."),
    // DESAFIOS / conexao
    card("desafios","conexao","Dê um abraço apertado no seu parceiro durante 30 segundos."),
    card("desafios","conexao","Faça seu parceiro sorrir sem usar palavras."),
    card("desafios","conexao","Dê cinco beijos no rosto do seu parceiro."),
    card("desafios","conexao","Fique olhando nos olhos do seu parceiro sem rir por 30 segundos."),
    card("desafios","conexao","Faça uma declaração romântica improvisada."),
    card("desafios","conexao","Seu parceiro fecha os olhos e você o surpreende com um carinho."),
    card("desafios","conexao","Imite a maneira como seu parceiro demonstra carinho."),
    card("desafios","conexao","Faça uma dança lenta de 30 segundos com seu parceiro."),
    card("desafios","conexao","Diga cinco coisas que você ama no seu parceiro."),
    card("desafios","conexao","Faça um elogio sincero sobre algo que admira no seu parceiro."),
    // DESAFIOS / provocacao
    card("desafios","provocacao","Fique a poucos centímetros do seu parceiro por 30 segundos sem beijá-lo."),
    card("desafios","provocacao","Sussurre uma frase provocante no ouvido do seu parceiro."),
    card("desafios","provocacao","Dê três beijos, fazendo cada um durar mais que o anterior."),
    card("desafios","provocacao","Faça uma dança sensual para seu parceiro durante uma música."),
    card("desafios","provocacao","Faça seu parceiro ficar com vergonha usando apenas elogios."),
    card("desafios","provocacao","Passe 30 segundos provocando seu parceiro apenas com olhares."),
    card("desafios","provocacao","Escolha uma região do corpo para fazer carinho durante 30 segundos."),
    card("desafios","provocacao","Dê um beijo demorado e depois fique em silêncio olhando."),
    card("desafios","provocacao","Dance bem próximo do seu parceiro até o final da música."),
    card("desafios","provocacao","Olhos fechados: você decide onde dará três beijos."),
    // DESAFIOS / intimidade
    card("desafios","intimidade","Fique frente a frente durante um minuto sem falar."),
    card("desafios","intimidade","Beije e diga no ouvido algo que deseja viver juntos."),
    card("desafios","intimidade","Dance lentamente com seu parceiro durante uma música inteira."),
    card("desafios","intimidade","Seu parceiro escolhe três carinhos que você fará em sequência."),
    card("desafios","intimidade","Escolham uma fantasia e descrevam juntos como seria vivê-la."),
    card("desafios","intimidade","Aproxime-se lentamente e espere que ele(a) tome a iniciativa do beijo."),
    card("desafios","intimidade","Durante um minuto, comuniquem-se apenas com olhares e carinhos."),
    card("desafios","intimidade","Faça uma dança sensual para seu parceiro sem desviar o olhar."),
    card("desafios","intimidade","Cada um revela algo que gostaria de experimentar naquela noite."),
    card("desafios","intimidade","Seu parceiro escolhe uma região para receber carinhos por 60 segundos."),
    // POSIÇÕES / conexao
    card("posicoes","conexao","Fiquem sentados frente a frente e mantenham as mãos dadas por um minuto."),
    card("posicoes","conexao","Deitem lado a lado e fiquem abraçados durante 30 segundos."),
    card("posicoes","conexao","Um fica atrás do outro e faz uma massagem suave nos ombros."),
    card("posicoes","conexao","Fiquem frente a frente e troquem um beijo demorado."),
    card("posicoes","conexao","Deitem lado a lado e contem uma coisa que gostam um no outro."),
    card("posicoes","conexao","Sentem-se juntos e encostem a testa por 20 segundos."),
    card("posicoes","conexao","Escolham uma posição confortável e permaneçam abraçados."),
    card("posicoes","conexao","Fiquem de pé, abraçados, equilibrando-se juntos por 30 segundos."),
    card("posicoes","conexao","Sentem-se de costas um para o outro, apoiados, por um minuto."),
    card("posicoes","conexao","Deitem e olhem nos olhos por 30 segundos sem falar."),
    // POSIÇÕES / provocacao
    card("posicoes","provocacao","Um senta no colo do outro e vocês permanecem abraçados por 30 segundos."),
    card("posicoes","provocacao","Fiquem sentados frente a frente e beijem-se lentamente."),
    card("posicoes","provocacao","Um fica atrás do outro em um abraço enquanto dá beijos no pescoço."),
    card("posicoes","provocacao","Deitem lado a lado e façam carinhos sem falar."),
    card("posicoes","provocacao","Um fica sentado enquanto o outro se aproxima lentamente para um beijo."),
    card("posicoes","provocacao","Um deita enquanto o outro fica ao lado fazendo carinho."),
    card("posicoes","provocacao","Fiquem frente a frente com os corpos encostados durante 30 segundos."),
    card("posicoes","provocacao","Um senta atrás do outro e faz uma massagem lenta nas costas."),
    card("posicoes","provocacao","Deitem frente a frente e aproximem os rostos sem se beijar por 10s."),
    card("posicoes","provocacao","Um fica atrás do outro e sussurra algo provocante no ouvido."),
    // POSIÇÕES / intimidade
    card("posicoes","intimidade","Um senta no colo do outro e vocês se beijam prolongadamente."),
    card("posicoes","intimidade","Fiquem frente a frente com contato visual durante um beijo prolongado."),
    card("posicoes","intimidade","Deitem lado a lado e alternem entre beijos e carinhos por dois minutos."),
    card("posicoes","intimidade","Um fica atrás em um abraço apertado enquanto trocam beijos no pescoço."),
    card("posicoes","intimidade","Sentem-se frente a frente e cada um conduz o ritmo dos beijos por 30s."),
    card("posicoes","intimidade","Escolham juntos a posição mais confortável e transformem em intimidade."),
    card("posicoes","intimidade","Um deita enquanto o outro se aproxima e começa uma sequência de beijos."),
    card("posicoes","intimidade","Fiquem abraçados enquanto cada um sussurra um desejo no ouvido."),
    card("posicoes","intimidade","Um fica sentado e o outro se aproxima lentamente até o beijo."),
    card("posicoes","intimidade","Deitem juntos e cada um escolhe uma forma de provocar sem falar.")
  ];

  /* ============================================================
     2. ESTADO + localStorage
     ============================================================ */
  var STORAGE_KEY = "roleta-dois-settings-v1";

  var defaultSettings = {
    categories: ["beijos","intimidade","desafios","posicoes"],
    intensity: "provocacao",
    rule: "elimina_sorteada",
    endCondition: "uma_resta",
    player1: "",
    player2: ""
  };

  var STATE = { config:"config", ready:"ready", spinning:"spinning", result:"result", finished:"finished" };
  var gameState = STATE.config;
  var settings = loadSettings();

  var game = {
    options: [], eliminated: [], history: [],
    round: 0, turn: 1, currentResult: null,
    wheelRotation: 0, progressiveCounter: 0
  };

  function loadSettings() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return mergeDefaults({});
      return mergeDefaults(JSON.parse(raw));
    } catch (e) { return mergeDefaults({}); }
  }
  function mergeDefaults(p) {
    return {
      categories: Array.isArray(p.categories) ? p.categories : defaultSettings.categories,
      intensity: p.intensity || defaultSettings.intensity,
      rule: p.rule || defaultSettings.rule,
      endCondition: p.endCondition || defaultSettings.endCondition,
      player1: p.player1 || "",
      player2: p.player2 || ""
    };
  }
  function saveSettings() { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(settings)); } catch(e){} }

  /* ============================================================
     3. UTILITÁRIOS
     ============================================================ */
  function $(s,r){ return (r||document).querySelector(s); }
  function $$(s,r){ return Array.prototype.slice.call((r||document).querySelectorAll(s)); }

  function catById(id){ return CATEGORIES.find(function(c){return c.id===id;}); }
  function intById(id){ return INTENSITIES.find(function(i){return i.id===id;}); }
  function ruleById(id){ return RULES.find(function(r){return r.id===id;}); }
  function endById(id){ return END_CONDITIONS.find(function(e){return e.id===id;}); }

  function formatLabel(v){ if(!v) return ""; var s=String(v).trim(); return s.charAt(0).toUpperCase()+s.slice(1).toLowerCase(); }

  function showToast(msg, ms) {
    ms = ms || 2400;
    var t = $("#toast"); t.textContent = msg; t.classList.add("is-show");
    clearTimeout(showToast._t);
    showToast._t = setTimeout(function(){ t.classList.remove("is-show"); }, ms);
  }

  function secureRandom(max) {
    if (window.crypto && window.crypto.getRandomValues) {
      var arr = new Uint32Array(1);
      window.crypto.getRandomValues(arr);
      return arr[0] % max;
    }
    return Math.floor(Math.random() * max);
  }

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length-1; i>0; i--) { var j=secureRandom(i+1); var t=a[i]; a[i]=a[j]; a[j]=t; }
    return a;
  }

  function escapeHtml(text) {
    var d = document.createElement("div"); d.textContent = text; return d.innerHTML;
  }

  /* ============================================================
     4. NAVEGAÇÃO
     ============================================================ */
  function goTo(name) {
    $$(".screen").forEach(function(s){ s.classList.remove("is-active"); });
    var t = $('.screen[data-screen="'+name+'"]');
    if (t) t.classList.add("is-active");
    if (name === "game") startGame();
    if (name === "finished") renderFinished();
    window.scrollTo({ top:0, behavior:"smooth" });
  }
  function openModal(n){ var m=$('.modal[data-modal="'+n+'"]'); if(m) m.classList.add("is-open"); }
  function closeModal(){ $$(".modal.is-open").forEach(function(m){ m.classList.remove("is-open"); }); }

  /* ============================================================
     5. CONFIGURAÇÃO
     ============================================================ */
  function renderSetup() {
    var intWrap = $("#intensityGrid"); intWrap.innerHTML = "";
    INTENSITIES.forEach(function(it){
      var o = document.createElement("button"); o.type="button";
      o.className = "int-opt"+(settings.intensity===it.id?" is-selected":"");
      o.innerHTML = '<span class="int-checkbox"></span><span class="int-name">'+it.name+"</span>";
      o.addEventListener("click", function(){ setIntensity(it.id); });
      intWrap.appendChild(o);
    });
    var ci = intById(settings.intensity);
    $("#intensityHint").textContent = ci ? ci.hint : "";

    var ruleWrap = $("#ruleGrid"); ruleWrap.innerHTML = "";
    RULES.forEach(function(r){
      var o = document.createElement("button"); o.type="button";
      o.className = "rule-opt"+(settings.rule===r.id?" is-selected":"");
      o.innerHTML = '<span class="rule-radio"></span><span class="rule-text"><span class="rule-title">'+r.title+'</span><span class="rule-desc">'+r.desc+"</span></span>";
      o.addEventListener("click", function(){ setRule(r.id); });
      ruleWrap.appendChild(o);
    });

    var endWrap = $("#endGrid"); endWrap.innerHTML = "";
    END_CONDITIONS.forEach(function(e){
      var o = document.createElement("button"); o.type="button";
      o.className = "end-opt"+(settings.endCondition===e.id?" is-selected":"");
      o.textContent = e.name;
      o.addEventListener("click", function(){ setEndCondition(e.id); });
      endWrap.appendChild(o);
    });

    var catWrap = $("#categoryChips"); catWrap.innerHTML = "";
    CATEGORIES.forEach(function(cat){
      var c = document.createElement("button"); c.type="button";
      c.className = "chip"+(settings.categories.indexOf(cat.id)>=0?" is-selected":"");
      c.innerHTML = '<span class="chip-icon">'+cat.icon+'</span><span class="chip-name">'+cat.name+"</span>";
      c.addEventListener("click", function(){ toggleCategory(cat.id); });
      catWrap.appendChild(c);
    });

    $("#player1Name").value = settings.player1;
    $("#player2Name").value = settings.player2;
  }

  function setIntensity(id){ settings.intensity=id; saveSettings(); renderSetup(); }
  function setRule(id){ settings.rule=id; saveSettings(); renderSetup(); }
  function setEndCondition(id){ settings.endCondition=id; saveSettings(); renderSetup(); }
  function toggleCategory(id){
    var list = settings.categories; var idx = list.indexOf(id);
    if (idx>=0) { if(list.length<=1){ showToast("Escolha ao menos uma categoria."); return; } list.splice(idx,1); }
    else { list.push(id); }
    saveSettings(); renderSetup();
  }
  function bindPlayerInputs(){
    $("#player1Name").addEventListener("input", function(e){ settings.player1=e.target.value.trim(); saveSettings(); });
    $("#player2Name").addEventListener("input", function(e){ settings.player2=e.target.value.trim(); saveSettings(); });
  }

  /* ============================================================
     6. OPÇÕES DA ROLETA
     ============================================================ */
  function buildOptions() {
    var cats = settings.categories;
    var intId = settings.intensity;
    var intOrder = ["conexao","provocacao","intimidade"];
    var maxIdx = intOrder.indexOf(intId);
    if (maxIdx < 0) maxIdx = 1;
    var allowedInts = intOrder.slice(0, maxIdx+1);

    var filtered = CARDS.filter(function(c){
      return cats.indexOf(c.cat)>=0 && allowedInts.indexOf(c.int)>=0;
    });

    var shuffled = shuffle(filtered);
    if (shuffled.length > 12) shuffled = shuffled.slice(0, 12);
    while (shuffled.length < 3 && filtered.length > 0) {
      shuffled = shuffled.concat(shuffle(filtered).slice(0, 3 - shuffled.length));
    }
    if (shuffled.length > 12) shuffled = shuffled.slice(0, 12);

    return shuffled.map(function(c, i){
      var cat = catById(c.cat);
      return {
        id: "opt_"+i,
        label: (cat ? cat.name : "Desafio") + " " + (i+1),
        cat: c.cat, int: c.int, text: c.text, eliminated: false
      };
    });
  }

  /* ============================================================
     7. ESTADO DA PARTIDA
     ============================================================ */
  function startGame() {
    game.options = buildOptions();
    if (game.options.length === 0) { showToast("Nenhuma opção para essas escolhas."); goTo("setup"); return; }
    game.eliminated = []; game.history = []; game.round = 0; game.turn = 1;
    game.currentResult = null; game.wheelRotation = 0; game.progressiveCounter = 0;
    gameState = STATE.ready;
    renderWheel(); updateHUD(); updateTurn(); updateInfo(); updateHistory();
    setSpinEnabled(true); setSpinLabel("Girar Roleta");
  }

  function activeOptions() { return game.options.filter(function(o){ return !o.eliminated; }); }

  function getEndThreshold() {
    switch(settings.endCondition) {
      case "uma_resta": return 1;
      case "tres_restam": return 3;
      default: return null;
    }
  }
  function isGameEnded() {
    var active = activeOptions();
    var th = getEndThreshold();
    if (th !== null) return active.length <= th;
    return game.round >= 10;
  }

  /* ============================================================
     8. ROLETA — Geometria e Render
     ============================================================ */
  function renderWheel() {
    var active = activeOptions();
    var svg = $("#wheelSvg");
    var n = active.length;
    if (n === 0) { svg.innerHTML = ""; return; }

    var segAngle = 360 / n;
    var radius = 95;
    var html = "";

    for (var i = 0; i < n; i++) {
      var a1 = i * segAngle - 90;
      var a2 = (i+1) * segAngle - 90;
      var x1 = Math.cos(a1*Math.PI/180)*radius;
      var y1 = Math.sin(a1*Math.PI/180)*radius;
      var x2 = Math.cos(a2*Math.PI/180)*radius;
      var y2 = Math.sin(a2*Math.PI/180)*radius;
      var largeArc = segAngle > 180 ? 1 : 0;
      var fill = SEG_COLORS[i % SEG_COLORS.length];
      var pathData = "M 0 0 L "+x1.toFixed(2)+" "+y1.toFixed(2)+" A "+radius+" "+radius+" 0 "+largeArc+" 1 "+x2.toFixed(2)+" "+y2.toFixed(2)+" Z";
      html += '<path d="'+pathData+'" fill="'+fill+'" stroke="rgba(0,229,255,0.12)" stroke-width="0.5" data-seg="'+i+'" />';
      var mid = (a1+a2)/2;
      var lr = radius*0.62;
      var lx = Math.cos(mid*Math.PI/180)*lr;
      var ly = Math.sin(mid*Math.PI/180)*lr;
      var rot = mid + 90;
      html += '<text x="'+lx.toFixed(2)+'" y="'+ly.toFixed(2)+'" fill="rgba(232,240,255,0.85)" font-size="6" font-weight="600" text-anchor="middle" dominant-baseline="middle" transform="rotate('+rot.toFixed(2)+' '+lx.toFixed(2)+' '+ly.toFixed(2)+')" data-label="'+i+'">'+escapeHtml(active[i].label)+'</text>';
    }
    html += '<circle cx="0" cy="0" r="'+radius+'" fill="none" stroke="rgba(0,229,255,0.15)" stroke-width="1" />';
    svg.innerHTML = html;

    var ring = $("#wheelRing");
    ring.style.transform = "rotate("+game.wheelRotation+"deg)";
    var hub = $("#wheelHub");
    hub.style.transform = "translate(-50%,-50%) rotate("+game.wheelRotation+"deg)";
  }

  /* ============================================================
     9. GIRO
     ============================================================ */
  function spin() {
    if (gameState !== STATE.ready) return;
    var active = activeOptions();
    if (active.length === 0) return;

    gameState = STATE.spinning;
    setSpinEnabled(false);
    setSpinLabel("Girando...");

    var winnerIdx = secureRandom(active.length);
    var winner = active[winnerIdx];
    game.currentResult = winner;

    var n = active.length;
    var segAngle = 360 / n;
    // Segment i center in SVG = i*segAngle - 90 + segAngle/2
    // To bring center to 0 (top/pointer): rotation = -center
    var segCenter = winnerIdx * segAngle - 90 + segAngle / 2;
    var targetAngle = -segCenter;

    var extraTurns = 4 + secureRandom(3);
    var finalRotation = game.wheelRotation - (game.wheelRotation % 360) + extraTurns * 360 + targetAngle;
    if (finalRotation - game.wheelRotation < 360 * 3) finalRotation += 360 * 2;

    var ring = $("#wheelRing");
    var hub = $("#wheelHub");
    var duration = 4.0;
    ring.style.transition = "transform "+duration+"s cubic-bezier(0.17,0.67,0.12,0.99)";
    hub.style.transition = "transform "+duration+"s cubic-bezier(0.17,0.67,0.12,0.99)";
    void ring.offsetWidth;
    ring.style.transform = "rotate("+finalRotation+"deg)";
    hub.style.transform = "translate(-50%,-50%) rotate("+finalRotation+"deg)";
    game.wheelRotation = finalRotation;

    setTimeout(function(){ showResult(winner); }, duration * 1000 + 200);
  }

  /* ============================================================
     10. RESULTADO
     ============================================================ */
  function showResult(winner) {
    gameState = STATE.result;
    game.round++;

    var overlay = $("#resultOverlay");
    overlay.classList.add("is-open");
    overlay.setAttribute("aria-hidden","false");

    $("#resultSuspense").style.display = "flex";
    $("#resultContent").style.display = "none";

    setTimeout(function(){
      $("#resultSuspense").style.display = "none";
      $("#resultContent").style.display = "flex";

      var cat = catById(winner.cat);
      var intL = intById(winner.int);
      $("#resultCat").textContent = cat ? cat.name : formatLabel(winner.cat);
      $("#resultInt").textContent = intL ? intL.name : formatLabel(winner.int);
      $("#resultName").textContent = winner.label;
      $("#resultDesc").textContent = winner.text;
    }, 1200);

    highlightSegment(winner);
  }

  function highlightSegment(winner) {
    var active = activeOptions();
    var idx = active.indexOf(winner);
    if (idx < 0) return;
    var texts = $$("#wheelSvg text[data-label]");
    var paths = $$("#wheelSvg path[data-seg]");
    if (texts[idx]) { texts[idx].setAttribute("fill","#00e5ff"); texts[idx].style.filter="drop-shadow(0 0 4px rgba(0,229,255,0.8))"; }
    if (paths[idx]) { paths[idx].setAttribute("fill","#1a3060"); paths[idx].style.filter="brightness(1.5)"; }
  }

  function clearHighlight() { renderWheel(); }

  /* ============================================================
     11. ELIMINAÇÃO
     ============================================================ */
  function actionEliminate() {
    if (gameState !== STATE.result) return;
    closeResultOverlay();
    var winner = game.currentResult;
    if (!winner) return;

    switch (settings.rule) {
      case "elimina_sorteada":
        eliminateOption(winner);
        break;
      case "elimina_proxima":
        eliminateOption(winner);
        var a1 = activeOptions();
        if (a1.length > 0) { eliminateOption(a1[secureRandom(a1.length)]); }
        break;
      case "progressiva":
        eliminateOption(winner);
        game.progressiveCounter++;
        if (game.progressiveCounter >= 3) {
          var a2 = activeOptions();
          if (a2.length > 0) { eliminateOption(a2[secureRandom(a2.length)]); }
          game.progressiveCounter = 0;
        }
        break;
    }

    game.history.push({ round: game.round, player: game.turn===1?(settings.player1||"Jogador 1"):(settings.player2||"Jogador 2"), label: winner.label, eliminated: true });
    nextTurn();

    if (isGameEnded()) {
      gameState = STATE.finished;
      setTimeout(function(){ goTo("finished"); }, 400);
      return;
    }
    setTimeout(function(){
      clearHighlight(); renderWheel(); updateHUD(); updateHistory();
      gameState = STATE.ready; setSpinEnabled(true); setSpinLabel("Girar Roleta");
    }, 600);
  }

  function actionSkip() {
    if (gameState !== STATE.result) return;
    closeResultOverlay();
    var winner = game.currentResult;
    if (!winner) return;

    game.history.push({ round: game.round, player: game.turn===1?(settings.player1||"Jogador 1"):(settings.player2||"Jogador 2"), label: winner.label, eliminated: false });
    nextTurn();

    if (isGameEnded()) {
      gameState = STATE.finished;
      setTimeout(function(){ goTo("finished"); }, 400);
      return;
    }
    setTimeout(function(){
      clearHighlight(); renderWheel(); updateHUD(); updateHistory();
      gameState = STATE.ready; setSpinEnabled(true); setSpinLabel("Girar Roleta");
    }, 400);
  }

  function eliminateOption(opt) {
    var idx = game.options.indexOf(opt);
    if (idx >= 0) { game.options[idx].eliminated = true; game.eliminated.push(opt); }
  }
  function closeResultOverlay() { var o=$("#resultOverlay"); o.classList.remove("is-open"); o.setAttribute("aria-hidden","true"); }
  function nextTurn() { game.turn = game.turn===1?2:1; updateTurn(); }

  /* ============================================================
     12. UI UPDATES
     ============================================================ */
  function updateHUD() { $("#roundCount").textContent = game.round; $("#remainingCount").textContent = activeOptions().length; }
  function updateTurn() {
    var p1 = game.turn===1;
    var name = p1 ? (settings.player1||"Jogador 1") : (settings.player2||"Jogador 2");
    var el = $("#turnName"); var av = $("#turnAvatar");
    el.textContent = name; el.classList.toggle("p1",p1); el.classList.toggle("p2",!p1);
    av.classList.toggle("p1",p1); av.classList.toggle("p2",!p1);
  }
  function updateInfo() {
    var i = intById(settings.intensity), r = ruleById(settings.rule), e = endById(settings.endCondition);
    $("#infoModeVal").textContent = i ? i.name : "—";
    $("#infoRuleVal").textContent = r ? r.title : "—";
    $("#infoEndVal").textContent = e ? e.name : "—";
  }
  function updateHistory() {
    var list = $("#historyList");
    if (game.history.length === 0) { list.innerHTML = '<span class="history-empty">Nenhum giro ainda.</span>'; return; }
    var html = "";
    game.history.slice(-6).reverse().forEach(function(h){
      var cls = h.eliminated ? "is-eliminated" : "is-skipped";
      html += '<span class="history-item '+cls+'"><span class="h-dot"></span>'+escapeHtml(h.label)+'</span>';
    });
    list.innerHTML = html;
  }
  function setSpinEnabled(en) { $("#spinBtn").disabled = !en; }
  function setSpinLabel(t) { $("#spinLabel").textContent = t; }

  /* ============================================================
     13. TELA FINAL
     ============================================================ */
  function renderFinished() {
    var active = activeOptions();
    $("#finishedTitle").textContent = "Fim de Jogo";
    $("#finishedSubtitle").textContent = "Vocês completaram "+game.round+" rodadas juntos.";
    var skipped = game.history.filter(function(h){ return !h.eliminated; }).length;
    var html = "";
    html += '<div class="stat-row"><span class="stat-label">Rodadas</span><span class="stat-value">'+game.round+'</span></div>';
    html += '<div class="stat-row"><span class="stat-label">Opções restantes</span><span class="stat-value">'+active.length+'</span></div>';
    html += '<div class="stat-row"><span class="stat-label">Eliminadas</span><span class="stat-value">'+game.eliminated.length+'</span></div>';
    html += '<div class="stat-row"><span class="stat-label">Puladas</span><span class="stat-value">'+skipped+'</span></div>';
    $("#finishedStats").innerHTML = html;
  }

  /* ============================================================
     14. PARTÍCULAS
     ============================================================ */
  var canvas = $("#particles");
  var ctx = canvas.getContext("2d");
  var particles = [];
  var dpr = Math.min(window.devicePixelRatio||1, 2);

  function resizeCanvas() {
    dpr = Math.min(window.devicePixelRatio||1, 2);
    canvas.width = window.innerWidth*dpr; canvas.height = window.innerHeight*dpr;
    canvas.style.width = window.innerWidth+"px"; canvas.style.height = window.innerHeight+"px";
    ctx.setTransform(dpr,0,0,dpr,0,0);
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  function tickParticles() {
    ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
    for (var i = particles.length-1; i>=0; i--) {
      var p = particles[i];
      p.x+=p.vx; p.y+=p.vy; p.vy+=0.08; p.vx*=0.99; p.life-=p.decay; p.rot+=p.vr;
      if (p.life<=0) { particles.splice(i,1); continue; }
      ctx.save(); ctx.globalAlpha=Math.max(0,p.life);
      ctx.translate(p.x,p.y); ctx.rotate(p.rot);
      ctx.fillStyle=p.color;
      ctx.fillRect(-p.size/2,-p.size/2,p.size,p.size*1.4);
      ctx.restore();
    }
    requestAnimationFrame(tickParticles);
  }
  tickParticles();

  /* ============================================================
     15. EVENTOS
     ============================================================ */
  function bindEvents() {
    $$("[data-goto]").forEach(function(b){ b.addEventListener("click", function(){ goTo(b.dataset.goto); }); });
    $$("[data-open-modal]").forEach(function(b){ b.addEventListener("click", function(){ openModal(b.dataset.openModal); }); });
    $$("[data-close-modal]").forEach(function(b){ b.addEventListener("click", closeModal); });
    $("#spinBtn").addEventListener("click", spin);
    $("#restartBtn").addEventListener("click", function(){ if(gameState===STATE.spinning) return; startGame(); showToast("Jogo reiniciado."); });
    $("#eliminateBtn").addEventListener("click", actionEliminate);
    $("#skipBtn").addEventListener("click", actionSkip);
    $("#playAgainBtn").addEventListener("click", function(){ goTo("game"); });
    document.addEventListener("keydown", function(e){ if(e.key==="Escape") closeModal(); });
  }

  /* ============================================================
     16. INIT
     ============================================================ */
  function init() {
    renderSetup(); bindPlayerInputs(); bindEvents();
    $$(".screen").forEach(function(s){ s.classList.remove("is-active"); });
    $(".screen--home").classList.add("is-active");
  }
  document.addEventListener("DOMContentLoaded", init);
})();
