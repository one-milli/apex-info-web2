import React from "react";
import useMapRotation from "@/hooks/useMapRotation";
import Image from "next/image";
import { MapRotationMode, MapRotationEntry } from "@/types";
import { TranslationKey } from "@/types/translationKey";
import { t } from "@/translations/translate";
import { Clock, MapPin, ArrowBigRight } from "lucide-react";
import Logo from "@/assets/apex-logo.svg";

const fixToJST = (date: string) => {
  const dateJST = new Date(date);
  dateJST.setHours(dateJST.getHours() + 9);
  return dateJST;
};

function formatTime(date: Date): string {
  return date.toLocaleString("ja-JP", {
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const LoadingState: React.FC = () => (
  <div className="flex justify-center items-center h-64 relative">
    <div className="animate-spin rounded-full h-44 w-44 border-t-2 border-b-2 border-red-600"></div>
    <Logo width={128} height={128} className="absolute top-[3.5rem] animate-pulse" />
  </div>
);

const ErrorState: React.FC<{ message: string }> = ({ message }) => (
  <div
    className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
    role="alert"
  >
    <strong className="font-bold">エラー:</strong>
    <span className="block sm:inline"> データの読み込みに失敗しました: {message}</span>
  </div>
);

const NoDataState: React.FC = () => (
  <div
    className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative"
    role="alert"
  >
    <strong className="font-bold">注意:</strong>
    <span className="block sm:inline"> データがありません。</span>
  </div>
);

const MapCard: React.FC<{ title: string; map: MapRotationEntry }> = ({ title, map }) => (
  <div className="bg-indigo-900/80 rounded-lg overflow-hidden shadow-md">
    <h4 className="text-xl font-semibold text-white bg-indigo-950/70 py-2 px-4">
      {title}: {t(map.map as TranslationKey)}
    </h4>
    <div className="relative h-48">
      <Image src={map.asset} alt={map.map} fill className="brightness-200 object-cover" />
    </div>
    <div className="p-4 space-y-2">
      <TimeInfo
        startDate={fixToJST(map.readableDate_start)}
        endDate={fixToJST(map.readableDate_end)}
      />
      {map.eventName && <EventInfo name={map.eventName} />}
    </div>
  </div>
);

const TimeInfo: React.FC<{ startDate: Date; endDate: Date }> = ({ startDate, endDate }) => (
  <div className="flex items-center text-gray-300">
    <Clock className="w-5 h-5 mr-2 text-blue-400" />
    <span className="text-xl font-medium">{formatTime(startDate)}</span>
    <ArrowBigRight className="mx-2 animate-slide-right" />
    <span className="text-xl font-medium ml-1">{formatTime(endDate)}</span>
  </div>
);

const EventInfo: React.FC<{ name: string }> = ({ name }) => (
  <div className="flex items-center text-yellow-400">
    <MapPin className="w-4 h-4 mr-2" />
    <span className="font-medium">イベント名:</span>
    <span className="ml-2">{name}</span>
  </div>
);

const MapRotation: React.FC = () => {
  const { data, loading, error } = useMapRotation();

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error.message} />;
  if (!data) return <NoDataState />;

  const renderMapRotation = (mode: string, modeJp: string, rotation: MapRotationMode) => {
    const { current, next } = rotation;
    return (
      <div
        key={mode}
        className="bg-gray-200/30 backdrop-blur-lg border border-gray-200/30 rounded-lg overflow-hidden shadow-lg mb-8"
      >
        <h3 className="text-2xl font-bold text-white bg-gradient-to-r from-rose-700/90 to-red-500 border border-red-600/20 shadow-lg py-2 px-4">
          {modeJp}
        </h3>
        <div className="grid md:grid-cols-2 gap-4 p-4">
          <MapCard title="現在" map={current} />
          <MapCard title="次回" map={next} />
        </div>
      </div>
    );
  };

  return (
    <div className="map-rotation w-[95vw] sm:w-[90vw] mt-8">
      {renderMapRotation("battle_royale", "バトルロイヤル", data.battle_royale)}
      {renderMapRotation("ranked", "ランク", data.ranked)}
    </div>
  );
};

export default MapRotation;
