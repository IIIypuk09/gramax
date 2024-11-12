# language: ru
Функция: Блоки

  Сценарий: Выйти из цитаты по двум нажатиям Enter
    Пусть смотрим на редактор
    И заполняем документ
      """
      > text(*)
      """
    Когда нажимаем на клавиши "Enter Enter"
    И вводим "text"
    Тогда разметка текущей статьи содержит
      """
      :::quote 
      
      text
      
      :::
      
      text
      """

  Сценарий: Код блока при удалении не разделяет заметку
    Пусть смотрим на редактор
    И заполняем документ
      """
      :::note 
      
      eljhrkjeqr
      
      a(*)
      
      eqjhrkjeqlr
      
      :::
      """
    Когда нажимаем на иконку редактора "блок кода"
    И нажимаем на клавишу "Backspace Backspace"
    Тогда разметка текущей статьи содержит
      """
      :::note 
      
      eljhrkjeqr
      
      eqjhrkjeqlr
      
      :::
      """
