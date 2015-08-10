/// <reference path="MouseMoveController.ts" />

module ProStyle.Extensions.Controllers.MouseMove {

    export function serialize(controller: MouseMoveController): any {

        var json = {
            start: controller.startPercent,
            end: controller.endPercent
        };
        return json;

    }
}