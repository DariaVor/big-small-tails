# Хвосты и Хвостики

## Описание проекта

**Хвосты и Хвостики** — это всероссийский сервис для поиска пропавших домашних животных. Платформа предоставляет удобную систему размещения и поиска объявлений с возможностью фильтрации и модерации, что помогает владельцам быстро находить своих питомцев.

### Основные функции:

- **Создание объявления:** Быстрое размещение информации о пропавшем или найденном животном.
- **Фильтрация объявлений:** Поиск объявлений по различным параметрам, включая местоположение, вид животного, дата пропажи/находки.
- **Личный кабинет:** Управление объявлениями пользователей с возможностью редактирования и удаления.
- **Модерация:** Система проверки и утверждения объявлений для поддержания актуальности и достоверности данных.
- **Загрузка изображений:** Поддержка загрузки и обработки изображений с использованием технологий Multer и Sharp.
- **Защита данных:** Реализация системы аутентификации и авторизации с использованием JWT для безопасности пользователей.

### Технологический стек:
- **Frontend:** React, Redux, React Router, TypeScript, Material Tailwind
- **Backend:** Node.js, Express, Sequelize, JWT, Multer, Limiter, Sharp
- **Database:** PostgreSQL

## Установка и настройка

1. **Клонирование репозитория:**
    ```bash
    git clone git@github.com:DariaVor/big-small-tails.git
    cd big-small-tails
    ```

2. **Запуск backend:**
    ```bash
    cd server
    npm install
    npm run db:reset
    npm run dev
    ```

3. **Запуск frontend:**
    ```bash
    cd client
    npm install
    npm run dev
    ```

## Использование

### Создание объявления

1. Перейдите в личный кабинет или на главную страницу для добавления объявления.
2. Заполните форму, указав всю необходимую информацию и загрузите фото питомца.

### Поиск объявлений

1. Используйте фильтры для поиска объявлений по заданным критериям (например, тип животного, регион).
2. Просматривайте подробную информацию и фото найденных/пропавших животных.

### Модерация объявлений

1. Если вы являетесь модератором, перейдите в раздел модерации.
2. Проверьте новые объявления и утвердите или отклоните их в зависимости от соответствия правилам платформы.

