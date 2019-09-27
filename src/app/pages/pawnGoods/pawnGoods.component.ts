import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PawnGoodsService } from 'src/app/service/pawnGoods.service';
import { NzMessageService } from 'ng-zorro-antd';

import { finalize } from 'rxjs/operators';
import * as dateFunction from 'date-fns';
import { InterestRecordService } from 'src/app/service/interestRecord.service';

@Component({
  templateUrl: './pawnGoods.component.html',
  styleUrls: ['./pawnGoods.component.css']
})
export class PawnGoodsComponent implements OnInit {

  constructor(private pawnGoodsService: PawnGoodsService, private interestRecordService: InterestRecordService,
              private msgService: NzMessageService) {
  }
  /** 是否显示 Modal 框 */
  isVisibleModal = false;
  /** 确认按钮是否显示加载动画 */
  isOkLoading = false;
  /** 抵押列表是否显示加载动画 */
  isLoadingPawnGoods = true;
  /** 是否显示右侧打水记录 */
  isShowInterestRecord = false;
  /** 抵押物品列表中是否展开明细状态数组 */
  mapOfExpandData: { [key: string]: boolean } = {};
  /** 抵押物品列表数据源 */
  lstPawnGoods = [];
  /** 当前操作抵押物品对象 */
  selectedPawnGoods = {};
  /** 查询日期范围 */
  queryDateRange = [];
  /** 最近7天打水记录 */
  lstRencentInterestRecord = [];
  /** 最近7天多少需要打水数量 */
  rencentInterestRecordCount = 0;
  queryModel = {
    pageIndex: 1,
    pageSize: 10,
    totalCount: 0,
    pawnStartDate: '',
    pawnEndDate: '',
    mortgageType: null,
    isNotSettledAndNotSaled: true
  };

  pawnGoodsFormGroup: FormGroup = new FormGroup({});

  ngOnInit() {
    this.loadPawnGoodsData();
    this.pawnGoodsFormGroup = new FormGroup({
      pawnGoodsId: new FormControl(''),
      goodsName: new FormControl('', Validators.required),
      personName: new FormControl('', Validators.required),
      goodsType: new FormControl('', Validators.required),
      mortgageType: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      goodsPrice: new FormControl('', Validators.required),
      interestAmount: new FormControl(''),
      interestCycle: new FormControl(''),
      pawnDate: new FormControl('', Validators.required),
      salePrice: new FormControl(''),
      state: new FormControl(''),
      interestRrcords: new FormControl('')
    });
    this.getRecentInterestRecord();
  }

  pageIndexChange() {
    this.loadPawnGoodsData();
  }

  showModal(): void {
    this.pawnGoodsFormGroup.reset();
    this.isVisibleModal = true;
  }

  handleOk() {
    for (const itemControlName in this.pawnGoodsFormGroup.controls) {
      if (itemControlName === null) {
        continue;
      }
      this.pawnGoodsFormGroup.controls[itemControlName].markAsDirty();
      this.pawnGoodsFormGroup.controls[itemControlName].updateValueAndValidity();
    }

    if (!this.pawnGoodsFormGroup.valid) {
      console.log('验证失败');
      return;
    }

    this.pawnGoodsService.savePawnGoods(this.pawnGoodsFormGroup.value).subscribe(resultData => {
      this.loadPawnGoodsData();
      this.msgService.create('success', '操作成功');
    },
      error => this.errorMessage(error));

    this.isVisibleModal = false;
  }

  handleCancel() {
    this.isVisibleModal = false;
  }

  goodsMortgageTypeChange(eventValue: string) {
    if (eventValue === '1') {
      this.pawnGoodsFormGroup.get('interestCycle').setValue(null);
      this.pawnGoodsFormGroup.get('interestCycle').clearValidators();
      this.pawnGoodsFormGroup.get('interestAmount').clearValidators();
    } else {
      this.pawnGoodsFormGroup.get('interestCycle').setValidators(Validators.required);
      this.pawnGoodsFormGroup.get('interestAmount').setValidators(Validators.required);
    }
  }

  loadPawnGoodsData(isResetPageIndex: boolean = false) {
    this.isLoadingPawnGoods = true;

    this.pawnGoodsService.getPawnGoods(this.queryModel)
      .pipe(finalize(() => {
        this.isLoadingPawnGoods = false;
      }))
      .subscribe(resultData => {
        if (isResetPageIndex) {
          this.queryModel.pageIndex = 1;
        }

        this.queryModel.totalCount = resultData.totalCount;
        this.lstPawnGoods = resultData.data;
      });

    this.getRecentInterestRecord();
  }

  editPawnGoods(pawnGoodsId: any) {
    this.showModal();

    this.selectedPawnGoods = this.lstPawnGoods.find(t => t.pawnGoodsId === pawnGoodsId);
    this.pawnGoodsFormGroup.setValue(this.selectedPawnGoods);

    console.log(this.pawnGoodsFormGroup.get('pawnDate').value);
  }

  removePawnGoods(pawnGoodsId: any) {
    this.pawnGoodsService.removePawnGoods(pawnGoodsId).subscribe(() => {
      this.msgService.create('success', '操作成功');
      this.loadPawnGoodsData();
    },
      error => this.errorMessage(error));
  }

  settlementPawnGoods(pawnGoodsId: any) {
    this.pawnGoodsService.settlementPawnGoods(pawnGoodsId).subscribe(() => {
      this.msgService.create('success', '操作成功');
      this.loadPawnGoodsData();
    },
      error => this.errorMessage(error));
  }

  salePawnGoods(pawnGoodsId: any) {
    this.pawnGoodsService.salePawnGoods(pawnGoodsId).subscribe(() => {
      this.msgService.create('success', '操作成功');
      this.loadPawnGoodsData();
    },
      error => this.errorMessage(error));
  }

  confimInterestAmount(interestRecord: any) {
    if (interestRecord != null) {
      this.interestRecordService.updateInterestRecord(interestRecord)
        .subscribe(() => {
          this.msgService.create('success', '操作成功');
          this.loadPawnGoodsData();
        },
          error => this.errorMessage(error));
    }
  }

  getRecentInterestRecord() {
    const queryModel = {
      payInterestStartDate: dateFunction.addDays(new Date(), -7).toDateString(),
      payInterestEndDate: dateFunction.addDays(new Date(), 7).toDateString(),
    };

    return this.interestRecordService.getInterestRecord(queryModel).subscribe(resultData => {
      this.lstRencentInterestRecord = resultData;
      this.rencentInterestRecordCount = resultData.filter(t => t.state === 0).length;
    });
  }

  queryCurrentMonth() {
    this.queryModel.pawnStartDate = dateFunction.startOfMonth(new Date()).toDateString();
    this.queryModel.pawnEndDate = dateFunction.endOfMonth(new Date()).toDateString();

    this.loadPawnGoodsData();
  }

  queryAll() {
    if (this.queryDateRange.length === 2) {
      this.queryModel.pawnStartDate = this.queryDateRange[0].toDateString();
      this.queryModel.pawnEndDate = this.queryDateRange[1].toDateString();
    } else {
      this.queryModel.pawnStartDate = '';
      this.queryModel.pawnEndDate = '';
    }

    this.loadPawnGoodsData();
  }

  errorMessage(error: any) {
    this.msgService.create('error', '操作失败');
    console.log(error);
  }

}
