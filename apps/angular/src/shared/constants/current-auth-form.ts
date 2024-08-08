import { BehaviorSubject } from 'rxjs';

import { CurrentForm } from './current-auth-form-enum';

/** Current form. */
export const CURRENT_AUTH_FORM$ = new BehaviorSubject<CurrentForm>(CurrentForm.Login);
