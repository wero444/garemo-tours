import { Hero } from 'src/components/hero/views/hero'
import { About } from 'src/components/about/views/about'
import { Divider } from 'src/components/divider/views/divider'
import { Founders } from 'src/components/founders/views/founders'
import { Tours } from 'src/components/tours/views/tours'
import { Travel } from 'src/components/travel/views/travel'
import { Gallery } from 'src/components/gallery/views/gallery'
import { Letters } from 'src/components/letters/views/letters'

const Home = () => {
  return (
    <main className='flex flex-1 flex-col'>
      <Hero />
      <About />
      <Divider />
      <Founders />
      <Tours />
      <Travel />
      <Gallery />
      <Divider icon='puri' />
      <Letters />
    </main>
  )
}

export default Home
