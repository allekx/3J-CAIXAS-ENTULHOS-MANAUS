"use client";

import Image from "next/image";
import { useState } from "react";
import { SITE } from "@/constants/site";

const LOGO_SRC = "/logos/logo-3j-oficial.jpg";
const VIEW_WIDTH = 1440;

type HeaderShape = {
  height: number;
  curvePath: string;
  goldPath: string;
};

function buildHeaderShape({
  logoTop,
  logoSize,
  goldGap,
  curveDepth,
}: {
  logoTop: number;
  logoSize: number;
  goldGap: number;
  curveDepth: number;
}): HeaderShape {
  const logoBottom = logoTop + logoSize;
  const sideY = logoBottom + goldGap;
  const goldY = sideY + curveDepth;
  const height = goldY + 4;

  return {
    height,
    curvePath: `M0,0 H${VIEW_WIDTH} V${sideY} Q${VIEW_WIDTH / 2},${goldY} 0,${sideY} Z`,
    goldPath: `M0,${sideY} Q${VIEW_WIDTH / 2},${goldY} ${VIEW_WIDTH},${sideY}`,
  };
}

const MOBILE_LOGO_TOP = 24;
const MOBILE_LOGO_SIZE = 184;
const DESKTOP_LOGO_TOP = 28;
const DESKTOP_LOGO_SIZE = 216;
const GOLD_GAP = 12;
const CURVE_DEPTH_MOBILE = 28;
const CURVE_DEPTH_DESKTOP = 32;

const MOBILE_SHAPE = buildHeaderShape({
  logoTop: MOBILE_LOGO_TOP,
  logoSize: MOBILE_LOGO_SIZE,
  goldGap: GOLD_GAP,
  curveDepth: CURVE_DEPTH_MOBILE,
});

const DESKTOP_SHAPE = buildHeaderShape({
  logoTop: DESKTOP_LOGO_TOP,
  logoSize: DESKTOP_LOGO_SIZE,
  goldGap: GOLD_GAP,
  curveDepth: CURVE_DEPTH_DESKTOP,
});

function HeaderBackdrop({
  shape,
  className,
}: {
  shape: HeaderShape;
  className?: string;
}) {
  return (
    <div className={className}>
      <svg
        viewBox={`0 0 ${VIEW_WIDTH} ${shape.height}`}
        preserveAspectRatio="none"
        className="absolute inset-0 size-full"
        aria-hidden="true"
      >
        <path d={shape.curvePath} className="fill-brand-black" />
        <defs>
          <linearGradient
            id={`header-shine-${shape.height}`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="rgba(255,255,255,0.14)" />
            <stop offset="28%" stopColor="rgba(255,255,255,0.03)" />
            <stop offset="55%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
        </defs>
        <path
          d={shape.curvePath}
          fill={`url(#header-shine-${shape.height})`}
        />
      </svg>

      <svg
        viewBox={`0 0 ${VIEW_WIDTH} ${shape.height}`}
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 z-10 size-full"
        aria-hidden="true"
      >
        <path
          d={shape.goldPath}
          fill="none"
          stroke="#c9a227"
          strokeWidth="5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}

export function AllocationHeader() {
  const [logoReady, setLogoReady] = useState(false);
  const [logoMissing, setLogoMissing] = useState(false);

  return (
    <header className="relative bg-white">
      <div className="relative mx-auto w-full max-w-[800px]">
        <div className="allocation-header-shell relative h-[15.75rem] w-full sm:h-[18.25rem]">
          <HeaderBackdrop shape={MOBILE_SHAPE} className="absolute inset-0 sm:hidden" />
          <HeaderBackdrop
            shape={DESKTOP_SHAPE}
            className="absolute inset-0 hidden sm:block"
          />

          <div className="allocation-header-logo pointer-events-none absolute top-6 left-1/2 z-20 size-[11.5rem] -translate-x-1/2 sm:top-7 sm:size-[13.5rem]">
            <div className="flex size-full items-center justify-center overflow-hidden rounded-full border-[5px] border-brand-gold bg-brand-black shadow-[0_12px_32px_rgba(0,0,0,0.22)] sm:border-[6px]">
              {!logoMissing ? (
                <Image
                  src={LOGO_SRC}
                  alt={SITE.name}
                  width={400}
                  height={400}
                  priority
                  onLoad={() => setLogoReady(true)}
                  onError={() => setLogoMissing(true)}
                  className={
                    logoReady
                      ? "size-full object-cover"
                      : "pointer-events-none size-0 opacity-0"
                  }
                />
              ) : (
                <span className="px-2 text-center text-sm font-bold tracking-wide text-white uppercase">
                  {SITE.shortName}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 pt-4 pb-5 text-center sm:pb-6">
        <h1 className="text-xl font-bold tracking-tight text-brand-black sm:text-2xl">
          Confirmação de Locação
        </h1>
      </div>
    </header>
  );
}
