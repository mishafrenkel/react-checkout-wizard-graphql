import formatString from 'format-string-by-pattern'
import cardValidator from 'card-validator'

export const numberFormat = (cardNumber) => {
  const validation = cardValidator.number(cardNumber)

  if (validation.card) {
    const length = [...validation.card.lengths].pop()
    // '11111111111111111'
    const pattern = Array(length).fill(1).join('')

    // [4, 8, 12] -> [[0, 4], [4, 8], [8, 12], [12]]
    const gaps = validation.card.gaps
      .reduce((acc, item, index, own) => {
        // first item
        if (index === 0) {
          acc.push([0, item])
        }

        // others
        else {
          acc.push([own[index - 1], item])
        }

        // last item
        if (index === own.length - 1) {
          acc.push([item])
        }

        return acc
      }, [])

      // [[0, 4], [4, 8], [8, 12], [12]] -> '1111 1111 1111 1111'
      .reduce((acc, item) => {
        acc = `${acc} ${pattern.slice(...item)}`
        return acc
      }, '')

    return formatString(gaps.trim(), cardNumber)
  }

  return formatString('1111 1111 1111 1111', cardNumber)
}

export const formatExpiry = (expiry = '') =>
  formatString('11/11', expiry)

export const formatCVV = (cardNumber = '') => (cvv = '') => {
  const validation = cardValidator.number(cardNumber)

  if (validation.card) {
    const pattern = Array(validation.card.code.size).fill(1).join('')
    return formatString(pattern, cvv)
  }

  return formatString('1111', cvv)
}

export const formatNumber = (cardNumber = '') =>
  numberFormat(cardNumber.replace(/\D+/g, ''))

export const formatYear = (expiry = '') =>
  cardValidator.expirationDate(expiry).year

export const formatMonth = (expiry = '') =>
  cardValidator.expirationDate(expiry).month

export const guessType = (cardNumber = '') => {
  const validation = cardValidator.number(cardNumber)
  if (!validation.card) {
    return null
  }
  return validation.card.type
}

