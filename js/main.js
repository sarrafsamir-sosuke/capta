/*
  Lógica principal: nav, menu mobile e a entrada das seções.
  Nada aqui depende de CDN externo — se o GSAP ou o Lenis não carregarem,
  o site continua funcionando por completo.
*/
;(function () {
  "use strict"

  var reduzirMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches

  /* ---------------------------------------------------------------- */
  /*  Nav — borda ao sair do topo                                      */
  /* ---------------------------------------------------------------- */

  function iniciarNav() {
    var nav = document.querySelector("[data-nav]")
    if (!nav) return

    function aoRolar() {
      var rolou = window.scrollY > 8
      nav.classList.toggle("border-zinc-800", rolou)
      nav.classList.toggle("border-transparent", !rolou)
    }

    aoRolar()
    window.addEventListener("scroll", aoRolar, { passive: true })
  }

  /* ---------------------------------------------------------------- */
  /*  Menu mobile                                                      */
  /* ---------------------------------------------------------------- */

  function iniciarMenu() {
    var botao = document.querySelector("[data-menu-toggle]")
    var menu = document.querySelector("[data-menu]")
    if (!botao || !menu) return

    var iconeAbrir = botao.querySelector("[data-icon-menu]")
    var iconeFechar = botao.querySelector("[data-icon-close]")

    function definir(aberto) {
      menu.hidden = !aberto
      botao.setAttribute("aria-expanded", String(aberto))
      botao.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu")
      if (iconeAbrir) iconeAbrir.hidden = aberto
      if (iconeFechar) iconeFechar.hidden = !aberto
      // Menu aberto trava o corpo — sem isso o fundo rola por baixo do painel.
      document.body.style.overflow = aberto ? "hidden" : ""
    }

    botao.addEventListener("click", function () {
      definir(menu.hidden)
    })

    menu.querySelectorAll("[data-menu-link]").forEach(function (link) {
      link.addEventListener("click", function () {
        definir(false)
      })
    })

    // Esc fecha, como em qualquer painel sobreposto.
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !menu.hidden) {
        definir(false)
        botao.focus()
      }
    })

    definir(false)
  }

  /* ---------------------------------------------------------------- */
  /*  Entrada das seções — substitui o <Reveal> do Framer Motion       */
  /* ---------------------------------------------------------------- */

  function iniciarReveals() {
    var alvos = document.querySelectorAll("[data-reveal]")
    if (!alvos.length) return

    // Sem IntersectionObserver (ou sem movimento), tudo já entra visível.
    if (reduzirMovimento || !("IntersectionObserver" in window)) {
      alvos.forEach(function (el) {
        el.classList.add("is-visible")
      })
      return
    }

    alvos.forEach(function (el) {
      var atraso = el.getAttribute("data-reveal-delay")
      if (atraso) el.style.setProperty("--reveal-delay", atraso + "ms")
    })

    var observador = new IntersectionObserver(
      function (entradas) {
        entradas.forEach(function (entrada) {
          if (!entrada.isIntersecting) return
          entrada.target.classList.add("is-visible")
          // once: true — não desfaz ao sair da tela.
          observador.unobserve(entrada.target)
        })
      },
      { rootMargin: "-60px 0px" }
    )

    alvos.forEach(function (el) {
      observador.observe(el)
    })
  }

  /* ---------------------------------------------------------------- */
  /*  Entrada do hero — no load, não no scroll                         */
  /* ---------------------------------------------------------------- */

  function iniciarHeroFade() {
    var alvos = document.querySelectorAll("[data-fade]")
    alvos.forEach(function (el) {
      var atraso = el.getAttribute("data-fade")
      if (atraso) el.style.setProperty("--fade-delay", atraso + "ms")
    })

    // Um frame de folga para o navegador registrar o estado inicial;
    // sem isso a transição não roda e o elemento só "aparece".
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        alvos.forEach(function (el) {
          el.classList.add("is-visible")
        })
      })
    })
  }

  /* ---------------------------------------------------------------- */

  function iniciarAno() {
    var el = document.querySelector("[data-ano-copyright]")
    if (el) el.textContent = "© " + new Date().getFullYear() + " Capta"
  }

  document.addEventListener("DOMContentLoaded", function () {
    iniciarNav()
    iniciarMenu()
    iniciarReveals()
    iniciarHeroFade()
    iniciarAno()
  })
})()
