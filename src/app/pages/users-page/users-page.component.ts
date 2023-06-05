import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {IUser} from "../../models/user";
import {Subscription} from "rxjs";
import {UserService} from "../../services/user.service";
import {CreateAdminModalComponent} from "../../components/modals/create-admin-modal/create-admin-modal.component";

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.css']
})
export class UsersPageComponent implements OnInit, OnDestroy {
  protected users: IUser[] = [];
  protected usersSub: Subscription;
  protected deleteUsersSub: Subscription;
  @ViewChild(CreateAdminModalComponent)
  modalComponent: CreateAdminModalComponent

  constructor(protected readonly userService: UserService) {
  }

  ngOnInit(): void {
    this.usersSub = this.userService.readAll().subscribe({
      next: (users) => this.users = users,
      error: (err) => console.error(err)
    });
  }

  ngOnDestroy(): void {
    if (this.usersSub) {
      this.usersSub.unsubscribe();
    }
    if (this.deleteUsersSub) {
      this.deleteUsersSub.unsubscribe();
    }
  }

  deleteUser(user: IUser): void {
    this.deleteUsersSub = this.userService.delete(user.id).subscribe();
  }
}
