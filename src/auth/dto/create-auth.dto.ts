import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsString, MinLength, Matches } from "class-validator";

export class CreateAuthDto {
    @ApiProperty({ description: 'Documento del usuario' })
    @Transform(({ value }) => value.trim())
    @IsNotEmpty({ message: 'El documento del usuario es obligatorio' })
    @IsString({ message: 'El documento debe ser una cadena de texto' })
    user_ID: string;

    @ApiProperty({ description: 'Contraseña del usuario' })
    @Transform(({ value }) => value.trim())
    @IsString({ message: 'La contraseña debe ser una cadena de texto' })
    @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/, {
        message: 'La contraseña debe contener al menos una letra, un número y un carácter especial',
    })
    password: string;
}
