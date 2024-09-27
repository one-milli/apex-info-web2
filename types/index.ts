// 共通のマップ情報
export interface BaseMapInfo {
  start: number;
  end: number;
  readableDate_start: string;
  readableDate_end: string;
  map: string;
  code: string;
  DurationInSecs: number;
  DurationInMinutes: number;
}

// 現在のマップ情報に追加のフィールドを持つ
export interface CurrentMapInfo extends BaseMapInfo {
  asset: string;
  remainingSecs: number;
  remainingMins: number;
  remainingTimer: string;
}

// APIからの完全なレスポンス
export interface MapRotationData {
  current: CurrentMapInfo;
  next: BaseMapInfo;
}

// クライアントに返すAPIレスポンス
export interface ApiResponse {
  current: CurrentMapInfo;
  next: BaseMapInfo;
  fetchedAt: string; // データ取得時刻を追加
}
