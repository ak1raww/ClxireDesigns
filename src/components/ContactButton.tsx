/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { siteConfig } from '../data/siteConfig';

interface ContactButtonProps {
  href: string;
  label?: string;
}

export default function ContactButton({ href, label }: ContactButtonProps) {
  return (
    <a
      href={href.startsWith('#') ? href : siteConfig.common.etsyUrl}
      target={href.startsWith('#') ? '_self' : '_blank'}
      className="group relative px-10 py-5 rounded-full font-black uppercase text-sm transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(182,0,168,0.3)] overflow-hidden inline-flex items-center gap-2"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#18011F] via-[#B600A8] to-[#BE4C00]" />
      <div className="absolute inset-0 border border-white/40 rounded-full" />
      <span className="relative z-10 text-white">
        {label || "Let's Create Together ✦"}
      </span>
    </a>
  );
}
