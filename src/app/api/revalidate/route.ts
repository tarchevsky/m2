import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

/**
 * API роут для принудительной ревалидации страниц
 *
 * Пример использования:
 * - /api/revalidate?path=/ (для главной страницы)
 * - /api/revalidate?path=/category-slug (для страницы категории)
 * - /api/revalidate?path=/category-slug/post-slug (для страницы поста)
 *
 * Можно передать секретный токен для защиты:
 * - /api/revalidate?path=/&secret=ваш_секретный_токен
 */
export async function GET(request: NextRequest) {
  // Получаем параметры запроса
  const searchParams = request.nextUrl.searchParams
  const path = searchParams.get('path')
  const secret = searchParams.get('secret')

  // Проверка секретного токена (в production рекомендуется использовать)
  // В development можно закомментировать эту проверку
  const revalidateSecret = process.env.REVALIDATE_SECRET || 'your-secret-token'
  if (secret !== revalidateSecret) {
    return NextResponse.json(
      { message: 'Неверный секретный токен' },
      { status: 401 },
    )
  }

  // Проверка наличия пути
  if (!path) {
    return NextResponse.json(
      { message: 'Отсутствует параметр path' },
      { status: 400 },
    )
  }

  try {
    // Вызов ревалидации
    revalidatePath(path)

    // Возвращаем успешный ответ
    return NextResponse.json({
      revalidated: true,
      message: `Путь ${path} успешно ревалидирован`,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    // Возвращаем ошибку, если что-то пошло не так
    return NextResponse.json(
      {
        revalidated: false,
        message: `Ошибка ревалидации: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}`,
      },
      { status: 500 },
    )
  }
}
