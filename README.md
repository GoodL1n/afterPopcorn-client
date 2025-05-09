## Клиентская часть REST API приложения afterPopcorn

> Кинопортал с возможностью просмотра и оценивания\рецензирования кинофильмов <br/>
> Стек клиента: TypeScript, Angular, Angular Material, Bootstrap

### Проблемы:
- Подписка в подписке, некорректное использование реактивности в связке с запросами к серверу
- window.location.reload()
- Не соблюдается бэм структура или вообще какая-либо в плане названия блоков
- Некорректные названия булевых переменных
- По хорошему добавить environmnet dev\prod
- По хорошему кэшировать запросы + хранить данные на клиенте с помощью стейт менеджеров(либо простого на RxJs)  - сейчас слишком много повторяющихся запросов

### Скриншоты:
Страница авторизации

<image src="https://imgur.com/5VAqHm2.jpg" alt="Страница авторизации">
  
Главная страница

<image src="https://imgur.com/pdKH5bm.jpg" alt="Главная страница">

Главная страница с применением фильтра

<image src="https://imgur.com/1j9cunn.jpg" alt="Главная страница с применением фильтра">

Страница фильма

<image src="https://imgur.com/9agQAjW.jpg" alt="Страница фильма">

Выставление оценок

<image src="https://imgur.com/gdvxAFR.jpg" alt="Выставление оценки">

Действия пользователей к выбранному фильму

<image src="https://imgur.com/fnZlQ6O.jpg" alt="Действия пользователей к выбранному фильму">

Профиль пользователя

<image src="https://imgur.com/v4zbZw2.jpg" alt="Профиль пользователя">
