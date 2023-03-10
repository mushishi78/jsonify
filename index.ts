import { Buffer } from 'buffer'

export function jsonify(value: unknown) {
  return JSON.stringify(value, replacer)
}

function replacer(key: string, value: unknown) {
  if (value instanceof Map) {
    const tuples: Array<[unknown, unknown]> = []

    for (const [k, v] of value) {
      tuples.push([k, replacer(k, v)])
    }

    return tuples
  }

  if (value instanceof ArrayBuffer) {
    return Buffer.from(value).toString('base64url')
  }

  return value
}
