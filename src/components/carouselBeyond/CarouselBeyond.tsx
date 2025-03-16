import FadeIn from '../fadeIn/FadeIn'

const CarouselItems = [
  {
    id: 1,
    title: 'Какой-то заголовок',
    description: 'Какой-то текст',
  },
  {
    id: 2,
    title: 'Какой-то заголовок',
    description: 'Какой-то текст',
  },
  {
    id: 3,
    title: 'Какой-то заголовок',
    description: 'Какой-то текст',
  },
  {
    id: 4,
    title: 'Какой-то заголовок',
    description: 'Какой-то текст',
  },
  {
    id: 5,
    title: 'Какой-то заголовок',
    description: 'Какой-то текст',
  },
]

const CarouselBeyond = () => {
  return (
    <FadeIn className="ind cont carousel carousel-center gap-4 pb-6 w-full">
      {CarouselItems.map((item, id) => (
        <div
          key={id}
          className="carousel-item w-4/5 md:w-2/5 shadow-lg rounded-box bg-base-200 p-4 flex-col"
        >
          <h3 className="text-2xl font-bold">{item.title}</h3>
          <p>{item.description}</p>
        </div>
      ))}
    </FadeIn>
  )
}

export default CarouselBeyond
