import { Component, OnInit } from 'angular-ts-decorators';
import autobind from 'autobind-decorator';
import { browser } from 'webextension-polyfill-ts';
import { PlatformService } from '../../shared/global-shared.interface';
import UtilityService from '../../shared/utility/utility.service';
import { AppEventType } from '../app.enum';
import AppHelperService from '../shared/app-helper/app-helper.service';
import { History } from 'webextension-polyfill-ts';
import { IPromise } from 'angular';

@autobind
@Component({
  controllerAs: 'vm',
  selector: 'appHistory',
  styles: [require('./app-history.component.scss')],
  template: require('./app-history.component.html')
})
export default class AppHistoryComponent implements OnInit {
  Strings = require('../../../../res/strings/en.json');

  $q: ng.IQService;
  $timeout: ng.ITimeoutService;
  appHelperSvc: AppHelperService;
  platformSvc: PlatformService;
  utilitySvc: UtilityService;
  results: History.HistoryItem[];

  syncEnabled: boolean;

  static $inject = ['$timeout', '$q', 'AppHelperService', 'PlatformService', 'UtilityService'];
  constructor(
    $timeout: ng.ITimeoutService,
    $q: ng.IQService,
    AppHelperSvc: AppHelperService,
    PlatformSvc: PlatformService,
    UtilitySvc: UtilityService
  ) {
    this.$q = $q;
    this.$timeout = $timeout;
    this.appHelperSvc = AppHelperSvc;
    this.platformSvc = PlatformSvc;
    this.utilitySvc = UtilitySvc;
  }

  close(): void {
    this.appHelperSvc.switchView();
  }

  ngOnInit(): ng.IPromise<void> {
    let startOfTheDay = new Date();
    startOfTheDay.setHours(0, 0, 0, 0);
    this.results = [{
      url: "a",
      id: "1",
      title: "b"
    }];

    return this.$q.resolve().then(() => {
      return browser.history.search({
        startTime: startOfTheDay.getTime(),
        text: ''
      })
    }).then(historyItems => {
      this.results = historyItems;
    });
  }

}
