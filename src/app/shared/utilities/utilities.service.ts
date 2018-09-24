import {Injectable} from '@angular/core';
import * as moment from 'moment';
@Injectable()
export class UtilitiesService {

    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    formatDuration(duration) {
      return moment(duration).format('m:ss')
    }


}
