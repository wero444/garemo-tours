import { Hero } from 'src/components/hero/views/hero'
import { About } from 'src/components/about/views/about'
import { Divider } from 'src/components/divider/views/divider'
import { Founders } from 'src/components/founders/views/founders'
import { Tours } from 'src/components/tours/views/tours'
import { Travel } from 'src/components/travel/views/travel'

const Home = () => {
  return (
    <main className='flex flex-1 flex-col'>
      <Hero />
      <About />
      <Divider />
      <Founders />
      <Tours />
      <Travel />
    </main>
  )
}

export default Home
