/// <reference path="MouseMoveController.ts" />
/// <reference path="../../l.ts" />

module ProStyle.Extensions.Controllers.MouseMove {

    export function deserialize(json: any): MouseMoveController {

        c();
        return new MouseMoveController(json.start, json.end);

    }
}