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

$(document).ready(function () {
  const elements = {
    body: $('body'),
    menuContainer: $('.menu-container'),
    homepagePredictionList: $('.homepage-prediction-list')
  }
  
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