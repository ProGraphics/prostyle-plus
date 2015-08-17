/// <reference path="../../../ts/prostyle.d.ts" />
/// <reference path="StackFlowModel.ts" />

module ProStyle.Extensions.Flows.Stack {

    import Models = ProStyle.Models;
    import Views = ProStyle.Views;

    export class StackFlowView extends Views.Flows.PlacementFlowView {

        constructor(private stackFlow: StackFlowModel, camera: Views.CameraView, flowIndex: number) {
            super(stackFlow, camera, flowIndex);
        }

        public initializePages(timeline: TimelineMax) {

            var pageSize = this.camera.size.getContainedSize(this.stackFlow.pageAspectRatio);

            this.pages.forEach((pageElem: Views.PageView, index: number) => {
                var css = {
                    width: pageSize.width,
                    height: pageSize.height,
                    perspective: 10000 //(pageSize.width + pageSize.height) / 2
                };
                timeline.set(this.pages[index].div, css, "initialize");
            });
        }

        public generatePageMovement(timeline: TimelineMax, label: string, pageIndex: number) {
            var current = this.stackFlow.stacks.current;
            var future = this.stackFlow.stacks.future;
            var futureOffset = this.stackFlow.stacks.futureOffset;
            var past = this.stackFlow.stacks.past;
            var pastOffset = this.stackFlow.stacks.pastOffset;

            var pageSize = this.camera.size.getContainedSize(this.stackFlow.pageAspectRatio);

            var css = current.renderCss(pageSize);
            this.applyCss(timeline, this.pages[pageIndex].div, label, 1, css, Expo.easeOut);

            past = past.duplicate();
            for (var i = pageIndex - 1; i >= 0; i--) {
                css = past.renderCss(pageSize);
                this.applyCss(timeline, this.pages[i].div, label, 1, css, Expo.easeOut);
                past.adjust(pastOffset);
            }

            future = future.duplicate();
            for (var i = pageIndex + 1; i < this.pages.length; i++) {
                css = future.renderCss(pageSize);
                this.applyCss(timeline, this.pages[i].div, label, 1, css, Expo.easeOut);
                future.adjust(futureOffset);
            }
        }

        private applyCss(timeline: TimelineMax, div: HTMLElement, label: string, duration: number, css: any,
                         ease: Ease) {
            if (label === "initialize") {
                timeline.set(div, css, label);
            }
            else {
                css.ease = ease;
                timeline.to(div, duration, css, label);
            }
        }
    }
}