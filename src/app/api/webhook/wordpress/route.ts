import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

/**
 * API-роут для вебхуков из WordPress для автоматической ревалидации
 *
 * Вебхук нужно настроить в WordPress для вызова этого URL при обновлении контента
 * Например, можно использовать плагин WP Webhooks
 */
export async function POST(request: NextRequest) {
  try {
    // Проверка авторизации
    const authHeader = request.headers.get('authorization')
    const validSecret = process.env.REVALIDATE_SECRET || 'your-secret-token'

    // Проверка формата: "Bearer ваш_секретный_ключ"
    if (
      !authHeader ||
      !authHeader.startsWith('Bearer ') ||
      authHeader.split(' ')[1] !== validSecret
    ) {
      return NextResponse.json(
        { success: false, message: 'Неверный токен авторизации' },
        { status: 401 },
      )
    }

    // Получаем данные из запроса
    const requestData = await request.json()

    // Определяем, какие пути нужно ревалидировать
    // В зависимости от данных из WordPress
    const paths: string[] = []

    // Ревалидация главной страницы всегда
    paths.push('/')

    // Если обновлен пост или страница
    if (requestData.post_type === 'post' && requestData.post_slug) {
      // Если есть категория
      if (requestData.category_slug) {
        paths.push(`/${requestData.category_slug}`)
        paths.push(`/${requestData.category_slug}/${requestData.post_slug}`)
      } else {
        // Ревалидируем все категории, так как неизвестно, в какой находится пост
        paths.push('/[category]')
      }
    }

    // Если обновлена категория
    if (requestData.taxonomy === 'category' && requestData.term_slug) {
      paths.push(`/${requestData.term_slug}`)
    }

    // Ревалидируем все определенные пути
    const results = paths.map((path) => {
      try {
        revalidatePath(path)
        return { path, success: true }
      } catch (error) {
        return {
          path,
          success: false,
          error: error instanceof Error ? error.message : 'Неизвестная ошибка',
        }
      }
    })

    // Возвращаем результаты
    return NextResponse.json({
      success: true,
      revalidated: results,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    // Обработка ошибок
    return NextResponse.json(
      {
        success: false,
        message: `Ошибка в обработке вебхука: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}`,
      },
      { status: 500 },
    )
  }
}
