import { Injectable } from "@angular/core";



@Injectable()
export class FooterService {
    private isFooterDisplayed: boolean;

    /**
     * Creates an instance of BaseService.
     */
    constructor() {
    }

    getIsFooterDisplayed() {
        return this.isFooterDisplayed;
    }   

    setIsFooterDisplayed(newValue: boolean) {
        this.isFooterDisplayed = newValue;
    }
}