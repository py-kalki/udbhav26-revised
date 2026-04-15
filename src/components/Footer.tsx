"use client";

import Image from "next/image";
import Link from "next/link";
import { Code2, Globe, Network, Mail, X } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-background border-t border-white/5 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="relative w-8 h-8">
                <Image src="/logo.png" alt="UDBHAV'26" fill className="object-contain" />
              </div>
              <span className="text-xl font-heading font-black tracking-tighter text-gradient">
                UDBHAV'26
              </span>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed mb-6 font-body">
              The premier national-level offline hackathon at GLBITM. Innovating since 2024.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-white/30 hover:text-white transition-colors">
                <Code2 className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-white/30 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-white/30 hover:text-white transition-colors">
                <Network className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 font-heading">Resources</h4>
            <ul className="space-y-4">
              {["Rulebook", "Brand Assets", "Code of Conduct", "Media Kit"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-white/40 hover:text-primary transition-colors text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Event */}
          <div>
            <h4 className="text-white font-bold mb-6 font-heading">Event</h4>
            <ul className="space-y-4">
              {["Tracks", "Timeline", "Judging", "Sponsors", "FQAs"].map((item) => (
                <li key={item}>
                  <Link href={`#${item.toLowerCase()}`} className="text-white/40 hover:text-primary transition-colors text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Address */}
          <div>
            <h4 className="text-white font-bold mb-6 font-heading">Location</h4>
            <p className="text-white/40 text-sm leading-relaxed mb-4">
              G.L. Bajaj Institute of Technology and Management<br />
              Plot No. 2, Knowledge Park III<br />
              Greater Noida, UP - 201306
            </p>
            <Link href="#" className="text-primary text-sm font-bold flex items-center gap-2 hover:underline">
              <Globe className="w-4 h-4" />
              <span>Get Directions</span>
            </Link>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/20 text-xs">
            © 2026 UDBHAV Hackathon. All rights reserved.
          </p>
          <div className="flex gap-8">
            <Link href="#" className="text-white/20 hover:text-white text-xs transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-white/20 hover:text-white text-xs transition-colors">Terms of Service</Link>
          </div>
          <p className="text-white/20 text-xs flex items-center gap-1">
            Build with <span className="text-red-500/50">❤️</span> by TechTeam UDBHAV
          </p>
        </div>
      </div>
    </footer>
  );
};
