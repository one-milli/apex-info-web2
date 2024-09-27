import React from "react";
import useMapRotation from "@/hooks/useMapRotation";
import Image from "next/image";

const MapRotation: React.FC = () => {
  const { data, loading, error } = useMapRotation();

  if (loading) return <p>読み込み中...</p>;
  if (error) return <p>データの読み込みに失敗しました: {error.message}</p>;
  if (!data) return <p>データがありません。</p>;

  const { current, next, fetchedAt } = data;
  const { readableDate_start, readableDate_end, map, asset } = current;
  const {
    readableDate_start: nextReadableStart,
    readableDate_end: nextReadableEnd,
    map: nextMap,
  } = next;

  return (
    <div className="map-rotation">
      <h2>現在のマップ: {map}</h2>
      <Image src={asset} alt={`${map} Asset`} width={300} height={300} />
      <p>開始時間: {new Date(readableDate_start).toLocaleString()}</p>
      <p>終了時間: {new Date(readableDate_end).toLocaleString()}</p>
      <p>残り時間:</p>

      <h2>次のマップ: {nextMap}</h2>
      <p>開始時間: {new Date(nextReadableStart).toLocaleString()}</p>
      <p>終了時間: {new Date(nextReadableEnd).toLocaleString()}</p>
      <p>データ取得時刻: {new Date(fetchedAt).toLocaleString()}</p>
    </div>
  );
};

export default MapRotation;
