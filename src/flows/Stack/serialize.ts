/// <reference path="../../../ts/prostyle.d.ts" />
/// <reference path="StackFlowModel.ts" />

module ProStyle.Extensions.Flows.Stack {

    import Models = ProStyle.Models;
    import Scripts = ProStyle.Models.Scripts;
    import Util = ProStyle.Util;
    
    export function serialize(model: StackFlowModel): any  {

        //TODO: write the json configuration back out.
        // Important,
        //   don't write current page placement values if it is default
        //   don't write future and past page placements and their offsets if they equal the defaults

        var json: any = {};
        json.setup = {};
        if (model.pageClass !== undefined) json.setup.defaultPageClass = model.pageClass;
        return json;
    }
}