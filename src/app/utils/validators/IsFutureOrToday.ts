import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'IsFutureOrToday', async: false })
export class IsFutureOrToday implements ValidatorConstraintInterface {
  validate(date: Date, args: ValidationArguments): boolean {
    if (!(date instanceof Date)) return false;

    const today = new Date();
    today.setHours(0, 0, 0, 0); // pone la hora a 00:00

    const inputDate = new Date(date);
    inputDate.setHours(0, 0, 0, 0); // también sin hora

    return inputDate >= today; // permite hoy o después
  }

  defaultMessage(args: ValidationArguments): string {
    return 'La fecha de finalización no puede ser anterior al día de hoy.';
  }
}
