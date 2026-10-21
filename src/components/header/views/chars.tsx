export const Chars = ({ text }: { text: string }) =>
  text.split('').map((char, i) => (
    <span key={i} className='nav-char inline-block'>{char}</span>
  ))
