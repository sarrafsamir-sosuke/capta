/*
  Lenis + GSAP. Isolado aqui de propósito: se qualquer CDN falhar,
  nada neste arquivo roda e o site continua legível — a entrada das
  seções é CSS + IntersectionObserver no main.js, não depende do GSAP.
*/
;(function () {
  "use strict"

  var reduzirMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches

  /** Espera as fontes, mas nunca para sempre. */
  function fontesProntas(limite) {
    if (!document.fonts || !document.fonts.ready) return Promise.resolve()
    return Promise.race([
      document.fonts.ready,
      new Promise(function (r) {
        setTimeout(r, limite)
      }),
    ])
  }

  /* ---------------------------------------------------------------- */
  /*  Lenis                                                            */
  /* ---------------------------------------------------------------- */

  function iniciarLenis() {
    // Quem pediu menos animação no sistema não recebe scroll suave.
    if (reduzirMovimento) return null
    if (typeof window.Lenis !== "function") return null

    var lenis = new window.Lenis({
      duration: 1.2,
      easing: function (t) {
        return Math.min(1, 1.001 - Math.pow(2, -10 * t))
      },
      smoothWheel: true,
    })

    // Um ticker só para GSAP e Lenis. Um requestAnimationFrame separado
    // criaria um segundo loop rodando em paralelo, sem necessidade.
    if (window.gsap) {
      window.gsap.ticker.add(function (time) {
        lenis.raf(time * 1000)
      })
      window.gsap.ticker.lagSmoothing(0)
    } else {
      requestAnimationFrame(function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf)
      })
    }

    // Âncoras do menu. Feito na mão em vez da opção `anchors` do Lenis
    // para não depender de uma API que muda entre versões da lib.
    // O offset desconta o header fixo (h-16 = 64px) com uma folga.
    document.addEventListener("click", function (e) {
      var link = e.target.closest('a[href^="#"]')
      if (!link) return

      var id = link.getAttribute("href")
      if (!id || id === "#") return

      var alvo = document.querySelector(id)
      if (!alvo) return

      e.preventDefault()
      lenis.scrollTo(alvo, { offset: -72 })
    })

    return lenis
  }

  /* ---------------------------------------------------------------- */
  /*  Hero — SplitText + scrub                                         */
  /* ---------------------------------------------------------------- */

  function iniciarHero() {
    if (reduzirMovimento) return
    if (!window.gsap || !window.ScrollTrigger || !window.SplitText) return

    var gsap = window.gsap
    var ScrollTrigger = window.ScrollTrigger
    var SplitText = window.SplitText

    gsap.registerPlugin(ScrollTrigger, SplitText)

    var hero = document.querySelector("[data-hero]")
    var headline = document.querySelector("[data-hero-headline]")
    var conteudo = document.querySelector("[data-hero-content]")
    if (!hero || !headline || !conteudo) return

    // Só divide depois que a Sora carregar. Dividir antes do swap da fonte
    // calcula as posições com a fonte de fallback e o texto salta.
    fontesProntas(1500).then(function () {
      // "words,chars" e não só "chars": sem os words, o navegador pode
      // quebrar a linha no meio de uma palavra.
      var split = new SplitText(headline, { type: "words,chars", aria: "auto" })

      gsap.from(split.chars, {
        opacity: 0,
        y: 30,
        stagger: 0.025,
        duration: 0.7,
        ease: "power3.out",
      })

      // Scrub no CONTÊINER, nunca nos mesmos elementos animados na entrada.
      gsap.to(conteudo, {
        y: -80,
        opacity: 0.25,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: 2,
        },
      })

      // O ScrollTrigger nasceu depois que a fonte carregou e o layout já
      // tinha assentado — sem este refresh ele guarda start/end calculados
      // com a altura errada e o scrub não reage ao scroll.
      ScrollTrigger.refresh()
    })
  }

  /* ---------------------------------------------------------------- */

  document.addEventListener("DOMContentLoaded", function () {
    iniciarLenis()
    iniciarHero()
  })
})()
