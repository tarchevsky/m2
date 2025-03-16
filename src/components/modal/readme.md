# Modal

Базовый компонент. Написан изначально для оповещений после удачной отправки форм связи.

## Добавление в форму

Над return

```tsx
const modalRef = useRef<ModalHandle>(null)

	const showModal = () => {
		if (modalRef.current) {
			modalRef.current.showModal()
		}
	}
```

Импорт

```tsx
import Modal from '@/components/modal/Modal'
import { ModalHandle } from '@/components/modal/Modal.types'
```

В form обязательно должен быть onSubmit

```tsx
<form onSubmit={handleSubmit(onSubmit)}
      className='w-full flex flex-col gap-6'
>
```

А ниже тега form перед закрывающим фрагментом

```tsx
<Modal
    ref={modalRef}
    message='Ваше обращение отправлено! Спасибо за проявленный интерес!'
/>
```

## Добавление к любой кнопке, ссылке

Над return

```tsx
const modalRef = useRef<ModalHandle>(null);

  const handleButtonClick = () => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };
```

И внутри компонента

```tsx
<Modal
        ref={modalRef}
        message="Это сообщение в модальном окне!"
      />
```

Если в модальное окно нужно добавить больше контента, а message не нужен, его можно не добавлять, а к modal надо добавить парный тег

```tsx
<Modal ref={modalRef}>
    <div>Контент</div>
</Modal>
```