import React from "react";
import useMapRotation from "@/hooks/useMapRotation";
import Image from "next/image";
import { MapRotationMode } from "@/types";
import { TranslationKey } from "@/types/translationKey";
import { t } from "@/translations/translate";

const MapRotation: React.FC = () => {
  const { data, loading, error } = useMapRotation();

  if (loading) return <p>読み込み中...</p>;
  if (error) return <p>データの読み込みに失敗しました: {error.message}</p>;
  if (!data) return <p>データがありません。</p>;

  const fixToJST = (date: string) => {
    const dateJST = new Date(date);
    dateJST.setHours(dateJST.getHours() + 9);
    return dateJST;
  };

  const renderMapRotation = (mode: string, modeJp: string, rotation: MapRotationMode) => {
    const { current, next } = rotation;
    return (
      <div key={mode} className="map-rotation-mode">
        <h3>{modeJp}</h3>
        <div className="current-rotation">
          <h4>現在のマップ: {t(current.map as TranslationKey)}</h4>
          <div className="image-container relative w-full min-h-60 max-h-60">
            <Image src={current.asset} alt={current.map} fill style={{ objectFit: "cover" }} />
          </div>
          <p>開始時間: {fixToJST(current.readableDate_start).toLocaleString()}</p>
          <p>終了時間: {fixToJST(current.readableDate_end).toLocaleString()}</p>
        </div>
        <div className="next-rotation">
          <h4>次のマップ: {t(next.map as TranslationKey)}</h4>
          <div className="image-container relative w-full min-h-60 max-h-60">
            <Image src={next.asset} alt={next.map} fill style={{ objectFit: "cover" }} />
          </div>
          <p>開始時間: {fixToJST(next.readableDate_start).toLocaleString()}</p>
          <p>終了時間: {fixToJST(next.readableDate_end).toLocaleString()}</p>
          {next.eventName && <p>イベント名: {next.eventName}</p>}
        </div>
      </div>
    );
  };

  return (
    <div className="map-rotation w-[90vw]">
      {renderMapRotation("battle_royale", "バトルロワイヤル", data.battle_royale)}
      {renderMapRotation("ranked", "ランク", data.ranked)}
    </div>
  );
};

export default MapRotation;
