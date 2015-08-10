/// <reference path="TapController.ts" />

module ProStyle.Extensions.Controllers.Tap {

    export function serialize(controller: TapController): any {

        var json = {
            playbuttonSizes: controller.playbuttonSizes,
            rowSizes: controller.rowSizes,
            cursors: controller.cursors
        };
        return json;

    }
}