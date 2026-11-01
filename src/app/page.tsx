import { Hero } from 'src/components/hero/views/hero'
import { About } from 'src/components/about/views/about'
import { Divider } from 'src/components/divider/views/divider'
import { Tours } from 'src/components/tours/views/tours'
import { Travel } from 'src/components/travel/views/travel'
import { Gallery } from 'src/components/gallery/views/gallery'
import { Letters } from 'src/components/letters/views/letters'
import { Partners } from 'src/components/partners/views/partners'
import { Contact } from 'src/components/contact/views/contact'

const Home = () => {
  return (
    <main className='flex flex-1 flex-col'>
      <Hero />
      <About />
      <Tours />
      <Travel />
      <Gallery />
      <Divider icon='puri' />
      <Letters />
      <Partners />
      <Contact />
    </main>
  )
}

export default Home
