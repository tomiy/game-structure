import Game from "../../../Game";
import Mouse from "../../../event/mouse/Mouse";
import Layer from "../../../state/layer/Layer";
import UiElement from "../UiElement";
import UiButtonOptions from "./UiButtonOptions";

export default class UiButton extends UiElement<UiButton> {
    public label: string;

    public color: string | CanvasGradient | CanvasPattern;
    public hoveredColor: string | CanvasGradient | CanvasPattern;
    public focusedColor: string | CanvasGradient | CanvasPattern;
    public textColor: string | CanvasGradient | CanvasPattern;

    public constructor(layer: Layer, callback: () => void, options?: UiButtonOptions) {
        super(layer, options);

        this.events = {
            hoverOn: () => {
                Game.ctx.canvas.dataset.cursor = Game.ctx.canvas.style.cursor;
                Game.ctx.canvas.style.cursor = 'pointer';
            },
            hoverOff: () => Game.ctx.canvas.style.cursor = Game.ctx.canvas.dataset.cursor!,
            click: callback
        };

        this.label = options?.label || 'Button';

        this.color = options?.color || '#fff';
        this.hoveredColor = options?.hoveredColor || '#ddd';
        this.focusedColor = options?.focusedColor || '#bbb';
        this.textColor = options?.textColor || '#000';
    }

    protected intersects(): boolean {
        return Mouse.mousePos.x > this.x &&
            Mouse.mousePos.y > this.y &&
            Mouse.mousePos.x < this.x + this.width &&
            Mouse.mousePos.y < this.y + this.height;
    }

    public onEnter(): void { }
    public onLeave(): void { }
    public onScroll(_e: WheelEvent): boolean { return true; }
    public onMouseEnter(_e: MouseEvent): void { }
    public onContextMenu(_e: MouseEvent): boolean { return true; }
    public onVisibilityChange(): void { }
    public onKeyDown(_e: KeyboardEvent): void { }
    public onKeyUp(_e: KeyboardEvent): void { }
    public onKeyboardDown(_e: CustomEventInit<any>): void { }
    public onKeyboardUp(_e: CustomEventInit<any>): void { }

    public fixedUpdate(): void { }

    public render(ctx: CanvasRenderingContext2D): void {
        ctx.save();

        ctx.lineWidth = 2;

        ctx.strokeRect(this.x, this.y, this.width, this.height);

        let labelMetrics = ctx.measureText(this.label);
        let labelWidth = labelMetrics.width;
        let labelHeight = labelMetrics.actualBoundingBoxAscent + labelMetrics.actualBoundingBoxDescent;

        ctx.fillStyle = this.hovered ? (this.focused ? this.focusedColor : this.hoveredColor) : this.color;

        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fill();

        ctx.fillStyle = this.textColor;

        ctx.fillText(this.label, this.x + (this.width - labelWidth) / 2, this.y + (this.height + labelHeight) / 2);

        ctx.restore();
    }
}