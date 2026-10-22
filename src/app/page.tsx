import { Hero } from 'src/components/hero/views/hero'
import { About } from 'src/components/about/views/about'
import { Divider } from 'src/components/divider/views/divider'
import { Founders } from 'src/components/founders/views/founders'

const Home = () => {
  return (
    <main className='flex flex-1 flex-col'>
      <Hero />
      <About />
      <Divider />
      <Founders />
    </main>
  )
}

export default Home
