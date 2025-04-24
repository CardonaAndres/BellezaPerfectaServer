import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber, IsOptional, Min, MinLength } from "class-validator";

export class CreateProductDto {
    @ApiProperty({description: 'ID único del producto'})
    @IsString({ message: 'El ID del producto debe ser una cadena de texto' })
    @MinLength(2, { message : 'El ID del producto debe tener al menos 2 caracteres' })
    product_ID: string;

    @ApiProperty({description: 'Nombre del producto'})
    @IsString({ message : 'El nombre debe ser una cadena de texto' })
    name: string;

    @ApiProperty({description: 'Descripción detallada del producto',})
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({ description: 'Precio del producto en moneda local'})
    @IsNumber()
    @Min(0)
    price: number;

    @ApiProperty({ description: 'Cantidad actual en inventario'})
    @IsNumber()
    @Min(0)
    stock: number;

    @ApiProperty({ description: 'Cantidad mínima permitida en stock antes de generar alerta' })
    @IsNumber()
    @Min(0)
    stock_min: number;

    @ApiProperty({ description: 'Porcentaje de IVA aplicado al producto' })
    @IsNumber({}, { message : 'El IVA debe ser un número' })
    @Min(0, { message : 'El IVA no puede ser negativo' })
    iva: number; // Impuesto al valor agregado

    @ApiProperty({ description: 'Unidad de medida del producto (kg, g, lb, etc.)' })
    @IsString({ message: 'La unidad de medida debe ser una cadena de texto' })
    @MinLength(2, { message : 'La unidad de medida debe tener al menos 2 caracteres' })
    unit_measure: string; // Unidad de medida (kg, g, lb, etc.)
}
