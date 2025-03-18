# Мой next js 14 стартер

Основан на:

daisyUi с практиками и компонентами вёрстки

## Установка, основные принципы

```shell
yarn create next-app -e https://github.com/tarchevsky/my-next
```

В качестве package manager используется bun, по крайней мере пока.

##### Вывод постов только выбранных категорий

Перечислить до объявления страницы выбранные категории

```tsx
const FEATURE_CATEGORY_IDS = ['dGVybTo1', 'dGVybTo0']
```

И сам компонент

```tsx
<PostsByCategories posts={postsByCategories} />
```

##### Проверка ISR

Вставляем на страницу под объявлением страницы

```tsx
const generationTime = recordGenerationTime('название-страницы-для-понятности')
```

И компонент

```tsx
<IsrDebugIndicator pageId="homepage" />
```

Можно проверить страницу на ревалидацию. В браузере вбиваем

```tsx
https://sitename.ru/api/revalidate?path=/&secret=123456
```

/ - это адрес страницы.

Либо ставим в компоненте

```tsx
<IsrDebugIndicator pageId={pageId} showOnlyInDevelopment={false} />
```

Либо внутри самого компонента

```tsx

```
