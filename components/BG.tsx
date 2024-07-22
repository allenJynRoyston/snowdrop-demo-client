"use client"

import React, { useEffect, useRef, useState } from 'react';

type Color = [number, number, number];

const colors: Color[] = [
  [62, 35, 255],
  [60, 255, 60],
  [255, 35, 98],
  [45, 175, 230],
  [255, 0, 255],
  [255, 128, 0]
];

const gradientSpeed = 0.002;

export default function BG() {
  const [step, setStep] = useState<number>(0);
  const [colorIndices, setColorIndices] = useState<number[]>([0, 1, 2, 3]);
  const htmlEle = useRef<HTMLDivElement | null>(null);

  const updateGradient = () => {
    if (!htmlEle.current) return;

    const [c0_0, c0_1, c1_0, c1_1] = colorIndices.map(
      (index) => colors[index]
    ) as [Color, Color, Color, Color];

    const istep = 1 - step;
    const r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
    const g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
    const b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
    const color1 = `rgb(${r1},${g1},${b1})`;

    const r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
    const g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
    const b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
    const color2 = `rgb(${r2},${g2},${b2})`;

    htmlEle.current.style.background = `-webkit-gradient(linear, left top, right top, from(${color1}), to(${color2}))`;
    htmlEle.current.style.background = `-moz-linear-gradient(left, ${color1} 0%, ${color2} 100%)`;

    setStep((prevStep) => {
      const newStep = prevStep + gradientSpeed;
      if (newStep >= 1) {
        setColorIndices((prevIndices) => {
          const newColorIndices = [...prevIndices];
          newColorIndices[0] = prevIndices[1];
          newColorIndices[2] = prevIndices[3];
          newColorIndices[1] = (prevIndices[1] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;
          newColorIndices[3] = (prevIndices[3] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;
          return newColorIndices;
        });
        return newStep % 1;
      }
      return newStep;
    });
  };

  useEffect(() => {
    const interval = setInterval(updateGradient, 10);
    return () => {
      clearInterval(interval);
    };
  }, [step, colorIndices]);

  return (
    <div
      ref={htmlEle}
      className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10"
    />
  );
};
