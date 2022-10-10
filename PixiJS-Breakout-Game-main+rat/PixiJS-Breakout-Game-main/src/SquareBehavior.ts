import * as PIXI from 'pixi.js';
import { GameObject } from "./GameObject";
import { GameObjectBehavior } from "./GameObjectBehavior";
import { GameApplication } from './GameApplication';
import { EventDispacher } from './EventDispacher';
import { BallBehavior } from './BallBehavior';


export class SquareBehavior extends GameObjectBehavior {
    private square: PIXI.Sprite;
    private rat: PIXI.Sprite;
    private velocity: number = 10;
    private ballObjRef: GameObject;


    constructor(gameObjRef: GameObject) {
        super(gameObjRef);
    }
    public destroy() {
        this.square.destroy({ texture: true, baseTexture: true });
        this.gameObjRef.removeChild(this.square);
    }
    public setBallObjRef(gameObj: GameObject) {
        this.ballObjRef = gameObj;
    }
    protected init(): void {
        this.createSquare();
    }

    ////////////////////////////////////////////
    private createRat(rat: PIXI.Sprite) {
        const img = new Image();
        img.src = './assets/image/Rat.png'
        const base = new PIXI.BaseTexture(img)
        const texture = new PIXI.Texture(base)
        this.rat = new PIXI.Sprite(texture);
        this.rat.x = -444
        this.gameObjRef.addChild(this.rat);
        //////////////////////////////////////////////
    }

    private makeSquareBlue(square: PIXI.Sprite) {

        square.tint = 0x0600fd
    }
    private createSquare() {
        const gfx: PIXI.Graphics = new PIXI.Graphics();
        gfx.beginFill(0xffffff);

        gfx.drawRect(0, 0, 100, 100);


        gfx.endFill();

        const texture: PIXI.Texture = GameApplication.getApp().renderer.generateTexture(gfx);
        this.square = new PIXI.Sprite(texture);

        this.gameObjRef.addChild(this.square);

    }



    ///////////////////////////////////////////////////////////////////
    private sendSquareDown(delta: number) {
        if (this.square.y + this.square.height < GameApplication.getApp().view.height) {
            this.square.y += this.velocity * delta
        }

    }
    ////////////////////////////////////////////////////////////////////
    public update(delta: number) {
        let collision: boolean = false;


        if (!collision && this.ballObjRef.x + this.ballObjRef.width >= this.gameObjRef.x && this.ballObjRef.x < this.gameObjRef.x + this.gameObjRef.width &&
            this.ballObjRef.y + this.ballObjRef.height >= this.gameObjRef.y && this.ballObjRef.y < this.gameObjRef.y + this.gameObjRef.height) {
            collision = true;

            EventDispacher.getInstance().getDispacher().emit('updatescore');

        }



        if (collision) {
            this.makeSquareBlue(this.square)
            this.sendSquareDown(delta * 3)
            this.createRat(this.rat)

        }
    }
}