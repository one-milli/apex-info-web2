import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black/80 text-gray-500 text-xs text-center py-8 border-t border-white/10 mt-auto">
      <div className="max-w-4xl mx-auto px-4 space-y-2">
        <p className="font-bold text-gray-400 uppercase tracking-wider">
          © Apex Legends Map Rotation
        </p>
        <p>
          This is an unofficial fan site. Not affiliated with Electronic Arts or Respawn
          Entertainment.
        </p>
        <p>
          Data provided by{" "}
          <a
            href="https://apexlegendsstatus.com"
            target="_blank"
            rel="noreferrer"
            className="text-apex-red hover:underline"
          >
            ApexLegendsStatus API
          </a>
          .
        </p>
      </div>
    </footer>
  );
};

export default Footer;
