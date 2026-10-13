import { Lines } from '../../shared/index.js'

// T1b "Main" variant: blocks are 1280 wide (centred inside the 1408 Main) with their own solid border.
export default function Block({ lines = 'rl', className = '', style, children, as: Tag = 'section' }) {
  return (
    <Tag className={`relative mx-auto w-full max-w-[1280px] ${className}`} style={style}>
      {children}
      {lines && <Lines sides={lines} />}
    </Tag>
  )
}
