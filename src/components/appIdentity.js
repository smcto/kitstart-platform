import {
  Monitor, Radio, Package, Headphones, Sparkles,
  CalendarDays, Users, BarChart3, ShieldCheck, Home
} from "lucide-react";

/**
 * Central registry for app identity: icon, colors, accent.
 * Used by Topbar, Sidebar, KonitysSwitcher, and Hub.
 */
const APP_IDENTITY = {
  "Konitys Hub": {
    icon: Home,
    bg: "bg-blue-50",
    text: "text-blue-600",
    accent: "blue",
    activeBg: "bg-blue-500/[0.08]",
    activeText: "text-blue-600",
    dot: "bg-blue-500",
    border: "border-blue-200",
    topStripe: "bg-blue-500",
  },
  "Bornes Manager": {
    icon: Monitor,
    bg: "bg-indigo-50",
    text: "text-indigo-600",
    accent: "indigo",         // CSS accent for active states
    activeBg: "bg-indigo-500/[0.08]",
    activeText: "text-indigo-600",
    dot: "bg-indigo-500",
    border: "border-indigo-200",
    topStripe: "bg-indigo-500",
  },
  "Antennes Selfizee": {
    icon: Radio,
    bg: "bg-orange-50",
    text: "text-orange-600",
    accent: "orange",
    activeBg: "bg-orange-500/[0.08]",
    activeText: "text-orange-600",
    dot: "bg-orange-500",
    border: "border-orange-200",
    topStripe: "bg-orange-500",
  },
  "Stock Manager": {
    icon: Package,
    bg: "bg-emerald-50",
    text: "text-emerald-600",
    accent: "emerald",
    activeBg: "bg-emerald-500/[0.08]",
    activeText: "text-emerald-600",
    dot: "bg-emerald-500",
    border: "border-emerald-200",
    topStripe: "bg-emerald-500",
  },
  "Support": {
    icon: Headphones,
    bg: "bg-amber-50",
    text: "text-amber-600",
    accent: "amber",
    activeBg: "bg-amber-500/[0.08]",
    activeText: "text-amber-600",
    dot: "bg-amber-500",
    border: "border-amber-200",
    topStripe: "bg-amber-500",
  },
  "Catalog IA": {
    icon: Sparkles,
    bg: "bg-violet-50",
    text: "text-violet-600",
    accent: "violet",
    activeBg: "bg-violet-500/[0.08]",
    activeText: "text-violet-600",
    dot: "bg-violet-500",
    border: "border-violet-200",
    topStripe: "bg-violet-500",
  },
  "Events Manager": {
    icon: CalendarDays,
    bg: "bg-rose-50",
    text: "text-rose-500",
    accent: "rose",
    activeBg: "bg-rose-500/[0.08]",
    activeText: "text-rose-500",
    dot: "bg-rose-500",
    border: "border-rose-200",
    topStripe: "bg-rose-500",
  },
  "Statistiques": {
    icon: BarChart3,
    bg: "bg-teal-50",
    text: "text-teal-600",
    accent: "teal",
    activeBg: "bg-teal-500/[0.08]",
    activeText: "text-teal-600",
    dot: "bg-teal-500",
    border: "border-teal-200",
    topStripe: "bg-teal-500",
  },
  "Abonnements": {
    icon: Users,
    bg: "bg-sky-50",
    text: "text-sky-500",
    accent: "sky",
    activeBg: "bg-sky-500/[0.08]",
    activeText: "text-sky-500",
    dot: "bg-sky-500",
    border: "border-sky-200",
    topStripe: "bg-sky-500",
  },
  "Admin": {
    icon: ShieldCheck,
    bg: "bg-stone-100",
    text: "text-stone-500",
    accent: "stone",
    activeBg: "bg-stone-500/[0.08]",
    activeText: "text-stone-500",
    dot: "bg-stone-500",
    border: "border-stone-200",
    topStripe: "bg-stone-500",
  },
};

const DEFAULT_IDENTITY = {
  icon: null,
  bg: "bg-stone-50",
  text: "text-stone-500",
  accent: "stone",
  activeBg: "bg-[--k-primary]/[0.08]",
  activeText: "text-[--k-primary]",
  dot: "bg-[--k-primary]",
  border: "border-[--k-border]",
  topStripe: "bg-[--k-primary]",
};

export function getAppIdentity(appName) {
  return APP_IDENTITY[appName] || DEFAULT_IDENTITY;
}

export { APP_IDENTITY };
