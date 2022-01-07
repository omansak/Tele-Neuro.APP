import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { CardLoaderDirective } from 'src/app/directives/card-loader.directive';
import { Helper } from 'src/app/helpers/helper';
import { GenericBaseFilterModel, OrderType } from 'src/app/models/base-filter-model';
import { BaseResponse, PageInfo } from 'src/app/models/base-model';
import { UserInfo } from 'src/app/models/user/user-info';
import { ToastService } from 'src/app/services/common/toastr-service';
import { UserService } from 'src/app/services/user/user-service';

@Component({
  templateUrl: './user-management.page.html',
  providers: [UserService]
})
export class UserManagementPage implements AfterViewInit {
  //Publics
  public pageInfo: PageInfo = new PageInfo(1, 10);
  public users: Array<UserInfo>;
  public showStatusUpdateUserInfoModal: boolean = false;
  public forEditUserInfo: UserInfo | undefined;
  // View children
  @ViewChild(CardLoaderDirective)
  public cardLoaderDirective: CardLoaderDirective;

  constructor(private _toastService: ToastService, private _userService: UserService) { }

  ngAfterViewInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.cardLoaderDirective.start();

    let model = new GenericBaseFilterModel<UserInfo>()
      .setPaging(this.pageInfo.PageSize, (this.pageInfo.Page - 1) * this.pageInfo.PageSize)
      .addSort(i => i.User.CreatedDate, OrderType.Descending)
      .toBaseFilterModel();
      
    this._userService.listFilterUsers(model)
      .pipe(finalize(() => this.cardLoaderDirective.stop()))
      .subscribe(i => {
        if (i && i.length > 0) {
          this.users = i;
        }
        this.setPageInfo(this._userService.getResponse());
      });
  }

  join(arr: string[]) {
    return Helper.Join(arr, ",");
  }

  onUserInfoUpdated(val: any) {
    if (val && val instanceof UserInfo) {
      let idx = this.users.findIndex(i => i.User.Id == val.User.Id)
      if (idx >= 0) {
        this.users[idx] = val;
      }
      else {
        this.users.unshift(val);
      }
    }
  }

  toggleUserStatus(e: number) {
    if (e > 0) {
      let toast = this._toastService.continuing("Kullanıcı durumu güncelleniyor.", "Kullanıcı durumu değiştirildi.", "Kullanıcı güncellenemedi.");
      this.cardLoaderDirective.start();
      this._userService.toggleUserStatus(e)
        .pipe(finalize(() => this.cardLoaderDirective.stop()))
        .subscribe(i => {
          if (i) {
            let user = this.users.find(i => i.User.Id == e);
            if (user) {
              user.User.IsActive = !user.User.IsActive
              toast.success();
              return;
            }
          }
          toast.error();
        });
    }
  }
  showUpdateUserInfoModal(e?: any) {
    this.forEditUserInfo = e;
    this.showStatusUpdateUserInfoModal = true;
  }

  onPageInfoChanged(pageInfo: PageInfo) {
    this.pageInfo = pageInfo;
    this.getUsers();
  }

  setPageInfo(response: BaseResponse) {
    this.pageInfo.Page = response.Result.PageInfo.Page;
    this.pageInfo.PageSize = response.Result.PageInfo.PageSize;
    this.pageInfo.TotalPage = response.Result.PageInfo.TotalPage;
    this.pageInfo.TotalCount = response.Result.PageInfo.TotalCount;
  }
}