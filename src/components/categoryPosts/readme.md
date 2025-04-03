# Компонент catgoryPosts

Нужен для вывода постов категории.

Добавление на страницу

```tsx
<CategoryPosts categoryName={categoryData.name} posts={categoryPosts} />
```

Если не указать `categoryName={categoryData.name}` - заголовка не будет. Это полезно, когда блок нужен без заголовка.
