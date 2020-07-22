type ValidJSONPrimitives = boolean | number | string
type ValidJSON = { [key: string]: ValidJSON } | ValidJSON[] | boolean | number | string

export const stringify = (input: ValidJSON): string => {
  if (typeof input === "boolean" || typeof input === "number") return input.toString();
  if (typeof input === "string") {
    if (!input) return '""';
    input = input.replace(/\n/g, "\\n");
    return '\"' + input + '\"'
  }

  const res = []
  let openBracket: string, closeBracket: string;
  if (Array.isArray(input)) {
    for(const key in input) {
      res.push(stringify(input[key]));
    }
    openBracket = '['
    closeBracket = ']'
  } else { // is object
    for(const key in input) {
      res.push('\"' + key + '\"' + ':' + stringify(input[key]));
    }
    openBracket = '{'
    closeBracket = '}'
  }
    return openBracket + res.join(',') + closeBracket
};


// When should you use "any"?
// We use 'any' when values come from dynamic content and we'd like to opt-out of type checking and let the values pass through compile-time checks.
// You can also use it when you know some part of the type, but not all of it, ie a heterogeneous array

// When should you use "never"?
// You would use 'never' if the return type is something that is never reached. So something like an error is thrown, an error is returned, or there is no return (like an infinite loop).

// What is a literal type?
// Literal types allow for type checking against exact values. There are two types of literal types - string literals and number literals. By hard-coding these values, you can get enum-like behavior with strings/numbers
