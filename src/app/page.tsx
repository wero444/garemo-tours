import { Hero } from 'src/components/hero/views/hero'
import { About } from 'src/components/about/views/about'

const Home = () => {
  return (
    <main className='flex flex-1 flex-col'>
      <Hero />
      <About />
    </main>
  )
}

export default Home
