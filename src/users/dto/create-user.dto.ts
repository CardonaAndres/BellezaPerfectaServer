import { ApiProperty } from "@nestjs/swagger";
import { Role } from "src/users/enums/roles.enum";
import { IsEmail, IsString, Length, Matches, MinLength, MaxLength, IsEnum } from 'class-validator';
import { Transform } from "class-transformer";

export class CreateUserDto {
    @ApiProperty({ description: 'El número de documento del usuario' })
    @IsString({ message: 'El número de documento debe ser una cadena de texto' })
    @Length(5, 20, { message: 'El número de documento debe tener entre 5 y 20 caracteres' })
    user_ID: string;

    @ApiProperty({ description: 'El nombre del usuario' })
    @IsString({ message: 'El nombre debe ser una cadena de texto' })
    @Matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, {
        message: 'El nombre solo puede contener letras y espacios',
    })
    @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
    @Transform(({ value }) => value.trim())
    @MaxLength(50, { message: 'El nombre no debe tener más de 50 caracteres' })
    name: string;

    @ApiProperty({ description: 'Correo del usuario' })
    @IsEmail({ 
        require_tld: true, 
        domain_specific_validation: true, 
    }, { message: 'El correo electrónico no es válido' })
    email: string;

    @ApiProperty({ description: 'El número de teléfono del usuario' })
    @Transform(({ value }) => value.trim())
    @IsString({ message: 'El número de teléfono debe ser una cadena de texto' })
    @Matches(/^\d{10}$/, { message: 'El número de teléfono debe contener exactamente 10 dígitos' })
    cellphone: string;

    @ApiProperty({ description: 'La dirección del usuario' })
    @Transform(({ value }) => value.trim())
    @IsString({ message: 'La dirección debe ser una cadena de texto' })
    @MinLength(5, { message: 'La dirección debe tener al menos 5 caracteres' })
    @MaxLength(100, { message: 'La dirección no debe tener más de 100 caracteres' })
    address: string;

    @ApiProperty({ description: 'La contraseña del usuario' })
    @IsString({ message: 'La contraseña debe ser una cadena de texto' })
    @Transform(({ value }) => value.trim())
    @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/, {
        message: 'La contraseña debe contener al menos una letra, un número y un carácter especial',
    })
    password: string;

    @ApiProperty({ description: 'El rol del usuario', enum: Role })
    @IsEnum(Role, { message: 'El rol proporcionado no es válido' })
    role_ID: number = Role.USER;
}
