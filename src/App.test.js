import * as card from './services/card'

it('formats spacings and card length per card type', () => {
  /*
   * VISA
   */
  expect(card.formatNumber('4111111111111111')).toBe('4111 1111 1111 1111')
  expect(card.formatNumber('41111111111111112')).toBe('4111 1111 1111 11112')
  expect(card.formatNumber('411111111111111123')).toBe('4111 1111 1111 111123')
  expect(card.formatNumber('4111111111111111234')).toBe('4111 1111 1111 1111234')
  // accepting max 19 chars
  expect(card.formatNumber('41111111111111112345')).toBe('4111 1111 1111 1111234')
  expect(card.formatNumber('411111111111111123456')).toBe('4111 1111 1111 1111234')

  /*
   * MASTERCARD
   */
  expect(card.formatNumber('5111111111111111')).toBe('5111 1111 1111 1111')
  expect(card.formatNumber('2720111111111111')).toBe('2720 1111 1111 1111')
  expect(card.formatNumber('2720111111111111')).toBe('2720 1111 1111 1111')
  // accepting max 16 chars
  expect(card.formatNumber('27201111111111112')).toBe('2720 1111 1111 1111')
  expect(card.formatNumber('272011111111111123')).toBe('2720 1111 1111 1111')

  /*
   * AMERICAN EXPRESS
   */
  expect(card.formatNumber('342011111111111')).toBe('3420 111111 11111')
  expect(card.formatNumber('372011111111111')).toBe('3720 111111 11111')
  // accepting max 15 chars
  expect(card.formatNumber('3720111111111112')).toBe('3720 111111 11111')
  expect(card.formatNumber('37201111111111123')).toBe('3720 111111 11111')

  /*
   * DINERS CLUB
   */
  expect(card.formatNumber('300011111111111')).toBe('3000 111111 11111')
  expect(card.formatNumber('300011111111111')).toBe('3000 111111 11111')
  expect(card.formatNumber('3000111111111112')).toBe('3000 111111 111112')
  expect(card.formatNumber('30001111111111123')).toBe('3000 111111 1111123')
  expect(card.formatNumber('3000111111111112345')).toBe('3000 111111 111112345')
  // accepting max 19 chars
  expect(card.formatNumber('30001111111111123456')).toBe('3000 111111 111112345')
  expect(card.formatNumber('300011111111111234567')).toBe('3000 111111 111112345')

  /*
   * DISCOVER
   */
  expect(card.formatNumber('6011111111111111')).toBe('6011 1111 1111 1111')
  expect(card.formatNumber('60111111111111112')).toBe('6011 1111 1111 11112')
  expect(card.formatNumber('601111111111111123')).toBe('6011 1111 1111 111123')
  expect(card.formatNumber('6011111111111111234')).toBe('6011 1111 1111 1111234')
  // accepting max 19 chars
  expect(card.formatNumber('60111111111111112345')).toBe('6011 1111 1111 1111234')
  expect(card.formatNumber('601111111111111123456')).toBe('6011 1111 1111 1111234')

  /*
   * JCB
   */
  expect(card.formatNumber('2131111111111111')).toBe('2131 1111 1111 1111')
  expect(card.formatNumber('21311111111111112')).toBe('2131 1111 1111 11112')
  expect(card.formatNumber('213111111111111123')).toBe('2131 1111 1111 111123')
  expect(card.formatNumber('2131111111111111234')).toBe('2131 1111 1111 1111234')
  // accepting max 19 chars
  expect(card.formatNumber('21311111111111112345')).toBe('2131 1111 1111 1111234')
  expect(card.formatNumber('213111111111111123456')).toBe('2131 1111 1111 1111234')

  /*
   * UNIONPAY
   */
  expect(card.formatNumber('6270111111111111')).toBe('6270 1111 1111 1111')
  expect(card.formatNumber('62701111111111112')).toBe('6270 1111 1111 11112')
  expect(card.formatNumber('627011111111111123')).toBe('6270 1111 1111 111123')
  expect(card.formatNumber('6270111111111111234')).toBe('6270 1111 1111 1111234')
  // accepting max 19 chars
  expect(card.formatNumber('62701111111111112345')).toBe('6270 1111 1111 1111234')
  expect(card.formatNumber('627011111111111123456')).toBe('6270 1111 1111 1111234')

  /*
   * MAESTRO
   */
  expect(card.formatNumber('4936981111111111')).toBe('4936 9811 1111 1111')
  expect(card.formatNumber('49369811111111112')).toBe('4936 9811 1111 11112')
  expect(card.formatNumber('493698111111111123')).toBe('4936 9811 1111 111123')
  expect(card.formatNumber('4936981111111111234')).toBe('4936 9811 1111 1111234')
  // accepting max 19 chars
  expect(card.formatNumber('49369811111111112345')).toBe('4936 9811 1111 1111234')
  expect(card.formatNumber('493698111111111123456')).toBe('4936 9811 1111 1111234')

  /*
   * ELO
   */
  expect(card.formatNumber('4011781111111111')).toBe('4011 7811 1111 1111')
  // accepting max 16 chars
  expect(card.formatNumber('40117811111111112345')).toBe('4011 7811 1111 1111')
  expect(card.formatNumber('401178111111111123456')).toBe('4011 7811 1111 1111')

  /*
   * MIR
   */
  expect(card.formatNumber('2200981111111111')).toBe('2200 9811 1111 1111')
  expect(card.formatNumber('22009811111111112')).toBe('2200 9811 1111 11112')
  expect(card.formatNumber('220098111111111123')).toBe('2200 9811 1111 111123')
  expect(card.formatNumber('2200981111111111234')).toBe('2200 9811 1111 1111234')
  // accepting max 19 chars
  expect(card.formatNumber('22009811111111112345')).toBe('2200 9811 1111 1111234')
  expect(card.formatNumber('220098111111111123456')).toBe('2200 9811 1111 1111234')

  /*
   * HIPER
   */
  expect(card.formatNumber('6370951111111111')).toBe('6370 9511 1111 1111')
  // accepting max 16 chars
  expect(card.formatNumber('63709511111111112345')).toBe('6370 9511 1111 1111')
  expect(card.formatNumber('637095111111111123456')).toBe('6370 9511 1111 1111')

  /*
   * HIPERCARD
   */
  expect(card.formatNumber('6062821111111111')).toBe('6062 8211 1111 1111')
  // accepting max 16 chars
  expect(card.formatNumber('60628211111111112345')).toBe('6062 8211 1111 1111')
  expect(card.formatNumber('606282111111111123456')).toBe('6062 8211 1111 1111')
})

it('gets correct card type per number', () => {
  expect(card.guessType('4111111111111111')).toBe('visa')
  expect(card.guessType('2221111111111111')).toBe('mastercard')
  expect(card.guessType('342111111111111')).toBe('american-express')
  expect(card.guessType('30011111111111')).toBe('diners-club')
  expect(card.guessType('6511111111111111322')).toBe('discover')
  expect(card.guessType('2131111111111111322')).toBe('jcb')
  expect(card.guessType('6201111111111111322')).toBe('unionpay')
  expect(card.guessType('5601111111111111322')).toBe('maestro')
  expect(card.guessType('4011781111111111')).toBe('elo')
  expect(card.guessType('2200781111111111')).toBe('mir')
  expect(card.guessType('6370951111111111')).toBe('hiper')
  expect(card.guessType('6062821111111111')).toBe('hipercard')
})

it('gets correct cvv code per card type', () => {
  expect(card.formatCVV('4111111111111111')('1234')).toBe('123')
  expect(card.formatCVV('2221111111111111')('1234')).toBe('123')
  expect(card.formatCVV('342111111111111')('1234')).toBe('1234')
  expect(card.formatCVV('30011111111111')('1234')).toBe('123')
  expect(card.formatCVV('6511111111111111322')('1234')).toBe('123')
  expect(card.formatCVV('2131111111111111322')('1234')).toBe('123')
  expect(card.formatCVV('6201111111111111322')('1234')).toBe('123')
  expect(card.formatCVV('5601111111111111322')('1234')).toBe('123')
  expect(card.formatCVV('4011781111111111')('1234')).toBe('123')
  expect(card.formatCVV('2200781111111111')('1234')).toBe('123')
  expect(card.formatCVV('6370951111111111')('1234')).toBe('123')
  expect(card.formatCVV('6062821111111111')('1234')).toBe('123')
})

it('formats expiry date', () => {
  expect(card.formatExpiry('11/11')).toBe('11/11')
  expect(card.formatExpiry('1111')).toBe('11/11')
  expect(card.formatExpiry('11 11')).toBe('11/11')
  expect(card.formatExpiry('11-11')).toBe('11/11')
})

it('formats year', () => {
  expect(card.formatYear('08/22')).toBe('22')
})

it('formats months', () => {
  expect(card.formatMonth('08/22')).toBe('08')
})
