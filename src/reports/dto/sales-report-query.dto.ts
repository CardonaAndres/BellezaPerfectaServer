import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsOptional } from "class-validator";
import { PaginationDto } from "src/app/dto/pagination.dto";

export class SalesReportQueryDto extends PaginationDto {
    @ApiProperty({ description: 'Fecha de inicio del período (YYYY-MM-DD)' })
    @IsDateString({}, { message : 'Falta la fecha de inicio' })
    startDate: string;
  
    @ApiProperty({ 
        description: 'Fecha de fin del período (YYYY-MM-DD). Si no se proporciona, se usa la fecha actual',
        required: false
      })
    @IsDateString()
    @IsOptional()
    endDate?: string; 
  }
  