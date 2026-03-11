import { ValidationError } from 'class-validator';
import { ErrorResponseInterface } from '../error-response.interface';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { ArgumentsHost } from '@nestjs/common';

// Input: ValidationError[] (from class-validator)
// [
//   {
//     property: 'email',
//     constraints: {
//       isEmail: 'email must be an email',
//       isNotEmpty: 'email should not be empty'
//     }
//   }
// ]

// Output: ErrorResponseInterface[] (our format)
//   [
//   { field: 'email', message: 'email must be an email' },
//     { field: 'email', message: 'email should not be empty' }
//   ]

export function formatInputValidationErrors(
  errors: ValidationError[],
  i18n: I18nService,
  host: ArgumentsHost,
): ErrorResponseInterface[] {
  const lang = I18nContext.current(host)?.lang || 'en';

  return errors
    .map((error: ValidationError) => {
      const constraints = error.constraints ?? {};
      const messages: string[] = Object.values(constraints);

      return messages.map((message: string): ErrorResponseInterface => {
        // Parse translation key from format: "key|{args}" or just "key"
        const [translationKey, argsJson] = message.split('|');
        let translatedMessage: string;

        try {
          const args = argsJson ? JSON.parse(argsJson) : {};
          translatedMessage = i18n.translate(translationKey, {
            lang,
            args,
          }) as string;
        } catch (e) {
          // If translation fails, use the original message
          translatedMessage = message;
        }

        return {
          field: error.property,
          message: translatedMessage,
        };
      });
    })
    .flat();
}
