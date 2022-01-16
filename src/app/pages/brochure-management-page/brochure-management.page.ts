import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { ConvertNumberToFileType, FileType } from 'src/app/consts/enums';
import { NAVIGATION_ROUTE } from 'src/app/consts/navigation';
import { CardLoaderDirective } from 'src/app/directives/card-loader.directive';
import { BaseResponse, PageInfo } from 'src/app/models/base-model';
import { BrochureInfo } from 'src/app/models/brochure/brochure-info';
import { BrochureService } from 'src/app/services/brochure/brochure-service';
import { ToastService } from 'src/app/services/common/toastr-service';

@Component({
  templateUrl: './brochure-management.page.html'
})
export class BrochureManagementPage implements AfterViewInit {
  //Publics
  public brochures: Array<BrochureInfo>
  public showStatusAddBrochureModal: boolean = false;
  public forEditBrochure: BrochureInfo | undefined;
  public get totalBrochureCount(): number {
    return this.brochures?.filter(i => i.Brochure.IsActive).length ?? 0;
  };
  public pageInfo: PageInfo = new PageInfo(1, 10);
  public fileType = FileType;
  // View children
  @ViewChild(CardLoaderDirective)
  public cardLoaderDirective: CardLoaderDirective;
  constructor(private _brochureService: BrochureService, private _toastService: ToastService, private _router: Router) { }

  ngAfterViewInit(): void {
    this.getBrochures();
  }

  navigateBrochureAssignedUsers(e: any) {
    this._router.navigate([NAVIGATION_ROUTE.ROUTE_BROCHURE_USER_MANAGEMENT.Route.replace(':id', e)]);
  }

  getBrochures() {
    this.cardLoaderDirective.start();
    this._brochureService
      .listBrochures(this.pageInfo)
      .pipe(finalize(() => this.cardLoaderDirective.stop()))
      .subscribe(
        (i) => {
          if (i && i.length > 0) {
            this.brochures = i;
          }
          else {
            this.brochures = new Array<BrochureInfo>();
          }
          this.setPageInfo(this._brochureService.getResponse());
        });
  }

  toggleBrochureStatus(id: number) {
    let toast = this._toastService.continuing("Broşür durumu güncelleniyor.", "Broşür durumu değiştirildi.", "Broşür güncellenemedi.");
    this.cardLoaderDirective.start();
    this._brochureService
      .toggleBrochureStatus(id)
      .pipe(finalize(() => this.cardLoaderDirective.stop()))
      .subscribe(
        (i) => {
          if (i) {
            let brochure = this.brochures.find(i => i.Brochure.Id == id);
            if (brochure) {
              brochure.Brochure.IsActive = !brochure.Brochure.IsActive;
              this._changeDetectionRef.detectChanges();
              toast.success();
            }
            else {
              toast.error("Broşür bulunamadı");
            }
          }
        });
  }

  showAddBrochureModal(e?: BrochureInfo) {
    if (e?.Document) {
      e.Brochure.File = { Url: e.Document.HostFullPath, IsChanged: false, Type: ConvertNumberToFileType(e.Document.Type) };
      this.forEditBrochure = e;
      this.showStatusAddBrochureModal = true;
    }
    else {
      this.forEditBrochure = e;
      this.showStatusAddBrochureModal = true;
    }
  }

  onBrochureUpdated(val: any) {
    if (val && val instanceof BrochureInfo) {
      let brochureIndex = this.brochures.findIndex(i => i.Brochure.Id == val.Brochure.Id)
      if (brochureIndex >= 0) {
        this.brochures[brochureIndex] = val;
      }
      else {
        this.brochures.unshift(val);
      }
    }
  }

  onPageInfoChanged(pageInfo: PageInfo) {
    this.pageInfo = pageInfo;
    this.getBrochures();
  }

  setPageInfo(response: BaseResponse) {
    this.pageInfo.Page = response.Result.PageInfo.Page;
    this.pageInfo.PageSize = response.Result.PageInfo.PageSize;
    this.pageInfo.TotalPage = response.Result.PageInfo.TotalPage;
    this.pageInfo.TotalCount = response.Result.PageInfo.TotalCount;
  }

  getDocumentType(value: number): FileType {
    return ConvertNumberToFileType(value);
  }
}