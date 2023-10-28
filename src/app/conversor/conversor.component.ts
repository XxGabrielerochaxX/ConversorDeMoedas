import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';

interface ExchangeData {
  conversion_rates: {
    [key: string]: number;
  };
}

@Component({
  selector: 'app-conversor',
  templateUrl: './conversor.component.html',
  styleUrls: ['./conversor.component.css'],
  providers: [DatePipe],
})
export class ConversorComponent {
  amount: number = 0;
  fromCurrency: string = 'USD';
  toCurrency: string = 'EUR';
  currencies: string[] = [
    'USD', 'AED', 'AFN', 'ALL', 'AMD', 'ANG', 'AOA', 'ARS', 'AUD', 'AWG', 'AZN', 'BAM',
    'BBD', 'BDT', 'BGN', 'BHD', 'BIF', 'BMD', 'BND', 'BOB', 'BRL', 'BSD', 'BTN', 'BWP', 'BYN',
    'BZD', 'CAD', 'CDF', 'CHF', 'CLP', 'CNY', 'COP', 'CRC', 'CUP', 'CVE', 'CZK', 'DJF', 'DKK',
    'DOP', 'DZD', 'EGP', 'ERN', 'ETB', 'EUR', 'FJD', 'FKP', 'FOK', 'GBP', 'GEL', 'GGP', 'GHS',
    'GIP', 'GMD', 'GNF', 'GTQ', 'GYD', 'HKD', 'HNL', 'HRK', 'HTG', 'HUF', 'IDR', 'ILS', 'IMP',
    'INR', 'IQD', 'IRR', 'ISK', 'JEP', 'JMD', 'JOD', 'JPY', 'KES', 'KGS', 'KHR', 'KID', 'KMF',
    'KRW', 'KWD', 'KYD', 'KZT', 'LAK', 'LBP', 'LKR', 'LRD', 'LSL', 'LYD', 'MAD', 'MDL', 'MGA',
    'MKD', 'MMK', 'MNT', 'MOP', 'MRU', 'MUR', 'MVR', 'MWK', 'MXN', 'MYR', 'MZN', 'NAD', 'NGN',
    'NIO', 'NOK', 'NPR', 'NZD', 'OMR', 'PAB', 'PEN', 'PGK', 'PHP', 'PKR', 'PLN', 'PYG', 'QAR',
    'RON', 'RSD', 'RUB', 'RWF', 'SAR', 'SBD', 'SCR', 'SDG', 'SEK', 'SGD', 'SHP', 'SLE', 'SLL',
    'SOS', 'SRD', 'SSP', 'STN', 'SYP', 'SZL', 'THB', 'TJS', 'TMT', 'TND', 'TOP', 'TRY', 'TTD',
    'TVD', 'TWD', 'TZS', 'UAH', 'UGX', 'UYU', 'UZS', 'VES', 'VND', 'VUV', 'WST', 'XAF', 'XCD',
    'XDR', 'XOF', 'XPF', 'YER', 'ZAR', 'ZMW', 'ZWL',
    
  ];

  result: number = 0;
  exchangeRates: { [key: string]: number } = {};
  conversionHistory: ConversionRecord[] = [];
  isFirstLoad: boolean = true; 

  constructor(private http: HttpClient, private datePipe: DatePipe) {
    this.loadConversionHistory();
    this.fetchExchangeRates();
  }

  fetchExchangeRates() {
    const apiUrl = `https://v6.exchangerate-api.com/v6/93939b9b42da7a97609a2fc6/latest/${this.fromCurrency}`;
    this.http.get<ExchangeData>(apiUrl).subscribe(data => {
      this.exchangeRates = data.conversion_rates;
      this.convertCurrency();
    });
  }

  convertCurrency() {
    if (this.fromCurrency !== this.toCurrency) {
      const baseRate = this.exchangeRates[this.fromCurrency];
      const targetRate = this.exchangeRates[this.toCurrency];
      this.result = +(this.amount / baseRate * targetRate).toFixed(2); 
      this.saveConversion();
    } else {
      this.result = +(this.amount).toFixed(2); 
    }
  }

  saveConversion() {
    
    if (!this.isFirstLoad) {
      const date = this.datePipe.transform(new Date(), 'dd/MM/yyyy HH:mm:ss') || '';
      const conversion: ConversionRecord = {
        date: date,
        fromCurrency: this.fromCurrency,
        toCurrency: this.toCurrency,
        amount: this.amount,
        result: this.result,
        input: this.amount,
      };

      this.conversionHistory.unshift(conversion);
      localStorage.setItem('conversionHistory', JSON.stringify(this.conversionHistory));
    } else {
      this.isFirstLoad = false;
    }
  }

  loadConversionHistory() {
    const storedHistory = localStorage.getItem('conversionHistory');
    if (storedHistory) {
      this.conversionHistory = JSON.parse(storedHistory);
    }
  }

  deleteConversion(index: number) {
    this.conversionHistory.splice(index, 1);
    localStorage.setItem('conversionHistory', JSON.stringify(this.conversionHistory));
  }
}

interface ConversionRecord {
  date: string;
  fromCurrency: string;
  toCurrency: string;
  amount: number;
  result: number;
  input: number;
}
