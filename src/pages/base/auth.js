import wepy from 'wepy';
import {getCurrentPageUrlWithArgs} from '../../util/util'

export default class auth extends wepy.page {
    async onLoad(options) {
        let cp = getCurrentPageUrlWithArgs();
        return true;
    }
}