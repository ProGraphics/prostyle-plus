/// <reference path="MouseMoveController.ts" />

module ProStyle.Extensions.Controllers.MouseMove {

    export function deserialize(json: any): MouseMoveController {

        return new MouseMoveController(json.start, json.end);

    }
}