# StarPets:

## Требования
- Node.js **20+**
- npm **10+**

## Старт:

```bash
git clone git@github.com:nmvalx1/StarPets.git
cd StarPets

cp .env.example .env
npm ci

npm run test:api ##запускает только апи тесты
npm run test:ui ##запуск только ui тестов
npm run test:ui-mode ##запускает браузер playwright
```

.env в git не попадает — без него `API_BASE_URL` пустой и тесты упадут

## Примечания

- JSONPlaceholder не валидирует поля и не поддерживает auth/идемпотентность 
