import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { SalesReportQueryDto } from './dto/sales-report-query.dto';
import { ApiOperation } from '@nestjs/swagger';
import { errorHandler } from 'src/app/middlewares/error.handler';

@UseGuards(AuthGuard)
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('/sales-by-period/')
  @ApiOperation({ summary : 'Obtiene reporte de ventas por período' })
  async getSalesByPeriod(@Query() reportDto : SalesReportQueryDto){
    try {
      return await this.reportsService.getSalesByPeriod(reportDto);
    } catch (err) {
      errorHandler(err);
    }
  }

}
