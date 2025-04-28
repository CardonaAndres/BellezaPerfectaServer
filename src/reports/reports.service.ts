import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Invoice } from 'src/invoices/entities/invoice.entity';
import { Between, Repository } from 'typeorm';
import { SalesReportQueryDto } from './dto/sales-report-query.dto';
import { PaginationDto } from 'src/app/dto/pagination.dto';

@Injectable()
export class ReportsService {
    constructor(@InjectRepository(Invoice) private readonly conn : Repository<Invoice>){}

    async getSalesByPeriod(reportDto : SalesReportQueryDto){

        const { startDate, endDate, page = 1, limit = 10 } = reportDto;
        const endDateValue = endDate ? new Date(endDate) : new Date();

        // Asegurar que endDate incluya todo el día (23:59:59)
        endDateValue.setHours(23, 59, 59, 999);

        // Consulta principal para obtener ventas en el período
        const [ sales, total ] = await this.conn.findAndCount({
            where: {
                date_invoice: Between(new Date(startDate), endDateValue),
            },
            relations: ['details', 'details.product_ID'],
            take: limit,
            skip : (page - 1) * limit
        });

        const dailySales = {};
        let totalSales = 0;

        sales.forEach(invoice => {
            let dateKey: string;
            
            try {
              // Convertir cualquier valor de fecha a string simple
              if (invoice.date_invoice) {
                const dateParts = String(invoice.date_invoice).split('T')[0].split('-');
                dateKey = dateParts[0] ? dateParts.join('-') : 'fecha-inválida';
              } else {
                dateKey = 'sin-fecha';
              }
            } catch (e) {
              console.error('Error procesando fecha:', e);
              dateKey = 'error-fecha';
            }
            
            if (!dailySales[dateKey]) {
              dailySales[dateKey] = {
                date: dateKey,
                invoiceCount: 0,
                total: 0,
              };
            }
            
            dailySales[dateKey].invoiceCount += 1;
            dailySales[dateKey].total += Number(invoice.total || 0);
            totalSales += Number(invoice.total || 0);
          });

        return {
            period: {
              from: startDate,
              to: endDate || new Date().toISOString().split('T')[0],
            },
            summary: {
              totalSales,
              invoiceCount: sales.length,
              averageTicket: sales.length > 0 ? totalSales / sales.length : 0,
            },
            dailySales: Object.values(dailySales),
            rawData: sales,
            meta : {
                total,
                page,
                limit,
                last_page : Math.ceil(total / limit)
            }
          };
    }

}
