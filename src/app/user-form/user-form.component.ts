import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {UserService} from '../user.service';
import {Router} from "@angular/router";


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  plusIconClick: Boolean = false;

  UserData: Object = {};
  taxPaidInfo : Object = {};
  
  personalInfo: Object = {};
  incomeInfo: Object = {};

  salaryIncomeInfo: Object = {};

  employerName: string = '';
  employerType: string = '';
  totalBalance: number = 0;
  salarySection17_1: number = 0;
  salarySection17_2: number = 0;
  salarySection17_3: number = 0;
  basicSalary: number = 0;
  houseRentAll: number = 0;
  leaveTravelAll: number = 0;

  exemptAllowance: number = 0;
  totalExemptInput: number = 0;
  hraExemption: number = 0;
  ltaExemption: number = 0;

  totalBasic: number = 0;
  totalAmount: number = 0;

  deductionSection16_1: number = 0;
  deductionSection16_2: number = 0;
  totalDeductions:number = 0;

  firstName: string = '';
  lastName: string = '';
  gender: string = '';
  DOB: string = '';
  PAN: string = '';
  fatherName: string = '';

  grossSalary: Number = 0;
  balance: Number = 0;
  deductionSection16: Number = 0;

  section80CDeductions: Number = 0;
  section80TTADeductions: Number = 0;
  section80GDeductions: Number = 0;

  deductorTan: Number = 0;
  deductorName : string = '';
  tdsCertificateNumber : Number = 0;
  totalTaxDeducted : Number = 0;
  taxDeductedThisYear: Number = 0;
  IncomeTdsDeduction : Number = 0;

  savepi: Boolean = false;
  saveincome: Boolean  = false;
  savedeductions: Boolean = false;
  savetaxespaid:  Boolean = false;

  otherIncomeInfo: Object = {};

  savingInterest: number = 0;
  fdInterest: number = 0;
  itrInterest: number = 0;
  otherInterest: number = 0;

  exemptIncome: Object = {};

  dividendEarned: number = 0;
  exemptInterest: number = 0;
  otherMiscExempt: number = 0;

  saveOtherIncome(){
    this.otherIncomeInfo['savingInterest'] = this.savingInterest;
    this.otherIncomeInfo['fdInterest'] = this.fdInterest;
    this.otherIncomeInfo['itrInterest'] = this.itrInterest;
    this.otherIncomeInfo['otherInterest'] = this.otherInterest;

    this.exemptIncome['dividendEarned'] = this.dividendEarned;
    this.exemptIncome['exemptInterest'] = this.exemptInterest;
    this.exemptIncome['otherMiscExempt'] = this.otherMiscExempt;

    this.otherIncomeInfo['exemptIncome'] = this.exemptIncome;

    this.incomeInfo['otherIncomeInfo'] = this.otherIncomeInfo;
    this.UserData['incomeInfo'] = this.incomeInfo;

   
    

  }
  ngOnInit() {

    this.getUserDataIfSaved();
  }
  data: any[];
  userId: string;
  flag: Boolean;
  getUserDataIfSaved(){
    
    
    this.userService.getUserDetails().subscribe((res: any[]) => {
    let value = this.userService.getUserIdAndFlag();
    this.data = res.filter(d => d._id == value.userId);
  
    console.log(this.data);

    if(this.data && !value.flag){
      if(this.data[0].personalInfo){
        this.UserData['personalInfo'] = this.data[0].personalInfo;
      }
      if(this.data[0].incomeInfo){
        this.UserData['incomeInfo'] = this.data[0].incomeInfo;
      }
      if(this.data[0].deductionsInfo){
        this.UserData['deductionsInfo'] = this.data[0].deductionsInfo;
      }
    }

    this.flag = value.flag;
    if(this.data && !value.flag){
      this.firstName = this.data[0].personalInfo.firstName;
      this.lastName = this.data[0].personalInfo.lastName;
      this.PAN = this.data[0].personalInfo.PAN;
      this.gender = this.data[0].personalInfo.gender;
      this.fatherName = this.data[0].personalInfo.fatherName;
    }
    if(this.data && !value.flag && this.data[0].incomeInfo){
      if(this.data[0].incomeInfo.salaryIncomeInfo){
        var temp = this.data[0].incomeInfo.salaryIncomeInfo;
        if(temp.salarySection17_1){
          this.salarySection17_1 = temp.salarySection17_1;
        }
        else{
          this.basicSalary = temp.basicSalary;
          this.houseRentAll = temp.houseRentAll;
          this.leaveTravelAll = temp.leaveTravelAll;
        }
        if(temp.totalExemptInput){
          this.totalExemptInput = temp.totalExemptInput;
        }
        else{
          this.hraExemption = temp.hraExemption;
          this.ltaExemption = temp.ltaExemption;
        }
        this.deductionSection16_1 = temp.deductionSection16_1;
        this.deductionSection16_2 = temp.deductionSection16_2;
      }
      
    }
  });
  }
  savePI(){
    // console.log(this.grossSalary);
    
    this.personalInfo['firstName'] = this.firstName;
    this.personalInfo['lastName'] = this.lastName;
    this.personalInfo['gender'] = this.gender;
    this.personalInfo['DOB'] = this.DOB;
    this.personalInfo['PAN'] = this.PAN;
    this.personalInfo['fatherName'] = this.fatherName;
    this.UserData['personalInfo'] = this.personalInfo;

   

    this.savepi = true;
    
  }
 
  saveIncomeInfo(){
    this.incomeInfo['grossSalary'] = this.grossSalary;
    this.incomeInfo['exemptAllowance'] = this.exemptAllowance;
    this.incomeInfo['balance'] = this.balance;
    this.incomeInfo['deductionSection16'] = this.deductionSection16;
    this.UserData['incomeInfo'] = this.incomeInfo;
   

    this.savepi = true;
    if(this.data && !this.flag){
      this.userService.updateDatabase(this.UserData).subscribe((res: any[]) => {
        console.log(res);
      })
    }
    
  }

  saveSalaryIncomeInfo(){
    if(this.plusIconClick){
      this.salaryIncomeInfo['salarySection17_1'] = this.salarySection17_1;
    }
    else{
      this.salaryIncomeInfo['basicSalary'] = this.basicSalary;
      this.salaryIncomeInfo['houseRentAll'] = this.houseRentAll;
      this.salaryIncomeInfo['leaveTravelAll'] = this.leaveTravelAll;
    }

    this.salaryIncomeInfo['salarySection17_2'] = this.salarySection17_2;
    this.salaryIncomeInfo['salarySection17_3'] = this.salarySection17_3;

    if(!this.plusIconClickExempt){
      this.salaryIncomeInfo['totalExemptInput'] = this.totalExemptInput;
    }
    else{
      this.salaryIncomeInfo['hraExemption'] = this.hraExemption;
      this.salaryIncomeInfo['ltaExemption'] = this.ltaExemption;

    }
    
    this.salaryIncomeInfo['totalBalance'] = this.totalBalance;

    this.salaryIncomeInfo['deductionSection16_1'] = this.deductionSection16_1;
    this.salaryIncomeInfo['deductionSection16_2'] = this.deductionSection16_2;

    this.salaryIncomeInfo['totalDeductions'] = this.totalDeductions;

    this.salaryIncomeInfo['chargeableAmount'] = this.totalBalance - this.totalDeductions;

    this.incomeInfo['salaryIncomeInfo'] = this.salaryIncomeInfo;
    this.UserData['incomeInfo'] = this.incomeInfo;
    
   

    this.saveincome = true;
    
    
  }

  deductionsInfo: Object = {};
  saveDeductions(){
 
    this.deductionsInfo['section80TTADeductions'] = this.section80TTADeductions;
    this.deductionsInfo['section80CDeductions'] = this.section80CDeductions;
    this.deductionsInfo['section80GDeductions'] = this.section80GDeductions;
    this.UserData['deductionsInfo'] = this.deductionsInfo;

    this.savedeductions = true;

   

    
  }

  saveTaxesPaid(){
    this.taxPaidInfo['deductorTan'] = this.deductorTan;
    this.taxPaidInfo['deductorName'] = this.deductorName;
    this.taxPaidInfo['tdsCertificateNumber'] = this.tdsCertificateNumber;
    this.taxPaidInfo['totalTaxDeducted'] = this.totalTaxDeducted;
    this.taxPaidInfo['taxDeductedThisYear'] = this.taxDeductedThisYear;
    this.taxPaidInfo['IncomeTdsDeduction'] = this.IncomeTdsDeduction;

    this.UserData['taxPaidInfo'] = this.taxPaidInfo;
    this.savetaxespaid = true;
   

    
  }

  saveEnteredData(){
    // this.savePI();
    // this.saveHouseDetails();
    // this.saveOtherIncome();
    // this.saveSalaryIncomeInfo();
    // this.saveTaxesPaid();
    // this.saveDeductions();
    console.log(this.UserData)
    
    if(confirm('Data that you have not saved, will be lost.')){
      this.router.navigate(['/home']);

      this.userService.updateDatabase(this.UserData).subscribe((res: any) => {
        console.log(res);
        
      })
    }
  }

  submit(){
    // this.router.navigate(['/loading']);
    
   
    if(confirm('Data that you have not saved, will be lost.')){
      this.router.navigate(['/home']);

      this.userService.addUser(this.UserData).subscribe((res: any[]) => {
        console.log(res);
        
      })
    }
    
  }

  goBack(){
    this.router.navigate(['/home']);
   
  }

  onExpandBtnClick(){
    this.plusIconClick = !this.plusIconClick; 
    this.calculateSum();  
  }

  calculateSum(){
    if(this.plusIconClick){
      this.totalBasic = this.basicSalary + this.houseRentAll + this.leaveTravelAll;
      this.totalAmount = this.totalBasic + this.salarySection17_2 + this.salarySection17_3;
    }
    else{
      this.totalAmount = this.salarySection17_1 + this.salarySection17_2 + this.salarySection17_3;

    }

    this.totalBalance = this.totalAmount - this.totalExemptAmount;
  }

  plusIconClickExempt: Boolean = false;
  totalExempt: number = 0;

  totalExemptAmount: number = 0;

  onExpandBtnClickExempt(){
    this.plusIconClickExempt = !this.plusIconClickExempt;
    this.calculateExempt();
  }
  calculateExempt(){
    if(this.plusIconClickExempt){
      this.totalExempt = this.hraExemption + this.ltaExemption;
      this.totalExemptAmount = this.totalExempt;
    }

    else{
      this.totalExemptAmount = this.totalExemptInput;
    }
    this.totalBalance = this.totalAmount - this.totalExemptAmount;
  }

  totalDeduction(){
    this.totalDeductions = this.deductionSection16_1 + this.deductionSection16_2;
  }

  moreOtherIncomeClick: Boolean= false;

  houseDetails: Object = {};
  loanInterestPaid: number = 0;
  finYear: string = '';
  interestPaidConstrPeriod: number = 0;

  flatNumber: string = '';
  pincode: string = '';
  areaLocality: string = '';
  townCity: string = '';
  state: string = '';
  country: string = '';

  saveHouseDetails(){
    this.houseDetails['loanInterestPaid'] = this.loanInterestPaid;
    this.houseDetails['interestPaidConstrPeriod'] = this.interestPaidConstrPeriod;
    this.houseDetails['flatNumber'] = this.flatNumber;
    this.houseDetails['pincode'] = this.pincode;
    this.houseDetails['areaLocality'] = this.areaLocality;
    this.houseDetails['townCity'] = this.townCity;
    this.houseDetails['state'] = this.state;
    this.houseDetails['country'] = this.country;

    this.incomeInfo['houseDetails'] = this.houseDetails;
    
    this.UserData['incomeInfo'] = this.incomeInfo;
   

    
  }

}
