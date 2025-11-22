import React, { useState, useEffect } from "react";
import useMapRotation from "@/hooks/useMapRotation";
import Image from "next/image";
import { MapRotationMode, MapRotationEntry } from "@/types";
import { TranslationKey } from "@/types/translationKey";
import { t } from "@/translations/translate";
import { Clock, MapPin, ChevronRight, AlertTriangle } from "lucide-react";
import Logo from "@/assets/apex-logo.svg";

// --- Helpers ---
const fixToJST = (date: string) => {
  const dateJST = new Date(date);
  dateJST.setHours(dateJST.getHours() + 9);
  return dateJST;
};

// 日付フォーマット関数（月/日 時間:分）
function formatDateTime(date: Date): string {
  return date.toLocaleString("ja-JP", {
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// 残り時間を計算する関数
const calculateTimeRemaining = (endStr: string) => {
  const now = Date.now();
  const endTime = fixToJST(endStr).getTime();
  const diff = endTime - now;

  if (diff <= 0) return null;

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { hours, minutes, seconds, totalMs: diff };
};

// --- Components ---

const LoadingState: React.FC = () => (
  <div className="flex flex-col justify-center items-center h-64 relative">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-apex-red"></div>
    <div className="mt-4 text-apex-red font-bold tracking-widest animate-pulse">
      LOADING DATA...
    </div>
  </div>
);

const ErrorState: React.FC<{ message: string }> = ({ message }) => (
  <div className="bg-red-950/50 border-l-4 border-apex-red p-4 rounded-r max-w-2xl mx-auto">
    <div className="flex items-center">
      <AlertTriangle className="text-apex-red w-6 h-6 mr-3" />
      <div>
        <h3 className="text-apex-red font-bold uppercase">Connection Error</h3>
        <p className="text-gray-300 text-sm">{message}</p>
      </div>
    </div>
  </div>
);

// リアルタイムカウントダウン機能付きバー
const TimerBar: React.FC<{ start: string; end: string }> = ({ start, end }) => {
  const [timeLeft, setTimeLeft] = useState<{ h: number; m: number; s: number } | null>(null);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const updateTimer = () => {
      const remaining = calculateTimeRemaining(end);

      // 進行状況(%)の計算
      const now = Date.now();
      const startTime = fixToJST(start).getTime();
      const endTime = fixToJST(end).getTime();
      const totalDuration = endTime - startTime;
      const elapsed = now - startTime;
      const pct = Math.min(Math.max((elapsed / totalDuration) * 100, 0), 100);

      setPercentage(pct);

      if (remaining) {
        setTimeLeft({ h: remaining.hours, m: remaining.minutes, s: remaining.seconds });
      } else {
        setTimeLeft(null);
      }
    };

    updateTimer(); // 初回実行
    const timerId = setInterval(updateTimer, 1000); // 1秒ごとに更新

    return () => clearInterval(timerId);
  }, [start, end]);

  // 時間表示のフォーマット (0埋め)
  const timeString = timeLeft
    ? `${String(timeLeft.h).padStart(2, "0")}:${String(timeLeft.m).padStart(2, "0")}:${String(
        timeLeft.s
      ).padStart(2, "0")}`
    : "終了 / 更新中";

  return (
    <div className="w-full mt-3">
      <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-1 text-gray-300">
        <span>Time Remaining</span>
        <span className="text-apex-red font-mono text-sm">{timeString}</span>
      </div>
      <div className="h-2 bg-gray-700 w-full skew-x-[-20deg] overflow-hidden">
        <div
          className="h-full bg-apex-red shadow-[0_0_10px_rgba(218,41,42,0.7)] transition-all duration-1000 ease-linear"
          style={{ width: `${100 - percentage}%` }}
        />
      </div>
    </div>
  );
};

// 現在のマップ用カード
const CurrentMapCard: React.FC<{ map: MapRotationEntry }> = ({ map }) => {
  // 翻訳されたマップ名を取得
  const translatedMapName = t(map.map as TranslationKey);

  return (
    <div className="relative group overflow-hidden border-l-4 border-apex-red bg-apex-dark shadow-2xl">
      {/* 背景画像 */}
      <div className="absolute inset-0 z-0">
        <Image
          src={map.asset}
          alt={map.map}
          fill
          className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-apex-dark via-apex-dark/80 to-transparent" />
      </div>

      <div className="relative z-10 p-6 sm:p-8 flex flex-col h-full justify-end min-h-[300px]">
        <div className="inline-block bg-apex-red text-white text-xs font-bold px-2 py-1 uppercase tracking-widest mb-2 w-fit transform -skew-x-12">
          Current Map
        </div>

        <h2
          className="text-4xl sm:text-5xl font-black uppercase tracking-tighter text-white drop-shadow-lg mb-1 glitch-effect"
          data-text={translatedMapName}
        >
          {translatedMapName}
        </h2>

        {map.eventName && (
          <div className="flex items-center text-yellow-400 mb-2 font-bold tracking-wide">
            <MapPin className="w-4 h-4 mr-1" />
            {map.eventName}
          </div>
        )}

        <div className="flex items-center text-gray-300 text-sm sm:text-base font-mono mt-1">
          <Clock className="w-4 h-4 mr-2 text-apex-red" />
          {formatDateTime(fixToJST(map.readableDate_start))}
          <span className="mx-2 text-gray-500">➜</span>
          {formatDateTime(fixToJST(map.readableDate_end))}
        </div>

        <TimerBar start={map.readableDate_start} end={map.readableDate_end} />
      </div>
    </div>
  );
};

// 次回のマップ用カード
const NextMapCard: React.FC<{ map: MapRotationEntry }> = ({ map }) => (
  // bg-apex-dark に変更してカード自体の色を濃くし、背景とのコントラストを確保
  <div className="bg-apex-dark border-t border-gray-700 p-4 flex items-center gap-4 relative overflow-hidden h-24">
    {/* 画像エリア: 左端にグラデーションマスクを追加してブツ切り感を解消 */}
    <div className="absolute right-0 top-0 bottom-0 w-1/2 sm:w-1/3 pointer-events-none">
      {/* グラデーションオーバーレイ */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-apex-dark via-apex-dark/40 to-transparent"></div>
      <Image src={map.asset} alt="" fill className="object-cover z-0" />
    </div>

    <div className="min-w-[60px] text-center relative z-20">
      <span className="block text-[10px] text-gray-400 uppercase font-bold tracking-widest">
        Next
      </span>
      <ChevronRight className="w-6 h-6 mx-auto text-apex-red animate-pulse-fast" />
    </div>

    <div className="flex-1 z-20 relative">
      <h3 className="text-xl font-bold uppercase tracking-tight text-gray-100 drop-shadow-md">
        {t(map.map as TranslationKey)}
      </h3>
      <div className="text-xs text-gray-400 font-mono flex items-center gap-1">
        <span>Starts:</span>
        <span className="text-gray-200">{formatDateTime(fixToJST(map.readableDate_start))}</span>
      </div>
    </div>
  </div>
);

const ModeSection: React.FC<{
  title: string;
  rotation: MapRotationMode;
}> = ({ title, rotation }) => {
  return (
    <div className="mb-12 w-full max-w-4xl mx-auto">
      {/* セクションヘッダー */}
      <div className="flex items-center mb-4 border-b-2 border-white/10 pb-2">
        <div className="bg-white text-apex-dark font-black px-3 py-1 text-lg uppercase tracking-widest transform -skew-x-12 mr-4 shadow-[4px_4px_0px_rgba(218,41,42,1)]">
          {title}
        </div>
        <div className="h-[1px] flex-1 bg-gradient-to-r from-apex-red to-transparent opacity-50"></div>
      </div>

      <div className="flex flex-col shadow-[0_20px_50px_-12px_rgba(0,0,0,0.7)] rounded-sm overflow-hidden">
        <CurrentMapCard map={rotation.current} />
        <NextMapCard map={rotation.next} />
      </div>
    </div>
  );
};

const MapRotation: React.FC = () => {
  const { data, loading, error } = useMapRotation();

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error.message} />;
  if (!data) return <ErrorState message="No Data Available" />;

  return (
    <div className="w-full px-4 pb-20">
      <div className="flex justify-center py-10">
        <Logo className="w-32 h-32 sm:w-48 sm:h-48 drop-shadow-[0_0_15px_rgba(218,41,42,0.5)]" />
      </div>

      <ModeSection title="BATTLE ROYALE" rotation={data.battle_royale} />

      <ModeSection title="RANKED LEAGUES" rotation={data.ranked} />
    </div>
  );
};

export default MapRotation;
