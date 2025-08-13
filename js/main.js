document.addEventListener("DOMContentLoaded", function () {

    var menuBurger = document.querySelector('.menu-burger');
    var menuBurgerParent = document.querySelector('.header-content');

    menuBurger.addEventListener("click", function(){
        menuBurger.classList.toggle("active");
        menuBurgerParent.classList.toggle("active");
    });

    
    var subCat = document.querySelector('.category-choose-block');

    if(subCat){
        subCat.addEventListener("click", function(){
            subCat.classList.toggle("active");
        });
    }
    
    
    const searchMob = document.querySelector('.search-mob');
    const searchInput = searchMob?.querySelector('input');
    
    if (searchMob && searchInput) {
        // Клик по иконке или контейнеру
        searchMob.addEventListener("click", function (e) {
            // Если клик именно по svg или div, а не по инпуту
            if (e.target.tagName !== 'INPUT') {
                searchMob.classList.add("active");
                searchInput.focus();
            }
        });
    
        // Когда инпут теряет фокус — убираем active
        searchInput.addEventListener("blur", function () {
            searchMob.classList.remove("active");
        });
    }
    

    const swiper = new Swiper(".swiper-screenshot", {
        spaceBetween: 50,
        slidesPerView: 3,
        pagination: {
          el: ".swiper-pagination",
        },
        breakpoints: {
            // when window width is >= 640px
            1: {
              slidesPerView: 1,
              spaceBetween: 20
            },
            // when window width is >= 768px
            991: {
              slidesPerView: 2,
              spaceBetween: 30
            },
            1600: {
              slidesPerView: 3,
              spaceBetween: 50
            }
        }
      });



    var phoneInputs = document.querySelectorAll('input[type="tel"]');
  
    var getInputNumbersValue = function (input) {
        // Return stripped input value вЂ” just numbers
        return input.value.replace(/\D/g, '');
    }
  
    var onPhonePaste = function (e) {
        var input = e.target,
            inputNumbersValue = getInputNumbersValue(input);
        var pasted = e.clipboardData || window.clipboardData;
        if (pasted) {
            var pastedText = pasted.getData('Text');
            if (/\D/g.test(pastedText)) {
                // Attempt to paste non-numeric symbol вЂ” remove all non-numeric symbols,
                // formatting will be in onPhoneInput handler
                input.value = inputNumbersValue;
                return;
            }
        }
    }
  
    var onPhoneInput = function (e) {
        var input = e.target,
            inputNumbersValue = getInputNumbersValue(input),
            selectionStart = input.selectionStart,
            formattedInputValue = "";
  
        if (!inputNumbersValue) {
            return input.value = "";
        }
  
        if (input.value.length != selectionStart) {
            // Editing in the middle of input, not last symbol
            if (e.data && /\D/g.test(e.data)) {
                // Attempt to input non-numeric symbol
                input.value = inputNumbersValue;
            }
            return;
        }
  
        if ([ "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].indexOf(inputNumbersValue[0]) > -1) {
            if (inputNumbersValue[0] == "9") inputNumbersValue = "7" + inputNumbersValue;
            var firstSymbols = (inputNumbersValue[0] == "8") ? "8" : "+7";
            formattedInputValue = input.value = firstSymbols + " ";
            if (inputNumbersValue.length > 1) {
                formattedInputValue += '(' + inputNumbersValue.substring(1, 4);
            }
            if (inputNumbersValue.length >= 5) {
                formattedInputValue += ') ' + inputNumbersValue.substring(4, 7);
            }
            if (inputNumbersValue.length >= 8) {
                formattedInputValue += '-' + inputNumbersValue.substring(7, 9);
            }
            if (inputNumbersValue.length >= 10) {
                formattedInputValue += '-' + inputNumbersValue.substring(9, 11);
            }
        } else {
            formattedInputValue = '+' + inputNumbersValue.substring(0, 16);
        }
        input.value = formattedInputValue;
    }
    var onPhoneKeyDown = function (e) {
        // Clear input after remove last symbol
        var inputValue = e.target.value.replace(/\D/g, '');
        if (e.keyCode == 8 && inputValue.length == 1) {
            e.target.value = "";
        }
    }
    for (var phoneInput of phoneInputs) {
        phoneInput.addEventListener('keydown', onPhoneKeyDown);
        phoneInput.addEventListener('input', onPhoneInput, false);
        phoneInput.addEventListener('paste', onPhonePaste, false);
    }
    
})