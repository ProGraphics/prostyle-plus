/// <reference path="../../../ts/prostyle.d.ts" />
/// <reference path="../Cursors.ts" />

module ProStyle.Extensions.Controllers.Tap {

    export class TapController extends ProStyle.Controllers.Controller {

        private backDiv: HTMLDivElement = undefined;
        private playDiv: HTMLDivElement = undefined;
        private nextDiv: HTMLDivElement = undefined;
        private seekDiv: HTMLDivElement = undefined;
        private backBound: any = undefined;
        private playBound: any = undefined;
        private nextBound: any = undefined;
        private seekBound: any = undefined;
        private stateChangedBound: any = undefined;
        private canvas: Views.CanvasView = undefined;
        private player: Play.IPlayer = undefined;
        
        private bwr = 0.25; //back button width ratio
        private pwr = 0.50; //play button width ratio
        private nwr = 0.25; //next button width ratio
        private phr = 0.75; //play button height ratio
        private shr = 0.25; //seek button height ratio

        constructor(public playbuttonSizes = [25,50,25], public rowSizes = [75,25], public cursors = true) {
            super("tap");
            
            if (playbuttonSizes instanceof Array && playbuttonSizes.length > 2) {
                playbuttonSizes[0] = Math.abs(playbuttonSizes[0]);
                playbuttonSizes[1] = Math.abs(playbuttonSizes[1]);
                playbuttonSizes[2] = Math.abs(playbuttonSizes[2]);
                var total = playbuttonSizes[0] + playbuttonSizes[1] + playbuttonSizes[2];
                if (total > 0) {
                    this.bwr = playbuttonSizes[0] / total;
                    this.pwr = playbuttonSizes[1] / total;
                    this.nwr = playbuttonSizes[2] / total;
                }
            }

            if (rowSizes instanceof Array && rowSizes.length > 1) {
                rowSizes[0] = Math.abs(rowSizes[0]);
                rowSizes[1] = Math.abs(rowSizes[1]);
                var total = rowSizes[0] + rowSizes[1];
                if (total > 0) {
                    this.phr = rowSizes[0] / total;
                    this.shr = rowSizes[1] / total;
                }
            }
            
            this.backBound = this.back.bind(this);
            this.playBound = this.play.bind(this);
            this.nextBound = this.next.bind(this);
            this.seekBound = this.seek.bind(this);
            this.stateChangedBound = this.stateChanged.bind(this);
        }

        public start(canvas: Views.CanvasView, player: Play.IPlayer) {
            this.stop();
            this.canvas = canvas;
            this.player = player;
            
            this.backDiv = ProStyle.Util.createChildDivElement(this.canvas.frame.div, "tap-back");
            this.playDiv = ProStyle.Util.createChildDivElement(this.canvas.frame.div, "tap-play");
            this.nextDiv = ProStyle.Util.createChildDivElement(this.canvas.frame.div, "tap-next");
            this.seekDiv = ProStyle.Util.createChildDivElement(this.canvas.frame.div, "tap-seek");
            this.player.stateChanged.on(this.stateChangedBound);
            this.resize();
            
            this.backDiv.addEventListener("click", this.backBound);
            this.playDiv.addEventListener("click", this.playBound);
            this.nextDiv.addEventListener("click", this.nextBound);
            this.seekDiv.addEventListener("click", this.seekBound);
            
            if (this.cursors) {
                this.backDiv.style.cursor = ProStyle.Cursors.back_24x24 + ",w-resize";
                this.playDiv.style.cursor = ProStyle.Cursors.play_20x28 + ",pointer";
                this.nextDiv.style.cursor = ProStyle.Cursors.next_37x24 + ",e-resize";
                this.seekDiv.style.cursor = ProStyle.Cursors.seek_36x12 + ",ew-resize";
            }
            
            //this.backDiv.style.backgroundColor = "rgba(255,0,0,0.2)";
            //this.playDiv.style.backgroundColor = "rgba(0,255,0,0.2)";
            //this.nextDiv.style.backgroundColor = "rgba(0,0,255,0.2)";
            //this.seekDiv.style.backgroundColor = "rgba(255,255,0,0.2)";
            
            this.backDiv.style.position = 
            this.playDiv.style.position = 
            this.nextDiv.style.position = 
            this.seekDiv.style.position = "absolute";    
        }

        public stop() {
            if (this.player !== undefined) {
                
                this.backDiv.removeEventListener("click", this.backBound);
                this.playDiv.removeEventListener("click", this.playBound);
                this.nextDiv.removeEventListener("click", this.nextBound);
                this.seekDiv.removeEventListener("click", this.seekBound);
                
                this.player.stateChanged.off(this.stateChangedBound);
                
                this.backDiv.parentElement.removeChild(this.backDiv);
                this.playDiv.parentElement.removeChild(this.playDiv);
                this.nextDiv.parentElement.removeChild(this.nextDiv);
                this.seekDiv.parentElement.removeChild(this.seekDiv);
                
                this.canvas = undefined;
                this.player = undefined;
            }
        }

        private mouseout(m: MouseEvent) {
            if (this.player) this.player.playCurrentStep();            
        }

        private back(m: MouseEvent) {
            this.player.backStep(true);
        }

        private play(m: MouseEvent) {
            this.player.togglePlay();
        }

        private next(m: MouseEvent) {
            this.player.playNextStep(true);
        }

        private seek(m: MouseEvent) {
            var rect = Util.getOffset(<HTMLDivElement>m.currentTarget);
            var pos = m.pageX - rect.left;
            var w = m.target["offsetWidth"];
            this.player.seek(pos/w, true);
        }

        private stateChanged(paused: boolean) {
            if (this.cursors) {
                if (paused) {
                    this.playDiv.style.cursor = ProStyle.Cursors.play_20x28 + ",pointer";
                }
                else {
                    this.playDiv.style.cursor = ProStyle.Cursors.pause_21x24 + ",pointer";
                }
            }
        }

        public resize() {
            var cw = this.canvas.frame.div.offsetWidth;
            var ch = this.canvas.frame.div.offsetHeight;
            
            var bw = cw * this.bwr;
            var pw = cw * this.pwr;
            var nw = cw * this.nwr;

            var ph = ch * this.phr;
            var sh = ch * this.shr;

            this.backDiv.style.left = "0px";
            this.backDiv.style.top = "0px";
            this.backDiv.style.width = bw + "px";
            this.backDiv.style.height = ph + "px";
            
            this.playDiv.style.left = bw + "px";
            this.playDiv.style.top = "0px";
            this.playDiv.style.width = pw + "px";
            this.playDiv.style.height = ph + "px";
            
            this.nextDiv.style.left =  (bw + pw) + "px";
            this.nextDiv.style.top = "0px";
            this.nextDiv.style.width = nw + "px";
            this.nextDiv.style.height = ph + "px";
            
            this.seekDiv.style.left = "0px";
            this.seekDiv.style.top = ph + "px";
            this.seekDiv.style.width = cw + "px";
            this.seekDiv.style.height = sh + "px";
        }

        public serialize(): any {
            return Tap.serialize(this);
        }
    }
}