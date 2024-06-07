import { Component, OnInit  } from '@angular/core';
import { CustomerService } from 'src/app/services/admin/customer.service';
import { OrderService } from 'src/app/services/admin/order.service';
import Chart from 'chart.js/auto';
import { forkJoin } from 'rxjs';
import { ProductsService } from 'src/app/services/admin/products.service';


@Component({
  selector: 'app-dashbroad',
  templateUrl: './dashbroad.component.html',
  styleUrls: ['./dashbroad.component.css']
})
export class DashbroadComponent implements OnInit {
  Title:any;
  orders: any[] = []; 
  p: number=1;
  TotalOrder: number = 0;
  orderCount:number =0;
  CountOrder: number =0;
  customer: any[]= [];
  totalCus: number =0;
  weeklySalesData: number[] = new Array(7).fill(0);
  monthlySalesData: any[] = new Array(12).fill(0);
  yearlySalesData: any[] = []; 
  admin: any;
  Inventory: any;
  


  constructor(private order:OrderService, private cus: CustomerService, private pro:ProductsService){ }

  ngOnInit(){
    this.logined();
    
    this.getallOrder();
    this.order.getToTalOrders().subscribe((res: any)=>{
      this.TotalOrder =res.total
    });
    this.cus.getall().subscribe((res: any)=>{
      this.customer =res
      const totalCustomers = this.customer.length;
      this.totalCus =totalCustomers
    });
    // kho
    this.pro.getInventory().subscribe((res:any)=>{
      this.Inventory =res
    });

    this.getWeeklyStatistics();
    this.getMonthlyStatistics();
    this.getYearlyStatistics();
  }
  logined(){
    let storage =sessionStorage.getItem('adminInfo')
    if(storage){
      this.admin = JSON.parse(storage);
    }
  }

  // Thongke theo tuần

  getWeeklyStatistics(): void {
    const weekdays = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ Nhật'];
    this.weeklySalesData = new Array(7).fill(0);
  
    const requests = [];
    for (let specific_value = 2; specific_value <= 8; specific_value++) {
      requests.push(this.order.getSalesStatistics('weekday', specific_value));
    }
  
    forkJoin(requests).subscribe((responses: any[]) => {
      responses.forEach((data: any[], index: number) => { 
        let totalSalesForDay = 0;
        data.forEach((item: any) => {
          totalSalesForDay += item.total_sales / 1000; 
         
        });
        this.weeklySalesData[index] = totalSalesForDay;
      });
      this.createWeeklyChart(weekdays, this.weeklySalesData);
    });
  }
  
  
  
  
  
  // theo tháng 
  getMonthlyStatistics(): void {
    const months = ["tháng1", "Tháng2", "Tháng3", "Tháng4", "Tháng5", "Tháng6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"];
    const currentYear = new Date().getFullYear(); 
  
    months.forEach((month, index) => {
      const specific_value = new Date(currentYear, index).getTime() / 1000; 
      this.order.getSalesStatistics('month', specific_value).subscribe(data => {
        data.forEach((item: any)=>{
          this.monthlySalesData[index] += item.total_sales / 1000;
        })
        
        if (index === months.length - 1) {
          this.createMonthlyChart(months, this.monthlySalesData);
        }
      });
    });
  }

  // theo năm
  getYearlyStatistics(): void {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 5 }, (_, i) => currentYear + i);
  
    Promise.all(
      years.map(year => this.order.getSalesStatistics('year', year).toPromise())
    ).then(dataArray => {
      dataArray.forEach((data, index) => {
        const yearlyTotalSales = data.reduce((total:any, item: any) => 
          total + item.total_sales / 1000, 0);
        this.yearlySalesData[index] = yearlyTotalSales;
      });
  
      this.createYearChart(years.map(String), this.yearlySalesData);
    }).catch(error => {
      console.error('Lỗi khi lấy dữ liệu năm:', error);
    });
  }
  
  // Chart js
  createWeeklyChart(labels: string[], data: number[]) {
    const ctx = document.getElementById("weeklySalesChart") as HTMLCanvasElement;
    const existingChart = Chart.getChart(ctx); 

    if (existingChart) {
        existingChart.destroy(); 
    }

    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Doanh số tuần',
          data: data,
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
}
  createMonthlyChart(labels: string[], data: number[]) {
    const ctx = document.getElementById("monthlySalesChart") as HTMLCanvasElement;
    const monthlySalesChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Thống kê tháng',
          data: data,
          fill: false,
          borderColor: 'rgba(0, 194, 146, 0.9)',
          tension: 0.4
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  createYearChart(labels: string[], data: number[]) {
    const ctx = document.getElementById("YearChart") as HTMLCanvasElement;
    const yearSalesChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Thống kê năm',
          data: data,
          fill: false,
          borderColor: 'rgba(0, 194, 146, 0.9)',
          tension: 0.4
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  
  
  getallOrder() {
    this.Title = "Danh Sách order ";
  
    this.order.getOrders().subscribe((res: any) => {
      this.orders = res;
      const totalOrders = this.orders.length;
      this.CountOrder = totalOrders;
    });
   
    

  }
 
  getProductImageUrl(filename: string): string {
    return `http://localhost:3000/image/getproductimage/${filename}`;
    
  }
  
}
