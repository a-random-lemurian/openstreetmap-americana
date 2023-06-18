import { StyleImage } from "maplibre-gl";

export interface RouteDefinition {
  network: string;
  ref: string;
  name: string;
  spriteID?: string;
}

export interface ShieldDefinition {
  spriteBlank: string[];
  textColor: string;
  padding: {
    left: number;
    right: number;
    top: number;
    bottom: number;
  };
}

export type StringPredicate = (spriteID: string) => boolean;

// RouteParser unpacks a route definition from a sprite image string.
export interface RouteParser {
  parse(spriteID: string): RouteDefinition;
  format(network: string, ref: string, name: string): string;
}

// SpriteProducer returns a sprite graphic based on an ID.
export interface SpriteProducer {
  getSprite(spriteID: string): StyleImage;
}

// SpriteConsumer stores a sprite graphic based on an ID.
export interface SpriteConsumer {
  putSprite(spriteID: string, image: ImageData, pixelRatio: number): void;
}

export type SpriteRepository = SpriteProducer & SpriteConsumer;

// ShieldDefinitions maps routes to visual appearances
export interface ShieldDefinitions {
  shield: {
    [key: string]: ShieldDefinition;
  };
}

export interface DebugOptions {}

export interface ShieldOptions {
  bannerHeight: number;
  bannerPadding: number;
  bannerTextColor: string;
  bannerTextHaloColor: string;
  shieldFont: string;
  shieldSize: number;
}

export interface ShieldSpecification {
  networks: ShieldDefinitions;
  options: ShieldOptions;
}

export type Bounds = {
  width: number;
  height: number;
};

// export type GfxFactory = (bounds: Bounds) => CanvasRenderingContext2D;

export interface GraphicsFactory {
  createGraphics(bounds: Bounds): CanvasRenderingContext2D;
  /**
   * Get pixel ratio MapLibre is using for icons based on devicePixelRatio (DPR).
   * MapLibre uses 2x sprites whenever DPR > 1 and 1x sprites otherwise.
   * So this function will always return 1 or 2 as appropriate based on DPR.
   */
  pixelRatio(): number;
}