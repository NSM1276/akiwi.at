# Проверка заведений, ноябрь 2026: итог

Дата: 2026-11-12. Восемь агентов параллельно, только открытые источники: сайты заведений, Herold, Falter, Wolt, Lieferando, Zabihah, реестр IGGÖ, пресса. С заведениями никто не связывался. Бриф: [BRIEF.md](BRIEF.md). Я выборочно перепроверил ключевые находки: закрытие Habibi & Hawara (ORF, vienna.at), свинину в меню Pizza Mann, фразу «halal» у Antep Evi, Burgerliebe, Top Burger и Maman Paz, а также реестр IGGÖ. Всё подтвердилось.

`data/venues.js` не менялся: решения ниже принимает владелец.

## Главное

1. **Половина наших 87 записей, скорее всего, выдумана.** У 42 заведений нет никаких следов ни по названию, ни по адресу, ни по телефону. Одинаковые телефоны у разных заведений, телефоны вида «212 34 56» и домены на продажу указывают на то, что первый набор данных частично сгенерирован.
2. **9 заведений закрыты:** три Habibi & Hawara (банкротство в 2023 году), Levante City, два Pizza Mann и три Vapiano.
3. **В 13 открытых заведениях есть свинина:** Pizza Mann (3), Vapiano (7), IKO, Bao Bar, мясная лавка Radatz. Ни одно из них не заявляет халяль, им не место в халяль-гиде.
4. **У тех, что остались, неверны почти все телефоны, часы и многие адреса.** Хорошо, что эти данные на сайте уже скрыты (`data/public.js`).
5. **Сертификатов нет ни у одного ресторана в Австрии, которые можно найти в открытых источниках.** Публичный реестр есть только у IGGÖ (derislam.at), и в нём 3 предприятия, ресторанов нет. У IIDC (Traun), крупнейшего сертификатора, список клиентов закрыт. Подтвердить халяль по-настоящему можно только через письмо или визит. Это прямо подкрепляет план с письмами.

## Наши 87 заведений

| Итог | Число |
|---|---|
| Работают (из них 2 переехали) | 36 |
| Закрыты | 9 |
| Не найдены, вероятно выдуманы | 42 |

### A. Оставить и написать им в первую очередь (есть признаки халяля, работают)

| Заведение | Чем подтверждён халяль | Алкоголь |
|---|---|---|
| Antep Evi Grill Haus, Khleslplatz 5, 1120 | на своём сайте: «jede Portion frisch und halal» | нет в меню |
| Kent: Rudolfsheim (Märzstraße **39**), Ottakring (Brunnengasse 67), Brigittenau (Jägerstraße **45**) | на своём сайте: «Fleisch (halal)» | пиво и вино есть |
| Türkis: Goldschmiedgasse 4 (не Rotenturmstraße), Mariahilfer Straße **22-24**, Westbahnhof, Donauzentrum, SCS | только Zabihah; свинины в меню нет | пиво на Goldschmiedgasse |
| Burgallio, теперь Meidlinger Hauptstraße **30** | Zabihah: «partially halal», в меню есть Käsekrainer | нет в меню |
| Restaurant Pars, Lerchenfelder Straße 148 | только Zabihah | винная карта |

### B. Работают, халяль не подтверждён — уточнять письмом

Alaturka (5 филиалов: на сайте халяль не упомянут, алкоголя нет), Damla (1120), Akakiko (3: халяль нигде не заявлен, есть пиво и вино), AVA Persisch (вино, пиво), Café NIL (бар), Pizzeria Motelli (пиво, обычная пиццерия, скорее убрать).

### C. Убрать или скрыть

- **Закрыты (9):** habibi-stadt, habibi-nordbahn, habibi-siebenstern, levante-city, pizza-mann-wien-02, pizza-mann-wels, vapiano-wien-innenstadt-walfisch, vapiano-wien-leopoldstadt, vapiano-graz-murpark.
- **Свинина, не халяль (13 открытых):** все Pizza Mann и Vapiano, iko-city, baobar-1070, radatz-viktorianer.
- **Не найдены (42):** все `unclear` в [ALL-VENUES.csv](ALL-VENUES.csv), в том числе:
  - сети без единого следа: L'Emir, Mr. Bin, Damas, Damas Sweets, Derya, Liwan, Mado;
  - лишние филиалы реальных сетей: Türkis Meidling, Millennium, Linz; Akakiko Meidling, Westbahnhof, Millennium; Levante Mariahilf и Landstraße; 7 Pizza Mann; 2 Burgallio.

По каждому заведению подробности (источники, что именно неверно у нас): [g1-chains-a.md](g1-chains-a.md), [g2-chains-b.md](g2-chains-b.md), [g3-meidling.md](g3-meidling.md), [g4-vienna-restaurants.md](g4-vienna-restaurants.md), [g5-various.md](g5-various.md).

## Новые заведения: 71 (плюс 32 новых филиала известных сетей)

| Где | Файл | Сколько |
|---|---|---|
| Вена, запад и центр | [g6-new-wien-west.md](g6-new-wien-west.md) | 18 |
| Вена, восток (2, 10, 11, 20–23) | [g7-new-wien-east.md](g7-new-wien-east.md) | 21 |
| Другие земли (Salzburg 7, Innsbruck 5, Graz 5, Linz 4, Villach 4, Klagenfurt 3 и др.) | [g8-new-bundeslaender.md](g8-new-bundeslaender.md) | 32 |

Агенты не набрали 87 намеренно: места, где халяль подтверждает только одна строчка в каталоге или где в меню есть ветчина, они не добавляли.

**Сильнее всего (заведение само пишет «halal»):**
- **Вена:** Maman Paz (1190), Asala Halal Food (1080).
- **Linz:** Burgerliebe (единственное с высокой уверенностью: свой сайт, говяжий бекон, часы совпадают в 3 источниках), Alarabe.
- **Klagenfurt:** Top Burger («100 % HALAL Fleisch», но есть пиво).
- **Graz:** Aria.
- **Salzburg:** Pommes Boutique Itzling, Zaffran (адрес под вопросом), Stern Pizza.
- **Innsbruck:** Afghan Restaurant Azadi, Safran.
- **Villach:** Royal Foods.
- **Steyr:** Original Berliner Döner.

**Остальные** держатся на метке «Halal» в Wolt или Lieferando, на Zabihah или на Falter, например Chicken Plus (Falter: «alle Speisen halal»). Часы у них взяты из служб доставки, это часы доставки, а не работы зала. В восточной Вене часть адресов — общие кухни доставки, где на одном адресе работают несколько брендов.

**32 новых филиала** — это филиалы Türkis, Akakiko, Pizza Mann, Vapiano, Kent Penzing, Burgallio Patrizigasse (1210) и Levante Walfischgasse. Брать имеет смысл только Kent Penzing и, возможно, Türkis и Burgallio.

## Таблица и сырьё

- [ALL-VENUES.csv](ALL-VENUES.csv): все 190 строк одной таблицей (открывается в Excel). Колонки: статус, адрес, телефон, сайт, чем подтверждён халяль, цитата, алкоголь, свинина, часы, меню, уверенность, заметки.
- `g*.json`: полные записи с источниками и ценами. [certifiers.md](certifiers.md): сертификаторы Австрии.
- Пересобрать таблицу: `node docs/research/venues-2026-11/_merge.mjs`.

## Ограничения

- Google Maps агенты прочитать не смогли (нужен вход). Поэтому пометку «dauerhaft geschlossen» проверяли по Herold, Falter, сайтам и активности в службах доставки.
- Instagram закрыт без входа.
- «Алкоголя нет» обычно значит только «нет в меню доставки».
- Цены в основном из служб доставки, в зале они обычно ниже.
