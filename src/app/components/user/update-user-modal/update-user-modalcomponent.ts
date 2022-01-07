import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { VALIDATE_SELECT, VALIDATE_TEXT } from 'src/app/consts/validate';
import { CardLoaderDirective } from 'src/app/directives/card-loader.directive';
import { Helper } from 'src/app/helpers/helper';
import { UserInfo } from 'src/app/models/user/user-info';
import { UserModel } from 'src/app/models/user/user-model';
import { UserProfileModel } from 'src/app/models/user/user-profile-model';
import { UserRole } from 'src/app/models/user/user-role';
import { AuthenticationService } from 'src/app/services/authentication/authentication-service';
import { ToastService } from 'src/app/services/common/toastr-service';
import { UserService } from 'src/app/services/user/user-service';
import { UtilityService } from 'src/app/services/utility/utility-service';
import { ONgSelectComponent } from '../../shared/o-ng-select/o-ng-select.component';
import { ONgTextareaComponent } from '../../shared/o-ng-textarea/o-ng-textarea.component';

@Component({
  selector: "o-update-user-modal",
  templateUrl: './update-user-modal.component.html',
  providers: [UserService, UtilityService],
  encapsulation: ViewEncapsulation.None
})
export class UpdateUserModalComponent implements OnChanges, OnInit, AfterViewInit {
  // Inputs
  @Input()
  public userInfo?: UserInfo;
  @Input()
  public show: boolean = false;
  // Outputs
  @Output()
  public userInfoChange = new EventEmitter();
  @Output()
  public showChange = new EventEmitter();
  // Public's
  public editModel: UserInfo;
  public roles: Array<UserRole>;
  public validate = {
    text: VALIDATE_TEXT,
    select: VALIDATE_SELECT
  }
  // View children
  @ViewChild('nameElement', { static: true })
  public nameElement: ONgTextareaComponent;
  @ViewChild('surnameElement', { static: true })
  public surnameElement: ONgSelectComponent;
  @ViewChild('emailElement', { static: true })
  public emailElement: ONgSelectComponent;
  @ViewChild('passwordElement', { static: true })
  public passwordElement: ONgSelectComponent;
  @ViewChild('roleSelectElement', { static: true })
  public roleSelectElement: ONgSelectComponent;
  @ViewChild('modal', { static: true })
  public modal: ElementRef;
  @ViewChild(CardLoaderDirective)
  public cardLoaderDirective: CardLoaderDirective;
  // Privates
  constructor(
    private _toastService: ToastService,
    private _utilityService: UtilityService,
    private _authenticationService: AuthenticationService,
    private _userService: UserService) { }

  ngOnInit(): void {
    if (!this.userInfo) {
      this.userInfo = new UserInfo();
      this.userInfo.User = new UserModel();
      this.userInfo.User.Password = Helper.RandomString();
      this.userInfo.User.IsActive = true;
      this.userInfo.UserProfile = new UserProfileModel();
    }
    
    this.editModel = Helper.Clone(this.userInfo);
    this.getRoles();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.show) {
      if (changes.show.currentValue) {
        this.showModal();
      }
      if (!changes.show.currentValue) {
        this.hideModal();
      }
    }
  }

  ngAfterViewInit(): void {
    $(this.modal.nativeElement).on('hidden.bs.modal', () => {
      this.hideModal();
    })
  }

  emitChangeEvent() {
    this.userInfoChange.emit(this.userInfo);
  }

  emitShowEvent() {
    this.showChange.emit(this.show);
  }

  hideModal() {
    $(this.modal.nativeElement)
      .modal('hide');
    this.show = false;
    this.emitShowEvent();
  }

  showModal() {
    $(this.modal.nativeElement)
      .modal('show');
    this.show = true;
    this.emitShowEvent();
  }

  check() {
    return this.nameElement.check() &&
      this.surnameElement.check() &&
      this.emailElement.check() &&
      (this.passwordElement?.check() ?? true) &&
      this.roleSelectElement.check();
  }

  getSelectedRoles() {
    return this.editModel.Roles;
  }

  setRoles(e: Array<string>) {
    this.editModel.Roles = e;
  }

  save() {
    if (this.check()) {
      let toast = this._toastService.continuing("Kullanıcı ekleniyor/güncelleniyor.", "Kullanıcı ekleme/güncelleme tamamlandı.", "Kullanıcı eklenemedi.");
      this.cardLoaderDirective.start();
      this._userService
        .addUser({
          Id: this.editModel.User.Id,
          Email: this.editModel.User.Email,
          Name: this.editModel.UserProfile.Name,
          Surname: this.editModel.UserProfile.Surname,
          RoleKey: this.editModel.Roles,
          Password: this.editModel.User.Password
        })
        .pipe(finalize(() => {
          this.cardLoaderDirective.stop();
        }))
        .subscribe(
          (i) => {
            if (i) {
              this.editModel.User.Id = i;
              this.userInfo = <UserInfo>this.editModel;
              this.hideModal();
              this.emitChangeEvent();
              toast.success();
            }
          });
    }
  }

  private getRoles() {
    this._utilityService.listRoleDefinitions().subscribe(i => {
      if (i) {
        this.roles = i.filter(j => j.Priority > Math.min(...(i.filter(j => this._authenticationService.getUser()!.Roles.includes(j.Key)).map(j => j.Priority))));
      }
    });
  }
}
