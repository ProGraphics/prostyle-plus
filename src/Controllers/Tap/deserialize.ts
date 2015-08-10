/// <reference path="TapController.ts" />

module ProStyle.Extensions.Controllers.Tap {

    export function deserialize(json: any): TapController {

        return new TapController(json.playbuttonSizes, json.rowSizes, json.cursors);

    }
}