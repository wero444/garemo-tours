export const Words = ({ text, className, chars }: { text: string, className: string, chars?: boolean }) => (
  <span aria-hidden>
    {text.split(' ').map((word, i, words) => (
      <span key={i} className='inline-block overflow-hidden pb-0.5 align-bottom'>
        {chars
          ? word.split('').map((char, j) => (
            <span key={j} className={`${className} inline-block`}>{char}</span>
          ))
          : <span className={`${className} inline-block`}>{word}</span>}
        {i < words.length - 1 && <span className='inline-block'>&nbsp;</span>}
      </span>
    ))}
  </span>
)
