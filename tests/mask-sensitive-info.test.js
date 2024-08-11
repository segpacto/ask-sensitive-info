const maskSensitiveInfo = require('../index');

describe('maskSensitiveInfo', () => {
    const sampleText = "Contact me at john.doe@example.com, john.doe @ example.com, or john.doe [at] example.com. Also, call me at 123-456-7890.";
    const sampleTextForEmails = "Emails: john.doe gmail.com, jane.smith yahoo.com, user outlook.com, person icloud.com, someone protonmail.com";

    test('masks email addresses', () => {
        const cleaner = maskSensitiveInfo({patternNames: ['email']});
        const result = cleaner.filter(sampleText);
        expect(result).toBe("Contact me at xxxx, xxxx, or xxxx. Also, call me at 123-456-7890.");
    });

    test('masks phone numbers', () => {
        const cleaner = maskSensitiveInfo({patternNames: ['phone']});
        const result = cleaner.filter(sampleText);
        expect(result).toBe("Contact me at john.doe@example.com, john.doe @ example.com, or john.doe [at] example.com. Also, call me at xxxx.");
    });

    test('masks international phone numbers', () => {
        const sampleTextWithInternationalPhoneNumbers = "Contact me at john.doe@example.com, john.doe @ example.com, or john.doe [at] example.com. Also, call me at +49 123-456-7890.";
        const cleaner = maskSensitiveInfo({patternNames: ['phone']});
        const result = cleaner.filter(sampleTextWithInternationalPhoneNumbers);
        expect(result).toBe("Contact me at john.doe@example.com, john.doe @ example.com, or john.doe [at] example.com. Also, call me at +xxxx.");
    });

    test('masks phone numbers without separators', () => {
        const sampleText = "Call me at +11234567890.";
        const cleaner = maskSensitiveInfo({patternNames: ['phone']});
        const result = cleaner.filter(sampleText);
        expect(result).toBe("Call me at +xxxx.");
    })

    test('masks both email addresses and phone numbers', () => {
        const cleaner = maskSensitiveInfo({patternNames: ['email', 'phone']});
        const result = cleaner.filter(sampleText);
        expect(result).toBe("Contact me at xxxx, xxxx, or xxxx. Also, call me at xxxx.");
    });

    test('apply all patterns if none are provided', () => {
        const cleaner = maskSensitiveInfo();
        const result = cleaner.filter(sampleText);
        expect(result).toBe("Contact me at xxxx, xxxx, or xxxx. Also, call me at xxxx.");
    });

    test('returns the original text if no patterns match', () => {
        const cleaner = maskSensitiveInfo({patternNames: ['email', 'phone']});
        const text = "No sensitive data here.";
        const result = cleaner.filter(text);
        
        expect(result).toBe(text);
    });

    test('returns the original text stripped out of email sensitive data and using replaceText with the provided value', () => {
        const cleaner = maskSensitiveInfo({ replaceText: '[xxxx]', patternNames: ['email']});
        const result = cleaner.filter(sampleText);
        
        expect(result).toBe("Contact me at [xxxx], [xxxx], or [xxxx]. Also, call me at 123-456-7890.");
    });

    test('returns the original text stripped out of email sensitive data and uses custom expressions', () => {
        const cleaner = maskSensitiveInfo({ replaceText: '[xxxx]', patternNames: ['email'], customExpressions: ['\\b\\d{3}[-.\\s]?\\d{3}[-.\\s]?\\d{4}\\b']});
        const result = cleaner.filter(sampleText);
        
        expect(result).toBe("Contact me at [xxxx], [xxxx], or [xxxx]. Also, call me at [xxxx].");
    });

    test('masks Gmail addresses', () => {
        const cleaner = maskSensitiveInfo({patternNames: ['gmail']})
        const result = cleaner.filter(sampleTextForEmails);
        expect(result).toBe("Emails: john.doe xxxx, jane.smith yahoo.com, user outlook.com, person icloud.com, someone protonmail.com");
    });

    test('masks Yahoo addresses', () => {
        const cleaner = maskSensitiveInfo({patternNames: ['yahoo']})
        const result = cleaner.filter(sampleTextForEmails);
        expect(result).toBe("Emails: john.doe gmail.com, jane.smith xxxx, user outlook.com, person icloud.com, someone protonmail.com");
    });

    test('masks multiple providers', () => {
        const cleaner = maskSensitiveInfo({patternNames: ['gmail', 'yahoo', 'outlook']})
        const result = cleaner.filter(sampleTextForEmails);

        expect(result).toBe("Emails: john.doe xxxx, jane.smith xxxx, user xxxx, person icloud.com, someone protonmail.com");
    });
});