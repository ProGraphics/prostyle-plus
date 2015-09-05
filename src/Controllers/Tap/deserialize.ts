/// <reference path="TapController.ts" />
/// <reference path="../../l.ts" />

module ProStyle.Extensions.Controllers.Tap {

    export function deserialize(json: any): TapController {

        c();
        return new TapController(json.playbuttonSizes, json.rowSizes, json.cursors);

    }
}