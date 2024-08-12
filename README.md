# Mask Sensitive Info

This package provides a utility to mask sensitive information in text, such as email domains, based on predefined regular expression patterns. It can be used to replace specific email provider domains with a masked string like `xxxx`.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Examples](#examples)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Installation

To install the package, use npm:

```bash
npm install mask-sensitive-info
```

Or with Yarn:

```bash
yarn add mask-sensitive-info
```

## Usage

### Basic Usage

First, require the package in your project:

```javascript
const maskSensitiveInfo = require('mask-sensitive-info');
```

Then, you can use the `maskSensitiveInfo` function to mask specific email domains in a text:

```javascript
const sampleText = "Contact us at john.doe@gmail.com or jane.doe@yahoo.com.";
const masker = maskSensitiveInfo(); 
const result = masker.filter(sampleText);
console.log(result);  // Output: "Contact us at john.doe xxxx or jane.doe xxxx."
```

### Parameters

- **replaceText**: The text that will replace the matched patterns. Defaults to `'xxxx'`. Default: `xxxx`
- **patternNames**: An array of pattern names to specify which email domains should be masked. The names correspond to the keys in the `patterns.json` configuration file. Defaults to all patterns in `patterns.json`. Default: all filters will be applied.
- **customExpressions**: An array of custom regular expressions (as strings) that you want to apply in addition to the predefined patterns. Default: empty.

### Example

To mask all occurrences of `gmail.com` and `yahoo.com` in a string:

```javascript
const text = "Send an email to user@gmail.com or anotheruser@yahoo.com for details.";
const masker = maskSensitiveInfo({ patternNames: ['gmail', 'yahoo'] });
const maskedText = masker.filter(text);
console.log(maskedText);  // "Send an email to user xxxx or anotheruser xxxx for details."
```

To include a custom regular expression:

```javascript
const text = "Send an email to user@gmail.com or anotheruser@example.com for details.";
const customExpression = "\bexample\.com\b";
const masker = maskSensitiveInfo({ patternNames: ['gmail'], customExpressions: [customExpression] });
const maskedText = masker.filter(text);
console.log(maskedText);  // "Send an email to user xxxx or anotheruser xxxx for details."
```

Then, use it in your code:

```javascript
const customExpression = "\bexample\.com\b";
const masker = maskSensitiveInfo({ patternNames: ['example'], customExpressions: [customExpression] });
const maskedText = masker.filter(text);
```

## Examples

### Masking Multiple Providers

```javascript
const text = "Contact us at john.doe@gmail.com, jane.doe@yahoo.com, or user@outlook.com.";
const masker = maskSensitiveInfo({ patternNames: ['gmail', 'yahoo', 'outlook'] });
const maskedText = masker.filter(text);
console.log(maskedText);  // "Contact us at john.doe xxxx, jane.doe xxxx, or user xxxx."
```

### Masking a Single Provider

```javascript
const text = "For support, contact help@icloud.com.";
const masker = maskSensitiveInfo({ patternNames: ['icloud'] });
const maskedText = masker.filter(text);
console.log(maskedText);  // "For support, contact help xxxx."
```

## Testing

This package includes a set of automated tests using Jest. To run the tests, use the following command:

```bash
npm test
```

The tests will verify that the masking function works correctly for various email domains.

### Example Test

```javascript
describe('maskSensitiveInfo for gmail.com', () => {
    const sampleText = "Contact us at john.doe@gmail.com or jane.doe@gmail.com.";

    test('masks Gmail domain', () => {
        const masker = maskSensitiveInfo({ patternNames: ['gmail'] });
        const result = masker.filter(sampleText);
        expect(result).toBe("Contact us at john.doe xxxx or jane.doe xxxx.");
    });
});
```

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue with any improvements or suggestions.

### Steps to Contribute

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.
