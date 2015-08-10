/// <reference path="MouseWheelController.ts" />

module ProStyle.Extensions.Controllers.MouseWheel {

    export function deserialize(json: any): MouseWheelController {

        return new MouseWheelController();

    }
}