# mask-sensitive-info

A simple JavaScript utility to mask email addresses, phone numbers and any other data considered potentially sensitive.

## Installation

```bash
npm install mask-sensitive-info
```

## Usage
```javascript
const maskSensitiveInfo = require('mask-sensitive-info');

const text = "Contact me at john.doe@example.com or 123-456-7890.";

const cleaner = maskSensitiveInfo({patternNames: ['email', 'phone']})
// Mask both email and phone numbers
const maskedText = cleaner.filter(text);
console.log(maskedText); // Output: "Contact me at xxxx or xxxx."

const cleaner = maskSensitiveInfo({patternNames: ['email']})
// Mask only email addresses
const maskedEmailsOnly = cleaner.filter(text);
console.log(maskedEmailsOnly); // Output: "Contact me at xxxx or 123-456-7890."

// Mask only phone numbers
const maskedPhonesOnly = maskSensitiveInfo({patternNames: ['email'], replaceText: '[xxxx]'});
maskedPhonesOnly.filter(text)
console.log(maskedPhonesOnly); // Output: "Contact me at [xxxx] or 123-456-7890."

const maskedEmailAndCustomsOnly = maskSensitiveInfo({patternNames: ['email'], customExpressions: ["\\b\\d{3}[-.\\s]?\\d{3}[-.\\s]?\\d{4}\\b"]});
maskedEmailAndCustomsOnly.filter(text)
console.log(maskedEmailAndCustomsOnly); // Output: "Contact me at xxxx or xxxx."

```