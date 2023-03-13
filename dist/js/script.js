"use strict";

window.addEventListener("DOMContentLoaded", () => {

    // переменные инпутов и кнопок
    let inputText = document.querySelector("#input-text");
    let outputText = document.querySelector("#output-text");
    let truncateBtn = document.querySelector("#truncate");
    let copyBtn = document.querySelector("#copy");

    // Объект с оповещениями для пользователя
    let messageText = {
        emptyInput: "Введите число в числовой инпут",
        negativeInput: "Вводимое число должно быть больше нуля",
    };

    // Обрезаем вводимый текст
    truncateBtn.addEventListener("click", () => {
        // переменная с округленным значением в числовом инпуте
        let len = parseInt(document.querySelector("#len").value);

        // переменная с мод окном
        let modalWindow = document.querySelector(".modal");

        // функция по добавлению на экран оповещения пользователя
        function showMessage(text) {
            // создаем элемент
            const messageElement = document.createElement("div");

            // создаем его верстку
            messageElement.innerHTML = `
                    <div data-close class="modal__close">&times</div>
                        <div class="modal__title">${text}</div>
            `;
    
            // добавляем класс элемену для стилизации
            messageElement.classList.add("modal__content");
            modalWindow.classList.add("show");

            // добавляем элемент в верстку
            modalWindow.prepend(messageElement);
        }

        // функция удаления элемента
        function hideMessageElement(modal, modalContent) {
            // плавно убираем мод окно
            modal.classList.remove("show");

            // удаляем контент внутри мод окна
            setTimeout(() => {
                modalContent.remove();
            }, 300)
           
        }


        // Если числовой инпут true, то есть не в значении 0
        if (len) {
            // Валидация текстового поля и длинны введенного текста
            // Если введенный текст больше 0 и больше числа указанного в числовом поле
            if (len > 0 && inputText.value.length > len) {
                // обрезаем введенный текст от индекса первой буквы (0) до индекса буквы равному числу в инпуте и выводим обрезанный текст во втрой текстовый инпут
                outputText.value = inputText.value.slice(0, len);
            // Если в числовом поле указано число меньше 0
            } else if (len < 0) {
                // очищаем текстовый инпут
                inputText.value = ""; 

                // ставим числовой инпут в изначальное значение 10
                document.querySelector("#len").value = 10;
                 
                // показываем оповещение, что нужно поместить в числовой инпут значение не ниже 0
                showMessage(messageText.negativeInput);

                // удаляем оповещение по клику либо на зону вокруг оповещения - это класс 'modal', либо на крестик внутри оповещения - это data атрибут 'data-close'
                modalWindow.addEventListener("click", (e) => {
                    if(e.target.classList.contains("modal") || e.target.getAttribute("data-close") === "") {
                        hideMessageElement(modalWindow, document.querySelector(".modal__content"));
                    }
                })

                document.addEventListener("keydown", (e) => {
                    if(e.code === "Escape" && modalWindow.classList.contains("show")) {
                        hideMessageElement(modalWindow, document.querySelector(".modal__content"));
                    }
                });
            } // Если введенный текст не больше числа указанного в числовом поле 
             else {
                // переносим текст полностью во второе текстовое поле
                outputText.value = inputText.value;
            }
        // Если числовой инпут в false - то есть значение равно 0 
        } else {
            outputText.value = "";

            // показали оповещение пользователю
            showMessage(messageText.emptyInput);

            // удаляем оповещение по клику либо на зону вокруг оповещения - это класс 'modal', либо на крестик внутри оповещения - это data атрибут 'data-close'
            modalWindow.addEventListener("click", (e) => {
                if(e.target.classList.contains("modal") || e.target.getAttribute("data-close") === "") {
                    hideMessageElement(modalWindow, document.querySelector(".modal__content"));
                }
            })

            document.addEventListener("keydown", (e) => {
                if(e.code === "Escape" && modalWindow.classList.contains("show")) {
                    hideMessageElement(modalWindow, document.querySelector(".modal__content"));
                }
            });
        }
    });

    // Копируем текст из второго текстового поля по клику на кнопку 'copy'
    copyBtn.addEventListener("click", () => {
        navigator.clipboard.writeText(`${outputText.value}`);
    });
});