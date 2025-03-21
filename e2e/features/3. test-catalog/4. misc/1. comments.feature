# language: ru
Функция: Комментарии

  Сценарий: Отображение комментариев в левой панели
    Пусть отменяем все изменения
    И смотрим на "левую навигацию"
    Когда нажимаем на кнопку "local"
    Тогда видим иконку "коммент"

  Сценарий: Открытие окна комментария
    Пусть смотрим на редактор
    Когда нажимаем на элемент "комментарий"
    И заново смотрим на "блок комментариев"
    Тогда видим текст "Комментарий тест."
    И нажимаем на клавиши "Escape Escape"

  Сценарий: Копирование комментария
    Пусть смотрим на редактор
    Когда разметка текущей статьи содержит
      """
      [comment:1]Текст статьи.[/comment]
      """
    И нажимаем на клавишу "Control+A Control+C"
    И нажимаем на клавишу "ArrowDown Enter Control+V"
    Тогда разметка текущей статьи содержит
      """
      [comment:1]Текст статьи.[/comment]
      
      Текст статьи.
      """
    Когда очищаем документ
    И нажимаем на клавишу "Control+V"
    Тогда разметка текущей статьи содержит
      """
      [comment:1]Текст статьи.[/comment]
      """

  Сценарий: Добавление комментария
    Пусть смотрим на "левую навигацию"
    И нажимаем на кнопку "server"
    И заново смотрим на редактор
    Когда нажимаем на клавишу "Control+ArrowLeft Control+Shift+ArrowRight"
    И заново смотрим на "инлайновая панель"
    И нажимаем на иконку "новый комментарий"
    И заново смотрим на "окно добавления комментария"
    И смотрим на редактор
    И вводим "комментраий"
    И заново смотрим на "окно добавления комментария"
    И нажимаем на кнопку "Комментировать"
    Тогда заново смотрим на редактор
    Когда нажимаем на элемент "комментарий"
    И заново смотрим на "блок комментариев"
    Тогда видим текст "комментраий"
    И ждём 1 секунду
    И отменяем все изменения
