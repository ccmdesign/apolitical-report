const appVisibilityItemName = 'ar_f79b1d64a8d8b02b86d797765a6a1fe4'
// localStorage.clear(appVisibilityItemName)

function menuVisibility (elements, visibility) {
  if (visibility) {
    if (!elements.menuContainer.hasClass('menu-active')) {
      elements.menuContainer.addClass('menu-active')
      elements.body.css('overflow', 'hidden')
    }
  } else {
    elements.menuContainer.removeClass('menu-active')
    elements.body.css('overflow', 'auto')
  }
}

function checkVisiblity(elements) {
  if (localStorage.getItem(appVisibilityItemName)) {
    elements.appWrapper.addClass('visible')
    elements.lockWrapper.addClass('hidden')
  } else {
    elements.appWrapper.addClass('hidden')
    elements.lockWrapper.addClass('visible')
  }
}

function tryVisiblity(elements) {
  if (!elements.lockMessage.hasClass('hidden')) {
    elements.lockMessage.addClass('hidden')
  }
  const key = elements.lockInput.val()
  if (key === 'ccm.design2019') {
    elements.lockInput.val('')
    localStorage.setItem(appVisibilityItemName, true)
    elements.appWrapper.removeClass('hidden')
    elements.lockWrapper.removeClass('visible')
    elements.appWrapper.addClass('visible')
    elements.lockWrapper.addClass('hidden')
  } else {
    elements.lockMessage.text('Incorrect key.')
    elements.lockMessage.removeClass('hidden')
    if (!elements.appWrapper.hasClass('hidden')) elements.appWrapper.addClass('hidden')
    if (!elements.lockWrapper.hasClass('visible')) elements.lockWrapper.addClass('visible')
  }
}

$(document).ready(function () {
  const elements = {
    body: $('body'),
    appWrapper: $('#app'),
    lockWrapper: $('#lock-overlay'),
    lockInput: $('#lock-input'),
    lockMessage: $('.lock-overlay__message'),
    menuContainer: $('.menu-container'),
    homepagePredictionList: $('.homepage-prediction-list')
  }

  checkVisiblity(elements)

  $('#lock-button').click(function () {
    tryVisiblity(elements)
  })
  
  $('.js-menu-button').click(function () {
    menuVisibility(elements, !elements.menuContainer.hasClass('menu-active'))
  })

  elements.menuContainer.click(function (event) {
    if ($(event.target).hasClass('menu-active')) {
      menuVisibility(elements, false)
    }
  })

  $('.content-body').each(function () {
    const el = $(this)
    const firstParagraph = el.children('p:first')[0]
    if (firstParagraph) {
      const firstLetterEl = el.children('.content-body__initial-letter')[0]
      if (firstLetterEl) {
        firstLetterEl.textContent = firstParagraph.textContent[0]
      }
    }
  })

  elements.homepagePredictionList.slick({
    centerMode: true,
    slidesToShow: 5,
    arrows: false,
    dots: false,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 640,
        settings: {
          centerMode: false,
          slidesToShow: 1,
          arrows: true,
          dots: false,
          variableWidth: false,
          prevArrow: null,
          nextArrow: $('.homepage-sliders__button--next')
        }
      }
    ]
  })
})