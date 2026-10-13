/* ============================================================
   Entre Nós — Lógica do jogo
   JavaScript puro. Sem frameworks.
   Estrutura de dados em arrays/objetos para fácil edição.
   ============================================================ */

(function () {
  "use strict";

  /* ============================================================
     1. DADOS — Categorias, intensidades, cartas e posições
     Para adicionar conteúdo, basta inserir novos itens nos
     arrays abaixo. Cada carta: { cat, int, icon, text }.
     ============================================================ */


const CATEGORIES = [
  {
    id: "beijos",
    name: "Beijos",
    icon: `
      <svg xmlns="http://www.w3.org/2000/svg"
           width="24"
           height="24"
           viewBox="0 0 24 24"
           fill="none"
           stroke="currentColor"
           stroke-width="2"
           stroke-linecap="round"
           stroke-linejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    `
  },

  {
    id: "intimidade",
    name: "Intimidade",
    icon: `
      <svg xmlns="http://www.w3.org/2000/svg"
           width="24"
           height="24"
           viewBox="0 0 24 24"
           fill="none"
           stroke="currentColor"
           stroke-width="2"
           stroke-linecap="round"
           stroke-linejoin="round">
        <path d="M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4"/>
      </svg>
    `
  },

  {
    id: "desafios",
    name: "Desafios",
    icon: `
      <svg xmlns="http://www.w3.org/2000/svg"
           width="24"
           height="24"
           viewBox="0 0 24 24"
           fill="none"
           stroke="currentColor"
           stroke-width="2"
           stroke-linecap="round"
           stroke-linejoin="round">
        <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/>
      </svg>
    `
  },

  {
    id: "posicoes",
    name: "Posições",
    icon: `
      <svg xmlns="http://www.w3.org/2000/svg"
           width="24"
           height="24"
           viewBox="0 0 24 24"
           fill="none"
           stroke="currentColor"
           stroke-width="2"
           stroke-linecap="round"
           stroke-linejoin="round">
        <path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8"/>
        <path d="M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4"/>
        <path d="M12 4v6"/>
        <path d="M2 18h20"/>
      </svg>
    `
  }
];

  


  const INTENSITIES = [
    {
      id: "leve",
      name: "Leve"
    },
  
    {
      id: "picante",
      name: "Picante"
    },
  
    {
      id: "intenso",
      name: "Intenso"
    }
  ];

  // Helper para criar cartas
  const card = (cat, int, icon, text) => ({ cat, int, icon, text });

  function formatLabel(value) {
    if (value === null || value === undefined) return "";
    const str = String(value).trim();
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  const CARDS = [
  // =========================================================
  // BEIJOS — 40 CARTAS
  // =========================================================

  // ---- BEIJOS / Leve ----

  card("beijos", "leve", "beijos", "Beije lentamente a boca do seu parceiro durante 20 segundos."),
  card("beijos", "leve", "beijos", "Dê um beijo demorado no pescoço do seu parceiro."),
  card("beijos", "leve", "beijos", "Beije o rosto inteiro do seu parceiro, terminando na boca."),
  card("beijos", "leve", "beijos", "Dê três beijos lentos em lugares escolhidos pelo seu parceiro."),
  card("beijos", "leve", "beijos", "Beije seu parceiro sem usar as mãos."),
  card("beijos", "leve", "beijos", "Dê um beijo surpresa no seu parceiro quando ele menos esperar."),
  card("beijos", "leve", "beijos", "Beije lentamente o pescoço e depois volte para a boca."),
  card("beijos", "leve", "beijos", "Dê um beijo na testa, um no pescoço e um na boca."),
  card("beijos", "leve", "beijos", "Beije seu parceiro enquanto mantém uma das mãos no rosto dele(a)."),
  card("beijos", "leve", "beijos", "Escolha uma parte do corpo do seu parceiro e cubra-a de beijos."),

  // ---- BEIJOS / Picante ----

  card("beijos", "picante", "beijos", "Beije seu parceiro lentamente enquanto aproxima cada vez mais o corpo."),
  card("beijos", "picante", "beijos", "Beije o pescoço do seu parceiro e termine com uma mordida suave."),
  card("beijos", "picante", "beijos", "Beijem-se por um minuto sem interromper o contato corporal."),
  card("beijos", "picante", "beijos", "Comece com um beijo delicado e aumente a intensidade aos poucos."),
  card("beijos", "picante", "beijos", "Beije seu parceiro enquanto passa lentamente as mãos pelo corpo dele(a)."),
  card("beijos", "picante", "beijos", "Dê beijos pelo peito do seu parceiro e deixe que ele(a) escolha onde você deve parar."),
  card("beijos", "picante", "beijos", "Beije seu parceiro no pescoço enquanto sussurra algo provocante."),
  card("beijos", "picante", "beijos", "Beije lentamente uma região do corpo que normalmente você não beija."),
  card("beijos", "picante", "beijos", "Seu parceiro fecha os olhos enquanto você decide onde dará cinco beijos."),
  card("beijos", "picante", "beijos", "Aproxime-se para beijar, pare por alguns segundos e provoque seu parceiro antes de continuar."),
  card("beijos", "picante", "beijos", "Beije seu parceiro enquanto ele(a) permanece de olhos fechados."),
  card("beijos", "picante", "beijos", "Dê uma sequência de beijos que começa no pescoço e termina onde seu parceiro escolher."),
  card("beijos", "picante", "beijos", "Beije seu parceiro lentamente enquanto mantém seu corpo encostado no dele(a)."),
  card("beijos", "picante", "beijos", "Dê um beijo intenso e depois fique olhando para seu parceiro sem dizer nada."),

  // ---- BEIJOS / Intenso ----

  card("beijos", "intenso", "beijos", "Beije seu parceiro por dois minutos, alternando entre beijos suaves e intensos."),
  card("beijos", "intenso", "beijos", "Cubra o corpo do seu parceiro com beijos e deixe que ele(a) escolha quando você deve parar."),
  card("beijos", "intenso", "beijos", "Beije lentamente o peito do seu parceiro enquanto mantém contato visual."),
  card("beijos", "intenso", "beijos", "Beije seu parceiro enquanto suas mãos exploram lentamente o corpo dele(a)."),
  card("beijos", "intenso", "beijos", "Dê beijos demorados pelo pescoço e peito do seu parceiro."),
  card("beijos", "intenso", "beijos", "Seu parceiro fecha os olhos. Você deve escolher uma sequência de beijos para deixá-lo(a) arrepiado(a)."),
  card("beijos", "intenso", "beijos", "Beije seu parceiro lentamente enquanto sussurra o que mais deseja fazer naquela noite."),
  card("beijos", "intenso", "beijos", "Comece beijando suavemente e aumente a intensidade até seu parceiro pedir para parar."),
  card("beijos", "intenso", "beijos", "Dê beijos pelo corpo do seu parceiro e deixe a última região ser escolhida por ele(a)."),
  card("beijos", "intenso", "beijos", "Finalize esta rodada com o beijo mais intenso que vocês conseguirem criar."),


  // =========================================================
  // INTIMIDADE — 40 CARTAS
  // =========================================================

  // ---- INTIMIDADE / Leve ----

  card("intimidade", "leve", "intimidade", "Diga três coisas no corpo do seu parceiro que você mais gosta."),
  card("intimidade", "leve", "intimidade", "Conte quando você percebeu que sentia desejo pelo seu parceiro."),
  card("intimidade", "leve", "intimidade", "Sussurre no ouvido do seu parceiro algo que você acha extremamente atraente nele(a)."),
  card("intimidade", "leve", "intimidade", "Diga qual parte do corpo do seu parceiro mais chama sua atenção."),
  card("intimidade", "leve", "intimidade", "Olhem-se nos olhos por 30 segundos sem falar."),
  card("intimidade", "leve", "intimidade", "Conte qual foi o momento mais romântico que vocês já viveram."),
  card("intimidade", "leve", "intimidade", "Complete: 'Eu sinto mais vontade de você quando...'"),
  card("intimidade", "leve", "intimidade", "Diga uma coisa que seu parceiro faz e que imediatamente desperta sua atenção."),
  card("intimidade", "leve", "intimidade", "Conte qual foi o beijo entre vocês que você mais gostou."),
  card("intimidade", "leve", "intimidade", "Diga uma fantasia romântica que gostaria de viver com seu parceiro."),
  card("intimidade", "leve", "intimidade", "Diga qual roupa do seu parceiro você considera mais atraente."),
  card("intimidade", "leve", "intimidade", "Conte qual situação faz você se sentir mais desejado(a)."),
  card("intimidade", "leve", "intimidade", "Diga algo que gostaria que seu parceiro fizesse mais vezes."),
  card("intimidade", "leve", "intimidade", "Sussurre no ouvido do seu parceiro uma frase que faça ele(a) sorrir."),

  // ---- INTIMIDADE / Picante ----

  card("intimidade", "picante", "intimidade", "Sussurre no ouvido do seu parceiro uma fantasia que você nunca contou."),
  card("intimidade", "picante", "intimidade", "Diga qual situação deixa você mais atraído(a) pelo seu parceiro."),
  card("intimidade", "picante", "intimidade", "Descreva como seria uma noite perfeita entre vocês."),
  card("intimidade", "picante", "intimidade", "Escolha uma parte do corpo do seu parceiro para admirar durante 30 segundos."),
  card("intimidade", "picante", "intimidade", "Fique bem próximo do seu parceiro e diga três coisas que despertam seu desejo."),
  card("intimidade", "picante", "intimidade", "Conte uma fantasia de casal que você gostaria de experimentar."),
  card("intimidade", "picante", "intimidade", "Diga qual é o momento em que você sente mais química entre vocês."),
  card("intimidade", "picante", "intimidade", "Seu parceiro pode fazer uma pergunta íntima e você deve responder sinceramente."),
  card("intimidade", "picante", "intimidade", "Escolha uma região do corpo do seu parceiro para fazer uma massagem lenta."),
  card("intimidade", "picante", "intimidade", "Diga ao seu parceiro exatamente o que mais desperta sua vontade de beijá-lo(a)."),
  card("intimidade", "picante", "intimidade", "Fique frente a frente com seu parceiro e descreva o que mais gosta quando vocês estão sozinhos."),
  card("intimidade", "picante", "intimidade", "Diga uma coisa que você gostaria de experimentar em uma noite especial."),
  card("intimidade", "picante", "intimidade", "Passe as mãos lentamente pelos braços, costas e peito do seu parceiro."),
  card("intimidade", "picante", "intimidade", "Diga no ouvido do seu parceiro uma frase que normalmente teria vergonha de falar."),

  // ---- INTIMIDADE / Intenso ----

  card("intimidade", "intenso", "intimidade", "Conte ao seu parceiro uma fantasia que você realmente gostaria de realizar."),
  card("intimidade", "intenso", "intimidade", "Diga qual é seu maior desejo para uma noite a dois."),
  card("intimidade", "intenso", "intimidade", "Fique frente a frente e diga exatamente o que mais deseja viver com seu parceiro."),
  card("intimidade", "intenso", "intimidade", "Cada um deve revelar algo novo que gostaria de experimentar juntos."),
  card("intimidade", "intenso", "intimidade", "Descreva detalhadamente seu encontro ideal com seu parceiro."),
  card("intimidade", "intenso", "intimidade", "Olhe nos olhos do seu parceiro e diga qual é sua maior fantasia envolvendo vocês dois."),
  card("intimidade", "intenso", "intimidade", "Diga uma coisa que seu parceiro faz que consegue deixar você completamente sem graça."),
  card("intimidade", "intenso", "intimidade", "Cada um deve escolher uma fantasia do outro e imaginar como seria realizá-la."),
  card("intimidade", "intenso", "intimidade", "Diga algo que você sempre teve vontade de pedir ao seu parceiro."),
  card("intimidade", "intenso", "intimidade", "Fique abraçado ao seu parceiro enquanto cada um revela seu maior desejo para aquela noite."),


  // =========================================================
  // DESAFIOS — 40 CARTAS
  // =========================================================

  // ---- DESAFIOS / Leve ----

  card("desafios", "leve", "desafios", "Dê um abraço apertado no seu parceiro durante 30 segundos."),
  card("desafios", "leve", "desafios", "Faça seu parceiro sorrir sem usar palavras."),
  card("desafios", "leve", "desafios", "Dê cinco beijos no rosto do seu parceiro."),
  card("desafios", "leve", "desafios", "Fique olhando nos olhos do seu parceiro sem rir por 30 segundos."),
  card("desafios", "leve", "desafios", "Faça uma declaração romântica improvisada."),
  card("desafios", "leve", "desafios", "Seu parceiro fecha os olhos e você deve surpreendê-lo com um carinho."),
  card("desafios", "leve", "desafios", "Dê um beijo surpresa no seu parceiro durante a próxima rodada."),
  card("desafios", "leve", "desafios", "Imite a maneira como seu parceiro demonstra carinho."),
  card("desafios", "leve", "desafios", "Faça uma dança lenta de 30 segundos com seu parceiro."),
  card("desafios", "leve", "desafios", "Diga cinco coisas que você ama no seu parceiro."),

  // ---- DESAFIOS / Picante ----

  card("desafios", "picante", "desafios", "Fique a poucos centímetros do seu parceiro por 30 segundos sem beijá-lo."),
  card("desafios", "picante", "desafios", "Sussurre uma frase provocante no ouvido do seu parceiro."),
  card("desafios", "picante", "desafios", "Dê três beijos, fazendo cada um durar mais que o anterior."),
  card("desafios", "picante", "desafios", "Faça uma dança sensual para seu parceiro durante uma música."),
  card("desafios", "picante", "desafios", "Faça seu parceiro ficar com vergonha usando apenas elogios."),
  card("desafios", "picante", "desafios", "Passe 30 segundos provocando seu parceiro apenas com olhares."),
  card("desafios", "picante", "desafios", "Escolha uma região do corpo do seu parceiro para fazer carinho durante 30 segundos."),
  card("desafios", "picante", "desafios", "Dê um beijo demorado e depois fique em silêncio olhando para seu parceiro."),
  card("desafios", "picante", "desafios", "Dance bem próximo do seu parceiro até o final da música."),
  card("desafios", "picante", "desafios", "Seu parceiro fecha os olhos enquanto você decide onde dará três beijos."),
  card("desafios", "picante", "desafios", "Diga uma frase provocante sem mencionar nenhuma parte do corpo."),
  card("desafios", "picante", "desafios", "Fique frente a frente com seu parceiro e tente fazê-lo desviar o olhar."),
  card("desafios", "picante", "desafios", "Faça uma massagem lenta no seu parceiro durante um minuto."),
  card("desafios", "picante", "desafios", "Escolha uma música e dance lentamente para seu parceiro."),

  // ---- DESAFIOS / Intenso ----

  card("desafios", "intenso", "desafios", "Fique frente a frente com seu parceiro durante um minuto sem falar."),
  card("desafios", "intenso", "desafios", "Beije seu parceiro e depois diga no ouvido dele(a) algo que deseja viver juntos."),
  card("desafios", "intenso", "desafios", "Dance lentamente com seu parceiro durante uma música inteira."),
  card("desafios", "intenso", "desafios", "Seu parceiro escolhe três tipos de carinho que você deverá fazer em sequência."),
  card("desafios", "intenso", "desafios", "Escolham uma fantasia de casal e descrevam juntos como seria vivê-la."),
  card("desafios", "intenso", "desafios", "Aproxime-se lentamente do seu parceiro e espere que ele(a) tome a iniciativa do beijo."),
  card("desafios", "intenso", "desafios", "Durante um minuto, comuniquem-se apenas através de olhares e carinhos."),
  card("desafios", "intenso", "desafios", "Faça uma dança sensual para seu parceiro sem desviar o olhar."),
  card("desafios", "intenso", "desafios", "Cada um deve revelar algo que gostaria de experimentar naquela noite."),
  card("desafios", "intenso", "desafios", "Seu parceiro escolhe uma região do corpo para receber uma sequência de carinhos."),
  card("desafios", "intenso", "desafios", "Beije seu parceiro lentamente enquanto ele(a) permanece de olhos fechados."),
  card("desafios", "intenso", "desafios", "Deixe seu parceiro escolher como você deve provocá-lo durante 60 segundos."),


  // =========================================================
  // POSIÇÕES — 40 CARTAS
  // =========================================================

  // ---- POSIÇÕES / Leve ----

  card("posicoes", "leve", "posições", "Fiquem sentados frente a frente e mantenham as mãos dadas durante um minuto."),
  card("posicoes", "leve", "posições", "Deitem lado a lado e fiquem abraçados durante 30 segundos."),
  card("posicoes", "leve", "posições", "Um fica atrás do outro e faz uma massagem suave nos ombros."),
  card("posicoes", "leve", "posições", "Fiquem frente a frente e troquem um beijo demorado."),
  card("posicoes", "leve", "posições", "Deitem lado a lado e contem uma coisa que gostam um no outro."),
  card("posicoes", "leve", "posições", "Um fica sentado enquanto o outro fica de pé à sua frente. Troquem três elogios."),
  card("posicoes", "leve", "posições", "Fiquem abraçados enquanto um faz carinho no cabelo do outro."),
  card("posicoes", "leve", "posições", "Sentem-se juntos e encostem a testa por 20 segundos."),
  card("posicoes", "leve", "posições", "Deitem lado a lado e façam uma sequência de três beijos."),
  card("posicoes", "leve", "posições", "Escolham uma posição confortável e permaneçam abraçados durante uma música."),

  // ---- POSIÇÕES / Picante ----

  card("posicoes", "picante", "posições", "Um senta no colo do outro e vocês permanecem abraçados por 30 segundos."),
  card("posicoes", "picante", "posições", "Fiquem sentados frente a frente e beijem-se lentamente."),
  card("posicoes", "picante", "posições", "Um fica atrás do outro em um abraço enquanto dá beijos no pescoço."),
  card("posicoes", "picante", "posições", "Deitem lado a lado e façam carinhos sem falar."),
  card("posicoes", "picante", "posições", "Um fica sentado enquanto o outro se aproxima lentamente para um beijo."),
  card("posicoes", "picante", "posições", "Um deita enquanto o outro fica ao lado fazendo carinho."),
  card("posicoes", "picante", "posições", "Fiquem frente a frente e mantenham seus corpos encostados durante 30 segundos."),
  card("posicoes", "picante", "posições", "Um senta atrás do outro e faz uma massagem lenta nas costas."),
  card("posicoes", "picante", "posições", "Deitem frente a frente e aproximem os rostos sem se beijar por dez segundos."),
  card("posicoes", "picante", "posições", "Um fica atrás do outro e sussurra algo provocante no ouvido."),
  card("posicoes", "picante", "posições", "Escolham uma posição confortável e tentem deixar o outro arrepiado apenas com carinhos."),
  card("posicoes", "picante", "posições", "Um senta no colo do outro enquanto vocês trocam beijos lentamente."),
  card("posicoes", "picante", "posições", "Fiquem deitados juntos e deixem que cada um escolha onde o outro receberá carinho."),
  card("posicoes", "picante", "posições", "Um fica sentado e o outro se aproxima lentamente, mantendo contato visual."),

  // ---- POSIÇÕES / Intenso ----

  card("posicoes", "intenso", "posições", "Um senta no colo do outro e vocês permanecem abraçados enquanto se beijam."),
  card("posicoes", "intenso", "posições", "Fiquem frente a frente e mantenham contato visual durante um beijo prolongado."),
  card("posicoes", "intenso", "posições", "Deitem lado a lado e alternem entre beijos e carinhos durante dois minutos."),
  card("posicoes", "intenso", "posições", "Um fica atrás do outro em um abraço apertado enquanto trocam beijos no pescoço."),
  card("posicoes", "intenso", "posições", "Um senta enquanto o outro se aproxima lentamente até os dois ficarem bem próximos."),
  card("posicoes", "intenso", "posições", "Escolham uma posição confortável e passem um minuto explorando diferentes formas de carinho."),
  card("posicoes", "intenso", "posições", "Fiquem abraçados enquanto cada um sussurra no ouvido do outro um desejo."),
  card("posicoes", "intenso", "posições", "Um deita enquanto o outro se aproxima lentamente e começa uma sequência de beijos."),
  card("posicoes", "intenso", "posições", "Sentem-se frente a frente e cada um conduz o ritmo dos beijos durante 30 segundos."),
  card("posicoes", "intenso", "posições", "Escolham juntos a posição mais confortável e transformem a rodada em um momento de intimidade."),
  card("posicoes", "intenso", "posições", "Um fica sentado e o outro se aproxima lentamente, mantendo o contato visual até o beijo."),
  card("posicoes", "intenso", "posições", "Deitem juntos e cada um deve escolher uma forma diferente de provocar o outro sem falar.")
];

  // ---- Posições de casal (descrição textual, sem nudez) ----
  // Cada: { name, desc, difficulty (1-3), intimacy (1-3), shape (id da silhueta) }
  const POSITIONS = [
    { name: "Conchinha", desc: "Deitados de lado, um atrás do outro, encaixados como colheres. Permite penetração vaginal ou anal com intimidade e aconchego.", difficulty: 1, intimacy: 3, shape: "spoon", positionImage: "" },
    { name: "Olhos nos Olhos", desc: "Um de frente para o outro, deitados de lado. Permite beijos profundos, carícias e conexão visual durante a penetração.", difficulty: 1, intimacy: 3, shape: "face", positionImage: "" },
    { name: "Missão Serena", desc: "Um por cima do outro, frente a frente. Clássica, permite penetração profunda, beijos e contato total dos corpos.", difficulty: 2, intimacy: 3, shape: "missionary", positionImage: "" },
    { name: "Cavaleira", desc: "Um sentado, o outro no colo de frente. Quem está por cima controla o ritmo e a profundidade da penetração.", difficulty: 2, intimacy: 3, shape: "lap", positionImage: "" },
    { name: "Encontro Sentado", desc: "Sentados frente a frente, pernas entrelaçadas. Ritmo lento, penetração profunda e muito contato visual.", difficulty: 2, intimacy: 3, shape: "seated", positionImage: "" },
    { name: "Costas com Carinho", desc: "Um de quatro, o outro por trás. Permite penetração vaginal ou anal com controle total do ritmo.", difficulty: 2, intimacy: 2, shape: "back", positionImage: "" },
    { name: "Equilíbrio Profundo", desc: "Um deitado na borda da cama, o outro em pé. Profundidade máxima na penetração, com apoio e intensidade.", difficulty: 3, intimacy: 2, shape: "edge", positionImage: "" },
    { name: "Abraço em Pé", desc: "Em pé, um sustenta o outro contra a parede. Paixão, força e penetração intensa e espontânea.", difficulty: 3, intimacy: 3, shape: "wall", positionImage: "" },
    { name: "Sessenta e Nove", desc: "Deitados de lado, um de cabeça para os pés do outro. Sexo oral simultâneo, com prazer mútuo.", difficulty: 2, intimacy: 3, shape: "seated", positionImage: "" },
    { name: "Cavalgada Reversa", desc: "Um deitado, o outro por cima de costas. Visão diferente e controle total do ritmo para quem está por cima.", difficulty: 2, intimacy: 2, shape: "lap", positionImage: "" },
  ];

  // URL padrão para imagens de posições (pode ser alterada dinamicamente)
  const DEFAULT_POSITION_IMAGE = "https://static1.minhavida.com.br/articles/b1/80/b4/e3/15-posicao-sexual-orig-1.jpg";

  /* ============================================================
     2. SILHUETAS — SVGs abstratos e estilizados (sem nudez)
     ============================================================ */
  const SILHOUETTES = {
    spoon: '<svg viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M20 28c8 0 12 6 12 14s-4 14-12 14"/><path d="M40 28c8 0 12 6 12 14s-4 14-12 14"/><circle cx="22" cy="22" r="5"/><circle cx="42" cy="22" r="5"/></svg>',
    face: '<svg viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="28" cy="26" r="6"/><circle cx="52" cy="26" r="6"/><path d="M28 36c0 14 0 22 0 26"/><path d="M52 36c0 14 0 22 0 26"/><path d="M28 50c4 4 16 4 24 0"/></svg>',
    missionary: '<svg viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="40" cy="18" r="6"/><path d="M40 26c0 12 0 20 0 28"/><path d="M22 40c10 4 26 4 36 0"/><path d="M22 54c10 2 26 2 36 0"/></svg>',
    lap: '<svg viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="40" cy="16" r="5"/><path d="M40 22c0 10 0 18 0 24"/><path d="M24 30c8 6 24 6 32 0"/><path d="M24 46h32"/></svg>',
    seated: '<svg viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="24" cy="24" r="5"/><circle cx="56" cy="24" r="5"/><path d="M24 30c0 14 0 22 0 28"/><path d="M56 30c0 14 0 22 0 28"/><path d="M24 44c8 6 16 6 32 0"/></svg>',
    back: '<svg viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="28" cy="22" r="5"/><circle cx="52" cy="22" r="5"/><path d="M28 28c0 12 0 20 0 28"/><path d="M52 28c0 12 0 20 0 28"/><path d="M28 40c8 2 16 2 24 0"/></svg>',
    edge: '<svg viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="30" cy="18" r="5"/><path d="M30 24c0 10 0 18 0 26"/><path d="M14 50h52"/><path d="M14 50c0 6 0 12 0 16"/><path d="M66 50c0 6 0 12 0 16"/></svg>',
    wall: '<svg viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M14 10v60"/><circle cx="40" cy="20" r="5"/><path d="M40 26c0 10 0 18 0 26"/><path d="M40 36c-10 0-20 0-26 0"/><path d="M40 52c-10 0-20 0-26 0"/></svg>',
  };

  /* ============================================================
     3. ESTADO + localStorage
     ============================================================ */
  const STORAGE_KEY = "entre-nos-settings-v1";

  const defaultSettings = {
    categories: ["beijos", "intimidade", "desafios", "posicoes"],
    intensity: "picante",
    player1: "",
    player2: "",
  };

  let state = {
    settings: loadSettings(),
    // jogo
    deck: [],        // baralho filtrado atual
    drawIndex: 0,    // próxima posição do deck embaralhado
    round: 1,
    cardNum: 0,
    turn: 1,         // 1 ou 2
    currentCard: null,
  };

  function loadSettings() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { ...defaultSettings };
      const parsed = JSON.parse(raw);
      const merged = { ...defaultSettings, ...parsed };
      // Migração: categorias antigas "romance", "picante" e "surpresa" foram removidas
      if (Array.isArray(merged.categories)) {
        const removed = ["romance", "picante", "surpresa"];
        const hasOld = merged.categories.some((c) => removed.includes(c));
        if (hasOld) {
          merged.categories = merged.categories.filter((c) => !removed.includes(c));
          if (!merged.categories.includes("intimidade")) merged.categories.push("intimidade");
        }
      }
      return merged;
    } catch {
      return { ...defaultSettings };
    }
  }

  function saveSettings() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.settings));
    } catch { /* ignore */ }
  }

  /* ============================================================
     4. UTILITÁRIOS
     ============================================================ */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function catById(id) { return CATEGORIES.find((c) => c.id === id); }
  function intById(id) { return INTENSITIES.find((i) => i.id === id); }

  function showToast(msg, ms = 2200) {
    const t = $("#toast");
    t.textContent = msg;
    t.classList.add("is-show");
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => t.classList.remove("is-show"), ms);
  }

  /* Ajusta dinamicamente o tamanho do texto da carta para evitar overflow
     Adiciona classes `text--small` ou `text--xsmall` quando necessário. */
  function adjustCardText() {
    const el = $("#cardText");
    if (!el) return;
    el.classList.remove("text--small", "text--xsmall");
    // Se couber, nada a fazer
    if (el.scrollHeight <= el.clientHeight) return;

    // Primeiro nível de redução
    el.classList.add("text--small");
    if (el.scrollHeight <= el.clientHeight) return;

    // Segundo nível de redução
    el.classList.remove("text--small");
    el.classList.add("text--xsmall");
  }

  /* ============================================================
     5. NAVEGAÇÃO ENTRE TELAS
     ============================================================ */
  function goTo(screenName) {
    $$(".screen").forEach((s) => s.classList.remove("is-active"));
    const target = $(`.screen[data-screen="${screenName}"]`);
    if (target) target.classList.add("is-active");

    if (screenName === "game") startGame();
    if (screenName === "positions") renderPositions();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function openModal(name) {
    const m = $(`.modal[data-modal="${name}"]`);
    if (m) m.classList.add("is-open");
  }
  function closeModal() {
    $$(".modal.is-open").forEach((m) => m.classList.remove("is-open"));
  }

  /* ============================================================
     6. TELA DE CONFIGURAÇÃO — render e interação
     ============================================================ */
  function renderSetup() {
    // Categorias
    const catWrap = $("#categoryChips");
    catWrap.innerHTML = "";
    CATEGORIES.forEach((cat) => {
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "chip" + (state.settings.categories.includes(cat.id) ? " is-selected" : "");
      chip.dataset.cat = cat.id;
      chip.innerHTML = `<span class="chip-icon">${cat.icon}</span>
      <span class="chip-name">${cat.name}</span>
      `;
      chip.addEventListener("click", () => toggleCategory(cat.id));
      catWrap.appendChild(chip);
    });

    // Intensidade
    const intWrap = $("#intensityGrid");
    intWrap.innerHTML = "";
    INTENSITIES.forEach((it) => {
    const opt = document.createElement("button");
    opt.type = "button";
    opt.className =
      "int-opt" +
      (state.settings.intensity === it.id ? " is-selected" : "");
    opt.dataset.int = it.id;
    opt.innerHTML = `
      <span class="int-checkbox"></span>
      <span class="int-name">${it.name}</span>
    `;
    opt.addEventListener("click", () => setIntensity(it.id));
    intWrap.appendChild(opt);
  });

    // Nomes
    $("#player1Name").value = state.settings.player1;
    $("#player2Name").value = state.settings.player2;
  }

  function toggleCategory(id) {
    const list = state.settings.categories;
    const idx = list.indexOf(id);
    if (idx >= 0) {
      if (list.length <= 1) { showToast("Escolha ao menos uma categoria."); return; }
      list.splice(idx, 1);
    } else {
      list.push(id);
    }
    saveSettings();
    renderSetup();
  }

  function setIntensity(id) {
    state.settings.intensity = id;
    saveSettings();
    renderSetup();
  }

  function bindPlayerInputs() {
    $("#player1Name").addEventListener("input", (e) => {
      state.settings.player1 = e.target.value.trim();
      saveSettings();
    });
    $("#player2Name").addEventListener("input", (e) => {
      state.settings.player2 = e.target.value.trim();
      saveSettings();
    });
  }

  /* ============================================================
     7. JOGO — baralho, sorteio, ações
     ============================================================ */
  function buildDeck() {
    const cats = state.settings.categories;
    const intId = state.settings.intensity;
    // Permite todas as intensidades até o nível escolhido (crescente)
    const intOrder = ["leve", "picante", "intenso"];
    const maxIdx = intOrder.indexOf(intId);
    const allowedInts = intOrder.slice(0, maxIdx + 1);

    // Filtra cartas estáticas
    let filtered = CARDS.filter(
      (c) => cats.includes(c.cat) && allowedInts.includes(c.int)
    );

    // Se a categoria 'posicoes' estiver selecionada, inclua cartas geradas
    // a partir do array POSITIONS usando imagens remotas (links).
    if (cats.includes("posicoes")) {
      const posCards = POSITIONS.map((p) => ({
        cat: "posicoes",
        int: "leve",
        icon: "posicoes",
        text: (p.name || "Posição") + (p.desc ? " — " + p.desc : ""),
        positionImage: p.positionImage || DEFAULT_POSITION_IMAGE,
        positionName: p.name || "Posição"
      }));
      filtered = filtered.concat(posCards);
    }

    return shuffle(filtered);
  }

  function startGame() {
    state.deck = buildDeck();
    if (state.deck.length === 0) {
      showToast("Nenhuma carta para essas escolhas. Ajuste as categorias.");
      goTo("setup");
      return;
    }
    state.drawIndex = 0;
    state.round = 1;
    state.cardNum = 0;
    state.score = 0;
    state.turn = 1;
    drawCard(true);
  }

  function drawCard(noAnim) {
    // Reembaralha se acabou
    if (state.drawIndex >= state.deck.length) {
      state.deck = shuffle(state.deck);
      state.drawIndex = 0;
    }
    const c = state.deck[state.drawIndex];
    state.drawIndex++;
    state.currentCard = c;
    state.cardNum++;
    renderCard(c, noAnim);
    updateHUD();
    updateTurn();
  }
  
  function getCategoryTotal(categoryId) {
    return state.deck.filter(card => card.cat === categoryId).length;
  }
  
 function renderCard(c, noAnim) {
  const el = $("#gameCard");
  const cat = catById(c.cat);
  const int = intById(c.int);
  const apply = () => {
    /* =========================================
       CATEGORIA
       ========================================= */
    $("#cardCategoryName").textContent =
      formatLabel(cat ? cat.name : c.cat);
    $("#cardCategoryIcon").innerHTML =
      cat ? cat.icon : "";
    /* =========================================
       INTENSIDADE
       ========================================= */
    $("#cardIntensity").textContent =
      formatLabel(int ? int.name : c.int);
    /* =========================================
       ÍCONE / IMAGEM CENTRAL
       ========================================= */
    const iconEl = $("#cardIcon");
    /*
     * Posições usam imagem.
     * As outras categorias usam o ícone da categoria.
     */
    if (c.cat === "posicoes") {
      if (c.positionImage) {
        iconEl.innerHTML = `
          <img
            src="${c.positionImage}"
            alt="${c.positionName || "Posição"}"
            class="card-position-image"
          >
        `;
      } else {
        iconEl.innerHTML = `
          <div class="card-position-placeholder">
            Posição
          </div>
        `;
      }
    } else {
      iconEl.innerHTML = cat ? cat.icon : "";
    }
    /* =========================================
       TEXTO
       ========================================= */
    $("#cardText").textContent = c.text;
     // Ajusta tamanho do texto se necessário para evitar barra de rolagem
     adjustCardText();
    /* =========================================
       CONTADOR
       ========================================= */
    $("#cardIndex").textContent = state.cardNum;
    $("#cardTotal").textContent =
      getCategoryTotal(c.cat);
  };
  if (noAnim) {
    apply();
    el.classList.remove(
      "is-flip-in",
      "is-flip-out"
    );
    return;
  }
  el.classList.remove("is-flip-in");
  el.classList.add("is-flip-out");
  setTimeout(() => {
    apply();
    el.classList.remove("is-flip-out");
    el.classList.add("is-flip-in");
  }, 280);
}

  function updateHUD() {
    $("#roundCount").textContent = state.round;
  }

  function updateTurn() {
    const isPlayer1 = state.turn === 1;
  
    const name = isPlayer1
      ? state.settings.player1 || "Jogador 1"
      : state.settings.player2 || "Jogador 2";
  
    const el = $("#turnName");
    const avatar = $("#turnAvatar");
  
    // Atualiza o nome
    el.textContent = name;
  
    // Atualiza a cor do nome
    el.classList.toggle("p1", isPlayer1);
    el.classList.toggle("p2", !isPlayer1);
  
    // Atualiza a cor do ícone
    avatar.classList.toggle("p1", isPlayer1);
    avatar.classList.toggle("p2", !isPlayer1);
  }

  function nextTurn() {
    state.turn = state.turn === 1 ? 2 : 1;
    state.round++;
  }

  // ---- Ações ----
  function actionNext() {
    nextTurn();
    drawCard();
    showToast("Próxima rodada.");
  }

  function actionAnother() {
    state.cardNum--; // não conta como jogada nova no índice
    drawCard();
    showToast("Outra carta.");
  }

  function actionSkip() {
    nextTurn();
    drawCard();
    showToast("Carta pulada.");
  }

  function actionRestart() {
    state.round = 1;
    state.cardNum = 0;
    state.turn = 1;
    state.deck = buildDeck();
    state.drawIndex = 0;
    drawCard(true);
    showToast("Jogo reiniciado.");
  }

  /* ============================================================
     8. POSIÇÕES — render
     ============================================================ */
  function renderPositions() {
    const grid = $("#positionsGrid");
    grid.innerHTML = "";
    POSITIONS.forEach((p) => {
      const cardEl = document.createElement("article");
      cardEl.className = "pos-card glass";

      const diffDots = dots(p.difficulty);
      const intDots = dots(p.intimacy);

      cardEl.innerHTML = `
        <div class="pos-silhouette" style="color: var(--red-300)">${SILHOUETTES[p.shape] || ""}</div>
        <h3 class="pos-name">${p.name}</h3>
        <p class="pos-desc">${p.desc}</p>
        <div class="pos-meta">
          <div class="pos-meta-item">
            <span class="pos-meta-label">Dificuldade</span>
            <span class="pos-dots">${diffDots}</span>
          </div>
          <div class="pos-meta-item">
            <span class="pos-meta-label">Intimidade</span>
            <span class="pos-dots">${intDots}</span>
          </div>
        </div>
      `;
      grid.appendChild(cardEl);
    });
  }

  function dots(n) {
    let out = "";
    for (let i = 0; i < 3; i++) {
      out += `<span class="pos-dot${i < n ? " on" : ""}"></span>`;
    }
    return out;
  }

  /* ============================================================
     9. PARTÍCULAS / CONFETES
     ============================================================ */
  const canvas = $("#particles");
  const ctx = canvas.getContext("2d");
  let particles = [];
  let dpr = Math.min(window.devicePixelRatio || 1, 2);

  function resizeCanvas() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  function burstParticles() {
    const colors = ["#e91e63", "#9c27b0", "#ff6b9d", "#c084fc", "#fff5f8"];
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    for (let i = 0; i < 60; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 4;
      particles.push({
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1,
        size: 3 + Math.random() * 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 1,
        decay: 0.012 + Math.random() * 0.01,
        rot: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.2,
      });
    }
  }

  function tickParticles() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.08; // gravidade
      p.vx *= 0.99;
      p.life -= p.decay;
      p.rot += p.vr;
      if (p.life <= 0) {
        particles.splice(i, 1);
        continue;
      }
      ctx.save();
      ctx.globalAlpha = Math.max(0, p.life);
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.4);
      ctx.restore();
    }
    requestAnimationFrame(tickParticles);
  }
  tickParticles();

  /* ============================================================
     10. BIND DE EVENTOS
     ============================================================ */
  function bindEvents() {
    // Navegação por data-goto
    $$("[data-goto]").forEach((btn) => {
      btn.addEventListener("click", () => goTo(btn.dataset.goto));
    });
    // Modais
    $$("[data-open-modal]").forEach((btn) => {
      btn.addEventListener("click", () => openModal(btn.dataset.openModal));
    });
    $$("[data-close-modal]").forEach((btn) => {
      btn.addEventListener("click", closeModal);
    });
    // Ações do jogo
    $("#nextBtn").addEventListener("click", actionNext);
    $("#anotherBtn").addEventListener("click", actionAnother);
    $("#restartBtn").addEventListener("click", actionRestart);

    // Tecla ESC fecha modal
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeModal();
    });
  }

  /* ============================================================
     11. INIT
     ============================================================ */
  function init() {
    renderSetup();
    bindPlayerInputs();
    bindEvents();
    // Garante tela inicial ativa
    $$(".screen").forEach((s) => s.classList.remove("is-active"));
    $(".screen--home").classList.add("is-active");
  }

  document.addEventListener("DOMContentLoaded", init);
})();
