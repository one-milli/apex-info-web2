export interface MapRotationEntry {
  start: number;
  end: number;
  readableDate_start: string;
  readableDate_end: string;
  map: string;
  code: string;
  DurationInSecs: number;
  DurationInMinutes: number;
  asset: string;
  remainingSecs?: number;
  remainingMins?: number;
  remainingTimer?: string;
  isActive?: boolean;
  eventName?: string;
}

export interface MapRotationMode {
  current: MapRotationEntry;
  next: MapRotationEntry;
}

export interface ApiResponse {
  battle_royale: MapRotationMode;
  ranked: MapRotationMode;
  ltm: MapRotationMode;
}
