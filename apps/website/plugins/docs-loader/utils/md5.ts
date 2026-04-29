import crypto from 'node:crypto'

export default function md5(input: string) {
  const hash = crypto.createHash('md5')
  return hash.update(input).digest().toString('hex').slice(-8)
}
