/*
  Dois componentes, um arquivo. Cada um só liga se o seu ponto de
  ancoragem existir na página:

    [data-pills]        -> seletor de nicho da home (seção 04)
    [data-chat-universal] -> conversa única da página /automacoes

  Os dados são os mesmos que estavam em lib/constants.ts.
*/
;(function () {
  "use strict"

  var reduzirMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches

  /* ---------------------------------------------------------------- */
  /*  Ícones (Tabler, outline)                                         */
  /* ---------------------------------------------------------------- */

  var ICONES = {
    academia:
      '<path d="M2 12h1" /><path d="M6 8h-2a1 1 0 0 0 -1 1v6a1 1 0 0 0 1 1h2" /><path d="M6 7v10a1 1 0 0 0 1 1h1a1 1 0 0 0 1 -1v-10a1 1 0 0 0 -1 -1h-1a1 1 0 0 0 -1 1" /><path d="M9 12h6" /><path d="M15 7v10a1 1 0 0 0 1 1h1a1 1 0 0 0 1 -1v-10a1 1 0 0 0 -1 -1h-1a1 1 0 0 0 -1 1" /><path d="M18 8h2a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-2" /><path d="M22 12h-1" />',
    consultorio:
      '<path d="M6 4h-1a2 2 0 0 0 -2 2v3.5a5.5 5.5 0 0 0 11 0v-3.5a2 2 0 0 0 -2 -2h-1" /><path d="M8 15a6 6 0 1 0 12 0v-3" /><path d="M11 3v2" /><path d="M6 3v2" /><path d="M18 10a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />',
    restaurante:
      '<path d="M19 3v12h-5c-.023 -3.681 .184 -7.406 5 -12m0 12v6h-1v-3m-10 -14v17m-3 -17v3a3 3 0 1 0 6 0v-3" />',
    escritorio:
      '<path d="M3 9a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2l0 -9" /><path d="M8 7v-2a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2" /><path d="M12 12l0 .01" /><path d="M3 13a20 20 0 0 0 18 0" />',
  }

  function svgIcone(id, tamanho) {
    return (
      '<svg xmlns="http://www.w3.org/2000/svg" width="' +
      tamanho +
      '" height="' +
      tamanho +
      '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      (ICONES[id] || "") +
      "</svg>"
    )
  }

  /* ---------------------------------------------------------------- */
  /*  Dados                                                            */
  /* ---------------------------------------------------------------- */

  var NICHOS = [
    {
      id: "academia",
      label: "Academia",
      problema:
        "A mensagem chega às 22h perguntando o valor do plano. A resposta sai no dia seguinte — quando o aluno já fechou na academia da esquina.",
      fluxo: [
        "Mensagem fora do horário",
        "Responde plano e valor",
        "Agenda aula experimental",
        "Avisa você no dia",
      ],
      conversa: [
        { de: "cliente", texto: "Oi, quanto tá a mensalidade?", hora: "22:14" },
        {
          de: "negocio",
          texto: "Boa noite! Mensal R$89 e trimestral R$79/mês. Quer marcar uma aula experimental?",
          hora: "22:14",
        },
        { de: "cliente", texto: "Quero sim", hora: "22:15" },
        { de: "negocio", texto: "Tenho quinta 7h ou sexta 19h. Qual fica melhor?", hora: "22:15" },
        { de: "cliente", texto: "Sexta 19h", hora: "22:16" },
        {
          de: "negocio",
          texto: "Marcado para sexta, 19h. Chega 10 minutos antes e traz uma toalha.",
          hora: "22:16",
        },
      ],
    },
    {
      id: "consultorio",
      label: "Consultório",
      problema:
        "O paciente liga, ninguém atende e ele não liga de novo. A vaga da agenda fica vazia e ninguém percebe que ela existiu.",
      fluxo: ["Paciente chama", "Confirma o convênio", "Oferece horário livre", "Lembra um dia antes"],
      conversa: [
        { de: "cliente", texto: "Bom dia, vocês atendem por convênio?", hora: "07:42" },
        {
          de: "negocio",
          texto: "Bom dia! Atendemos Unimed, Bradesco Saúde e particular. Qual é o seu?",
          hora: "07:42",
        },
        { de: "cliente", texto: "Unimed", hora: "07:43" },
        { de: "negocio", texto: "Tenho terça 14h30 ou quarta 9h. Qual prefere?", hora: "07:43" },
        { de: "cliente", texto: "Terça 14h30", hora: "07:44" },
        {
          de: "negocio",
          texto: "Agendado para terça, 14h30. Traga carteirinha e documento com foto.",
          hora: "07:44",
        },
      ],
    },
    {
      id: "restaurante",
      label: "Restaurante",
      problema:
        "Sábado à noite chegam 40 mensagens perguntando a mesma coisa: tem mesa, até que horas abre, faz entrega. Alguém precisa parar de trabalhar para responder.",
      fluxo: ["Pedido de reserva", "Mostra horários livres", "Confirma a mesa", "Envia o cardápio"],
      conversa: [
        { de: "cliente", texto: "Boa noite, tem mesa pra 4 hoje?", hora: "18:55" },
        { de: "negocio", texto: "Boa noite! Tenho 19h30 e 21h. Qual horário?", hora: "18:55" },
        { de: "cliente", texto: "19h30", hora: "18:56" },
        {
          de: "negocio",
          texto: "Reservado para 4 pessoas às 19h30. Guardo a mesa por 15 minutos.",
          hora: "18:56",
        },
        { de: "cliente", texto: "Vocês entregam?", hora: "18:57" },
        {
          de: "negocio",
          texto: "Entregamos no centro até 22h30. Quer que eu mande o cardápio?",
          hora: "18:57",
        },
      ],
    },
    {
      id: "escritorio",
      label: "Escritório",
      problema:
        "Metade dos contatos não é do tipo de caso que você aceita. Você só descobre isso depois de vinte minutos de conversa.",
      fluxo: ["Contato novo chega", "Qualifica o caso", "Descarta o que não é seu", "Agenda a consulta"],
      conversa: [
        { de: "cliente", texto: "Preciso de ajuda com uma rescisão", hora: "09:20" },
        {
          de: "negocio",
          texto: "Certo. Atuamos em direito trabalhista. Você foi demitido ou pediu demissão?",
          hora: "09:20",
        },
        { de: "cliente", texto: "Fui demitido sem justa causa", hora: "09:21" },
        { de: "negocio", texto: "Entendi. Há quanto tempo isso aconteceu?", hora: "09:21" },
        { de: "cliente", texto: "Semana passada", hora: "09:22" },
        {
          de: "negocio",
          texto: "Está dentro do prazo. Posso agendar uma consulta na quinta, 16h?",
          hora: "09:22",
        },
      ],
    },
  ]

  /** Conversa única da página /automacoes — sem nicho. */
  var CHAT_UNIVERSAL = {
    conversa: [
      { de: "cliente", texto: "Boa noite! Vocês ainda estão atendendo?", hora: "22:47" },
      { de: "negocio", texto: "Boa noite! Estou aqui sim.", hora: "22:47" },
      { de: "cliente", texto: "Queria saber o valor", hora: "22:48" },
      { de: "negocio", texto: "Te passo agora. Quer que eu já reserve um horário?", hora: "22:48" },
      { de: "cliente", texto: "Pode ser quinta", hora: "22:49" },
      { de: "negocio", texto: "Quinta às 10h, reservado. Confirmo com você amanhã cedo.", hora: "22:49" },
    ],
    statusOnline: "online",
    statusDigitando: "digitando…",
  }

  /** Ritmo da conversa, em milissegundos. */
  var CHAT_TIMING = { inicial: 400, cliente: 600, digitando: 900 }

  /* ---------------------------------------------------------------- */
  /*  Componente 1 — pills da home                                     */
  /* ---------------------------------------------------------------- */

  var CLASSE_PILL_ATIVA =
    "relative rounded-full px-4 py-1.5 text-sm font-medium text-zinc-900 transition-colors duration-150"
  var CLASSE_PILL_INATIVA =
    "relative rounded-full border border-zinc-700 px-4 py-1.5 text-sm text-zinc-400 transition-colors duration-150 hover:border-zinc-500 hover:text-zinc-200"

  function iniciarPills() {
    var container = document.querySelector("[data-pills]")
    if (!container) return

    var botoes = Array.prototype.slice.call(container.querySelectorAll("[data-pill]"))
    var fundo = container.querySelector("[data-pill-bg]")
    var painel = document.querySelector("#painel-nicho")
    if (!botoes.length || !painel) return

    var elProblema = painel.querySelector("[data-nicho-problema]")
    var elFluxo = painel.querySelector("[data-nicho-fluxo]")
    var elIcone = painel.querySelector("[data-nicho-icone]")
    var elLabel = painel.querySelector("[data-nicho-label]")
    var elConversa = painel.querySelector("[data-nicho-conversa]")

    var ativo = "academia"

    /**
     * Move a pílula branca para o botão selecionado com FLIP — é o
     * equivalente ao layoutId que o Framer Motion fazia sozinho.
     */
    function moverFundo(botao) {
      if (!fundo) return

      if (reduzirMovimento) {
        botao.insertBefore(fundo, botao.firstChild)
        return
      }

      var antes = fundo.getBoundingClientRect()
      botao.insertBefore(fundo, botao.firstChild)
      var depois = fundo.getBoundingClientRect()

      var dx = antes.left - depois.left
      var dy = antes.top - depois.top
      var ex = antes.width / depois.width

      if (!dx && !dy && ex === 1) return

      fundo.animate(
        [
          { transform: "translate(" + dx + "px," + dy + "px) scaleX(" + ex + ")" },
          { transform: "none" },
        ],
        { duration: 300, easing: "cubic-bezier(0.25, 0.1, 0.25, 1)" }
      )
    }

    function montarFluxo(nicho) {
      elFluxo.innerHTML = ""
      nicho.fluxo.forEach(function (passo, i) {
        var ultimo = i === nicho.fluxo.length - 1
        var li = document.createElement("li")
        li.className = "relative flex gap-4 " + (ultimo ? "pb-0" : "pb-7")
        li.style.animation = "bolha-entrada 0.3s cubic-bezier(0.25,0.1,0.25,1) both"
        li.style.animationDelay = 60 + i * 60 + "ms"

        if (!ultimo) {
          var linha = document.createElement("span")
          linha.setAttribute("aria-hidden", "true")
          linha.className = "absolute left-[13px] top-7 h-[calc(100%-1rem)] w-px bg-zinc-800"
          li.appendChild(linha)
        }

        var numero = document.createElement("span")
        numero.className =
          "relative z-10 flex size-7 shrink-0 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900 text-[11px] font-medium text-zinc-400"
        numero.textContent = String(i + 1)
        li.appendChild(numero)

        var texto = document.createElement("span")
        texto.className = "pt-1 text-sm text-zinc-200"
        texto.textContent = passo
        li.appendChild(texto)

        elFluxo.appendChild(li)
      })
    }

    function montarConversa(nicho) {
      elConversa.innerHTML = ""
      nicho.conversa.forEach(function (msg, i) {
        var doNegocio = msg.de === "negocio"

        var bolha = document.createElement("div")
        bolha.className = doNegocio
          ? "max-w-[85%] self-end rounded-xl bg-capta-500/15 px-3 py-2 ring-1 ring-inset ring-capta-500/20"
          : "max-w-[85%] self-start rounded-xl bg-zinc-800 px-3 py-2"
        bolha.classList.add("bolha-entrada")
        bolha.style.animationDelay = i * 70 + "ms"

        var texto = document.createElement("p")
        texto.className = "text-[13px] leading-snug text-zinc-100"
        texto.textContent = msg.texto
        bolha.appendChild(texto)

        var hora = document.createElement("p")
        hora.className = "mt-1 text-right text-[10px] text-zinc-500"
        hora.textContent = msg.hora
        bolha.appendChild(hora)

        elConversa.appendChild(bolha)
      })
    }

    function selecionar(id) {
      var nicho = null
      for (var i = 0; i < NICHOS.length; i++) {
        if (NICHOS[i].id === id) nicho = NICHOS[i]
      }
      if (!nicho || id === ativo) return

      ativo = id

      botoes.forEach(function (botao) {
        var selecionado = botao.getAttribute("data-pill") === id
        botao.className = selecionado ? CLASSE_PILL_ATIVA : CLASSE_PILL_INATIVA
        botao.setAttribute("aria-selected", String(selecionado))
        botao.tabIndex = selecionado ? 0 : -1
        if (selecionado) moverFundo(botao)
      })

      painel.setAttribute("aria-labelledby", "pill-" + id)
      elProblema.textContent = nicho.problema
      elIcone.innerHTML = svgIcone(nicho.id, 16)
      elLabel.textContent = nicho.label
      montarFluxo(nicho)
      montarConversa(nicho)
    }

    botoes.forEach(function (botao, index) {
      botao.addEventListener("click", function () {
        selecionar(botao.getAttribute("data-pill"))
      })

      // Setas navegam entre as pills, como manda o padrão de tablist.
      botao.addEventListener("keydown", function (e) {
        var mapa = {
          ArrowRight: index + 1,
          ArrowLeft: index - 1,
          Home: 0,
          End: botoes.length - 1,
        }
        var alvo = mapa[e.key]
        if (alvo === undefined) return

        e.preventDefault()
        var proximo = (alvo + botoes.length) % botoes.length
        selecionar(botoes[proximo].getAttribute("data-pill"))
        botoes[proximo].focus()
      })
    })
  }

  /* ---------------------------------------------------------------- */
  /*  Componente 2 — chat universal da página /automacoes              */
  /* ---------------------------------------------------------------- */

  function iniciarChatUniversal() {
    var raiz = document.querySelector("[data-chat-universal]")
    if (!raiz) return

    var lista = raiz.querySelector("[data-chat-mensagens]")
    var status = raiz.querySelector("[data-chat-status]")
    var pontoOnline = raiz.querySelector("[data-chat-online]")
    if (!lista) return

    var conversa = CHAT_UNIVERSAL.conversa

    function criarBolha(msg) {
      var doNegocio = msg.de === "negocio"

      var bolha = document.createElement("div")
      bolha.className = doNegocio
        ? "max-w-[85%] self-end rounded-2xl rounded-br-md bg-green-700 px-3 py-2"
        : "max-w-[85%] self-start rounded-2xl rounded-bl-md bg-zinc-700 px-3 py-2"
      bolha.classList.add("bolha-entrada")

      var texto = document.createElement("p")
      texto.className = "text-[13px] leading-snug text-zinc-100"
      texto.textContent = msg.texto
      bolha.appendChild(texto)

      var hora = document.createElement("p")
      hora.className = doNegocio
        ? "mt-1 text-right text-[10px] text-green-200/80"
        : "mt-1 text-right text-[10px] text-zinc-400"
      hora.textContent = msg.hora
      bolha.appendChild(hora)

      return bolha
    }

    function criarDigitando() {
      var caixa = document.createElement("div")
      caixa.className =
        "self-end rounded-2xl rounded-br-md bg-green-700 px-4 py-3 bolha-entrada"
      caixa.setAttribute("aria-label", "digitando")

      var linha = document.createElement("span")
      linha.className = "flex items-center gap-1"

      for (var i = 0; i < 3; i++) {
        var ponto = document.createElement("span")
        ponto.className = "size-1.5 rounded-full bg-green-200 animate-typing-dot"
        ponto.style.animationDelay = i * 150 + "ms"
        linha.appendChild(ponto)
      }

      caixa.appendChild(linha)
      return caixa
    }

    function mostrarTudo() {
      lista.innerHTML = ""
      conversa.forEach(function (msg) {
        lista.appendChild(criarBolha(msg))
      })
    }

    function definirStatus(digitando) {
      if (status) {
        status.textContent = digitando
          ? CHAT_UNIVERSAL.statusDigitando
          : CHAT_UNIVERSAL.statusOnline
      }
      // Como no WhatsApp de verdade: o pontinho some enquanto digita.
      if (pontoOnline) pontoOnline.hidden = digitando
    }

    /** Encadeia a conversa: cliente entra direto, bot passa por "digitando…". */
    function reproduzir(indice) {
      if (indice >= conversa.length) {
        definirStatus(false)
        return
      }

      var msg = conversa[indice]

      if (msg.de === "negocio") {
        definirStatus(true)
        var digitando = criarDigitando()
        lista.appendChild(digitando)

        setTimeout(function () {
          digitando.remove()
          definirStatus(false)
          lista.appendChild(criarBolha(msg))
          reproduzir(indice + 1)
        }, CHAT_TIMING.digitando)
        return
      }

      var espera = indice === 0 ? CHAT_TIMING.inicial : CHAT_TIMING.cliente
      setTimeout(function () {
        lista.appendChild(criarBolha(msg))
        reproduzir(indice + 1)
      }, espera)
    }

    if (reduzirMovimento || !("IntersectionObserver" in window)) {
      mostrarTudo()
      definirStatus(false)
      return
    }

    // As bolhas vêm prontas no HTML para quem não tem JS. Com JS, esvaziamos
    // agora — ainda no DOMContentLoaded, antes da primeira pintura — e a
    // conversa é remontada mensagem por mensagem.
    lista.innerHTML = ""
    definirStatus(false)

    // A conversa só começa quando entra na tela — rodar antes significaria
    // o visitante chegar com tudo já resolvido.
    var observador = new IntersectionObserver(
      function (entradas) {
        entradas.forEach(function (entrada) {
          if (!entrada.isIntersecting) return
          observador.disconnect()
          reproduzir(0)
        })
      },
      { rootMargin: "-120px 0px" }
    )

    observador.observe(raiz)
  }

  /* ---------------------------------------------------------------- */

  document.addEventListener("DOMContentLoaded", function () {
    iniciarPills()
    iniciarChatUniversal()
  })
})()
