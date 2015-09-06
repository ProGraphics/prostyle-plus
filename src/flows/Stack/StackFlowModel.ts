/// <reference path="../../../ts/prostyle.d.ts" />

module ProStyle.Extensions.Flows.Stack {

    import Models = ProStyle.Models;

    export class StackFlowModel extends Models.Flows.PlacementFlowModel {

        public static defaultStacksJson = {
            current: {
                position: [0, 0, 0],
                rotation: [0, 0, 0],
                scale: 100,
                opacity: 100
            },
            future: {
                position: [140, 0, -200],
                rotation: [0, -10, 5],
                scale: 100,
                opacity: 80,
                offset: {
                    position: [130, 80, -200],
                    rotation: [0, -5, 2],
                    scale: 100,
                    opacity: 50
                }
            },
            past: {
                position: [-140, 0, -200],
                rotation: [0, 10, -5],
                scale: 100,
                opacity: 80,
                offset: {
                    position: [-130, 80, -200],
                    rotation: [0, 5, -2],
                    scale: 100,
                    opacity: 50
                }
            }
        };

        constructor(story: Models.Story,
                    placement: Types.Placement,
                    public overriddenPageClass: string,
                    pageAspectRatio: number,
                    public stacks: Types.Stacks) {

            super(story, "stack", placement, overriddenPageClass, pageAspectRatio, "stackedpage");
        }
        
        public serialize(): any {
            return Stack.serialize(this);
        }
        
        public createView(camera: Views.CameraView, flowIndex: number): StackFlowView {
            return new StackFlowView(this, camera, flowIndex);
        }
    }
}