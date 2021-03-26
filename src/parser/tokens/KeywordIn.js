import { Keywords, TokenTypes } from '../../constants'

const REGEX_KEYWORD_IN_TEST = new RegExp(`^${Keywords.IN}([^a-zA-Z0-9_]|$)`)

const KeywordIn = {
  parse: () => ({
    length: Keywords.IN.length,
    type: TokenTypes.KEYWORD_IN,
    value: Keywords.IN
  }),
  test: (context, data) => REGEX_KEYWORD_IN_TEST.test(data)
}

export default KeywordIn
