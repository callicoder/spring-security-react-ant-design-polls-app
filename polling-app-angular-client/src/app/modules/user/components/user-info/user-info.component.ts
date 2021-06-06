import { Component, Input, OnInit } from '@angular/core';
import { UserProfileInfo } from '../../../polls/models/user-profile-info';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  @Input() user: UserProfileInfo;

  constructor() {}

  ngOnInit() {}
}
